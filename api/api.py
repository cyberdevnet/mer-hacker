import time
from time import sleep
import datetime
import requests
import json
from flask import Flask, request, jsonify, abort,flash, render_template
from werkzeug.exceptions import BadRequest
import meraki
import find_ports
import top_report
from backup_restore import meraki_backup_network
from backup_restore import meraki_restore_network
import logging
from flask_cors import CORS
from flask_socketio import SocketIO, emit

# SECTION: GLOBAL VARIABLES: MODIFY TO CHANGE SCRIPT BEHAVIOUR

# Used in merakirequestthrottler() to avoid hitting dashboard API max request rate
API_EXEC_DELAY = 0.21

# connect and read timeouts for the Requests module in seconds
REQUESTS_CONNECT_TIMEOUT = 90
REQUESTS_READ_TIMEOUT = 90

LAST_MERAKI_REQUEST = datetime.datetime.now()  # used by merakirequestthrottler()


def merakirequestthrottler():
    # makes sure there is enough time between API requests to Dashboard not to hit shaper
    global LAST_MERAKI_REQUEST

    if (datetime.datetime.now()-LAST_MERAKI_REQUEST).total_seconds() < (API_EXEC_DELAY):
        time.sleep(API_EXEC_DELAY)

    LAST_MERAKI_REQUEST = datetime.datetime.now()
    return


app = Flask(__name__)
# app.debug = True
app.config['PROPAGATE_EXCEPTIONS'] = True
CORS(app)
app.config['SECRET_KEY'] = 'meraki'

# logging.basicConfig(filename='debug_log.log', level=logging.DEBUG)

# logging.basicConfig(filename='/home/cyberdevnet/mer-hacker-dev/src/DebugsLogs/debug.log',
#                     level=logging.INFO,
#                     format='%(asctime)s  - %(message)s')


# logging.basicConfig(filename='../src/DebugsLogs/debug.log',
#                     level=logging.DEBUG,
#                     format='%(asctime)s - %(name)s - %(levelname)s - %(threadName)s - %(message)s')




@app.route('/organizations', methods=['GET', 'POST'])
def get_organizations():
    try:
        if request.method == 'POST':
            global data
            data = request.get_json()
            return data
        else:
            dashboard = meraki.DashboardAPI(data['X-Cisco-Meraki-API-Key'],
                 output_log=False)
            organizations = dashboard.organizations.getOrganizations()
            return {'organizations': organizations}
    except meraki.APIError as err:
        print(err)
        flash('Organization not found, please check your API key and your internet connection')
        flash(err)
        return {'error' : [render_template('flash_template.html')]}


@app.route('/networks', methods=['GET', 'POST'])
def get_networks():
    try:
        if request.method == 'POST':
            global data
            data = request.get_json()
            return data
        else:
            dashboard = meraki.DashboardAPI(
                data['X-Cisco-Meraki-API-Key'], output_log=False)
            networks = dashboard.networks.getOrganizationNetworks(
                data['organizationId'])
            return {'networks': networks}
    except meraki.APIError as err:
        print(err)
        error = (err.message['errors'][0])
        flash(error)
        return {'error' : [render_template('flash_template.html'),err.status]}



@ app.route('/devices', methods=['GET', 'POST'])
def get_devices():
    try:
        if request.method == 'POST':
            global data
            data = request.get_json()
            return data
        else:
            dashboard = meraki.DashboardAPI(
                data['X-Cisco-Meraki-API-Key'], output_log=False)
            devices = dashboard.devices.getNetworkDevices(
                data['networkId'])
            return {'devices': devices}
    except meraki.APIError as err:
        print(err)
        error = (err.message['errors'][0])
        flash(error)
        return {'error' : [render_template('flash_template.html'),err.status]}


@ app.route('/vlans', methods=['GET', 'POST'])
def get_subnets():
    try:
        if request.method == 'POST':
            global data
            data = request.get_json()
            return data
        else:
            dashboard = meraki.DashboardAPI(
                data['X-Cisco-Meraki-API-Key'], output_log=False)
            vlans = dashboard.vlans.getNetworkVlans(
                data['networkId'])
            return {'vlans': vlans}
    except meraki.APIError as err:
        print(err)
        error = (err.message['errors'][0])
        flash(error)
        return {'error' : [render_template('flash_template.html'),err.status]}


@ app.route('/clients', methods=['GET', 'POST'])
def clients():
    try:
        if request.method == 'POST':
            global data
            data = request.get_json()
            ARG_APIKEY = data['X-Cisco-Meraki-API-Key']
            NET_ID = data['networkId']
            return data
        else:
            ARG_APIKEY = data['X-Cisco-Meraki-API-Key']
            NET_ID = data['networkId']
            dashboard = meraki.DashboardAPI(ARG_APIKEY)
            clients = dashboard.clients.getNetworkClients(NET_ID, perPage=1000,timespan=3600)
            return {'clients': clients}
    except meraki.APIError as err:
        print(err)
        error = (err.message['errors'][0])
        flash(error)
        return {'error' : [render_template('flash_template.html'),err.status]}


@app.route('/device_status', methods=['GET', 'POST'])
def device_status():
    try:
        if request.method == 'POST':
            global data
            data = request.get_json()
            return data
        else:
            dashboard = meraki.DashboardAPI(
                data['X-Cisco-Meraki-API-Key'], output_log=False)
            deviceStatus = dashboard.organizations.getOrganizationDeviceStatuses(
                data['organizationId'])
            return {'deviceStatus': deviceStatus}
    except meraki.APIError as err:
        print(err)
        error = (err.message['errors'][0])
        flash(error)
        return {'error' : [render_template('flash_template.html'),err.status]}


