#!/usr/bin/env python3
#-*- coding: utf-8 -*-

# Before running this script you need to install these two modules:
# pip install requests
# pip install meraki-sdk
# pip install -U python-dotenv

# Before you can use these scripts you need an API key.  Following this guide to create an API key.
# https://documentation.meraki.com/zGeneral_Administration/Other_Topics/The_Cisco_Meraki_Dashboard_API#Enable_API_access

# Create a ".meraki.env" file in your home directory (special note for Windows users - the filename is dot meraki dot env).
# This is used to store your sensitive information.  If you are a Windows user and you go Windows+R and type in "cmd" and
# hit return you'll have a command prompt with the current directory equal to your home directory.  From here you can
# go "notepad .meraki.env" to create the file.  A sample might look like:
# x_cisco_meraki_api_key=****************************************
# Alternatively (ie only do this if you don't do the above) you can create a .env (note dot env) file in the same
# directory as the backup script witht the same "x_cisco_meraki_api_key" field.

# To run a backup go:
# meraki-backup.py "org name"
# This will create a file called meraki-restore.py.  To do a restore you go:
# meraki-restore.py "org name"
# Note that the store will not overwrite existing networks.  You can either rename an existing network you want to restore
# over or edit meraki-restore.py to restore into a different [new] network.  Also you can edit meraki-restore.py to only
# restore the bits you want.

import os
import sys
from meraki_sdk.meraki_sdk_client import MerakiSdkClient
from meraki_sdk.exceptions.api_exception import APIException
import argparse
import json
import meraki



# def get_org_id(meraki,orgName):
# 	result = meraki.organizations.get_organizations()
# 	for row in result:
# 		if row['name'] == orgName:
# 			return row['id']

# 	raise ValueError('The organization name does not exist')

def write_restore_header(file):
	file.write("#!/usr/bin/env python3\n");
	file.write("#-*- coding: utf-8 -*-\n");
	file.write("#\n");
	file.write("# Search for \"#restored\" and edit below that to control what is restored.\n");
	file.write("#\n");
	file.write("import os\n");
	file.write("import argparse\n");
	file.write("import requests\n");
	file.write("\n");
	file.write("\n");
	file.write("\n");
	file.write("def restore_network(ARG_ORGID, NET_ID, ARG_APIKEY):\n");
	file.write("\n");
	file.write("\theaders = {\n");
	file.write("\t\t'x-cisco-meraki-api-key': ARG_APIKEY,\n");
	file.write("\t\t'Content-Type': 'application/json'\n");
	file.write("\t\t}\n");
	file.write("\n");
	file.write("\tsession = requests.Session()\n")														
	file.write("\n");					  
	file.write("\n");
	file.write("\n");

def write_admins(file,meraki, orgid):
	myOrgAdmins=meraki.admins.get_organization_admins(orgid)
	file.write("# Organisation Dashboard Administrators\n")
	file.write("# https://dashboard.meraki.com/api_docs#create-a-new-dashboard-administrator\n")
	file.write("	posturl = 'https://api.meraki.com/api/v0/organizations/{0}/admins'.format(str(ARG_ORGID))\n")
	for row in myOrgAdmins:
		file.write("	dashboard = session.post(posturl, json="+repr(row)+", headers=headers)\n")
	file.write("\n")

def write_mx_l3_fw_rules(file,meraki,networkid):
	myRules=meraki.mx_l_3_firewall.get_network_l_3_firewall_rules(networkid)[0:-1]
	file.write("\t# MX L3 Firewall Rules\n")
	file.write("\t# https://api.meraki.com/api_docs#update-the-l3-firewall-rules-of-an-mx-network\n")
	file.write("\t\tputurl = 'https://api.meraki.com/api/v0/networks/{0}/l3FirewallRules'.format(str(networkid))\n")
	file.write("\t\tdashboard = session.put(puturl, json="+str({"rules":myRules,"syslogDefaultRule":False})+", headers=headers)\n")
	file.write("\n")

def write_mx_vlans(file,meraki,networkid):
	vlanEnabled=meraki.vlans.get_network_vlans_enabled_state(networkid)

	file.write("\t# MX VLANs\n")
	file.write("\t# https://dashboard.meraki.com/api_docs#enable/disable-vlans-for-the-given-network\n")
	file.write("\t\tputurl = 'https://api.meraki.com/api/v0/networks/{0}/vlansEnabledState'.format(str(networkid))\n")
	file.write("\t\tdashboard = session.put(puturl, json="+repr(vlanEnabled)+", headers=headers)\n")

	if vlanEnabled['enabled']:
		# VLANS are enabled
		myVLANS=meraki.vlans.get_network_vlans(networkid)

		file.write("\t# https://dashboard.meraki.com/api_docs#add-a-vlan\n")
		file.write("\t\tposturl = 'https://api.meraki.com/api/v0/networks/{0}/vlans'.format(str(networkid))\n")
		for row in myVLANS:
			file.write("\t\tdashboard = session.post(posturl, json="+repr(row)+", headers=headers)\n")
		file.write("\n")
	else:
		print("warning: MX VLANs disabled - wont be able to restore IP addressing");
		
