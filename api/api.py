import time
import requests
import json
from flask import Flask, request, jsonify, abort
from flask_socketio import SocketIO, send, emit
from werkzeug.exceptions import BadRequest
import meraki
import find_ports
import top_report
from backup_restore.backup_organization import meraki_backup_organization
import logging
from flask_cors import CORS
from eventlet import wsgi
import eventlet

app = Flask(__name__)
# app.debug = True
# eventlet.monkey_patch()
socketio = SocketIO(app, cors_allowed_origins="*")
CORS(app)
app.config['SECRET_KEY'] = 'meraki'


@socketio.on('connect')
def on_connect():
    print('user connected')
    retrieve_active_users()


def retrieve_active_users():
    emit('retrieve_active_users', broadcast=True)

# logging.basicConfig(filename='debug_log.log', level=logging.DEBUG)

# logging.basicConfig(filename='../src/DebugsLogs/debug.log',
#                     level=logging.DEBUG,
#                     format='%(asctime)s  - %(message)s')
# logging.basicConfig(filename='../src/DebugsLogs/debug.log',
#                     level=logging.DEBUG,
#                     format='%(asctime)s - %(name)s - %(levelname)s - %(threadName)s - %(message)s')


@app.route('/organizations', methods=['GET', 'POST'])
def get_organizations():
    if request.method == 'POST':
        global data
        data = request.get_json()
        return data
    else:
        dashboard = meraki.DashboardAPI(
            data['X-Cisco-Meraki-API-Key'], output_log=False)
        organizations = dashboard.organizations.getOrganizations()
        return {'organizations': organizations}


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
        error = (err.message['errors'])

        response = app.response_class(response=json.dumps(error),
                                      status=404,
                                      mimetype='application/json')
        return response


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
        error = (err.message['errors'])
        response = app.response_class(response=json.dumps(error),
                                      status=404,
                                      mimetype='application/json')
        return response


@ app.route('/vlans', methods=['GET', 'POST'])
def get_subnets():
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


@ app.route('/clients', methods=['GET', 'POST'])
def clients():
    if request.method == 'POST':
        global data
        data = request.get_json()
        ARG_APIKEY = data['X-Cisco-Meraki-API-Key']
        print("ARG_APIKEY", ARG_APIKEY)
        NET_ID = data['networkId']
        return data
    else:
        ARG_APIKEY = data['X-Cisco-Meraki-API-Key']
        NET_ID = data['networkId']
        url = 'https://dashboard.meraki.com/api/v0/networks/{}/clients?perPage={}&timespan={}'.format(
            NET_ID, 1000, 3600)
        response = requests.get(url=url, headers={
                                'X-Cisco-Meraki-API-Key': ARG_APIKEY, 'Content-Type': 'application/json'})
        clients = json.loads(response.text)
        return {'clients': clients}


@app.route('/device_status', methods=['GET', 'POST'])
def device_status():
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


@ app.route('/allVlans', methods=['GET', 'POST'])
def get_all_networks_subnets():
    if request.method == 'POST':
        global data
        data = request.get_json()
        return data
    else:
        dashboard = meraki.DashboardAPI(
            data['X-Cisco-Meraki-API-Key'], output_log=False)
        networks = dashboard.networks.getOrganizationNetworks(
            data['organizationId'])
        vlans = {}
        for x in networks:
            try:
                networkId = x['id']
                # networkname = {'name': x['name']}

                allVlans = dashboard.vlans.getNetworkVlans(networkId)
                vlans.setdefault('result', [])
                vlans['result'].append(
                    {'allVlans': allVlans, 'networkname': x['name']})
                vlans.update({'allVlans': allVlans, 'networkname': x['name']})
                continue
            except meraki.APIError as e:
                print(f'Meraki API error: {e}')
                print(f'status code = {e.status}')
                print(f'reason = {e.reason}')
                print(f'error = {e.message}')
                continue
            except Exception as e:
                print(f'some other error: {e}')
                continue
        print('script end')

        return(vlans)


@ app.route('/find_ports', methods=['GET', 'POST'])
def find_portss():
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


@ app.route("/topuserdata/", methods=['GET', 'POST'])
def topuserdata():
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


def bad_request(message):
    response = jsonify({'message': message})
    response.status_code = 400
    return response


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
        error = (err.message['errors'])
        response = app.response_class(response=json.dumps(error),
                                      status=400,
                                      mimetype='application/json')
        # err = {"err": err.message}
        # response = app.response_class(response=json.dumps(err),
        #                               status=400,
        #                               mimetype='application/json')
        return response
        # return jsonify(message="Traffic Analysis with Hostname Visibility must be enabled on this network to retrieve traffic data."), 400


@ app.route('/backup_restore/', methods=['GET', 'POST'])
def backup_restore():
    try:
        if request.method == 'POST':
            global data
            data = request.get_json()
            NET_ID = data['NET_ID']
            ARG_APIKEY = data['X-Cisco-Meraki-API-Key']
            ARG_ORGNAME = data['ARG_ORGNAME']
            SERIAL_NUM = data['SERIAL_NUM']
            ARG_ORGID = data['ARG_ORGID']

            return {'backup': meraki_backup_organization.backup_restore(ARG_ORGID, NET_ID, ARG_APIKEY, SERIAL_NUM, ARG_ORGNAME)}
        else:

            return {'backup': 'backup'}
    except meraki.APIError as err:
        error = (err.message['errors'])
        response = app.response_class(response=json.dumps(error),
                                      status=400,
                                      mimetype='application/json')
        return response


# def main():

# wsgi.server(eventlet.listen(('', 5000)), app)
# socket.run(app)
# app.run(host='127.0.0.1', port=5000, debug=True)


# if __name__ == '__main__':
#     main()

# if __name__ == '__main__':
socketio.run(app, host='127.0.0.1', port=5000)
socketio.emit('update', {'data': "test"})
