import time
from time import sleep
import os
import datetime
import requests
import json
import importlib
from flask import Flask, request, jsonify, abort, flash, render_template
from flask_socketio import SocketIO
from werkzeug.exceptions import BadRequest, HTTPException
import meraki
import find_ports
import top_report
import switchporttemplate
from backup_restore import meraki_backup_network
# from backup_restore import meraki_restore_network
from cisco_meraki_migrate_tool import ios_to_meraki
# from cisco_meraki_migrate_tool import build_meraki_switchconfig
import logging
from flask_cors import CORS
from flask_socketio import SocketIO, emit

# dirname = os.path.dirname(__file__)
dirname = os.path.dirname(os.path.abspath(__file__))
debug_file = dirname + '/logs/debug_file.log'
log_format = '%(asctime)s - %(name)s - %(levelname)s - %(message)s'
logging.basicConfig(filename=debug_file, level=logging.DEBUG,
                    format=log_format, filemode='w')
logger = logging.getLogger()


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
app.config['SECRET_KEY'] = 'meraki'
socketio = SocketIO(app)
CORS(app)


#  CLEAR debug_file after user has been logged out
@app.route('/flask/delete_debugfile', methods=['POST'])
def delete_debugfile():
    try:
        with open(debug_file, 'w'):
            pass
    except Exception as error:
        print(error)
    return {'delete_debugfile': 'Debugfile cleared!'}


@app.route('/flask/organizations', methods=['GET', 'POST'])
def get_organizations():
    try:
        if request.method == 'POST':
            global data
            data = request.get_json(force=True, silent=True)
            return data
        else:
            dashboard = meraki.DashboardAPI(data['X-Cisco-Meraki-API-Key'],
                                            output_log=False)
            organizations = dashboard.organizations.getOrganizations()
            return {'organizations': organizations}
    except meraki.APIError as err:
        print('Error: ', err)
        flash(
            'Organization not found, please check your API key and your internet connection')
        flash(err)
        return {'error': [render_template('flash_template.html')]}


@app.route('/flask/networks', methods=['GET', 'POST'])
def get_networks():
    try:
        if request.method == 'POST':
            global data
            data = request.get_json(force=True, silent=True)
            return data
        else:
            dashboard = meraki.DashboardAPI(
                data['X-Cisco-Meraki-API-Key'], output_log=False)
            networks = dashboard.networks.getOrganizationNetworks(
                data['organizationId'])
            return {'networks': networks}
    except meraki.APIError as err:
        flash(err)
        return {'error': [render_template('flash_template.html'), err.status]}


@ app.route('/flask/devices', methods=['GET', 'POST'])
def get_devices():
    try:
        if request.method == 'POST':
            global data
            data = request.get_json(force=True, silent=True)
            return data
        else:
            dashboard = meraki.DashboardAPI(
                data['X-Cisco-Meraki-API-Key'], output_log=False)
            devices = dashboard.devices.getNetworkDevices(
                data['NET_ID'])
            return {'devices': devices}
    except meraki.APIError as err:
        print('Error: ', err)
        return {'error': [render_template('flash_template.html'), err.status]}


@ app.route('/flask/vlans', methods=['GET', 'POST'])
def get_subnets():
    try:
        if request.method == 'POST':
            global data
            data = request.get_json(force=True, silent=True)
            return data
        else:
            dashboard = meraki.DashboardAPI(
                data['X-Cisco-Meraki-API-Key'], output_log=False)
            vlans = dashboard.vlans.getNetworkVlans(
                data['NET_ID'])
            return {'vlans': vlans}
    except meraki.APIError as err:
        print('Error: ', err)
        error = (err.message['errors'][0])
        flash(error)
        return {'error': [render_template('flash_template.html'), err.status]}


@ app.route('/flask/clients', methods=['GET', 'POST'])
def clients():
    try:
        if request.method == 'POST':
            global data
            data = request.get_json(force=True, silent=True)
            ARG_APIKEY = data['X-Cisco-Meraki-API-Key']
            NET_ID = data['NET_ID']
            return data
        else:
            ARG_APIKEY = data['X-Cisco-Meraki-API-Key']
            NET_ID = data['NET_ID']
            dashboard = meraki.DashboardAPI(ARG_APIKEY)
            clients = dashboard.clients.getNetworkClients(
                NET_ID, perPage=1000, timespan=3600)
            return {'clients': clients}
    except meraki.APIError as err:
        print('Error: ', err)
        return {'error': [render_template('flash_template.html'), err.status]}


