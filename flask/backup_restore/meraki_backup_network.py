#!/usr/bin/env python3
# -*- coding: utf-8 -*-

# script is based on https://github.com/meraki/automation-scripts repository


import os
import io
import sys
from meraki_sdk.meraki_sdk_client import MerakiSdkClient
from meraki_sdk.exceptions.api_exception import APIException
import argparse
import json
import meraki as merakiDashboard
import requests


# dirname = os.path.dirname(__file__)
# abspath = os.path.abspath(__file__)
# log_file = os.path.abspath(
#     __file__ + "/../../logs/{}_log_file.log".format(USER))
# error_file = os.path.abspath(
#     __file__ + "/../../logs/{}_error_file.log".format(USER))


def write_restore_header(file):

    file.write("#!/usr/bin/env python3\n")
    file.write("#-*- coding: utf-8 -*-\n")
    file.write("#\n")
    file.write(
        "# Search for \"#restored\" and edit below that to control what is restored.\n")
    file.write("#\n")
    file.write("import os\n")
    file.write("import argparse\n")
    file.write("import requests\n")
    file.write("\n")
    file.write("\n")
    # file.write("networkid=''\n");
    file.write("\n")
    file.write("def restore_network(ARG_ORGID, ARG_APIKEY,USER):\n")
    file.write("\tabspath = os.path.abspath(__file__)\n")
    file.write(
        "\tlog_file = os.path.abspath(__file__  + ""'/../../logs/{}_log_file.log'.format(USER)"")\n")
    file.write("\tf = open(log_file, 'w')\n")
    file.write("\n")
    file.write("\theaders = {\n")
    file.write("\t\t'x-cisco-meraki-api-key': ARG_APIKEY,\n")
    file.write("\t\t'Content-Type': 'application/json'\n")
    file.write("\t\t}\n")
    file.write("\n")
    file.write("\tsession = requests.Session()\n")
    file.write("\n")
    file.write("\n")
    file.write("\n")


def write_admins(file, meraki, orgid):
    myOrgAdmins = meraki.admins.get_organization_admins(orgid)
    file.write("# Organisation Dashboard Administrators\n")
    file.write(
        "# https://dashboard.meraki.com/api_docs#create-a-new-dashboard-administrator\n")
    file.write("\tprint('Checking Administrator',file=f)\n")
    file.write("\tf.flush()\n")
    file.write(
        "\tposturl = 'https://api.meraki.com/api/v0/organizations/{0}/admins'.format(str(ARG_ORGID))\n")
    for row in myOrgAdmins:
        file.write("\tdashboard = session.post(posturl, json=" +
                   repr(row)+", headers=headers)\n")
    file.write("\n")


def write_mx_l3_fw_rules(file, meraki, networkid):
    myRules = meraki.mx_l_3_firewall.get_network_l_3_firewall_rules(networkid)[
        0:-1]
    file.write("\t# MX L3 Firewall Rules\n")
    file.write(
        "\t# https://api.meraki.com/api_docs#update-the-l3-firewall-rules-of-an-mx-network\n")
    file.write("\t\tprint('Restoring mx_l3_fw_rules',file=f)\n")
    file.write("\t\tf.flush()\n")
    file.write(
        "\t\tputurl = 'https://api.meraki.com/api/v0/networks/{0}/l3FirewallRules'.format(str(networkid))\n")
    file.write("\t\tdashboard = session.put(puturl, json=" +
               str({"rules": myRules, "syslogDefaultRule": False})+", headers=headers)\n")
    file.write("\n")


