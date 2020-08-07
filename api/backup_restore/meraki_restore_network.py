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
	dashboard = session.post(posturl, json={'accountStatus': 'ok', 'authenticationMethod': 'Email', 'email': 'dahopfmu@cisco.com', 'hasApiKey': False, 'id': '662029145223469536', 'lastActive': 1596559965, 'name': 'David Hopfmueller', 'networks': [], 'orgAccess': 'read-only', 'tags': [], 'twoFactorAuthEnabled': True}, headers=headers)
	dashboard = session.post(posturl, json={'accountStatus': 'ok', 'authenticationMethod': 'Email', 'email': 'felix.wech@nts.eu', 'hasApiKey': True, 'id': '662029145223499443', 'lastActive': 1596614223, 'name': 'Felix Wech', 'networks': [], 'orgAccess': 'full', 'tags': [], 'twoFactorAuthEnabled': False}, headers=headers)
	dashboard = session.post(posturl, json={'accountStatus': 'ok', 'authenticationMethod': 'Email', 'email': 'rb_hq_it_network.at@redbull.com', 'hasApiKey': False, 'id': '662029145223483582', 'lastActive': 1593442608, 'name': 'fallback_gns', 'networks': [], 'orgAccess': 'full', 'tags': [], 'twoFactorAuthEnabled': False}, headers=headers)
	dashboard = session.post(posturl, json={'accountStatus': 'ok', 'authenticationMethod': 'Email', 'email': 'rb_hq_it_network_ipc@redbull.com', 'hasApiKey': True, 'id': '662029145223486177', 'lastActive': 1593442644, 'name': 'service_ipc', 'networks': [], 'orgAccess': 'full', 'tags': [], 'twoFactorAuthEnabled': False}, headers=headers)
	dashboard = session.post(posturl, json={'accountStatus': 'ok', 'authenticationMethod': 'Email', 'email': 'rb_hq_it_network_mm@redbull.com', 'hasApiKey': True, 'id': '662029145223517600', 'lastActive': 1596622668, 'name': 'service_managedmonitor', 'networks': [], 'orgAccess': 'read-only', 'tags': [], 'twoFactorAuthEnabled': False}, headers=headers)
	dashboard = session.post(posturl, json={'accountStatus': 'ok', 'authenticationMethod': 'Email', 'email': 'rb_hq_it_network_nts@redbull.com', 'hasApiKey': False, 'id': '662029145223486525', 'lastActive': 1593307406, 'name': 'fallback_nts', 'networks': [], 'orgAccess': 'full', 'tags': [], 'twoFactorAuthEnabled': False}, headers=headers)
	dashboard = session.post(posturl, json={'accountStatus': 'ok', 'authenticationMethod': 'Email', 'email': 'rb_hq_it_network_snow@redbull.com', 'hasApiKey': True, 'id': '662029145223519752', 'lastActive': 1593443596, 'name': 'service_sn', 'networks': [], 'orgAccess': 'read-only', 'tags': [], 'twoFactorAuthEnabled': False}, headers=headers)
	dashboard = session.post(posturl, json={'accountStatus': 'ok', 'authenticationMethod': 'Email', 'email': 'rb_hq_it_network_splunk@redbull.com', 'hasApiKey': True, 'id': '662029145223517601', 'lastActive': 1593964655, 'name': 'service_splunk', 'networks': [], 'orgAccess': 'read-only', 'tags': [], 'twoFactorAuthEnabled': False}, headers=headers)

# MX VPN firewall
# https://dashboard.meraki.com/api_docs#mx-vpn-firewall
	print('Restoring mx_vpn_firewall_rules',file=f)
	f.flush()
	puturl = 'https://api.meraki.com/api/v0/organizations/{0}/vpnFirewallRules'.format(str(ARG_ORGID))
	dashboard = session.put(puturl, json={'rules': [{'comment': 'RTP audio video', 'policy': 'allow', 'protocol': 'udp', 'srcPort': '1024-65535', 'srcCidr': '10.192.32.0/19,10.192.0.0/19', 'destPort': '1024-65535', 'destCidr': '10.192.32.0/19,10.192.0.0/19', 'syslogEnabled': True}, {'comment': '', 'policy': 'deny', 'protocol': 'any', 'srcPort': 'Any', 'srcCidr': '10.192.32.0/19', 'destPort': 'Any', 'destCidr': '10.192.0.0/19', 'syslogEnabled': True}, {'comment': '', 'policy': 'deny', 'protocol': 'any', 'srcPort': 'Any', 'srcCidr': '10.192.64.0/19', 'destPort': 'Any', 'destCidr': '10.192.0.0/19,10.192.32.0/19', 'syslogEnabled': True}, {'comment': '', 'policy': 'deny', 'protocol': 'any', 'srcPort': 'Any', 'srcCidr': '10.192.96.0/19', 'destPort': 'Any', 'destCidr': '10.192.0.0/19,10.192.32.0/19,10.192.64.0/19', 'syslogEnabled': True}, {'comment': 'Default rule', 'policy': 'allow', 'protocol': 'Any', 'srcPort': 'Any', 'srcCidr': 'Any', 'destPort': 'Any', 'destCidr': 'Any', 'syslogEnabled': True}], 'syslogEnabled': True}, headers=headers)

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

