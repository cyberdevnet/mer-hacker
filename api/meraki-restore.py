#!/usr/bin/env python3
#
# Search for "#restored" and edit below that to control what is restored.
#
import os
import argparse
import requests


from dotenv import load_dotenv
load_dotenv()
load_dotenv(dotenv_path=os.path.join(os.path.expanduser('~'),'.meraki.env'))

parser = argparse.ArgumentParser(description='Restore a Meraki online config from an offline file.')
parser.add_argument('orgName', help='The name of a Meraki organisation')
args = parser.parse_args()

headers = {
	'x-cisco-meraki-api-key': os.getenv('x_cisco_meraki_api_key'),
	'Content-Type': 'application/json'
	}

session = requests.Session()

def get_org_id(orgName):
	try:
		# https://dashboard.meraki.com/api_docs#list-the-organizations-that-the-user-has-privileges-on
		geturl = 'https://api.meraki.com/api/v0/organizations'
		dashboard = session.get(geturl, headers=headers)
		dashboard.raise_for_status()
	except requests.exceptions.HTTPError as err:
		print(err)

	for row in dashboard.json():
		if row['name'] == orgName:
			return row['id']
	raise ValueError('The organization name does not exist')

orgid=get_org_id(args.orgName)


# Edit script below this line to control what is #restored.

# Organisation Dashboard Administrators
# https://dashboard.meraki.com/api_docs#create-a-new-dashboard-administrator
posturl = 'https://api.meraki.com/api/v0/organizations/{0}/admins'.format(str(orgid))
dashboard = session.post(posturl, json={'accountStatus': 'ok', 'email': 'fabrizio.rollo@nts.eu', 'hasApiKey': True, 'id': '967931', 'lastActive': 1592234155, 'name': 'Fabrizio Rollo', 'networks': [], 'orgAccess': 'full', 'tags': [], 'twoFactorAuthEnabled': True}, headers=headers)

# MX VPN firewall
# https://dashboard.meraki.com/api_docs#mx-vpn-firewall
puturl = 'https://api.meraki.com/api/v0/organizations/{0}/vpnFirewallRules'.format(str(orgid))
dashboard = session.put(puturl, json={'rules': [], 'syslogEnabled': True}, headers=headers)

# SNMP Settings
# https://dashboard.meraki.com/api_docs#update-the-snmp-settings-for-an-organization
puturl = 'https://api.meraki.com/api/v0/organizations/{0}/snmp'.format(str(orgid))
try:
	dashboard = session.put(puturl, json={'peerIps': None, 'v2cEnabled': False, 'v3Enabled': False}, headers=headers)
	dashboard.raise_for_status()
except requests.exceptions.HTTPError as err:
	print(err)

# Non Meraki VPN Peers
# https://dashboard.meraki.com/api_docs#update-the-third-party-vpn-peers-for-an-organization
puturl = 'https://api.meraki.com/api/v0/organizations/{0}/thirdPartyVPNPeers'.format(str(orgid))
try:
	dashboard = session.put(puturl, json=[], headers=headers)
	dashboard.raise_for_status()
except requests.exceptions.HTTPError as err:
	print(err)