def write_mx_vlans(file, meraki, f, networkid):
    vlanEnabled = meraki.vlans.get_network_vlans_enabled_state(networkid)
    del[vlanEnabled['networkId']]
    file.write("\t# MX VLANs\n")
    file.write(
        "\t# https://dashboard.meraki.com/api_docs#enable/disable-vlans-for-the-given-network\n")
    file.write("\t\tprint('Restoring mx_vlans',file=f)\n")
    file.write("\t\tf.flush()\n")
    file.write(
        "\t\tputurl = 'https://api.meraki.com/api/v0/networks/{0}/vlansEnabledState'.format(str(networkid))\n")
    file.write("\t\tdashboard = session.put(puturl, json=" +
               repr(vlanEnabled)+", headers=headers)\n")
    # file.write("\t\tdashboard = session.put(puturl, json="+repr(vlanEnabled)+", headers=headers)\n")

    if vlanEnabled['enabled']:
        # VLANS are enabled
        myVLANS = meraki.vlans.get_network_vlans(networkid)
        file.write("\t# https://dashboard.meraki.com/api_docs#add-a-vlan\n")
        file.write(
            "\t\tposturl = 'https://api.meraki.com/api/v0/networks/{0}/vlans'.format(str(networkid))\n")
        for row in myVLANS:
            del[row['networkId']]
            file.write("\t\tdashboard = session.post(posturl, json=" +
                       repr(row)+", headers=headers)\n")
        file.write("\n")
    else:
        print("warning: MX VLANs disabled - wont be able to restore IP addressing", file=f)
        f.flush()


def write_mx_cellular_fw_rules(file, meraki, networkid):
    myRules = meraki.mx_cellular_firewall.get_network_cellular_firewall_rules(networkid)[
        0:-1]
    file.write("\t# MX cellular firewall\n")
    file.write("\t# https://dashboard.meraki.com/api_docs#mx-cellular-firewall\n")
    file.write("\t\tprint('Restoring mx_cellular_fw_rules',file=f)\n")
    file.write("\t\tf.flush()\n")
    file.write(
        "\t\tputurl = 'https://api.meraki.com/api/v0/networks/{0}/cellularFirewallRules'.format(str(networkid))\n")
    file.write("\t\tdashboard = session.put(puturl, json=" +
               str({"rules": myRules, "syslogEnabled": False})+", headers=headers)\n")
    file.write("\n")


def write_mx_vpn_fw_rules(file, orgid, f, ARG_APIKEY):
    try:
        # myRules=meraki.mx_vpn_firewall.get_organization_vpn_firewall_rules(orgid)[0:-1]
        dashboard = merakiDashboard.DashboardAPI(ARG_APIKEY, output_log=False)
        myRules = dashboard.mx_vpn_firewall.getOrganizationVpnFirewallRules(
            orgid)
        file.write("# MX VPN firewall\n")
        file.write("# https://dashboard.meraki.com/api_docs#mx-vpn-firewall\n")
        file.write("\tprint('Restoring mx_vpn_firewall_rules',file=f)\n")
        file.write("\tf.flush()\n")
        file.write(
            "\tputurl = 'https://api.meraki.com/api/v0/organizations/{0}/vpnFirewallRules'.format(str(ARG_ORGID))\n")
        file.write("\tdashboard = session.put(puturl, json=" +
                   str({"rules": myRules, "syslogEnabled": True})+", headers=headers)\n")
        file.write("\n")
    except merakiDashboard.APIError as err:
        error = (err.message['errors'][0])
        print('warning: ', error, file=f)
        f.flush()


def write_vpn_settings(file, meraki, networkid):
    myVPN = meraki.networks.get_network_site_to_site_vpn(networkid)
    file.write("\t# Network - AutoVPN Settings\n")
    file.write(
        "\t# https://dashboard.meraki.com/api_docs#update-the-site-to-site-vpn-settings-of-a-network\n")
    file.write("\t\tprint('Restoring VPN Settings',file=f)\n")
    file.write("\t\tf.flush()\n")
    file.write(
        "\t\tputurl = 'https://api.meraki.com/api/v0/networks/{0}/siteToSiteVpn'.format(str(networkid))\n")
    file.write("\t\tdashboard = session.put(puturl, json=" +
               str(myVPN)+", headers=headers)\n")
    file.write("\n")


def write_snmp_settings(file, meraki, orgid):
    mySNMP = meraki.snmp_settings.get_organization_snmp(orgid)
    if 'v2CommunityString' in mySNMP:
        del mySNMP['v2CommunityString']
    if 'hostname' in mySNMP:
        del mySNMP['hostname']
    if 'port' in mySNMP:
        del mySNMP['port']
    if 'peerIps' in mySNMP:
        del mySNMP['peerIps']
    if mySNMP['v3AuthMode'] is None:
        del mySNMP['v3AuthMode']
    if mySNMP['v3PrivMode'] is None:
        del mySNMP['v3PrivMode']

    file.write("# SNMP Settings\n")
    file.write(
        "# https://dashboard.meraki.com/api_docs#update-the-snmp-settings-for-an-organization\n")
    file.write("\tprint('Restoring SNMP Settings',file=f)\n")
    file.write("\tf.flush()\n")
    file.write(
        "\tputurl = 'https://api.meraki.com/api/v0/organizations/{0}/snmp'.format(str(ARG_ORGID))\n")
    file.write("\ttry:\n")
    file.write("\t\tdashboard = session.put(puturl, json=" +
               str(mySNMP)+", headers=headers)\n")
    file.write("\t\tdashboard.raise_for_status()\n")
    file.write("\texcept requests.exceptions.HTTPError as err:\n")
    file.write("\t\tprint(err,file=f)\n")
    file.write("\n")


