#!/usr/bin/env python3
#-*- coding: utf-8 -*-
#
# Search for "#restored" and edit below that to control what is restored.
#
import os
import argparse
import requests



def restore_network(ARG_ORGID, ARG_APIKEY,USER):
	abspath = os.path.abspath(__file__)
	log_file = os.path.abspath(__file__  + '/../../logs/{}_log_file.log'.format(USER))
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
	dashboard = session.post(posturl, json={'accountStatus': 'ok', 'authenticationMethod': 'Email', 'email': 'alex@intouchapplication.com', 'hasApiKey': False, 'id': '566327653141942973', 'lastActive': 1588138208, 'name': 'Alex Bernot', 'networks': [{'access': 'full', 'id': 'L_566327653141846927'}], 'orgAccess': 'read-only', 'tags': [], 'twoFactorAuthEnabled': False}, headers=headers)
	dashboard = session.post(posturl, json={'accountStatus': 'ok', 'authenticationMethod': 'Email', 'email': 'balexey@cisco.com', 'hasApiKey': True, 'id': '566327653141950480', 'lastActive': 1598966191, 'name': 'Alexsey', 'networks': [{'access': 'full', 'id': 'L_566327653141856854'}], 'orgAccess': 'read-only', 'tags': [], 'twoFactorAuthEnabled': False}, headers=headers)
	dashboard = session.post(posturl, json={'accountStatus': 'ok', 'authenticationMethod': 'Email', 'email': 'bceagle97@gmail.com', 'hasApiKey': False, 'id': '566327653141937152', 'lastActive': 1540378062, 'name': 'Josh Nolan', 'networks': [{'access': 'full', 'id': 'N_566327653141899127'}], 'orgAccess': 'none', 'tags': [], 'twoFactorAuthEnabled': False}, headers=headers)
	dashboard = session.post(posturl, json={'accountStatus': 'ok', 'authenticationMethod': 'Email', 'email': 'codefest@cisco.com', 'hasApiKey': True, 'id': '783626335162466387', 'lastActive': 1605884629, 'name': 'CodeFest', 'networks': [{'access': 'full', 'id': 'L_566327653141856854'}], 'orgAccess': 'none', 'tags': [], 'twoFactorAuthEnabled': False}, headers=headers)
	dashboard = session.post(posturl, json={'accountStatus': 'ok', 'authenticationMethod': 'Email', 'email': 'denapom11@gmail.com', 'hasApiKey': True, 'id': '883012', 'lastActive': 1534782286, 'name': 'Matthew J DeNapoli', 'networks': [], 'orgAccess': 'full', 'tags': [], 'twoFactorAuthEnabled': False}, headers=headers)
	dashboard = session.post(posturl, json={'accountStatus': 'ok', 'authenticationMethod': 'Email', 'email': 'devnetexpressattendee@cisco.com', 'hasApiKey': True, 'id': '566327653141948116', 'lastActive': 1605934315, 'name': 'DNE Attendee', 'networks': [], 'orgAccess': 'read-only', 'tags': [], 'twoFactorAuthEnabled': False}, headers=headers)
	dashboard = session.post(posturl, json={'accountStatus': 'ok', 'authenticationMethod': 'Email', 'email': 'devnetexpressinstructor@cisco.com', 'hasApiKey': True, 'id': '566327653141948124', 'lastActive': 1602694614, 'name': 'DNE Instructor', 'networks': [], 'orgAccess': 'read-only', 'tags': [], 'twoFactorAuthEnabled': False}, headers=headers)
	dashboard = session.post(posturl, json={'accountStatus': 'ok', 'authenticationMethod': 'Email', 'email': 'devnetmerakiadmin@cisco.com', 'hasApiKey': True, 'id': '566327653141931517', 'lastActive': 1605217013, 'name': 'DevNet Admin', 'networks': [{'access': 'full', 'id': 'L_566327653141856854'}], 'orgAccess': 'read-only', 'tags': [], 'twoFactorAuthEnabled': False}, headers=headers)
	dashboard = session.post(posturl, json={'accountStatus': 'ok', 'authenticationMethod': 'Email', 'email': 'jocreed@cisco.com', 'hasApiKey': True, 'id': '566327653141897885', 'lastActive': 1605489667, 'name': 'Jock Reed', 'networks': [{'access': 'full', 'id': 'L_566327653141856854'}], 'orgAccess': 'read-only', 'tags': [], 'twoFactorAuthEnabled': False}, headers=headers)
	dashboard = session.post(posturl, json={'accountStatus': 'ok', 'authenticationMethod': 'Email', 'email': 'mdenapol@cisco.com', 'hasApiKey': True, 'id': '566327653141886093', 'lastActive': 1605941513, 'name': 'Matt Work', 'networks': [], 'orgAccess': 'full', 'tags': [], 'twoFactorAuthEnabled': False}, headers=headers)
	dashboard = session.post(posturl, json={'accountStatus': 'ok', 'authenticationMethod': 'Email', 'email': 'shwpalan@cisco.com', 'hasApiKey': False, 'id': '566327653141956841', 'lastActive': 1605020925, 'name': 'Shweta Palande', 'networks': [{'access': 'full', 'id': 'L_566327653141856854'}], 'orgAccess': 'read-only', 'tags': [], 'twoFactorAuthEnabled': False}, headers=headers)

# MX VPN firewall
# https://dashboard.meraki.com/api_docs#mx-vpn-firewall
	print('Restoring mx_vpn_firewall_rules',file=f)
	f.flush()
	puturl = 'https://api.meraki.com/api/v0/organizations/{0}/vpnFirewallRules'.format(str(ARG_ORGID))
	dashboard = session.put(puturl, json={'rules': {'rules': [{'comment': '', 'policy': 'deny', 'protocol': 'tcp', 'srcPort': 'Any', 'srcCidr': 'Any', 'destPort': 'Any', 'destCidr': 'Any', 'syslogEnabled': True}, {'comment': 'Default rule', 'policy': 'allow', 'protocol': 'Any', 'srcPort': 'Any', 'srcCidr': 'Any', 'destPort': 'Any', 'destCidr': 'Any', 'syslogEnabled': True}]}, 'syslogEnabled': True}, headers=headers)