@app.route('/flask/device_status', methods=['GET', 'POST'])
def device_status():
    try:
        if request.method == 'POST':
            global data
            data = request.get_json(force=True, silent=True)
            return data
        else:
            dashboard = meraki.DashboardAPI(
                data['X-Cisco-Meraki-API-Key'], output_log=False)
            deviceStatus = dashboard.organizations.getOrganizationDeviceStatuses(
                data['organizationId'])
            return {'deviceStatus': deviceStatus}
    except meraki.APIError as err:
        print('Error: ', err)
        error = (err.message['errors'][0])
        flash(error)
        return {'error': [render_template('flash_template.html'), err.status]}


@app.route('/flask/inventory', methods=['GET', 'POST'])
def inventory():
    try:
        if request.method == 'POST':
            global data
            data = request.get_json(force=True, silent=True)
            return data
        else:
            dashboard = meraki.DashboardAPI(
                data['X-Cisco-Meraki-API-Key'], output_log=False)
            organization_id = data['organizationId']
            inventory = dashboard.organizations.getOrganizationInventory(
                organization_id)
            return {'inventory': inventory}
    except meraki.APIError as err:
        print('Error: ', err)
        error = (err.message['errors'][0])
        flash(error)
        return {'error': [render_template('flash_template.html'), err.status]}


@app.route('/flask/uplink_loss', methods=['GET', 'POST'])
def uplink_loss():
    try:
        if request.method == 'POST':
            global data
            data = request.get_json(force=True, silent=True)
            return data
        else:
            dashboard = meraki.DashboardAPI(
                data['X-Cisco-Meraki-API-Key'], output_log=False)
            uplinkLoss = dashboard.organizations.getOrganizationUplinksLossAndLatency(
                data['organizationId'])
            return {'uplinkLoss': uplinkLoss}
    except meraki.APIError as err:
        print('Error: ', err)
        return {'error': [render_template('flash_template.html'), err.status]}


@ app.route('/flask/allVlans', methods=['GET', 'POST'])
def get_all_networks_subnets():
    try:
        if request.method == 'POST':
            global data
            data = request.get_json(force=True, silent=True)
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
                    networkName = x['name']
                    allVlans = dashboard.vlans.getNetworkVlans(networkId)
                    vlans.setdefault('result', [])
                    vlans['result'].append(
                        {'allVlans': allVlans, 'networkname': x['name']})
                    vlans.update(
                        {'allVlans': allVlans, 'networkname': x['name']})
                    continue
                except meraki.APIError as err:
                    error = (err.message['errors'][0])
                    print(error + ' ' + networkName)
                    continue
            print('script end')
            return(vlans)
    except meraki.APIError as err:
        print('Error: ', err)
        error = (err.message['errors'][0])
        flash(error + ' ' + networkName)
        return {'error': [render_template('flash_template.html'), err.status]}


@ app.route('/flask/find_ports', methods=['GET', 'POST'])
def find_portss():
    try:
        if request.method == 'POST':
            global data
            data = request.get_json(force=True, silent=True)
            API_KEY = data['X-Cisco-Meraki-API-Key']
            ORG_ID = data['ORG_ID']
            MAC_ADDR = data['MAC_ADDR']
            IP_ADDR = data['IP_ADDR']
            TIME_SPAN = data['TIME_SPAN']

            return {'data': find_ports.find_ports(API_KEY, ORG_ID, MAC_ADDR, IP_ADDR, TIME_SPAN)}
        else:
            return {'print'}
    except Exception as error:
        return {'error': error}


@ app.route("/flask/topuserdata/", methods=['GET', 'POST'])
def topuserdata():
    try:
        if request.method == 'POST':
            global data

            data = request.get_json(force=True, silent=True)
            ARG_APIKEY = data['X-Cisco-Meraki-API-Key']
            ARG_ORGNAME = data['ARG_ORGNAME']
            SERIAL_NUM = data['SERIAL_NUM']
            NET_ID = data['NET_ID']
            NET_NAME = data['NET_NAME']

            return {'refreshOrgList2': top_report.refreshOrgList2(ARG_APIKEY, ARG_ORGNAME, NET_ID, NET_NAME), 'reports': top_report.get_report(ARG_APIKEY, SERIAL_NUM, NET_NAME)}
        else:
            return {'data': 'ciao'}
    except Exception as error:
        return {'error': error}