def write_non_meraki_vpn_peers(file, meraki, orgid):
    myPeers = meraki.organizations.get_organization_third_party_vpn_peers(
        orgid)
    file.write("# Non Meraki VPN Peers\n")
    file.write(
        "# https://dashboard.meraki.com/api_docs#update-the-third-party-vpn-peers-for-an-organization\n")
    file.write("\tprint('Restoring non_meraki_vpn_peers',file=f)\n")
    file.write("\tf.flush()\n")
    file.write(
        "\tputurl = 'https://api.meraki.com/api/v0/organizations/{0}/thirdPartyVPNPeers'.format(str(ARG_ORGID))\n")
    file.write("\ttry:\n")
    file.write("\t\tdashboard = session.put(puturl, json=" +
               str(myPeers)+", headers=headers)\n")
    file.write("\t\tdashboard.raise_for_status()\n")
    file.write("\texcept requests.exceptions.HTTPError as err:\n")
    file.write("\t\tprint(err,file=f)\n")
    file.write("\n")


def write_ssid_settings(file, meraki, networkid, f):
    mySSIDs = meraki.ssids.get_network_ssids(networkid)
    if mySSIDs is None:
        return
    file.write("\t# SSIDs\n")
    file.write(
        "\t# https://dashboard.meraki.com/api_docs#update-the-attributes-of-an-ssid\n")
    file.write("\t\tprint('Restoring SSIDs',file=f)\n")
    file.write("\t\tf.flush()\n")
    for row in mySSIDs:
        file.write("\t\tputurl = 'https://api.meraki.com/api/v0/networks/{0}/ssids/"+str(
            row['number'])+"'.format(str(networkid))\n")
        if 'radiusServers' in row:
            print("warning: added dummy radius password for SSID " +
                  row['name']+", replace the original password after restore.", file=f)
            row['radiusServers'][0]['secret'] = 'password'
        file.write("\t\tdashboard = session.put(puturl, json=" +
                   str(row)+", headers=headers)\n")

        myRules = meraki.mr_l_3_firewall.get_network_ssid_l_3_firewall_rules(
            {'network_id': networkid, 'number': row['number']})[0:-2]
        file.write("\t# MR L3 firewall\n")
        file.write(
            "\t# https://dashboard.meraki.com/api_docs#update-the-l3-firewall-rules-of-an-ssid-on-an-mr-network\n")
        file.write("\t\tputurl = 'https://api.meraki.com/api/v0/networks/{0}/ssids/"+str(
            row['number'])+"/l3FirewallRules'.format(str(networkid))\n")
        file.write("\t\tdashboard = session.put(puturl, json=" +
                   str({"rules": myRules, "allowLanAccess": True})+", headers=headers)\n")
        file.write("\n")


def write_devices_props(file, meraki, networkid):
    mydevice = meraki.devices.get_network_devices(networkid)
    if mydevice is None:
        return
    file.write("\t# Devices\n")
    file.write(
        "\t# https://developer.cisco.com/meraki/api/#/rest/api-endpoints/devices/update-network-device\n")
    file.write("\t\tprint('Restoring devices properties',file=f)\n")
    file.write("\t\tf.flush()\n")
    for row in mydevice:
        if 'url' in row:
            del row['url']
        if 'networkId' in row:
            del row['networkId']
        file.write("\t\tputurl = 'https://api.meraki.com/api/v0/networks/{0}/devices/"+str(
            row['serial'])+"'.format(str(networkid))\n")
        file.write("\t\tdashboard = session.put(puturl, json=" +
                   str(row)+", headers=headers)\n")


