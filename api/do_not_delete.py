# This is a Python 3 script to get the top 10 heaviest bandwidth users of an MX security appliance for
#  the last 10, 30 and 60 minutes.

import sys
import getopt
import requests
import json
import time
import datetime
import os
import sqlite3
from flask import Flask, jsonify, render_template, request, redirect, url_for, flash
from flask_wtf import FlaskForm
from wtforms import SelectField, SubmitField
import meraki
import meraki.aio
import asyncio
from flask_cors import CORS

# SECTION: GLOBAL VARIABLES: MODIFY TO CHANGE SCRIPT BEHAVIOUR

# Used in merakirequestthrottler() to avoid hitting dashboard API max request rate
API_EXEC_DELAY = 0.21

# connect and read timeouts for the Requests module in seconds
REQUESTS_CONNECT_TIMEOUT = 90
REQUESTS_READ_TIMEOUT = 90

SERVER_HTTP_PORT = '80'  # modify this to set TCP port used in HTTP mode
SERVER_HTTPS_PORT = '443'  # modify this to set TCP port used in HTTPS mode

# minimum time between scanning for new MXs in minutes. Used by refreshOrgList2()
ORGLIST_STALE_MINUTES = 1

# Time range definitions. Run reports for these intervals
TIMERANGE_SHORT_MINUTES = 10
TIMERANGE_MEDIUM_MINUTES = 30
TIMERANGE_LONG_MINUTES = 60

# SECTION: GLOBAL VARIABLES AND CLASSES: DO NOT MODIFY

LAST_MERAKI_REQUEST = datetime.datetime.now()  # used by merakirequestthrottler()
LAST_ORGLIST_REFRESH = datetime.datetime.now(
) - datetime.timedelta(minutes=ORGLIST_STALE_MINUTES+1)  # for refreshOrgList2()
# DO NOT STATICALLY SET YOUR API KEY HERE
ARG_ORGNAME = ''  # DO NOT STATICALLY SET YOUR ORGANIZATION NAME HERE
ORG_LIST = None  # list of organizations, networks and MXs the used API key has access to
ARG_APIKEY_TEST = '12345'
ORG_ID = '111111'
NETWORK_ID = '22222'
NETWORK_NAME = '22222'
NETWORK_LIST = []
DATBASE = []

app = Flask(__name__)
app.config['SECRET_KEY'] = 'frollo'
CORS(app)


@app.route("/topuserdata/", methods=['GET', 'POST'])
def topuserdata():
    if request.method == 'POST':

        global data
        global ARG_APIKEY_TEST
        global ORG_ID
        global NETWORK_ID
        global NETWORK_NAME
        global NETWORK_LIST
        global ARG_ORGNAME
        data = request.get_json()
        ARG_APIKEY_TEST = data['X-Cisco-Meraki-API-Key']
        print('ARG_APIKEY_TEST', ARG_APIKEY_TEST)
        ORG_ID = data['ORG_ID']
        # getInventory(ORG_ID)

        NETWORK_ID = data['NETWORK_ID']
        NETWORK_NAME = data['NETWORK_NAME']
        # NETWORK_LIST = data['NETWORK_LIST']  <== this return object :(
        ARG_ORGNAME = data['ARG_ORGNAME']
        print('NETWORK_LIST', NETWORK_LIST)
        refreshOrgList2()
        getOrgs()
        getNetworks(ORG_ID)
        getShardHost(ORG_ID)

        # rescan()

        return (ARG_APIKEY_TEST)


class c_OutRecord:
    def __init__(self):
        user = ''
        hostname = ''
        mac = ''
        ip = ''
        vlan = ''


class c_Output:
    def __init__(self):
        # lists of c_OutRecord()
        short = []
        mid = []
        long = []
        timestamp = ''


class c_Net:
    def __init__(self):
        id = ''
        name = NETWORK_NAME
        shard = 'dashboard.meraki.com'
        mxsn1 = ''
        mxsn2 = ''


class c_Organization:
    def __init__(self):
        id = ORG_ID
        name = ARG_ORGNAME
        shard = 'dashboard.meraki.com'
        nets = []


# SECTION: General use functions


def merakirequestthrottler():
    # makes sure there is enough time between API requests to Dashboard not to hit shaper
    global LAST_MERAKI_REQUEST

    if (datetime.datetime.now()-LAST_MERAKI_REQUEST).total_seconds() < (API_EXEC_DELAY):
        time.sleep(API_EXEC_DELAY)

    LAST_MERAKI_REQUEST = datetime.datetime.now()
    return


# SECTION: Meraki Dashboard API communication functions

def getInventory(p_org):
    # returns a list of all networks in an organization

    merakirequestthrottler()
    dashboard = meraki.DashboardAPI(ARG_APIKEY_TEST, output_log=False)
    inventory = dashboard.organizations.getOrganizationInventory(ORG_ID)
    return(inventory)