@ app.route('/flask/traffic_analysis/', methods=['GET', 'POST'])
def traffic_analysis():
    try:
        if request.method == 'POST':
            global data
            data = request.get_json(force=True, silent=True)
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
        print('Error: ', err)
        error = (err.message['errors'][0])
        flash(error)
        return {'error': [render_template('flash_template.html'), err.status]}


@ app.route('/flask/run_backup/', methods=['GET', 'POST'])
def run_backup():
    try:
        if request.method == 'POST':
            global data
            data = request.get_json(force=True, silent=True)
            NET_ID = data['NET_ID']
            ARG_APIKEY = data['X-Cisco-Meraki-API-Key']
            ARG_ORGID = data['ARG_ORGID']
            USER = data['USER']

            return {'backup': meraki_backup_network.backup_network(ARG_ORGID, NET_ID, ARG_APIKEY, USER)}
        else:

            return {'backup': 'backup'}
    except Exception as err:
        print('Exception: ', err)
        # error = (err.message['errors'][0])
        flash(err)
        return {'error': [render_template('flash_template.html')]}


@ app.route('/flask/run_restore/', methods=['GET', 'POST'])
def run_restore():
    try:
        if request.method == 'POST':
            # importlib.reload(backupRestoreFiles)
            global data
            data = request.get_json(force=True, silent=True)
            ARG_APIKEY = data['X-Cisco-Meraki-API-Key']
            ARG_ORGID = data['ARG_ORGID']
            USER = data['USER']

            modulename = "backup_restore.{}_meraki_restore_network".format(
                USER)
            module = importlib.import_module(modulename, ".")
            importlib.reload(module)

            return {'backup': module.restore_network(ARG_ORGID, ARG_APIKEY, USER)}
        else:

            return {'backup': 'backup'}
    except Exception as err:
        print('Error: ', err)
        return {'error': err}


@ app.route('/flask/run_restore_switch/', methods=['GET', 'POST'])
def run_restore_switch():
    try:
        if request.method == 'POST':
            # importlib.reload(meraki_restore_network)
            global data
            data = request.get_json(force=True, silent=True)
            ARG_APIKEY = data['X-Cisco-Meraki-API-Key']
            USER = data['USER']

            modulename = "backup_restore.{}_meraki_restore_network".format(
                USER)
            module = importlib.import_module(modulename, ".")
            importlib.reload(module)

            return {'backup': module.restore_switchports(ARG_APIKEY, USER)}
        else:

            return {'backup': 'backup'}
    except Exception as err:
        print('Error: ', err)
        return {'error': err}


@ app.route('/flask/ios_to_meraki/', methods=['GET', 'POST'])
def ios2meraki():
    try:
        if request.method == 'POST':
            # importlib.reload(build_meraki_switchconfig)
            global data
            data = request.get_json(force=True, silent=True)
            serial_numbers = data['serial_numbers']
            USER = data['USER']

            return {'ios_to_meraki': ios_to_meraki.ios_to_meraki(serial_numbers, USER)}
        else:

            return {'ios_to_meraki': 'ios_to_meraki'}
    except Exception as err:
        print('Exception: ', err)
        flash(err)
        return {'error': [render_template('flash_template.html')]}


@ app.route('/flask/run_migrate_switch_config/', methods=['GET', 'POST'])
def migrate_switch_config():
    try:
        if request.method == 'POST':
            # importlib.reload(build_meraki_switchconfig)
            global data
            data = request.get_json(force=True, silent=True)
            ARG_APIKEY = data['X-Cisco-Meraki-API-Key']
            USER = data['USER']

            modulename = "cisco_meraki_migrate_tool.{}_build_meraki_switchconfig".format(
                USER)
            module = importlib.import_module(modulename, ".")
            importlib.reload(module)

            return {'ios_to_meraki': module.build_switchports(ARG_APIKEY, USER)}
        else:
            return {'ios_to_meraki': 'ios_to_meraki'}
    except Exception as err:
        print('Exception: ', err)
        flash(err)
        return {'error': [render_template('flash_template.html')]}