# Add Network: ATVIETB-restore
	print('Restoring network ATVIETB in new network ATVIETB-restore',file=f)
	f.flush()
	try:
	# https://dashboard.meraki.com/api_docs#create-a-network
		posturl = 'https://api.meraki.com/api/v0/organizations/{0}/networks'.format(str(ARG_ORGID))
		dashboard = session.post(posturl, json={'name': 'ATVIETB-restore', 'disableMyMerakiCom': False, 'disableRemoteStatusPage': True, 'type': 'appliance switch wireless'}, headers=headers)
		dashboard.raise_for_status()
		networkid=dashboard.json()['id']

	# MX VLANs
	# https://dashboard.meraki.com/api_docs#enable/disable-vlans-for-the-given-network
		print('Restoring mx_vlans',file=f)
		f.flush()
		puturl = 'https://api.meraki.com/api/v0/networks/{0}/vlansEnabledState'.format(str(networkid))
		dashboard = session.put(puturl, json={'enabled': True}, headers=headers)
	# https://dashboard.meraki.com/api_docs#add-a-vlan
		posturl = 'https://api.meraki.com/api/v0/networks/{0}/vlans'.format(str(networkid))
		dashboard = session.post(posturl, json={'applianceIp': '10.192.104.1', 'dhcpHandling': 'Relay DHCP to another server', 'dhcpRelayServerIps': ['10.236.20.9', '10.252.225.33'], 'dnsNameservers': 'upstream_dns', 'fixedIpAssignments': {}, 'id': 10, 'name': 'LAN_USER-GUEST', 'reservedIpRanges': [], 'subnet': '10.192.104.0/23'}, headers=headers)
		dashboard = session.post(posturl, json={'applianceIp': '10.192.76.1', 'dhcpHandling': 'Relay DHCP to another server', 'dhcpRelayServerIps': ['10.236.20.9', '10.252.225.33'], 'dnsNameservers': 'upstream_dns', 'fixedIpAssignments': {}, 'id': 20, 'name': 'LAN_IOT', 'reservedIpRanges': [], 'subnet': '10.192.76.0/23'}, headers=headers)
		dashboard = session.post(posturl, json={'applianceIp': '10.192.46.1', 'dhcpHandling': 'Relay DHCP to another server', 'dhcpRelayServerIps': ['10.236.20.9', '10.252.225.33'], 'dnsNameservers': 'opendns', 'fixedIpAssignments': {}, 'id': 30, 'name': 'LAN_INTERNAL', 'reservedIpRanges': [], 'subnet': '10.192.46.0/23'}, headers=headers)
		dashboard = session.post(posturl, json={'applianceIp': '10.192.8.1', 'dhcpHandling': 'Relay DHCP to another server', 'dhcpRelayServerIps': ['10.236.20.9', '10.252.225.33'], 'dnsNameservers': '10.255.255.1', 'fixedIpAssignments': {}, 'id': 40, 'name': 'LAN_NET', 'reservedIpRanges': [], 'subnet': '10.192.8.0/23'}, headers=headers)

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
		dashboard = session.put(puturl, json={'rules': [{'comment': 'allow UDP/mDNS', 'destCidr': '10.192.46.0/23,10.192.104.0/23', 'destPort': '5353', 'policy': 'allow', 'protocol': 'udp', 'srcCidr': '10.192.76.0/23', 'srcPort': '5353', 'syslogEnabled': False}, {'comment': 'allow AirPlay TCP/7000-7001', 'destCidr': '10.192.76.0/23', 'destPort': '7000', 'policy': 'allow', 'protocol': 'tcp', 'srcCidr': '10.192.46.0/23,10.192.104.0/23', 'srcPort': 'Any', 'syslogEnabled': False}, {'comment': 'allow AirPlay TCP49152-65535', 'destCidr': '10.192.76.0/23', 'destPort': '49152-65535', 'policy': 'allow', 'protocol': 'tcp', 'srcCidr': '10.192.46.0/23,10.192.104.0/23', 'srcPort': '49152-65535', 'syslogEnabled': False}, {'comment': 'allow AirPlay UDP49152-65535', 'destCidr': '10.192.104.0/23,10.192.46.0/23', 'destPort': '49152-65535', 'policy': 'allow', 'protocol': 'udp', 'srcCidr': '10.192.76.0/23', 'srcPort': '49152-65535', 'syslogEnabled': True}, {'comment': 'allow AirPrint TCP/8612', 'destCidr': 'Any', 'destPort': '8612', 'policy': 'allow', 'protocol': 'tcp', 'srcCidr': 'Any', 'srcPort': '8612', 'syslogEnabled': False}, {'comment': 'allow AirPrint UDP/8612', 'destCidr': 'Any', 'destPort': '8612', 'policy': 'allow', 'protocol': 'udp', 'srcCidr': 'Any', 'srcPort': '8612', 'syslogEnabled': False}, {'comment': 'allow AirPrint TCP/7010-7011', 'destCidr': 'Any', 'destPort': '7010,7011', 'policy': 'allow', 'protocol': 'tcp', 'srcCidr': 'Any', 'srcPort': '7010,7011', 'syslogEnabled': False}, {'comment': 'allow AirPrint UDP/7010-7011', 'destCidr': 'Any', 'destPort': '7010,7011', 'policy': 'allow', 'protocol': 'udp', 'srcCidr': 'Any', 'srcPort': '7010,7011', 'syslogEnabled': False}, {'comment': '', 'destCidr': '10.192.8.0/23', 'destPort': 'Any', 'policy': 'deny', 'protocol': 'any', 'srcCidr': '10.192.46.0/23', 'srcPort': 'Any', 'syslogEnabled': False}, {'comment': '', 'destCidr': '10.192.8.0/23,10.192.46.0/23', 'destPort': 'Any', 'policy': 'deny', 'protocol': 'any', 'srcCidr': '10.192.76.0/23', 'srcPort': 'Any', 'syslogEnabled': False}, {'comment': '', 'destCidr': '10.192.8.0/23,10.192.46.0/23,10.192.76.0/23', 'destPort': 'Any', 'policy': 'deny', 'protocol': 'any', 'srcCidr': '10.192.104.0/23', 'srcPort': 'Any', 'syslogEnabled': False}], 'syslogDefaultRule': False}, headers=headers)

	# Network - AutoVPN Settings
	# https://dashboard.meraki.com/api_docs#update-the-site-to-site-vpn-settings-of-a-network
		print('Restoring VPN Settings',file=f)
		f.flush()
		puturl = 'https://api.meraki.com/api/v0/networks/{0}/siteToSiteVpn'.format(str(networkid))
		dashboard = session.put(puturl, json={'hubs': [{'hubId': 'N_662029145223477347', 'useDefaultRoute': False}, {'hubId': 'N_662029145223483647', 'useDefaultRoute': False}, {'hubId': 'N_662029145223477348', 'useDefaultRoute': False}], 'mode': 'spoke', 'subnets': [{'localSubnet': '10.192.104.0/23', 'useVpn': True}, {'localSubnet': '10.192.76.0/23', 'useVpn': True}, {'localSubnet': '10.192.46.0/23', 'useVpn': True}, {'localSubnet': '10.192.8.0/23', 'useVpn': True}]}, headers=headers)

	# SSIDs
	# https://dashboard.meraki.com/api_docs#update-the-attributes-of-an-ssid
		print('Restoring SSIDs',file=f)
		f.flush()
		puturl = 'https://api.meraki.com/api/v0/networks/{0}/ssids/0'.format(str(networkid))
		dashboard = session.put(puturl, json={'authMode': '8021x-radius', 'availabilityTags': [], 'availableOnAllAps': True, 'bandSelection': '5 GHz band only', 'defaultVlanId': 30, 'enabled': False, 'encryptionMode': 'wpa-eap', 'ipAssignmentMode': 'Bridge mode', 'lanIsolationEnabled': False, 'minBitrate': 6, 'name': 'rb-employees-d', 'number': 0, 'perClientBandwidthLimitDown': 0, 'perClientBandwidthLimitUp': 0, 'radiusAccountingEnabled': False, 'radiusAttributeForGroupPolicies': 'Airespace-ACL-Name', 'radiusCoaEnabled': False, 'radiusFailoverPolicy': None, 'radiusLoadBalancingPolicy': None, 'radiusOverride': True, 'radiusServers': [{'host': '10.236.21.7', 'port': 1812, 'secret': 'password'}], 'splashPage': 'None', 'ssidAdminAccessible': False, 'useVlanTagging': True, 'visible': True, 'wpaEncryptionMode': 'WPA2 only'}, headers=headers)
	# MR L3 firewall
	# https://dashboard.meraki.com/api_docs#update-the-l3-firewall-rules-of-an-ssid-on-an-mr-network
		puturl = 'https://api.meraki.com/api/v0/networks/{0}/ssids/0/l3FirewallRules'.format(str(networkid))
		dashboard = session.put(puturl, json={'rules': [], 'allowLanAccess': True}, headers=headers)

		puturl = 'https://api.meraki.com/api/v0/networks/{0}/ssids/1'.format(str(networkid))
		dashboard = session.put(puturl, json={'authMode': 'psk', 'availabilityTags': [], 'availableOnAllAps': True, 'bandSelection': '5 GHz band only', 'defaultVlanId': 20, 'enabled': False, 'encryptionMode': 'wpa', 'ipAssignmentMode': 'Bridge mode', 'lanIsolationEnabled': False, 'minBitrate': 11, 'name': 'rb-iot-d', 'number': 1, 'perClientBandwidthLimitDown': 0, 'perClientBandwidthLimitUp': 0, 'psk': 'meraki123', 'splashPage': 'None', 'ssidAdminAccessible': False, 'useVlanTagging': True, 'visible': True, 'wpaEncryptionMode': 'WPA2 only'}, headers=headers)
	# MR L3 firewall
	# https://dashboard.meraki.com/api_docs#update-the-l3-firewall-rules-of-an-ssid-on-an-mr-network
		puturl = 'https://api.meraki.com/api/v0/networks/{0}/ssids/1/l3FirewallRules'.format(str(networkid))
		dashboard = session.put(puturl, json={'rules': [], 'allowLanAccess': True}, headers=headers)

		puturl = 'https://api.meraki.com/api/v0/networks/{0}/ssids/2'.format(str(networkid))
		dashboard = session.put(puturl, json={'adminSplashUrl': None, 'authMode': 'open-with-radius', 'availabilityTags': [], 'availableOnAllAps': True, 'bandSelection': 'Dual band operation', 'defaultVlanId': 10, 'enabled': False, 'ipAssignmentMode': 'Bridge mode', 'lanIsolationEnabled': False, 'minBitrate': 11, 'name': 'rb-guest-d', 'number': 2, 'perClientBandwidthLimitDown': 0, 'perClientBandwidthLimitUp': 0, 'radiusAccountingEnabled': True, 'radiusAccountingServers': [{'host': '10.236.21.19', 'port': 1813}], 'radiusAttributeForGroupPolicies': 'Aruba-User-Role', 'radiusCoaEnabled': True, 'radiusFailoverPolicy': None, 'radiusLoadBalancingPolicy': None, 'radiusOverride': False, 'radiusServers': [{'host': '10.236.21.19', 'port': 1812, 'secret': 'password'}], 'splashPage': None, 'splashTimeout': '1440 minutes', 'ssidAdminAccessible': False, 'useVlanTagging': True, 'visible': True, 'walledGardenEnabled': True, 'walledGardenRanges': '10.236.21.19/32\n94.127.77.0/24\n94.127.72.0/24\nadmin.brightcove.com\nc.brightcove.com\nsecure.brightcove.com\nmetrics.brightgrove.com\ncdns.gigya.com\n*.redbull.tv\n*.redbullcontentpool.com\n*.guestportal.redbull.com\n*.redbull.com'}, headers=headers)
	# MR L3 firewall
	# https://dashboard.meraki.com/api_docs#update-the-l3-firewall-rules-of-an-ssid-on-an-mr-network
		puturl = 'https://api.meraki.com/api/v0/networks/{0}/ssids/2/l3FirewallRules'.format(str(networkid))
		dashboard = session.put(puturl, json={'rules': [], 'allowLanAccess': True}, headers=headers)

		puturl = 'https://api.meraki.com/api/v0/networks/{0}/ssids/3'.format(str(networkid))
		dashboard = session.put(puturl, json={'authMode': '8021x-radius', 'availabilityTags': [], 'availableOnAllAps': True, 'bandSelection': '5 GHz band only', 'defaultVlanId': 30, 'enabled': True, 'encryptionMode': 'wpa-eap', 'ipAssignmentMode': 'Bridge mode', 'lanIsolationEnabled': False, 'minBitrate': 11, 'name': 'rb-employees', 'number': 3, 'perClientBandwidthLimitDown': 0, 'perClientBandwidthLimitUp': 0, 'radiusAccountingEnabled': False, 'radiusAttributeForGroupPolicies': 'Filter-Id', 'radiusCoaEnabled': False, 'radiusFailoverPolicy': None, 'radiusLoadBalancingPolicy': None, 'radiusOverride': False, 'radiusServers': [{'host': '10.236.21.5', 'port': 1812, 'secret': 'password'}, {'host': '10.236.21.6', 'port': 1812}], 'splashPage': 'None', 'ssidAdminAccessible': False, 'useVlanTagging': True, 'visible': True, 'wpaEncryptionMode': 'WPA2 only'}, headers=headers)
	# MR L3 firewall
	# https://dashboard.meraki.com/api_docs#update-the-l3-firewall-rules-of-an-ssid-on-an-mr-network
		puturl = 'https://api.meraki.com/api/v0/networks/{0}/ssids/3/l3FirewallRules'.format(str(networkid))
		dashboard = session.put(puturl, json={'rules': [], 'allowLanAccess': True}, headers=headers)

		puturl = 'https://api.meraki.com/api/v0/networks/{0}/ssids/4'.format(str(networkid))
		dashboard = session.put(puturl, json={'adminSplashUrl': None, 'authMode': 'open-with-radius', 'availabilityTags': [], 'availableOnAllAps': True, 'bandSelection': 'Dual band operation', 'defaultVlanId': 10, 'enabled': False, 'ipAssignmentMode': 'Bridge mode', 'lanIsolationEnabled': False, 'minBitrate': 11, 'name': 'rb-guest-q', 'number': 4, 'perClientBandwidthLimitDown': 0, 'perClientBandwidthLimitUp': 0, 'radiusAccountingEnabled': True, 'radiusAccountingServers': [{'host': '10.236.21.14', 'port': 1813}], 'radiusAttributeForGroupPolicies': 'Aruba-User-Role', 'radiusCoaEnabled': True, 'radiusFailoverPolicy': None, 'radiusLoadBalancingPolicy': None, 'radiusOverride': False, 'radiusServers': [{'host': '10.236.21.14', 'port': 1812, 'secret': 'password'}], 'splashPage': None, 'splashTimeout': '1440 minutes', 'ssidAdminAccessible': False, 'useVlanTagging': True, 'visible': True, 'walledGardenEnabled': True, 'walledGardenRanges': '10.236.21.14/32\n94.127.77.0/24\n94.127.72.0/24\nadmin.brightcove.com\nc.brightcove.com\nsecure.brightcove.com\nmetrics.brightgrove.com\ncdns.gigya.com\n*.redbull.tv\n*.redbullcontentpool.com\n*.guestportal.redbull.com\n*.redbull.com'}, headers=headers)
	# MR L3 firewall
	# https://dashboard.meraki.com/api_docs#update-the-l3-firewall-rules-of-an-ssid-on-an-mr-network
		puturl = 'https://api.meraki.com/api/v0/networks/{0}/ssids/4/l3FirewallRules'.format(str(networkid))
		dashboard = session.put(puturl, json={'rules': [], 'allowLanAccess': True}, headers=headers)

		puturl = 'https://api.meraki.com/api/v0/networks/{0}/ssids/5'.format(str(networkid))
		dashboard = session.put(puturl, json={'authMode': 'psk', 'availabilityTags': [], 'availableOnAllAps': True, 'bandSelection': 'Dual band operation', 'defaultVlanId': 10, 'enabled': False, 'encryptionMode': 'wpa', 'ipAssignmentMode': 'Bridge mode', 'lanIsolationEnabled': False, 'minBitrate': 11, 'name': 'ATV-Test-PSK', 'number': 5, 'perClientBandwidthLimitDown': 0, 'perClientBandwidthLimitUp': 0, 'psk': 'Meraki123', 'splashPage': 'None', 'ssidAdminAccessible': False, 'useVlanTagging': True, 'visible': True, 'wpaEncryptionMode': 'WPA2 only'}, headers=headers)
	# MR L3 firewall
	# https://dashboard.meraki.com/api_docs#update-the-l3-firewall-rules-of-an-ssid-on-an-mr-network
		puturl = 'https://api.meraki.com/api/v0/networks/{0}/ssids/5/l3FirewallRules'.format(str(networkid))
		dashboard = session.put(puturl, json={'rules': [], 'allowLanAccess': True}, headers=headers)

		puturl = 'https://api.meraki.com/api/v0/networks/{0}/ssids/6'.format(str(networkid))
		dashboard = session.put(puturl, json={'adminSplashUrl': None, 'authMode': 'open-with-radius', 'availabilityTags': [], 'availableOnAllAps': True, 'bandSelection': 'Dual band operation', 'defaultVlanId': 10, 'enabled': True, 'ipAssignmentMode': 'Bridge mode', 'lanIsolationEnabled': False, 'minBitrate': 11, 'name': 'rb-guest', 'number': 6, 'perClientBandwidthLimitDown': 0, 'perClientBandwidthLimitUp': 0, 'radiusAccountingEnabled': True, 'radiusAccountingServers': [{'host': '10.236.21.11', 'port': 1813}], 'radiusAttributeForGroupPolicies': 'Aruba-User-Role', 'radiusCoaEnabled': True, 'radiusFailoverPolicy': None, 'radiusLoadBalancingPolicy': None, 'radiusOverride': False, 'radiusServers': [{'host': '10.236.21.11', 'port': 1812, 'secret': 'password'}], 'splashPage': None, 'splashTimeout': '1440 minutes', 'ssidAdminAccessible': False, 'useVlanTagging': True, 'visible': True, 'walledGardenEnabled': True, 'walledGardenRanges': '10.236.21.11/32\n94.127.77.0/24\n94.127.72.0/24\nadmin.brightcove.com\nc.brightcove.com\nsecure.brightcove.com\nmetrics.brightgrove.com\ncdns.gigya.com\n*.redbull.tv\n*.redbullcontentpool.com\n*.guestportal.redbull.com\n*.redbull.com'}, headers=headers)
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
		puturl = 'https://api.meraki.com/api/v0/networks/{0}/devices/Q2NY-JUAE-JFD4'.format(str(networkid))
		dashboard = session.put(puturl, json={'address': 'Trabrenstraße 2B, Vienna, 1020, Austria', 'firmware': 'wired-14-40', 'floorPlanId': None, 'lanIp': '172.19.81.3', 'lat': 48.21245, 'lng': 16.41229, 'mac': 'ac:17:c8:c5:c5:83', 'model': 'MX68CW-WW', 'name': 'ATVIETBMX01RB', 'serial': 'Q2NY-JUAE-JFD4', 'tags': ' recently-added ', 'wan1Ip': '172.19.81.3', 'wan2Ip': None}, headers=headers)
		puturl = 'https://api.meraki.com/api/v0/networks/{0}/devices/Q3AA-UBRQ-WXU9'.format(str(networkid))
		dashboard = session.put(puturl, json={'address': 'Trabrenstraße 2B, Vienna, 1020, Austria', 'firmware': 'wireless-26-8-1', 'floorPlanId': None, 'lanIp': '10.192.8.21', 'lat': 48.21245, 'lng': 16.41229, 'mac': '68:3a:1e:2d:ef:23', 'model': 'MR45', 'name': 'ATVIETBMR01RB', 'serial': 'Q3AA-UBRQ-WXU9'}, headers=headers)
		puturl = 'https://api.meraki.com/api/v0/networks/{0}/devices/Q2SX-8GUV-272X'.format(str(networkid))
		dashboard = session.put(puturl, json={'address': 'Trabrenstraße 2B, Vienna, 1020, Austria', 'firmware': 'switch-12-14', 'floorPlanId': None, 'lanIp': '10.192.8.11', 'lat': 48.21245, 'lng': 16.41229, 'mac': '68:3a:1e:60:cf:08', 'model': 'MS210-24P', 'name': 'ATVIETBMS01RB', 'serial': 'Q2SX-8GUV-272X', 'switchProfileId': '662029145223463731'}, headers=headers)
	except requests.exceptions.HTTPError as err:
		print(err,file=f)
		print('Can not add network ATVIETB - it probably already exists. Change the Network name and make a new backup.',file=f)
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
		puturl = 'https://api.meraki.com/api/v0/devices/Q2SX-8GUV-272X/switchPorts/1'
		print('Restoring configuration Port1 switch Q2SX-8GUV-272X',file=f)
		payload = '{"number": 1, "name": "MX_UPL", "tags": "MON MX_UPL SelfService_UPL", "enabled": true, "poeEnabled": true, "type": "trunk", "vlan": 40, "voiceVlan": null, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": null}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2SX-8GUV-272X/switchPorts/2'
		print('Restoring configuration Port2 switch Q2SX-8GUV-272X',file=f)
		payload = '{"number": 2, "name": "LAN_INTERNAL", "tags": "LAN_INTERNAL SelfService", "enabled": true, "poeEnabled": true, "type": "access", "vlan": 30, "voiceVlan": 40, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "bpdu guard", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": 1}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2SX-8GUV-272X/switchPorts/3'
		print('Restoring configuration Port3 switch Q2SX-8GUV-272X',file=f)
		payload = '{"number": 3, "name": "LAN_INTERNAL", "tags": "LAN_INTERNAL SelfService", "enabled": true, "poeEnabled": true, "type": "access", "vlan": 30, "voiceVlan": 40, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "bpdu guard", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": 1}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2SX-8GUV-272X/switchPorts/4'
		print('Restoring configuration Port4 switch Q2SX-8GUV-272X',file=f)
		payload = '{"number": 4, "name": "LAN_INTERNAL", "tags": "LAN_INTERNAL SelfService", "enabled": true, "poeEnabled": true, "type": "access", "vlan": 30, "voiceVlan": 40, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "bpdu guard", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": 1}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2SX-8GUV-272X/switchPorts/5'
		print('Restoring configuration Port5 switch Q2SX-8GUV-272X',file=f)
		payload = '{"number": 5, "name": "LAN_INTERNAL", "tags": "LAN_INTERNAL SelfService", "enabled": true, "poeEnabled": true, "type": "access", "vlan": 30, "voiceVlan": 40, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "bpdu guard", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": 1}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2SX-8GUV-272X/switchPorts/6'
		print('Restoring configuration Port6 switch Q2SX-8GUV-272X',file=f)
		payload = '{"number": 6, "name": "LAN_INTERNAL", "tags": "LAN_INTERNAL SelfService", "enabled": true, "poeEnabled": true, "type": "access", "vlan": 30, "voiceVlan": 40, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "bpdu guard", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": null}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2SX-8GUV-272X/switchPorts/7'
		print('Restoring configuration Port7 switch Q2SX-8GUV-272X',file=f)
		payload = '{"number": 7, "name": "LAN_INTERNAL", "tags": "LAN_INTERNAL SelfService", "enabled": true, "poeEnabled": true, "type": "access", "vlan": 30, "voiceVlan": 40, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "bpdu guard", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": null}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2SX-8GUV-272X/switchPorts/8'
		print('Restoring configuration Port8 switch Q2SX-8GUV-272X',file=f)
		payload = '{"number": 8, "name": "LAN_INTERNAL", "tags": "LAN_INTERNAL SelfService", "enabled": true, "poeEnabled": true, "type": "access", "vlan": 30, "voiceVlan": 40, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "bpdu guard", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": null}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2SX-8GUV-272X/switchPorts/9'
		print('Restoring configuration Port9 switch Q2SX-8GUV-272X',file=f)
		payload = '{"number": 9, "name": "LAN_INTERNAL", "tags": "LAN_INTERNAL SelfService", "enabled": true, "poeEnabled": true, "type": "access", "vlan": 30, "voiceVlan": 40, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "bpdu guard", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": null}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2SX-8GUV-272X/switchPorts/10'
		print('Restoring configuration Port10 switch Q2SX-8GUV-272X',file=f)
		payload = '{"number": 10, "name": "LAN_INTERNAL", "tags": "LAN_INTERNAL SelfService", "enabled": true, "poeEnabled": true, "type": "access", "vlan": 30, "voiceVlan": 40, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "bpdu guard", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": null}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2SX-8GUV-272X/switchPorts/11'
		print('Restoring configuration Port11 switch Q2SX-8GUV-272X',file=f)
		payload = '{"number": 11, "name": "LAN_INTERNAL", "tags": "LAN_INTERNAL SelfService", "enabled": true, "poeEnabled": true, "type": "access", "vlan": 30, "voiceVlan": 40, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "bpdu guard", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": null}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2SX-8GUV-272X/switchPorts/12'
		print('Restoring configuration Port12 switch Q2SX-8GUV-272X',file=f)
		payload = '{"number": 12, "name": "LAN_INTERNAL", "tags": "LAN_INTERNAL SelfService", "enabled": true, "poeEnabled": true, "type": "access", "vlan": 30, "voiceVlan": 40, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "bpdu guard", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": null}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2SX-8GUV-272X/switchPorts/13'
		print('Restoring configuration Port13 switch Q2SX-8GUV-272X',file=f)
		payload = '{"number": 13, "name": "LAN_INTERNAL", "tags": "LAN_INTERNAL SelfService", "enabled": true, "poeEnabled": true, "type": "access", "vlan": 30, "voiceVlan": 40, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "bpdu guard", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": null}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2SX-8GUV-272X/switchPorts/14'
		print('Restoring configuration Port14 switch Q2SX-8GUV-272X',file=f)
		payload = '{"number": 14, "name": "LAN_INTERNAL", "tags": "LAN_INTERNAL SelfService", "enabled": true, "poeEnabled": true, "type": "access", "vlan": 30, "voiceVlan": 40, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "bpdu guard", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": null}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2SX-8GUV-272X/switchPorts/15'
		print('Restoring configuration Port15 switch Q2SX-8GUV-272X',file=f)
		payload = '{"number": 15, "name": "LAN_NET-AP", "tags": "AP MON SelfService", "enabled": true, "poeEnabled": true, "type": "trunk", "vlan": 40, "voiceVlan": null, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "bpdu guard", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": null}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2SX-8GUV-272X/switchPorts/16'
		print('Restoring configuration Port16 switch Q2SX-8GUV-272X',file=f)
		payload = '{"number": 16, "name": "LAN_NET-AP", "tags": "AP MON SelfService", "enabled": true, "poeEnabled": true, "type": "trunk", "vlan": 40, "voiceVlan": null, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "bpdu guard", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": null}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2SX-8GUV-272X/switchPorts/17'
		print('Restoring configuration Port17 switch Q2SX-8GUV-272X',file=f)
		payload = '{"number": 17, "name": "LAN_INTERNAL", "tags": "LAN_INTERNAL SelfService", "enabled": true, "poeEnabled": true, "type": "access", "vlan": 30, "voiceVlan": 40, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "bpdu guard", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": null}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2SX-8GUV-272X/switchPorts/18'
		print('Restoring configuration Port18 switch Q2SX-8GUV-272X',file=f)
		payload = '{"number": 18, "name": "LAN_INTERNAL", "tags": "LAN_INTERNAL SelfService", "enabled": true, "poeEnabled": true, "type": "access", "vlan": 30, "voiceVlan": 40, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "bpdu guard", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": null}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2SX-8GUV-272X/switchPorts/19'
		print('Restoring configuration Port19 switch Q2SX-8GUV-272X',file=f)
		payload = '{"number": 19, "name": "LAN_INTERNAL", "tags": "LAN_INTERNAL SelfService", "enabled": true, "poeEnabled": true, "type": "access", "vlan": 30, "voiceVlan": 40, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "bpdu guard", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": null}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2SX-8GUV-272X/switchPorts/20'
		print('Restoring configuration Port20 switch Q2SX-8GUV-272X',file=f)
		payload = '{"number": 20, "name": "LAN_INTERNAL", "tags": "SelfService", "enabled": true, "poeEnabled": true, "type": "trunk", "vlan": 2001, "voiceVlan": null, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": null}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2SX-8GUV-272X/switchPorts/21'
		print('Restoring configuration Port21 switch Q2SX-8GUV-272X',file=f)
		payload = '{"number": 21, "name": "LAN_INTERNAL", "tags": "LAN_INTERNAL SelfService", "enabled": true, "poeEnabled": true, "type": "access", "vlan": 30, "voiceVlan": 40, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "bpdu guard", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": null}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2SX-8GUV-272X/switchPorts/22'
		print('Restoring configuration Port22 switch Q2SX-8GUV-272X',file=f)
		payload = '{"number": 22, "name": "LAN_INTERNAL", "tags": "LAN_INTERNAL SelfService", "enabled": true, "poeEnabled": true, "type": "access", "vlan": 30, "voiceVlan": 40, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "bpdu guard", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": null}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2SX-8GUV-272X/switchPorts/23'
		print('Restoring configuration Port23 switch Q2SX-8GUV-272X',file=f)
		payload = '{"number": 23, "name": "LAN_INTERNAL", "tags": "LAN_INTERNAL SelfService", "enabled": true, "poeEnabled": true, "type": "access", "vlan": 30, "voiceVlan": 40, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "bpdu guard", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": null}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2SX-8GUV-272X/switchPorts/24'
		print('Restoring configuration Port24 switch Q2SX-8GUV-272X',file=f)
		payload = '{"number": 24, "name": "LAN_INTERNAL", "tags": "LAN_INTERNAL SelfService", "enabled": true, "poeEnabled": true, "type": "access", "vlan": 30, "voiceVlan": 40, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "bpdu guard", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": null}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2SX-8GUV-272X/switchPorts/25'
		print('Restoring configuration Port25 switch Q2SX-8GUV-272X',file=f)
		payload = '{"number": 25, "name": "MS_UPL", "tags": "MON MS_UPL SelfService_UPL", "enabled": true, "poeEnabled": false, "type": "trunk", "vlan": 40, "voiceVlan": null, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": null}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2SX-8GUV-272X/switchPorts/26'
		print('Restoring configuration Port26 switch Q2SX-8GUV-272X',file=f)
		payload = '{"number": 26, "name": "MS_UPL", "tags": "MON MS_UPL SelfService_UPL", "enabled": true, "poeEnabled": false, "type": "trunk", "vlan": 40, "voiceVlan": null, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": null}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2SX-8GUV-272X/switchPorts/27'
		print('Restoring configuration Port27 switch Q2SX-8GUV-272X',file=f)
		payload = '{"number": 27, "name": "MS_UPL", "tags": "MON MS_UPL SelfService_UPL", "enabled": true, "poeEnabled": false, "type": "trunk", "vlan": 40, "voiceVlan": null, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": null}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2SX-8GUV-272X/switchPorts/28'
		print('Restoring configuration Port28 switch Q2SX-8GUV-272X',file=f)
		payload = '{"number": 28, "name": "MS_UPL", "tags": "MON MS_UPL SelfService_UPL", "enabled": true, "poeEnabled": false, "type": "trunk", "vlan": 40, "voiceVlan": null, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": null}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2SX-8GUV-272X/switchPorts/29'
		print('Restoring configuration Port29 switch Q2SX-8GUV-272X',file=f)
		payload = '{"number": 29, "name": null, "tags": null, "enabled": true, "poeEnabled": false, "type": "trunk", "vlan": 1, "voiceVlan": null, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": null}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2SX-8GUV-272X/switchPorts/30'
		print('Restoring configuration Port30 switch Q2SX-8GUV-272X',file=f)
		payload = '{"number": 30, "name": null, "tags": null, "enabled": true, "poeEnabled": false, "type": "trunk", "vlan": 1, "voiceVlan": null, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": null}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
	except requests.exceptions.HTTPError as err:
		print(err,file=f)
		print('There was an error restoring the switchs configuration, check the logs for more details.',file=f)
	print('Restoring Switch configuration complete.',file=f)
	f.flush()
	f.close()

