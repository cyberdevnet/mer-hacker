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
	dashboard = session.post(posturl, json={'accountStatus': 'ok', 'email': 'andreas.beck@nts.eu', 'hasApiKey': False, 'id': '595038100766389530', 'lastActive': 1586411210, 'name': 'Andreas Beck', 'networks': [], 'orgAccess': 'full', 'tags': [], 'twoFactorAuthEnabled': True}, headers=headers)
	dashboard = session.post(posturl, json={'accountStatus': 'ok', 'email': 'andreas.sauerwein@nts.eu', 'hasApiKey': True, 'id': '746471638236660137', 'lastActive': 1593252942, 'name': 'Andreas Sauerwein', 'networks': [], 'orgAccess': 'full', 'tags': [], 'twoFactorAuthEnabled': True}, headers=headers)
	dashboard = session.post(posturl, json={'accountStatus': 'ok', 'email': 'a.resl@signa.at', 'hasApiKey': False, 'id': '702561541869902204', 'lastActive': 1593009724, 'name': 'Alexander Resl', 'networks': [], 'orgAccess': 'full', 'tags': [], 'twoFactorAuthEnabled': True}, headers=headers)
	dashboard = session.post(posturl, json={'accountStatus': 'ok', 'email': 'bernhard.albler@frink.at', 'hasApiKey': False, 'id': '595038100766389429', 'lastActive': 1592587822, 'name': 'Bernhard Albler', 'networks': [], 'orgAccess': 'read-only', 'tags': [], 'twoFactorAuthEnabled': True}, headers=headers)
	dashboard = session.post(posturl, json={'accountStatus': 'ok', 'email': 'b.lochner@signa.at', 'hasApiKey': False, 'id': '595038100766435701', 'lastActive': 1593005835, 'name': 'Benjamin Lochner', 'networks': [], 'orgAccess': 'full', 'tags': [], 'twoFactorAuthEnabled': True}, headers=headers)
	dashboard = session.post(posturl, json={'accountStatus': 'ok', 'email': 'c.klune@signa.at', 'hasApiKey': True, 'id': '595038100766414984', 'lastActive': 1593084914, 'name': 'Clemens Klune', 'networks': [], 'orgAccess': 'full', 'tags': [], 'twoFactorAuthEnabled': True}, headers=headers)
	dashboard = session.post(posturl, json={'accountStatus': 'ok', 'email': 'daniel.heiss@bcomm.at', 'hasApiKey': False, 'id': '702561541869868352', 'lastActive': 1593005038, 'name': 'Daniel Heiss', 'networks': [{'access': 'full', 'id': 'L_702561541869803881'}], 'orgAccess': 'none', 'tags': [], 'twoFactorAuthEnabled': True}, headers=headers)
	dashboard = session.post(posturl, json={'accountStatus': 'ok', 'email': 'daniel.neumayr@bcomm.at', 'hasApiKey': False, 'id': '702561541869868353', 'lastActive': 1592980777, 'name': 'Daniel Neumayr', 'networks': [{'access': 'full', 'id': 'L_702561541869803881'}], 'orgAccess': 'none', 'tags': [], 'twoFactorAuthEnabled': True}, headers=headers)
	dashboard = session.post(posturl, json={'accountStatus': 'ok', 'email': 'd.krol@signa.at', 'hasApiKey': False, 'id': '702561541869857933', 'lastActive': 1590141723, 'name': 'Dominik Król', 'networks': [], 'orgAccess': 'read-only', 'tags': [], 'twoFactorAuthEnabled': True}, headers=headers)
	dashboard = session.post(posturl, json={'accountStatus': 'ok', 'email': 'e.elezi@signa.at', 'hasApiKey': False, 'id': '746471638236660707', 'lastActive': 1591113092, 'name': 'Elez Elezi', 'networks': [], 'orgAccess': 'read-only', 'tags': [], 'twoFactorAuthEnabled': True}, headers=headers)
	dashboard = session.post(posturl, json={'accountStatus': 'ok', 'email': 'fabrizio.rollo@nts.eu', 'hasApiKey': True, 'id': '702561541869830126', 'lastActive': 1593302751, 'name': 'Fabrizio Rollo', 'networks': [], 'orgAccess': 'full', 'tags': [], 'twoFactorAuthEnabled': True}, headers=headers)
	dashboard = session.post(posturl, json={'accountStatus': 'ok', 'email': 'f.hillebrand@signa.at', 'hasApiKey': False, 'id': '595038100766414982', 'lastActive': 1552904329, 'name': 'Franz Hillebrand', 'networks': [], 'orgAccess': 'read-only', 'tags': [], 'twoFactorAuthEnabled': True}, headers=headers)
	dashboard = session.post(posturl, json={'accountStatus': 'ok', 'email': 'florian.schloegl@reesa.at', 'hasApiKey': False, 'id': '702561541869866612', 'lastActive': 1593146969, 'name': 'Florian Schlögl', 'networks': [{'access': 'full', 'id': 'L_746471638236659961'}, {'access': 'full', 'id': 'L_702561541869799362'}, {'access': 'full', 'id': 'L_702561541869803272'}, {'access': 'full', 'id': 'L_702561541869800440'}, {'access': 'full', 'id': 'L_702561541869799634'}, {'access': 'full', 'id': 'N_702561541869834643'}, {'access': 'full', 'id': 'N_702561541869803957'}], 'orgAccess': 'none', 'tags': [], 'twoFactorAuthEnabled': True}, headers=headers)
	dashboard = session.post(posturl, json={'accountStatus': 'ok', 'email': 'g.stingl@signa.at', 'hasApiKey': False, 'id': '832753', 'lastActive': 1593280400, 'name': 'Georg Stingl', 'networks': [], 'orgAccess': 'full', 'tags': [], 'twoFactorAuthEnabled': True}, headers=headers)
	dashboard = session.post(posturl, json={'accountStatus': 'ok', 'email': 'juergen.holzer@nts.eu', 'hasApiKey': False, 'id': '595038100766420062', 'lastActive': 1591945175, 'name': 'Jürgen Holzer', 'networks': [], 'orgAccess': 'full', 'tags': [], 'twoFactorAuthEnabled': True}, headers=headers)
	dashboard = session.post(posturl, json={'accountStatus': 'ok', 'email': 'k.dioso@signa.at', 'hasApiKey': False, 'id': '595038100766436660', 'lastActive': 1593087450, 'name': 'Kenneth Dioso', 'networks': [], 'orgAccess': 'read-only', 'tags': [], 'twoFactorAuthEnabled': True}, headers=headers)
	dashboard = session.post(posturl, json={'accountStatus': 'ok', 'email': 'mark.shanley@bcomm.at', 'hasApiKey': False, 'id': '702561541869869431', 'lastActive': 1579772418, 'name': 'Mark Shanley', 'networks': [{'access': 'full', 'id': 'L_702561541869803881'}], 'orgAccess': 'none', 'tags': [], 'twoFactorAuthEnabled': True}, headers=headers)
	dashboard = session.post(posturl, json={'accountStatus': 'ok', 'email': 'martin.steibl@nts.eu', 'hasApiKey': True, 'id': '595038100766367599', 'lastActive': 1593282582, 'name': 'Martin Steibl', 'networks': [], 'orgAccess': 'full', 'tags': [], 'twoFactorAuthEnabled': True}, headers=headers)
	dashboard = session.post(posturl, json={'accountStatus': 'ok', 'email': 'mathias.spoerr@nts.eu', 'hasApiKey': False, 'id': '702561541869821156', 'lastActive': 1537175688, 'name': 'Mathias Spoerr', 'networks': [], 'orgAccess': 'full', 'tags': [], 'twoFactorAuthEnabled': True}, headers=headers)
	dashboard = session.post(posturl, json={'accountStatus': 'ok', 'email': 'p.traenker@signa.at', 'hasApiKey': False, 'id': '595038100766380663', 'lastActive': 1593075727, 'name': 'Pascal Tränker', 'networks': [], 'orgAccess': 'full', 'tags': [], 'twoFactorAuthEnabled': True}, headers=headers)
	dashboard = session.post(posturl, json={'accountStatus': 'ok', 'email': 'rene.ganzer@bcomm.at', 'hasApiKey': False, 'id': '702561541869868354', 'lastActive': 1589370146, 'name': 'Rene Ganzer', 'networks': [{'access': 'full', 'id': 'L_702561541869803881'}], 'orgAccess': 'none', 'tags': [], 'twoFactorAuthEnabled': True}, headers=headers)
	dashboard = session.post(posturl, json={'accountStatus': 'ok', 'email': 'rudolf.kueplen@nts.eu', 'hasApiKey': False, 'id': '746471638236660415', 'lastActive': 1588256626, 'name': 'Rudolf Kueplen', 'networks': [], 'orgAccess': 'full', 'tags': [], 'twoFactorAuthEnabled': True}, headers=headers)
	dashboard = session.post(posturl, json={'accountStatus': 'ok', 'email': 's.hoebarth@signa.at', 'hasApiKey': False, 'id': '702561541869940001', 'lastActive': 1593182626, 'name': 'Stefan Höbarth', 'networks': [], 'orgAccess': 'full', 'tags': [], 'twoFactorAuthEnabled': True}, headers=headers)
	dashboard = session.post(posturl, json={'accountStatus': 'ok', 'email': 'stoyan.stoitsev@frink.at', 'hasApiKey': False, 'id': '595038100766388221', 'lastActive': 1592298745, 'name': 'Stoyan Stoitsev', 'networks': [], 'orgAccess': 'full', 'tags': [], 'twoFactorAuthEnabled': True}, headers=headers)
	dashboard = session.post(posturl, json={'accountStatus': 'ok', 'email': 'support@bcomm.at', 'hasApiKey': False, 'id': '702561541869868341', 'lastActive': 1591169083, 'name': 'BCOMM Support', 'networks': [{'access': 'full', 'id': 'L_702561541869803881'}], 'orgAccess': 'none', 'tags': [], 'twoFactorAuthEnabled': True}, headers=headers)
	dashboard = session.post(posturl, json={'accountStatus': 'ok', 'email': 'support@nts.eu', 'hasApiKey': True, 'id': '595038100766409268', 'lastActive': 1592999278, 'name': 'NTS Support', 'networks': [], 'orgAccess': 'full', 'tags': [], 'twoFactorAuthEnabled': True}, headers=headers)
	dashboard = session.post(posturl, json={'accountStatus': 'ok', 'email': 't.freidl@signa.at', 'hasApiKey': False, 'id': '595038100766389180', 'lastActive': 1590732578, 'name': 'Thomas Freidl', 'networks': [], 'orgAccess': 'full', 'tags': [], 'twoFactorAuthEnabled': True}, headers=headers)
	dashboard = session.post(posturl, json={'accountStatus': 'ok', 'email': 't.koerbel@signa.at', 'hasApiKey': False, 'id': '702561541869800672', 'lastActive': 1593007678, 'name': 'ThomasKoerbel', 'networks': [], 'orgAccess': 'read-only', 'tags': [], 'twoFactorAuthEnabled': True}, headers=headers)
	dashboard = session.post(posturl, json={'accountStatus': 'ok', 'email': 'w.wurm@signa.at', 'hasApiKey': False, 'id': '702561541869907744', 'lastActive': 1568209536, 'name': 'Wolfgang Wurm', 'networks': [], 'orgAccess': 'read-only', 'tags': [], 'twoFactorAuthEnabled': True}, headers=headers)

# MX VPN firewall
# https://dashboard.meraki.com/api_docs#mx-vpn-firewall
	print('Restoring mx_vpn_firewall_rules',file=f)
	f.flush()
	puturl = 'https://api.meraki.com/api/v0/organizations/{0}/vpnFirewallRules'.format(str(ARG_ORGID))
	dashboard = session.put(puturl, json={'rules': [{'comment': 'CRM to ICE2', 'policy': 'allow', 'protocol': 'any', 'srcPort': 'Any', 'srcCidr': '10.82.0.0/16', 'destPort': 'Any', 'destCidr': '10.1.1.50/32', 'syslogEnabled': True}, {'comment': 'CRM to sPrint02', 'policy': 'allow', 'protocol': 'any', 'srcPort': 'Any', 'srcCidr': '10.82.0.0/16', 'destPort': 'Any', 'destCidr': '10.1.1.194/32', 'syslogEnabled': True}, {'comment': 'CRM to CRM Domain Controller', 'policy': 'allow', 'protocol': 'any', 'srcPort': 'Any', 'srcCidr': '10.82.0.0/16', 'destPort': 'Any', 'destCidr': '10.1.115.250/32', 'syslogEnabled': True}, {'comment': 'CRM to DNS01', 'policy': 'allow', 'protocol': 'tcp', 'srcPort': 'Any', 'srcCidr': '10.82.0.0/16', 'destPort': '53', 'destCidr': '10.1.1.15/32', 'syslogEnabled': True}, {'comment': 'CRM to DNS02', 'policy': 'allow', 'protocol': 'tcp', 'srcPort': 'Any', 'srcCidr': '10.82.0.0/16', 'destPort': '53', 'destCidr': '10.1.1.15/32', 'syslogEnabled': True}, {'comment': '', 'policy': 'allow', 'protocol': 'icmp', 'srcPort': 'Any', 'srcCidr': '10.82.0.0/16', 'destPort': 'Any', 'destCidr': '10.1.0.0/16', 'syslogEnabled': True}, {'comment': 'CRM Deny 10/8', 'policy': 'deny', 'protocol': 'any', 'srcPort': 'Any', 'srcCidr': '10.82.0.0/16', 'destPort': 'Any', 'destCidr': '10.0.0.0/8', 'syslogEnabled': True}, {'comment': 'CRM Deny 172/8', 'policy': 'deny', 'protocol': 'any', 'srcPort': 'Any', 'srcCidr': '10.82.0.0/16', 'destPort': 'Any', 'destCidr': '172.0.0.0/8', 'syslogEnabled': True}, {'comment': '', 'policy': 'deny', 'protocol': 'any', 'srcPort': 'Any', 'srcCidr': '10.82.0.0/16', 'destPort': 'Any', 'destCidr': '192.168.0.0/16', 'syslogEnabled': True}, {'comment': 'hubusecurity', 'policy': 'allow', 'protocol': 'any', 'srcPort': 'Any', 'srcCidr': '10.15.2.209/32', 'destPort': 'Any', 'destCidr': '10.0.0.0/8', 'syslogEnabled': True}, {'comment': '', 'policy': 'allow', 'protocol': 'any', 'srcPort': 'Any', 'srcCidr': '10.15.9.0/24', 'destPort': 'Any', 'destCidr': '10.15.2.0/24', 'syslogEnabled': True}, {'comment': 'Allow DC-Server to Gardasee-Security ', 'policy': 'allow', 'protocol': 'any', 'srcPort': 'Any', 'srcCidr': '10.1.1.0/24', 'destPort': 'Any', 'destCidr': '10.14.2.0/24', 'syslogEnabled': True}, {'comment': 'Block to Gardasee-Security ', 'policy': 'deny', 'protocol': 'any', 'srcPort': 'Any', 'srcCidr': 'Any', 'destPort': 'Any', 'destCidr': '10.14.2.0/24', 'syslogEnabled': True}, {'comment': 'Allow DC-Server to FM3-Security ', 'policy': 'allow', 'protocol': 'any', 'srcPort': 'Any', 'srcCidr': '10.1.1.0/24', 'destPort': 'Any', 'destCidr': '10.17.2.0/24', 'syslogEnabled': True}, {'comment': 'Block to FM3-Security ', 'policy': 'deny', 'protocol': 'any', 'srcPort': 'Any', 'srcCidr': 'Any', 'destPort': 'Any', 'destCidr': '10.17.2.0/24', 'syslogEnabled': True}, {'comment': 'Allow DC-Server to Hungerburg-Security ', 'policy': 'allow', 'protocol': 'any', 'srcPort': 'Any', 'srcCidr': '10.1.1.0/24', 'destPort': 'Any', 'destCidr': '10.15.2.0/24', 'syslogEnabled': True}, {'comment': 'Block to Hungerburg-Security ', 'policy': 'deny', 'protocol': 'any', 'srcPort': 'Any', 'srcCidr': 'Any', 'destPort': 'Any', 'destCidr': '10.15.2.0/24', 'syslogEnabled': True}, {'comment': 'Default rule', 'policy': 'allow', 'protocol': 'Any', 'srcPort': 'Any', 'srcCidr': 'Any', 'destPort': 'Any', 'destCidr': 'Any', 'syslogEnabled': True}], 'syslogEnabled': True}, headers=headers)

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