def write_mydevices(file, networkid, ARG_APIKEY, f):

    dashboard = merakiDashboard.DashboardAPI(ARG_APIKEY, output_log=False)
    mydevice = dashboard.devices.getNetworkDevices(networkid)
    try:
        if mydevice is None:
            return
        for row in mydevice:
            if 'switchProfileId' in row:
                switchports = dashboard.switch_ports.getDeviceSwitchPorts(
                    row['serial'])

                for port in switchports:
                    if 'macWhitelist' in port:
                        del port['macWhitelist']
                    if 'stickyMacWhitelist' in port:
                        del port['stickyMacWhitelist']
                    if 'stickyMacWhitelistLimit' in port:
                        del port['stickyMacWhitelistLimit']

                    dumpsport = json.dumps(port)
                    for key, value in port.items():
                        if value == None:
                            a = "null"
                            b = a.strip('"')
                            port[key] = b

                    file.write("\t\tputurl = 'https://api.meraki.com/api/v0/devices/" +
                               str(row['serial'])+"/switchPorts/"+str(port['number'])+"'\n")
                    file.write("\t\tprint('Restoring configuration Port" +
                               str(port['number'])+" switch "+str(row['serial'])+"',file=f)\n")
                    file.write("\t\tf.flush()\n")
                    file.write("\t\tpayload = '"+dumpsport+"'\n")
                    file.write(
                        "\t\tresponse = requests.request('PUT', puturl, headers=headers, data = payload)\n")
            else:
                print("warning: device " +
                      str(row['serial'])+" is not a Switch, skipping.", file=f)
                # print("warning: device is not a Switch, skipping.",file=f)
    except merakiDashboard.APIError as err:
        print("No Switchs found or there was an error writing the configuration.", file=f)
        print(err, file=f)
        f.flush()