@ app.route('/flask/lldp_cdp/', methods=['GET', 'POST'])
def lldp_cdp():
    try:
        if request.method == 'POST':
            global data
            data = request.get_json(force=True, silent=True)
            return {'data': 'ciao'}
        else:
            NET_ID = data['NET_ID']
            ARG_APIKEY = data['X-Cisco-Meraki-API-Key']
            SERIAL_NUM = data['SERIAL_NUM']
            TIME_SPAN = 7200
            dashboard = meraki.DashboardAPI(ARG_APIKEY, output_log=False)

            lldp_cdp = dashboard.devices.getNetworkDeviceLldp_cdp(
                NET_ID, SERIAL_NUM, timespan=TIME_SPAN)
            return {'lldp_cdp': lldp_cdp}
    # except Exception as err:
    #     print('Exception: ',err)
    #     flash(err)
    #     return {'error' : [render_template('flash_template.html')]}
    except meraki.APIError as err:
        print('Error: ', err)
        error = (err.message['errors'][0])
        flash(error)
        return {'error': [render_template('flash_template.html'), err.status]}


@ app.route('/flask/device_clients', methods=['GET', 'POST'])
def device_clients():
    try:
        if request.method == 'POST':
            global data
            data = request.get_json(force=True, silent=True)
            return data
        else:
            ARG_APIKEY = data['X-Cisco-Meraki-API-Key']
            SERIAL_NUM = data['SERIAL_NUM']
            dashboard = meraki.DashboardAPI(ARG_APIKEY)
            device_clients = dashboard.clients.getDeviceClients(
                SERIAL_NUM, timespan=1000)
            return {'device_clients': device_clients}
    except meraki.APIError as err:
        print('Error: ', err)
        error = (err.message['errors'][0])
        flash(error)
        return {'error': [render_template('flash_template.html'), err.status]}


@ app.route('/flask/client', methods=['GET', 'POST'])
def client():
    try:
        if request.method == 'POST':
            global data
            data = request.get_json(force=True, silent=True)
            return data
        else:
            ARG_APIKEY = data['X-Cisco-Meraki-API-Key']
            NET_ID = data['NET_ID']
            CLIENT_ID = data['CLIENT_ID']
            dashboard = meraki.DashboardAPI(ARG_APIKEY)
            client = dashboard.clients.getNetworkClient(NET_ID, CLIENT_ID)
            return {'client': client}
    except Exception as err:
        print('Exception: ', err)
        flash(err)
        return {'error': [render_template('flash_template.html')]}


@ app.route('/flask/site2site', methods=['GET', 'POST'])
def site2site():
    try:
        if request.method == 'POST':
            global data
            data = request.get_json(force=True, silent=True)
            return data
        else:
            ARG_APIKEY = data['X-Cisco-Meraki-API-Key']
            NET_ID_LIST = data['NET_ID_LIST']
            site2site = []
            for ID in NET_ID_LIST:
                headers = {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "X-Cisco-Meraki-API-Key": ARG_APIKEY
                }
                NET_ID = ID
                url = f"https://api.meraki.com/api/v0/networks/{NET_ID}/siteToSiteVpn"
                response = requests.request('GET', url, headers=headers)
                site2site.append(json.loads(response.text))
            return {'site2site': site2site}
    except meraki.APIError as err:
        print('Error: ', err)
        error = (err.message['errors'][0])
        flash(error)
        return {'error': [render_template('flash_template.html'), err.status]}


@ app.route('/flask/device_switchports', methods=['GET', 'POST'])
def device_switchports():
    try:
        if request.method == 'POST':
            global data
            data = request.get_json(force=True, silent=True)
            return data
        else:
            ARG_APIKEY = data['X-Cisco-Meraki-API-Key']
            SERIAL_NUM = data['SERIAL_NUM']
            dashboard = meraki.DashboardAPI(ARG_APIKEY)
            switchports = dashboard.switch_ports.getDeviceSwitchPorts(
                SERIAL_NUM)
            return {'switchports': switchports}
    except Exception as err:
        print('Exception: ', err)
        flash(err)
        return {'error': [render_template('flash_template.html')]}