# Add Network: 0_AT VIE Teinfaltstrasse-restore
	print('Restoring network 0_AT VIE Teinfaltstrasse in new network 0_AT VIE Teinfaltstrasse-restore',file=f)
	f.flush()
	try:
	# https://dashboard.meraki.com/api_docs#create-a-network
		posturl = 'https://api.meraki.com/api/v0/organizations/{0}/networks'.format(str(ARG_ORGID))
		dashboard = session.post(posturl, json={'name': '0_AT VIE Teinfaltstrasse-restore', 'disableMyMerakiCom': False, 'disableRemoteStatusPage': True, 'type': 'appliance switch wireless'}, headers=headers)
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
		dashboard = session.post(posturl, json={'applianceIp': '10.63.1.254', 'dhcpBootOptionsEnabled': False, 'dhcpHandling': 'Run a DHCP server', 'dhcpLeaseTime': '1 day', 'dhcpOptions': [], 'dnsNameservers': '10.1.1.15\n10.1.1.16', 'fixedIpAssignments': {}, 'id': 10, 'name': 'Server', 'reservedIpRanges': [], 'subnet': '10.63.1.0/24'}, headers=headers)
		dashboard = session.post(posturl, json={'applianceIp': '10.63.2.254', 'dhcpBootOptionsEnabled': False, 'dhcpHandling': 'Run a DHCP server', 'dhcpLeaseTime': '1 day', 'dhcpOptions': [], 'dnsNameservers': '10.1.1.15\n10.1.1.16', 'fixedIpAssignments': {}, 'id': 20, 'name': 'Security', 'reservedIpRanges': [], 'subnet': '10.63.2.0/24'}, headers=headers)
		dashboard = session.post(posturl, json={'applianceIp': '10.63.4.254', 'dhcpBootOptionsEnabled': False, 'dhcpHandling': 'Run a DHCP server', 'dhcpLeaseTime': '1 day', 'dhcpOptions': [{'code': '150', 'type': 'ip', 'value': '10.1.1.250, 10.1.1.240'}], 'dnsNameservers': '10.1.1.15\n10.1.1.16', 'fixedIpAssignments': {}, 'id': 40, 'name': 'Voice', 'reservedIpRanges': [], 'subnet': '10.63.4.0/24'}, headers=headers)
		dashboard = session.post(posturl, json={'applianceIp': '10.63.5.254', 'dhcpBootFilename': 'smsboot\\x64\\wdsmgfw.efi', 'dhcpBootNextServer': 'sitdp.signa.local', 'dhcpBootOptionsEnabled': True, 'dhcpHandling': 'Run a DHCP server', 'dhcpLeaseTime': '1 day', 'dhcpOptions': [], 'dnsNameservers': '10.1.1.15\n10.1.1.16', 'fixedIpAssignments': {}, 'id': 50, 'name': 'Client', 'reservedIpRanges': [], 'subnet': '10.63.5.0/24'}, headers=headers)
		dashboard = session.post(posturl, json={'applianceIp': '10.63.6.254', 'dhcpBootOptionsEnabled': False, 'dhcpHandling': 'Run a DHCP server', 'dhcpLeaseTime': '1 day', 'dhcpOptions': [], 'dnsNameservers': '10.1.1.15\n10.1.1.16', 'fixedIpAssignments': {'40:b0:34:d0:47:fe': {'ip': '10.63.6.13', 'name': 'VIEPRIT03'}, '64:51:06:24:f7:ab': {'ip': '10.63.6.65', 'name': 'VIEPR05'}, '6c:c2:17:22:20:df': {'ip': '10.63.6.67', 'name': 'VIEPR07'}, 'a0:42:3f:39:76:d5': {'ip': '10.63.6.20', 'name': 'VIEPRIT04'}, 'a0:42:3f:39:76:e3': {'ip': '10.63.6.21', 'name': 'VIEPR14'}, 'f4:a9:97:ae:ad:03': {'ip': '10.63.6.68', 'name': 'VIEPR10'}, 'f8:0d:60:c0:d0:57': {'ip': '10.63.6.66', 'name': 'VIEPR13'}}, 'id': 60, 'name': 'Printer', 'reservedIpRanges': [], 'subnet': '10.63.6.0/24'}, headers=headers)
		dashboard = session.post(posturl, json={'applianceIp': '10.63.9.254', 'dhcpBootOptionsEnabled': False, 'dhcpHandling': 'Run a DHCP server', 'dhcpLeaseTime': '1 day', 'dhcpOptions': [], 'dnsNameservers': '10.1.1.15\n10.1.1.16', 'fixedIpAssignments': {}, 'id': 90, 'name': 'WLAN', 'reservedIpRanges': [], 'subnet': '10.63.9.0/24'}, headers=headers)
		dashboard = session.post(posturl, json={'applianceIp': '10.64.91.254', 'dhcpBootOptionsEnabled': False, 'dhcpHandling': 'Run a DHCP server', 'dhcpLeaseTime': '1 day', 'dhcpOptions': [], 'dnsNameservers': 'opendns', 'fixedIpAssignments': {}, 'id': 91, 'name': 'WLAN-Guest', 'reservedIpRanges': [], 'subnet': '10.64.91.0/24'}, headers=headers)
		dashboard = session.post(posturl, json={'applianceIp': '10.63.100.100', 'dhcpBootOptionsEnabled': False, 'dhcpHandling': 'Run a DHCP server', 'dhcpLeaseTime': '1 day', 'dhcpOptions': [], 'dnsNameservers': '10.1.1.15\n10.1.1.16', 'fixedIpAssignments': {'0c:8d:db:0a:b9:ba': {'ip': '10.63.100.115', 'name': 'VIEITNET15'}, '34:56:fe:3f:07:70': {'ip': '10.63.100.109', 'name': 'VIEITNET10/2'}, '34:56:fe:c7:63:de': {'ip': '10.63.100.212', 'name': 'Serverraum 1.OG'}, '68:3a:1e:6c:df:08': {'ip': '10.63.100.111', 'name': 'VIEITNET11'}, '68:3a:1e:6e:de:e8': {'ip': '10.63.100.110', 'name': 'VIEITNET10/1'}, '68:3a:1e:fe:1e:c4': {'ip': '10.63.100.114', 'name': 'VIEITNET14'}, '68:3a:1e:fe:2b:d4': {'ip': '10.63.100.116', 'name': 'VIEITNET16'}, 'ac:17:c8:10:98:e2': {'ip': '10.63.100.213', 'name': 'Buchhaltung 1.OG'}, 'e0:cb:bc:8b:db:36': {'ip': '10.63.100.4', 'name': 'Serverraum'}, 'e0:cb:bc:8b:db:62': {'ip': '10.63.100.201', 'name': 'Zimmer Dani'}, 'e0:cb:bc:8b:db:a7': {'ip': '10.63.100.238', 'name': 'Zimmer Infra'}, 'e0:cb:bc:97:db:56': {'ip': '10.63.100.6', 'name': 'Zimmer Franz'}, 'e0:cb:bc:be:10:bc': {'ip': '10.63.100.204', 'name': 'Dachgeschoss Serverraum'}}, 'id': 100, 'name': 'Management', 'reservedIpRanges': [], 'subnet': '10.63.100.0/24'}, headers=headers)

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
		dashboard = session.put(puturl, json={'hubs': [{'hubId': 'L_702561541869809306', 'useDefaultRoute': False}], 'mode': 'spoke', 'subnets': [{'localSubnet': '10.63.1.0/24', 'useVpn': True}, {'localSubnet': '10.63.2.0/24', 'useVpn': True}, {'localSubnet': '10.63.4.0/24', 'useVpn': True}, {'localSubnet': '10.63.5.0/24', 'useVpn': True}, {'localSubnet': '10.63.6.0/24', 'useVpn': True}, {'localSubnet': '10.63.9.0/24', 'useVpn': True}, {'localSubnet': '10.64.91.0/24', 'useVpn': False}, {'localSubnet': '10.63.100.0/24', 'useVpn': True}]}, headers=headers)

	# SSIDs
	# https://dashboard.meraki.com/api_docs#update-the-attributes-of-an-ssid
		print('Restoring SSIDs',file=f)
		f.flush()
		puturl = 'https://api.meraki.com/api/v0/networks/{0}/ssids/0'.format(str(networkid))
		dashboard = session.put(puturl, json={'authMode': '8021x-radius', 'availabilityTags': [], 'availableOnAllAps': True, 'bandSelection': 'Dual band operation', 'defaultVlanId': 90, 'enabled': True, 'encryptionMode': 'wpa-eap', 'ipAssignmentMode': 'Bridge mode', 'lanIsolationEnabled': False, 'minBitrate': 11, 'name': 'bluehole', 'number': 0, 'perClientBandwidthLimitDown': 0, 'perClientBandwidthLimitUp': 0, 'radiusAccountingEnabled': False, 'radiusAttributeForGroupPolicies': 'Filter-Id', 'radiusCoaEnabled': False, 'radiusFailoverPolicy': None, 'radiusLoadBalancingPolicy': None, 'radiusOverride': False, 'radiusServers': [{'host': '10.1.100.3', 'port': 1812, 'secret': 'password'}, {'host': '10.1.100.4', 'port': 1812}], 'splashPage': 'None', 'ssidAdminAccessible': False, 'useVlanTagging': True, 'visible': True, 'wpaEncryptionMode': 'WPA2 only'}, headers=headers)
	# MR L3 firewall
	# https://dashboard.meraki.com/api_docs#update-the-l3-firewall-rules-of-an-ssid-on-an-mr-network
		puturl = 'https://api.meraki.com/api/v0/networks/{0}/ssids/0/l3FirewallRules'.format(str(networkid))
		dashboard = session.put(puturl, json={'rules': [], 'allowLanAccess': True}, headers=headers)

		puturl = 'https://api.meraki.com/api/v0/networks/{0}/ssids/1'.format(str(networkid))
		dashboard = session.put(puturl, json={'authMode': 'psk', 'availabilityTags': [], 'availableOnAllAps': True, 'bandSelection': 'Dual band operation', 'enabled': False, 'encryptionMode': 'wpa', 'ipAssignmentMode': 'NAT mode', 'minBitrate': 11, 'name': 'bluehole_meraki', 'number': 1, 'perClientBandwidthLimitDown': 0, 'perClientBandwidthLimitUp': 0, 'psk': 'blue4signa092018!', 'splashPage': 'None', 'ssidAdminAccessible': False, 'visible': True, 'wpaEncryptionMode': 'WPA2 only'}, headers=headers)
	# MR L3 firewall
	# https://dashboard.meraki.com/api_docs#update-the-l3-firewall-rules-of-an-ssid-on-an-mr-network
		puturl = 'https://api.meraki.com/api/v0/networks/{0}/ssids/1/l3FirewallRules'.format(str(networkid))
		dashboard = session.put(puturl, json={'rules': [], 'allowLanAccess': True}, headers=headers)

		puturl = 'https://api.meraki.com/api/v0/networks/{0}/ssids/2'.format(str(networkid))
		dashboard = session.put(puturl, json={'authMode': 'psk', 'availabilityTags': [], 'availableOnAllAps': True, 'bandSelection': 'Dual band operation', 'defaultVlanId': 40, 'enabled': True, 'encryptionMode': 'wpa', 'ipAssignmentMode': 'Bridge mode', 'lanIsolationEnabled': False, 'minBitrate': 11, 'name': 'bluevoip', 'number': 2, 'perClientBandwidthLimitDown': 0, 'perClientBandwidthLimitUp': 0, 'psk': 'voip4signa@2012', 'splashPage': 'None', 'ssidAdminAccessible': False, 'useVlanTagging': True, 'visible': True, 'wpaEncryptionMode': 'WPA2 only'}, headers=headers)
	# MR L3 firewall
	# https://dashboard.meraki.com/api_docs#update-the-l3-firewall-rules-of-an-ssid-on-an-mr-network
		puturl = 'https://api.meraki.com/api/v0/networks/{0}/ssids/2/l3FirewallRules'.format(str(networkid))
		dashboard = session.put(puturl, json={'rules': [], 'allowLanAccess': True}, headers=headers)

		puturl = 'https://api.meraki.com/api/v0/networks/{0}/ssids/3'.format(str(networkid))
		dashboard = session.put(puturl, json={'authMode': 'psk', 'availabilityTags': [], 'availableOnAllAps': True, 'bandSelection': 'Dual band operation', 'defaultVlanId': 91, 'enabled': True, 'encryptionMode': 'wpa', 'ipAssignmentMode': 'Bridge mode', 'lanIsolationEnabled': False, 'minBitrate': 11, 'name': 'blueguest', 'number': 3, 'perClientBandwidthLimitDown': 25600, 'perClientBandwidthLimitUp': 25600, 'psk': 'Signa.4419.', 'splashPage': 'None', 'ssidAdminAccessible': False, 'useVlanTagging': True, 'visible': True, 'wpaEncryptionMode': 'WPA2 only'}, headers=headers)
	# MR L3 firewall
	# https://dashboard.meraki.com/api_docs#update-the-l3-firewall-rules-of-an-ssid-on-an-mr-network
		puturl = 'https://api.meraki.com/api/v0/networks/{0}/ssids/3/l3FirewallRules'.format(str(networkid))
		dashboard = session.put(puturl, json={'rules': [{'comment': 'Sprint02', 'destCidr': '10.1.1.194/32', 'destPort': 'Any', 'policy': 'allow', 'protocol': 'any'}, {'comment': 'VIEPRIT04', 'destCidr': '10.63.6.20/32', 'destPort': 'Any', 'policy': 'allow', 'protocol': 'any'}, {'comment': 'vieprit03', 'destCidr': '10.63.6.13/32', 'destPort': 'Any', 'policy': 'allow', 'protocol': 'any'}], 'allowLanAccess': True}, headers=headers)

		puturl = 'https://api.meraki.com/api/v0/networks/{0}/ssids/4'.format(str(networkid))
		dashboard = session.put(puturl, json={'authMode': 'psk', 'availabilityTags': [], 'availableOnAllAps': True, 'bandSelection': 'Dual band operation', 'enabled': True, 'encryptionMode': 'wpa', 'ipAssignmentMode': 'NAT mode', 'minBitrate': 11, 'name': 'Gaeste-Wlan', 'number': 4, 'perClientBandwidthLimitDown': 0, 'perClientBandwidthLimitUp': 0, 'psk': 'internet4you', 'splashPage': 'None', 'ssidAdminAccessible': False, 'visible': False, 'wpaEncryptionMode': 'WPA2 only'}, headers=headers)
	# MR L3 firewall
	# https://dashboard.meraki.com/api_docs#update-the-l3-firewall-rules-of-an-ssid-on-an-mr-network
		puturl = 'https://api.meraki.com/api/v0/networks/{0}/ssids/4/l3FirewallRules'.format(str(networkid))
		dashboard = session.put(puturl, json={'rules': [], 'allowLanAccess': True}, headers=headers)

		puturl = 'https://api.meraki.com/api/v0/networks/{0}/ssids/5'.format(str(networkid))
		dashboard = session.put(puturl, json={'authMode': 'psk', 'availabilityTags': ['testnts'], 'availableOnAllAps': False, 'bandSelection': 'Dual band operation', 'enabled': True, 'encryptionMode': 'wpa', 'ipAssignmentMode': 'NAT mode', 'minBitrate': 11, 'name': 'signa-sportsunitied', 'number': 5, 'perClientBandwidthLimitDown': 0, 'perClientBandwidthLimitUp': 0, 'psk': '3yKbUj3NY4SEFcTZbygd', 'splashPage': 'None', 'ssidAdminAccessible': False, 'visible': True, 'wpaEncryptionMode': 'WPA2 only'}, headers=headers)
	# MR L3 firewall
	# https://dashboard.meraki.com/api_docs#update-the-l3-firewall-rules-of-an-ssid-on-an-mr-network
		puturl = 'https://api.meraki.com/api/v0/networks/{0}/ssids/5/l3FirewallRules'.format(str(networkid))
		dashboard = session.put(puturl, json={'rules': [], 'allowLanAccess': True}, headers=headers)

		puturl = 'https://api.meraki.com/api/v0/networks/{0}/ssids/6'.format(str(networkid))
		dashboard = session.put(puturl, json={'authMode': 'psk', 'availabilityTags': [], 'availableOnAllAps': True, 'bandSelection': 'Dual band operation', 'enabled': True, 'encryptionMode': 'wpa', 'ipAssignmentMode': 'NAT mode', 'minBitrate': 11, 'name': 'signa_multimedia', 'number': 6, 'perClientBandwidthLimitDown': 0, 'perClientBandwidthLimitUp': 0, 'psk': 'q{55\\vPU$-ye[3wjJY&8t<Y"mA!HK?', 'splashPage': 'None', 'ssidAdminAccessible': False, 'visible': False, 'wpaEncryptionMode': 'WPA2 only'}, headers=headers)
	# MR L3 firewall
	# https://dashboard.meraki.com/api_docs#update-the-l3-firewall-rules-of-an-ssid-on-an-mr-network
		puturl = 'https://api.meraki.com/api/v0/networks/{0}/ssids/6/l3FirewallRules'.format(str(networkid))
		dashboard = session.put(puturl, json={'rules': [], 'allowLanAccess': True}, headers=headers)

		puturl = 'https://api.meraki.com/api/v0/networks/{0}/ssids/7'.format(str(networkid))
		dashboard = session.put(puturl, json={'authMode': 'psk', 'availabilityTags': [], 'availableOnAllAps': True, 'bandSelection': 'Dual band operation', 'enabled': True, 'encryptionMode': 'wpa', 'ipAssignmentMode': 'NAT mode', 'minBitrate': 11, 'name': 'Franz_SSID', 'number': 7, 'perClientBandwidthLimitDown': 0, 'perClientBandwidthLimitUp': 0, 'psk': 'Franz4Ipads2019!', 'splashPage': 'None', 'ssidAdminAccessible': False, 'visible': True, 'wpaEncryptionMode': 'WPA2 only'}, headers=headers)
	# MR L3 firewall
	# https://dashboard.meraki.com/api_docs#update-the-l3-firewall-rules-of-an-ssid-on-an-mr-network
		puturl = 'https://api.meraki.com/api/v0/networks/{0}/ssids/7/l3FirewallRules'.format(str(networkid))
		dashboard = session.put(puturl, json={'rules': [], 'allowLanAccess': True}, headers=headers)

		puturl = 'https://api.meraki.com/api/v0/networks/{0}/ssids/8'.format(str(networkid))
		dashboard = session.put(puturl, json={'authMode': 'psk', 'availabilityTags': [], 'availableOnAllAps': True, 'bandSelection': 'Dual band operation', 'defaultVlanId': 90, 'enabled': True, 'encryptionMode': 'wpa', 'ipAssignmentMode': 'Bridge mode', 'lanIsolationEnabled': False, 'minBitrate': 11, 'name': 'AutoPilot', 'number': 8, 'perClientBandwidthLimitDown': 0, 'perClientBandwidthLimitUp': 0, 'psk': 'Welc0me20!', 'splashPage': 'None', 'ssidAdminAccessible': False, 'useVlanTagging': True, 'visible': True, 'wpaEncryptionMode': 'WPA2 only'}, headers=headers)
	# MR L3 firewall
	# https://dashboard.meraki.com/api_docs#update-the-l3-firewall-rules-of-an-ssid-on-an-mr-network
		puturl = 'https://api.meraki.com/api/v0/networks/{0}/ssids/8/l3FirewallRules'.format(str(networkid))
		dashboard = session.put(puturl, json={'rules': [], 'allowLanAccess': True}, headers=headers)

		puturl = 'https://api.meraki.com/api/v0/networks/{0}/ssids/9'.format(str(networkid))
		dashboard = session.put(puturl, json={'authMode': 'ipsk-with-radius', 'availabilityTags': [], 'availableOnAllAps': True, 'bandSelection': 'Dual band operation', 'defaultVlanId': 91, 'enabled': True, 'encryptionMode': 'wpa', 'ipAssignmentMode': 'Bridge mode', 'lanIsolationEnabled': False, 'minBitrate': 11, 'name': 'blueguest_test', 'number': 9, 'perClientBandwidthLimitDown': 0, 'perClientBandwidthLimitUp': 0, 'radiusAccountingEnabled': False, 'radiusAttributeForGroupPolicies': 'Filter-Id', 'radiusCoaEnabled': False, 'radiusFailoverPolicy': None, 'radiusLoadBalancingPolicy': None, 'radiusOverride': True, 'radiusServers': [{'host': '10.1.100.3', 'port': 1812, 'secret': 'password'}, {'host': '10.1.100.4', 'port': 1812}], 'splashPage': 'None', 'ssidAdminAccessible': False, 'useVlanTagging': True, 'visible': True, 'wpaEncryptionMode': 'WPA2 only'}, headers=headers)
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
	except requests.exceptions.HTTPError as err:
		print(err,file=f)
		print('Can not add network 0_AT VIE Teinfaltstrasse - it probably already exists. Change the Network name and make a new backup.',file=f)
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
		puturl = 'https://api.meraki.com/api/v0/devices/Q2CX-HYQR-T77M/switchPorts/1'
		print('Restoring configuration Port1 switch Q2CX-HYQR-T77M',file=f)
		payload = '{"number": 1, "name": "Client", "tags": null, "enabled": true, "poeEnabled": true, "type": "access", "vlan": 999, "voiceVlan": 40, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": 1}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2CX-HYQR-T77M/switchPorts/2'
		print('Restoring configuration Port2 switch Q2CX-HYQR-T77M',file=f)
		payload = '{"number": 2, "name": "Client", "tags": null, "enabled": true, "poeEnabled": true, "type": "access", "vlan": 999, "voiceVlan": 40, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": 1}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2CX-HYQR-T77M/switchPorts/3'
		print('Restoring configuration Port3 switch Q2CX-HYQR-T77M',file=f)
		payload = '{"number": 3, "name": "Client", "tags": null, "enabled": true, "poeEnabled": true, "type": "access", "vlan": 999, "voiceVlan": 40, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": 1}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2CX-HYQR-T77M/switchPorts/4'
		print('Restoring configuration Port4 switch Q2CX-HYQR-T77M',file=f)
		payload = '{"number": 4, "name": "Client", "tags": null, "enabled": true, "poeEnabled": true, "type": "access", "vlan": 999, "voiceVlan": 40, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": 1}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2CX-HYQR-T77M/switchPorts/5'
		print('Restoring configuration Port5 switch Q2CX-HYQR-T77M',file=f)
		payload = '{"number": 5, "name": "Client", "tags": null, "enabled": true, "poeEnabled": true, "type": "access", "vlan": 999, "voiceVlan": 40, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": 1}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2CX-HYQR-T77M/switchPorts/6'
		print('Restoring configuration Port6 switch Q2CX-HYQR-T77M',file=f)
		payload = '{"number": 6, "name": "Client", "tags": null, "enabled": true, "poeEnabled": true, "type": "access", "vlan": 999, "voiceVlan": 40, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": 1}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2CX-HYQR-T77M/switchPorts/7'
		print('Restoring configuration Port7 switch Q2CX-HYQR-T77M',file=f)
		payload = '{"number": 7, "name": "Meraki-AP", "tags": null, "enabled": true, "poeEnabled": true, "type": "trunk", "vlan": 100, "voiceVlan": 40, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": 1}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2CX-HYQR-T77M/switchPorts/8'
		print('Restoring configuration Port8 switch Q2CX-HYQR-T77M',file=f)
		payload = '{"number": 8, "name": "Uplink", "tags": null, "enabled": true, "poeEnabled": true, "type": "trunk", "vlan": 100, "voiceVlan": null, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": null}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2CX-HYQR-T77M/switchPorts/9'
		print('Restoring configuration Port9 switch Q2CX-HYQR-T77M',file=f)
		payload = '{"number": 9, "name": "Uplink", "tags": null, "enabled": true, "poeEnabled": false, "type": "trunk", "vlan": 100, "voiceVlan": null, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": null}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2CX-HYQR-T77M/switchPorts/10'
		print('Restoring configuration Port10 switch Q2CX-HYQR-T77M',file=f)
		payload = '{"number": 10, "name": "Uplink", "tags": null, "enabled": true, "poeEnabled": false, "type": "trunk", "vlan": 100, "voiceVlan": null, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": null}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2CX-HCP4-R764/switchPorts/1'
		print('Restoring configuration Port1 switch Q2CX-HCP4-R764',file=f)
		payload = '{"number": 1, "name": "DOT1x", "tags": null, "enabled": true, "poeEnabled": true, "type": "access", "vlan": 999, "voiceVlan": 40, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": 1}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2CX-HCP4-R764/switchPorts/2'
		print('Restoring configuration Port2 switch Q2CX-HCP4-R764',file=f)
		payload = '{"number": 2, "name": "DOT1x", "tags": null, "enabled": true, "poeEnabled": true, "type": "access", "vlan": 40, "voiceVlan": 40, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": null}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2CX-HCP4-R764/switchPorts/3'
		print('Restoring configuration Port3 switch Q2CX-HCP4-R764',file=f)
		payload = '{"number": 3, "name": "DOT1x", "tags": null, "enabled": true, "poeEnabled": true, "type": "access", "vlan": 999, "voiceVlan": 40, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": 1}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2CX-HCP4-R764/switchPorts/4'
		print('Restoring configuration Port4 switch Q2CX-HCP4-R764',file=f)
		payload = '{"number": 4, "name": "DOT1x", "tags": null, "enabled": true, "poeEnabled": true, "type": "access", "vlan": 50, "voiceVlan": null, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": null}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2CX-HCP4-R764/switchPorts/5'
		print('Restoring configuration Port5 switch Q2CX-HCP4-R764',file=f)
		payload = '{"number": 5, "name": "DOT1x", "tags": null, "enabled": true, "poeEnabled": true, "type": "access", "vlan": 999, "voiceVlan": 40, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": 1}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2CX-HCP4-R764/switchPorts/6'
		print('Restoring configuration Port6 switch Q2CX-HCP4-R764',file=f)
		payload = '{"number": 6, "name": "DOT1x", "tags": null, "enabled": true, "poeEnabled": true, "type": "access", "vlan": 999, "voiceVlan": 40, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": 1}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2CX-HCP4-R764/switchPorts/7'
		print('Restoring configuration Port7 switch Q2CX-HCP4-R764',file=f)
		payload = '{"number": 7, "name": "Silex Datev", "tags": null, "enabled": true, "poeEnabled": true, "type": "trunk", "vlan": 10, "voiceVlan": 40, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "bpdu guard", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": null}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2CX-HCP4-R764/switchPorts/8'
		print('Restoring configuration Port8 switch Q2CX-HCP4-R764',file=f)
		payload = '{"number": 8, "name": "Uplink_MX67", "tags": null, "enabled": true, "poeEnabled": true, "type": "trunk", "vlan": 100, "voiceVlan": 40, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": null}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2CX-HCP4-R764/switchPorts/9'
		print('Restoring configuration Port9 switch Q2CX-HCP4-R764',file=f)
		payload = '{"number": 9, "name": "DOT1x", "tags": null, "enabled": false, "poeEnabled": false, "type": "access", "vlan": 999, "voiceVlan": 40, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "bpdu guard", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": 1}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2CX-HCP4-R764/switchPorts/10'
		print('Restoring configuration Port10 switch Q2CX-HCP4-R764',file=f)
		payload = '{"number": 10, "name": "UPLINK MX67", "tags": null, "enabled": false, "poeEnabled": false, "type": "trunk", "vlan": 100, "voiceVlan": null, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": null}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2VX-BJYP-WQJS/switchPorts/1'
		print('Restoring configuration Port1 switch Q2VX-BJYP-WQJS',file=f)
		payload = '{"number": 1, "name": "Client", "tags": null, "enabled": true, "poeEnabled": true, "type": "access", "vlan": 999, "voiceVlan": 40, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": 1}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2VX-BJYP-WQJS/switchPorts/2'
		print('Restoring configuration Port2 switch Q2VX-BJYP-WQJS',file=f)
		payload = '{"number": 2, "name": "Client", "tags": null, "enabled": true, "poeEnabled": true, "type": "access", "vlan": 999, "voiceVlan": 40, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": 1}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2VX-BJYP-WQJS/switchPorts/3'
		print('Restoring configuration Port3 switch Q2VX-BJYP-WQJS',file=f)
		payload = '{"number": 3, "name": "Client", "tags": null, "enabled": true, "poeEnabled": true, "type": "access", "vlan": 999, "voiceVlan": 40, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": 1}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2VX-BJYP-WQJS/switchPorts/4'
		print('Restoring configuration Port4 switch Q2VX-BJYP-WQJS',file=f)
		payload = '{"number": 4, "name": "Client", "tags": null, "enabled": true, "poeEnabled": true, "type": "access", "vlan": 999, "voiceVlan": 40, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": 1}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2VX-BJYP-WQJS/switchPorts/5'
		print('Restoring configuration Port5 switch Q2VX-BJYP-WQJS',file=f)
		payload = '{"number": 5, "name": "Client", "tags": null, "enabled": true, "poeEnabled": true, "type": "access", "vlan": 999, "voiceVlan": 40, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": 1}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2VX-BJYP-WQJS/switchPorts/6'
		print('Restoring configuration Port6 switch Q2VX-BJYP-WQJS',file=f)
		payload = '{"number": 6, "name": "Client", "tags": null, "enabled": true, "poeEnabled": true, "type": "access", "vlan": 999, "voiceVlan": 40, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": 1}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2VX-BJYP-WQJS/switchPorts/7'
		print('Restoring configuration Port7 switch Q2VX-BJYP-WQJS',file=f)
		payload = '{"number": 7, "name": "Client", "tags": null, "enabled": true, "poeEnabled": true, "type": "access", "vlan": 999, "voiceVlan": 40, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": 1}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2VX-BJYP-WQJS/switchPorts/8'
		print('Restoring configuration Port8 switch Q2VX-BJYP-WQJS',file=f)
		payload = '{"number": 8, "name": "Client", "tags": null, "enabled": true, "poeEnabled": true, "type": "access", "vlan": 999, "voiceVlan": 40, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": 1}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2VX-BJYP-WQJS/switchPorts/9'
		print('Restoring configuration Port9 switch Q2VX-BJYP-WQJS',file=f)
		payload = '{"number": 9, "name": "Meraki-AP", "tags": null, "enabled": true, "poeEnabled": true, "type": "trunk", "vlan": 100, "voiceVlan": 40, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": 1}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2VX-BJYP-WQJS/switchPorts/10'
		print('Restoring configuration Port10 switch Q2VX-BJYP-WQJS',file=f)
		payload = '{"number": 10, "name": "Client", "tags": null, "enabled": true, "poeEnabled": true, "type": "access", "vlan": 999, "voiceVlan": 40, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": 1}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2VX-BJYP-WQJS/switchPorts/11'
		print('Restoring configuration Port11 switch Q2VX-BJYP-WQJS',file=f)
		payload = '{"number": 11, "name": "Client", "tags": null, "enabled": true, "poeEnabled": true, "type": "access", "vlan": 999, "voiceVlan": 40, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": 1}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2VX-BJYP-WQJS/switchPorts/12'
		print('Restoring configuration Port12 switch Q2VX-BJYP-WQJS',file=f)
		payload = '{"number": 12, "name": "Client", "tags": null, "enabled": true, "poeEnabled": true, "type": "access", "vlan": 999, "voiceVlan": 40, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": 1}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2VX-BJYP-WQJS/switchPorts/13'
		print('Restoring configuration Port13 switch Q2VX-BJYP-WQJS',file=f)
		payload = '{"number": 13, "name": "Client", "tags": null, "enabled": true, "poeEnabled": true, "type": "access", "vlan": 999, "voiceVlan": 40, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": 1}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2VX-BJYP-WQJS/switchPorts/14'
		print('Restoring configuration Port14 switch Q2VX-BJYP-WQJS',file=f)
		payload = '{"number": 14, "name": "Client", "tags": null, "enabled": true, "poeEnabled": true, "type": "access", "vlan": 999, "voiceVlan": 40, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": 1}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2VX-BJYP-WQJS/switchPorts/15'
		print('Restoring configuration Port15 switch Q2VX-BJYP-WQJS',file=f)
		payload = '{"number": 15, "name": "Client", "tags": null, "enabled": true, "poeEnabled": true, "type": "access", "vlan": 999, "voiceVlan": 40, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": 1}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2VX-BJYP-WQJS/switchPorts/16'
		print('Restoring configuration Port16 switch Q2VX-BJYP-WQJS',file=f)
		payload = '{"number": 16, "name": "Client", "tags": null, "enabled": true, "poeEnabled": true, "type": "access", "vlan": 999, "voiceVlan": 40, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": 1}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2VX-BJYP-WQJS/switchPorts/17'
		print('Restoring configuration Port17 switch Q2VX-BJYP-WQJS',file=f)
		payload = '{"number": 17, "name": "Client", "tags": null, "enabled": true, "poeEnabled": true, "type": "access", "vlan": 999, "voiceVlan": 40, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": 1}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2VX-BJYP-WQJS/switchPorts/18'
		print('Restoring configuration Port18 switch Q2VX-BJYP-WQJS',file=f)
		payload = '{"number": 18, "name": "Client", "tags": null, "enabled": true, "poeEnabled": true, "type": "access", "vlan": 999, "voiceVlan": 40, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": 1}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2VX-BJYP-WQJS/switchPorts/19'
		print('Restoring configuration Port19 switch Q2VX-BJYP-WQJS',file=f)
		payload = '{"number": 19, "name": "Client", "tags": null, "enabled": true, "poeEnabled": true, "type": "access", "vlan": 999, "voiceVlan": 40, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": 1}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2VX-BJYP-WQJS/switchPorts/20'
		print('Restoring configuration Port20 switch Q2VX-BJYP-WQJS',file=f)
		payload = '{"number": 20, "name": "Client", "tags": null, "enabled": true, "poeEnabled": true, "type": "access", "vlan": 999, "voiceVlan": 40, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": 1}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2VX-BJYP-WQJS/switchPorts/21'
		print('Restoring configuration Port21 switch Q2VX-BJYP-WQJS',file=f)
		payload = '{"number": 21, "name": "Client", "tags": null, "enabled": true, "poeEnabled": true, "type": "access", "vlan": 999, "voiceVlan": 40, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": 1}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2VX-BJYP-WQJS/switchPorts/22'
		print('Restoring configuration Port22 switch Q2VX-BJYP-WQJS',file=f)
		payload = '{"number": 22, "name": "Client", "tags": null, "enabled": true, "poeEnabled": true, "type": "access", "vlan": 999, "voiceVlan": 40, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": 1}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2VX-BJYP-WQJS/switchPorts/23'
		print('Restoring configuration Port23 switch Q2VX-BJYP-WQJS',file=f)
		payload = '{"number": 23, "name": "Client", "tags": null, "enabled": true, "poeEnabled": true, "type": "access", "vlan": 999, "voiceVlan": 40, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": 1}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2VX-BJYP-WQJS/switchPorts/24'
		print('Restoring configuration Port24 switch Q2VX-BJYP-WQJS',file=f)
		payload = '{"number": 24, "name": "Client", "tags": null, "enabled": true, "poeEnabled": true, "type": "access", "vlan": 999, "voiceVlan": 40, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": 1}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2VX-BJYP-WQJS/switchPorts/25'
		print('Restoring configuration Port25 switch Q2VX-BJYP-WQJS',file=f)
		payload = '{"number": 25, "name": "Client", "tags": null, "enabled": true, "poeEnabled": true, "type": "access", "vlan": 999, "voiceVlan": 40, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": 1}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2VX-BJYP-WQJS/switchPorts/26'
		print('Restoring configuration Port26 switch Q2VX-BJYP-WQJS',file=f)
		payload = '{"number": 26, "name": "Client", "tags": null, "enabled": true, "poeEnabled": true, "type": "access", "vlan": 999, "voiceVlan": 40, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": 1}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2VX-BJYP-WQJS/switchPorts/27'
		print('Restoring configuration Port27 switch Q2VX-BJYP-WQJS',file=f)
		payload = '{"number": 27, "name": "Client", "tags": null, "enabled": true, "poeEnabled": true, "type": "access", "vlan": 999, "voiceVlan": 40, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": 1}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2VX-BJYP-WQJS/switchPorts/28'
		print('Restoring configuration Port28 switch Q2VX-BJYP-WQJS',file=f)
		payload = '{"number": 28, "name": "Client", "tags": null, "enabled": true, "poeEnabled": true, "type": "access", "vlan": 999, "voiceVlan": 40, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": 1}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2VX-BJYP-WQJS/switchPorts/29'
		print('Restoring configuration Port29 switch Q2VX-BJYP-WQJS',file=f)
		payload = '{"number": 29, "name": "Client", "tags": null, "enabled": true, "poeEnabled": true, "type": "access", "vlan": 999, "voiceVlan": 40, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": 1}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2VX-BJYP-WQJS/switchPorts/30'
		print('Restoring configuration Port30 switch Q2VX-BJYP-WQJS',file=f)
		payload = '{"number": 30, "name": "Client", "tags": null, "enabled": true, "poeEnabled": true, "type": "access", "vlan": 999, "voiceVlan": 40, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": 1}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2VX-BJYP-WQJS/switchPorts/31'
		print('Restoring configuration Port31 switch Q2VX-BJYP-WQJS',file=f)
		payload = '{"number": 31, "name": "Client", "tags": null, "enabled": true, "poeEnabled": true, "type": "access", "vlan": 999, "voiceVlan": 40, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": 1}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2VX-BJYP-WQJS/switchPorts/32'
		print('Restoring configuration Port32 switch Q2VX-BJYP-WQJS',file=f)
		payload = '{"number": 32, "name": "Client", "tags": null, "enabled": true, "poeEnabled": true, "type": "access", "vlan": 999, "voiceVlan": 40, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": 1}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2VX-BJYP-WQJS/switchPorts/33'
		print('Restoring configuration Port33 switch Q2VX-BJYP-WQJS',file=f)
		payload = '{"number": 33, "name": "Client", "tags": null, "enabled": true, "poeEnabled": true, "type": "access", "vlan": 999, "voiceVlan": 40, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": 1}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2VX-BJYP-WQJS/switchPorts/34'
		print('Restoring configuration Port34 switch Q2VX-BJYP-WQJS',file=f)
		payload = '{"number": 34, "name": "Client", "tags": null, "enabled": true, "poeEnabled": true, "type": "access", "vlan": 999, "voiceVlan": 40, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": 1}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2VX-BJYP-WQJS/switchPorts/35'
		print('Restoring configuration Port35 switch Q2VX-BJYP-WQJS',file=f)
		payload = '{"number": 35, "name": "Client", "tags": null, "enabled": true, "poeEnabled": true, "type": "access", "vlan": 999, "voiceVlan": 40, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": 1}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2VX-BJYP-WQJS/switchPorts/36'
		print('Restoring configuration Port36 switch Q2VX-BJYP-WQJS',file=f)
		payload = '{"number": 36, "name": "Client", "tags": null, "enabled": true, "poeEnabled": true, "type": "access", "vlan": 999, "voiceVlan": 40, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": 1}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2VX-BJYP-WQJS/switchPorts/37'
		print('Restoring configuration Port37 switch Q2VX-BJYP-WQJS',file=f)
		payload = '{"number": 37, "name": "Client", "tags": null, "enabled": true, "poeEnabled": true, "type": "access", "vlan": 999, "voiceVlan": 40, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": 1}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2VX-BJYP-WQJS/switchPorts/38'
		print('Restoring configuration Port38 switch Q2VX-BJYP-WQJS',file=f)
		payload = '{"number": 38, "name": "Client", "tags": null, "enabled": true, "poeEnabled": true, "type": "access", "vlan": 999, "voiceVlan": 40, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": 1}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2VX-BJYP-WQJS/switchPorts/39'
		print('Restoring configuration Port39 switch Q2VX-BJYP-WQJS',file=f)
		payload = '{"number": 39, "name": "Client", "tags": null, "enabled": true, "poeEnabled": true, "type": "access", "vlan": 999, "voiceVlan": 40, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": 1}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2VX-BJYP-WQJS/switchPorts/40'
		print('Restoring configuration Port40 switch Q2VX-BJYP-WQJS',file=f)
		payload = '{"number": 40, "name": "Client", "tags": null, "enabled": true, "poeEnabled": true, "type": "access", "vlan": 999, "voiceVlan": 40, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": 1}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2VX-BJYP-WQJS/switchPorts/41'
		print('Restoring configuration Port41 switch Q2VX-BJYP-WQJS',file=f)
		payload = '{"number": 41, "name": "Client", "tags": null, "enabled": true, "poeEnabled": true, "type": "access", "vlan": 999, "voiceVlan": 40, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": 1}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2VX-BJYP-WQJS/switchPorts/42'
		print('Restoring configuration Port42 switch Q2VX-BJYP-WQJS',file=f)
		payload = '{"number": 42, "name": "Uplink VIEITNET16", "tags": null, "enabled": true, "poeEnabled": true, "type": "trunk", "vlan": 100, "voiceVlan": 40, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": 1}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2VX-BJYP-WQJS/switchPorts/43'
		print('Restoring configuration Port43 switch Q2VX-BJYP-WQJS',file=f)
		payload = '{"number": 43, "name": "Uplink VIEITNET11", "tags": null, "enabled": true, "poeEnabled": true, "type": "trunk", "vlan": 100, "voiceVlan": 40, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": 1}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2VX-BJYP-WQJS/switchPorts/44'
		print('Restoring configuration Port44 switch Q2VX-BJYP-WQJS',file=f)
		payload = '{"number": 44, "name": "Uplink VIEITNET02", "tags": null, "enabled": true, "poeEnabled": true, "type": "trunk", "vlan": 100, "voiceVlan": 40, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": 1}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2VX-BJYP-WQJS/switchPorts/45'
		print('Restoring configuration Port45 switch Q2VX-BJYP-WQJS',file=f)
		payload = '{"number": 45, "name": "Uplink MX84", "tags": null, "enabled": true, "poeEnabled": true, "type": "trunk", "vlan": 100, "voiceVlan": 40, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": 1}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2VX-BJYP-WQJS/switchPorts/46'
		print('Restoring configuration Port46 switch Q2VX-BJYP-WQJS',file=f)
		payload = '{"number": 46, "name": "UPLINK MX INTERNET PORT 1", "tags": null, "enabled": true, "poeEnabled": true, "type": "access", "vlan": 200, "voiceVlan": null, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": null}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2VX-BJYP-WQJS/switchPorts/47'
		print('Restoring configuration Port47 switch Q2VX-BJYP-WQJS',file=f)
		payload = '{"number": 47, "name": "Uplink VIEITNET14", "tags": null, "enabled": true, "poeEnabled": true, "type": "trunk", "vlan": 100, "voiceVlan": null, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": null}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2VX-BJYP-WQJS/switchPorts/48'
		print('Restoring configuration Port48 switch Q2VX-BJYP-WQJS',file=f)
		payload = '{"number": 48, "name": "Uplink VIEITNET03", "tags": null, "enabled": true, "poeEnabled": true, "type": "trunk", "vlan": 100, "voiceVlan": null, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": null}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2VX-BJYP-WQJS/switchPorts/49'
		print('Restoring configuration Port49 switch Q2VX-BJYP-WQJS',file=f)
		payload = '{"number": 49, "name": "UPLINK ISP NEXTLAYER", "tags": null, "enabled": true, "poeEnabled": false, "type": "access", "vlan": 200, "voiceVlan": null, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "root guard", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": null}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2VX-BJYP-WQJS/switchPorts/50'
		print('Restoring configuration Port50 switch Q2VX-BJYP-WQJS',file=f)
		payload = '{"number": 50, "name": "Uplink", "tags": null, "enabled": true, "poeEnabled": false, "type": "access", "vlan": 200, "voiceVlan": null, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "root guard", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": null}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2VX-BJYP-WQJS/switchPorts/51'
		print('Restoring configuration Port51 switch Q2VX-BJYP-WQJS',file=f)
		payload = '{"number": 51, "name": "Uplink", "tags": null, "enabled": true, "poeEnabled": false, "type": "trunk", "vlan": 100, "voiceVlan": null, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": null}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2VX-BJYP-WQJS/switchPorts/52'
		print('Restoring configuration Port52 switch Q2VX-BJYP-WQJS',file=f)
		payload = '{"number": 52, "name": "Uplink", "tags": null, "enabled": true, "poeEnabled": false, "type": "trunk", "vlan": 100, "voiceVlan": null, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": null}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2VX-BJYP-WQJS/switchPorts/53'
		print('Restoring configuration Port53 switch Q2VX-BJYP-WQJS',file=f)
		payload = '{"number": 53, "name": null, "tags": null, "enabled": true, "poeEnabled": false, "type": "trunk", "vlan": 1, "voiceVlan": null, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": null}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2VX-BJYP-WQJS/switchPorts/54'
		print('Restoring configuration Port54 switch Q2VX-BJYP-WQJS',file=f)
		payload = '{"number": 54, "name": null, "tags": null, "enabled": true, "poeEnabled": false, "type": "trunk", "vlan": 1, "voiceVlan": null, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": null}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2DX-HG9Z-ZHHS/switchPorts/1'
		print('Restoring configuration Port1 switch Q2DX-HG9Z-ZHHS',file=f)
		payload = '{"number": 1, "name": "UPLINK", "tags": null, "enabled": true, "poeEnabled": false, "type": "trunk", "vlan": 100, "voiceVlan": null, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": null}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2DX-HG9Z-ZHHS/switchPorts/2'
		print('Restoring configuration Port2 switch Q2DX-HG9Z-ZHHS',file=f)
		payload = '{"number": 2, "name": "Access OPEN for Clients installation", "tags": null, "enabled": true, "poeEnabled": false, "type": "access", "vlan": 50, "voiceVlan": 40, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": null}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2DX-HG9Z-ZHHS/switchPorts/3'
		print('Restoring configuration Port3 switch Q2DX-HG9Z-ZHHS',file=f)
		payload = '{"number": 3, "name": "Access OPEN for Clients installation", "tags": null, "enabled": true, "poeEnabled": false, "type": "access", "vlan": 50, "voiceVlan": 40, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": null}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2DX-HG9Z-ZHHS/switchPorts/4'
		print('Restoring configuration Port4 switch Q2DX-HG9Z-ZHHS',file=f)
		payload = '{"number": 4, "name": "Access OPEN for Clients installation", "tags": null, "enabled": true, "poeEnabled": false, "type": "access", "vlan": 50, "voiceVlan": 40, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": null}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2DX-HG9Z-ZHHS/switchPorts/5'
		print('Restoring configuration Port5 switch Q2DX-HG9Z-ZHHS',file=f)
		payload = '{"number": 5, "name": "Access OPEN for Clients installation", "tags": null, "enabled": true, "poeEnabled": false, "type": "access", "vlan": 50, "voiceVlan": 40, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": null}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2DX-HG9Z-ZHHS/switchPorts/6'
		print('Restoring configuration Port6 switch Q2DX-HG9Z-ZHHS',file=f)
		payload = '{"number": 6, "name": "Access OPEN for Clients installation", "tags": null, "enabled": true, "poeEnabled": false, "type": "access", "vlan": 50, "voiceVlan": 40, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": null}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2DX-HG9Z-ZHHS/switchPorts/7'
		print('Restoring configuration Port7 switch Q2DX-HG9Z-ZHHS',file=f)
		payload = '{"number": 7, "name": "Access OPEN for Clients installation", "tags": null, "enabled": true, "poeEnabled": false, "type": "access", "vlan": 50, "voiceVlan": 40, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": null}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2DX-HG9Z-ZHHS/switchPorts/8'
		print('Restoring configuration Port8 switch Q2DX-HG9Z-ZHHS',file=f)
		payload = '{"number": 8, "name": "Access OPEN for Clients installation", "tags": null, "enabled": true, "poeEnabled": false, "type": "access", "vlan": 50, "voiceVlan": 40, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": null}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2DX-HG9Z-ZHHS/switchPorts/9'
		print('Restoring configuration Port9 switch Q2DX-HG9Z-ZHHS',file=f)
		payload = '{"number": 9, "name": "Access OPEN for Clients installation", "tags": null, "enabled": true, "poeEnabled": false, "type": "access", "vlan": 50, "voiceVlan": 40, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": null}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2DX-HG9Z-ZHHS/switchPorts/10'
		print('Restoring configuration Port10 switch Q2DX-HG9Z-ZHHS',file=f)
		payload = '{"number": 10, "name": "Access OPEN for Clients installation", "tags": null, "enabled": true, "poeEnabled": false, "type": "access", "vlan": 50, "voiceVlan": 40, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": null}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2DX-HG9Z-ZHHS/switchPorts/11'
		print('Restoring configuration Port11 switch Q2DX-HG9Z-ZHHS',file=f)
		payload = '{"number": 11, "name": "Access OPEN for Clients installation", "tags": null, "enabled": true, "poeEnabled": false, "type": "access", "vlan": 50, "voiceVlan": 40, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": null}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2DX-HG9Z-ZHHS/switchPorts/12'
		print('Restoring configuration Port12 switch Q2DX-HG9Z-ZHHS',file=f)
		payload = '{"number": 12, "name": "Access OPEN for Clients installation", "tags": null, "enabled": true, "poeEnabled": false, "type": "access", "vlan": 50, "voiceVlan": 40, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": null}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2DX-HG9Z-ZHHS/switchPorts/13'
		print('Restoring configuration Port13 switch Q2DX-HG9Z-ZHHS',file=f)
		payload = '{"number": 13, "name": "Access OPEN for Clients installation", "tags": null, "enabled": true, "poeEnabled": false, "type": "access", "vlan": 50, "voiceVlan": 40, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": null}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2DX-HG9Z-ZHHS/switchPorts/14'
		print('Restoring configuration Port14 switch Q2DX-HG9Z-ZHHS',file=f)
		payload = '{"number": 14, "name": "Access OPEN for Clients installation", "tags": null, "enabled": true, "poeEnabled": false, "type": "access", "vlan": 50, "voiceVlan": 40, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": null}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2DX-HG9Z-ZHHS/switchPorts/15'
		print('Restoring configuration Port15 switch Q2DX-HG9Z-ZHHS',file=f)
		payload = '{"number": 15, "name": "Access OPEN for Clients installation", "tags": null, "enabled": true, "poeEnabled": false, "type": "access", "vlan": 50, "voiceVlan": 40, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": null}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2DX-HG9Z-ZHHS/switchPorts/16'
		print('Restoring configuration Port16 switch Q2DX-HG9Z-ZHHS',file=f)
		payload = '{"number": 16, "name": "Access OPEN for Clients installation", "tags": null, "enabled": true, "poeEnabled": false, "type": "access", "vlan": 50, "voiceVlan": 40, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": null}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2DX-HG9Z-ZHHS/switchPorts/17'
		print('Restoring configuration Port17 switch Q2DX-HG9Z-ZHHS',file=f)
		payload = '{"number": 17, "name": "Access OPEN for Clients installation", "tags": null, "enabled": true, "poeEnabled": false, "type": "access", "vlan": 50, "voiceVlan": 40, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": null}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2DX-HG9Z-ZHHS/switchPorts/18'
		print('Restoring configuration Port18 switch Q2DX-HG9Z-ZHHS',file=f)
		payload = '{"number": 18, "name": "Access OPEN for Clients installation", "tags": null, "enabled": true, "poeEnabled": false, "type": "access", "vlan": 50, "voiceVlan": 40, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": null}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2DX-HG9Z-ZHHS/switchPorts/19'
		print('Restoring configuration Port19 switch Q2DX-HG9Z-ZHHS',file=f)
		payload = '{"number": 19, "name": "Access OPEN for Clients installation", "tags": null, "enabled": true, "poeEnabled": false, "type": "access", "vlan": 50, "voiceVlan": 40, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": null}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2DX-HG9Z-ZHHS/switchPorts/20'
		print('Restoring configuration Port20 switch Q2DX-HG9Z-ZHHS',file=f)
		payload = '{"number": 20, "name": "Access OPEN for Clients installation", "tags": null, "enabled": true, "poeEnabled": false, "type": "access", "vlan": 50, "voiceVlan": 40, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": null}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2DX-HG9Z-ZHHS/switchPorts/21'
		print('Restoring configuration Port21 switch Q2DX-HG9Z-ZHHS',file=f)
		payload = '{"number": 21, "name": "Access OPEN for Clients installation", "tags": null, "enabled": true, "poeEnabled": false, "type": "access", "vlan": 50, "voiceVlan": 40, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": null}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2DX-HG9Z-ZHHS/switchPorts/22'
		print('Restoring configuration Port22 switch Q2DX-HG9Z-ZHHS',file=f)
		payload = '{"number": 22, "name": "Access OPEN for Clients installation", "tags": null, "enabled": true, "poeEnabled": false, "type": "access", "vlan": 50, "voiceVlan": 40, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": null}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2DX-HG9Z-ZHHS/switchPorts/23'
		print('Restoring configuration Port23 switch Q2DX-HG9Z-ZHHS',file=f)
		payload = '{"number": 23, "name": "Access OPEN for Clients installation", "tags": null, "enabled": true, "poeEnabled": false, "type": "access", "vlan": 50, "voiceVlan": 40, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": null}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2DX-HG9Z-ZHHS/switchPorts/24'
		print('Restoring configuration Port24 switch Q2DX-HG9Z-ZHHS',file=f)
		payload = '{"number": 24, "name": "Access OPEN for Clients installation", "tags": null, "enabled": true, "poeEnabled": false, "type": "access", "vlan": 50, "voiceVlan": 40, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": null}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2DX-HG9Z-ZHHS/switchPorts/25'
		print('Restoring configuration Port25 switch Q2DX-HG9Z-ZHHS',file=f)
		payload = '{"number": 25, "name": null, "tags": null, "enabled": true, "poeEnabled": false, "type": "trunk", "vlan": 1, "voiceVlan": null, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": null}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2DX-HG9Z-ZHHS/switchPorts/26'
		print('Restoring configuration Port26 switch Q2DX-HG9Z-ZHHS',file=f)
		payload = '{"number": 26, "name": null, "tags": null, "enabled": true, "poeEnabled": false, "type": "trunk", "vlan": 1, "voiceVlan": null, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": null}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2DX-HG9Z-ZHHS/switchPorts/27'
		print('Restoring configuration Port27 switch Q2DX-HG9Z-ZHHS',file=f)
		payload = '{"number": 27, "name": null, "tags": null, "enabled": true, "poeEnabled": false, "type": "trunk", "vlan": 1, "voiceVlan": null, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": null}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2DX-HG9Z-ZHHS/switchPorts/28'
		print('Restoring configuration Port28 switch Q2DX-HG9Z-ZHHS',file=f)
		payload = '{"number": 28, "name": null, "tags": null, "enabled": true, "poeEnabled": false, "type": "trunk", "vlan": 1, "voiceVlan": null, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": null}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2VX-XKL9-AKBZ/switchPorts/1'
		print('Restoring configuration Port1 switch Q2VX-XKL9-AKBZ',file=f)
		payload = '{"number": 1, "name": "Client", "tags": null, "enabled": true, "poeEnabled": true, "type": "access", "vlan": 999, "voiceVlan": 40, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": 1}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2VX-XKL9-AKBZ/switchPorts/2'
		print('Restoring configuration Port2 switch Q2VX-XKL9-AKBZ',file=f)
		payload = '{"number": 2, "name": "Client", "tags": null, "enabled": true, "poeEnabled": true, "type": "access", "vlan": 999, "voiceVlan": 40, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": 1}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2VX-XKL9-AKBZ/switchPorts/3'
		print('Restoring configuration Port3 switch Q2VX-XKL9-AKBZ',file=f)
		payload = '{"number": 3, "name": "Client", "tags": null, "enabled": true, "poeEnabled": true, "type": "access", "vlan": 999, "voiceVlan": 40, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": 1}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2VX-XKL9-AKBZ/switchPorts/4'
		print('Restoring configuration Port4 switch Q2VX-XKL9-AKBZ',file=f)
		payload = '{"number": 4, "name": "Client", "tags": null, "enabled": true, "poeEnabled": true, "type": "access", "vlan": 999, "voiceVlan": 40, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": 1}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2VX-XKL9-AKBZ/switchPorts/5'
		print('Restoring configuration Port5 switch Q2VX-XKL9-AKBZ',file=f)
		payload = '{"number": 5, "name": "Client", "tags": null, "enabled": true, "poeEnabled": true, "type": "access", "vlan": 999, "voiceVlan": 40, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": 1}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2VX-XKL9-AKBZ/switchPorts/6'
		print('Restoring configuration Port6 switch Q2VX-XKL9-AKBZ',file=f)
		payload = '{"number": 6, "name": "Client", "tags": null, "enabled": true, "poeEnabled": true, "type": "access", "vlan": 999, "voiceVlan": 40, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": 1}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2VX-XKL9-AKBZ/switchPorts/7'
		print('Restoring configuration Port7 switch Q2VX-XKL9-AKBZ',file=f)
		payload = '{"number": 7, "name": "Client", "tags": null, "enabled": true, "poeEnabled": true, "type": "access", "vlan": 999, "voiceVlan": 40, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": 1}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2VX-XKL9-AKBZ/switchPorts/8'
		print('Restoring configuration Port8 switch Q2VX-XKL9-AKBZ',file=f)
		payload = '{"number": 8, "name": "Client", "tags": null, "enabled": true, "poeEnabled": true, "type": "access", "vlan": 999, "voiceVlan": 40, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": 1}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2VX-XKL9-AKBZ/switchPorts/9'
		print('Restoring configuration Port9 switch Q2VX-XKL9-AKBZ',file=f)
		payload = '{"number": 9, "name": "Meraki-AP", "tags": null, "enabled": true, "poeEnabled": true, "type": "trunk", "vlan": 100, "voiceVlan": 40, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": 1}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2VX-XKL9-AKBZ/switchPorts/10'
		print('Restoring configuration Port10 switch Q2VX-XKL9-AKBZ',file=f)
		payload = '{"number": 10, "name": "Client", "tags": null, "enabled": true, "poeEnabled": true, "type": "access", "vlan": 999, "voiceVlan": 40, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": 1}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2VX-XKL9-AKBZ/switchPorts/11'
		print('Restoring configuration Port11 switch Q2VX-XKL9-AKBZ',file=f)
		payload = '{"number": 11, "name": "Client", "tags": null, "enabled": true, "poeEnabled": true, "type": "access", "vlan": 999, "voiceVlan": 40, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": 1}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2VX-XKL9-AKBZ/switchPorts/12'
		print('Restoring configuration Port12 switch Q2VX-XKL9-AKBZ',file=f)
		payload = '{"number": 12, "name": "Client", "tags": null, "enabled": true, "poeEnabled": true, "type": "access", "vlan": 999, "voiceVlan": 40, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": 1}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2VX-XKL9-AKBZ/switchPorts/13'
		print('Restoring configuration Port13 switch Q2VX-XKL9-AKBZ',file=f)
		payload = '{"number": 13, "name": "Client", "tags": null, "enabled": true, "poeEnabled": true, "type": "access", "vlan": 999, "voiceVlan": 40, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": 1}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2VX-XKL9-AKBZ/switchPorts/14'
		print('Restoring configuration Port14 switch Q2VX-XKL9-AKBZ',file=f)
		payload = '{"number": 14, "name": "Client", "tags": null, "enabled": true, "poeEnabled": true, "type": "access", "vlan": 999, "voiceVlan": 40, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": 1}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2VX-XKL9-AKBZ/switchPorts/15'
		print('Restoring configuration Port15 switch Q2VX-XKL9-AKBZ',file=f)
		payload = '{"number": 15, "name": "Client", "tags": null, "enabled": true, "poeEnabled": true, "type": "access", "vlan": 999, "voiceVlan": 40, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": 1}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2VX-XKL9-AKBZ/switchPorts/16'
		print('Restoring configuration Port16 switch Q2VX-XKL9-AKBZ',file=f)
		payload = '{"number": 16, "name": "Client", "tags": null, "enabled": true, "poeEnabled": true, "type": "access", "vlan": 999, "voiceVlan": 40, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": 1}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2VX-XKL9-AKBZ/switchPorts/17'
		print('Restoring configuration Port17 switch Q2VX-XKL9-AKBZ',file=f)
		payload = '{"number": 17, "name": "Client", "tags": null, "enabled": true, "poeEnabled": true, "type": "access", "vlan": 999, "voiceVlan": 40, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": 1}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2VX-XKL9-AKBZ/switchPorts/18'
		print('Restoring configuration Port18 switch Q2VX-XKL9-AKBZ',file=f)
		payload = '{"number": 18, "name": "Client", "tags": null, "enabled": true, "poeEnabled": true, "type": "access", "vlan": 999, "voiceVlan": 40, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": 1}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2VX-XKL9-AKBZ/switchPorts/19'
		print('Restoring configuration Port19 switch Q2VX-XKL9-AKBZ',file=f)
		payload = '{"number": 19, "name": "Client", "tags": null, "enabled": true, "poeEnabled": true, "type": "access", "vlan": 999, "voiceVlan": 40, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": 1}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2VX-XKL9-AKBZ/switchPorts/20'
		print('Restoring configuration Port20 switch Q2VX-XKL9-AKBZ',file=f)
		payload = '{"number": 20, "name": "Client", "tags": null, "enabled": true, "poeEnabled": true, "type": "access", "vlan": 999, "voiceVlan": 40, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": 1}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2VX-XKL9-AKBZ/switchPorts/21'
		print('Restoring configuration Port21 switch Q2VX-XKL9-AKBZ',file=f)
		payload = '{"number": 21, "name": "Client", "tags": null, "enabled": true, "poeEnabled": true, "type": "access", "vlan": 999, "voiceVlan": 40, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": 1}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2VX-XKL9-AKBZ/switchPorts/22'
		print('Restoring configuration Port22 switch Q2VX-XKL9-AKBZ',file=f)
		payload = '{"number": 22, "name": "Client", "tags": null, "enabled": true, "poeEnabled": true, "type": "access", "vlan": 999, "voiceVlan": 40, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": 1}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2VX-XKL9-AKBZ/switchPorts/23'
		print('Restoring configuration Port23 switch Q2VX-XKL9-AKBZ',file=f)
		payload = '{"number": 23, "name": "Client", "tags": null, "enabled": true, "poeEnabled": true, "type": "access", "vlan": 999, "voiceVlan": 40, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": 1}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2VX-XKL9-AKBZ/switchPorts/24'
		print('Restoring configuration Port24 switch Q2VX-XKL9-AKBZ',file=f)
		payload = '{"number": 24, "name": "Client", "tags": null, "enabled": true, "poeEnabled": true, "type": "access", "vlan": 999, "voiceVlan": 40, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": 1}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2VX-XKL9-AKBZ/switchPorts/25'
		print('Restoring configuration Port25 switch Q2VX-XKL9-AKBZ',file=f)
		payload = '{"number": 25, "name": "Client", "tags": null, "enabled": true, "poeEnabled": true, "type": "access", "vlan": 999, "voiceVlan": 40, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": 1}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2VX-XKL9-AKBZ/switchPorts/26'
		print('Restoring configuration Port26 switch Q2VX-XKL9-AKBZ',file=f)
		payload = '{"number": 26, "name": "Client", "tags": null, "enabled": true, "poeEnabled": true, "type": "access", "vlan": 999, "voiceVlan": 40, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": 1}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2VX-XKL9-AKBZ/switchPorts/27'
		print('Restoring configuration Port27 switch Q2VX-XKL9-AKBZ',file=f)
		payload = '{"number": 27, "name": "Client", "tags": null, "enabled": true, "poeEnabled": true, "type": "access", "vlan": 999, "voiceVlan": 40, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": 1}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2VX-XKL9-AKBZ/switchPorts/28'
		print('Restoring configuration Port28 switch Q2VX-XKL9-AKBZ',file=f)
		payload = '{"number": 28, "name": "Client", "tags": null, "enabled": true, "poeEnabled": true, "type": "access", "vlan": 999, "voiceVlan": 40, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": 1}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2VX-XKL9-AKBZ/switchPorts/29'
		print('Restoring configuration Port29 switch Q2VX-XKL9-AKBZ',file=f)
		payload = '{"number": 29, "name": "Client", "tags": null, "enabled": true, "poeEnabled": true, "type": "access", "vlan": 999, "voiceVlan": 40, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": 1}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2VX-XKL9-AKBZ/switchPorts/30'
		print('Restoring configuration Port30 switch Q2VX-XKL9-AKBZ',file=f)
		payload = '{"number": 30, "name": "Client", "tags": null, "enabled": true, "poeEnabled": true, "type": "access", "vlan": 999, "voiceVlan": 40, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": 1}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2VX-XKL9-AKBZ/switchPorts/31'
		print('Restoring configuration Port31 switch Q2VX-XKL9-AKBZ',file=f)
		payload = '{"number": 31, "name": "Client", "tags": null, "enabled": true, "poeEnabled": true, "type": "access", "vlan": 999, "voiceVlan": 40, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": 1}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2VX-XKL9-AKBZ/switchPorts/32'
		print('Restoring configuration Port32 switch Q2VX-XKL9-AKBZ',file=f)
		payload = '{"number": 32, "name": "Client", "tags": null, "enabled": true, "poeEnabled": true, "type": "access", "vlan": 999, "voiceVlan": 40, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": 1}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2VX-XKL9-AKBZ/switchPorts/33'
		print('Restoring configuration Port33 switch Q2VX-XKL9-AKBZ',file=f)
		payload = '{"number": 33, "name": "Client", "tags": null, "enabled": true, "poeEnabled": true, "type": "access", "vlan": 999, "voiceVlan": 40, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": 1}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2VX-XKL9-AKBZ/switchPorts/34'
		print('Restoring configuration Port34 switch Q2VX-XKL9-AKBZ',file=f)
		payload = '{"number": 34, "name": "Client", "tags": null, "enabled": true, "poeEnabled": true, "type": "access", "vlan": 999, "voiceVlan": 40, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": 1}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2VX-XKL9-AKBZ/switchPorts/35'
		print('Restoring configuration Port35 switch Q2VX-XKL9-AKBZ',file=f)
		payload = '{"number": 35, "name": "Client", "tags": null, "enabled": true, "poeEnabled": true, "type": "access", "vlan": 999, "voiceVlan": 40, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": 1}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2VX-XKL9-AKBZ/switchPorts/36'
		print('Restoring configuration Port36 switch Q2VX-XKL9-AKBZ',file=f)
		payload = '{"number": 36, "name": "Client", "tags": null, "enabled": true, "poeEnabled": true, "type": "access", "vlan": 999, "voiceVlan": 40, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": 1}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2VX-XKL9-AKBZ/switchPorts/37'
		print('Restoring configuration Port37 switch Q2VX-XKL9-AKBZ',file=f)
		payload = '{"number": 37, "name": "Client", "tags": null, "enabled": true, "poeEnabled": true, "type": "access", "vlan": 999, "voiceVlan": 40, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": 1}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2VX-XKL9-AKBZ/switchPorts/38'
		print('Restoring configuration Port38 switch Q2VX-XKL9-AKBZ',file=f)
		payload = '{"number": 38, "name": "Client", "tags": null, "enabled": true, "poeEnabled": true, "type": "access", "vlan": 999, "voiceVlan": 40, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": 1}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2VX-XKL9-AKBZ/switchPorts/39'
		print('Restoring configuration Port39 switch Q2VX-XKL9-AKBZ',file=f)
		payload = '{"number": 39, "name": "Client", "tags": null, "enabled": true, "poeEnabled": true, "type": "access", "vlan": 999, "voiceVlan": 40, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": 1}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2VX-XKL9-AKBZ/switchPorts/40'
		print('Restoring configuration Port40 switch Q2VX-XKL9-AKBZ',file=f)
		payload = '{"number": 40, "name": "Client", "tags": null, "enabled": true, "poeEnabled": true, "type": "access", "vlan": 999, "voiceVlan": 40, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": 1}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2VX-XKL9-AKBZ/switchPorts/41'
		print('Restoring configuration Port41 switch Q2VX-XKL9-AKBZ',file=f)
		payload = '{"number": 41, "name": "Client", "tags": null, "enabled": true, "poeEnabled": true, "type": "access", "vlan": 999, "voiceVlan": 40, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": 1}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2VX-XKL9-AKBZ/switchPorts/42'
		print('Restoring configuration Port42 switch Q2VX-XKL9-AKBZ',file=f)
		payload = '{"number": 42, "name": "Uplink VIEITNET16", "tags": null, "enabled": true, "poeEnabled": true, "type": "trunk", "vlan": 100, "voiceVlan": 40, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": 1}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2VX-XKL9-AKBZ/switchPorts/43'
		print('Restoring configuration Port43 switch Q2VX-XKL9-AKBZ',file=f)
		payload = '{"number": 43, "name": "Uplink VIEITNET11", "tags": null, "enabled": true, "poeEnabled": true, "type": "trunk", "vlan": 100, "voiceVlan": 40, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": 1}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2VX-XKL9-AKBZ/switchPorts/44'
		print('Restoring configuration Port44 switch Q2VX-XKL9-AKBZ',file=f)
		payload = '{"number": 44, "name": "Uplink VIEITNET02", "tags": null, "enabled": true, "poeEnabled": true, "type": "trunk", "vlan": 100, "voiceVlan": 40, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": 1}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2VX-XKL9-AKBZ/switchPorts/45'
		print('Restoring configuration Port45 switch Q2VX-XKL9-AKBZ',file=f)
		payload = '{"number": 45, "name": "Uplink MX84", "tags": null, "enabled": true, "poeEnabled": true, "type": "trunk", "vlan": 100, "voiceVlan": 40, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": 1}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2VX-XKL9-AKBZ/switchPorts/46'
		print('Restoring configuration Port46 switch Q2VX-XKL9-AKBZ',file=f)
		payload = '{"number": 46, "name": "UPLINK MX INTERNET PORT 1", "tags": null, "enabled": true, "poeEnabled": true, "type": "access", "vlan": 200, "voiceVlan": null, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": null}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2VX-XKL9-AKBZ/switchPorts/47'
		print('Restoring configuration Port47 switch Q2VX-XKL9-AKBZ',file=f)
		payload = '{"number": 47, "name": "Uplink VIEITNET14", "tags": null, "enabled": true, "poeEnabled": true, "type": "trunk", "vlan": 100, "voiceVlan": null, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": null}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2VX-XKL9-AKBZ/switchPorts/48'
		print('Restoring configuration Port48 switch Q2VX-XKL9-AKBZ',file=f)
		payload = '{"number": 48, "name": "Uplink VIEITNET03", "tags": null, "enabled": true, "poeEnabled": true, "type": "trunk", "vlan": 100, "voiceVlan": null, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": null}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2VX-XKL9-AKBZ/switchPorts/49'
		print('Restoring configuration Port49 switch Q2VX-XKL9-AKBZ',file=f)
		payload = '{"number": 49, "name": "UPLINK ISP NEXTLAYER", "tags": null, "enabled": true, "poeEnabled": false, "type": "access", "vlan": 200, "voiceVlan": null, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "root guard", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": null}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2VX-XKL9-AKBZ/switchPorts/50'
		print('Restoring configuration Port50 switch Q2VX-XKL9-AKBZ',file=f)
		payload = '{"number": 50, "name": "Uplink", "tags": null, "enabled": true, "poeEnabled": false, "type": "access", "vlan": 200, "voiceVlan": null, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "root guard", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": null}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2VX-XKL9-AKBZ/switchPorts/51'
		print('Restoring configuration Port51 switch Q2VX-XKL9-AKBZ',file=f)
		payload = '{"number": 51, "name": "Uplink", "tags": null, "enabled": true, "poeEnabled": false, "type": "trunk", "vlan": 100, "voiceVlan": null, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": null}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2VX-XKL9-AKBZ/switchPorts/52'
		print('Restoring configuration Port52 switch Q2VX-XKL9-AKBZ',file=f)
		payload = '{"number": 52, "name": "Uplink", "tags": null, "enabled": true, "poeEnabled": false, "type": "trunk", "vlan": 100, "voiceVlan": null, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": null}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2VX-XKL9-AKBZ/switchPorts/53'
		print('Restoring configuration Port53 switch Q2VX-XKL9-AKBZ',file=f)
		payload = '{"number": 53, "name": null, "tags": null, "enabled": true, "poeEnabled": false, "type": "trunk", "vlan": 1, "voiceVlan": null, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": null}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2VX-XKL9-AKBZ/switchPorts/54'
		print('Restoring configuration Port54 switch Q2VX-XKL9-AKBZ',file=f)
		payload = '{"number": 54, "name": null, "tags": null, "enabled": true, "poeEnabled": false, "type": "trunk", "vlan": 1, "voiceVlan": null, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": null}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2CX-AL6G-29ZH/switchPorts/1'
		print('Restoring configuration Port1 switch Q2CX-AL6G-29ZH',file=f)
		payload = '{"number": 1, "name": "DOT1x", "tags": null, "enabled": true, "poeEnabled": true, "type": "access", "vlan": 999, "voiceVlan": 40, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": 1}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2CX-AL6G-29ZH/switchPorts/2'
		print('Restoring configuration Port2 switch Q2CX-AL6G-29ZH',file=f)
		payload = '{"number": 2, "name": "DOT1x", "tags": null, "enabled": true, "poeEnabled": true, "type": "access", "vlan": 999, "voiceVlan": 40, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": 1}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2CX-AL6G-29ZH/switchPorts/3'
		print('Restoring configuration Port3 switch Q2CX-AL6G-29ZH',file=f)
		payload = '{"number": 3, "name": "DOT1x", "tags": null, "enabled": true, "poeEnabled": true, "type": "access", "vlan": 999, "voiceVlan": 40, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": 1}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2CX-AL6G-29ZH/switchPorts/4'
		print('Restoring configuration Port4 switch Q2CX-AL6G-29ZH',file=f)
		payload = '{"number": 4, "name": "DOT1x", "tags": null, "enabled": true, "poeEnabled": true, "type": "access", "vlan": 999, "voiceVlan": 40, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": 1}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2CX-AL6G-29ZH/switchPorts/5'
		print('Restoring configuration Port5 switch Q2CX-AL6G-29ZH',file=f)
		payload = '{"number": 5, "name": "DOT1x", "tags": null, "enabled": true, "poeEnabled": true, "type": "access", "vlan": 999, "voiceVlan": 40, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": 1}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2CX-AL6G-29ZH/switchPorts/6'
		print('Restoring configuration Port6 switch Q2CX-AL6G-29ZH',file=f)
		payload = '{"number": 6, "name": "DOT1x", "tags": null, "enabled": true, "poeEnabled": true, "type": "access", "vlan": 999, "voiceVlan": 40, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": 1}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2CX-AL6G-29ZH/switchPorts/7'
		print('Restoring configuration Port7 switch Q2CX-AL6G-29ZH',file=f)
		payload = '{"number": 7, "name": "AccessPoint MR_33", "tags": null, "enabled": true, "poeEnabled": true, "type": "trunk", "vlan": 100, "voiceVlan": 40, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "bpdu guard", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": null}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2CX-AL6G-29ZH/switchPorts/8'
		print('Restoring configuration Port8 switch Q2CX-AL6G-29ZH',file=f)
		payload = '{"number": 8, "name": "Uplink_MX67", "tags": null, "enabled": true, "poeEnabled": true, "type": "trunk", "vlan": 100, "voiceVlan": 40, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": null}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2CX-AL6G-29ZH/switchPorts/9'
		print('Restoring configuration Port9 switch Q2CX-AL6G-29ZH',file=f)
		payload = '{"number": 9, "name": "DOT1x", "tags": null, "enabled": false, "poeEnabled": false, "type": "access", "vlan": 999, "voiceVlan": 40, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "bpdu guard", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": null}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2CX-AL6G-29ZH/switchPorts/10'
		print('Restoring configuration Port10 switch Q2CX-AL6G-29ZH',file=f)
		payload = '{"number": 10, "name": "UPLINK MX67", "tags": null, "enabled": false, "poeEnabled": false, "type": "trunk", "vlan": 100, "voiceVlan": null, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": null}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2VX-UNGY-CEJS/switchPorts/1'
		print('Restoring configuration Port1 switch Q2VX-UNGY-CEJS',file=f)
		payload = '{"number": 1, "name": "Meraki-AP", "tags": null, "enabled": true, "poeEnabled": true, "type": "trunk", "vlan": 100, "voiceVlan": 40, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": 1}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2VX-UNGY-CEJS/switchPorts/2'
		print('Restoring configuration Port2 switch Q2VX-UNGY-CEJS',file=f)
		payload = '{"number": 2, "name": "Client", "tags": null, "enabled": true, "poeEnabled": true, "type": "access", "vlan": 999, "voiceVlan": 40, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": 1}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2VX-UNGY-CEJS/switchPorts/3'
		print('Restoring configuration Port3 switch Q2VX-UNGY-CEJS',file=f)
		payload = '{"number": 3, "name": "Client", "tags": null, "enabled": true, "poeEnabled": true, "type": "access", "vlan": 50, "voiceVlan": 40, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": null}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2VX-UNGY-CEJS/switchPorts/4'
		print('Restoring configuration Port4 switch Q2VX-UNGY-CEJS',file=f)
		payload = '{"number": 4, "name": "Client", "tags": null, "enabled": true, "poeEnabled": true, "type": "access", "vlan": 999, "voiceVlan": 40, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": 1}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2VX-UNGY-CEJS/switchPorts/5'
		print('Restoring configuration Port5 switch Q2VX-UNGY-CEJS',file=f)
		payload = '{"number": 5, "name": "Client", "tags": null, "enabled": true, "poeEnabled": true, "type": "access", "vlan": 999, "voiceVlan": 40, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": 1}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2VX-UNGY-CEJS/switchPorts/6'
		print('Restoring configuration Port6 switch Q2VX-UNGY-CEJS',file=f)
		payload = '{"number": 6, "name": "Client", "tags": null, "enabled": true, "poeEnabled": true, "type": "access", "vlan": 999, "voiceVlan": 40, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": 1}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2VX-UNGY-CEJS/switchPorts/7'
		print('Restoring configuration Port7 switch Q2VX-UNGY-CEJS',file=f)
		payload = '{"number": 7, "name": "Client", "tags": null, "enabled": true, "poeEnabled": true, "type": "access", "vlan": 999, "voiceVlan": 40, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": 1}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2VX-UNGY-CEJS/switchPorts/8'
		print('Restoring configuration Port8 switch Q2VX-UNGY-CEJS',file=f)
		payload = '{"number": 8, "name": "Client", "tags": null, "enabled": true, "poeEnabled": true, "type": "access", "vlan": 999, "voiceVlan": 40, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": 1}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2VX-UNGY-CEJS/switchPorts/9'
		print('Restoring configuration Port9 switch Q2VX-UNGY-CEJS',file=f)
		payload = '{"number": 9, "name": "Client", "tags": null, "enabled": true, "poeEnabled": true, "type": "access", "vlan": 999, "voiceVlan": 40, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": 1}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2VX-UNGY-CEJS/switchPorts/10'
		print('Restoring configuration Port10 switch Q2VX-UNGY-CEJS',file=f)
		payload = '{"number": 10, "name": "Client", "tags": null, "enabled": true, "poeEnabled": true, "type": "access", "vlan": 999, "voiceVlan": 40, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": 1}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2VX-UNGY-CEJS/switchPorts/11'
		print('Restoring configuration Port11 switch Q2VX-UNGY-CEJS',file=f)
		payload = '{"number": 11, "name": "Client", "tags": null, "enabled": true, "poeEnabled": true, "type": "access", "vlan": 50, "voiceVlan": 40, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": null}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2VX-UNGY-CEJS/switchPorts/12'
		print('Restoring configuration Port12 switch Q2VX-UNGY-CEJS',file=f)
		payload = '{"number": 12, "name": "Client", "tags": null, "enabled": true, "poeEnabled": true, "type": "access", "vlan": 50, "voiceVlan": 40, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": null}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2VX-UNGY-CEJS/switchPorts/13'
		print('Restoring configuration Port13 switch Q2VX-UNGY-CEJS',file=f)
		payload = '{"number": 13, "name": "Client", "tags": null, "enabled": true, "poeEnabled": true, "type": "access", "vlan": 999, "voiceVlan": 40, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": 1}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2VX-UNGY-CEJS/switchPorts/14'
		print('Restoring configuration Port14 switch Q2VX-UNGY-CEJS',file=f)
		payload = '{"number": 14, "name": "Client", "tags": null, "enabled": true, "poeEnabled": true, "type": "access", "vlan": 999, "voiceVlan": 40, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": 1}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2VX-UNGY-CEJS/switchPorts/15'
		print('Restoring configuration Port15 switch Q2VX-UNGY-CEJS',file=f)
		payload = '{"number": 15, "name": "Client", "tags": null, "enabled": true, "poeEnabled": true, "type": "access", "vlan": 999, "voiceVlan": 40, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": 1}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2VX-UNGY-CEJS/switchPorts/16'
		print('Restoring configuration Port16 switch Q2VX-UNGY-CEJS',file=f)
		payload = '{"number": 16, "name": "Client", "tags": null, "enabled": true, "poeEnabled": true, "type": "access", "vlan": 999, "voiceVlan": 40, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": 1}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2VX-UNGY-CEJS/switchPorts/17'
		print('Restoring configuration Port17 switch Q2VX-UNGY-CEJS',file=f)
		payload = '{"number": 17, "name": "Client", "tags": null, "enabled": true, "poeEnabled": true, "type": "access", "vlan": 999, "voiceVlan": 40, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": 1}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2VX-UNGY-CEJS/switchPorts/18'
		print('Restoring configuration Port18 switch Q2VX-UNGY-CEJS',file=f)
		payload = '{"number": 18, "name": "Client", "tags": null, "enabled": true, "poeEnabled": true, "type": "access", "vlan": 999, "voiceVlan": 40, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": 1}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2VX-UNGY-CEJS/switchPorts/19'
		print('Restoring configuration Port19 switch Q2VX-UNGY-CEJS',file=f)
		payload = '{"number": 19, "name": "Client", "tags": null, "enabled": true, "poeEnabled": true, "type": "access", "vlan": 999, "voiceVlan": 40, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": 1}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2VX-UNGY-CEJS/switchPorts/20'
		print('Restoring configuration Port20 switch Q2VX-UNGY-CEJS',file=f)
		payload = '{"number": 20, "name": "Client", "tags": null, "enabled": true, "poeEnabled": true, "type": "access", "vlan": 999, "voiceVlan": 40, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": 1}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2VX-UNGY-CEJS/switchPorts/21'
		print('Restoring configuration Port21 switch Q2VX-UNGY-CEJS',file=f)
		payload = '{"number": 21, "name": "Client", "tags": null, "enabled": true, "poeEnabled": true, "type": "access", "vlan": 999, "voiceVlan": 40, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": 1}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2VX-UNGY-CEJS/switchPorts/22'
		print('Restoring configuration Port22 switch Q2VX-UNGY-CEJS',file=f)
		payload = '{"number": 22, "name": "Client", "tags": null, "enabled": true, "poeEnabled": true, "type": "access", "vlan": 999, "voiceVlan": 40, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": 1}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2VX-UNGY-CEJS/switchPorts/23'
		print('Restoring configuration Port23 switch Q2VX-UNGY-CEJS',file=f)
		payload = '{"number": 23, "name": "Client", "tags": null, "enabled": true, "poeEnabled": true, "type": "access", "vlan": 999, "voiceVlan": 40, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": 1}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2VX-UNGY-CEJS/switchPorts/24'
		print('Restoring configuration Port24 switch Q2VX-UNGY-CEJS',file=f)
		payload = '{"number": 24, "name": "Client", "tags": null, "enabled": true, "poeEnabled": true, "type": "access", "vlan": 999, "voiceVlan": 40, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": 1}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2VX-UNGY-CEJS/switchPorts/25'
		print('Restoring configuration Port25 switch Q2VX-UNGY-CEJS',file=f)
		payload = '{"number": 25, "name": "Client", "tags": null, "enabled": true, "poeEnabled": true, "type": "access", "vlan": 999, "voiceVlan": 40, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": 1}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2VX-UNGY-CEJS/switchPorts/26'
		print('Restoring configuration Port26 switch Q2VX-UNGY-CEJS',file=f)
		payload = '{"number": 26, "name": "Client", "tags": null, "enabled": true, "poeEnabled": true, "type": "access", "vlan": 999, "voiceVlan": 40, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": 1}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2VX-UNGY-CEJS/switchPorts/27'
		print('Restoring configuration Port27 switch Q2VX-UNGY-CEJS',file=f)
		payload = '{"number": 27, "name": "Client", "tags": null, "enabled": true, "poeEnabled": true, "type": "access", "vlan": 999, "voiceVlan": 40, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": 1}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2VX-UNGY-CEJS/switchPorts/28'
		print('Restoring configuration Port28 switch Q2VX-UNGY-CEJS',file=f)
		payload = '{"number": 28, "name": "Client", "tags": null, "enabled": true, "poeEnabled": true, "type": "access", "vlan": 999, "voiceVlan": 40, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": 1}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2VX-UNGY-CEJS/switchPorts/29'
		print('Restoring configuration Port29 switch Q2VX-UNGY-CEJS',file=f)
		payload = '{"number": 29, "name": "Client", "tags": null, "enabled": true, "poeEnabled": true, "type": "access", "vlan": 999, "voiceVlan": 40, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": 1}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2VX-UNGY-CEJS/switchPorts/30'
		print('Restoring configuration Port30 switch Q2VX-UNGY-CEJS',file=f)
		payload = '{"number": 30, "name": "Client", "tags": null, "enabled": true, "poeEnabled": true, "type": "access", "vlan": 999, "voiceVlan": 40, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": 1}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2VX-UNGY-CEJS/switchPorts/31'
		print('Restoring configuration Port31 switch Q2VX-UNGY-CEJS',file=f)
		payload = '{"number": 31, "name": "Client", "tags": null, "enabled": true, "poeEnabled": true, "type": "access", "vlan": 999, "voiceVlan": 40, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": 1}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2VX-UNGY-CEJS/switchPorts/32'
		print('Restoring configuration Port32 switch Q2VX-UNGY-CEJS',file=f)
		payload = '{"number": 32, "name": "Client", "tags": null, "enabled": true, "poeEnabled": true, "type": "access", "vlan": 999, "voiceVlan": 40, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": 1}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2VX-UNGY-CEJS/switchPorts/33'
		print('Restoring configuration Port33 switch Q2VX-UNGY-CEJS',file=f)
		payload = '{"number": 33, "name": "Client", "tags": null, "enabled": true, "poeEnabled": true, "type": "access", "vlan": 999, "voiceVlan": 40, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": 1}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2VX-UNGY-CEJS/switchPorts/34'
		print('Restoring configuration Port34 switch Q2VX-UNGY-CEJS',file=f)
		payload = '{"number": 34, "name": "Client", "tags": null, "enabled": true, "poeEnabled": true, "type": "access", "vlan": 999, "voiceVlan": 40, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": 1}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2VX-UNGY-CEJS/switchPorts/35'
		print('Restoring configuration Port35 switch Q2VX-UNGY-CEJS',file=f)
		payload = '{"number": 35, "name": "Client", "tags": null, "enabled": true, "poeEnabled": true, "type": "access", "vlan": 999, "voiceVlan": 40, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": 1}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2VX-UNGY-CEJS/switchPorts/36'
		print('Restoring configuration Port36 switch Q2VX-UNGY-CEJS',file=f)
		payload = '{"number": 36, "name": "Client", "tags": null, "enabled": true, "poeEnabled": true, "type": "access", "vlan": 999, "voiceVlan": 40, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": 1}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2VX-UNGY-CEJS/switchPorts/37'
		print('Restoring configuration Port37 switch Q2VX-UNGY-CEJS',file=f)
		payload = '{"number": 37, "name": "Meraki-AP", "tags": null, "enabled": true, "poeEnabled": true, "type": "trunk", "vlan": 100, "voiceVlan": 40, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": 1}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2VX-UNGY-CEJS/switchPorts/38'
		print('Restoring configuration Port38 switch Q2VX-UNGY-CEJS',file=f)
		payload = '{"number": 38, "name": "Client", "tags": null, "enabled": true, "poeEnabled": true, "type": "access", "vlan": 999, "voiceVlan": 40, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": 1}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2VX-UNGY-CEJS/switchPorts/39'
		print('Restoring configuration Port39 switch Q2VX-UNGY-CEJS',file=f)
		payload = '{"number": 39, "name": "Client", "tags": null, "enabled": true, "poeEnabled": true, "type": "access", "vlan": 999, "voiceVlan": 40, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": 1}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2VX-UNGY-CEJS/switchPorts/40'
		print('Restoring configuration Port40 switch Q2VX-UNGY-CEJS',file=f)
		payload = '{"number": 40, "name": "Client", "tags": null, "enabled": true, "poeEnabled": true, "type": "access", "vlan": 50, "voiceVlan": 40, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": null}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2VX-UNGY-CEJS/switchPorts/41'
		print('Restoring configuration Port41 switch Q2VX-UNGY-CEJS',file=f)
		payload = '{"number": 41, "name": "Client", "tags": null, "enabled": true, "poeEnabled": true, "type": "access", "vlan": 999, "voiceVlan": 40, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": 1}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2VX-UNGY-CEJS/switchPorts/42'
		print('Restoring configuration Port42 switch Q2VX-UNGY-CEJS',file=f)
		payload = '{"number": 42, "name": "Client", "tags": null, "enabled": true, "poeEnabled": true, "type": "access", "vlan": 999, "voiceVlan": 40, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": 1}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2VX-UNGY-CEJS/switchPorts/43'
		print('Restoring configuration Port43 switch Q2VX-UNGY-CEJS',file=f)
		payload = '{"number": 43, "name": "Client", "tags": null, "enabled": true, "poeEnabled": true, "type": "access", "vlan": 999, "voiceVlan": 40, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": 1}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2VX-UNGY-CEJS/switchPorts/44'
		print('Restoring configuration Port44 switch Q2VX-UNGY-CEJS',file=f)
		payload = '{"number": 44, "name": "Client", "tags": null, "enabled": true, "poeEnabled": true, "type": "access", "vlan": 999, "voiceVlan": 40, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": 1}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2VX-UNGY-CEJS/switchPorts/45'
		print('Restoring configuration Port45 switch Q2VX-UNGY-CEJS',file=f)
		payload = '{"number": 45, "name": "Client", "tags": null, "enabled": true, "poeEnabled": true, "type": "access", "vlan": 999, "voiceVlan": 40, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": 1}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2VX-UNGY-CEJS/switchPorts/46'
		print('Restoring configuration Port46 switch Q2VX-UNGY-CEJS',file=f)
		payload = '{"number": 46, "name": "Uplink", "tags": null, "enabled": true, "poeEnabled": true, "type": "trunk", "vlan": 100, "voiceVlan": 40, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": 1}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2VX-UNGY-CEJS/switchPorts/47'
		print('Restoring configuration Port47 switch Q2VX-UNGY-CEJS',file=f)
		payload = '{"number": 47, "name": "Uplink", "tags": null, "enabled": true, "poeEnabled": true, "type": "trunk", "vlan": 100, "voiceVlan": null, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": null}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2VX-UNGY-CEJS/switchPorts/48'
		print('Restoring configuration Port48 switch Q2VX-UNGY-CEJS',file=f)
		payload = '{"number": 48, "name": "Uplink", "tags": null, "enabled": true, "poeEnabled": true, "type": "trunk", "vlan": 100, "voiceVlan": null, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": null}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2VX-UNGY-CEJS/switchPorts/49'
		print('Restoring configuration Port49 switch Q2VX-UNGY-CEJS',file=f)
		payload = '{"number": 49, "name": "Uplink", "tags": null, "enabled": true, "poeEnabled": false, "type": "trunk", "vlan": 100, "voiceVlan": null, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": null}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2VX-UNGY-CEJS/switchPorts/50'
		print('Restoring configuration Port50 switch Q2VX-UNGY-CEJS',file=f)
		payload = '{"number": 50, "name": "Uplink", "tags": null, "enabled": true, "poeEnabled": false, "type": "trunk", "vlan": 100, "voiceVlan": null, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": null}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2VX-UNGY-CEJS/switchPorts/51'
		print('Restoring configuration Port51 switch Q2VX-UNGY-CEJS',file=f)
		payload = '{"number": 51, "name": "Uplink", "tags": null, "enabled": true, "poeEnabled": false, "type": "trunk", "vlan": 100, "voiceVlan": null, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": null}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2VX-UNGY-CEJS/switchPorts/52'
		print('Restoring configuration Port52 switch Q2VX-UNGY-CEJS',file=f)
		payload = '{"number": 52, "name": "Uplink", "tags": null, "enabled": true, "poeEnabled": false, "type": "trunk", "vlan": 100, "voiceVlan": null, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": null}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2VX-UNGY-CEJS/switchPorts/53'
		print('Restoring configuration Port53 switch Q2VX-UNGY-CEJS',file=f)
		payload = '{"number": 53, "name": null, "tags": null, "enabled": true, "poeEnabled": false, "type": "trunk", "vlan": 1, "voiceVlan": null, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": null}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2VX-UNGY-CEJS/switchPorts/54'
		print('Restoring configuration Port54 switch Q2VX-UNGY-CEJS',file=f)
		payload = '{"number": 54, "name": null, "tags": null, "enabled": true, "poeEnabled": false, "type": "trunk", "vlan": 1, "voiceVlan": null, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": null}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2SX-GZTZ-CVMK/switchPorts/1'
		print('Restoring configuration Port1 switch Q2SX-GZTZ-CVMK',file=f)
		payload = '{"number": 1, "name": "UPLINK", "tags": null, "enabled": true, "poeEnabled": true, "type": "trunk", "vlan": 100, "voiceVlan": null, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": null}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2SX-GZTZ-CVMK/switchPorts/2'
		print('Restoring configuration Port2 switch Q2SX-GZTZ-CVMK',file=f)
		payload = '{"number": 2, "name": "DOT1x", "tags": null, "enabled": true, "poeEnabled": true, "type": "access", "vlan": 50, "voiceVlan": 40, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": null}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2SX-GZTZ-CVMK/switchPorts/3'
		print('Restoring configuration Port3 switch Q2SX-GZTZ-CVMK',file=f)
		payload = '{"number": 3, "name": "DOT1x", "tags": null, "enabled": true, "poeEnabled": true, "type": "access", "vlan": 50, "voiceVlan": 40, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": null}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2SX-GZTZ-CVMK/switchPorts/4'
		print('Restoring configuration Port4 switch Q2SX-GZTZ-CVMK',file=f)
		payload = '{"number": 4, "name": "DOT1x", "tags": null, "enabled": true, "poeEnabled": true, "type": "access", "vlan": 50, "voiceVlan": 40, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": null}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2SX-GZTZ-CVMK/switchPorts/5'
		print('Restoring configuration Port5 switch Q2SX-GZTZ-CVMK',file=f)
		payload = '{"number": 5, "name": "DOT1x", "tags": null, "enabled": true, "poeEnabled": true, "type": "access", "vlan": 50, "voiceVlan": 40, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": null}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2SX-GZTZ-CVMK/switchPorts/6'
		print('Restoring configuration Port6 switch Q2SX-GZTZ-CVMK',file=f)
		payload = '{"number": 6, "name": "DOT1x", "tags": null, "enabled": true, "poeEnabled": true, "type": "access", "vlan": 50, "voiceVlan": 40, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": null}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2SX-GZTZ-CVMK/switchPorts/7'
		print('Restoring configuration Port7 switch Q2SX-GZTZ-CVMK',file=f)
		payload = '{"number": 7, "name": "DOT1x", "tags": null, "enabled": true, "poeEnabled": true, "type": "access", "vlan": 50, "voiceVlan": 40, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": null}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2SX-GZTZ-CVMK/switchPorts/8'
		print('Restoring configuration Port8 switch Q2SX-GZTZ-CVMK',file=f)
		payload = '{"number": 8, "name": "DOT1x", "tags": null, "enabled": true, "poeEnabled": true, "type": "access", "vlan": 50, "voiceVlan": 40, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": null}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2SX-GZTZ-CVMK/switchPorts/9'
		print('Restoring configuration Port9 switch Q2SX-GZTZ-CVMK',file=f)
		payload = '{"number": 9, "name": "DOT1x", "tags": null, "enabled": true, "poeEnabled": true, "type": "access", "vlan": 50, "voiceVlan": 40, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": null}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2SX-GZTZ-CVMK/switchPorts/10'
		print('Restoring configuration Port10 switch Q2SX-GZTZ-CVMK',file=f)
		payload = '{"number": 10, "name": "DOT1x", "tags": null, "enabled": true, "poeEnabled": true, "type": "access", "vlan": 50, "voiceVlan": 40, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": null}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2SX-GZTZ-CVMK/switchPorts/11'
		print('Restoring configuration Port11 switch Q2SX-GZTZ-CVMK',file=f)
		payload = '{"number": 11, "name": "DOT1x", "tags": null, "enabled": true, "poeEnabled": true, "type": "access", "vlan": 50, "voiceVlan": 40, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": null}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2SX-GZTZ-CVMK/switchPorts/12'
		print('Restoring configuration Port12 switch Q2SX-GZTZ-CVMK',file=f)
		payload = '{"number": 12, "name": "DOT1x", "tags": null, "enabled": true, "poeEnabled": true, "type": "access", "vlan": 50, "voiceVlan": 40, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": null}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2SX-GZTZ-CVMK/switchPorts/13'
		print('Restoring configuration Port13 switch Q2SX-GZTZ-CVMK',file=f)
		payload = '{"number": 13, "name": "DOT1x", "tags": null, "enabled": true, "poeEnabled": true, "type": "access", "vlan": 50, "voiceVlan": 40, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": null}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2SX-GZTZ-CVMK/switchPorts/14'
		print('Restoring configuration Port14 switch Q2SX-GZTZ-CVMK',file=f)
		payload = '{"number": 14, "name": "DOT1x", "tags": null, "enabled": true, "poeEnabled": true, "type": "access", "vlan": 50, "voiceVlan": 40, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": null}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2SX-GZTZ-CVMK/switchPorts/15'
		print('Restoring configuration Port15 switch Q2SX-GZTZ-CVMK',file=f)
		payload = '{"number": 15, "name": "DOT1x", "tags": null, "enabled": true, "poeEnabled": true, "type": "access", "vlan": 50, "voiceVlan": 40, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": null}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2SX-GZTZ-CVMK/switchPorts/16'
		print('Restoring configuration Port16 switch Q2SX-GZTZ-CVMK',file=f)
		payload = '{"number": 16, "name": "DOT1x", "tags": null, "enabled": true, "poeEnabled": true, "type": "access", "vlan": 999, "voiceVlan": 40, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": 1}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2SX-GZTZ-CVMK/switchPorts/17'
		print('Restoring configuration Port17 switch Q2SX-GZTZ-CVMK',file=f)
		payload = '{"number": 17, "name": "DOT1x", "tags": null, "enabled": true, "poeEnabled": true, "type": "access", "vlan": 999, "voiceVlan": 40, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": 1}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2SX-GZTZ-CVMK/switchPorts/18'
		print('Restoring configuration Port18 switch Q2SX-GZTZ-CVMK',file=f)
		payload = '{"number": 18, "name": "DOT1x", "tags": null, "enabled": true, "poeEnabled": true, "type": "access", "vlan": 999, "voiceVlan": 40, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": 1}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2SX-GZTZ-CVMK/switchPorts/19'
		print('Restoring configuration Port19 switch Q2SX-GZTZ-CVMK',file=f)
		payload = '{"number": 19, "name": "DOT1x", "tags": null, "enabled": true, "poeEnabled": true, "type": "access", "vlan": 50, "voiceVlan": 40, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": null}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2SX-GZTZ-CVMK/switchPorts/20'
		print('Restoring configuration Port20 switch Q2SX-GZTZ-CVMK',file=f)
		payload = '{"number": 20, "name": "DOT1x", "tags": null, "enabled": true, "poeEnabled": true, "type": "access", "vlan": 999, "voiceVlan": 40, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": 1}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2SX-GZTZ-CVMK/switchPorts/21'
		print('Restoring configuration Port21 switch Q2SX-GZTZ-CVMK',file=f)
		payload = '{"number": 21, "name": "DOT1x", "tags": null, "enabled": true, "poeEnabled": true, "type": "access", "vlan": 10, "voiceVlan": 40, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": null}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2SX-GZTZ-CVMK/switchPorts/22'
		print('Restoring configuration Port22 switch Q2SX-GZTZ-CVMK',file=f)
		payload = '{"number": 22, "name": "DOT1x", "tags": null, "enabled": true, "poeEnabled": true, "type": "access", "vlan": 999, "voiceVlan": 40, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": 1}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2SX-GZTZ-CVMK/switchPorts/23'
		print('Restoring configuration Port23 switch Q2SX-GZTZ-CVMK',file=f)
		payload = '{"number": 23, "name": "DOT1x", "tags": null, "enabled": true, "poeEnabled": true, "type": "access", "vlan": 999, "voiceVlan": 40, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": 1}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2SX-GZTZ-CVMK/switchPorts/24'
		print('Restoring configuration Port24 switch Q2SX-GZTZ-CVMK',file=f)
		payload = '{"number": 24, "name": "DOT1x", "tags": null, "enabled": true, "poeEnabled": true, "type": "access", "vlan": 999, "voiceVlan": 40, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": 1}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2SX-GZTZ-CVMK/switchPorts/25'
		print('Restoring configuration Port25 switch Q2SX-GZTZ-CVMK',file=f)
		payload = '{"number": 25, "name": "", "tags": null, "enabled": true, "poeEnabled": false, "type": "trunk", "vlan": 1, "voiceVlan": 40, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": 1}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2SX-GZTZ-CVMK/switchPorts/26'
		print('Restoring configuration Port26 switch Q2SX-GZTZ-CVMK',file=f)
		payload = '{"number": 26, "name": "", "tags": null, "enabled": true, "poeEnabled": false, "type": "trunk", "vlan": 1, "voiceVlan": 40, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": 1}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2SX-GZTZ-CVMK/switchPorts/27'
		print('Restoring configuration Port27 switch Q2SX-GZTZ-CVMK',file=f)
		payload = '{"number": 27, "name": "", "tags": null, "enabled": true, "poeEnabled": false, "type": "trunk", "vlan": 1, "voiceVlan": 40, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": 1}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2SX-GZTZ-CVMK/switchPorts/28'
		print('Restoring configuration Port28 switch Q2SX-GZTZ-CVMK',file=f)
		payload = '{"number": 28, "name": "", "tags": null, "enabled": true, "poeEnabled": false, "type": "trunk", "vlan": 1, "voiceVlan": 40, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": 1}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2SX-GZTZ-CVMK/switchPorts/29'
		print('Restoring configuration Port29 switch Q2SX-GZTZ-CVMK',file=f)
		payload = '{"number": 29, "name": null, "tags": null, "enabled": true, "poeEnabled": false, "type": "trunk", "vlan": 1, "voiceVlan": null, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": null}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2SX-GZTZ-CVMK/switchPorts/30'
		print('Restoring configuration Port30 switch Q2SX-GZTZ-CVMK',file=f)
		payload = '{"number": 30, "name": null, "tags": null, "enabled": true, "poeEnabled": false, "type": "trunk", "vlan": 1, "voiceVlan": null, "allowedVlans": "all", "isolationEnabled": false, "rstpEnabled": true, "stpGuard": "disabled", "linkNegotiation": "Auto negotiate", "portScheduleId": null, "udld": "Alert only", "accessPolicyNumber": null}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
	except requests.exceptions.HTTPError as err:
		print(err,file=f)
		print('There was an error restoring the switchs configuration, check the logs for more details.',file=f)
	print('Restoring Switch configuration complete.',file=f)
	f.flush()
	f.close()

