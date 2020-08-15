#!/usr/bin/env python3
#-*- coding: utf-8 -*-
#
# Search for "#restored" and edit below that to control what is restored.
#
import os
import argparse
import requests



def restore_network(ARG_ORGID, ARG_APIKEY):
	abspath = os.path.abspath(__file__)
	log_file = os.path.abspath(__file__  + '/../../logs/log_file.log')
	f = open(log_file, 'w')

	headers = {
		'x-cisco-meraki-api-key': ARG_APIKEY,
		'Content-Type': 'application/json'
		}

	session = requests.Session()



# Edit script below this line to control what is #restored.

# Organisation Dashboard Administrators
# https://dashboard.meraki.com/api_docs#create-a-new-dashboard-administrator
	print('Checking Administrator',file=f)
	f.flush()
	posturl = 'https://api.meraki.com/api/v0/organizations/{0}/admins'.format(str(ARG_ORGID))
	dashboard = session.post(posturl, json={'accountStatus': 'ok', 'authenticationMethod': 'Email', 'email': 'devnetmerakiadmin@cisco.com', 'hasApiKey': True, 'id': '566327653141950435', 'lastActive': 1590763490, 'name': 'DevNet Admin', 'networks': [], 'orgAccess': 'read-only', 'tags': [], 'twoFactorAuthEnabled': False}, headers=headers)
	dashboard = session.post(posturl, json={'accountStatus': 'ok', 'authenticationMethod': 'Email', 'email': 'devnetmerakiassoc@cisco.com', 'hasApiKey': True, 'id': '566327653141950436', 'lastActive': 1579727981, 'name': 'DevNet Assoc', 'networks': [], 'orgAccess': 'read-only', 'tags': [], 'twoFactorAuthEnabled': False}, headers=headers)
	dashboard = session.post(posturl, json={'accountStatus': 'ok', 'authenticationMethod': 'Email', 'email': 'mdenapol@cisco.com', 'hasApiKey': True, 'id': '566327653141950430', 'lastActive': 1597474309, 'name': 'Matt Work', 'networks': [], 'orgAccess': 'full', 'tags': [], 'twoFactorAuthEnabled': False}, headers=headers)

# MX VPN firewall
# https://dashboard.meraki.com/api_docs#mx-vpn-firewall
	print('Restoring mx_vpn_firewall_rules',file=f)
	f.flush()
	puturl = 'https://api.meraki.com/api/v0/organizations/{0}/vpnFirewallRules'.format(str(ARG_ORGID))
	dashboard = session.put(puturl, json={'rules': [{'comment': 'Default rule', 'policy': 'allow', 'protocol': 'Any', 'srcPort': 'Any', 'srcCidr': 'Any', 'destPort': 'Any', 'destCidr': 'Any', 'syslogEnabled': True}], 'syslogEnabled': True}, headers=headers)

# SNMP Settings
# https://dashboard.meraki.com/api_docs#update-the-snmp-settings-for-an-organization
	print('Restoring SNMP Settings',file=f)
	f.flush()
	puturl = 'https://api.meraki.com/api/v0/organizations/{0}/snmp'.format(str(ARG_ORGID))
	try:
		dashboard = session.put(puturl, json={'v2cEnabled': False, 'v3Enabled': False}, headers=headers)
		dashboard.raise_for_status()
	except requests.exceptions.HTTPError as err:
		print(err,file=f)

# Non Meraki VPN Peers
# https://dashboard.meraki.com/api_docs#update-the-third-party-vpn-peers-for-an-organization
	print('Restoring non_meraki_vpn_peers',file=f)
	f.flush()
	puturl = 'https://api.meraki.com/api/v0/organizations/{0}/thirdPartyVPNPeers'.format(str(ARG_ORGID))
	try:
		dashboard = session.put(puturl, json=[], headers=headers)
		dashboard.raise_for_status()
	except requests.exceptions.HTTPError as err:
		print(err,file=f)