@ app.route('/flask/deploy_device_switchports', methods=['GET', 'POST'])
def deploy_device_switchports():
    try:
        if request.method == 'POST':
            importlib.reload(switchporttemplate)
            global data
            data = request.get_json(force=True, silent=True)
            ARG_APIKEY = data['X-Cisco-Meraki-API-Key']
            SERIAL_NUM = data['SERIAL_NUM']
            payload = data['PAYLOAD']
            return {'switchporttemplate': switchporttemplate.deploy(ARG_APIKEY, SERIAL_NUM, payload)}
        else:
            return {'switchporttemplate': 'boh'}
    except Exception as err:
        print('Exception: ', err)
        flash(err)
        return {'error': [render_template('flash_template.html')]}


@ app.route('/flask/change_log', methods=['GET', 'POST'])
def change_log():
    try:
        if request.method == 'POST':
            global data
            data = request.get_json(force=True, silent=True)
            return data
        else:
            ARG_APIKEY = data['X-Cisco-Meraki-API-Key']
            ORG_ID = data['organizationId']
            NET_ID = data['NET_ID']
            ADMIN_ID = data['ADMIN_ID']
            TIME_SPAN = data['TIME_SPAN']
            dashboard = meraki.DashboardAPI(ARG_APIKEY)
            if len(NET_ID) > 0 and len(ADMIN_ID) > 0:
                change_log = dashboard.change_log.getOrganizationConfigurationChanges(
                    organizationId=ORG_ID, networkId=NET_ID, adminId=ADMIN_ID, timespan=TIME_SPAN)
            elif len(NET_ID) > 0 and len(ADMIN_ID) <= 0:
                change_log = dashboard.change_log.getOrganizationConfigurationChanges(
                    organizationId=ORG_ID, networkId=NET_ID, timespan=TIME_SPAN)
            elif len(ADMIN_ID) > 0 and len(NET_ID) <= 0:
                change_log = dashboard.change_log.getOrganizationConfigurationChanges(
                    organizationId=ORG_ID, adminId=ADMIN_ID, timespan=TIME_SPAN)
            elif len(ADMIN_ID) <= 0 and len(NET_ID) <= 0:
                change_log = dashboard.change_log.getOrganizationConfigurationChanges(
                    organizationId=ORG_ID, timespan=TIME_SPAN)

            return {'change_log': change_log}
    except Exception as err:
        print('Exception: ', err)
        flash(err)
        return {'error': [render_template('flash_template.html')]}


@ app.route('/flask/admins', methods=['GET', 'POST'])
def admins():
    try:
        if request.method == 'POST':
            global data
            data = request.get_json(force=True, silent=True)
            return data
        else:
            ARG_APIKEY = data['X-Cisco-Meraki-API-Key']
            ORG_ID = data['organizationId']
            dashboard = meraki.DashboardAPI(ARG_APIKEY)
            admins = dashboard.admins.getOrganizationAdmins(ORG_ID)
            return {'admins': admins}
    except Exception as err:
        print('Exception: ', err)
        flash(err)
        return {'error': [render_template('flash_template.html')]}


@ app.route('/flask/usageHistory', methods=['GET', 'POST'])
def usageHistory():
    try:
        if request.method == 'POST':
            global data
            data = request.get_json(force=True, silent=True)
            return data
        else:
            ARG_APIKEY = data['X-Cisco-Meraki-API-Key']
            NET_ID = data['NET_ID']
            CLIENT_ID = data['CLIENT_ID']
            dashboard = meraki.DashboardAPI(ARG_APIKEY)
            usageHistory = dashboard.clients.getNetworkClientUsageHistory(
                NET_ID, CLIENT_ID)
            return {'usageHistory': usageHistory}
    except Exception as err:
        print('Exception: ', err)
        flash(err)
        return {'error': [render_template('flash_template.html')]}


@app.route('/flask/licenseState', methods=['GET', 'POST'])
def get_licenseState():
    try:
        if request.method == 'POST':
            global data
            data = request.get_json(force=True, silent=True)
            return data
        else:
            dashboard = meraki.DashboardAPI(
                data['X-Cisco-Meraki-API-Key'], output_log=False)
            licenseState = dashboard.organizations.getOrganizationLicenseState(
                data['organizationId'])
            return {'licenseState': licenseState}
    except meraki.APIError as err:
        print('Error: ', err)
        return {'error': [render_template('flash_template.html'), err.status]}


if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5000)