# SNMP Settings
# https://dashboard.meraki.com/api_docs#update-the-snmp-settings-for-an-organization
	print('Restoring SNMP Settings',file=f)
	f.flush()
	puturl = 'https://api.meraki.com/api/v0/organizations/{0}/snmp'.format(str(ARG_ORGID))
	try:
		dashboard = session.put(puturl, json={'v2cEnabled': True, 'v3AuthMode': 'SHA', 'v3Enabled': True, 'v3PrivMode': 'AES128', 'v3User': 'o/49Gm_c'}, headers=headers)
		dashboard.raise_for_status()
	except requests.exceptions.HTTPError as err:
		print(err,file=f)

# Non Meraki VPN Peers
# https://dashboard.meraki.com/api_docs#update-the-third-party-vpn-peers-for-an-organization
	print('Restoring non_meraki_vpn_peers',file=f)
	f.flush()
	puturl = 'https://api.meraki.com/api/v0/organizations/{0}/thirdPartyVPNPeers'.format(str(ARG_ORGID))
	try:
		dashboard = session.put(puturl, json=[{'ikeVersion': '1', 'ipsecPoliciesPreset': 'default', 'name': 'AnyConnect Nodehead', 'networkTags': ['all'], 'privateSubnets': ['192.168.32.0/24'], 'publicIp': '64.128.92.126', 'secret': 'booyah'}], headers=headers)
		dashboard.raise_for_status()
	except requests.exceptions.HTTPError as err:
		print(err,file=f)

