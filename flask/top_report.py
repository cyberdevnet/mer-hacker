
# script is based on https://github.com/meraki/automation-scripts repository

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
import time
import logging


# SECTION: GLOBAL VARIABLES: MODIFY TO CHANGE SCRIPT BEHAVIOUR

# Used in merakirequestthrottler() to avoid hitting dashboard API max request rate
API_EXEC_DELAY = 0.21

# connect and read timeouts for the Requests module in seconds
REQUESTS_CONNECT_TIMEOUT = 90
REQUESTS_READ_TIMEOUT = 90

SERVER_HTTP_PORT = '80'  # modify this to set TCP port used in HTTP mode
SERVER_HTTPS_PORT = '443'  # modify this to set TCP port used in HTTPS mode

# minimum time between scanning for new MXs in minutes. Used by refreshOrgList2()
ORGLIST_STALE_MINUTES = 0

# Time range definitions. Run reports for these intervals
TIMERANGE_SHORT_MINUTES = 10
TIMERANGE_MEDIUM_MINUTES = 30
TIMERANGE_LONG_MINUTES = 60

# SECTION: GLOBAL VARIABLES AND CLASSES: DO NOT MODIFY

LAST_MERAKI_REQUEST = datetime.datetime.now()  # used by merakirequestthrottler()
LAST_ORGLIST_REFRESH = datetime.datetime.now(
) - datetime.timedelta(minutes=ORGLIST_STALE_MINUTES+1)  # for refreshOrgList2()

ORG_LIST = None  # list of organizations, networks and MXs the used API key has access to


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
        name = ''
        shard = 'dashboard.meraki.com'
        mxsn1 = ''
        mxsn2 = ''


class c_Organization:
    def __init__(self):
        id = ''
        name = ''
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


def getInventory(p_org, arg_apikey):
    # returns a list of all networks in an organization
    try:
        merakirequestthrottler()
        dashboard = meraki.DashboardAPI(arg_apikey, output_log=False)
        inventory = dashboard.organizations.getOrganizationInventory(p_org.id)
    except:
        print('ERROR 06: Unable to contact Meraki cloud')
        return(None)
    return(inventory)


def getNetworks(p_org, arg_apikey):
    # returns a list of all networks in an organization
    # on failure returns a single record with 'null' name and id
    try:
        merakirequestthrottler()
        dashboard = meraki.DashboardAPI(
            arg_apikey, output_log=False, print_console=False)
        networks = dashboard.networks.getOrganizationNetworks(p_org.id)
    except:
        print('ERROR 07: Unable to contact Meraki cloud')
        return(None)
    return(networks)


def getOrgs(arg_apikey, arg_orgname):
    # returns the organizations' list for a specified admin, with filters applied

    merakirequestthrottler()
    try:
        merakirequestthrottler()
        dashboard = meraki.DashboardAPI(
            arg_apikey, output_log=False, print_console=False)
        organizations = dashboard.organizations.getOrganizations()
    except:
        print('ERROR 01: Unable to contact Meraki cloud')
        return(None)

    rjson = organizations
    orglist = []
    listlen = -1

    if arg_orgname.lower() == '/all':
        for org in rjson:
            orglist.append(c_Organization())
            listlen += 1
            orglist[listlen].id = org['id']
            orglist[listlen].name = org['name']
    else:
        for org in rjson:
            if org['name'] == arg_orgname:
                orglist.append(c_Organization())
                listlen += 1
                orglist[listlen].id = org['id']
                orglist[listlen].name = org['name']

    return(orglist)


def getShardHost(p_org, arg_apikey):
    # Looks up shard URL for a specific org. Use this URL instead of 'dashboard.meraki.com'
    # when making API calls with API accounts that can access multiple orgs.

    merakirequestthrottler()
    try:
        r = requests.get('https://dashboard.meraki.com/api/v0/organizations/%s/snmp' % p_org.id, headers={
                         'X-Cisco-Meraki-API-Key': arg_apikey, 'Content-Type': 'application/json'}, timeout=(REQUESTS_CONNECT_TIMEOUT, REQUESTS_READ_TIMEOUT))
    except:
        print('ERROR 08: Unable to contact Meraki cloud')
        return None

    if r.status_code != requests.codes['ok']:
        return None

    rjson = r.json()

    return(rjson['hostname'])