@ app.route('/allVlans', methods=['GET', 'POST'])
def get_all_networks_subnets():
    try:
        if request.method == 'POST':
            global data
            data = request.get_json()
            return data
        else:
            merakirequestthrottler()
            dashboard = meraki.DashboardAPI(
                data['X-Cisco-Meraki-API-Key'], output_log=False)
            networks = dashboard.networks.getOrganizationNetworks(
                data['organizationId'])
            vlans = {}
            for x in networks:
                try:
                    networkId = x['id']
                    allVlans = dashboard.vlans.getNetworkVlans(networkId)
                    vlans.setdefault('result', [])
                    vlans['result'].append(
                        {'allVlans': allVlans, 'networkname': x['name']})
                    vlans.update({'allVlans': allVlans, 'networkname': x['name']})
                    continue
                except meraki.APIError as err:
                    error = (err.message['errors'][0])
                    print(error)
                    continue
            print('script end')
            return(vlans)
    except meraki.APIError as err:
        print(err)
        error = (err.message['errors'][0])
        flash(error)
        return {'error' : [render_template('flash_template.html'),err.status]}




@ app.route('/find_ports', methods=['GET', 'POST'])
def find_portss():
    try:
        if request.method == 'POST':
            global data
            data = request.get_json()
            API_KEY = data['X-Cisco-Meraki-API-Key']
            ORG_ID = data['ORG_ID']
            MAC_ADDR = data['MAC_ADDR']
            IP_ADDR = data['IP_ADDR']
            TIME_SPAN = data['TIME_SPAN']

            return {'data': find_ports.find_ports(API_KEY, ORG_ID, MAC_ADDR, IP_ADDR, TIME_SPAN)}
        else:
            return {'print'}
    except Exception as error:
        return  {'error': error}


@ app.route("/topuserdata/", methods=['GET', 'POST'])
def topuserdata():
    try:
        if request.method == 'POST':
            global data

            data = request.get_json()
            ARG_APIKEY = data['X-Cisco-Meraki-API-Key']
            ARG_ORGNAME = data['ARG_ORGNAME']
            SERIAL_NUM = data['SERIAL_NUM']
            NET_ID = data['NET_ID']
            NET_NAME = data['NET_NAME']

            return {'refreshOrgList2': top_report.refreshOrgList2(ARG_APIKEY, ARG_ORGNAME, NET_ID, NET_NAME), 'reports': top_report.get_report(ARG_APIKEY, SERIAL_NUM, NET_NAME)}
        else:
            return {'data': 'ciao'}
    except Exception as error:
        return  {'error': error}



@ app.route('/traffic_analysis/', methods=['GET', 'POST'])
def traffic_analysis():
    try:
        if request.method == 'POST':
            global data
            data = request.get_json()
            return {'data': 'ciao'}
        else:
            NET_ID = data['NET_ID']
            ARG_APIKEY = data['X-Cisco-Meraki-API-Key']
            TIME_SPAN = data['TIME_SPAN']
            DEV_TYPE = data['DEV_TYPE']
            dashboard = meraki.DashboardAPI(ARG_APIKEY, output_log=False)
            analysis = dashboard.networks.getNetworkTraffic(
                NET_ID, timespan=TIME_SPAN, deviceType=DEV_TYPE)
            return {'analysis': analysis}
    except meraki.APIError as err:
        print(err)
        error = (err.message['errors'][0])
        flash(error)
        return {'error' : [render_template('flash_template.html'),err.status]}



@ app.route('/run_backup/', methods=['GET', 'POST'])
def run_backup():
    try:
        if request.method == 'POST':
            global data
            data = request.get_json()
            NET_ID = data['NET_ID']
            ARG_APIKEY = data['X-Cisco-Meraki-API-Key']
            ARG_ORGNAME = data['ARG_ORGNAME']
            SERIAL_NUM = data['SERIAL_NUM']
            ARG_ORGID = data['ARG_ORGID']

            return {'backup': meraki_backup_network.backup_network(ARG_ORGID, NET_ID, ARG_APIKEY)}
        else:

            return {'backup': 'backup'}
    except meraki.APIError as err:
        print(err)
        error = (err.message['errors'][0])
        flash(error)
        return {'error' : [render_template('flash_template.html'),err.status]}


@ app.route('/run_restore/', methods=['GET', 'POST'])
def run_restore():
    try:
        if request.method == 'POST':
            global data
            data = request.get_json()
            NET_ID = data['NET_ID']
            ARG_APIKEY = data['X-Cisco-Meraki-API-Key']
            ARG_ORGNAME = data['ARG_ORGNAME']
            SERIAL_NUM = data['SERIAL_NUM']
            ARG_ORGID = data['ARG_ORGID']

            return {'backup': meraki_restore_network.restore_network(ARG_ORGID, NET_ID, ARG_APIKEY)}
        else:

            return {'backup': 'backup'}
    except meraki.APIError as err:
        print(err)
        error = (err.message['errors'][0])
        flash(error)
        return {'error' : [render_template('flash_template.html'),err.status]}



if __name__ == '__main__':
    
    app.run(host='127.0.0.1', port=5000)