# Add Network: Lyoli-restore
	print('Restoring network Lyoli in new network Lyoli-restore',file=f)
	f.flush()
	try:
	# https://dashboard.meraki.com/api_docs#create-a-network
		posturl = 'https://api.meraki.com/api/v0/organizations/{0}/networks'.format(str(ARG_ORGID))
		dashboard = session.post(posturl, json={'name': 'Lyoli-restore', 'disableMyMerakiCom': False, 'disableRemoteStatusPage': True, 'type': 'appliance camera switch wireless'}, headers=headers)
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
		dashboard = session.put(puturl, json={'authMode': 'psk', 'availabilityTags': [], 'availableOnAllAps': True, 'bandSelection': 'Dual band operation', 'enabled': True, 'encryptionMode': 'wpa', 'ipAssignmentMode': 'Bridge mode', 'lanIsolationEnabled': False, 'minBitrate': 11, 'name': 'Lyoli', 'number': 0, 'perClientBandwidthLimitDown': 0, 'perClientBandwidthLimitUp': 0, 'psk': 'Tac0s7426P1zza', 'splashPage': 'None', 'ssidAdminAccessible': False, 'useVlanTagging': False, 'visible': True, 'wpaEncryptionMode': 'WPA1 and WPA2'}, headers=headers)
	# MR L3 firewall
	# https://dashboard.meraki.com/api_docs#update-the-l3-firewall-rules-of-an-ssid-on-an-mr-network
		puturl = 'https://api.meraki.com/api/v0/networks/{0}/ssids/0/l3FirewallRules'.format(str(networkid))
		dashboard = session.put(puturl, json={'rules': [], 'allowLanAccess': True}, headers=headers)

		puturl = 'https://api.meraki.com/api/v0/networks/{0}/ssids/1'.format(str(networkid))
		dashboard = session.put(puturl, json={'authMode': 'psk', 'availabilityTags': [], 'availableOnAllAps': True, 'bandSelection': 'Dual band operation', 'enabled': False, 'encryptionMode': 'wpa', 'ipAssignmentMode': 'Bridge mode', 'lanIsolationEnabled': False, 'minBitrate': 11, 'name': 'Lyoli Outdoor', 'number': 1, 'perClientBandwidthLimitDown': 0, 'perClientBandwidthLimitUp': 0, 'psk': 'Tac0s7426P1zza', 'splashPage': 'None', 'ssidAdminAccessible': False, 'useVlanTagging': False, 'visible': True, 'wpaEncryptionMode': 'WPA1 and WPA2'}, headers=headers)
	# MR L3 firewall
	# https://dashboard.meraki.com/api_docs#update-the-l3-firewall-rules-of-an-ssid-on-an-mr-network
		puturl = 'https://api.meraki.com/api/v0/networks/{0}/ssids/1/l3FirewallRules'.format(str(networkid))
		dashboard = session.put(puturl, json={'rules': [], 'allowLanAccess': True}, headers=headers)

		puturl = 'https://api.meraki.com/api/v0/networks/{0}/ssids/2'.format(str(networkid))
		dashboard = session.put(puturl, json={'adminSplashUrl': 'https://afddd0244900.ngrok.io/click', 'authMode': 'psk', 'availabilityTags': [], 'availableOnAllAps': True, 'bandSelection': '5 GHz band only', 'enabled': False, 'encryptionMode': 'wpa', 'ipAssignmentMode': 'Bridge mode', 'lanIsolationEnabled': False, 'minBitrate': 11, 'name': 'Captive Portal Demo', 'number': 2, 'perClientBandwidthLimitDown': 0, 'perClientBandwidthLimitUp': 0, 'psk': 'waytogodevs', 'splashPage': 'Click-through splash page', 'splashTimeout': '30 minutes', 'ssidAdminAccessible': False, 'useVlanTagging': False, 'visible': True, 'walledGardenEnabled': True, 'walledGardenRanges': '*.ngrok.io', 'wpaEncryptionMode': 'WPA2 only'}, headers=headers)
	# MR L3 firewall
	# https://dashboard.meraki.com/api_docs#update-the-l3-firewall-rules-of-an-ssid-on-an-mr-network
		puturl = 'https://api.meraki.com/api/v0/networks/{0}/ssids/2/l3FirewallRules'.format(str(networkid))
		dashboard = session.put(puturl, json={'rules': [], 'allowLanAccess': True}, headers=headers)

		puturl = 'https://api.meraki.com/api/v0/networks/{0}/ssids/3'.format(str(networkid))
		dashboard = session.put(puturl, json={'authMode': 'psk', 'availabilityTags': ['ktv'], 'availableOnAllAps': False, 'bandSelection': 'Dual band operation', 'enabled': True, 'encryptionMode': 'wpa', 'ipAssignmentMode': 'Bridge mode', 'lanIsolationEnabled': False, 'minBitrate': 11, 'name': 'KTV', 'number': 3, 'perClientBandwidthLimitDown': 0, 'perClientBandwidthLimitUp': 0, 'psk': 'boomshakalaka', 'splashPage': 'None', 'ssidAdminAccessible': False, 'useVlanTagging': False, 'visible': False, 'wpaEncryptionMode': 'WPA2 only'}, headers=headers)
	# MR L3 firewall
	# https://dashboard.meraki.com/api_docs#update-the-l3-firewall-rules-of-an-ssid-on-an-mr-network
		puturl = 'https://api.meraki.com/api/v0/networks/{0}/ssids/3/l3FirewallRules'.format(str(networkid))
		dashboard = session.put(puturl, json={'rules': [], 'allowLanAccess': True}, headers=headers)

		puturl = 'https://api.meraki.com/api/v0/networks/{0}/ssids/4'.format(str(networkid))
		dashboard = session.put(puturl, json={'authMode': 'psk', 'availabilityTags': ['ltv'], 'availableOnAllAps': False, 'bandSelection': 'Dual band operation', 'enabled': True, 'encryptionMode': 'wpa', 'ipAssignmentMode': 'Bridge mode', 'lanIsolationEnabled': False, 'minBitrate': 11, 'name': 'LTV', 'number': 4, 'perClientBandwidthLimitDown': 0, 'perClientBandwidthLimitUp': 0, 'psk': 'tvconnect', 'splashPage': 'None', 'ssidAdminAccessible': False, 'useVlanTagging': False, 'visible': False, 'wpaEncryptionMode': 'WPA1 and WPA2'}, headers=headers)
	# MR L3 firewall
	# https://dashboard.meraki.com/api_docs#update-the-l3-firewall-rules-of-an-ssid-on-an-mr-network
		puturl = 'https://api.meraki.com/api/v0/networks/{0}/ssids/4/l3FirewallRules'.format(str(networkid))
		dashboard = session.put(puturl, json={'rules': [], 'allowLanAccess': True}, headers=headers)

		puturl = 'https://api.meraki.com/api/v0/networks/{0}/ssids/5'.format(str(networkid))
		dashboard = session.put(puturl, json={'authMode': 'open', 'availabilityTags': [], 'availableOnAllAps': True, 'bandSelection': 'Dual band operation', 'enabled': False, 'ipAssignmentMode': 'NAT mode', 'minBitrate': 11, 'name': 'testv', 'number': 5, 'perClientBandwidthLimitDown': 0, 'perClientBandwidthLimitUp': 0, 'splashPage': 'None', 'ssidAdminAccessible': False, 'visible': True}, headers=headers)
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
		puturl = 'https://api.meraki.com/api/v0/networks/{0}/devices/Q2LD-GYL3-KEHX'.format(str(networkid))
		dashboard = session.put(puturl, json={'address': '', 'beaconIdParams': {'major': 2, 'minor': 1, 'uuid': 'a543206b-7dc8-44d0-9d72-1d43d92aafd4'}, 'firmware': 'wireless-26-6-1', 'floorPlanId': None, 'lanIp': '192.168.128.202', 'lat': 41.4767987071101, 'lng': -81.5780361515379, 'mac': 'e0:55:3d:c0:76:f4', 'model': 'MR52', 'name': '1st Floor AP', 'serial': 'Q2LD-GYL3-KEHX', 'tags': ' LTV '}, headers=headers)
		puturl = 'https://api.meraki.com/api/v0/networks/{0}/devices/Q2LD-AN9B-S6AJ'.format(str(networkid))
		dashboard = session.put(puturl, json={'address': '', 'beaconIdParams': {'major': 2, 'minor': 1, 'uuid': 'a543206b-7dc8-44d0-9d72-1d43d92aafd4'}, 'firmware': 'wireless-26-6-1', 'floorPlanId': None, 'lanIp': '192.168.128.15', 'lat': 41.4768218172221, 'lng': -81.5779959184027, 'mac': 'e0:55:3d:c0:5e:2e', 'model': 'MR52', 'name': '2nd Floor AP', 'serial': 'Q2LD-AN9B-S6AJ', 'tags': ' KTV '}, headers=headers)
		puturl = 'https://api.meraki.com/api/v0/networks/{0}/devices/Q2LD-ZWCZ-UA77'.format(str(networkid))
		dashboard = session.put(puturl, json={'address': '', 'beaconIdParams': {'major': 2, 'minor': 1, 'uuid': 'a543206b-7dc8-44d0-9d72-1d43d92aafd4'}, 'firmware': 'wireless-26-6-1', 'floorPlanId': None, 'lanIp': '192.168.128.16', 'lat': 41.476801721473, 'lng': -81.5779744607306, 'mac': 'e0:55:3d:c0:72:d8', 'model': 'MR52', 'name': 'Office AP', 'serial': 'Q2LD-ZWCZ-UA77'}, headers=headers)
		puturl = 'https://api.meraki.com/api/v0/networks/{0}/devices/Q2LD-3Y7V-7Y2X'.format(str(networkid))
		dashboard = session.put(puturl, json={'address': '', 'beaconIdParams': {'major': 2, 'minor': 1, 'uuid': 'a543206b-7dc8-44d0-9d72-1d43d92aafd4'}, 'firmware': 'wireless-26-6-1', 'floorPlanId': None, 'lanIp': '192.168.128.17', 'lat': 41.4768238267966, 'lng': -81.5780643147326, 'mac': 'e0:55:3d:c0:73:56', 'model': 'MR52', 'name': 'Basement AP', 'serial': 'Q2LD-3Y7V-7Y2X'}, headers=headers)
		puturl = 'https://api.meraki.com/api/v0/networks/{0}/devices/Q2EK-UKGM-XSD9'.format(str(networkid))
		dashboard = session.put(puturl, json={'address': '', 'beaconIdParams': {'major': 2, 'minor': 1, 'uuid': 'a543206b-7dc8-44d0-9d72-1d43d92aafd4'}, 'firmware': 'wireless-26-6-1', 'floorPlanId': None, 'lanIp': '192.168.128.99', 'lat': 41.30627, 'lng': -81.61507, 'mac': 'e0:55:3d:10:5e:b2', 'model': 'MR84', 'name': 'Sun Room', 'serial': 'Q2EK-UKGM-XSD9', 'tags': ' recently-added '}, headers=headers)
		puturl = 'https://api.meraki.com/api/v0/networks/{0}/devices/Q2GV-LDX2-53ZA'.format(str(networkid))
		dashboard = session.put(puturl, json={'address': '', 'firmware': 'Not running configured version', 'floorPlanId': None, 'lanIp': '192.168.128.12', 'lat': 37.4180951010362, 'lng': -122.098531723022, 'mac': '34:56:fe:a3:ef:f4', 'model': 'MV12W', 'serial': 'Q2GV-LDX2-53ZA', 'tags': ' API_demo ', 'wirelessMac': '34:56:fe:a3:ef:f5'}, headers=headers)
		puturl = 'https://api.meraki.com/api/v0/networks/{0}/devices/Q2HP-WEUW-2PQD'.format(str(networkid))
		dashboard = session.put(puturl, json={'address': '', 'firmware': 'switch-12-14', 'floorPlanId': None, 'lanIp': '192.168.128.90', 'lat': 37.4180951010362, 'lng': -122.098531723022, 'mac': 'e0:55:3d:d2:48:3f', 'model': 'MS220-8P', 'name': 'Bedroom Switch', 'serial': 'Q2HP-WEUW-2PQD', 'switchProfileId': None}, headers=headers)
		puturl = 'https://api.meraki.com/api/v0/networks/{0}/devices/Q2HP-225A-XA5C'.format(str(networkid))
		dashboard = session.put(puturl, json={'address': '', 'firmware': 'switch-12-14', 'floorPlanId': None, 'lanIp': '192.168.128.206', 'lat': 37.4180951010362, 'lng': -122.098531723022, 'mac': 'e0:55:3d:d2:4b:4c', 'model': 'MS220-8P', 'name': 'Basement switch', 'serial': 'Q2HP-225A-XA5C', 'switchProfileId': None}, headers=headers)
		puturl = 'https://api.meraki.com/api/v0/networks/{0}/devices/Q2QW-W2W4-MCNR'.format(str(networkid))
		dashboard = session.put(puturl, json={'address': '', 'firmware': 'switch-12-14', 'floorPlanId': None, 'lanIp': '192.168.128.8', 'lat': 37.4180951010362, 'lng': -122.098531723022, 'mac': '34:56:fe:88:c2:f8', 'model': 'MS250-48FP', 'name': 'Big Office Switch', 'serial': 'Q2QW-W2W4-MCNR', 'switchProfileId': None, 'tags': ' recently-added '}, headers=headers)
		puturl = 'https://api.meraki.com/api/v0/networks/{0}/devices/Q2SW-SWQ2-HZ9L'.format(str(networkid))
		dashboard = session.put(puturl, json={'address': '', 'firmware': 'wired-14-53', 'floorPlanId': None, 'lanIp': '192.168.1.74', 'lat': 37.4180951010362, 'lng': -122.098531723022, 'mac': 'ac:17:c8:24:4f:68', 'model': 'MX250', 'name': 'BigCat', 'serial': 'Q2SW-SWQ2-HZ9L', 'tags': ' recently-added ', 'wan1Ip': '192.168.1.74', 'wan2Ip': None}, headers=headers)
	except requests.exceptions.HTTPError as err:
		print(err,file=f)
		print('Can not add network Lyoli - it probably already exists. Change the Network name and make a new backup.',file=f)
	print('Restoring Complete, move your switchs to the new network and restore the switch configuration.',file=f)
	f.flush()
	f.close()