# Add Network: DevNetAssoc1-restore
	print('Restoring network DevNetAssoc1 in new network DevNetAssoc1-restore',file=f)
	f.flush()
	try:
	# https://dashboard.meraki.com/api_docs#create-a-network
		posturl = 'https://api.meraki.com/api/v0/organizations/{0}/networks'.format(str(ARG_ORGID))
		dashboard = session.post(posturl, json={'name': 'DevNetAssoc1-restore', 'disableMyMerakiCom': False, 'disableRemoteStatusPage': True, 'type': 'appliance camera switch wireless'}, headers=headers)
		dashboard.raise_for_status()
		networkid=dashboard.json()['id']

	# MX VLANs
	# https://dashboard.meraki.com/api_docs#enable/disable-vlans-for-the-given-network
		print('Restoring mx_vlans',file=f)
		f.flush()
		puturl = 'https://api.meraki.com/api/v0/networks/{0}/vlansEnabledState'.format(str(networkid))
		dashboard = session.put(puturl, json={'enabled': False}, headers=headers)
	# MX cellular firewall
	# https://dashboard.meraki.com/api_docs#mx-cellular-firewall
		print('Restoring mx_cellular_fw_rules',file=f)
		f.flush()
		puturl = 'https://api.meraki.com/api/v0/networks/{0}/cellularFirewallRules'.format(str(networkid))
		dashboard = session.put(puturl, json={'rules': [], 'syslogEnabled': False}, headers=headers)

	# MX L3 Firewall Rules
	# https://api.meraki.com/api_docs#update-the-l3-firewall-rules-of-an-mx-network
		print('Restoring mx_l3_fw_rules',file=f)
		f.flush()
		puturl = 'https://api.meraki.com/api/v0/networks/{0}/l3FirewallRules'.format(str(networkid))
		dashboard = session.put(puturl, json={'rules': [], 'syslogDefaultRule': False}, headers=headers)

	# Network - AutoVPN Settings
	# https://dashboard.meraki.com/api_docs#update-the-site-to-site-vpn-settings-of-a-network
		print('Restoring VPN Settings',file=f)
		f.flush()
		puturl = 'https://api.meraki.com/api/v0/networks/{0}/siteToSiteVpn'.format(str(networkid))
		dashboard = session.put(puturl, json={'mode': 'none'}, headers=headers)

	# SSIDs
	# https://dashboard.meraki.com/api_docs#update-the-attributes-of-an-ssid
		print('Restoring SSIDs',file=f)
		f.flush()
		puturl = 'https://api.meraki.com/api/v0/networks/{0}/ssids/0'.format(str(networkid))
		dashboard = session.put(puturl, json={'authMode': 'open', 'availabilityTags': [], 'availableOnAllAps': True, 'bandSelection': 'Dual band operation', 'enabled': True, 'ipAssignmentMode': 'NAT mode', 'minBitrate': 11, 'name': 'DevNetAssoc1 - wireless WiFi', 'number': 0, 'perClientBandwidthLimitDown': 0, 'perClientBandwidthLimitUp': 0, 'splashPage': 'None', 'ssidAdminAccessible': False, 'visible': True}, headers=headers)
	# MR L3 firewall
	# https://dashboard.meraki.com/api_docs#update-the-l3-firewall-rules-of-an-ssid-on-an-mr-network
		puturl = 'https://api.meraki.com/api/v0/networks/{0}/ssids/0/l3FirewallRules'.format(str(networkid))
		dashboard = session.put(puturl, json={'rules': [], 'allowLanAccess': True}, headers=headers)

		puturl = 'https://api.meraki.com/api/v0/networks/{0}/ssids/1'.format(str(networkid))
		dashboard = session.put(puturl, json={'authMode': 'open', 'availabilityTags': [], 'availableOnAllAps': True, 'bandSelection': 'Dual band operation', 'enabled': False, 'ipAssignmentMode': 'NAT mode', 'minBitrate': 11, 'name': 'Unconfigured SSID 2', 'number': 1, 'perClientBandwidthLimitDown': 0, 'perClientBandwidthLimitUp': 0, 'splashPage': 'None', 'ssidAdminAccessible': False, 'visible': True}, headers=headers)
	# MR L3 firewall
	# https://dashboard.meraki.com/api_docs#update-the-l3-firewall-rules-of-an-ssid-on-an-mr-network
		puturl = 'https://api.meraki.com/api/v0/networks/{0}/ssids/1/l3FirewallRules'.format(str(networkid))
		dashboard = session.put(puturl, json={'rules': [], 'allowLanAccess': True}, headers=headers)

		puturl = 'https://api.meraki.com/api/v0/networks/{0}/ssids/2'.format(str(networkid))
		dashboard = session.put(puturl, json={'authMode': 'open', 'availabilityTags': [], 'availableOnAllAps': True, 'bandSelection': 'Dual band operation', 'enabled': False, 'ipAssignmentMode': 'NAT mode', 'minBitrate': 11, 'name': 'Unconfigured SSID 3', 'number': 2, 'perClientBandwidthLimitDown': 0, 'perClientBandwidthLimitUp': 0, 'splashPage': 'None', 'ssidAdminAccessible': False, 'visible': True}, headers=headers)
	# MR L3 firewall
	# https://dashboard.meraki.com/api_docs#update-the-l3-firewall-rules-of-an-ssid-on-an-mr-network
		puturl = 'https://api.meraki.com/api/v0/networks/{0}/ssids/2/l3FirewallRules'.format(str(networkid))
		dashboard = session.put(puturl, json={'rules': [], 'allowLanAccess': True}, headers=headers)

		puturl = 'https://api.meraki.com/api/v0/networks/{0}/ssids/3'.format(str(networkid))
		dashboard = session.put(puturl, json={'authMode': 'open', 'availabilityTags': [], 'availableOnAllAps': True, 'bandSelection': 'Dual band operation', 'enabled': False, 'ipAssignmentMode': 'NAT mode', 'minBitrate': 11, 'name': 'Unconfigured SSID 4', 'number': 3, 'perClientBandwidthLimitDown': 0, 'perClientBandwidthLimitUp': 0, 'splashPage': 'None', 'ssidAdminAccessible': False, 'visible': True}, headers=headers)
	# MR L3 firewall
	# https://dashboard.meraki.com/api_docs#update-the-l3-firewall-rules-of-an-ssid-on-an-mr-network
		puturl = 'https://api.meraki.com/api/v0/networks/{0}/ssids/3/l3FirewallRules'.format(str(networkid))
		dashboard = session.put(puturl, json={'rules': [], 'allowLanAccess': True}, headers=headers)

		puturl = 'https://api.meraki.com/api/v0/networks/{0}/ssids/4'.format(str(networkid))
		dashboard = session.put(puturl, json={'authMode': 'open', 'availabilityTags': [], 'availableOnAllAps': True, 'bandSelection': 'Dual band operation', 'enabled': False, 'ipAssignmentMode': 'NAT mode', 'minBitrate': 11, 'name': 'Unconfigured SSID 5', 'number': 4, 'perClientBandwidthLimitDown': 0, 'perClientBandwidthLimitUp': 0, 'splashPage': 'None', 'ssidAdminAccessible': False, 'visible': True}, headers=headers)
	# MR L3 firewall
	# https://dashboard.meraki.com/api_docs#update-the-l3-firewall-rules-of-an-ssid-on-an-mr-network
		puturl = 'https://api.meraki.com/api/v0/networks/{0}/ssids/4/l3FirewallRules'.format(str(networkid))
		dashboard = session.put(puturl, json={'rules': [], 'allowLanAccess': True}, headers=headers)

		puturl = 'https://api.meraki.com/api/v0/networks/{0}/ssids/5'.format(str(networkid))
		dashboard = session.put(puturl, json={'authMode': 'open', 'availabilityTags': [], 'availableOnAllAps': True, 'bandSelection': 'Dual band operation', 'enabled': False, 'ipAssignmentMode': 'NAT mode', 'minBitrate': 11, 'name': 'Unconfigured SSID 6', 'number': 5, 'perClientBandwidthLimitDown': 0, 'perClientBandwidthLimitUp': 0, 'splashPage': 'None', 'ssidAdminAccessible': False, 'visible': True}, headers=headers)
	# MR L3 firewall
	# https://dashboard.meraki.com/api_docs#update-the-l3-firewall-rules-of-an-ssid-on-an-mr-network
		puturl = 'https://api.meraki.com/api/v0/networks/{0}/ssids/5/l3FirewallRules'.format(str(networkid))
		dashboard = session.put(puturl, json={'rules': [], 'allowLanAccess': True}, headers=headers)

		puturl = 'https://api.meraki.com/api/v0/networks/{0}/ssids/6'.format(str(networkid))
		dashboard = session.put(puturl, json={'authMode': 'open', 'availabilityTags': [], 'availableOnAllAps': True, 'bandSelection': 'Dual band operation', 'enabled': False, 'ipAssignmentMode': 'NAT mode', 'minBitrate': 11, 'name': 'Unconfigured SSID 7', 'number': 6, 'perClientBandwidthLimitDown': 0, 'perClientBandwidthLimitUp': 0, 'splashPage': 'None', 'ssidAdminAccessible': False, 'visible': True}, headers=headers)
	# MR L3 firewall
	# https://dashboard.meraki.com/api_docs#update-the-l3-firewall-rules-of-an-ssid-on-an-mr-network
		puturl = 'https://api.meraki.com/api/v0/networks/{0}/ssids/6/l3FirewallRules'.format(str(networkid))
		dashboard = session.put(puturl, json={'rules': [], 'allowLanAccess': True}, headers=headers)

		puturl = 'https://api.meraki.com/api/v0/networks/{0}/ssids/7'.format(str(networkid))
		dashboard = session.put(puturl, json={'authMode': 'open', 'availabilityTags': [], 'availableOnAllAps': True, 'bandSelection': 'Dual band operation', 'enabled': False, 'ipAssignmentMode': 'NAT mode', 'minBitrate': 11, 'name': 'Unconfigured SSID 8', 'number': 7, 'perClientBandwidthLimitDown': 0, 'perClientBandwidthLimitUp': 0, 'splashPage': 'None', 'ssidAdminAccessible': False, 'visible': True}, headers=headers)
	# MR L3 firewall
	# https://dashboard.meraki.com/api_docs#update-the-l3-firewall-rules-of-an-ssid-on-an-mr-network
		puturl = 'https://api.meraki.com/api/v0/networks/{0}/ssids/7/l3FirewallRules'.format(str(networkid))
		dashboard = session.put(puturl, json={'rules': [], 'allowLanAccess': True}, headers=headers)

		puturl = 'https://api.meraki.com/api/v0/networks/{0}/ssids/8'.format(str(networkid))
		dashboard = session.put(puturl, json={'authMode': 'open', 'availabilityTags': [], 'availableOnAllAps': True, 'bandSelection': 'Dual band operation', 'enabled': False, 'ipAssignmentMode': 'NAT mode', 'minBitrate': 11, 'name': 'Unconfigured SSID 9', 'number': 8, 'perClientBandwidthLimitDown': 0, 'perClientBandwidthLimitUp': 0, 'splashPage': 'None', 'ssidAdminAccessible': False, 'visible': True}, headers=headers)
	# MR L3 firewall
	# https://dashboard.meraki.com/api_docs#update-the-l3-firewall-rules-of-an-ssid-on-an-mr-network
		puturl = 'https://api.meraki.com/api/v0/networks/{0}/ssids/8/l3FirewallRules'.format(str(networkid))
		dashboard = session.put(puturl, json={'rules': [], 'allowLanAccess': True}, headers=headers)

		puturl = 'https://api.meraki.com/api/v0/networks/{0}/ssids/9'.format(str(networkid))
		dashboard = session.put(puturl, json={'authMode': 'open', 'availabilityTags': [], 'availableOnAllAps': True, 'bandSelection': 'Dual band operation', 'enabled': False, 'ipAssignmentMode': 'NAT mode', 'minBitrate': 11, 'name': 'Unconfigured SSID 10', 'number': 9, 'perClientBandwidthLimitDown': 0, 'perClientBandwidthLimitUp': 0, 'splashPage': 'None', 'ssidAdminAccessible': False, 'visible': True}, headers=headers)
	# MR L3 firewall
	# https://dashboard.meraki.com/api_docs#update-the-l3-firewall-rules-of-an-ssid-on-an-mr-network
		puturl = 'https://api.meraki.com/api/v0/networks/{0}/ssids/9/l3FirewallRules'.format(str(networkid))
		dashboard = session.put(puturl, json={'rules': [], 'allowLanAccess': True}, headers=headers)

		puturl = 'https://api.meraki.com/api/v0/networks/{0}/ssids/10'.format(str(networkid))
		dashboard = session.put(puturl, json={'authMode': 'open', 'availabilityTags': [], 'availableOnAllAps': True, 'bandSelection': 'Dual band operation', 'enabled': False, 'ipAssignmentMode': 'NAT mode', 'minBitrate': 11, 'name': 'Unconfigured SSID 11', 'number': 10, 'perClientBandwidthLimitDown': 0, 'perClientBandwidthLimitUp': 0, 'splashPage': 'None', 'ssidAdminAccessible': False, 'visible': True}, headers=headers)
	# MR L3 firewall
	# https://dashboard.meraki.com/api_docs#update-the-l3-firewall-rules-of-an-ssid-on-an-mr-network
		puturl = 'https://api.meraki.com/api/v0/networks/{0}/ssids/10/l3FirewallRules'.format(str(networkid))
		dashboard = session.put(puturl, json={'rules': [], 'allowLanAccess': True}, headers=headers)

		puturl = 'https://api.meraki.com/api/v0/networks/{0}/ssids/11'.format(str(networkid))
		dashboard = session.put(puturl, json={'authMode': 'open', 'availabilityTags': [], 'availableOnAllAps': True, 'bandSelection': 'Dual band operation', 'enabled': False, 'ipAssignmentMode': 'NAT mode', 'minBitrate': 11, 'name': 'Unconfigured SSID 12', 'number': 11, 'perClientBandwidthLimitDown': 0, 'perClientBandwidthLimitUp': 0, 'splashPage': 'None', 'ssidAdminAccessible': False, 'visible': True}, headers=headers)
	# MR L3 firewall
	# https://dashboard.meraki.com/api_docs#update-the-l3-firewall-rules-of-an-ssid-on-an-mr-network
		puturl = 'https://api.meraki.com/api/v0/networks/{0}/ssids/11/l3FirewallRules'.format(str(networkid))
		dashboard = session.put(puturl, json={'rules': [], 'allowLanAccess': True}, headers=headers)

		puturl = 'https://api.meraki.com/api/v0/networks/{0}/ssids/12'.format(str(networkid))
		dashboard = session.put(puturl, json={'authMode': 'open', 'availabilityTags': [], 'availableOnAllAps': True, 'bandSelection': 'Dual band operation', 'enabled': False, 'ipAssignmentMode': 'NAT mode', 'minBitrate': 11, 'name': 'Unconfigured SSID 13', 'number': 12, 'perClientBandwidthLimitDown': 0, 'perClientBandwidthLimitUp': 0, 'splashPage': 'None', 'ssidAdminAccessible': False, 'visible': True}, headers=headers)
	# MR L3 firewall
	# https://dashboard.meraki.com/api_docs#update-the-l3-firewall-rules-of-an-ssid-on-an-mr-network
		puturl = 'https://api.meraki.com/api/v0/networks/{0}/ssids/12/l3FirewallRules'.format(str(networkid))
		dashboard = session.put(puturl, json={'rules': [], 'allowLanAccess': True}, headers=headers)

		puturl = 'https://api.meraki.com/api/v0/networks/{0}/ssids/13'.format(str(networkid))
		dashboard = session.put(puturl, json={'authMode': 'open', 'availabilityTags': [], 'availableOnAllAps': True, 'bandSelection': 'Dual band operation', 'enabled': False, 'ipAssignmentMode': 'NAT mode', 'minBitrate': 11, 'name': 'Unconfigured SSID 14', 'number': 13, 'perClientBandwidthLimitDown': 0, 'perClientBandwidthLimitUp': 0, 'splashPage': 'None', 'ssidAdminAccessible': False, 'visible': True}, headers=headers)
	# MR L3 firewall
	# https://dashboard.meraki.com/api_docs#update-the-l3-firewall-rules-of-an-ssid-on-an-mr-network
		puturl = 'https://api.meraki.com/api/v0/networks/{0}/ssids/13/l3FirewallRules'.format(str(networkid))
		dashboard = session.put(puturl, json={'rules': [], 'allowLanAccess': True}, headers=headers)

		puturl = 'https://api.meraki.com/api/v0/networks/{0}/ssids/14'.format(str(networkid))
		dashboard = session.put(puturl, json={'authMode': 'open', 'availabilityTags': [], 'availableOnAllAps': True, 'bandSelection': 'Dual band operation', 'enabled': False, 'ipAssignmentMode': 'NAT mode', 'minBitrate': 11, 'name': 'Unconfigured SSID 15', 'number': 14, 'perClientBandwidthLimitDown': 0, 'perClientBandwidthLimitUp': 0, 'splashPage': 'None', 'ssidAdminAccessible': False, 'visible': True}, headers=headers)
	# MR L3 firewall
	# https://dashboard.meraki.com/api_docs#update-the-l3-firewall-rules-of-an-ssid-on-an-mr-network
		puturl = 'https://api.meraki.com/api/v0/networks/{0}/ssids/14/l3FirewallRules'.format(str(networkid))
		dashboard = session.put(puturl, json={'rules': [], 'allowLanAccess': True}, headers=headers)

	# Devices
	# https://developer.cisco.com/meraki/api/#/rest/api-endpoints/devices/update-network-device
		print('Restoring devices properties',file=f)
		f.flush()
		puturl = 'https://api.meraki.com/api/v0/networks/{0}/devices/QBSA-UP8W-9MMW'.format(str(networkid))
		dashboard = session.put(puturl, json={'address': '', 'firmware': 'Not running configured version', 'floorPlanId': None, 'lanIp': None, 'lat': 37.4180951010362, 'lng': -122.098531723022, 'mac': '4c:c8:a1:03:00:c0', 'model': 'MX450', 'serial': 'QBSA-UP8W-9MMW', 'wan1Ip': None, 'wan2Ip': None}, headers=headers)
		puturl = 'https://api.meraki.com/api/v0/networks/{0}/devices/QBSD-9A9B-MC9K'.format(str(networkid))
		dashboard = session.put(puturl, json={'address': '', 'firmware': 'Not running configured version', 'floorPlanId': None, 'lanIp': None, 'lat': 37.4180951010362, 'lng': -122.098531723022, 'mac': '4c:c8:a1:12:00:c0', 'model': 'MV32', 'serial': 'QBSD-9A9B-MC9K', 'wirelessMac': '4c:c8:a1:12:00:c1'}, headers=headers)
		puturl = 'https://api.meraki.com/api/v0/networks/{0}/devices/QBSC-8F99-Q6RL'.format(str(networkid))
		dashboard = session.put(puturl, json={'address': '', 'firmware': 'Not running configured version', 'floorPlanId': None, 'lanIp': None, 'lat': 37.4180951010362, 'lng': -122.098531723022, 'mac': '4c:c8:a1:0e:00:c0', 'model': 'MR74', 'serial': 'QBSC-8F99-Q6RL'}, headers=headers)
		puturl = 'https://api.meraki.com/api/v0/networks/{0}/devices/QBSB-DEWE-PJ9M'.format(str(networkid))
		dashboard = session.put(puturl, json={'address': '', 'firmware': 'Not running configured version', 'floorPlanId': None, 'lanIp': None, 'lat': 37.4180951010362, 'lng': -122.098531723022, 'mac': '4c:c8:a1:09:00:c0', 'model': 'MS425-32', 'serial': 'QBSB-DEWE-PJ9M', 'switchProfileId': None}, headers=headers)
	except requests.exceptions.HTTPError as err:
		print(err,file=f)
		print('Can not add network DevNetAssoc1 - it probably already exists. Change the Network name and make a new backup.',file=f)
	print('Restoring Complete, move your switchs to the new network and restore the switch configuration.',file=f)
	f.flush()
	f.close()