# Add Network: Heisenberg-Lab
print('Processing network Heisenberg-Lab')
try:
	# https://dashboard.meraki.com/api_docs#create-a-network
	posturl = 'https://api.meraki.com/api/v0/organizations/{0}/networks'.format(str(orgid))
	dashboard = session.post(posturl, json={'disableMyMerakiCom': False, 'disableRemoteStatusPage': True, 'id': 'L_681169443639788368', 'name': 'Heisenberg-Lab', 'organizationId': '764320', 'productTypes': ['appliance', 'switch', 'wireless'], 'timeZone': 'Europe/Vienna', 'type': 'combined'}, headers=headers)
	dashboard.raise_for_status()
	networkid=dashboard.json()['id']

	# MX VLANs
	# https://dashboard.meraki.com/api_docs#enable/disable-vlans-for-the-given-network
	puturl = 'https://api.meraki.com/api/v0/networks/{0}/vlansEnabledState'.format(str(networkid))
	dashboard = session.put(puturl, json={'enabled': True, 'networkId': 'L_681169443639788368'}, headers=headers)
	# https://dashboard.meraki.com/api_docs#add-a-vlan
	posturl = 'https://api.meraki.com/api/v0/networks/{0}/vlans'.format(str(networkid))
	dashboard = session.post(posturl, json={'applianceIp': '192.168.128.1', 'dhcpBootOptionsEnabled': False, 'dhcpHandling': 'Run a DHCP server', 'dhcpLeaseTime': '1 day', 'dhcpOptions': [], 'dnsNameservers': 'upstream_dns', 'fixedIpAssignments': {}, 'id': 1, 'name': 'Default', 'networkId': 'L_681169443639788368', 'reservedIpRanges': [], 'subnet': '192.168.128.0/24'}, headers=headers)
	dashboard = session.post(posturl, json={'applianceIp': '10.10.10.1', 'dhcpBootOptionsEnabled': False, 'dhcpHandling': 'Run a DHCP server', 'dhcpLeaseTime': '1 day', 'dhcpOptions': [], 'dnsNameservers': 'upstream_dns', 'fixedIpAssignments': {'30:24:32:f4:f8:12': {'ip': '10.10.10.17', 'name': None}, 'e4:58:b8:05:17:31': {'ip': '10.10.10.21', 'name': None}, 'e4:aa:5d:e4:7e:be': {'ip': '10.10.10.2', 'name': None}, 'e8:b1:fc:0a:a7:d0': {'ip': '10.10.10.28', 'name': 'ubuntu'}}, 'id': 666, 'name': 'BlueSky', 'networkId': 'L_681169443639788368', 'reservedIpRanges': [], 'subnet': '10.10.10.0/24'}, headers=headers)
	dashboard = session.post(posturl, json={'applianceIp': '192.168.1.1', 'dhcpBootOptionsEnabled': False, 'dhcpHandling': 'Run a DHCP server', 'dhcpLeaseTime': '1 day', 'dhcpOptions': [], 'dnsNameservers': 'upstream_dns', 'fixedIpAssignments': {}, 'id': 999, 'name': 'Guest SSID', 'networkId': 'L_681169443639788368', 'reservedIpRanges': [], 'subnet': '192.168.1.0/24'}, headers=headers)

	# MX cellular firewall
	# https://dashboard.meraki.com/api_docs#mx-cellular-firewall
	puturl = 'https://api.meraki.com/api/v0/networks/{0}/cellularFirewallRules'.format(str(networkid))
	dashboard = session.put(puturl, json={'rules': [], 'syslogEnabled': False}, headers=headers)

	# MX L3 Firewall Rules
	# https://api.meraki.com/api_docs#update-the-l3-firewall-rules-of-an-mx-network
	puturl = 'https://api.meraki.com/api/v0/networks/{0}/l3FirewallRules'.format(str(networkid))
	dashboard = session.put(puturl, json={'rules': [], 'syslogDefaultRule': False}, headers=headers)

	# Network - AutoVPN Settings
	# https://dashboard.meraki.com/api_docs#update-the-site-to-site-vpn-settings-of-a-network
	puturl = 'https://api.meraki.com/api/v0/networks/{0}/siteToSiteVpn'.format(str(networkid))
	dashboard = session.put(puturl, json={'mode': 'none'}, headers=headers)

	# SSIDs
	# https://dashboard.meraki.com/api_docs#update-the-attributes-of-an-ssid
	puturl = 'https://api.meraki.com/api/v0/networks/{0}/ssids/0'.format(str(networkid))
	dashboard = session.put(puturl, json={'authMode': 'psk', 'availabilityTags': [], 'availableOnAllAps': True, 'bandSelection': 'Dual band operation', 'defaultVlanId': 666, 'enabled': True, 'encryptionMode': 'wpa', 'ipAssignmentMode': 'Bridge mode', 'lanIsolationEnabled': False, 'minBitrate': 11, 'name': "� molto lontana l'Islanda!", 'number': 0, 'perClientBandwidthLimitDown': 0, 'perClientBandwidthLimitUp': 0, 'psk': '8volante', 'splashPage': 'None', 'ssidAdminAccessible': False, 'useVlanTagging': True, 'visible': True, 'wpaEncryptionMode': 'WPA2 only'}, headers=headers)
	# MR L3 firewall
	# https://dashboard.meraki.com/api_docs#update-the-l3-firewall-rules-of-an-ssid-on-an-mr-network
	puturl = 'https://api.meraki.com/api/v0/networks/{0}/ssids/0/l3FirewallRules'.format(str(networkid))
	dashboard = session.put(puturl, json={'rules': [], 'allowLanAccess': True}, headers=headers)

	puturl = 'https://api.meraki.com/api/v0/networks/{0}/ssids/1'.format(str(networkid))
	dashboard = session.put(puturl, json={'adminSplashUrl': '', 'authMode': 'open', 'availabilityTags': [], 'availableOnAllAps': True, 'bandSelection': 'Dual band operation', 'defaultVlanId': 999, 'enabled': False, 'ipAssignmentMode': 'Bridge mode', 'lanIsolationEnabled': False, 'minBitrate': 11, 'name': 'Heisenberg-Guest', 'number': 1, 'perClientBandwidthLimitDown': 500, 'perClientBandwidthLimitUp': 500, 'splashPage': 'Click-through splash page', 'splashTimeout': '1440 minutes', 'ssidAdminAccessible': False, 'useVlanTagging': True, 'visible': True, 'walledGardenEnabled': False}, headers=headers)
	# MR L3 firewall
	# https://dashboard.meraki.com/api_docs#update-the-l3-firewall-rules-of-an-ssid-on-an-mr-network
	puturl = 'https://api.meraki.com/api/v0/networks/{0}/ssids/1/l3FirewallRules'.format(str(networkid))
	dashboard = session.put(puturl, json={'rules': [], 'allowLanAccess': True}, headers=headers)

	puturl = 'https://api.meraki.com/api/v0/networks/{0}/ssids/2'.format(str(networkid))
	dashboard = session.put(puturl, json={'authMode': 'psk', 'availabilityTags': [], 'availableOnAllAps': True, 'bandSelection': 'Dual band operation', 'defaultVlanId': 777, 'enabled': False, 'encryptionMode': 'wpa', 'ipAssignmentMode': 'Bridge mode', 'lanIsolationEnabled': False, 'minBitrate': 11, 'name': 'UPC130884FF', 'number': 2, 'perClientBandwidthLimitDown': 0, 'perClientBandwidthLimitUp': 0, 'psk': 'MRRobot123!', 'splashPage': 'None', 'ssidAdminAccessible': False, 'useVlanTagging': True, 'visible': True, 'wpaEncryptionMode': 'WPA2 only'}, headers=headers)
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
	puturl = 'https://api.meraki.com/api/v0/networks/{0}}/devices/claim.format(str(networkid))
	dashboard = session.put(puturl, json=Q2KN-MEHN-SK32, headers=headers)
	puturl = 'https://api.meraki.com/api/v0/networks/{0}/devices/Q2KN-MEHN-SK32'.format(str(networkid))
	dashboard = session.put(puturl, json={'address': 'Sch�ffergasse 20/44', 'firmware': 'wired-14-42', 'floorPlanId': None, 'lanIp': '192.168.0.22', 'lat': 48.19386, 'lng': 16.36354, 'mac': '0c:8d:db:92:1a:48', 'model': 'MX64', 'name': 'MX64-Heisenberg', 'networkId': 'L_681169443639788368', 'serial': 'Q2KN-MEHN-SK32', 'url': 'https://n210.meraki.com/Heisenberg-Lab-a/n/v8z8sdsd/manage/nodes/new_list/13803413707336', 'wan1Ip': '192.168.0.22', 'wan2Ip': None}, headers=headers)
	puturl = 'https://api.meraki.com/api/v0/networks/{0}}/devices/claim.format(str(networkid))
	dashboard = session.put(puturl, json=Q2PD-M66A-L5TE, headers=headers)
	puturl = 'https://api.meraki.com/api/v0/networks/{0}/devices/Q2PD-M66A-L5TE'.format(str(networkid))
	dashboard = session.put(puturl, json={'address': 'Sch�ggergasse 20 Wien', 'firmware': 'wireless-25-11', 'floorPlanId': None, 'lanIp': '192.168.128.10', 'lat': 48.19386, 'lng': 16.36354, 'mac': '98:18:88:73:18:ab', 'model': 'MR33', 'name': 'AP Kleines Zimmer', 'networkId': 'L_681169443639788368', 'serial': 'Q2PD-M66A-L5TE', 'url': 'https://n210.meraki.com/Heisenberg-Lab-w/n/cw6ZLasd/manage/nodes/new_list/167231135881387'}, headers=headers)
	puturl = 'https://api.meraki.com/api/v0/networks/{0}}/devices/claim.format(str(networkid))
	dashboard = session.put(puturl, json=Q2HP-QSVT-LBLV, headers=headers)
	puturl = 'https://api.meraki.com/api/v0/networks/{0}/devices/Q2HP-QSVT-LBLV'.format(str(networkid))
	dashboard = session.put(puturl, json={'address': 'Hardtmuthgasse 61', 'firmware': 'switch-11-22', 'floorPlanId': None, 'lanIp': '192.168.128.3', 'lat': 48.17036, 'lng': 16.36902, 'mac': 'e0:cb:bc:3b:25:45', 'model': 'MS220-8P', 'name': 'MS220-8P-Heisenberg', 'networkId': 'L_681169443639788368', 'serial': 'Q2HP-QSVT-LBLV', 'switchProfileId': None, 'url': 'https://n210.meraki.com/Heisenberg-Lab-s/n/1T9IPcsd/manage/nodes/new_list/247165640975685'}, headers=headers)
	puturl = 'https://api.meraki.com/api/v0/devices/Q2HP-QSVT-LBLV'/switchPorts/1'.f...	dashboard = session.put(puturl, json={'accessPolicyNumber': None, 'allowedVlans': 'all', 'enabled': True, 'isolationEnabled': False, 'linkNegotiation': 'Auto negotiate', 'macWhitelist': None, 'name': None, 'number': 1, 'poeEnabled': True, 'portScheduleId': None, 'rstpEnabled': True, 'stickyMacWhitelist': None, 'stickyMacWhitelistLimit': None, 'stpGuard': 'disabled', 'tags': None, 'type': 'trunk', 'udld': 'Alert only', 'vlan': 1, 'voiceVlan': None}, headers=headers)
	puturl = 'https://api.meraki.com/api/v0/devices/Q2HP-QSVT-LBLV'/switchPorts/2'.f...	dashboard = session.put(puturl, json={'accessPolicyNumber': None, 'allowedVlans': 'all', 'enabled': True, 'isolationEnabled': False, 'linkNegotiation': 'Auto negotiate', 'macWhitelist': None, 'name': '', 'number': 2, 'poeEnabled': True, 'portScheduleId': None, 'rstpEnabled': True, 'stickyMacWhitelist': None, 'stickyMacWhitelistLimit': None, 'stpGuard': 'disabled', 'tags': None, 'type': 'trunk', 'udld': 'Alert only', 'vlan': 1, 'voiceVlan': None}, headers=headers)
	puturl = 'https://api.meraki.com/api/v0/devices/Q2HP-QSVT-LBLV'/switchPorts/3'.f...	dashboard = session.put(puturl, json={'accessPolicyNumber': None, 'allowedVlans': 'all', 'enabled': True, 'isolationEnabled': False, 'linkNegotiation': 'Auto negotiate', 'macWhitelist': None, 'name': '', 'number': 3, 'poeEnabled': True, 'portScheduleId': None, 'rstpEnabled': True, 'stickyMacWhitelist': None, 'stickyMacWhitelistLimit': None, 'stpGuard': 'disabled', 'tags': None, 'type': 'trunk', 'udld': 'Alert only', 'vlan': 1, 'voiceVlan': None}, headers=headers)
	puturl = 'https://api.meraki.com/api/v0/devices/Q2HP-QSVT-LBLV'/switchPorts/4'.f...	dashboard = session.put(puturl, json={'accessPolicyNumber': None, 'allowedVlans': 'all', 'enabled': True, 'isolationEnabled': False, 'linkNegotiation': 'Auto negotiate', 'macWhitelist': None, 'name': '', 'number': 4, 'poeEnabled': True, 'portScheduleId': None, 'rstpEnabled': True, 'stickyMacWhitelist': None, 'stickyMacWhitelistLimit': None, 'stpGuard': 'disabled', 'tags': None, 'type': 'trunk', 'udld': 'Alert only', 'vlan': 1, 'voiceVlan': None}, headers=headers)
	puturl = 'https://api.meraki.com/api/v0/devices/Q2HP-QSVT-LBLV'/switchPorts/5'.f...	dashboard = session.put(puturl, json={'accessPolicyNumber': None, 'allowedVlans': 'all', 'enabled': True, 'isolationEnabled': False, 'linkNegotiation': 'Auto negotiate', 'macWhitelist': None, 'name': '', 'number': 5, 'poeEnabled': True, 'portScheduleId': None, 'rstpEnabled': True, 'stickyMacWhitelist': None, 'stickyMacWhitelistLimit': None, 'stpGuard': 'disabled', 'tags': None, 'type': 'access', 'udld': 'Alert only', 'vlan': 777, 'voiceVlan': None}, headers=headers)
	puturl = 'https://api.meraki.com/api/v0/devices/Q2HP-QSVT-LBLV'/switchPorts/6'.f...	dashboard = session.put(puturl, json={'accessPolicyNumber': None, 'allowedVlans': 'all', 'enabled': True, 'isolationEnabled': False, 'linkNegotiation': 'Auto negotiate', 'macWhitelist': None, 'name': '', 'number': 6, 'poeEnabled': True, 'portScheduleId': None, 'rstpEnabled': True, 'stickyMacWhitelist': None, 'stickyMacWhitelistLimit': None, 'stpGuard': 'disabled', 'tags': None, 'type': 'access', 'udld': 'Alert only', 'vlan': 666, 'voiceVlan': None}, headers=headers)
	puturl = 'https://api.meraki.com/api/v0/devices/Q2HP-QSVT-LBLV'/switchPorts/7'.f...	dashboard = session.put(puturl, json={'accessPolicyNumber': None, 'allowedVlans': 'all', 'enabled': True, 'isolationEnabled': False, 'linkNegotiation': 'Auto negotiate', 'macWhitelist': None, 'name': '', 'number': 7, 'poeEnabled': True, 'portScheduleId': None, 'rstpEnabled': True, 'stickyMacWhitelist': None, 'stickyMacWhitelistLimit': None, 'stpGuard': 'disabled', 'tags': None, 'type': 'access', 'udld': 'Alert only', 'vlan': 666, 'voiceVlan': None}, headers=headers)
	puturl = 'https://api.meraki.com/api/v0/devices/Q2HP-QSVT-LBLV'/switchPorts/8'.f...	dashboard = session.put(puturl, json={'accessPolicyNumber': None, 'allowedVlans': 'all', 'enabled': True, 'isolationEnabled': False, 'linkNegotiation': 'Auto negotiate', 'macWhitelist': None, 'name': '', 'number': 8, 'poeEnabled': True, 'portScheduleId': None, 'rstpEnabled': True, 'stickyMacWhitelist': None, 'stickyMacWhitelistLimit': None, 'stpGuard': 'disabled', 'tags': None, 'type': 'access', 'udld': 'Alert only', 'vlan': 666, 'voiceVlan': None}, headers=headers)
	puturl = 'https://api.meraki.com/api/v0/devices/Q2HP-QSVT-LBLV'/switchPorts/9'.f...	dashboard = session.put(puturl, json={'accessPolicyNumber': None, 'allowedVlans': 'all', 'enabled': True, 'isolationEnabled': False, 'linkNegotiation': 'Auto negotiate', 'macWhitelist': None, 'name': '', 'number': 9, 'poeEnabled': False, 'portScheduleId': None, 'rstpEnabled': True, 'stickyMacWhitelist': None, 'stickyMacWhitelistLimit': None, 'stpGuard': 'disabled', 'tags': None, 'type': 'access', 'udld': 'Alert only', 'vlan': 666, 'voiceVlan': None}, headers=headers)
	puturl = 'https://api.meraki.com/api/v0/devices/Q2HP-QSVT-LBLV'/switchPorts/10'.f...	dashboard = session.put(puturl, json={'accessPolicyNumber': None, 'allowedVlans': 'all', 'enabled': True, 'isolationEnabled': False, 'linkNegotiation': 'Auto negotiate', 'macWhitelist': None, 'name': '', 'number': 10, 'poeEnabled': False, 'portScheduleId': None, 'rstpEnabled': True, 'stickyMacWhitelist': None, 'stickyMacWhitelistLimit': None, 'stpGuard': 'disabled', 'tags': None, 'type': 'access', 'udld': 'Alert only', 'vlan': 666, 'voiceVlan': None}, headers=headers)
except requests.exceptions.HTTPError as err:
	print('Can not add network Heisenberg-Lab - it probably already exists')

