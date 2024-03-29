#!/usr/bin/python2

# script is based on https://github.com/meraki/automation-scripts repository


import os
from datetime import datetime
import getopt
import json
import requests
import sys
import datetime
import time
import meraki


dirname = os.path.dirname(__file__)
log_file = dirname + '/logs/log_file.log'
error_file = dirname + '/logs/error_file.log'


# Used in merakirequestthrottler() to avoid hitting dashboard API max request rate
API_EXEC_DELAY = 0.21
LAST_MERAKI_REQUEST = datetime.datetime.now()  # used by merakirequestthrottler()


class c_Findport:
    def __init__(self):
        self.switch = ''
        self.port = ''
        self.description = ''
        self.ip = ''
        self.vlan = ''
        self.mac = ''


def merakirequestthrottler():
    # makes sure there is enough time between API requests to Dashboard not to hit shaper
    global LAST_MERAKI_REQUEST

    if (datetime.datetime.now()-LAST_MERAKI_REQUEST).total_seconds() < (API_EXEC_DELAY):
        time.sleep(API_EXEC_DELAY)

    LAST_MERAKI_REQUEST = datetime.datetime.now()
    return


def list_networks(api_key, org_id):
    e = open(error_file, 'w')
    merakirequestthrottler()
    try:
        dashboard = meraki.DashboardAPI(api_key, output_log=False)
        response = dashboard.organizations.getOrganizationNetworks(org_id, total_pages='all')        
        
        return response
    except meraki.APIError as e:
        print('Error calling list_networks: {}'.format(e), file=e)
    e.close()


def get_inventory(api_key, org_id):
    e = open(error_file, 'w')
    merakirequestthrottler()
    try:
        dashboard = meraki.DashboardAPI(api_key, output_log=False)
        response = dashboard.organizations.getOrganizationInventoryDevices(org_id, total_pages='all')
        
        return response
    except meraki.APIError as e:
        print('Error calling get_inventory: {}'.format(e), file=e)
    e.close()


def list_switch_ports(api_key, serial):
    e = open(error_file, 'w')
    merakirequestthrottler()
    try:
        dashboard = meraki.DashboardAPI(api_key, output_log=False)
        response = dashboard.switch.getDeviceSwitchPorts(serial)
        
        return response

    except meraki.APIError as e:
        print('Error calling list_switch_ports with serial number {}: {}'.format(
            serial, e), file=e)
    e.close()


def get_port_details(api_key, serial, number):
    e = open(error_file, 'w')
    merakirequestthrottler()
    try:
        dashboard = meraki.DashboardAPI(api_key, output_log=False)
        response = dashboard.switch.getDeviceSwitchPort(serial, number)

        return response
    except meraki.APIError as e:
        print('Error calling get_port_details with serial {} and port {}: {}'.format(
            serial, number, e), file=e)
    e.close()



def list_clients(api_key, serial, TIME_SPAN):  # timestamp in seconds
    e = open(error_file, 'w')

    try:
        dashboard = meraki.DashboardAPI(api_key, output_log=False)
        response = dashboard.devices.getDeviceClients(serial, timespan=TIME_SPAN)

        return response
    except meraki.APIError as e:
        print('Error calling list_clients with serial {}: {}'.format(
            serial, e), file=e)
    e.close()


def sumTwo():
    return 10 + 10