def write_mx_cellular_fw_rules(file,meraki,networkid):
	myRules=meraki.mx_cellular_firewall.get_network_cellular_firewall_rules(networkid)[0:-1]
	file.write("\t# MX cellular firewall\n")
	file.write("\t# https://dashboard.meraki.com/api_docs#mx-cellular-firewall\n")
	file.write("\t\tputurl = 'https://api.meraki.com/api/v0/networks/{0}/cellularFirewallRules'.format(str(networkid))\n")
	file.write("\t\tdashboard = session.put(puturl, json="+str({"rules":myRules,"syslogEnabled":False})+", headers=headers)\n")
	file.write("\n")

def write_mx_vpn_fw_rules(file,meraki,orgid):
	myRules=meraki.mx_vpn_firewall.get_organization_vpn_firewall_rules(orgid)[0:-1]
	file.write("# MX VPN firewall\n")
	file.write("# https://dashboard.meraki.com/api_docs#mx-vpn-firewall\n")
	file.write("\tputurl = 'https://api.meraki.com/api/v0/organizations/{0}/vpnFirewallRules'.format(str(ARG_ORGID))\n")
	file.write("\tdashboard = session.put(puturl, json="+str({"rules":myRules,"syslogEnabled":True})+", headers=headers)\n")
	file.write("\n")

def write_vpn_settings(file,meraki,networkid):
	myVPN=meraki.networks.get_network_site_to_site_vpn(networkid)
	file.write("\t# Network - AutoVPN Settings\n")
	file.write("\t# https://dashboard.meraki.com/api_docs#update-the-site-to-site-vpn-settings-of-a-network\n")
	file.write("\t\tputurl = 'https://api.meraki.com/api/v0/networks/{0}/siteToSiteVpn'.format(str(networkid))\n")
	file.write("\t\tdashboard = session.put(puturl, json="+str(myVPN)+", headers=headers)\n")
	file.write("\n")

def write_snmp_settings(file,meraki,orgid):
	mySNMP=meraki.snmp_settings.get_organization_snmp(orgid)
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
	file.write("# https://dashboard.meraki.com/api_docs#update-the-snmp-settings-for-an-organization\n")
	file.write("\tputurl = 'https://api.meraki.com/api/v0/organizations/{0}/snmp'.format(str(ARG_ORGID))\n")
	file.write("\ttry:\n")
	file.write("\t\tdashboard = session.put(puturl, json="+str(mySNMP)+", headers=headers)\n")
	file.write("\t\tdashboard.raise_for_status()\n")
	file.write("\texcept requests.exceptions.HTTPError as err:\n")
	file.write("\t\tprint(err)\n")
	file.write("\n")

def write_non_meraki_vpn_peers(file,meraki,orgid):
	myPeers=meraki.organizations.get_organization_third_party_vpn_peers(orgid)
	file.write("# Non Meraki VPN Peers\n")
	file.write("# https://dashboard.meraki.com/api_docs#update-the-third-party-vpn-peers-for-an-organization\n")
	file.write("\tputurl = 'https://api.meraki.com/api/v0/organizations/{0}/thirdPartyVPNPeers'.format(str(ARG_ORGID))\n")
	file.write("\ttry:\n")
	file.write("\t\tdashboard = session.put(puturl, json="+str(myPeers)+", headers=headers)\n")
	file.write("\t\tdashboard.raise_for_status()\n")
	file.write("\texcept requests.exceptions.HTTPError as err:\n")
	file.write("\t\tprint(err)\n")
	file.write("\n")

def write_ssid_settings(file,meraki,networkid):
	mySSIDs=meraki.ssids.get_network_ssids(networkid)
	if mySSIDs is None:
		return
	file.write("\t# SSIDs\n")
	file.write("\t# https://dashboard.meraki.com/api_docs#update-the-attributes-of-an-ssid\n")
	for row in mySSIDs:
		file.write("\t\tputurl = 'https://api.meraki.com/api/v0/networks/{0}/ssids/"+str(row['number'])+"'.format(str(networkid))\n")
		if 'radiusServers' in row:
			print("warning: added dummy radius password for SSID "+row['name'])
			row['radiusServers'][0]['secret']='password'
		file.write("\t\tdashboard = session.put(puturl, json="+str(row)+", headers=headers)\n")

		myRules=meraki.mr_l_3_firewall.get_network_ssid_l_3_firewall_rules({'network_id':networkid, 'number':row['number']})[0:-2]
		file.write("\t# MR L3 firewall\n")
		file.write("\t# https://dashboard.meraki.com/api_docs#update-the-l3-firewall-rules-of-an-ssid-on-an-mr-network\n")
		file.write("\t\tputurl = 'https://api.meraki.com/api/v0/networks/{0}/ssids/"+str(row['number'])+"/l3FirewallRules'.format(str(networkid))\n")
		file.write("\t\tdashboard = session.put(puturl, json="+str({"rules":myRules,"allowLanAccess":True})+", headers=headers)\n")
		file.write("\n")

