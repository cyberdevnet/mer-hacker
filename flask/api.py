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
from werkzeug.utils import secure_filename
import meraki
import find_ports
from switchporttemplate import switchporttemplate
from backup_restore import meraki_backup_network
from cisco_meraki_migrate_tool import ios_to_meraki
import logging
from flask_cors import CORS
from flask_socketio import SocketIO, emit
from flask import Response
from pathlib import Path
import shutil
import os.path
from os import path
import pymongo
from cryptography.fernet import Fernet
from bson.objectid import ObjectId
from dotenv import load_dotenv



# Used in merakirequestthrottler() to avoid hitting dashboard API max request rate
API_EXEC_DELAY = 0.21
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

load_dotenv()
app = Flask(__name__)
socketio = SocketIO(app)
CORS(app)
FLASK_ENV_DEFAULT = 'production'

try:
    if os.getenv('FLASK_ENV',    FLASK_ENV_DEFAULT) == 'development':
        # Using a production configuration
        print("Environment is development")
        app.config.from_object('config.DevelopmentConfig')
    else:
        # Using a development configuration
        print("Environment is production")
        app.config.from_object('config.ProductionConfig')
except Exception as error:
    print('error: ', error)
    pass

DB_APIKEY_SECRET_KEY = app.config["DB_APIKEY_SECRET_KEY"]
MONGODB_USER = app.config["MONGODB_USER"]
MONGODB_PWD = app.config["MONGODB_PWD"]



# Initializing MONGODB DataBase
try:
    DBClient = pymongo.MongoClient("mongodb://localhost:27017/",username=MONGODB_USER,password=MONGODB_PWD,authSource='admin',authMechanism='SCRAM-SHA-256')
    MerHackerDB = DBClient["MerHackerDB"]
    DBClient.admin.authenticate(MONGODB_USER, MONGODB_PWD,mechanism='SCRAM-SHA-256')

    print("[+] Database connected!")