def restore_switchports(ARG_APIKEY):
	abspath = os.path.abspath(__file__)
	log_file = os.path.abspath(__file__  + '/../../logs/log_file.log')
	f = open(log_file, 'w')

	headers = {
		'x-cisco-meraki-api-key': ARG_APIKEY,
		'Content-Type': 'application/json',
		'Accept': 'application/json',
		}

	session = requests.Session()


	try:
		print('Starting restoring switchports',file=f)
		puturl = 'https://api.meraki.com/api/v0/devices/QBSB-DEWE-PJ9M/switchPorts/1'
		print('Restoring configuration Port1 switch QBSB-DEWE-PJ9M',file=f)
		payload = '{"number": 1, "name": null, "tags": null, "enabled": true, "poeEnabled": false, "type": "trunk", "vlan": 1, "voiceVlan": null, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": null}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/QBSB-DEWE-PJ9M/switchPorts/2'
		print('Restoring configuration Port2 switch QBSB-DEWE-PJ9M',file=f)
		payload = '{"number": 2, "name": null, "tags": null, "enabled": true, "poeEnabled": false, "type": "trunk", "vlan": 1, "voiceVlan": null, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": null}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/QBSB-DEWE-PJ9M/switchPorts/3'
		print('Restoring configuration Port3 switch QBSB-DEWE-PJ9M',file=f)
		payload = '{"number": 3, "name": null, "tags": null, "enabled": true, "poeEnabled": false, "type": "trunk", "vlan": 1, "voiceVlan": null, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": null}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/QBSB-DEWE-PJ9M/switchPorts/4'
		print('Restoring configuration Port4 switch QBSB-DEWE-PJ9M',file=f)
		payload = '{"number": 4, "name": null, "tags": null, "enabled": true, "poeEnabled": false, "type": "trunk", "vlan": 1, "voiceVlan": null, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": null}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/QBSB-DEWE-PJ9M/switchPorts/5'
		print('Restoring configuration Port5 switch QBSB-DEWE-PJ9M',file=f)
		payload = '{"number": 5, "name": null, "tags": null, "enabled": true, "poeEnabled": false, "type": "trunk", "vlan": 1, "voiceVlan": null, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": null}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/QBSB-DEWE-PJ9M/switchPorts/6'
		print('Restoring configuration Port6 switch QBSB-DEWE-PJ9M',file=f)
		payload = '{"number": 6, "name": null, "tags": null, "enabled": true, "poeEnabled": false, "type": "trunk", "vlan": 1, "voiceVlan": null, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": null}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/QBSB-DEWE-PJ9M/switchPorts/7'
		print('Restoring configuration Port7 switch QBSB-DEWE-PJ9M',file=f)
		payload = '{"number": 7, "name": null, "tags": null, "enabled": true, "poeEnabled": false, "type": "trunk", "vlan": 1, "voiceVlan": null, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": null}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/QBSB-DEWE-PJ9M/switchPorts/8'
		print('Restoring configuration Port8 switch QBSB-DEWE-PJ9M',file=f)
		payload = '{"number": 8, "name": null, "tags": null, "enabled": true, "poeEnabled": false, "type": "trunk", "vlan": 1, "voiceVlan": null, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": null}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/QBSB-DEWE-PJ9M/switchPorts/9'
		print('Restoring configuration Port9 switch QBSB-DEWE-PJ9M',file=f)
		payload = '{"number": 9, "name": null, "tags": null, "enabled": true, "poeEnabled": false, "type": "trunk", "vlan": 1, "voiceVlan": null, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": null}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/QBSB-DEWE-PJ9M/switchPorts/10'
		print('Restoring configuration Port10 switch QBSB-DEWE-PJ9M',file=f)
		payload = '{"number": 10, "name": null, "tags": null, "enabled": true, "poeEnabled": false, "type": "trunk", "vlan": 1, "voiceVlan": null, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": null}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/QBSB-DEWE-PJ9M/switchPorts/11'
		print('Restoring configuration Port11 switch QBSB-DEWE-PJ9M',file=f)
		payload = '{"number": 11, "name": null, "tags": null, "enabled": true, "poeEnabled": false, "type": "trunk", "vlan": 1, "voiceVlan": null, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": null}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/QBSB-DEWE-PJ9M/switchPorts/12'
		print('Restoring configuration Port12 switch QBSB-DEWE-PJ9M',file=f)
		payload = '{"number": 12, "name": null, "tags": null, "enabled": true, "poeEnabled": false, "type": "trunk", "vlan": 1, "voiceVlan": null, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": null}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/QBSB-DEWE-PJ9M/switchPorts/13'
		print('Restoring configuration Port13 switch QBSB-DEWE-PJ9M',file=f)
		payload = '{"number": 13, "name": null, "tags": null, "enabled": true, "poeEnabled": false, "type": "trunk", "vlan": 1, "voiceVlan": null, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": null}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/QBSB-DEWE-PJ9M/switchPorts/14'
		print('Restoring configuration Port14 switch QBSB-DEWE-PJ9M',file=f)
		payload = '{"number": 14, "name": null, "tags": null, "enabled": true, "poeEnabled": false, "type": "trunk", "vlan": 1, "voiceVlan": null, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": null}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/QBSB-DEWE-PJ9M/switchPorts/15'
		print('Restoring configuration Port15 switch QBSB-DEWE-PJ9M',file=f)
		payload = '{"number": 15, "name": null, "tags": null, "enabled": true, "poeEnabled": false, "type": "trunk", "vlan": 1, "voiceVlan": null, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": null}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/QBSB-DEWE-PJ9M/switchPorts/16'
		print('Restoring configuration Port16 switch QBSB-DEWE-PJ9M',file=f)
		payload = '{"number": 16, "name": null, "tags": null, "enabled": true, "poeEnabled": false, "type": "trunk", "vlan": 1, "voiceVlan": null, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": null}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/QBSB-DEWE-PJ9M/switchPorts/17'
		print('Restoring configuration Port17 switch QBSB-DEWE-PJ9M',file=f)
		payload = '{"number": 17, "name": null, "tags": null, "enabled": true, "poeEnabled": false, "type": "trunk", "vlan": 1, "voiceVlan": null, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": null}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/QBSB-DEWE-PJ9M/switchPorts/18'
		print('Restoring configuration Port18 switch QBSB-DEWE-PJ9M',file=f)
		payload = '{"number": 18, "name": null, "tags": null, "enabled": true, "poeEnabled": false, "type": "trunk", "vlan": 1, "voiceVlan": null, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": null}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/QBSB-DEWE-PJ9M/switchPorts/19'
		print('Restoring configuration Port19 switch QBSB-DEWE-PJ9M',file=f)
		payload = '{"number": 19, "name": null, "tags": null, "enabled": true, "poeEnabled": false, "type": "trunk", "vlan": 1, "voiceVlan": null, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": null}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/QBSB-DEWE-PJ9M/switchPorts/20'
		print('Restoring configuration Port20 switch QBSB-DEWE-PJ9M',file=f)
		payload = '{"number": 20, "name": null, "tags": null, "enabled": true, "poeEnabled": false, "type": "trunk", "vlan": 1, "voiceVlan": null, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": null}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/QBSB-DEWE-PJ9M/switchPorts/21'
		print('Restoring configuration Port21 switch QBSB-DEWE-PJ9M',file=f)
		payload = '{"number": 21, "name": null, "tags": null, "enabled": true, "poeEnabled": false, "type": "trunk", "vlan": 1, "voiceVlan": null, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": null}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/QBSB-DEWE-PJ9M/switchPorts/22'
		print('Restoring configuration Port22 switch QBSB-DEWE-PJ9M',file=f)
		payload = '{"number": 22, "name": null, "tags": null, "enabled": true, "poeEnabled": false, "type": "trunk", "vlan": 1, "voiceVlan": null, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": null}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/QBSB-DEWE-PJ9M/switchPorts/23'
		print('Restoring configuration Port23 switch QBSB-DEWE-PJ9M',file=f)
		payload = '{"number": 23, "name": null, "tags": null, "enabled": true, "poeEnabled": false, "type": "trunk", "vlan": 1, "voiceVlan": null, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": null}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/QBSB-DEWE-PJ9M/switchPorts/24'
		print('Restoring configuration Port24 switch QBSB-DEWE-PJ9M',file=f)
		payload = '{"number": 24, "name": null, "tags": null, "enabled": true, "poeEnabled": false, "type": "trunk", "vlan": 1, "voiceVlan": null, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": null}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/QBSB-DEWE-PJ9M/switchPorts/25'
		print('Restoring configuration Port25 switch QBSB-DEWE-PJ9M',file=f)
		payload = '{"number": 25, "name": null, "tags": null, "enabled": true, "poeEnabled": false, "type": "trunk", "vlan": 1, "voiceVlan": null, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": null}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/QBSB-DEWE-PJ9M/switchPorts/26'
		print('Restoring configuration Port26 switch QBSB-DEWE-PJ9M',file=f)
		payload = '{"number": 26, "name": null, "tags": null, "enabled": true, "poeEnabled": false, "type": "trunk", "vlan": 1, "voiceVlan": null, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": null}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/QBSB-DEWE-PJ9M/switchPorts/27'
		print('Restoring configuration Port27 switch QBSB-DEWE-PJ9M',file=f)
		payload = '{"number": 27, "name": null, "tags": null, "enabled": true, "poeEnabled": false, "type": "trunk", "vlan": 1, "voiceVlan": null, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": null}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/QBSB-DEWE-PJ9M/switchPorts/28'
		print('Restoring configuration Port28 switch QBSB-DEWE-PJ9M',file=f)
		payload = '{"number": 28, "name": null, "tags": null, "enabled": true, "poeEnabled": false, "type": "trunk", "vlan": 1, "voiceVlan": null, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": null}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/QBSB-DEWE-PJ9M/switchPorts/29'
		print('Restoring configuration Port29 switch QBSB-DEWE-PJ9M',file=f)
		payload = '{"number": 29, "name": null, "tags": null, "enabled": true, "poeEnabled": false, "type": "trunk", "vlan": 1, "voiceVlan": null, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": null}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/QBSB-DEWE-PJ9M/switchPorts/30'
		print('Restoring configuration Port30 switch QBSB-DEWE-PJ9M',file=f)
		payload = '{"number": 30, "name": null, "tags": null, "enabled": true, "poeEnabled": false, "type": "trunk", "vlan": 1, "voiceVlan": null, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": null}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/QBSB-DEWE-PJ9M/switchPorts/31'
		print('Restoring configuration Port31 switch QBSB-DEWE-PJ9M',file=f)
		payload = '{"number": 31, "name": null, "tags": null, "enabled": true, "poeEnabled": false, "type": "trunk", "vlan": 1, "voiceVlan": null, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": null}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/QBSB-DEWE-PJ9M/switchPorts/32'
		print('Restoring configuration Port32 switch QBSB-DEWE-PJ9M',file=f)
		payload = '{"number": 32, "name": null, "tags": null, "enabled": true, "poeEnabled": false, "type": "trunk", "vlan": 1, "voiceVlan": null, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": null}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/QBSB-DEWE-PJ9M/switchPorts/33'
		print('Restoring configuration Port33 switch QBSB-DEWE-PJ9M',file=f)
		payload = '{"number": 33, "name": null, "tags": null, "enabled": true, "poeEnabled": false, "type": "trunk", "vlan": 1, "voiceVlan": null, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": null}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/QBSB-DEWE-PJ9M/switchPorts/34'
		print('Restoring configuration Port34 switch QBSB-DEWE-PJ9M',file=f)
		payload = '{"number": 34, "name": null, "tags": null, "enabled": true, "poeEnabled": false, "type": "trunk", "vlan": 1, "voiceVlan": null, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": null}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
	except requests.exceptions.HTTPError as err:
		print(err,file=f)
		print('There was an error restoring the switchs configuration, check the logs for more details.',file=f)
	print('Restoring Switch configuration complete.',file=f)
	f.flush()
	f.close()