def refreshOrgList2(ARG_APIKEY, ARG_ORGNAME, NET_ID, NET_NAME):
    global LAST_ORGLIST_REFRESH
    global ORG_LIST

    if (datetime.datetime.now()-LAST_ORGLIST_REFRESH).total_seconds() >= ORGLIST_STALE_MINUTES * 60:
        print('INFO: Starting org list refresh at %s...' %
              datetime.datetime.now())

        flag_firstorg = True
        orglist = getOrgs(ARG_APIKEY, ARG_ORGNAME)

        if not orglist is None:
            for org in orglist:
                print('INFO: Processing org "%s"' % org.name)

                org.shard = 'dashboard.meraki.com'
                orgshard = getShardHost(org, ARG_APIKEY)
                if not orgshard is None:
                    org.shard = orgshard

                netlist = getNetworks(org, ARG_APIKEY)
                devlist = getInventory(org, ARG_APIKEY)

                if not devlist is None and not netlist is None:

                    db = sqlite3.connect(':memory:')
                    dbcursor = db.cursor()
                    dbcursor.execute(
                        '''CREATE TABLE devices (serial text, networkId text)''')
                    db.commit()

                    for device in devlist:
                        if not device['networkId'] is None:
                            if device['model'][:2] == 'MX' or device['model'][0] == 'Z':
                                dbcursor.execute(
                                    '''INSERT INTO devices VALUES (?,?)''', (device['serial'], device['networkId']))
                    db.commit()

                    flag_firstnet = True

                    for net in netlist:
                        # ignore nets with no potential for MX
                        if net['type'] == 'combined' or net['type'] == 'appliance':
                            dbcursor.execute(
                                '''SELECT serial FROM devices WHERE networkId = ?''', (net['id'],))

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
                                ORG_LIST[lastorg].nets[lastnet].id = net['id']
                                ORG_LIST[lastorg].nets[lastnet].name = net['name']
                                ORG_LIST[lastorg].nets[lastnet].shard = org.shard
                                ORG_LIST[lastorg].nets[lastnet].mxsn1 = mxofnet[0][0]
                                ORG_LIST[lastorg].nets[lastnet].mxsn2 = None
                                if len(mxofnet) > 1:
                                    ORG_LIST[lastorg].nets[lastnet].mxsn2 = mxofnet[1][0]

                    global DATABASE
                    DATABASE = dbcursor.execute(
                        'SELECT * from devices').fetchall()
                    db.close()

        LAST_ORGLIST_REFRESH = datetime.datetime.now()
        print('INFO: Refresh complete at %s' % LAST_ORGLIST_REFRESH)
        return('Scan complete')

    return ('Scan skipped. You can rescan maximum once per %i minutes' % ORGLIST_STALE_MINUTES)


def getclientlist(p_shardhost, p_serial, p_timespan, arg_apikey):

    merakirequestthrottler()
    try:
        r = requests.get('https://dashboard.meraki.com/api/v0/devices/%s/clients?timespan=%s' % (p_serial, p_timespan), headers={
                         'X-Cisco-Meraki-API-Key': arg_apikey, 'Content-Type': 'application/json'}, timeout=(REQUESTS_CONNECT_TIMEOUT, REQUESTS_READ_TIMEOUT))
        print(r)
    except:
        print('ERROR 02: Unable to contact Meraki cloud')
        return(None)

    # Check the source code for all the codes

    if r.status_code != requests.codes['ok']:
        return(None)

    return(r.json())


def getUsageReport(p_netparams, p_minutes, arg_apikey, serial_numb):
    orgid = p_netparams[0]
    orgshard = p_netparams[1]
    netid = p_netparams[2]
    mxserial1 = serial_numb
    mxserial2 = p_netparams[4]

    print('INFO: Running report for net "%s": MX1 "%s", MX2 "%s"' %
          (netid, mxserial1, mxserial2))

    clientlists = []

    clist = getclientlist(orgshard, mxserial1, p_minutes*60, arg_apikey)
    if not clist is None:
        clientlists.append(clist)

    if not mxserial2 is None:
        clist = getclientlist(orgshard, mxserial2, p_minutes*60, arg_apikey)
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
    netname = SelectField('Select network', choices=[(1, 'none')])
    submit = SubmitField('Run report')


def get_report(ARG_APIKEY, SERIAL_NUM, NET_NAME):
    form = c_NetSelectForm()

    output = None
    form.netname.choices = []
    for org in ORG_LIST:
        for net in org.nets:
            form.netname.choices.append(('%s|%s|%s|%s|%s' % (
                org.id, org.shard, net.id, SERIAL_NUM, net.mxsn2), '%s [%s]' % (NET_NAME, org.name)))

    output = c_Output()
    c = str(form.netname.choices)
    netparams = c.split('|')
    output.short = getUsageReport(
        netparams, TIMERANGE_SHORT_MINUTES, ARG_APIKEY, SERIAL_NUM)
    output.mid = getUsageReport(
        netparams, TIMERANGE_MEDIUM_MINUTES, ARG_APIKEY, SERIAL_NUM)
    output.long = getUsageReport(
        netparams, TIMERANGE_LONG_MINUTES, ARG_APIKEY, SERIAL_NUM)
    output.timestamp = str(datetime.datetime.now())
    return (output.short, output.mid, output.long, DATABASE)


# @app.route("/rescan/", methods=['GET'])
# def rescan():
#     flashmsg = refreshOrgList2()
#     flash(flashmsg)
#     return redirect(url_for('index'))