def backup_network(ARG_ORGID, NET_ID, ARG_APIKEY, USER):

    meraki = MerakiSdkClient(ARG_APIKEY)
    dirname = os.path.dirname(__file__)
    abspath = os.path.abspath(__file__)
    log_file = os.path.abspath(
        __file__ + "/../../logs/{}_log_file.log".format(USER))
    error_file = os.path.abspath(
        __file__ + "/../../logs/{}_error_file.log".format(USER))
    filename = os.path.join(
        dirname, '{}_meraki_restore_network.py'.format(USER))

    with io.open(filename, 'w', encoding='utf-8', errors='ignore') as file:
        write_restore_header(file)
        f = open(log_file, 'w')
        print('Starting Backup', file=f)
        f.flush()
        print('Writing script file {}_meraki_restore_network.py'.format(USER), file=f)
        f.flush()
        file.write(
            "# Edit script below this line to control what is #restored.\n")
        file.write("\n")
        file.flush()

        print('Writing admins', file=f)
        f.flush()
        write_admins(file, meraki, ARG_ORGID)
        print('Writing mx_vpn_fw_rules', file=f)
        f.flush()
        write_mx_vpn_fw_rules(file, ARG_ORGID, f, ARG_APIKEY)
        print('Writing snmp_settings', file=f)
        f.flush()
        write_snmp_settings(file, meraki, ARG_ORGID)
        print('Writing non_meraki_vpn_peers', file=f)
        f.flush()
        write_non_meraki_vpn_peers(file, meraki, ARG_ORGID)

        myNetwork = meraki.networks.get_network(NET_ID)
        row = (myNetwork)

        if row['type'] == 'systems manager':
            print('Backup won t be able to restore System Manager settings', file=f)
            pass
        if row['tags'] is None:
            del row['tags']

        jsonModel = {
            "name": "",
            "disableMyMerakiCom": False,
            "disableRemoteStatusPage": False,
            "type": "appliance switch wireless",
        }

        a = row['productTypes']
        separator = ', '
        b = (separator.join(a))
        nettype = b.replace(',', '')
        status = "Restoring network " + \
            row['name']+' in new network '+row['name']+'-restore'
        netName = row['name']+'-restore'
        disableMyMerakiCom = row['disableMyMerakiCom']
        disableRemoteStatusPage = row['disableRemoteStatusPage']
        jsonModel.update({"type": nettype, 'name': netName, "disableMyMerakiCom": disableMyMerakiCom,
                          "disableRemoteStatusPage": disableRemoteStatusPage})

        payload = (str(jsonModel))

        file.write("# Add Network: "+row['name']+'-restore'"\n")
        file.write("\tprint('"+status+"',file=f)\n")
        file.write("\tf.flush()\n")
        file.write("\ttry:\n")
        file.write("\t# https://dashboard.meraki.com/api_docs#create-a-network\n")
        file.write(
            "\t\tposturl = 'https://api.meraki.com/api/v0/organizations/{0}/networks'.format(str(ARG_ORGID))\n")
        file.write("\t\tdashboard = session.post(posturl, json=" +
                   payload+", headers=headers)\n")
        file.write("\t\tdashboard.raise_for_status()\n")
        file.write("\t\tnetworkid=dashboard.json()['id']\n")
        file.write("\n")

        try:
            print('Writing mx vlans', file=f)
            f.flush()
            write_mx_vlans(file, meraki, f, row['id'])
        except:
            print("warning: no mx VLANs", file=f)
            f.flush()
        try:
            print('Writing mx cellular fw rules', file=f)
            f.flush()
            write_mx_cellular_fw_rules(file, meraki, row['id'])
        except:
            print("warning: no mobile firewall rules", file=f)
            f.flush()
        try:
            print('Writing mx l3 fw rules', file=f)
            f.flush()
            write_mx_l3_fw_rules(file, meraki, row['id'])
        except:
            print("warning: no MX firewall rule", file=f)
            f.flush()
        try:
            print('Writing vpn settings', file=f)
            f.flush()
            write_vpn_settings(file, meraki, row['id'])
        except:
            print("warning: no VPN settings", file=f)
            f.flush()
        try:
            print('Writing ssid settings', file=f)
            f.flush()
            write_ssid_settings(file, meraki, row['id'], f)
        except:
            print("warning: no WiFi settings", file=f)
            f.flush()
        try:
            print('Writing device properties', file=f)
            f.flush()
            write_devices_props(file, meraki, row['id'])
        except:
            print("warning: no devices", file=f)
            f.flush()

        # End of First Function block
        file.write("\texcept requests.exceptions.HTTPError as err:\n")
        file.write("\t\tprint(err,file=f)\n")
        file.write("\t\tprint('Can not add network " +
                   row['name']+" - it probably already exists. Change the Network name and make a new backup.',file=f)\n")
        file.write(
            "\tprint('Restoring Complete, move your switchs to the new network and restore the switch configuration.',file=f)\n")
        file.write("\tf.flush()\n")
        file.write("\tf.close()\n")
        file.write("\n")
        file.write("\n")

        # Start second Function block
        file.write("def restore_switchports(ARG_APIKEY,USER):\n")
        file.write("\tabspath = os.path.abspath(__file__)\n")
        file.write(
            "\tlog_file = os.path.abspath(__file__  + ""'/../../logs/{}_log_file.log'.format(USER)"")\n")
        file.write("\tf = open(log_file, 'w')\n")
        file.write("\n")
        file.write("\theaders = {\n")
        file.write("\t\t'x-cisco-meraki-api-key': ARG_APIKEY,\n")
        file.write("\t\t'Content-Type': 'application/json',\n")
        file.write("\t\t'Accept': 'application/json',\n")
        file.write("\t\t}\n")
        file.write("\n")
        file.write("\tsession = requests.Session()\n")
        file.write("\n")
        file.write("\n")
        file.write("\ttry:\n")
        file.write("\t\tprint('Starting restoring switchports',file=f)\n")
        file.write("\t\tf.flush()\n")

        try:
            print('Writing switch ports', file=f)
            f.flush()
            write_mydevices(file, row['id'], ARG_APIKEY, f)
        except:
            print(
                "No Switchs found or there was an error writing the configuration.", file=f)
            f.flush()

        file.write("\texcept requests.exceptions.HTTPError as err:\n")
        file.write("\t\tprint(err,file=f)\n")
        file.write(
            "\t\tprint('There was an error restoring the switchs configuration, check the logs for more details.',file=f)\n")
        file.write("\tprint('Restoring Switch configuration complete.',file=f)\n")
        file.write("\tf.flush()\n")
        file.write("\tf.close()\n")
        file.write("\n")
        file.flush()
        print('Writing complete, check the script before restore.', file=f)
    f.flush()
    f.close()