def getNetworks(p_org):
    # returns a list of all networks in an organization
    # on failure returns a single record with 'null' name and id

    merakirequestthrottler()
    dashboard = meraki.DashboardAPI(
        ARG_APIKEY_TEST, output_log=False, print_console=False)
    networks = dashboard.networks.getOrganizationNetworks(ORG_ID)

    return(networks)


def getOrgs():
    # returns the organizations' list for a specified admin, with filters applied

    merakirequestthrottler()
    dashboard = meraki.DashboardAPI(
        ARG_APIKEY_TEST, output_log=False, print_console=False)
    organizations = dashboard.organizations.getOrganizations()

    rjson = organizations
    orglist = []
    listlen = -1

    if ARG_ORGNAME.lower() == '/all':
        for org in rjson:
            orglist.append(c_Organization())
            listlen += 1
            orglist[listlen].id = org['id']
            orglist[listlen].name = org['name']
    else:
        for org in rjson:
            if org['name'] == ARG_ORGNAME:
                orglist.append(c_Organization())
                listlen += 1
                # orglist[listlen].id = org['id']
                # orglist[listlen].name = org['name']

    return(orglist)


def getShardHost(p_org):
    # Looks up shard URL for a specific org. Use this URL instead of 'dashboard.meraki.com'
    # when making API calls with API accounts that can access multiple orgs.

    merakirequestthrottler()
    dashboard = meraki.DashboardAPI(
        ARG_APIKEY_TEST, output_log=False, print_console=False)
    organizationsSnmp = dashboard.snmp_settings.getOrganizationSnmp(ORG_ID)

    rjson = organizationsSnmp

    return(rjson['hostname'])


def refreshOrgList2():
    global LAST_ORGLIST_REFRESH
    global ORG_LIST

    flag_firstorg = True
    orglist = getOrgs()

    if not orglist is None:
        for org in orglist:
            print('INFO: Processing org "%s"' % ARG_ORGNAME)

            org.shard = 'dashboard.meraki.com'
            orgshard = getShardHost(org)
            # if not orgshard is None:
            org.shard = orgshard
            netlist = getNetworks(org)
            devlist = getInventory(org)

            if not devlist is None and not netlist is None:

                db = sqlite3.connect(':memory:')
                dbcursor = db.cursor()
                dbcursor.execute(
                    '''CREATE TABLE devices (serial text, networkId text)''')
                db.commit()

                for device in devlist:
                    # print("DEVICEEEEEEEEEEEEEEEEE", device)
                    if not device['networkId'] is None:
                        if device['model'][:2] == 'MX' or device['model'][0] == 'Z':
                            dbcursor.execute(
                                '''INSERT INTO devices VALUES (?,?)''', (device['serial'], device['networkId']))
                db.commit()

                dbcursor = db.cursor()

                # dbcursor.execute(
                #     'SELECT * from devices ')
                # print('TTAAAAAAAABBBLEEEEEEEE', dbcursor.fetchall())

                flag_firstnet = True

                for net in netlist:
                    # ignore nets with no potential for MX
                    if net['type'] == 'combined' or net['type'] == 'appliance':
                        dbcursor.execute(
                            '''SELECT serial FROM devices WHERE networkId = ?''', (net['id'],))
                        # dbcursor.execute(
                        #     '''SELECT serial FROM devices WHERE networkId = ?''', (net['id'],))

                        mxofnet = dbcursor.fetchall()

                        if len(mxofnet) > 0:  # network has mxes
                            if flag_firstnet:
                                if flag_firstorg:
                                    ORG_LIST = []
                                    lastorg = -1
                                    flag_firstorg = False

                                ORG_LIST.append(org)
                                lastorg += 1
                                lastnet = -1
                                ORG_LIST[lastorg].nets = []

                                flag_firstnet = False

                            ORG_LIST[lastorg].nets.append(c_Net())
                            lastnet += 1
                            # ORG_LIST[lastorg].nets[lastnet].id = net['id']
                            # ORG_LIST[lastorg].nets[lastnet].name = net['name']
                            ORG_LIST[lastorg].nets[lastnet].shard = org.shard
                            ORG_LIST[lastorg].nets[lastnet].mxsn1 = mxofnet[0][0]
                            ORG_LIST[lastorg].nets[lastnet].mxsn2 = None
                            if len(mxofnet) > 1:
                                ORG_LIST[lastorg].nets[lastnet].mxsn2 = mxofnet[1][0]

                dbdata = dbcursor.execute(
                    "SELECT name FROM sqlite_master WHERE type='table' ORDER BY name;").fetchall()
                print('TTAAAAAAAABBBLEEEEEEEE', dbdata)
                global DATABASE
                DATABASE = dbcursor.execute('SELECT * from devices').fetchall()

                print('TTAAAAAAAABBBLEEEEEEEE', dbcursor.fetchall())

                # db.close()

    LAST_ORGLIST_REFRESH = datetime.datetime.now()
    print('INFO: Refresh complete at %s' % LAST_ORGLIST_REFRESH)
    return('Scan complete')