def write_mydevices(file,meraki,networkid):
	mydevice=meraki.devices.get_network_devices(networkid)
	if mydevice is None:
		return
	file.write("\t# Devices\n")
	file.write("\t# https://developer.cisco.com/meraki/api/#/rest/api-endpoints/devices/update-network-device\n")
	for row in mydevice:
		# file.write("\tputurl = 'https://api.meraki.com/api/v0/networks/{0}}/devices/claim'.format(str(networkid))\n")
		# file.write("\tdashboard = session.put(puturl, json="+str(row['serial'])+", headers=headers)\n")
		# print(row)
		# row.update({"url": nettype})
		if 'url' in row:
			del row['url']
		file.write("\t\tputurl = 'https://api.meraki.com/api/v0/networks/{0}/devices/"+str(row['serial'])+"'.format(str(networkid))\n")
		file.write("\t\tdashboard = session.put(puturl, json="+str(row)+", headers=headers)\n")
		if 'switchProfileId' in row:
			switchports=meraki.switch_ports.get_device_switch_ports(row['serial'])
		for port in switchports:
			file.write("\t\tputurl = 'https://api.meraki.com/api/v0/networks/{0}/devices/"+str(row['serial'])+"/switchPorts/"+str(port['number'])+"'.format(str(networkid))\n")
			file.write("\t\tdashboard = session.put(puturl, json="+str(port)+", headers=headers)\n")



def backup_network(ARG_ORGID, NET_ID, ARG_APIKEY):
	meraki = MerakiSdkClient(ARG_APIKEY)
	dirname = os.path.dirname(__file__)
	filename = os.path.join(dirname, 'meraki_restore_network.py')
	with open(filename, 'w') as file:
		write_restore_header(file)
		print('Starting Backup')
		file.write("# Edit script below this line to control what is #restored.\n")
		file.write("\n")
		file.flush()
		write_admins(file,meraki, ARG_ORGID)
		write_mx_vpn_fw_rules(file,meraki,ARG_ORGID)
		write_snmp_settings(file,meraki,ARG_ORGID)
		write_non_meraki_vpn_peers(file,meraki,ARG_ORGID)
		file.flush()
		
		myNetwork = meraki.networks.get_network(NET_ID)
		row = (myNetwork)
		
			
		if row['type'] == 'systems manager':
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
		status="Restoring network "+row['name']+' in new network '+row['name']+'-restore'
		netName = row['name']+'-restore'
		disableMyMerakiCom = row['disableMyMerakiCom']
		disableRemoteStatusPage = row['disableRemoteStatusPage']
		jsonModel.update({"type": nettype,'name': netName,"disableMyMerakiCom": disableMyMerakiCom,"disableRemoteStatusPage": disableRemoteStatusPage})

		payload = (str(jsonModel))
            
            
		file.write("# Add Network: "+row['name']+'-restore'"\n")
		print('Starting Backup')
		file.write("\tprint('"+status+"')\n")
		file.write("\ttry:\n")
		file.write("\t# https://dashboard.meraki.com/api_docs#create-a-network\n")
		file.write("\t\tposturl = 'https://api.meraki.com/api/v0/organizations/{0}/networks'.format(str(ARG_ORGID))\n")
		file.write("\t\tdashboard = session.post(posturl, json="+payload+", headers=headers)\n")
		file.write("\t\tdashboard.raise_for_status()\n")
		file.write("\t\tnetworkid=dashboard.json()['id']\n")
		file.write("\n")
		try:
			print('Starting Backup')
			write_mx_vlans(file,meraki, row['id'])
		except:
			print("no mx VLANs")
		try:
			print('Starting Backup')
			write_mx_cellular_fw_rules(file,meraki,row['id'])
		except:
			print("no mobile firewall rules")
		try:
			write_mx_l3_fw_rules(file,meraki,row['id'])
		except:
			print("no MX firewall rule")
		try:
			print('Starting Backup')
			write_vpn_settings(file,meraki,row['id'])
		except:
			print("no VPN settings")
		try:
			write_ssid_settings(file,meraki,row['id'])
		except:
			print("no WiFi settings")
		try:
			print('Starting Backup')
			write_mydevices(file,meraki,row['id'])
		except:
			print("no devices")
		file.write("\texcept requests.exceptions.HTTPError as err:\n")
		file.write("\t\tprint(err)\n")
		file.write("\t\tprint('Can not add network "+row['name']+" - it probably already exists')\n")
		print('Starting Backup')
		file.write("\n");
		file.flush()

