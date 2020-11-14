#!/usr/bin/env python3
#-*- coding: utf-8 -*-
#
#
import os
import argparse
import requests


def build_switchports(ARG_APIKEY,USER):
	abspath = os.path.abspath(__file__)
	log_file = os.path.abspath(__file__  + '/../../logs/{}_log_file.log'.format(USER))
	f = open(log_file, 'w')

	headers = {
		'x-cisco-meraki-api-key': ARG_APIKEY,
		'Content-Type': 'application/json',
		'Accept': 'application/json',
		}

	session = requests.Session()


# Configuring Meraki Switchport from a Cisco Ios running-config


	try:
		print('Starting configuration switchports',file=f)
		f.flush()
		puturl = 'https://api.meraki.com/api/v0/devices/Q2HP-QSVT-LBLV/switchPorts/1'
		print('Building configuration SwitchPort1 switch Q2HP-QSVT-LBLV',file=f)
		f.flush()
		payload = '{"name": "802.1X DOWN", "tags": null, "enabled": "true", "poeEnabled": "true", "type": "access", "vlan": "999", "voiceVlan": "998", "allowedVlans": "all", "isolationEnabled": "false", "rstpEnabled": "true", "stpGuard": "bpdu guard", "accessPolicyNumber": 1, "linkNegotiation": "Auto negotiate", "number": "1"}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		print('Response: ',response.status_code,file=f)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2HP-QSVT-LBLV/switchPorts/2'
		print('Building configuration SwitchPort2 switch Q2HP-QSVT-LBLV',file=f)
		f.flush()
		payload = '{"name": "802.1X DOWN", "tags": null, "enabled": "true", "poeEnabled": "true", "type": "access", "vlan": "999", "voiceVlan": "998", "allowedVlans": "all", "isolationEnabled": "false", "rstpEnabled": "true", "stpGuard": "bpdu guard", "accessPolicyNumber": 1, "linkNegotiation": "Auto negotiate", "number": "2"}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		print('Response: ',response.status_code,file=f)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2HP-QSVT-LBLV/switchPorts/3'
		print('Building configuration SwitchPort3 switch Q2HP-QSVT-LBLV',file=f)
		f.flush()
		payload = '{"name": "802.1X DOWN", "tags": null, "enabled": "true", "poeEnabled": "true", "type": "access", "vlan": "999", "voiceVlan": "998", "allowedVlans": "all", "isolationEnabled": "false", "rstpEnabled": "true", "stpGuard": "bpdu guard", "accessPolicyNumber": 1, "linkNegotiation": "Auto negotiate", "number": "3"}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		print('Response: ',response.status_code,file=f)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2HP-QSVT-LBLV/switchPorts/4'
		print('Building configuration SwitchPort4 switch Q2HP-QSVT-LBLV',file=f)
		f.flush()
		payload = '{"name": "Client / Voice", "tags": null, "enabled": "true", "poeEnabled": "true", "type": "access", "vlan": "999", "voiceVlan": "998", "allowedVlans": "all", "isolationEnabled": "false", "rstpEnabled": "true", "stpGuard": "bpdu guard", "accessPolicyNumber": 1, "linkNegotiation": "Auto negotiate", "number": "4"}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		print('Response: ',response.status_code,file=f)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2HP-QSVT-LBLV/switchPorts/5'
		print('Building configuration SwitchPort5 switch Q2HP-QSVT-LBLV',file=f)
		f.flush()
		payload = '{"name": "Client / Voice", "tags": null, "enabled": "true", "poeEnabled": "true", "type": "access", "vlan": "999", "voiceVlan": "998", "allowedVlans": "all", "isolationEnabled": "false", "rstpEnabled": "true", "stpGuard": "bpdu guard", "accessPolicyNumber": 1, "linkNegotiation": "Auto negotiate", "number": "5"}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		print('Response: ',response.status_code,file=f)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2HP-QSVT-LBLV/switchPorts/6'
		print('Building configuration SwitchPort6 switch Q2HP-QSVT-LBLV',file=f)
		f.flush()
		payload = '{"name": "802.1X DOWN", "tags": null, "enabled": "true", "poeEnabled": "true", "type": "access", "vlan": "999", "voiceVlan": "998", "allowedVlans": "all", "isolationEnabled": "false", "rstpEnabled": "true", "stpGuard": "bpdu guard", "accessPolicyNumber": 1, "linkNegotiation": "Auto negotiate", "number": "6"}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		print('Response: ',response.status_code,file=f)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2HP-QSVT-LBLV/switchPorts/7'
		print('Building configuration SwitchPort7 switch Q2HP-QSVT-LBLV',file=f)
		f.flush()
		payload = '{"name": "Client / Voice", "tags": null, "enabled": "true", "poeEnabled": "true", "type": "access", "vlan": "999", "voiceVlan": "998", "allowedVlans": "all", "isolationEnabled": "false", "rstpEnabled": "true", "stpGuard": "bpdu guard", "accessPolicyNumber": 1, "linkNegotiation": "Auto negotiate", "number": "7"}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		print('Response: ',response.status_code,file=f)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2HP-QSVT-LBLV/switchPorts/8'
		print('Building configuration SwitchPort8 switch Q2HP-QSVT-LBLV',file=f)
		f.flush()
		payload = '{"name": "Client / Voice", "tags": null, "enabled": "true", "poeEnabled": "true", "type": "access", "vlan": "999", "voiceVlan": "998", "allowedVlans": "all", "isolationEnabled": "false", "rstpEnabled": "true", "stpGuard": "bpdu guard", "accessPolicyNumber": 1, "linkNegotiation": "Auto negotiate", "number": "8"}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		print('Response: ',response.status_code,file=f)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2HP-QSVT-LBLV/switchPorts/9'
		print('Building configuration SwitchPort9 switch Q2HP-QSVT-LBLV',file=f)
		f.flush()
		payload = '{"name": "802.1X DOWN", "tags": null, "enabled": "true", "poeEnabled": "true", "type": "access", "vlan": "999", "voiceVlan": "998", "allowedVlans": "all", "isolationEnabled": "false", "rstpEnabled": "true", "stpGuard": "bpdu guard", "accessPolicyNumber": 1, "linkNegotiation": "Auto negotiate", "number": "9"}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		print('Response: ',response.status_code,file=f)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2HP-QSVT-LBLV/switchPorts/10'
		print('Building configuration SwitchPort10 switch Q2HP-QSVT-LBLV',file=f)
		f.flush()
		payload = '{"name": "802.1X DOWN", "tags": null, "enabled": "true", "poeEnabled": "true", "type": "access", "vlan": "999", "voiceVlan": "998", "allowedVlans": "all", "isolationEnabled": "false", "rstpEnabled": "true", "stpGuard": "bpdu guard", "accessPolicyNumber": 1, "linkNegotiation": "Auto negotiate", "number": "10"}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		print('Response: ',response.status_code,file=f)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2HP-QSVT-LBLV/switchPorts/11'
		print('Building configuration SwitchPort11 switch Q2HP-QSVT-LBLV',file=f)
		f.flush()
		payload = '{"name": "ASP_Printer", "tags": null, "enabled": "true", "poeEnabled": "true", "type": "access", "vlan": "999", "voiceVlan": "998", "allowedVlans": "all", "isolationEnabled": "false", "rstpEnabled": "true", "stpGuard": "bpdu guard", "accessPolicyNumber": 1, "linkNegotiation": "Auto negotiate", "number": "11"}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		print('Response: ',response.status_code,file=f)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2HP-QSVT-LBLV/switchPorts/12'
		print('Building configuration SwitchPort12 switch Q2HP-QSVT-LBLV',file=f)
		f.flush()
		payload = '{"name": "802.1X DOWN", "tags": null, "enabled": "true", "poeEnabled": "true", "type": "access", "vlan": "999", "voiceVlan": "998", "allowedVlans": "all", "isolationEnabled": "false", "rstpEnabled": "true", "stpGuard": "bpdu guard", "accessPolicyNumber": 1, "linkNegotiation": "Auto negotiate", "number": "12"}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		print('Response: ',response.status_code,file=f)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2HP-QSVT-LBLV/switchPorts/13'
		print('Building configuration SwitchPort13 switch Q2HP-QSVT-LBLV',file=f)
		f.flush()
		payload = '{"name": "802.1X DOWN", "tags": null, "enabled": "true", "poeEnabled": "true", "type": "access", "vlan": "20", "voiceVlan": "998", "allowedVlans": "all", "isolationEnabled": "false", "rstpEnabled": "true", "stpGuard": "bpdu guard", "accessPolicyNumber": null, "linkNegotiation": "Auto negotiate", "number": "13"}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		print('Response: ',response.status_code,file=f)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2HP-QSVT-LBLV/switchPorts/14'
		print('Building configuration SwitchPort14 switch Q2HP-QSVT-LBLV',file=f)
		f.flush()
		payload = '{"name": "Workaround Kamera", "tags": null, "enabled": "true", "poeEnabled": "true", "type": "access", "vlan": "20", "voiceVlan": "998", "allowedVlans": "all", "isolationEnabled": "false", "rstpEnabled": "true", "stpGuard": "bpdu guard", "accessPolicyNumber": null, "linkNegotiation": "Auto negotiate", "number": "14"}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		print('Response: ',response.status_code,file=f)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2HP-QSVT-LBLV/switchPorts/15'
		print('Building configuration SwitchPort15 switch Q2HP-QSVT-LBLV',file=f)
		f.flush()
		payload = '{"name": "Workaround Kamera", "tags": null, "enabled": "true", "poeEnabled": "true", "type": "access", "vlan": "20", "voiceVlan": "998", "allowedVlans": "all", "isolationEnabled": "false", "rstpEnabled": "true", "stpGuard": "bpdu guard", "accessPolicyNumber": null, "linkNegotiation": "Auto negotiate", "number": "15"}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		print('Response: ',response.status_code,file=f)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2HP-QSVT-LBLV/switchPorts/16'
		print('Building configuration SwitchPort16 switch Q2HP-QSVT-LBLV',file=f)
		f.flush()
		payload = '{"name": "Workaround Kamera", "tags": null, "enabled": "true", "poeEnabled": "true", "type": "access", "vlan": "20", "voiceVlan": "998", "allowedVlans": "all", "isolationEnabled": "false", "rstpEnabled": "true", "stpGuard": "bpdu guard", "accessPolicyNumber": null, "linkNegotiation": "Auto negotiate", "number": "16"}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		print('Response: ',response.status_code,file=f)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2HP-QSVT-LBLV/switchPorts/17'
		print('Building configuration SwitchPort17 switch Q2HP-QSVT-LBLV',file=f)
		f.flush()
		payload = '{"name": "ASP_Security", "tags": null, "enabled": "true", "poeEnabled": "true", "type": "access", "vlan": "999", "voiceVlan": "998", "allowedVlans": "all", "isolationEnabled": "false", "rstpEnabled": "true", "stpGuard": "bpdu guard", "accessPolicyNumber": 1, "linkNegotiation": "Auto negotiate", "number": "17"}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		print('Response: ',response.status_code,file=f)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2HP-QSVT-LBLV/switchPorts/18'
		print('Building configuration SwitchPort18 switch Q2HP-QSVT-LBLV',file=f)
		f.flush()
		payload = '{"name": "ASP_Security", "tags": null, "enabled": "true", "poeEnabled": "true", "type": "access", "vlan": "999", "voiceVlan": "998", "allowedVlans": "all", "isolationEnabled": "false", "rstpEnabled": "true", "stpGuard": "bpdu guard", "accessPolicyNumber": 1, "linkNegotiation": "Auto negotiate", "number": "18"}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		print('Response: ',response.status_code,file=f)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2HP-QSVT-LBLV/switchPorts/19'
		print('Building configuration SwitchPort19 switch Q2HP-QSVT-LBLV',file=f)
		f.flush()
		payload = '{"name": "ASP_Security", "tags": null, "enabled": "true", "poeEnabled": "true", "type": "access", "vlan": "999", "voiceVlan": "998", "allowedVlans": "all", "isolationEnabled": "false", "rstpEnabled": "true", "stpGuard": "bpdu guard", "accessPolicyNumber": 1, "linkNegotiation": "Auto negotiate", "number": "19"}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		print('Response: ',response.status_code,file=f)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2HP-QSVT-LBLV/switchPorts/20'
		print('Building configuration SwitchPort20 switch Q2HP-QSVT-LBLV',file=f)
		f.flush()
		payload = '{"name": "ASP_Security", "tags": null, "enabled": "true", "poeEnabled": "true", "type": "access", "vlan": "999", "voiceVlan": "998", "allowedVlans": "all", "isolationEnabled": "false", "rstpEnabled": "true", "stpGuard": "bpdu guard", "accessPolicyNumber": 1, "linkNegotiation": "Auto negotiate", "number": "20"}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		print('Response: ',response.status_code,file=f)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2HP-QSVT-LBLV/switchPorts/21'
		print('Building configuration SwitchPort21 switch Q2HP-QSVT-LBLV',file=f)
		f.flush()
		payload = '{"name": "ASP_Security", "tags": null, "enabled": "true", "poeEnabled": "true", "type": "access", "vlan": "999", "voiceVlan": "998", "allowedVlans": "all", "isolationEnabled": "false", "rstpEnabled": "true", "stpGuard": "bpdu guard", "accessPolicyNumber": 1, "linkNegotiation": "Auto negotiate", "number": "21"}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		print('Response: ',response.status_code,file=f)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2HP-QSVT-LBLV/switchPorts/22'
		print('Building configuration SwitchPort22 switch Q2HP-QSVT-LBLV',file=f)
		f.flush()
		payload = '{"name": "Client / Voice", "tags": null, "enabled": "true", "poeEnabled": "true", "type": "access", "vlan": "999", "voiceVlan": "998", "allowedVlans": "all", "isolationEnabled": "false", "rstpEnabled": "true", "stpGuard": "bpdu guard", "accessPolicyNumber": 1, "linkNegotiation": "Auto negotiate", "number": "22"}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		print('Response: ',response.status_code,file=f)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2HP-QSVT-LBLV/switchPorts/23'
		print('Building configuration SwitchPort23 switch Q2HP-QSVT-LBLV',file=f)
		f.flush()
		payload = '{"name": "Client / Voice", "tags": null, "enabled": "true", "poeEnabled": "true", "type": "access", "vlan": "999", "voiceVlan": "998", "allowedVlans": "all", "isolationEnabled": "false", "rstpEnabled": "true", "stpGuard": "bpdu guard", "accessPolicyNumber": 1, "linkNegotiation": "Auto negotiate", "number": "23"}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		print('Response: ',response.status_code,file=f)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2HP-QSVT-LBLV/switchPorts/24'
		print('Building configuration SwitchPort24 switch Q2HP-QSVT-LBLV',file=f)
		f.flush()
		payload = '{"name": "ASP_Security", "tags": null, "enabled": "true", "poeEnabled": "true", "type": "access", "vlan": "999", "voiceVlan": "998", "allowedVlans": "all", "isolationEnabled": "false", "rstpEnabled": "true", "stpGuard": "bpdu guard", "accessPolicyNumber": 1, "linkNegotiation": "Auto negotiate", "number": "24"}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		print('Response: ',response.status_code,file=f)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2HP-QSVT-LBLV/switchPorts/25'
		print('Building configuration SwitchPort25 switch Q2HP-QSVT-LBLV',file=f)
		f.flush()
		payload = '{"name": "Client / Voice", "tags": null, "enabled": "true", "poeEnabled": "true", "type": "access", "vlan": "999", "voiceVlan": "998", "allowedVlans": "all", "isolationEnabled": "false", "rstpEnabled": "true", "stpGuard": "bpdu guard", "accessPolicyNumber": 1, "linkNegotiation": "Auto negotiate", "number": "25"}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		print('Response: ',response.status_code,file=f)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2HP-QSVT-LBLV/switchPorts/26'
		print('Building configuration SwitchPort26 switch Q2HP-QSVT-LBLV',file=f)
		f.flush()
		payload = '{"name": "Client / Voice", "tags": null, "enabled": "true", "poeEnabled": "true", "type": "access", "vlan": "999", "voiceVlan": "998", "allowedVlans": "all", "isolationEnabled": "false", "rstpEnabled": "true", "stpGuard": "bpdu guard", "accessPolicyNumber": 1, "linkNegotiation": "Auto negotiate", "number": "26"}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		print('Response: ',response.status_code,file=f)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2HP-QSVT-LBLV/switchPorts/27'
		print('Building configuration SwitchPort27 switch Q2HP-QSVT-LBLV',file=f)
		f.flush()
		payload = '{"name": "Client / Voice", "tags": null, "enabled": "true", "poeEnabled": "true", "type": "access", "vlan": "999", "voiceVlan": "998", "allowedVlans": "all", "isolationEnabled": "false", "rstpEnabled": "true", "stpGuard": "bpdu guard", "accessPolicyNumber": 1, "linkNegotiation": "Auto negotiate", "number": "27"}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		print('Response: ',response.status_code,file=f)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2HP-QSVT-LBLV/switchPorts/28'
		print('Building configuration SwitchPort28 switch Q2HP-QSVT-LBLV',file=f)
		f.flush()
		payload = '{"name": "802.1X DOWN", "tags": null, "enabled": "true", "poeEnabled": "true", "type": "access", "vlan": "999", "voiceVlan": "998", "allowedVlans": "all", "isolationEnabled": "false", "rstpEnabled": "true", "stpGuard": "bpdu guard", "accessPolicyNumber": 1, "linkNegotiation": "Auto negotiate", "number": "28"}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		print('Response: ',response.status_code,file=f)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2HP-QSVT-LBLV/switchPorts/29'
		print('Building configuration SwitchPort29 switch Q2HP-QSVT-LBLV',file=f)
		f.flush()
		payload = '{"name": "802.1X DOWN", "tags": null, "enabled": "true", "poeEnabled": "true", "type": "access", "vlan": "999", "voiceVlan": "998", "allowedVlans": "all", "isolationEnabled": "false", "rstpEnabled": "true", "stpGuard": "bpdu guard", "accessPolicyNumber": 1, "linkNegotiation": "Auto negotiate", "number": "29"}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		print('Response: ',response.status_code,file=f)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2HP-QSVT-LBLV/switchPorts/30'
		print('Building configuration SwitchPort30 switch Q2HP-QSVT-LBLV',file=f)
		f.flush()
		payload = '{"name": "Client / Voice", "tags": null, "enabled": "true", "poeEnabled": "true", "type": "access", "vlan": "999", "voiceVlan": "998", "allowedVlans": "all", "isolationEnabled": "false", "rstpEnabled": "true", "stpGuard": "bpdu guard", "accessPolicyNumber": 1, "linkNegotiation": "Auto negotiate", "number": "30"}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		print('Response: ',response.status_code,file=f)
	except requests.exceptions.HTTPError as err:
		print(err,file=f)
		print('There was an error configuring the switchs configuration, check the logs for more details.',file=f)
	print('Switch configuration complete.',file=f)
	f.flush()
	f.close()