def getclientlist(p_shardhost, p_serial, p_timespan):

    merakirequestthrottler()
    try:
        r = requests.get('https://dashboard.meraki.com/api/v0/devices/%s/clients?timespan=%s' % (p_serial, p_timespan), headers={
                         'X-Cisco-Meraki-API-Key': ARG_APIKEY_TEST, 'Content-Type': 'application/json'}, timeout=(REQUESTS_CONNECT_TIMEOUT, REQUESTS_READ_TIMEOUT))
        print(r)
    except:
        print('ERROR 02: Unable to contact Meraki cloud')
        return(None)

    # Check the source code for all the codes

    if r.status_code != requests.codes['ok']:
        return(None)

    return(r.json())


def getUsageReport(p_netparams, p_minutes):
    orgid = ORG_ID
    # orgid = p_netparams[0]
    orgshard = p_netparams[1]
    netid = NETWORK_ID
    # netid = p_netparams[2]
    mxserial1 = p_netparams[3]
    mxserial2 = p_netparams[4]

    print('INFO: Running report for net "%s": MX1 "%s", MX2 "%s"' %
          (netid, mxserial1, mxserial2))

    clientlists = []

    clist = getclientlist(orgshard, mxserial1, p_minutes*60)
    if not clist is None:
        clientlists.append(clist)

    if not mxserial2 is None:
        clist = getclientlist(orgshard, mxserial2, p_minutes*60)
        if not clist is None:
            clientlists.append(clist)

    db = sqlite3.connect(':memory:')

    dbcursor = db.cursor()

    dbcursor.execute('''CREATE TABLE clients
             (UsageSent real, UsageRecv real, UsageTotal real, id text, description text, dhcpHostName text,
              mac text, ip text, vlan text)''')

    db.commit()

    for cl in clientlists:
        for client in cl:
            dbcursor.execute('''INSERT INTO clients VALUES (?,?,?,?,?,?,?,?,?)''',
                             (client['usage']['sent'],
                              client['usage']['recv'],
                                 client['usage']['sent'] +
                              client['usage']['recv'],
                                 client['id'],
                                 client['description'],
                                 client['dhcpHostname'],
                                 client['mac'],
                                 client['ip'],
                                 client['vlan']))

    db.commit()

    dbcursor = db.cursor()
    dbcursor.execute('''SELECT UsageTotal,
                        UsageSent,
                        UsageRecv,
                        description,
                        dhcpHostName,
                        mac,
                        ip,
                        vlan
                        FROM clients ORDER BY UsageTotal DESC LIMIT 10''')

    retvalue = dbcursor.fetchall()

    db.close()

    return(retvalue)


# SECTION: Flask web server definitions and functions

class c_NetSelectForm(FlaskForm):
    netname = SelectField('Select network', choices=[(NETWORK_NAME, 'none')])
    submit = SubmitField('Run report')


# @ app.route("/rescan/", methods=['GET'])
# def rescan():
#     flashmsg = refreshOrgList2()
#     flash(flashmsg)
#     return redirect(url_for('index'))


@app.route("/index/", methods=['GET', 'POST'])
def index():
    form = c_NetSelectForm()
    output = None
    print('ORG_LISTORG_LISTORG_LIST', ORG_LIST)
    form.netname.choices = []
    for org in ORG_LIST:
        for net in org.nets:
            form.netname.choices.append(('%s|%s|%s|%s|%s' % (
                ORG_ID, org.shard, NETWORK_ID, net.mxsn1, net.mxsn1), '%s [%s]' % (NETWORK_NAME, ARG_ORGNAME)))
    output = c_Output()
    c = str(form.netname.choices)
    netparams = c.split('|')
    output.short = getUsageReport(netparams, TIMERANGE_SHORT_MINUTES)
    output.mid = getUsageReport(netparams, TIMERANGE_MEDIUM_MINUTES)
    output.long = getUsageReport(netparams, TIMERANGE_LONG_MINUTES)
    output.timestamp = str(datetime.datetime.now())
    return {'reports': [output.short, output.mid, output.long, DATABASE]}


# SECTION: main

def main(argv):
    # global ARG_APIKEY
    global ARG_ORGNAME

    # initialize command line arguments
    # ARG_APIKEY = ''
    # ARG_ORGNAME = ''
    arg_numresults = ''
    arg_mode = ''
    arg_filter = ''

    # get command line arguments
    try:
        opts, args = getopt.getopt(argv, 'hk:o:m:')
    except getopt.GetoptError:
        sys.exit(2)

    for opt, arg in opts:
        if opt == '-h':
            sys.exit()

        elif opt == '-m':
            arg_mode = arg

    # set defaults for empty command line arguments
    if ARG_ORGNAME == '':
        ARG_ORGNAME = '/all'
    if arg_mode == '':
        arg_mode = 'https'

    app.run(host='127.0.0.1', port=6080, debug=True)


if __name__ == '__main__':
    main(sys.argv[1:])