def restore_switchports(ARG_APIKEY,USER):
	abspath = os.path.abspath(__file__)
	log_file = os.path.abspath(__file__  + '/../../logs/{}_log_file.log'.format(USER))
	f = open(log_file, 'w')

	headers = {
		'x-cisco-meraki-api-key': ARG_APIKEY,
		'Content-Type': 'application/json',
		'Accept': 'application/json',
		}

	session = requests.Session()


	try:
		print('Starting restoring switchports',file=f)
		f.flush()
		puturl = 'https://api.meraki.com/api/v0/devices/Q2HP-WEUW-2PQD/switchPorts/1'
		print('Restoring configuration Port1 switch Q2HP-WEUW-2PQD',file=f)
		f.flush()
		payload = '{"portId": "1", "name": null, "tags": [], "enabled": true, "poeEnabled": true, "type": "trunk", "vlan": 1, "voiceVlan": null, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only"}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2HP-WEUW-2PQD/switchPorts/2'
		print('Restoring configuration Port2 switch Q2HP-WEUW-2PQD',file=f)
		f.flush()
		payload = '{"portId": "2", "name": null, "tags": [], "enabled": true, "poeEnabled": true, "type": "trunk", "vlan": 1, "voiceVlan": null, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only"}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2HP-WEUW-2PQD/switchPorts/3'
		print('Restoring configuration Port3 switch Q2HP-WEUW-2PQD',file=f)
		f.flush()
		payload = '{"portId": "3", "name": null, "tags": [], "enabled": true, "poeEnabled": true, "type": "trunk", "vlan": 1, "voiceVlan": null, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only"}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2HP-WEUW-2PQD/switchPorts/4'
		print('Restoring configuration Port4 switch Q2HP-WEUW-2PQD',file=f)
		f.flush()
		payload = '{"portId": "4", "name": null, "tags": [], "enabled": true, "poeEnabled": true, "type": "trunk", "vlan": 1, "voiceVlan": null, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only"}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2HP-WEUW-2PQD/switchPorts/5'
		print('Restoring configuration Port5 switch Q2HP-WEUW-2PQD',file=f)
		f.flush()
		payload = '{"portId": "5", "name": null, "tags": [], "enabled": true, "poeEnabled": true, "type": "trunk", "vlan": 1, "voiceVlan": null, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only"}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2HP-WEUW-2PQD/switchPorts/6'
		print('Restoring configuration Port6 switch Q2HP-WEUW-2PQD',file=f)
		f.flush()
		payload = '{"portId": "6", "name": null, "tags": [], "enabled": true, "poeEnabled": true, "type": "trunk", "vlan": 1, "voiceVlan": null, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only"}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2HP-WEUW-2PQD/switchPorts/7'
		print('Restoring configuration Port7 switch Q2HP-WEUW-2PQD',file=f)
		f.flush()
		payload = '{"portId": "7", "name": null, "tags": [], "enabled": true, "poeEnabled": true, "type": "trunk", "vlan": 1, "voiceVlan": null, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only"}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2HP-WEUW-2PQD/switchPorts/8'
		print('Restoring configuration Port8 switch Q2HP-WEUW-2PQD',file=f)
		f.flush()
		payload = '{"portId": "8", "name": null, "tags": [], "enabled": true, "poeEnabled": true, "type": "trunk", "vlan": 1, "voiceVlan": null, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only"}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2HP-WEUW-2PQD/switchPorts/9'
		print('Restoring configuration Port9 switch Q2HP-WEUW-2PQD',file=f)
		f.flush()
		payload = '{"portId": "9", "name": null, "tags": [], "enabled": true, "poeEnabled": false, "type": "trunk", "vlan": 1, "voiceVlan": null, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only"}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2HP-WEUW-2PQD/switchPorts/10'
		print('Restoring configuration Port10 switch Q2HP-WEUW-2PQD',file=f)
		f.flush()
		payload = '{"portId": "10", "name": null, "tags": [], "enabled": true, "poeEnabled": false, "type": "trunk", "vlan": 1, "voiceVlan": null, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only"}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2HP-225A-XA5C/switchPorts/1'
		print('Restoring configuration Port1 switch Q2HP-225A-XA5C',file=f)
		f.flush()
		payload = '{"portId": "1", "name": null, "tags": [], "enabled": true, "poeEnabled": true, "type": "trunk", "vlan": 1, "voiceVlan": null, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only"}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2HP-225A-XA5C/switchPorts/2'
		print('Restoring configuration Port2 switch Q2HP-225A-XA5C',file=f)
		f.flush()
		payload = '{"portId": "2", "name": null, "tags": [], "enabled": true, "poeEnabled": true, "type": "trunk", "vlan": 1, "voiceVlan": null, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only"}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2HP-225A-XA5C/switchPorts/3'
		print('Restoring configuration Port3 switch Q2HP-225A-XA5C',file=f)
		f.flush()
		payload = '{"portId": "3", "name": null, "tags": [], "enabled": true, "poeEnabled": true, "type": "trunk", "vlan": 1, "voiceVlan": null, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only"}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2HP-225A-XA5C/switchPorts/4'
		print('Restoring configuration Port4 switch Q2HP-225A-XA5C',file=f)
		f.flush()
		payload = '{"portId": "4", "name": null, "tags": [], "enabled": true, "poeEnabled": true, "type": "trunk", "vlan": 1, "voiceVlan": null, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only"}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2HP-225A-XA5C/switchPorts/5'
		print('Restoring configuration Port5 switch Q2HP-225A-XA5C',file=f)
		f.flush()
		payload = '{"portId": "5", "name": null, "tags": [], "enabled": true, "poeEnabled": true, "type": "trunk", "vlan": 1, "voiceVlan": null, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only"}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2HP-225A-XA5C/switchPorts/6'
		print('Restoring configuration Port6 switch Q2HP-225A-XA5C',file=f)
		f.flush()
		payload = '{"portId": "6", "name": null, "tags": [], "enabled": true, "poeEnabled": true, "type": "trunk", "vlan": 1, "voiceVlan": null, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only"}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2HP-225A-XA5C/switchPorts/7'
		print('Restoring configuration Port7 switch Q2HP-225A-XA5C',file=f)
		f.flush()
		payload = '{"portId": "7", "name": null, "tags": [], "enabled": true, "poeEnabled": true, "type": "trunk", "vlan": 1, "voiceVlan": null, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only"}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2HP-225A-XA5C/switchPorts/8'
		print('Restoring configuration Port8 switch Q2HP-225A-XA5C',file=f)
		f.flush()
		payload = '{"portId": "8", "name": "", "tags": [], "enabled": true, "poeEnabled": true, "type": "trunk", "vlan": 1, "voiceVlan": null, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only"}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2HP-225A-XA5C/switchPorts/9'
		print('Restoring configuration Port9 switch Q2HP-225A-XA5C',file=f)
		f.flush()
		payload = '{"portId": "9", "name": null, "tags": [], "enabled": true, "poeEnabled": false, "type": "trunk", "vlan": 1, "voiceVlan": null, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only"}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2HP-225A-XA5C/switchPorts/10'
		print('Restoring configuration Port10 switch Q2HP-225A-XA5C',file=f)
		f.flush()
		payload = '{"portId": "10", "name": null, "tags": [], "enabled": true, "poeEnabled": false, "type": "trunk", "vlan": 1, "voiceVlan": null, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only"}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2QW-W2W4-MCNR/switchPorts/1'
		print('Restoring configuration Port1 switch Q2QW-W2W4-MCNR',file=f)
		f.flush()
		payload = '{"portId": "1", "name": null, "tags": [], "enabled": true, "poeEnabled": true, "type": "trunk", "vlan": 1, "voiceVlan": null, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only"}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2QW-W2W4-MCNR/switchPorts/2'
		print('Restoring configuration Port2 switch Q2QW-W2W4-MCNR',file=f)
		f.flush()
		payload = '{"portId": "2", "name": null, "tags": [], "enabled": true, "poeEnabled": true, "type": "trunk", "vlan": 1, "voiceVlan": null, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only"}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2QW-W2W4-MCNR/switchPorts/3'
		print('Restoring configuration Port3 switch Q2QW-W2W4-MCNR',file=f)
		f.flush()
		payload = '{"portId": "3", "name": null, "tags": [], "enabled": true, "poeEnabled": true, "type": "trunk", "vlan": 1, "voiceVlan": null, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only"}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2QW-W2W4-MCNR/switchPorts/4'
		print('Restoring configuration Port4 switch Q2QW-W2W4-MCNR',file=f)
		f.flush()
		payload = '{"portId": "4", "name": null, "tags": [], "enabled": true, "poeEnabled": true, "type": "trunk", "vlan": 1, "voiceVlan": null, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only"}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2QW-W2W4-MCNR/switchPorts/5'
		print('Restoring configuration Port5 switch Q2QW-W2W4-MCNR',file=f)
		f.flush()
		payload = '{"portId": "5", "name": null, "tags": [], "enabled": true, "poeEnabled": true, "type": "trunk", "vlan": 1, "voiceVlan": null, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only"}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2QW-W2W4-MCNR/switchPorts/6'
		print('Restoring configuration Port6 switch Q2QW-W2W4-MCNR',file=f)
		f.flush()
		payload = '{"portId": "6", "name": null, "tags": [], "enabled": true, "poeEnabled": true, "type": "trunk", "vlan": 1, "voiceVlan": null, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only"}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2QW-W2W4-MCNR/switchPorts/7'
		print('Restoring configuration Port7 switch Q2QW-W2W4-MCNR',file=f)
		f.flush()
		payload = '{"portId": "7", "name": null, "tags": [], "enabled": true, "poeEnabled": true, "type": "trunk", "vlan": 1, "voiceVlan": null, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only"}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2QW-W2W4-MCNR/switchPorts/8'
		print('Restoring configuration Port8 switch Q2QW-W2W4-MCNR',file=f)
		f.flush()
		payload = '{"portId": "8", "name": null, "tags": [], "enabled": true, "poeEnabled": true, "type": "trunk", "vlan": 1, "voiceVlan": null, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only"}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2QW-W2W4-MCNR/switchPorts/9'
		print('Restoring configuration Port9 switch Q2QW-W2W4-MCNR',file=f)
		f.flush()
		payload = '{"portId": "9", "name": null, "tags": [], "enabled": true, "poeEnabled": true, "type": "trunk", "vlan": 1, "voiceVlan": null, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only"}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2QW-W2W4-MCNR/switchPorts/10'
		print('Restoring configuration Port10 switch Q2QW-W2W4-MCNR',file=f)
		f.flush()
		payload = '{"portId": "10", "name": null, "tags": [], "enabled": true, "poeEnabled": true, "type": "trunk", "vlan": 1, "voiceVlan": null, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only"}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2QW-W2W4-MCNR/switchPorts/11'
		print('Restoring configuration Port11 switch Q2QW-W2W4-MCNR',file=f)
		f.flush()
		payload = '{"portId": "11", "name": null, "tags": [], "enabled": true, "poeEnabled": true, "type": "trunk", "vlan": 1, "voiceVlan": null, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only"}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2QW-W2W4-MCNR/switchPorts/12'
		print('Restoring configuration Port12 switch Q2QW-W2W4-MCNR',file=f)
		f.flush()
		payload = '{"portId": "12", "name": null, "tags": [], "enabled": true, "poeEnabled": true, "type": "trunk", "vlan": 1, "voiceVlan": null, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only"}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2QW-W2W4-MCNR/switchPorts/13'
		print('Restoring configuration Port13 switch Q2QW-W2W4-MCNR',file=f)
		f.flush()
		payload = '{"portId": "13", "name": null, "tags": [], "enabled": true, "poeEnabled": true, "type": "trunk", "vlan": 1, "voiceVlan": null, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only"}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2QW-W2W4-MCNR/switchPorts/14'
		print('Restoring configuration Port14 switch Q2QW-W2W4-MCNR',file=f)
		f.flush()
		payload = '{"portId": "14", "name": null, "tags": [], "enabled": true, "poeEnabled": true, "type": "trunk", "vlan": 1, "voiceVlan": null, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only"}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2QW-W2W4-MCNR/switchPorts/15'
		print('Restoring configuration Port15 switch Q2QW-W2W4-MCNR',file=f)
		f.flush()
		payload = '{"portId": "15", "name": null, "tags": [], "enabled": true, "poeEnabled": true, "type": "trunk", "vlan": 1, "voiceVlan": null, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only"}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2QW-W2W4-MCNR/switchPorts/16'
		print('Restoring configuration Port16 switch Q2QW-W2W4-MCNR',file=f)
		f.flush()
		payload = '{"portId": "16", "name": null, "tags": [], "enabled": true, "poeEnabled": true, "type": "trunk", "vlan": 1, "voiceVlan": null, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only"}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2QW-W2W4-MCNR/switchPorts/17'
		print('Restoring configuration Port17 switch Q2QW-W2W4-MCNR',file=f)
		f.flush()
		payload = '{"portId": "17", "name": null, "tags": [], "enabled": true, "poeEnabled": true, "type": "trunk", "vlan": 1, "voiceVlan": null, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only"}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2QW-W2W4-MCNR/switchPorts/18'
		print('Restoring configuration Port18 switch Q2QW-W2W4-MCNR',file=f)
		f.flush()
		payload = '{"portId": "18", "name": null, "tags": [], "enabled": true, "poeEnabled": true, "type": "trunk", "vlan": 1, "voiceVlan": null, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only"}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2QW-W2W4-MCNR/switchPorts/19'
		print('Restoring configuration Port19 switch Q2QW-W2W4-MCNR',file=f)
		f.flush()
		payload = '{"portId": "19", "name": null, "tags": [], "enabled": true, "poeEnabled": true, "type": "trunk", "vlan": 1, "voiceVlan": null, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only"}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2QW-W2W4-MCNR/switchPorts/20'
		print('Restoring configuration Port20 switch Q2QW-W2W4-MCNR',file=f)
		f.flush()
		payload = '{"portId": "20", "name": null, "tags": [], "enabled": true, "poeEnabled": true, "type": "trunk", "vlan": 1, "voiceVlan": null, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only"}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2QW-W2W4-MCNR/switchPorts/21'
		print('Restoring configuration Port21 switch Q2QW-W2W4-MCNR',file=f)
		f.flush()
		payload = '{"portId": "21", "name": null, "tags": [], "enabled": true, "poeEnabled": true, "type": "trunk", "vlan": 1, "voiceVlan": null, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only"}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2QW-W2W4-MCNR/switchPorts/22'
		print('Restoring configuration Port22 switch Q2QW-W2W4-MCNR',file=f)
		f.flush()
		payload = '{"portId": "22", "name": null, "tags": [], "enabled": true, "poeEnabled": true, "type": "trunk", "vlan": 1, "voiceVlan": null, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only"}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2QW-W2W4-MCNR/switchPorts/23'
		print('Restoring configuration Port23 switch Q2QW-W2W4-MCNR',file=f)
		f.flush()
		payload = '{"portId": "23", "name": null, "tags": [], "enabled": true, "poeEnabled": true, "type": "trunk", "vlan": 1, "voiceVlan": null, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only"}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2QW-W2W4-MCNR/switchPorts/24'
		print('Restoring configuration Port24 switch Q2QW-W2W4-MCNR',file=f)
		f.flush()
		payload = '{"portId": "24", "name": null, "tags": [], "enabled": true, "poeEnabled": true, "type": "trunk", "vlan": 1, "voiceVlan": null, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only"}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2QW-W2W4-MCNR/switchPorts/25'
		print('Restoring configuration Port25 switch Q2QW-W2W4-MCNR',file=f)
		f.flush()
		payload = '{"portId": "25", "name": null, "tags": [], "enabled": true, "poeEnabled": true, "type": "trunk", "vlan": 1, "voiceVlan": null, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only"}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2QW-W2W4-MCNR/switchPorts/26'
		print('Restoring configuration Port26 switch Q2QW-W2W4-MCNR',file=f)
		f.flush()
		payload = '{"portId": "26", "name": null, "tags": [], "enabled": true, "poeEnabled": true, "type": "trunk", "vlan": 1, "voiceVlan": null, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only"}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2QW-W2W4-MCNR/switchPorts/27'
		print('Restoring configuration Port27 switch Q2QW-W2W4-MCNR',file=f)
		f.flush()
		payload = '{"portId": "27", "name": null, "tags": [], "enabled": true, "poeEnabled": true, "type": "trunk", "vlan": 1, "voiceVlan": null, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only"}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2QW-W2W4-MCNR/switchPorts/28'
		print('Restoring configuration Port28 switch Q2QW-W2W4-MCNR',file=f)
		f.flush()
		payload = '{"portId": "28", "name": null, "tags": [], "enabled": true, "poeEnabled": true, "type": "trunk", "vlan": 1, "voiceVlan": null, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only"}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2QW-W2W4-MCNR/switchPorts/29'
		print('Restoring configuration Port29 switch Q2QW-W2W4-MCNR',file=f)
		f.flush()
		payload = '{"portId": "29", "name": null, "tags": [], "enabled": true, "poeEnabled": true, "type": "trunk", "vlan": 1, "voiceVlan": null, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only"}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2QW-W2W4-MCNR/switchPorts/30'
		print('Restoring configuration Port30 switch Q2QW-W2W4-MCNR',file=f)
		f.flush()
		payload = '{"portId": "30", "name": null, "tags": [], "enabled": true, "poeEnabled": true, "type": "trunk", "vlan": 1, "voiceVlan": null, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only"}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2QW-W2W4-MCNR/switchPorts/31'
		print('Restoring configuration Port31 switch Q2QW-W2W4-MCNR',file=f)
		f.flush()
		payload = '{"portId": "31", "name": null, "tags": [], "enabled": true, "poeEnabled": true, "type": "trunk", "vlan": 1, "voiceVlan": null, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only"}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2QW-W2W4-MCNR/switchPorts/32'
		print('Restoring configuration Port32 switch Q2QW-W2W4-MCNR',file=f)
		f.flush()
		payload = '{"portId": "32", "name": null, "tags": [], "enabled": true, "poeEnabled": true, "type": "trunk", "vlan": 1, "voiceVlan": null, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only"}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2QW-W2W4-MCNR/switchPorts/33'
		print('Restoring configuration Port33 switch Q2QW-W2W4-MCNR',file=f)
		f.flush()
		payload = '{"portId": "33", "name": null, "tags": [], "enabled": true, "poeEnabled": true, "type": "trunk", "vlan": 1, "voiceVlan": null, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only"}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2QW-W2W4-MCNR/switchPorts/34'
		print('Restoring configuration Port34 switch Q2QW-W2W4-MCNR',file=f)
		f.flush()
		payload = '{"portId": "34", "name": null, "tags": [], "enabled": true, "poeEnabled": true, "type": "trunk", "vlan": 1, "voiceVlan": null, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only"}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2QW-W2W4-MCNR/switchPorts/35'
		print('Restoring configuration Port35 switch Q2QW-W2W4-MCNR',file=f)
		f.flush()
		payload = '{"portId": "35", "name": null, "tags": [], "enabled": true, "poeEnabled": true, "type": "trunk", "vlan": 1, "voiceVlan": null, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only"}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2QW-W2W4-MCNR/switchPorts/36'
		print('Restoring configuration Port36 switch Q2QW-W2W4-MCNR',file=f)
		f.flush()
		payload = '{"portId": "36", "name": null, "tags": [], "enabled": true, "poeEnabled": true, "type": "trunk", "vlan": 1, "voiceVlan": null, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only"}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2QW-W2W4-MCNR/switchPorts/37'
		print('Restoring configuration Port37 switch Q2QW-W2W4-MCNR',file=f)
		f.flush()
		payload = '{"portId": "37", "name": null, "tags": [], "enabled": true, "poeEnabled": true, "type": "trunk", "vlan": 1, "voiceVlan": null, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only"}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2QW-W2W4-MCNR/switchPorts/38'
		print('Restoring configuration Port38 switch Q2QW-W2W4-MCNR',file=f)
		f.flush()
		payload = '{"portId": "38", "name": null, "tags": [], "enabled": true, "poeEnabled": true, "type": "trunk", "vlan": 1, "voiceVlan": null, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only"}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2QW-W2W4-MCNR/switchPorts/39'
		print('Restoring configuration Port39 switch Q2QW-W2W4-MCNR',file=f)
		f.flush()
		payload = '{"portId": "39", "name": null, "tags": [], "enabled": true, "poeEnabled": true, "type": "trunk", "vlan": 1, "voiceVlan": null, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only"}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2QW-W2W4-MCNR/switchPorts/40'
		print('Restoring configuration Port40 switch Q2QW-W2W4-MCNR',file=f)
		f.flush()
		payload = '{"portId": "40", "name": null, "tags": [], "enabled": true, "poeEnabled": true, "type": "trunk", "vlan": 1, "voiceVlan": null, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only"}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2QW-W2W4-MCNR/switchPorts/41'
		print('Restoring configuration Port41 switch Q2QW-W2W4-MCNR',file=f)
		f.flush()
		payload = '{"portId": "41", "name": null, "tags": [], "enabled": true, "poeEnabled": true, "type": "trunk", "vlan": 1, "voiceVlan": null, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only"}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2QW-W2W4-MCNR/switchPorts/42'
		print('Restoring configuration Port42 switch Q2QW-W2W4-MCNR',file=f)
		f.flush()
		payload = '{"portId": "42", "name": null, "tags": [], "enabled": true, "poeEnabled": true, "type": "trunk", "vlan": 1, "voiceVlan": null, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only"}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2QW-W2W4-MCNR/switchPorts/43'
		print('Restoring configuration Port43 switch Q2QW-W2W4-MCNR',file=f)
		f.flush()
		payload = '{"portId": "43", "name": null, "tags": [], "enabled": true, "poeEnabled": true, "type": "trunk", "vlan": 1, "voiceVlan": null, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only"}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2QW-W2W4-MCNR/switchPorts/44'
		print('Restoring configuration Port44 switch Q2QW-W2W4-MCNR',file=f)
		f.flush()
		payload = '{"portId": "44", "name": null, "tags": [], "enabled": true, "poeEnabled": true, "type": "trunk", "vlan": 1, "voiceVlan": null, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only"}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2QW-W2W4-MCNR/switchPorts/45'
		print('Restoring configuration Port45 switch Q2QW-W2W4-MCNR',file=f)
		f.flush()
		payload = '{"portId": "45", "name": null, "tags": [], "enabled": true, "poeEnabled": true, "type": "trunk", "vlan": 1, "voiceVlan": null, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only"}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2QW-W2W4-MCNR/switchPorts/46'
		print('Restoring configuration Port46 switch Q2QW-W2W4-MCNR',file=f)
		f.flush()
		payload = '{"portId": "46", "name": null, "tags": [], "enabled": true, "poeEnabled": true, "type": "trunk", "vlan": 1, "voiceVlan": null, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only"}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2QW-W2W4-MCNR/switchPorts/47'
		print('Restoring configuration Port47 switch Q2QW-W2W4-MCNR',file=f)
		f.flush()
		payload = '{"portId": "47", "name": null, "tags": [], "enabled": true, "poeEnabled": true, "type": "trunk", "vlan": 1, "voiceVlan": null, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only"}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2QW-W2W4-MCNR/switchPorts/48'
		print('Restoring configuration Port48 switch Q2QW-W2W4-MCNR',file=f)
		f.flush()
		payload = '{"portId": "48", "name": null, "tags": [], "enabled": true, "poeEnabled": true, "type": "trunk", "vlan": 1, "voiceVlan": null, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only"}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2QW-W2W4-MCNR/switchPorts/49'
		print('Restoring configuration Port49 switch Q2QW-W2W4-MCNR',file=f)
		f.flush()
		payload = '{"portId": "49", "name": null, "tags": [], "enabled": true, "poeEnabled": false, "type": "trunk", "vlan": 1, "voiceVlan": null, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only"}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2QW-W2W4-MCNR/switchPorts/50'
		print('Restoring configuration Port50 switch Q2QW-W2W4-MCNR',file=f)
		f.flush()
		payload = '{"portId": "50", "name": null, "tags": [], "enabled": true, "poeEnabled": false, "type": "trunk", "vlan": 1, "voiceVlan": null, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only"}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2QW-W2W4-MCNR/switchPorts/51'
		print('Restoring configuration Port51 switch Q2QW-W2W4-MCNR',file=f)
		f.flush()
		payload = '{"portId": "51", "name": null, "tags": [], "enabled": true, "poeEnabled": false, "type": "trunk", "vlan": 1, "voiceVlan": null, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only"}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2QW-W2W4-MCNR/switchPorts/52'
		print('Restoring configuration Port52 switch Q2QW-W2W4-MCNR',file=f)
		f.flush()
		payload = '{"portId": "52", "name": null, "tags": [], "enabled": true, "poeEnabled": false, "type": "trunk", "vlan": 1, "voiceVlan": null, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only"}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2QW-W2W4-MCNR/switchPorts/53'
		print('Restoring configuration Port53 switch Q2QW-W2W4-MCNR',file=f)
		f.flush()
		payload = '{"portId": "53", "name": null, "tags": [], "enabled": true, "poeEnabled": false, "type": "trunk", "vlan": 1, "voiceVlan": null, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only"}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2QW-W2W4-MCNR/switchPorts/54'
		print('Restoring configuration Port54 switch Q2QW-W2W4-MCNR',file=f)
		f.flush()
		payload = '{"portId": "54", "name": null, "tags": [], "enabled": true, "poeEnabled": false, "type": "trunk", "vlan": 1, "voiceVlan": null, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only"}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
	except requests.exceptions.HTTPError as err:
		print(err,file=f)
		print('There was an error restoring the switchs configuration, check the logs for more details.',file=f)
	print('Restoring Switch configuration complete.',file=f)
	f.flush()
	f.close()