except Exception as error:
    print('DB error: ', error)
    print("[+] Database connection error!")
    # raise e


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
            networks = dashboard.organizations.getOrganizationNetworks(
                data['organizationId'])
            return {'networks': networks}
    except meraki.APIError as err:
        # flash(err)
        error = (err.message['errors'][0])
        flash(error)
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
            devices = dashboard.networks.getNetworkDevices(
                data['NET_ID'])
            return {'devices': devices}
    except meraki.APIError as err:
        print('Error: ', err)
        flash(err)
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
            vlans = dashboard.appliance.getNetworkApplianceVlans(
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
            dashboard = meraki.DashboardAPI(ARG_APIKEY, output_log=False)
            clients = dashboard.networks.getNetworkClients(
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
            deviceStatus = dashboard.organizations.getOrganizationDevicesStatuses(
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
            inventory = dashboard.organizations.getOrganizationInventoryDevices(
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
            uplinkLoss = dashboard.organizations.getOrganizationDevicesUplinksLossAndLatency(
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
            networks = dashboard.organizations.getOrganizationNetworks(
                data['organizationId'])
            vlans = {}
            for x in networks:
                try:
                    networkId = x['id']
                    networkName = x['name']
                    allVlans = dashboard.appliance.getNetworkApplianceVlans(
                        networkId)
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
            dashboard = meraki.DashboardAPI(ARG_APIKEY, output_log=False)
            device_clients = dashboard.devices.getDeviceClients(
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
            dashboard = meraki.DashboardAPI(ARG_APIKEY, output_log=False)
            client = dashboard.networks.getNetworkClient(NET_ID, CLIENT_ID)
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
            dashboard = meraki.DashboardAPI(ARG_APIKEY, output_log=False)
            switchports = dashboard.switch.getDeviceSwitchPorts(
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
            dashboard = meraki.DashboardAPI(ARG_APIKEY, output_log=False)
            if len(NET_ID) > 0 and len(ADMIN_ID) > 0:
                change_log = dashboard.organizations.getOrganizationConfigurationChanges(
                    organizationId=ORG_ID, networkId=NET_ID, adminId=ADMIN_ID, timespan=TIME_SPAN)
            elif len(NET_ID) > 0 and len(ADMIN_ID) <= 0:
                change_log = dashboard.organizations.getOrganizationConfigurationChanges(
                    organizationId=ORG_ID, networkId=NET_ID, timespan=TIME_SPAN)
            elif len(ADMIN_ID) > 0 and len(NET_ID) <= 0:
                change_log = dashboard.organizations.getOrganizationConfigurationChanges(
                    organizationId=ORG_ID, adminId=ADMIN_ID, timespan=TIME_SPAN)
            elif len(ADMIN_ID) <= 0 and len(NET_ID) <= 0:
                change_log = dashboard.organizations.getOrganizationConfigurationChanges(
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
            dashboard = meraki.DashboardAPI(ARG_APIKEY, output_log=False)
            admins = dashboard.organizations.getOrganizationAdmins(ORG_ID)
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
            dashboard = meraki.DashboardAPI(ARG_APIKEY, output_log=False)
            usageHistory = dashboard.networks.getNetworkClientUsageHistory(
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
            licenseState = dashboard.organizations.getOrganizationLicensesOverview(
                data['organizationId'])
            return {'licenseState': licenseState}
    except meraki.APIError as err:
        print('Error: ', err)
        return {'error': [render_template('flash_template.html'), err.status]}
    
    
@app.route('/flask/getTemplates', methods=['GET', 'POST'])
def getTemplates():
    try:
        if request.method == 'POST':
            global data
            data = request.get_json(force=True, silent=True)
            return data
        else:
            dashboard = meraki.DashboardAPI(
                data['X-Cisco-Meraki-API-Key'], output_log=False)
            getTemplates = dashboard.organizations.getOrganizationConfigTemplates(
                data['organizationId'])
            return {'getTemplates': getTemplates}
    except meraki.APIError as err:
        print('Error: ', err)
        return {'error': [render_template('flash_template.html'), err.status]}


@app.route('/flask/getSwitchProfiles', methods=['GET', 'POST'])
def getSwitchProfiles():
    try:
        if request.method == 'POST':
            global data
            data = request.get_json(force=True, silent=True)
            return data
        else:
            dashboard = meraki.DashboardAPI(
                data['X-Cisco-Meraki-API-Key'], output_log=False)
            getSwitchProfiles = dashboard.switch.getOrganizationConfigTemplateSwitchProfiles(
                data['organizationId'], data['configTemplateId'])
            return {'getSwitchProfiles': getSwitchProfiles}
    except meraki.APIError as err:
        print('Error: ', err)
        return {'error': [render_template('flash_template.html'), err.status]}


@app.route('/flask/createNetwork', methods=['GET', 'POST'])
def createNetwork():
    try:
        if request.method == 'POST':
            global data
            data = request.get_json(force=True, silent=True)
            return data
        else:
            name = data['newNetworkName']
            dashboard = meraki.DashboardAPI(
                data['X-Cisco-Meraki-API-Key'], output_log=False)
            product_types  = ['appliance', 'switch']
            createNetwork = dashboard.organizations.createOrganizationNetwork(
                data['organizationId'], name, product_types)
            return {'createNetwork': createNetwork}
    except meraki.APIError as err:
        print('Error: ', err)
        error = (err.message['errors'][0])
        flash(error)
        return {'error': [render_template('flash_template.html'), err.status]}


@app.route('/flask/claimDevices', methods=['GET', 'POST'])
def claimDevices():
    try:
        if request.method == 'POST':
            global data
            data = request.get_json(force=True, silent=True)
            return data
        else:
            network_id = data['network_id']
            serials = data['serials']
            dashboard = meraki.DashboardAPI(
                data['X-Cisco-Meraki-API-Key'], output_log=False)
            claimDevices = dashboard.networks.claimNetworkDevices(
                network_id, serials=serials)
            return {'claimDevices': claimDevices}
    except meraki.APIError as err:
        print('Error: ', err)
        error = (err.message['errors'][0])
        flash(error)
        return {'error': [render_template('flash_template.html'), err.status]}


@app.route('/flask/bindTemplate', methods=['GET', 'POST'])
def bindTemplate():
    try:
        if request.method == 'POST':
            global data
            data = request.get_json(force=True, silent=True)
            return data
        else:
            network_id = data['network_id']
            config_template_id = data['config_template_id']
            dashboard = meraki.DashboardAPI(
                data['X-Cisco-Meraki-API-Key'], output_log=False)
            bindTemplate = dashboard.networks.bindNetwork(
                network_id, config_template_id, autoBind=False)
            return {'bindTemplate': bindTemplate}
    except meraki.APIError as err:
        print('Error: ', err)
        error = (err.message['errors'][0])
        flash(error)
        return {'error': [render_template('flash_template.html'), err.status]}


@app.route('/flask/bindProfile', methods=['GET', 'POST'])
def bindProfile():
    try:
        if request.method == 'POST':
            global data
            data = request.get_json(force=True, silent=True)
            return data
        else:
            allSelectedSwitches = data['allSelectedSwitches']

            bindProfileData = []
            for switch in allSelectedSwitches:
                switchProfileId = switch['switchProfileId']
                serial = switch['serial']

                dashboard = meraki.DashboardAPI(
                    data['X-Cisco-Meraki-API-Key'], output_log=False)
                bindProfile = dashboard.devices.updateDevice(
                     serial, switchProfileId=switchProfileId)
                bindProfileData.append(bindProfile)
            return {'bindProfile': bindProfileData}
    except meraki.APIError as err:
        print('Error: ', err)
        error = (err.message['errors'][0])
        flash(error)
        return {'error': [render_template('flash_template.html'), err.status]}


@app.route('/flask/UpdateDevices', methods=['GET', 'POST'])
def UpdateDevices():
    try:
        if request.method == 'POST':
            global data
            data = request.get_json(force=True, silent=True)
            return data
        else:
            allSelectedDevices = data['allSelectedDevices']

            UpdateDevicesData = []
            for device in allSelectedDevices:
                serial = device['serial']
                deviceName = device['deviceName']
                address = device['address']


                dashboard = meraki.DashboardAPI(
                    data['X-Cisco-Meraki-API-Key'], output_log=False)
                UpdateDevices = dashboard.devices.updateDevice(
                    serial, name=deviceName, address=address)
                UpdateDevicesData.append(UpdateDevices)
                
            return {'UpdateDevices': UpdateDevicesData}
    except meraki.APIError as err:
        print('Error: ', err)
        error = (err.message['errors'][0])
        flash(error)
        return {'error': [render_template('flash_template.html'), err.status]}
    
    
    
    
# <---------------------------------------------UTILITIES----------------------------------------------->
# <----------------------------------------------------------------------------------------------------->


#upload backupfile for build_meraki_switchconfig

@app.route('/flask/upload_backupfile', methods=['GET', 'POST'])
def upload_backupfile():
    if request.method == 'POST':
        try:
            uploads_dir = "./cisco_meraki_migrate_tool/config_backups/backups/"
            file = request.files.get('backup')
            mimetype = file.content_type
            if not file:
                return Response('{"message": "No file uploaded", "status": 400}')
            else:
                if mimetype == "text/plain":
                    backupFile = request.files['backup']
                    backupFile.save(os.path.join(uploads_dir, secure_filename('backup.txt')))
                    result = {"message" :"Backupfile uploaded"}
                    return Response('{"message": "Backupfile uploaded", "status": 200}')

                else:
                    return Response('{"message": "Invalid File, please upload a valid .txt file containing the configuration", "status": 400}')

        except Exception as err:
            print('err: ', err)
            error = {'error': err}
            flash(error['error'])
            return {'error': [render_template('flash_template.html')]}
        
        
# DELETE backupfile for build_meraki_switchconfig(if exists)
      
@app.route('/flask/delete_backupfile', methods=['GET', 'POST'])
def delete_backupfile():
    if request.method == 'POST':
        try:
            path = Path('./cisco_meraki_migrate_tool/config_backups/backups/backup.txt')
            if path.is_file():
                Path.unlink(path)
            else:
                print ("File not exist")
            return 'Backupfile deleted'

        except Exception as err:
            print('err: ', err)
            error = {'error': err}
            flash(error['error'])
            return {'error': [render_template('flash_template.html')]}
        

# edit/update build_meraki_switchconfig script if modified by the AceEditor GUI
    
@app.route('/flask/upload_build_meraki_switchconfig', methods=['GET', 'POST'])
def upload_build_meraki_switchconfig():
    if request.method == 'POST':
        try:
            file = request.files['file']
            fileName = request.files['User']
            User = fileName.filename
            uploads_dir = f"./cisco_meraki_migrate_tool/{User}/"

            file.save(os.path.join(uploads_dir, secure_filename(file.filename)))
            return 'file changed'

        except Exception as err:
            print('err: ', err)
            error = {'error': err}
            flash(error['error'])
            return {'error': [render_template('flash_template.html')]}
        
        
        
@app.route('/flask/read_cisco_meraki_migrate_tool', methods=['GET', 'POST'])
def read_cisco_meraki_migrate_tool():
    if request.method == 'POST':
        try:
            global data
            data = request.get_json(force=True, silent=True)
            User = data['User']
            uploads_dir = f"./cisco_meraki_migrate_tool/{User}"
            filename = f"{uploads_dir}/build_meraki_switchconfig.py"
            with open(filename, "r") as f:
                content = f.read() 

            return content

        except Exception as err:
            print('err: ', err)
            error = {'error': err}
            flash(error['error'])
            return {'error': [render_template('flash_template.html')]}
        
        
@app.route('/flask/read_live_logs', methods=['GET', 'POST'])
def read_live_logs():
    if request.method == 'POST':
        try:
            global data
            data = request.get_json(force=True, silent=True)
            User = data['User']
            uploads_dir = f"./logs/{User}"
            with open(f"{uploads_dir}/log_file.log", "r") as f:
                content = f.read() 

            return content

        except Exception as err:
            print('err: ', err)
            error = {'error': err}
            flash(error['error'])
            return {'error': [render_template('flash_template.html')]}
        
        
@app.route('/flask/read_backup_restore_file', methods=['GET', 'POST'])
def read_backup_restore_file():
    if request.method == 'POST':
        try:
            global data
            data = request.get_json(force=True, silent=True)
            User = data['User']
            uploads_dir = f"./backup_restore/{User}"
            with open(f"{uploads_dir}/meraki_restore_network.py", "r") as f:
                content = f.read() 

            return content

        except Exception as err:
            print('err: ', err)
            error = {'error': err}
            flash(error['error'])
            return {'error': [render_template('flash_template.html')]}
    

# edit/update meraki_restore_network script if modified by the AceEditor GUI
    
@app.route('/flask/edit_backup_restore_file', methods=['GET', 'POST'])
def edit_backup_restore_file():
    if request.method == 'POST':
        try:
            global data
            file = request.files['file']
            fileName = request.files['User']
            User = fileName.filename
            uploads_dir = f"./backup_restore/{User}/"

            file.save(os.path.join(uploads_dir, secure_filename(file.filename)))
            return 'file changed'

        except Exception as err:
            print('err: ', err)
            error = {'error': err}
            flash(error['error'])
            return {'error': [render_template('flash_template.html')]}
        

# DELETE  backup_restore script(if exists)
      
@app.route('/flask/deletebackupRestoreFiles', methods=['GET', 'POST'])
def deletebackupRestoreFiles():
    if request.method == 'POST':
        try:
            global data
            data = request.get_json(force=True, silent=True)
            User = data['User']
            uploads_dir = f"./backup_restore/{User}"
            path = Path(f'{uploads_dir}/meraki_restore_network.py')
            if path.is_file():
                Path.unlink(path)
            else:
                print ("File not exist")
            return 'Backupfile deleted'

        except Exception as err:
            print('err: ', err)
            error = {'error': err}
            flash(error['error'])
            return {'error': [render_template('flash_template.html')]}
        
        
        
# DELETE  build_meraki_switchconfig script(if exists)
      
@app.route('/flask/deletebuild_meraki_switchconfigFiles', methods=['GET', 'POST'])
def deletebuild_meraki_switchconfigFiles():
    if request.method == 'POST':
        try:
            global data
            data = request.get_json(force=True, silent=True)
            User = data['User']
            uploads_dir = f"./cisco_meraki_migrate_tool/{User}"
            path = Path(f'{uploads_dir}/build_meraki_switchconfig.py')
            if path.is_file():
                Path.unlink(path)
            else:
                print ("File not exist")
            return 'Backupfile deleted'

        except Exception as err:
            print('err: ', err)
            error = {'error': err}
            flash(error['error'])
            return {'error': [render_template('flash_template.html')]}


# <---------------------------------------------END UTILITIES------------------------------------------->
# <----------------------------------------------------------------------------------------------------->







# <-------------------------------------APIKEY MANAGEMENT----------------------------------------------->
# <----------------------------------------------------------------------------------------------------->

# Initializing MONGODB apikeys Collection
#DBClient = pymongo.MongoClient("mongodb://localhost:27017/")
apikeysCollection = MerHackerDB['apikeys']

key = DB_APIKEY_SECRET_KEY
f = Fernet(key)


@app.route('/flask/post-api-key', methods=['GET', 'POST'])
def post_api_key():
    if request.method == 'POST':
        try:
            global data
            data = request.get_json(force=True, silent=True)
            username = data['username']
            realUsername = data['realUsername']
            apiKey = data['apiKey']
            
            apiKeyencrypted = f.encrypt(apiKey.encode('utf-8'))

            if username != "leer":
                query = { "username": username }
                payload = {'username': username, 'realUsername': realUsername, 'apiKey': apiKeyencrypted}
                newvalues = {"$set": payload}
                apikeysCollection.update_one(query, newvalues, upsert=True)
                return 'apikey updated'
            else:
                query = { "realUsername": realUsername }
                apikeysCollection.delete_one(query)
                return 'apikey deleted'
        except Exception as err:
            print('err: ', err)
            error = {'error': err}
            flash(error['error'])
            return {'error': [render_template('flash_template.html')]}
        
        
        
@app.route('/flask/get-api-key', methods=['GET', 'POST'])
def get_api_key():
    if request.method == 'POST':
        try:
            global data
            data = request.get_json(force=True, silent=True)
            username = data['username']            
            query = { "username": username }
            x = apikeysCollection.find_one(query)
            apiKeyencrypted =  x['apiKey']
            
            apiKeyDecrypted = f.decrypt(apiKeyencrypted)

            return {"apiKey": apiKeyDecrypted.decode('utf-8')}
        except Exception as err:
            print('err: ', err)
            error = {'error': err}
            flash(error['error'])
            return {'error': [render_template('flash_template.html')]}


# <------------------------------------END APIKEY MANAGEMENT-------------------------------------------->
# <----------------------------------------------------------------------------------------------------->



# <------------------------------------SWITCHPORT TEMPLATES--------------------------------------------->
# <----------------------------------------------------------------------------------------------------->
# Initializing MONGODB templates Collection
templatesCollection = MerHackerDB['SwitchPortTemplates']

@app.route('/flask/write_templateFile', methods=['GET', 'POST'])
def write_templateFile():
    if request.method == 'POST':
        try:
            global data
            data = request.get_json(force=True, silent=True)
            user = data['user']           
            templates = data['template']           
            payload = {'user': user, 'templates': templates}
            x = templatesCollection.insert_one(payload)
            
            return {'insertedID': 'template written'}
        except Exception as err:
            print('err: ', err)
            error = {'error': err}
            flash(error['error'])
            return {'error': [render_template('flash_template.html')]}
        
@app.route('/flask/read_templateFile', methods=['GET', 'POST'])
def read_templateFile():
    if request.method == 'POST':
        try:
            templates = []
            global data
            data = request.get_json(force=True, silent=True)
            user = data['user']           
            query = {'user': user}     
            findAll = templatesCollection.find(query)
            for x in findAll:
                _id = str(x['_id'])
                payload = {'_id': _id, 'user': user, 'templates' : x['templates']}
                templates.append(payload)
            
            return jsonify( templates)
        except Exception as err:
            print('err: ', err)
            error = {'error': err}
            flash(error['error'])
            return {'error': [render_template('flash_template.html')]}
        
        
@app.route('/flask/update_templateFile', methods=['GET', 'POST'])
def update_templateFile():
    if request.method == 'POST':
        try:
            global data
            data = request.get_json(force=True, silent=True)
            _id = data['_id']   
            user = data['user']       
            templates = data['template']  
            print('templates: ', templates)
                   
            query = {'_id': _id} 
            payload = {'user': user, 'templates': templates}  
            #newvalues=  {"$set": payload}
            findOneUpdate = templatesCollection.replace_one(query, payload,upsert=True)
            print('findOneUpdate: ', findOneUpdate)
            
            return {'updated': 'updated'}
        except Exception as err:
            print('err: ', err)
            error = {'error': err}
            flash(error['error'])
            return {'error': [render_template('flash_template.html')]}
        
        
        
@app.route('/flask/delete_templateFile', methods=['GET', 'POST'])
def delete_templateFile():
    if request.method == 'POST':
        try:
            templates = []
            global data
            data = request.get_json(force=True, silent=True)
            _id = data['_id']             
                   
            templatesCollection.delete_one({'_id': ObjectId(_id)})
            
            return {'deleted': 'deleted'}
        except Exception as err:
            print('err: ', err)
            error = {'error': err}
            flash(error['error'])
            return {'error': [render_template('flash_template.html')]}






# <------------------------------------END SWITCHPORT TEMPLATES----------------------------------------->
# <----------------------------------------------------------------------------------------------------->




if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5000)