def find_ports(API_KEY, ORG_ID, MAC_ADDR, IP_ADDR, TIME_SPAN):
    f = open(log_file, 'w')
    e = open(error_file, 'w')
    session = requests.session()
    inventory = get_inventory(API_KEY, ORG_ID)
    switches = [device for device in inventory if device['model']
                [:2] in ('MS') and device['networkId'] is not None]
    switch_networks = []
    for switch in switches:
        if switch['networkId'] not in switch_networks:
            switch_networks.append(switch['networkId'])
    print('Found a total of %d switches configured across %d networks in this organization.' % (
        len(switches), len(switch_networks)), file=f)

    # Find all ports with search parameter
    if MAC_ADDR != '':

        # Searching on file with list of MAC addresses
        macs = MAC_ADDR.split('\n')

        print('Searching on list of %d MACs in file, with first and last addresses being %s and %s, respectively.' % (
            len(macs), macs[0], macs[-1]), file=f)
        tally_ports = 0

        # Find all clients per switch that match list
        for switch in switches:

            networkId = switch['networkId']
            # Find clients that were connected in last 15 minutes
            clients = list_clients(API_KEY, switch['serial'], 60 * TIME_SPAN)

            # Helper variable that is a list of all MAC addresses, in upper-case to compare with master input list
            clients_macs = [client['mac'].upper() for client in clients]

            # Helper variable that is a dict of MAC address keys to client information values

            matching_dict = {}
            for (mac, client) in zip(clients_macs, clients):

                matching_dict[mac] = client

            # Find matches between clients on switch to master input list
            matches = set(clients_macs).intersection(macs)

            # Find ports of matched clients
            findport = []
            if len(matches) > 0:
                matched_ports = {}
                for match in matches:
                    port = matching_dict[match]['switchport']
                    findport.append(c_Findport())
                    findport[0].description = matching_dict[match]['description']
                    findport.append(c_Findport())
                    findport[0].ip = matching_dict[match]['ip']
                    findport.append(c_Findport())
                    findport[0].vlan = matching_dict[match]['vlan']
                    findport.append(c_Findport())
                    findport[0].mac = matching_dict[match]['mac']

                    if port not in matched_ports:
                        matched_ports[port] = 1
                    else:
                        matched_ports[port] += 1
                findport.append(c_Findport())
                findport[0].switch = switch['name']
                print('Found %d matched MAC addresses on switch %s' %
                      (len(matches), switch['serial']), file=f)
                tally_ports += len(matched_ports.keys())
                for port in matched_ports.keys():
                    findport.append(c_Findport())
                    findport[0].port = port
                    print('- on port %s, found %d matches' %
                          (port, matched_ports[port]))
                return (findport[0].switch, findport[0].port, findport[0].description, findport[0].ip, findport[0].vlan, findport[0].mac, networkId)
        print('Found %d total ports matching search criteria.' %
              (tally_ports), file=f)

    elif IP_ADDR != '':

        tally_ports = 0

        # Find all clients per switch that match list
        for switch in switches:

            networkId = switch['networkId']

            # Find clients that were connected in last 15 minutes
            clients = list_clients(API_KEY, switch['serial'], 60 * TIME_SPAN)

            # Helper variable that is a list of all IP addresses, in upper-case to compare with master input list
            clients_ips = [client['ip'] for client in clients]

            # Helper variable that is a dict of IP address keys to client information values
            matching_dict = {}
            for (ip, client) in zip(clients_ips, clients):

                matching_dict[ip] = client

            # Find matches between clients on switch to master input
            try:
                if clients_ips != None and IP_ADDR != None:
                    matches = [s for s in clients_ips if IP_ADDR in s]
            except:
                print('error', file=e)

            # Find ports of matched clients
            findport = []
            if len(matches) > 0:
                matched_ports = {}
                for match in matches:
                    port = matching_dict[match]['switchport']
                    findport.append(c_Findport())
                    findport[0].description = matching_dict[match]['description']
                    findport.append(c_Findport())
                    findport[0].ip = matching_dict[match]['ip']
                    findport.append(c_Findport())
                    findport[0].vlan = matching_dict[match]['vlan']
                    findport.append(c_Findport())
                    findport[0].mac = matching_dict[match]['mac']

                    if port not in matched_ports:
                        matched_ports[port] = 1
                    else:
                        matched_ports[port] += 1
                findport.append(c_Findport())
                findport[0].switch = switch['name']
                print('Found %d matched IP addresses on switch %s' %
                      (len(matches), switch['serial']), file=f)
                tally_ports += len(matched_ports.keys())
                for port in matched_ports.keys():
                    findport.append(c_Findport())
                    findport[0].port = port
                    print('- on port %s, found %d matches' %
                          (port, matched_ports[port]))
                return (findport[0].switch, findport[0].port, findport[0].description, findport[0].ip, findport[0].vlan, findport[0].mac, networkId)
        print('Found %d total ports matching search criteria.' %
              (tally_ports), file=f)
    f.close()
    e.close()
