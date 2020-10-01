#!/usr/bin/env python3
#-*- coding: utf-8 -*-
#
#
import os
import argparse
import requests


def build_switchports(ARG_APIKEY):
	abspath = os.path.abspath(__file__)
	log_file = os.path.abspath(__file__  + '/../../logs/log_file.log')
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
		puturl = 'https://api.meraki.com/api/v0/devices/Q2LD-ZWCZ-UA77/switchPorts/1'
		print('Building configuration SwitchPort1 switch Q2LD-ZWCZ-UA77',file=f)
		f.flush()
		payload = '{"name": "802.1X DOWN", "tags": null, "enabled": "true", "poeEnabled": "true", "type": "access", "vlan": "999", "voiceVlan": "998", "allowedVlans": "all", "isolationEnabled": "false", "rstpEnabled": "true", "stpGuard": "bpdu guard", "accessPolicyNumber": 1, "linkNegotiation": "Auto negotiate", "number": "1"}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		print('Response: ',response.status_code,file=f)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2LD-ZWCZ-UA77/switchPorts/2'
		print('Building configuration SwitchPort2 switch Q2LD-ZWCZ-UA77',file=f)
		f.flush()
		payload = '{"name": "802.1X DOWN", "tags": null, "enabled": "true", "poeEnabled": "true", "type": "access", "vlan": "999", "voiceVlan": "998", "allowedVlans": "all", "isolationEnabled": "false", "rstpEnabled": "true", "stpGuard": "bpdu guard", "accessPolicyNumber": 1, "linkNegotiation": "Auto negotiate", "number": "2"}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		print('Response: ',response.status_code,file=f)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2LD-ZWCZ-UA77/switchPorts/3'
		print('Building configuration SwitchPort3 switch Q2LD-ZWCZ-UA77',file=f)
		f.flush()
		payload = '{"name": "802.1X DOWN", "tags": null, "enabled": "true", "poeEnabled": "true", "type": "access", "vlan": "999", "voiceVlan": "998", "allowedVlans": "all", "isolationEnabled": "false", "rstpEnabled": "true", "stpGuard": "bpdu guard", "accessPolicyNumber": 1, "linkNegotiation": "Auto negotiate", "number": "3"}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		print('Response: ',response.status_code,file=f)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2LD-ZWCZ-UA77/switchPorts/4'
		print('Building configuration SwitchPort4 switch Q2LD-ZWCZ-UA77',file=f)
		f.flush()
		payload = '{"name": "Client / Voice", "tags": null, "enabled": "true", "poeEnabled": "true", "type": "access", "vlan": "999", "voiceVlan": "998", "allowedVlans": "all", "isolationEnabled": "false", "rstpEnabled": "true", "stpGuard": "bpdu guard", "accessPolicyNumber": 1, "linkNegotiation": "Auto negotiate", "number": "4"}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		print('Response: ',response.status_code,file=f)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2LD-ZWCZ-UA77/switchPorts/5'
		print('Building configuration SwitchPort5 switch Q2LD-ZWCZ-UA77',file=f)
		f.flush()
		payload = '{"name": "Client / Voice", "tags": null, "enabled": "true", "poeEnabled": "true", "type": "access", "vlan": "999", "voiceVlan": "998", "allowedVlans": "all", "isolationEnabled": "false", "rstpEnabled": "true", "stpGuard": "bpdu guard", "accessPolicyNumber": 1, "linkNegotiation": "Auto negotiate", "number": "5"}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		print('Response: ',response.status_code,file=f)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2LD-ZWCZ-UA77/switchPorts/6'
		print('Building configuration SwitchPort6 switch Q2LD-ZWCZ-UA77',file=f)
		f.flush()
		payload = '{"name": "802.1X DOWN", "tags": null, "enabled": "true", "poeEnabled": "true", "type": "access", "vlan": "999", "voiceVlan": "998", "allowedVlans": "all", "isolationEnabled": "false", "rstpEnabled": "true", "stpGuard": "bpdu guard", "accessPolicyNumber": 1, "linkNegotiation": "Auto negotiate", "number": "6"}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		print('Response: ',response.status_code,file=f)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2LD-ZWCZ-UA77/switchPorts/7'
		print('Building configuration SwitchPort7 switch Q2LD-ZWCZ-UA77',file=f)
		f.flush()
		payload = '{"name": "Client / Voice", "tags": null, "enabled": "true", "poeEnabled": "true", "type": "access", "vlan": "999", "voiceVlan": "998", "allowedVlans": "all", "isolationEnabled": "false", "rstpEnabled": "true", "stpGuard": "bpdu guard", "accessPolicyNumber": 1, "linkNegotiation": "Auto negotiate", "number": "7"}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		print('Response: ',response.status_code,file=f)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2LD-ZWCZ-UA77/switchPorts/8'
		print('Building configuration SwitchPort8 switch Q2LD-ZWCZ-UA77',file=f)
		f.flush()
		payload = '{"name": "Client / Voice", "tags": null, "enabled": "true", "poeEnabled": "true", "type": "access", "vlan": "999", "voiceVlan": "998", "allowedVlans": "all", "isolationEnabled": "false", "rstpEnabled": "true", "stpGuard": "bpdu guard", "accessPolicyNumber": 1, "linkNegotiation": "Auto negotiate", "number": "8"}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		print('Response: ',response.status_code,file=f)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2LD-ZWCZ-UA77/switchPorts/9'
		print('Building configuration SwitchPort9 switch Q2LD-ZWCZ-UA77',file=f)
		f.flush()
		payload = '{"name": "802.1X DOWN", "tags": null, "enabled": "true", "poeEnabled": "true", "type": "access", "vlan": "999", "voiceVlan": "998", "allowedVlans": "all", "isolationEnabled": "false", "rstpEnabled": "true", "stpGuard": "bpdu guard", "accessPolicyNumber": 1, "linkNegotiation": "Auto negotiate", "number": "9"}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		print('Response: ',response.status_code,file=f)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2LD-ZWCZ-UA77/switchPorts/10'
		print('Building configuration SwitchPort10 switch Q2LD-ZWCZ-UA77',file=f)
		f.flush()
		payload = '{"name": "802.1X DOWN", "tags": null, "enabled": "true", "poeEnabled": "true", "type": "access", "vlan": "999", "voiceVlan": "998", "allowedVlans": "all", "isolationEnabled": "false", "rstpEnabled": "true", "stpGuard": "bpdu guard", "accessPolicyNumber": 1, "linkNegotiation": "Auto negotiate", "number": "10"}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		print('Response: ',response.status_code,file=f)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2LD-ZWCZ-UA77/switchPorts/11'
		print('Building configuration SwitchPort11 switch Q2LD-ZWCZ-UA77',file=f)
		f.flush()
		payload = '{"name": "ASP_Printer", "tags": null, "enabled": "true", "poeEnabled": "true", "type": "access", "vlan": "999", "voiceVlan": "998", "allowedVlans": "all", "isolationEnabled": "false", "rstpEnabled": "true", "stpGuard": "bpdu guard", "accessPolicyNumber": 1, "linkNegotiation": "Auto negotiate", "number": "11"}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		print('Response: ',response.status_code,file=f)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2LD-ZWCZ-UA77/switchPorts/12'
		print('Building configuration SwitchPort12 switch Q2LD-ZWCZ-UA77',file=f)
		f.flush()
		payload = '{"name": "802.1X DOWN", "tags": null, "enabled": "true", "poeEnabled": "true", "type": "access", "vlan": "999", "voiceVlan": "998", "allowedVlans": "all", "isolationEnabled": "false", "rstpEnabled": "true", "stpGuard": "bpdu guard", "accessPolicyNumber": 1, "linkNegotiation": "Auto negotiate", "number": "12"}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		print('Response: ',response.status_code,file=f)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2LD-ZWCZ-UA77/switchPorts/13'
		print('Building configuration SwitchPort13 switch Q2LD-ZWCZ-UA77',file=f)
		f.flush()
		payload = '{"name": "802.1X DOWN", "tags": null, "enabled": "true", "poeEnabled": "true", "type": "access", "vlan": "20", "voiceVlan": "998", "allowedVlans": "all", "isolationEnabled": "false", "rstpEnabled": "true", "stpGuard": "bpdu guard", "accessPolicyNumber": null, "linkNegotiation": "Auto negotiate", "number": "13"}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		print('Response: ',response.status_code,file=f)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2LD-ZWCZ-UA77/switchPorts/14'
		print('Building configuration SwitchPort14 switch Q2LD-ZWCZ-UA77',file=f)
		f.flush()
		payload = '{"name": "Workaround Kamera", "tags": null, "enabled": "true", "poeEnabled": "true", "type": "access", "vlan": "20", "voiceVlan": "998", "allowedVlans": "all", "isolationEnabled": "false", "rstpEnabled": "true", "stpGuard": "bpdu guard", "accessPolicyNumber": null, "linkNegotiation": "Auto negotiate", "number": "14"}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		print('Response: ',response.status_code,file=f)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2LD-ZWCZ-UA77/switchPorts/15'
		print('Building configuration SwitchPort15 switch Q2LD-ZWCZ-UA77',file=f)
		f.flush()
		payload = '{"name": "Workaround Kamera", "tags": null, "enabled": "true", "poeEnabled": "true", "type": "access", "vlan": "20", "voiceVlan": "998", "allowedVlans": "all", "isolationEnabled": "false", "rstpEnabled": "true", "stpGuard": "bpdu guard", "accessPolicyNumber": null, "linkNegotiation": "Auto negotiate", "number": "15"}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		print('Response: ',response.status_code,file=f)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2LD-ZWCZ-UA77/switchPorts/16'
		print('Building configuration SwitchPort16 switch Q2LD-ZWCZ-UA77',file=f)
		f.flush()
		payload = '{"name": "Workaround Kamera", "tags": null, "enabled": "true", "poeEnabled": "true", "type": "access", "vlan": "20", "voiceVlan": "998", "allowedVlans": "all", "isolationEnabled": "false", "rstpEnabled": "true", "stpGuard": "bpdu guard", "accessPolicyNumber": null, "linkNegotiation": "Auto negotiate", "number": "16"}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		print('Response: ',response.status_code,file=f)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2LD-ZWCZ-UA77/switchPorts/17'
		print('Building configuration SwitchPort17 switch Q2LD-ZWCZ-UA77',file=f)
		f.flush()
		payload = '{"name": "ASP_Security", "tags": null, "enabled": "true", "poeEnabled": "true", "type": "access", "vlan": "999", "voiceVlan": "998", "allowedVlans": "all", "isolationEnabled": "false", "rstpEnabled": "true", "stpGuard": "bpdu guard", "accessPolicyNumber": 1, "linkNegotiation": "Auto negotiate", "number": "17"}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		print('Response: ',response.status_code,file=f)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2LD-ZWCZ-UA77/switchPorts/18'
		print('Building configuration SwitchPort18 switch Q2LD-ZWCZ-UA77',file=f)
		f.flush()
		payload = '{"name": "ASP_Security", "tags": null, "enabled": "true", "poeEnabled": "true", "type": "access", "vlan": "999", "voiceVlan": "998", "allowedVlans": "all", "isolationEnabled": "false", "rstpEnabled": "true", "stpGuard": "bpdu guard", "accessPolicyNumber": 1, "linkNegotiation": "Auto negotiate", "number": "18"}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		print('Response: ',response.status_code,file=f)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2LD-ZWCZ-UA77/switchPorts/19'
		print('Building configuration SwitchPort19 switch Q2LD-ZWCZ-UA77',file=f)
		f.flush()
		payload = '{"name": "ASP_Security", "tags": null, "enabled": "true", "poeEnabled": "true", "type": "access", "vlan": "999", "voiceVlan": "998", "allowedVlans": "all", "isolationEnabled": "false", "rstpEnabled": "true", "stpGuard": "bpdu guard", "accessPolicyNumber": 1, "linkNegotiation": "Auto negotiate", "number": "19"}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		print('Response: ',response.status_code,file=f)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2LD-ZWCZ-UA77/switchPorts/20'
		print('Building configuration SwitchPort20 switch Q2LD-ZWCZ-UA77',file=f)
		f.flush()
		payload = '{"name": "ASP_Security", "tags": null, "enabled": "true", "poeEnabled": "true", "type": "access", "vlan": "999", "voiceVlan": "998", "allowedVlans": "all", "isolationEnabled": "false", "rstpEnabled": "true", "stpGuard": "bpdu guard", "accessPolicyNumber": 1, "linkNegotiation": "Auto negotiate", "number": "20"}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		print('Response: ',response.status_code,file=f)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2LD-ZWCZ-UA77/switchPorts/21'
		print('Building configuration SwitchPort21 switch Q2LD-ZWCZ-UA77',file=f)
		f.flush()
		payload = '{"name": "ASP_Security", "tags": null, "enabled": "true", "poeEnabled": "true", "type": "access", "vlan": "999", "voiceVlan": "998", "allowedVlans": "all", "isolationEnabled": "false", "rstpEnabled": "true", "stpGuard": "bpdu guard", "accessPolicyNumber": 1, "linkNegotiation": "Auto negotiate", "number": "21"}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		print('Response: ',response.status_code,file=f)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2LD-ZWCZ-UA77/switchPorts/22'
		print('Building configuration SwitchPort22 switch Q2LD-ZWCZ-UA77',file=f)
		f.flush()
		payload = '{"name": "Client / Voice", "tags": null, "enabled": "true", "poeEnabled": "true", "type": "access", "vlan": "999", "voiceVlan": "998", "allowedVlans": "all", "isolationEnabled": "false", "rstpEnabled": "true", "stpGuard": "bpdu guard", "accessPolicyNumber": 1, "linkNegotiation": "Auto negotiate", "number": "22"}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		print('Response: ',response.status_code,file=f)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2LD-ZWCZ-UA77/switchPorts/23'
		print('Building configuration SwitchPort23 switch Q2LD-ZWCZ-UA77',file=f)
		f.flush()
		payload = '{"name": "Client / Voice", "tags": null, "enabled": "true", "poeEnabled": "true", "type": "access", "vlan": "999", "voiceVlan": "998", "allowedVlans": "all", "isolationEnabled": "false", "rstpEnabled": "true", "stpGuard": "bpdu guard", "accessPolicyNumber": 1, "linkNegotiation": "Auto negotiate", "number": "23"}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		print('Response: ',response.status_code,file=f)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2LD-ZWCZ-UA77/switchPorts/24'
		print('Building configuration SwitchPort24 switch Q2LD-ZWCZ-UA77',file=f)
		f.flush()
		payload = '{"name": "ASP_Security", "tags": null, "enabled": "true", "poeEnabled": "true", "type": "access", "vlan": "999", "voiceVlan": "998", "allowedVlans": "all", "isolationEnabled": "false", "rstpEnabled": "true", "stpGuard": "bpdu guard", "accessPolicyNumber": 1, "linkNegotiation": "Auto negotiate", "number": "24"}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		print('Response: ',response.status_code,file=f)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2LD-ZWCZ-UA77/switchPorts/25'
		print('Building configuration SwitchPort25 switch Q2LD-ZWCZ-UA77',file=f)
		f.flush()
		payload = '{"name": "Client / Voice", "tags": null, "enabled": "true", "poeEnabled": "true", "type": "access", "vlan": "999", "voiceVlan": "998", "allowedVlans": "all", "isolationEnabled": "false", "rstpEnabled": "true", "stpGuard": "bpdu guard", "accessPolicyNumber": 1, "linkNegotiation": "Auto negotiate", "number": "25"}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		print('Response: ',response.status_code,file=f)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2LD-ZWCZ-UA77/switchPorts/26'
		print('Building configuration SwitchPort26 switch Q2LD-ZWCZ-UA77',file=f)
		f.flush()
		payload = '{"name": "Client / Voice", "tags": null, "enabled": "true", "poeEnabled": "true", "type": "access", "vlan": "999", "voiceVlan": "998", "allowedVlans": "all", "isolationEnabled": "false", "rstpEnabled": "true", "stpGuard": "bpdu guard", "accessPolicyNumber": 1, "linkNegotiation": "Auto negotiate", "number": "26"}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		print('Response: ',response.status_code,file=f)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2LD-ZWCZ-UA77/switchPorts/27'
		print('Building configuration SwitchPort27 switch Q2LD-ZWCZ-UA77',file=f)
		f.flush()
		payload = '{"name": "Client / Voice", "tags": null, "enabled": "true", "poeEnabled": "true", "type": "access", "vlan": "999", "voiceVlan": "998", "allowedVlans": "all", "isolationEnabled": "false", "rstpEnabled": "true", "stpGuard": "bpdu guard", "accessPolicyNumber": 1, "linkNegotiation": "Auto negotiate", "number": "27"}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		print('Response: ',response.status_code,file=f)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2LD-ZWCZ-UA77/switchPorts/28'
		print('Building configuration SwitchPort28 switch Q2LD-ZWCZ-UA77',file=f)
		f.flush()
		payload = '{"name": "802.1X DOWN", "tags": null, "enabled": "true", "poeEnabled": "true", "type": "access", "vlan": "999", "voiceVlan": "998", "allowedVlans": "all", "isolationEnabled": "false", "rstpEnabled": "true", "stpGuard": "bpdu guard", "accessPolicyNumber": 1, "linkNegotiation": "Auto negotiate", "number": "28"}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		print('Response: ',response.status_code,file=f)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2LD-ZWCZ-UA77/switchPorts/29'
		print('Building configuration SwitchPort29 switch Q2LD-ZWCZ-UA77',file=f)
		f.flush()
		payload = '{"name": "802.1X DOWN", "tags": null, "enabled": "true", "poeEnabled": "true", "type": "access", "vlan": "999", "voiceVlan": "998", "allowedVlans": "all", "isolationEnabled": "false", "rstpEnabled": "true", "stpGuard": "bpdu guard", "accessPolicyNumber": 1, "linkNegotiation": "Auto negotiate", "number": "29"}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		print('Response: ',response.status_code,file=f)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2LD-ZWCZ-UA77/switchPorts/30'
		print('Building configuration SwitchPort30 switch Q2LD-ZWCZ-UA77',file=f)
		f.flush()
		payload = '{"name": "Client / Voice", "tags": null, "enabled": "true", "poeEnabled": "true", "type": "access", "vlan": "999", "voiceVlan": "998", "allowedVlans": "all", "isolationEnabled": "false", "rstpEnabled": "true", "stpGuard": "bpdu guard", "accessPolicyNumber": 1, "linkNegotiation": "Auto negotiate", "number": "30"}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		print('Response: ',response.status_code,file=f)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2LD-ZWCZ-UA77/switchPorts/31'
		print('Building configuration SwitchPort31 switch Q2LD-ZWCZ-UA77',file=f)
		f.flush()
		payload = '{"name": "Client / Voice", "tags": null, "enabled": "true", "poeEnabled": "true", "type": "access", "vlan": "999", "voiceVlan": "998", "allowedVlans": "all", "isolationEnabled": "false", "rstpEnabled": "true", "stpGuard": "bpdu guard", "accessPolicyNumber": 1, "linkNegotiation": "Auto negotiate", "number": "31"}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		print('Response: ',response.status_code,file=f)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2LD-ZWCZ-UA77/switchPorts/32'
		print('Building configuration SwitchPort32 switch Q2LD-ZWCZ-UA77',file=f)
		f.flush()
		payload = '{"name": "802.1X DOWN", "tags": null, "enabled": "true", "poeEnabled": "true", "type": "access", "vlan": "999", "voiceVlan": "998", "allowedVlans": "all", "isolationEnabled": "false", "rstpEnabled": "true", "stpGuard": "bpdu guard", "accessPolicyNumber": 1, "linkNegotiation": "Auto negotiate", "number": "32"}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		print('Response: ',response.status_code,file=f)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2LD-ZWCZ-UA77/switchPorts/33'
		print('Building configuration SwitchPort33 switch Q2LD-ZWCZ-UA77',file=f)
		f.flush()
		payload = '{"name": "ASP_Security", "tags": null, "enabled": "true", "poeEnabled": "true", "type": "access", "vlan": "999", "voiceVlan": "998", "allowedVlans": "all", "isolationEnabled": "false", "rstpEnabled": "true", "stpGuard": "bpdu guard", "accessPolicyNumber": 1, "linkNegotiation": "Auto negotiate", "number": "33"}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		print('Response: ',response.status_code,file=f)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2LD-ZWCZ-UA77/switchPorts/34'
		print('Building configuration SwitchPort34 switch Q2LD-ZWCZ-UA77',file=f)
		f.flush()
		payload = '{"name": "802.1X DOWN", "tags": null, "enabled": "true", "poeEnabled": "true", "type": "access", "vlan": "999", "voiceVlan": "998", "allowedVlans": "all", "isolationEnabled": "false", "rstpEnabled": "true", "stpGuard": "bpdu guard", "accessPolicyNumber": 1, "linkNegotiation": "Auto negotiate", "number": "34"}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		print('Response: ',response.status_code,file=f)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2LD-ZWCZ-UA77/switchPorts/35'
		print('Building configuration SwitchPort35 switch Q2LD-ZWCZ-UA77',file=f)
		f.flush()
		payload = '{"name": "Client / Voice", "tags": null, "enabled": "true", "poeEnabled": "true", "type": "access", "vlan": "999", "voiceVlan": "998", "allowedVlans": "all", "isolationEnabled": "false", "rstpEnabled": "true", "stpGuard": "bpdu guard", "accessPolicyNumber": 1, "linkNegotiation": "Auto negotiate", "number": "35"}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		print('Response: ',response.status_code,file=f)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2LD-ZWCZ-UA77/switchPorts/36'
		print('Building configuration SwitchPort36 switch Q2LD-ZWCZ-UA77',file=f)
		f.flush()
		payload = '{"name": "802.1X DOWN", "tags": null, "enabled": "true", "poeEnabled": "true", "type": "access", "vlan": "999", "voiceVlan": "998", "allowedVlans": "all", "isolationEnabled": "false", "rstpEnabled": "true", "stpGuard": "bpdu guard", "accessPolicyNumber": 1, "linkNegotiation": "Auto negotiate", "number": "36"}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		print('Response: ',response.status_code,file=f)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2LD-ZWCZ-UA77/switchPorts/37'
		print('Building configuration SwitchPort37 switch Q2LD-ZWCZ-UA77',file=f)
		f.flush()
		payload = '{"name": "Client / Voice", "tags": null, "enabled": "true", "poeEnabled": "true", "type": "access", "vlan": "999", "voiceVlan": "998", "allowedVlans": "all", "isolationEnabled": "false", "rstpEnabled": "true", "stpGuard": "bpdu guard", "accessPolicyNumber": 1, "linkNegotiation": "Auto negotiate", "number": "37"}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		print('Response: ',response.status_code,file=f)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2LD-ZWCZ-UA77/switchPorts/38'
		print('Building configuration SwitchPort38 switch Q2LD-ZWCZ-UA77',file=f)
		f.flush()
		payload = '{"name": "802.1X DOWN", "tags": null, "enabled": "true", "poeEnabled": "true", "type": "access", "vlan": "999", "voiceVlan": "998", "allowedVlans": "all", "isolationEnabled": "false", "rstpEnabled": "true", "stpGuard": "bpdu guard", "accessPolicyNumber": 1, "linkNegotiation": "Auto negotiate", "number": "38"}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		print('Response: ',response.status_code,file=f)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2LD-ZWCZ-UA77/switchPorts/39'
		print('Building configuration SwitchPort39 switch Q2LD-ZWCZ-UA77',file=f)
		f.flush()
		payload = '{"name": "UPLINK to DUENET03 - Gi1/0/23", "tags": null, "enabled": "true", "poeEnabled": "true", "type": "trunk", "vlan": 1, "voiceVlan": null, "allowedVlans": "all", "isolationEnabled": "false", "rstpEnabled": "true", "stpGuard": "bpdu guard", "accessPolicyNumber": null, "linkNegotiation": "Auto negotiate", "number": "39"}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		print('Response: ',response.status_code,file=f)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2LD-ZWCZ-UA77/switchPorts/40'
		print('Building configuration SwitchPort40 switch Q2LD-ZWCZ-UA77',file=f)
		f.flush()
		payload = '{"name": "UPLINK to DUENET03 - Gi1/0/24", "tags": null, "enabled": "true", "poeEnabled": "true", "type": "trunk", "vlan": 1, "voiceVlan": null, "allowedVlans": "all", "isolationEnabled": "false", "rstpEnabled": "true", "stpGuard": "bpdu guard", "accessPolicyNumber": null, "linkNegotiation": "Auto negotiate", "number": "40"}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		print('Response: ',response.status_code,file=f)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2LD-ZWCZ-UA77/switchPorts/41'
		print('Building configuration SwitchPort41 switch Q2LD-ZWCZ-UA77',file=f)
		f.flush()
		payload = '{"name": "UPLINK to DUENET04 - Gi1/0/47", "tags": null, "enabled": "true", "poeEnabled": "true", "type": "trunk", "vlan": 1, "voiceVlan": null, "allowedVlans": "all", "isolationEnabled": "false", "rstpEnabled": "true", "stpGuard": "bpdu guard", "accessPolicyNumber": null, "linkNegotiation": "Auto negotiate", "number": "41"}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		print('Response: ',response.status_code,file=f)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2LD-ZWCZ-UA77/switchPorts/42'
		print('Building configuration SwitchPort42 switch Q2LD-ZWCZ-UA77',file=f)
		f.flush()
		payload = '{"name": "UPLINK to DUENET04 - Gi1/0/48", "tags": null, "enabled": "true", "poeEnabled": "true", "type": "trunk", "vlan": 1, "voiceVlan": null, "allowedVlans": "all", "isolationEnabled": "false", "rstpEnabled": "true", "stpGuard": "bpdu guard", "accessPolicyNumber": null, "linkNegotiation": "Auto negotiate", "number": "42"}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		print('Response: ',response.status_code,file=f)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2LD-ZWCZ-UA77/switchPorts/43'
		print('Building configuration SwitchPort43 switch Q2LD-ZWCZ-UA77',file=f)
		f.flush()
		payload = '{"name": "Meraki-AP", "tags": null, "enabled": "true", "poeEnabled": "true", "type": "trunk", "vlan": "100", "voiceVlan": null, "allowedVlans": "10,40,50,60,90-92,100", "isolationEnabled": "false", "rstpEnabled": "true", "stpGuard": "bpdu guard", "accessPolicyNumber": null, "linkNegotiation": "Auto negotiate", "number": "43"}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		print('Response: ',response.status_code,file=f)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2LD-ZWCZ-UA77/switchPorts/44'
		print('Building configuration SwitchPort44 switch Q2LD-ZWCZ-UA77',file=f)
		f.flush()
		payload = '{"name": "Client / Voice", "tags": null, "enabled": "true", "poeEnabled": "true", "type": "access", "vlan": "999", "voiceVlan": "998", "allowedVlans": "10,40,50,60,90-92,100", "isolationEnabled": "false", "rstpEnabled": "true", "stpGuard": "bpdu guard", "accessPolicyNumber": 1, "linkNegotiation": "Auto negotiate", "number": "44"}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		print('Response: ',response.status_code,file=f)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2LD-ZWCZ-UA77/switchPorts/45'
		print('Building configuration SwitchPort45 switch Q2LD-ZWCZ-UA77',file=f)
		f.flush()
		payload = '{"name": "Meraki-AP", "tags": null, "enabled": "true", "poeEnabled": "true", "type": "trunk", "vlan": "100", "voiceVlan": null, "allowedVlans": "10,40,50,60,90-92,100", "isolationEnabled": "false", "rstpEnabled": "true", "stpGuard": "bpdu guard", "accessPolicyNumber": null, "linkNegotiation": "Auto negotiate", "number": "45"}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		print('Response: ',response.status_code,file=f)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2LD-ZWCZ-UA77/switchPorts/46'
		print('Building configuration SwitchPort46 switch Q2LD-ZWCZ-UA77',file=f)
		f.flush()
		payload = '{"name": "802.1X DOWN", "tags": null, "enabled": "true", "poeEnabled": "true", "type": "access", "vlan": "999", "voiceVlan": "998", "allowedVlans": "10,40,50,60,90-92,100", "isolationEnabled": "false", "rstpEnabled": "true", "stpGuard": "bpdu guard", "accessPolicyNumber": 1, "linkNegotiation": "Auto negotiate", "number": "46"}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		print('Response: ',response.status_code,file=f)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2LD-ZWCZ-UA77/switchPorts/47'
		print('Building configuration SwitchPort47 switch Q2LD-ZWCZ-UA77',file=f)
		f.flush()
		payload = '{"name": "Meraki-AP", "tags": null, "enabled": "true", "poeEnabled": "true", "type": "trunk", "vlan": "100", "voiceVlan": null, "allowedVlans": "10,40,50,60,90-92,100", "isolationEnabled": "false", "rstpEnabled": "true", "stpGuard": "bpdu guard", "accessPolicyNumber": null, "linkNegotiation": "Auto negotiate", "number": "47"}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		print('Response: ',response.status_code,file=f)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2LD-ZWCZ-UA77/switchPorts/48'
		print('Building configuration SwitchPort48 switch Q2LD-ZWCZ-UA77',file=f)
		f.flush()
		payload = '{"name": "Client / Voice", "tags": null, "enabled": "true", "poeEnabled": "true", "type": "access", "vlan": "999", "voiceVlan": "998", "allowedVlans": "10,40,50,60,90-92,100", "isolationEnabled": "false", "rstpEnabled": "true", "stpGuard": "bpdu guard", "accessPolicyNumber": 1, "linkNegotiation": "Auto negotiate", "number": "48"}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		print('Response: ',response.status_code,file=f)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2LD-ZWCZ-UA77/switchPorts/49'
		print('Building configuration SwitchPort49 switch Q2LD-ZWCZ-UA77',file=f)
		f.flush()
		payload = '{"name": "*** SFP unused ***", "tags": null, "enabled": "true", "poeEnabled": "true", "type": "trunk", "vlan": 1, "voiceVlan": null, "allowedVlans": "10,40,50,60,90-92,100", "isolationEnabled": "false", "rstpEnabled": "true", "stpGuard": "bpdu guard", "accessPolicyNumber": null, "linkNegotiation": "Auto negotiate", "number": "49"}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		print('Response: ',response.status_code,file=f)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2LD-ZWCZ-UA77/switchPorts/50'
		print('Building configuration SwitchPort50 switch Q2LD-ZWCZ-UA77',file=f)
		f.flush()
		payload = '{"name": "UPLINK to DUENET05 - Gig 1/0/26", "tags": null, "enabled": "true", "poeEnabled": "true", "type": "trunk", "vlan": 1, "voiceVlan": null, "allowedVlans": "10,40,50,60,90-92,100", "isolationEnabled": "false", "rstpEnabled": "true", "stpGuard": "bpdu guard", "accessPolicyNumber": null, "linkNegotiation": "Auto negotiate", "number": "50"}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		print('Response: ',response.status_code,file=f)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2LD-ZWCZ-UA77/switchPorts/51'
		print('Building configuration SwitchPort51 switch Q2LD-ZWCZ-UA77',file=f)
		f.flush()
		payload = '{"name": "*** SFP unused ***", "tags": null, "enabled": "true", "poeEnabled": "true", "type": "trunk", "vlan": 1, "voiceVlan": null, "allowedVlans": "10,40,50,60,90-92,100", "isolationEnabled": "false", "rstpEnabled": "true", "stpGuard": "bpdu guard", "accessPolicyNumber": null, "linkNegotiation": "Auto negotiate", "number": "51"}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		print('Response: ',response.status_code,file=f)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2LD-ZWCZ-UA77/switchPorts/52'
		print('Building configuration SwitchPort52 switch Q2LD-ZWCZ-UA77',file=f)
		f.flush()
		payload = '{"name": "UPLINK to DUENET05 - Gig 1/0/28", "tags": null, "enabled": "true", "poeEnabled": "true", "type": "trunk", "vlan": 1, "voiceVlan": null, "allowedVlans": "10,40,50,60,90-92,100", "isolationEnabled": "false", "rstpEnabled": "true", "stpGuard": "bpdu guard", "accessPolicyNumber": null, "linkNegotiation": "Auto negotiate", "number": "52"}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		print('Response: ',response.status_code,file=f)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2LD-ZWCZ-UA78/switchPorts/1'
		print('Building configuration SwitchPort1 switch Q2LD-ZWCZ-UA78',file=f)
		f.flush()
		payload = '{"name": "802.1X DOWN", "tags": null, "enabled": "true", "poeEnabled": "true", "type": "access", "vlan": "999", "voiceVlan": "998", "allowedVlans": "10,40,50,60,90-92,100", "isolationEnabled": "false", "rstpEnabled": "true", "stpGuard": "bpdu guard", "accessPolicyNumber": 1, "linkNegotiation": "Auto negotiate", "number": "1"}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		print('Response: ',response.status_code,file=f)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2LD-ZWCZ-UA78/switchPorts/2'
		print('Building configuration SwitchPort2 switch Q2LD-ZWCZ-UA78',file=f)
		f.flush()
		payload = '{"name": "802.1X DOWN", "tags": null, "enabled": "true", "poeEnabled": "true", "type": "access", "vlan": "999", "voiceVlan": "998", "allowedVlans": "10,40,50,60,90-92,100", "isolationEnabled": "false", "rstpEnabled": "true", "stpGuard": "bpdu guard", "accessPolicyNumber": 1, "linkNegotiation": "Auto negotiate", "number": "2"}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		print('Response: ',response.status_code,file=f)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2LD-ZWCZ-UA78/switchPorts/3'
		print('Building configuration SwitchPort3 switch Q2LD-ZWCZ-UA78',file=f)
		f.flush()
		payload = '{"name": "802.1X DOWN", "tags": null, "enabled": "true", "poeEnabled": "true", "type": "access", "vlan": "999", "voiceVlan": "998", "allowedVlans": "10,40,50,60,90-92,100", "isolationEnabled": "false", "rstpEnabled": "true", "stpGuard": "bpdu guard", "accessPolicyNumber": 1, "linkNegotiation": "Auto negotiate", "number": "3"}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		print('Response: ',response.status_code,file=f)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2LD-ZWCZ-UA78/switchPorts/4'
		print('Building configuration SwitchPort4 switch Q2LD-ZWCZ-UA78',file=f)
		f.flush()
		payload = '{"name": "Client / Voice", "tags": null, "enabled": "true", "poeEnabled": "true", "type": "access", "vlan": "999", "voiceVlan": "998", "allowedVlans": "10,40,50,60,90-92,100", "isolationEnabled": "false", "rstpEnabled": "true", "stpGuard": "bpdu guard", "accessPolicyNumber": 1, "linkNegotiation": "Auto negotiate", "number": "4"}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		print('Response: ',response.status_code,file=f)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2LD-ZWCZ-UA78/switchPorts/5'
		print('Building configuration SwitchPort5 switch Q2LD-ZWCZ-UA78',file=f)
		f.flush()
		payload = '{"name": "Client / Voice", "tags": null, "enabled": "true", "poeEnabled": "true", "type": "access", "vlan": "999", "voiceVlan": "998", "allowedVlans": "10,40,50,60,90-92,100", "isolationEnabled": "false", "rstpEnabled": "true", "stpGuard": "bpdu guard", "accessPolicyNumber": 1, "linkNegotiation": "Auto negotiate", "number": "5"}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		print('Response: ',response.status_code,file=f)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2LD-ZWCZ-UA78/switchPorts/6'
		print('Building configuration SwitchPort6 switch Q2LD-ZWCZ-UA78',file=f)
		f.flush()
		payload = '{"name": "802.1X DOWN", "tags": null, "enabled": "true", "poeEnabled": "true", "type": "access", "vlan": "999", "voiceVlan": "998", "allowedVlans": "10,40,50,60,90-92,100", "isolationEnabled": "false", "rstpEnabled": "true", "stpGuard": "bpdu guard", "accessPolicyNumber": 1, "linkNegotiation": "Auto negotiate", "number": "6"}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		print('Response: ',response.status_code,file=f)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2LD-ZWCZ-UA78/switchPorts/7'
		print('Building configuration SwitchPort7 switch Q2LD-ZWCZ-UA78',file=f)
		f.flush()
		payload = '{"name": "Client / Voice", "tags": null, "enabled": "true", "poeEnabled": "true", "type": "access", "vlan": "999", "voiceVlan": "998", "allowedVlans": "10,40,50,60,90-92,100", "isolationEnabled": "false", "rstpEnabled": "true", "stpGuard": "bpdu guard", "accessPolicyNumber": 1, "linkNegotiation": "Auto negotiate", "number": "7"}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		print('Response: ',response.status_code,file=f)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2LD-ZWCZ-UA78/switchPorts/8'
		print('Building configuration SwitchPort8 switch Q2LD-ZWCZ-UA78',file=f)
		f.flush()
		payload = '{"name": "Client / Voice", "tags": null, "enabled": "true", "poeEnabled": "true", "type": "access", "vlan": "999", "voiceVlan": "998", "allowedVlans": "10,40,50,60,90-92,100", "isolationEnabled": "false", "rstpEnabled": "true", "stpGuard": "bpdu guard", "accessPolicyNumber": 1, "linkNegotiation": "Auto negotiate", "number": "8"}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		print('Response: ',response.status_code,file=f)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2LD-ZWCZ-UA78/switchPorts/9'
		print('Building configuration SwitchPort9 switch Q2LD-ZWCZ-UA78',file=f)
		f.flush()
		payload = '{"name": "802.1X DOWN", "tags": null, "enabled": "true", "poeEnabled": "true", "type": "access", "vlan": "999", "voiceVlan": "998", "allowedVlans": "10,40,50,60,90-92,100", "isolationEnabled": "false", "rstpEnabled": "true", "stpGuard": "bpdu guard", "accessPolicyNumber": 1, "linkNegotiation": "Auto negotiate", "number": "9"}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		print('Response: ',response.status_code,file=f)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2LD-ZWCZ-UA78/switchPorts/10'
		print('Building configuration SwitchPort10 switch Q2LD-ZWCZ-UA78',file=f)
		f.flush()
		payload = '{"name": "802.1X DOWN", "tags": null, "enabled": "true", "poeEnabled": "true", "type": "access", "vlan": "999", "voiceVlan": "998", "allowedVlans": "10,40,50,60,90-92,100", "isolationEnabled": "false", "rstpEnabled": "true", "stpGuard": "bpdu guard", "accessPolicyNumber": 1, "linkNegotiation": "Auto negotiate", "number": "10"}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		print('Response: ',response.status_code,file=f)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2LD-ZWCZ-UA78/switchPorts/11'
		print('Building configuration SwitchPort11 switch Q2LD-ZWCZ-UA78',file=f)
		f.flush()
		payload = '{"name": "ASP_Printer", "tags": null, "enabled": "true", "poeEnabled": "true", "type": "access", "vlan": "999", "voiceVlan": "998", "allowedVlans": "10,40,50,60,90-92,100", "isolationEnabled": "false", "rstpEnabled": "true", "stpGuard": "bpdu guard", "accessPolicyNumber": 1, "linkNegotiation": "Auto negotiate", "number": "11"}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		print('Response: ',response.status_code,file=f)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2LD-ZWCZ-UA78/switchPorts/12'
		print('Building configuration SwitchPort12 switch Q2LD-ZWCZ-UA78',file=f)
		f.flush()
		payload = '{"name": "802.1X DOWN", "tags": null, "enabled": "true", "poeEnabled": "true", "type": "access", "vlan": "999", "voiceVlan": "998", "allowedVlans": "10,40,50,60,90-92,100", "isolationEnabled": "false", "rstpEnabled": "true", "stpGuard": "bpdu guard", "accessPolicyNumber": 1, "linkNegotiation": "Auto negotiate", "number": "12"}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		print('Response: ',response.status_code,file=f)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2LD-ZWCZ-UA78/switchPorts/13'
		print('Building configuration SwitchPort13 switch Q2LD-ZWCZ-UA78',file=f)
		f.flush()
		payload = '{"name": "802.1X DOWN", "tags": null, "enabled": "true", "poeEnabled": "true", "type": "access", "vlan": "20", "voiceVlan": "998", "allowedVlans": "10,40,50,60,90-92,100", "isolationEnabled": "false", "rstpEnabled": "true", "stpGuard": "bpdu guard", "accessPolicyNumber": null, "linkNegotiation": "Auto negotiate", "number": "13"}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		print('Response: ',response.status_code,file=f)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2LD-ZWCZ-UA78/switchPorts/14'
		print('Building configuration SwitchPort14 switch Q2LD-ZWCZ-UA78',file=f)
		f.flush()
		payload = '{"name": "Workaround Kamera", "tags": null, "enabled": "true", "poeEnabled": "true", "type": "access", "vlan": "20", "voiceVlan": "998", "allowedVlans": "10,40,50,60,90-92,100", "isolationEnabled": "false", "rstpEnabled": "true", "stpGuard": "bpdu guard", "accessPolicyNumber": null, "linkNegotiation": "Auto negotiate", "number": "14"}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		print('Response: ',response.status_code,file=f)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2LD-ZWCZ-UA78/switchPorts/15'
		print('Building configuration SwitchPort15 switch Q2LD-ZWCZ-UA78',file=f)
		f.flush()
		payload = '{"name": "Workaround Kamera", "tags": null, "enabled": "true", "poeEnabled": "true", "type": "access", "vlan": "20", "voiceVlan": "998", "allowedVlans": "10,40,50,60,90-92,100", "isolationEnabled": "false", "rstpEnabled": "true", "stpGuard": "bpdu guard", "accessPolicyNumber": null, "linkNegotiation": "Auto negotiate", "number": "15"}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		print('Response: ',response.status_code,file=f)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2LD-ZWCZ-UA78/switchPorts/16'
		print('Building configuration SwitchPort16 switch Q2LD-ZWCZ-UA78',file=f)
		f.flush()
		payload = '{"name": "Workaround Kamera", "tags": null, "enabled": "true", "poeEnabled": "true", "type": "access", "vlan": "20", "voiceVlan": "998", "allowedVlans": "10,40,50,60,90-92,100", "isolationEnabled": "false", "rstpEnabled": "true", "stpGuard": "bpdu guard", "accessPolicyNumber": null, "linkNegotiation": "Auto negotiate", "number": "16"}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		print('Response: ',response.status_code,file=f)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2LD-ZWCZ-UA78/switchPorts/17'
		print('Building configuration SwitchPort17 switch Q2LD-ZWCZ-UA78',file=f)
		f.flush()
		payload = '{"name": "ASP_Security", "tags": null, "enabled": "true", "poeEnabled": "true", "type": "access", "vlan": "999", "voiceVlan": "998", "allowedVlans": "10,40,50,60,90-92,100", "isolationEnabled": "false", "rstpEnabled": "true", "stpGuard": "bpdu guard", "accessPolicyNumber": 1, "linkNegotiation": "Auto negotiate", "number": "17"}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		print('Response: ',response.status_code,file=f)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2LD-ZWCZ-UA78/switchPorts/18'
		print('Building configuration SwitchPort18 switch Q2LD-ZWCZ-UA78',file=f)
		f.flush()
		payload = '{"name": "ASP_Security", "tags": null, "enabled": "true", "poeEnabled": "true", "type": "access", "vlan": "999", "voiceVlan": "998", "allowedVlans": "10,40,50,60,90-92,100", "isolationEnabled": "false", "rstpEnabled": "true", "stpGuard": "bpdu guard", "accessPolicyNumber": 1, "linkNegotiation": "Auto negotiate", "number": "18"}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		print('Response: ',response.status_code,file=f)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2LD-ZWCZ-UA78/switchPorts/19'
		print('Building configuration SwitchPort19 switch Q2LD-ZWCZ-UA78',file=f)
		f.flush()
		payload = '{"name": "ASP_Security", "tags": null, "enabled": "true", "poeEnabled": "true", "type": "access", "vlan": "999", "voiceVlan": "998", "allowedVlans": "10,40,50,60,90-92,100", "isolationEnabled": "false", "rstpEnabled": "true", "stpGuard": "bpdu guard", "accessPolicyNumber": 1, "linkNegotiation": "Auto negotiate", "number": "19"}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		print('Response: ',response.status_code,file=f)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2LD-ZWCZ-UA78/switchPorts/20'
		print('Building configuration SwitchPort20 switch Q2LD-ZWCZ-UA78',file=f)
		f.flush()
		payload = '{"name": "ASP_Security", "tags": null, "enabled": "true", "poeEnabled": "true", "type": "access", "vlan": "999", "voiceVlan": "998", "allowedVlans": "10,40,50,60,90-92,100", "isolationEnabled": "false", "rstpEnabled": "true", "stpGuard": "bpdu guard", "accessPolicyNumber": 1, "linkNegotiation": "Auto negotiate", "number": "20"}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		print('Response: ',response.status_code,file=f)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2LD-ZWCZ-UA78/switchPorts/21'
		print('Building configuration SwitchPort21 switch Q2LD-ZWCZ-UA78',file=f)
		f.flush()
		payload = '{"name": "ASP_Security", "tags": null, "enabled": "true", "poeEnabled": "true", "type": "access", "vlan": "999", "voiceVlan": "998", "allowedVlans": "10,40,50,60,90-92,100", "isolationEnabled": "false", "rstpEnabled": "true", "stpGuard": "bpdu guard", "accessPolicyNumber": 1, "linkNegotiation": "Auto negotiate", "number": "21"}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		print('Response: ',response.status_code,file=f)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2LD-ZWCZ-UA78/switchPorts/22'
		print('Building configuration SwitchPort22 switch Q2LD-ZWCZ-UA78',file=f)
		f.flush()
		payload = '{"name": "Client / Voice", "tags": null, "enabled": "true", "poeEnabled": "true", "type": "access", "vlan": "999", "voiceVlan": "998", "allowedVlans": "10,40,50,60,90-92,100", "isolationEnabled": "false", "rstpEnabled": "true", "stpGuard": "bpdu guard", "accessPolicyNumber": 1, "linkNegotiation": "Auto negotiate", "number": "22"}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		print('Response: ',response.status_code,file=f)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2LD-ZWCZ-UA78/switchPorts/23'
		print('Building configuration SwitchPort23 switch Q2LD-ZWCZ-UA78',file=f)
		f.flush()
		payload = '{"name": "Client / Voice", "tags": null, "enabled": "true", "poeEnabled": "true", "type": "access", "vlan": "999", "voiceVlan": "998", "allowedVlans": "10,40,50,60,90-92,100", "isolationEnabled": "false", "rstpEnabled": "true", "stpGuard": "bpdu guard", "accessPolicyNumber": 1, "linkNegotiation": "Auto negotiate", "number": "23"}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		print('Response: ',response.status_code,file=f)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2LD-ZWCZ-UA78/switchPorts/24'
		print('Building configuration SwitchPort24 switch Q2LD-ZWCZ-UA78',file=f)
		f.flush()
		payload = '{"name": "ASP_Security", "tags": null, "enabled": "true", "poeEnabled": "true", "type": "access", "vlan": "999", "voiceVlan": "998", "allowedVlans": "10,40,50,60,90-92,100", "isolationEnabled": "false", "rstpEnabled": "true", "stpGuard": "bpdu guard", "accessPolicyNumber": 1, "linkNegotiation": "Auto negotiate", "number": "24"}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		print('Response: ',response.status_code,file=f)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2LD-ZWCZ-UA78/switchPorts/25'
		print('Building configuration SwitchPort25 switch Q2LD-ZWCZ-UA78',file=f)
		f.flush()
		payload = '{"name": "Client / Voice", "tags": null, "enabled": "true", "poeEnabled": "true", "type": "access", "vlan": "999", "voiceVlan": "998", "allowedVlans": "10,40,50,60,90-92,100", "isolationEnabled": "false", "rstpEnabled": "true", "stpGuard": "bpdu guard", "accessPolicyNumber": 1, "linkNegotiation": "Auto negotiate", "number": "25"}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		print('Response: ',response.status_code,file=f)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2LD-ZWCZ-UA78/switchPorts/26'
		print('Building configuration SwitchPort26 switch Q2LD-ZWCZ-UA78',file=f)
		f.flush()
		payload = '{"name": "Client / Voice", "tags": null, "enabled": "true", "poeEnabled": "true", "type": "access", "vlan": "999", "voiceVlan": "998", "allowedVlans": "10,40,50,60,90-92,100", "isolationEnabled": "false", "rstpEnabled": "true", "stpGuard": "bpdu guard", "accessPolicyNumber": 1, "linkNegotiation": "Auto negotiate", "number": "26"}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		print('Response: ',response.status_code,file=f)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2LD-ZWCZ-UA78/switchPorts/27'
		print('Building configuration SwitchPort27 switch Q2LD-ZWCZ-UA78',file=f)
		f.flush()
		payload = '{"name": "Client / Voice", "tags": null, "enabled": "true", "poeEnabled": "true", "type": "access", "vlan": "999", "voiceVlan": "998", "allowedVlans": "10,40,50,60,90-92,100", "isolationEnabled": "false", "rstpEnabled": "true", "stpGuard": "bpdu guard", "accessPolicyNumber": 1, "linkNegotiation": "Auto negotiate", "number": "27"}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		print('Response: ',response.status_code,file=f)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2LD-ZWCZ-UA78/switchPorts/28'
		print('Building configuration SwitchPort28 switch Q2LD-ZWCZ-UA78',file=f)
		f.flush()
		payload = '{"name": "802.1X DOWN", "tags": null, "enabled": "true", "poeEnabled": "true", "type": "access", "vlan": "999", "voiceVlan": "998", "allowedVlans": "10,40,50,60,90-92,100", "isolationEnabled": "false", "rstpEnabled": "true", "stpGuard": "bpdu guard", "accessPolicyNumber": 1, "linkNegotiation": "Auto negotiate", "number": "28"}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		print('Response: ',response.status_code,file=f)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2LD-ZWCZ-UA78/switchPorts/29'
		print('Building configuration SwitchPort29 switch Q2LD-ZWCZ-UA78',file=f)
		f.flush()
		payload = '{"name": "802.1X DOWN", "tags": null, "enabled": "true", "poeEnabled": "true", "type": "access", "vlan": "999", "voiceVlan": "998", "allowedVlans": "10,40,50,60,90-92,100", "isolationEnabled": "false", "rstpEnabled": "true", "stpGuard": "bpdu guard", "accessPolicyNumber": 1, "linkNegotiation": "Auto negotiate", "number": "29"}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		print('Response: ',response.status_code,file=f)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2LD-ZWCZ-UA78/switchPorts/30'
		print('Building configuration SwitchPort30 switch Q2LD-ZWCZ-UA78',file=f)
		f.flush()
		payload = '{"name": "Client / Voice", "tags": null, "enabled": "true", "poeEnabled": "true", "type": "access", "vlan": "999", "voiceVlan": "998", "allowedVlans": "10,40,50,60,90-92,100", "isolationEnabled": "false", "rstpEnabled": "true", "stpGuard": "bpdu guard", "accessPolicyNumber": 1, "linkNegotiation": "Auto negotiate", "number": "30"}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		print('Response: ',response.status_code,file=f)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2LD-ZWCZ-UA78/switchPorts/31'
		print('Building configuration SwitchPort31 switch Q2LD-ZWCZ-UA78',file=f)
		f.flush()
		payload = '{"name": "Client / Voice", "tags": null, "enabled": "true", "poeEnabled": "true", "type": "access", "vlan": "999", "voiceVlan": "998", "allowedVlans": "10,40,50,60,90-92,100", "isolationEnabled": "false", "rstpEnabled": "true", "stpGuard": "bpdu guard", "accessPolicyNumber": 1, "linkNegotiation": "Auto negotiate", "number": "31"}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		print('Response: ',response.status_code,file=f)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2LD-ZWCZ-UA78/switchPorts/32'
		print('Building configuration SwitchPort32 switch Q2LD-ZWCZ-UA78',file=f)
		f.flush()
		payload = '{"name": "802.1X DOWN", "tags": null, "enabled": "true", "poeEnabled": "true", "type": "access", "vlan": "999", "voiceVlan": "998", "allowedVlans": "10,40,50,60,90-92,100", "isolationEnabled": "false", "rstpEnabled": "true", "stpGuard": "bpdu guard", "accessPolicyNumber": 1, "linkNegotiation": "Auto negotiate", "number": "32"}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		print('Response: ',response.status_code,file=f)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2LD-ZWCZ-UA78/switchPorts/33'
		print('Building configuration SwitchPort33 switch Q2LD-ZWCZ-UA78',file=f)
		f.flush()
		payload = '{"name": "ASP_Security", "tags": null, "enabled": "true", "poeEnabled": "true", "type": "access", "vlan": "999", "voiceVlan": "998", "allowedVlans": "10,40,50,60,90-92,100", "isolationEnabled": "false", "rstpEnabled": "true", "stpGuard": "bpdu guard", "accessPolicyNumber": 1, "linkNegotiation": "Auto negotiate", "number": "33"}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		print('Response: ',response.status_code,file=f)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2LD-ZWCZ-UA78/switchPorts/34'
		print('Building configuration SwitchPort34 switch Q2LD-ZWCZ-UA78',file=f)
		f.flush()
		payload = '{"name": "802.1X DOWN", "tags": null, "enabled": "true", "poeEnabled": "true", "type": "access", "vlan": "999", "voiceVlan": "998", "allowedVlans": "10,40,50,60,90-92,100", "isolationEnabled": "false", "rstpEnabled": "true", "stpGuard": "bpdu guard", "accessPolicyNumber": 1, "linkNegotiation": "Auto negotiate", "number": "34"}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		print('Response: ',response.status_code,file=f)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2LD-ZWCZ-UA78/switchPorts/35'
		print('Building configuration SwitchPort35 switch Q2LD-ZWCZ-UA78',file=f)
		f.flush()
		payload = '{"name": "Client / Voice", "tags": null, "enabled": "true", "poeEnabled": "true", "type": "access", "vlan": "999", "voiceVlan": "998", "allowedVlans": "10,40,50,60,90-92,100", "isolationEnabled": "false", "rstpEnabled": "true", "stpGuard": "bpdu guard", "accessPolicyNumber": 1, "linkNegotiation": "Auto negotiate", "number": "35"}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		print('Response: ',response.status_code,file=f)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2LD-ZWCZ-UA78/switchPorts/36'
		print('Building configuration SwitchPort36 switch Q2LD-ZWCZ-UA78',file=f)
		f.flush()
		payload = '{"name": "802.1X DOWN", "tags": null, "enabled": "true", "poeEnabled": "true", "type": "access", "vlan": "999", "voiceVlan": "998", "allowedVlans": "10,40,50,60,90-92,100", "isolationEnabled": "false", "rstpEnabled": "true", "stpGuard": "bpdu guard", "accessPolicyNumber": 1, "linkNegotiation": "Auto negotiate", "number": "36"}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		print('Response: ',response.status_code,file=f)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2LD-ZWCZ-UA78/switchPorts/37'
		print('Building configuration SwitchPort37 switch Q2LD-ZWCZ-UA78',file=f)
		f.flush()
		payload = '{"name": "Client / Voice", "tags": null, "enabled": "true", "poeEnabled": "true", "type": "access", "vlan": "999", "voiceVlan": "998", "allowedVlans": "10,40,50,60,90-92,100", "isolationEnabled": "false", "rstpEnabled": "true", "stpGuard": "bpdu guard", "accessPolicyNumber": 1, "linkNegotiation": "Auto negotiate", "number": "37"}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		print('Response: ',response.status_code,file=f)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2LD-ZWCZ-UA78/switchPorts/38'
		print('Building configuration SwitchPort38 switch Q2LD-ZWCZ-UA78',file=f)
		f.flush()
		payload = '{"name": "802.1X DOWN", "tags": null, "enabled": "true", "poeEnabled": "true", "type": "access", "vlan": "999", "voiceVlan": "998", "allowedVlans": "10,40,50,60,90-92,100", "isolationEnabled": "false", "rstpEnabled": "true", "stpGuard": "bpdu guard", "accessPolicyNumber": 1, "linkNegotiation": "Auto negotiate", "number": "38"}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		print('Response: ',response.status_code,file=f)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2LD-ZWCZ-UA78/switchPorts/39'
		print('Building configuration SwitchPort39 switch Q2LD-ZWCZ-UA78',file=f)
		f.flush()
		payload = '{"name": "UPLINK to DUENET03 - Gi1/0/23", "tags": null, "enabled": "true", "poeEnabled": "true", "type": "trunk", "vlan": 1, "voiceVlan": null, "allowedVlans": "10,40,50,60,90-92,100", "isolationEnabled": "false", "rstpEnabled": "true", "stpGuard": "bpdu guard", "accessPolicyNumber": null, "linkNegotiation": "Auto negotiate", "number": "39"}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		print('Response: ',response.status_code,file=f)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2LD-ZWCZ-UA78/switchPorts/40'
		print('Building configuration SwitchPort40 switch Q2LD-ZWCZ-UA78',file=f)
		f.flush()
		payload = '{"name": "UPLINK to DUENET03 - Gi1/0/24", "tags": null, "enabled": "true", "poeEnabled": "true", "type": "trunk", "vlan": 1, "voiceVlan": null, "allowedVlans": "10,40,50,60,90-92,100", "isolationEnabled": "false", "rstpEnabled": "true", "stpGuard": "bpdu guard", "accessPolicyNumber": null, "linkNegotiation": "Auto negotiate", "number": "40"}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		print('Response: ',response.status_code,file=f)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2LD-ZWCZ-UA78/switchPorts/41'
		print('Building configuration SwitchPort41 switch Q2LD-ZWCZ-UA78',file=f)
		f.flush()
		payload = '{"name": "UPLINK to DUENET04 - Gi1/0/47", "tags": null, "enabled": "true", "poeEnabled": "true", "type": "trunk", "vlan": 1, "voiceVlan": null, "allowedVlans": "10,40,50,60,90-92,100", "isolationEnabled": "false", "rstpEnabled": "true", "stpGuard": "bpdu guard", "accessPolicyNumber": null, "linkNegotiation": "Auto negotiate", "number": "41"}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		print('Response: ',response.status_code,file=f)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2LD-ZWCZ-UA78/switchPorts/42'
		print('Building configuration SwitchPort42 switch Q2LD-ZWCZ-UA78',file=f)
		f.flush()
		payload = '{"name": "UPLINK to DUENET04 - Gi1/0/48", "tags": null, "enabled": "true", "poeEnabled": "true", "type": "trunk", "vlan": 1, "voiceVlan": null, "allowedVlans": "10,40,50,60,90-92,100", "isolationEnabled": "false", "rstpEnabled": "true", "stpGuard": "bpdu guard", "accessPolicyNumber": null, "linkNegotiation": "Auto negotiate", "number": "42"}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		print('Response: ',response.status_code,file=f)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2LD-ZWCZ-UA78/switchPorts/43'
		print('Building configuration SwitchPort43 switch Q2LD-ZWCZ-UA78',file=f)
		f.flush()
		payload = '{"name": "Meraki-AP", "tags": null, "enabled": "true", "poeEnabled": "true", "type": "trunk", "vlan": "100", "voiceVlan": null, "allowedVlans": "10,40,50,60,90-92,100", "isolationEnabled": "false", "rstpEnabled": "true", "stpGuard": "bpdu guard", "accessPolicyNumber": null, "linkNegotiation": "Auto negotiate", "number": "43"}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		print('Response: ',response.status_code,file=f)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2LD-ZWCZ-UA78/switchPorts/44'
		print('Building configuration SwitchPort44 switch Q2LD-ZWCZ-UA78',file=f)
		f.flush()
		payload = '{"name": "Client / Voice", "tags": null, "enabled": "true", "poeEnabled": "true", "type": "access", "vlan": "999", "voiceVlan": "998", "allowedVlans": "10,40,50,60,90-92,100", "isolationEnabled": "false", "rstpEnabled": "true", "stpGuard": "bpdu guard", "accessPolicyNumber": 1, "linkNegotiation": "Auto negotiate", "number": "44"}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		print('Response: ',response.status_code,file=f)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2LD-ZWCZ-UA78/switchPorts/45'
		print('Building configuration SwitchPort45 switch Q2LD-ZWCZ-UA78',file=f)
		f.flush()
		payload = '{"name": "Meraki-AP", "tags": null, "enabled": "true", "poeEnabled": "true", "type": "trunk", "vlan": "100", "voiceVlan": null, "allowedVlans": "10,40,50,60,90-92,100", "isolationEnabled": "false", "rstpEnabled": "true", "stpGuard": "bpdu guard", "accessPolicyNumber": null, "linkNegotiation": "Auto negotiate", "number": "45"}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		print('Response: ',response.status_code,file=f)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2LD-ZWCZ-UA78/switchPorts/46'
		print('Building configuration SwitchPort46 switch Q2LD-ZWCZ-UA78',file=f)
		f.flush()
		payload = '{"name": "802.1X DOWN", "tags": null, "enabled": "true", "poeEnabled": "true", "type": "access", "vlan": "999", "voiceVlan": "998", "allowedVlans": "10,40,50,60,90-92,100", "isolationEnabled": "false", "rstpEnabled": "true", "stpGuard": "bpdu guard", "accessPolicyNumber": 1, "linkNegotiation": "Auto negotiate", "number": "46"}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		print('Response: ',response.status_code,file=f)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2LD-ZWCZ-UA78/switchPorts/47'
		print('Building configuration SwitchPort47 switch Q2LD-ZWCZ-UA78',file=f)
		f.flush()
		payload = '{"name": "Meraki-AP", "tags": null, "enabled": "true", "poeEnabled": "true", "type": "trunk", "vlan": "100", "voiceVlan": null, "allowedVlans": "10,40,50,60,90-92,100", "isolationEnabled": "false", "rstpEnabled": "true", "stpGuard": "bpdu guard", "accessPolicyNumber": null, "linkNegotiation": "Auto negotiate", "number": "47"}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		print('Response: ',response.status_code,file=f)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2LD-ZWCZ-UA78/switchPorts/48'
		print('Building configuration SwitchPort48 switch Q2LD-ZWCZ-UA78',file=f)
		f.flush()
		payload = '{"name": "Client / Voice", "tags": null, "enabled": "true", "poeEnabled": "true", "type": "access", "vlan": "999", "voiceVlan": "998", "allowedVlans": "10,40,50,60,90-92,100", "isolationEnabled": "false", "rstpEnabled": "true", "stpGuard": "bpdu guard", "accessPolicyNumber": 1, "linkNegotiation": "Auto negotiate", "number": "48"}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		print('Response: ',response.status_code,file=f)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2LD-ZWCZ-UA78/switchPorts/49'
		print('Building configuration SwitchPort49 switch Q2LD-ZWCZ-UA78',file=f)
		f.flush()
		payload = '{"name": "*** SFP unused ***", "tags": null, "enabled": "true", "poeEnabled": "true", "type": "trunk", "vlan": 1, "voiceVlan": null, "allowedVlans": "10,40,50,60,90-92,100", "isolationEnabled": "false", "rstpEnabled": "true", "stpGuard": "bpdu guard", "accessPolicyNumber": null, "linkNegotiation": "Auto negotiate", "number": "49"}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		print('Response: ',response.status_code,file=f)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2LD-ZWCZ-UA78/switchPorts/50'
		print('Building configuration SwitchPort50 switch Q2LD-ZWCZ-UA78',file=f)
		f.flush()
		payload = '{"name": "UPLINK to DUENET05 - Gig 1/0/26", "tags": null, "enabled": "true", "poeEnabled": "true", "type": "trunk", "vlan": 1, "voiceVlan": null, "allowedVlans": "10,40,50,60,90-92,100", "isolationEnabled": "false", "rstpEnabled": "true", "stpGuard": "bpdu guard", "accessPolicyNumber": null, "linkNegotiation": "Auto negotiate", "number": "50"}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		print('Response: ',response.status_code,file=f)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2LD-ZWCZ-UA78/switchPorts/51'
		print('Building configuration SwitchPort51 switch Q2LD-ZWCZ-UA78',file=f)
		f.flush()
		payload = '{"name": "*** SFP unused ***", "tags": null, "enabled": "true", "poeEnabled": "true", "type": "trunk", "vlan": 1, "voiceVlan": null, "allowedVlans": "10,40,50,60,90-92,100", "isolationEnabled": "false", "rstpEnabled": "true", "stpGuard": "bpdu guard", "accessPolicyNumber": null, "linkNegotiation": "Auto negotiate", "number": "51"}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		print('Response: ',response.status_code,file=f)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2LD-ZWCZ-UA78/switchPorts/52'
		print('Building configuration SwitchPort52 switch Q2LD-ZWCZ-UA78',file=f)
		f.flush()
		payload = '{"name": "UPLINK to DUENET05 - Gig 1/0/28", "tags": null, "enabled": "true", "poeEnabled": "true", "type": "trunk", "vlan": 1, "voiceVlan": null, "allowedVlans": "10,40,50,60,90-92,100", "isolationEnabled": "false", "rstpEnabled": "true", "stpGuard": "bpdu guard", "accessPolicyNumber": null, "linkNegotiation": "Auto negotiate", "number": "52"}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		print('Response: ',response.status_code,file=f)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2LD-ZWCZ-UA79/switchPorts/1'
		print('Building configuration SwitchPort1 switch Q2LD-ZWCZ-UA79',file=f)
		f.flush()
		payload = '{"name": "802.1X DOWN", "tags": null, "enabled": "true", "poeEnabled": "true", "type": "access", "vlan": "999", "voiceVlan": "998", "allowedVlans": "10,40,50,60,90-92,100", "isolationEnabled": "false", "rstpEnabled": "true", "stpGuard": "bpdu guard", "accessPolicyNumber": 1, "linkNegotiation": "Auto negotiate", "number": "1"}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		print('Response: ',response.status_code,file=f)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2LD-ZWCZ-UA79/switchPorts/2'
		print('Building configuration SwitchPort2 switch Q2LD-ZWCZ-UA79',file=f)
		f.flush()
		payload = '{"name": "802.1X DOWN", "tags": null, "enabled": "true", "poeEnabled": "true", "type": "access", "vlan": "999", "voiceVlan": "998", "allowedVlans": "10,40,50,60,90-92,100", "isolationEnabled": "false", "rstpEnabled": "true", "stpGuard": "bpdu guard", "accessPolicyNumber": 1, "linkNegotiation": "Auto negotiate", "number": "2"}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		print('Response: ',response.status_code,file=f)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2LD-ZWCZ-UA79/switchPorts/3'
		print('Building configuration SwitchPort3 switch Q2LD-ZWCZ-UA79',file=f)
		f.flush()
		payload = '{"name": "802.1X DOWN", "tags": null, "enabled": "true", "poeEnabled": "true", "type": "access", "vlan": "999", "voiceVlan": "998", "allowedVlans": "10,40,50,60,90-92,100", "isolationEnabled": "false", "rstpEnabled": "true", "stpGuard": "bpdu guard", "accessPolicyNumber": 1, "linkNegotiation": "Auto negotiate", "number": "3"}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		print('Response: ',response.status_code,file=f)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2LD-ZWCZ-UA79/switchPorts/4'
		print('Building configuration SwitchPort4 switch Q2LD-ZWCZ-UA79',file=f)
		f.flush()
		payload = '{"name": "Client / Voice", "tags": null, "enabled": "true", "poeEnabled": "true", "type": "access", "vlan": "999", "voiceVlan": "998", "allowedVlans": "10,40,50,60,90-92,100", "isolationEnabled": "false", "rstpEnabled": "true", "stpGuard": "bpdu guard", "accessPolicyNumber": 1, "linkNegotiation": "Auto negotiate", "number": "4"}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		print('Response: ',response.status_code,file=f)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2LD-ZWCZ-UA79/switchPorts/5'
		print('Building configuration SwitchPort5 switch Q2LD-ZWCZ-UA79',file=f)
		f.flush()
		payload = '{"name": "Client / Voice", "tags": null, "enabled": "true", "poeEnabled": "true", "type": "access", "vlan": "999", "voiceVlan": "998", "allowedVlans": "10,40,50,60,90-92,100", "isolationEnabled": "false", "rstpEnabled": "true", "stpGuard": "bpdu guard", "accessPolicyNumber": 1, "linkNegotiation": "Auto negotiate", "number": "5"}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		print('Response: ',response.status_code,file=f)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2LD-ZWCZ-UA79/switchPorts/6'
		print('Building configuration SwitchPort6 switch Q2LD-ZWCZ-UA79',file=f)
		f.flush()
		payload = '{"name": "802.1X DOWN", "tags": null, "enabled": "true", "poeEnabled": "true", "type": "access", "vlan": "999", "voiceVlan": "998", "allowedVlans": "10,40,50,60,90-92,100", "isolationEnabled": "false", "rstpEnabled": "true", "stpGuard": "bpdu guard", "accessPolicyNumber": 1, "linkNegotiation": "Auto negotiate", "number": "6"}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		print('Response: ',response.status_code,file=f)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2LD-ZWCZ-UA79/switchPorts/7'
		print('Building configuration SwitchPort7 switch Q2LD-ZWCZ-UA79',file=f)
		f.flush()
		payload = '{"name": "Client / Voice", "tags": null, "enabled": "true", "poeEnabled": "true", "type": "access", "vlan": "999", "voiceVlan": "998", "allowedVlans": "10,40,50,60,90-92,100", "isolationEnabled": "false", "rstpEnabled": "true", "stpGuard": "bpdu guard", "accessPolicyNumber": 1, "linkNegotiation": "Auto negotiate", "number": "7"}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		print('Response: ',response.status_code,file=f)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2LD-ZWCZ-UA79/switchPorts/8'
		print('Building configuration SwitchPort8 switch Q2LD-ZWCZ-UA79',file=f)
		f.flush()
		payload = '{"name": "Client / Voice", "tags": null, "enabled": "true", "poeEnabled": "true", "type": "access", "vlan": "999", "voiceVlan": "998", "allowedVlans": "10,40,50,60,90-92,100", "isolationEnabled": "false", "rstpEnabled": "true", "stpGuard": "bpdu guard", "accessPolicyNumber": 1, "linkNegotiation": "Auto negotiate", "number": "8"}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		print('Response: ',response.status_code,file=f)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2LD-ZWCZ-UA79/switchPorts/9'
		print('Building configuration SwitchPort9 switch Q2LD-ZWCZ-UA79',file=f)
		f.flush()
		payload = '{"name": "802.1X DOWN", "tags": null, "enabled": "true", "poeEnabled": "true", "type": "access", "vlan": "999", "voiceVlan": "998", "allowedVlans": "10,40,50,60,90-92,100", "isolationEnabled": "false", "rstpEnabled": "true", "stpGuard": "bpdu guard", "accessPolicyNumber": 1, "linkNegotiation": "Auto negotiate", "number": "9"}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		print('Response: ',response.status_code,file=f)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2LD-ZWCZ-UA79/switchPorts/10'
		print('Building configuration SwitchPort10 switch Q2LD-ZWCZ-UA79',file=f)
		f.flush()
		payload = '{"name": "802.1X DOWN", "tags": null, "enabled": "true", "poeEnabled": "true", "type": "access", "vlan": "999", "voiceVlan": "998", "allowedVlans": "10,40,50,60,90-92,100", "isolationEnabled": "false", "rstpEnabled": "true", "stpGuard": "bpdu guard", "accessPolicyNumber": 1, "linkNegotiation": "Auto negotiate", "number": "10"}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		print('Response: ',response.status_code,file=f)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2LD-ZWCZ-UA79/switchPorts/11'
		print('Building configuration SwitchPort11 switch Q2LD-ZWCZ-UA79',file=f)
		f.flush()
		payload = '{"name": "ASP_Printer", "tags": null, "enabled": "true", "poeEnabled": "true", "type": "access", "vlan": "999", "voiceVlan": "998", "allowedVlans": "10,40,50,60,90-92,100", "isolationEnabled": "false", "rstpEnabled": "true", "stpGuard": "bpdu guard", "accessPolicyNumber": 1, "linkNegotiation": "Auto negotiate", "number": "11"}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		print('Response: ',response.status_code,file=f)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2LD-ZWCZ-UA79/switchPorts/12'
		print('Building configuration SwitchPort12 switch Q2LD-ZWCZ-UA79',file=f)
		f.flush()
		payload = '{"name": "802.1X DOWN", "tags": null, "enabled": "true", "poeEnabled": "true", "type": "access", "vlan": "999", "voiceVlan": "998", "allowedVlans": "10,40,50,60,90-92,100", "isolationEnabled": "false", "rstpEnabled": "true", "stpGuard": "bpdu guard", "accessPolicyNumber": 1, "linkNegotiation": "Auto negotiate", "number": "12"}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		print('Response: ',response.status_code,file=f)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2LD-ZWCZ-UA79/switchPorts/13'
		print('Building configuration SwitchPort13 switch Q2LD-ZWCZ-UA79',file=f)
		f.flush()
		payload = '{"name": "802.1X DOWN", "tags": null, "enabled": "true", "poeEnabled": "true", "type": "access", "vlan": "20", "voiceVlan": "998", "allowedVlans": "10,40,50,60,90-92,100", "isolationEnabled": "false", "rstpEnabled": "true", "stpGuard": "bpdu guard", "accessPolicyNumber": null, "linkNegotiation": "Auto negotiate", "number": "13"}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		print('Response: ',response.status_code,file=f)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2LD-ZWCZ-UA79/switchPorts/14'
		print('Building configuration SwitchPort14 switch Q2LD-ZWCZ-UA79',file=f)
		f.flush()
		payload = '{"name": "Workaround Kamera", "tags": null, "enabled": "true", "poeEnabled": "true", "type": "access", "vlan": "20", "voiceVlan": "998", "allowedVlans": "10,40,50,60,90-92,100", "isolationEnabled": "false", "rstpEnabled": "true", "stpGuard": "bpdu guard", "accessPolicyNumber": null, "linkNegotiation": "Auto negotiate", "number": "14"}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		print('Response: ',response.status_code,file=f)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2LD-ZWCZ-UA79/switchPorts/15'
		print('Building configuration SwitchPort15 switch Q2LD-ZWCZ-UA79',file=f)
		f.flush()
		payload = '{"name": "Workaround Kamera", "tags": null, "enabled": "true", "poeEnabled": "true", "type": "access", "vlan": "20", "voiceVlan": "998", "allowedVlans": "10,40,50,60,90-92,100", "isolationEnabled": "false", "rstpEnabled": "true", "stpGuard": "bpdu guard", "accessPolicyNumber": null, "linkNegotiation": "Auto negotiate", "number": "15"}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		print('Response: ',response.status_code,file=f)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2LD-ZWCZ-UA79/switchPorts/16'
		print('Building configuration SwitchPort16 switch Q2LD-ZWCZ-UA79',file=f)
		f.flush()
		payload = '{"name": "Workaround Kamera", "tags": null, "enabled": "true", "poeEnabled": "true", "type": "access", "vlan": "20", "voiceVlan": "998", "allowedVlans": "10,40,50,60,90-92,100", "isolationEnabled": "false", "rstpEnabled": "true", "stpGuard": "bpdu guard", "accessPolicyNumber": null, "linkNegotiation": "Auto negotiate", "number": "16"}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		print('Response: ',response.status_code,file=f)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2LD-ZWCZ-UA79/switchPorts/17'
		print('Building configuration SwitchPort17 switch Q2LD-ZWCZ-UA79',file=f)
		f.flush()
		payload = '{"name": "ASP_Security", "tags": null, "enabled": "true", "poeEnabled": "true", "type": "access", "vlan": "999", "voiceVlan": "998", "allowedVlans": "10,40,50,60,90-92,100", "isolationEnabled": "false", "rstpEnabled": "true", "stpGuard": "bpdu guard", "accessPolicyNumber": 1, "linkNegotiation": "Auto negotiate", "number": "17"}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		print('Response: ',response.status_code,file=f)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2LD-ZWCZ-UA79/switchPorts/18'
		print('Building configuration SwitchPort18 switch Q2LD-ZWCZ-UA79',file=f)
		f.flush()
		payload = '{"name": "ASP_Security", "tags": null, "enabled": "true", "poeEnabled": "true", "type": "access", "vlan": "999", "voiceVlan": "998", "allowedVlans": "10,40,50,60,90-92,100", "isolationEnabled": "false", "rstpEnabled": "true", "stpGuard": "bpdu guard", "accessPolicyNumber": 1, "linkNegotiation": "Auto negotiate", "number": "18"}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		print('Response: ',response.status_code,file=f)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2LD-ZWCZ-UA79/switchPorts/19'
		print('Building configuration SwitchPort19 switch Q2LD-ZWCZ-UA79',file=f)
		f.flush()
		payload = '{"name": "ASP_Security", "tags": null, "enabled": "true", "poeEnabled": "true", "type": "access", "vlan": "999", "voiceVlan": "998", "allowedVlans": "10,40,50,60,90-92,100", "isolationEnabled": "false", "rstpEnabled": "true", "stpGuard": "bpdu guard", "accessPolicyNumber": 1, "linkNegotiation": "Auto negotiate", "number": "19"}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		print('Response: ',response.status_code,file=f)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2LD-ZWCZ-UA79/switchPorts/20'
		print('Building configuration SwitchPort20 switch Q2LD-ZWCZ-UA79',file=f)
		f.flush()
		payload = '{"name": "ASP_Security", "tags": null, "enabled": "true", "poeEnabled": "true", "type": "access", "vlan": "999", "voiceVlan": "998", "allowedVlans": "10,40,50,60,90-92,100", "isolationEnabled": "false", "rstpEnabled": "true", "stpGuard": "bpdu guard", "accessPolicyNumber": 1, "linkNegotiation": "Auto negotiate", "number": "20"}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		print('Response: ',response.status_code,file=f)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2LD-ZWCZ-UA79/switchPorts/21'
		print('Building configuration SwitchPort21 switch Q2LD-ZWCZ-UA79',file=f)
		f.flush()
		payload = '{"name": "ASP_Security", "tags": null, "enabled": "true", "poeEnabled": "true", "type": "access", "vlan": "999", "voiceVlan": "998", "allowedVlans": "10,40,50,60,90-92,100", "isolationEnabled": "false", "rstpEnabled": "true", "stpGuard": "bpdu guard", "accessPolicyNumber": 1, "linkNegotiation": "Auto negotiate", "number": "21"}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		print('Response: ',response.status_code,file=f)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2LD-ZWCZ-UA79/switchPorts/22'
		print('Building configuration SwitchPort22 switch Q2LD-ZWCZ-UA79',file=f)
		f.flush()
		payload = '{"name": "Client / Voice", "tags": null, "enabled": "true", "poeEnabled": "true", "type": "access", "vlan": "999", "voiceVlan": "998", "allowedVlans": "10,40,50,60,90-92,100", "isolationEnabled": "false", "rstpEnabled": "true", "stpGuard": "bpdu guard", "accessPolicyNumber": 1, "linkNegotiation": "Auto negotiate", "number": "22"}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		print('Response: ',response.status_code,file=f)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2LD-ZWCZ-UA79/switchPorts/23'
		print('Building configuration SwitchPort23 switch Q2LD-ZWCZ-UA79',file=f)
		f.flush()
		payload = '{"name": "Client / Voice", "tags": null, "enabled": "true", "poeEnabled": "true", "type": "access", "vlan": "999", "voiceVlan": "998", "allowedVlans": "10,40,50,60,90-92,100", "isolationEnabled": "false", "rstpEnabled": "true", "stpGuard": "bpdu guard", "accessPolicyNumber": 1, "linkNegotiation": "Auto negotiate", "number": "23"}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		print('Response: ',response.status_code,file=f)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2LD-ZWCZ-UA79/switchPorts/24'
		print('Building configuration SwitchPort24 switch Q2LD-ZWCZ-UA79',file=f)
		f.flush()
		payload = '{"name": "ASP_Security", "tags": null, "enabled": "true", "poeEnabled": "true", "type": "access", "vlan": "999", "voiceVlan": "998", "allowedVlans": "10,40,50,60,90-92,100", "isolationEnabled": "false", "rstpEnabled": "true", "stpGuard": "bpdu guard", "accessPolicyNumber": 1, "linkNegotiation": "Auto negotiate", "number": "24"}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		print('Response: ',response.status_code,file=f)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2LD-ZWCZ-UA79/switchPorts/25'
		print('Building configuration SwitchPort25 switch Q2LD-ZWCZ-UA79',file=f)
		f.flush()
		payload = '{"name": "Client / Voice", "tags": null, "enabled": "true", "poeEnabled": "true", "type": "access", "vlan": "999", "voiceVlan": "998", "allowedVlans": "10,40,50,60,90-92,100", "isolationEnabled": "false", "rstpEnabled": "true", "stpGuard": "bpdu guard", "accessPolicyNumber": 1, "linkNegotiation": "Auto negotiate", "number": "25"}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		print('Response: ',response.status_code,file=f)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2LD-ZWCZ-UA79/switchPorts/26'
		print('Building configuration SwitchPort26 switch Q2LD-ZWCZ-UA79',file=f)
		f.flush()
		payload = '{"name": "Client / Voice", "tags": null, "enabled": "true", "poeEnabled": "true", "type": "access", "vlan": "999", "voiceVlan": "998", "allowedVlans": "10,40,50,60,90-92,100", "isolationEnabled": "false", "rstpEnabled": "true", "stpGuard": "bpdu guard", "accessPolicyNumber": 1, "linkNegotiation": "Auto negotiate", "number": "26"}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		print('Response: ',response.status_code,file=f)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2LD-ZWCZ-UA79/switchPorts/27'
		print('Building configuration SwitchPort27 switch Q2LD-ZWCZ-UA79',file=f)
		f.flush()
		payload = '{"name": "Client / Voice", "tags": null, "enabled": "true", "poeEnabled": "true", "type": "access", "vlan": "999", "voiceVlan": "998", "allowedVlans": "10,40,50,60,90-92,100", "isolationEnabled": "false", "rstpEnabled": "true", "stpGuard": "bpdu guard", "accessPolicyNumber": 1, "linkNegotiation": "Auto negotiate", "number": "27"}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		print('Response: ',response.status_code,file=f)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2LD-ZWCZ-UA79/switchPorts/28'
		print('Building configuration SwitchPort28 switch Q2LD-ZWCZ-UA79',file=f)
		f.flush()
		payload = '{"name": "802.1X DOWN", "tags": null, "enabled": "true", "poeEnabled": "true", "type": "access", "vlan": "999", "voiceVlan": "998", "allowedVlans": "10,40,50,60,90-92,100", "isolationEnabled": "false", "rstpEnabled": "true", "stpGuard": "bpdu guard", "accessPolicyNumber": 1, "linkNegotiation": "Auto negotiate", "number": "28"}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		print('Response: ',response.status_code,file=f)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2LD-ZWCZ-UA79/switchPorts/29'
		print('Building configuration SwitchPort29 switch Q2LD-ZWCZ-UA79',file=f)
		f.flush()
		payload = '{"name": "802.1X DOWN", "tags": null, "enabled": "true", "poeEnabled": "true", "type": "access", "vlan": "999", "voiceVlan": "998", "allowedVlans": "10,40,50,60,90-92,100", "isolationEnabled": "false", "rstpEnabled": "true", "stpGuard": "bpdu guard", "accessPolicyNumber": 1, "linkNegotiation": "Auto negotiate", "number": "29"}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		print('Response: ',response.status_code,file=f)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2LD-ZWCZ-UA79/switchPorts/30'
		print('Building configuration SwitchPort30 switch Q2LD-ZWCZ-UA79',file=f)
		f.flush()
		payload = '{"name": "Client / Voice", "tags": null, "enabled": "true", "poeEnabled": "true", "type": "access", "vlan": "999", "voiceVlan": "998", "allowedVlans": "10,40,50,60,90-92,100", "isolationEnabled": "false", "rstpEnabled": "true", "stpGuard": "bpdu guard", "accessPolicyNumber": 1, "linkNegotiation": "Auto negotiate", "number": "30"}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		print('Response: ',response.status_code,file=f)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2LD-ZWCZ-UA79/switchPorts/31'
		print('Building configuration SwitchPort31 switch Q2LD-ZWCZ-UA79',file=f)
		f.flush()
		payload = '{"name": "Client / Voice", "tags": null, "enabled": "true", "poeEnabled": "true", "type": "access", "vlan": "999", "voiceVlan": "998", "allowedVlans": "10,40,50,60,90-92,100", "isolationEnabled": "false", "rstpEnabled": "true", "stpGuard": "bpdu guard", "accessPolicyNumber": 1, "linkNegotiation": "Auto negotiate", "number": "31"}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		print('Response: ',response.status_code,file=f)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2LD-ZWCZ-UA79/switchPorts/32'
		print('Building configuration SwitchPort32 switch Q2LD-ZWCZ-UA79',file=f)
		f.flush()
		payload = '{"name": "802.1X DOWN", "tags": null, "enabled": "true", "poeEnabled": "true", "type": "access", "vlan": "999", "voiceVlan": "998", "allowedVlans": "10,40,50,60,90-92,100", "isolationEnabled": "false", "rstpEnabled": "true", "stpGuard": "bpdu guard", "accessPolicyNumber": 1, "linkNegotiation": "Auto negotiate", "number": "32"}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		print('Response: ',response.status_code,file=f)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2LD-ZWCZ-UA79/switchPorts/33'
		print('Building configuration SwitchPort33 switch Q2LD-ZWCZ-UA79',file=f)
		f.flush()
		payload = '{"name": "ASP_Security", "tags": null, "enabled": "true", "poeEnabled": "true", "type": "access", "vlan": "999", "voiceVlan": "998", "allowedVlans": "10,40,50,60,90-92,100", "isolationEnabled": "false", "rstpEnabled": "true", "stpGuard": "bpdu guard", "accessPolicyNumber": 1, "linkNegotiation": "Auto negotiate", "number": "33"}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		print('Response: ',response.status_code,file=f)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2LD-ZWCZ-UA79/switchPorts/34'
		print('Building configuration SwitchPort34 switch Q2LD-ZWCZ-UA79',file=f)
		f.flush()
		payload = '{"name": "802.1X DOWN", "tags": null, "enabled": "true", "poeEnabled": "true", "type": "access", "vlan": "999", "voiceVlan": "998", "allowedVlans": "10,40,50,60,90-92,100", "isolationEnabled": "false", "rstpEnabled": "true", "stpGuard": "bpdu guard", "accessPolicyNumber": 1, "linkNegotiation": "Auto negotiate", "number": "34"}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		print('Response: ',response.status_code,file=f)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2LD-ZWCZ-UA79/switchPorts/35'
		print('Building configuration SwitchPort35 switch Q2LD-ZWCZ-UA79',file=f)
		f.flush()
		payload = '{"name": "Client / Voice", "tags": null, "enabled": "true", "poeEnabled": "true", "type": "access", "vlan": "999", "voiceVlan": "998", "allowedVlans": "10,40,50,60,90-92,100", "isolationEnabled": "false", "rstpEnabled": "true", "stpGuard": "bpdu guard", "accessPolicyNumber": 1, "linkNegotiation": "Auto negotiate", "number": "35"}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		print('Response: ',response.status_code,file=f)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2LD-ZWCZ-UA79/switchPorts/36'
		print('Building configuration SwitchPort36 switch Q2LD-ZWCZ-UA79',file=f)
		f.flush()
		payload = '{"name": "802.1X DOWN", "tags": null, "enabled": "true", "poeEnabled": "true", "type": "access", "vlan": "999", "voiceVlan": "998", "allowedVlans": "10,40,50,60,90-92,100", "isolationEnabled": "false", "rstpEnabled": "true", "stpGuard": "bpdu guard", "accessPolicyNumber": 1, "linkNegotiation": "Auto negotiate", "number": "36"}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		print('Response: ',response.status_code,file=f)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2LD-ZWCZ-UA79/switchPorts/37'
		print('Building configuration SwitchPort37 switch Q2LD-ZWCZ-UA79',file=f)
		f.flush()
		payload = '{"name": "Client / Voice", "tags": null, "enabled": "true", "poeEnabled": "true", "type": "access", "vlan": "999", "voiceVlan": "998", "allowedVlans": "10,40,50,60,90-92,100", "isolationEnabled": "false", "rstpEnabled": "true", "stpGuard": "bpdu guard", "accessPolicyNumber": 1, "linkNegotiation": "Auto negotiate", "number": "37"}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		print('Response: ',response.status_code,file=f)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2LD-ZWCZ-UA79/switchPorts/38'
		print('Building configuration SwitchPort38 switch Q2LD-ZWCZ-UA79',file=f)
		f.flush()
		payload = '{"name": "802.1X DOWN", "tags": null, "enabled": "true", "poeEnabled": "true", "type": "access", "vlan": "999", "voiceVlan": "998", "allowedVlans": "10,40,50,60,90-92,100", "isolationEnabled": "false", "rstpEnabled": "true", "stpGuard": "bpdu guard", "accessPolicyNumber": 1, "linkNegotiation": "Auto negotiate", "number": "38"}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		print('Response: ',response.status_code,file=f)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2LD-ZWCZ-UA79/switchPorts/39'
		print('Building configuration SwitchPort39 switch Q2LD-ZWCZ-UA79',file=f)
		f.flush()
		payload = '{"name": "UPLINK to DUENET03 - Gi1/0/23", "tags": null, "enabled": "true", "poeEnabled": "true", "type": "trunk", "vlan": 1, "voiceVlan": null, "allowedVlans": "10,40,50,60,90-92,100", "isolationEnabled": "false", "rstpEnabled": "true", "stpGuard": "bpdu guard", "accessPolicyNumber": null, "linkNegotiation": "Auto negotiate", "number": "39"}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		print('Response: ',response.status_code,file=f)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2LD-ZWCZ-UA79/switchPorts/40'
		print('Building configuration SwitchPort40 switch Q2LD-ZWCZ-UA79',file=f)
		f.flush()
		payload = '{"name": "UPLINK to DUENET03 - Gi1/0/24", "tags": null, "enabled": "true", "poeEnabled": "true", "type": "trunk", "vlan": 1, "voiceVlan": null, "allowedVlans": "10,40,50,60,90-92,100", "isolationEnabled": "false", "rstpEnabled": "true", "stpGuard": "bpdu guard", "accessPolicyNumber": null, "linkNegotiation": "Auto negotiate", "number": "40"}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		print('Response: ',response.status_code,file=f)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2LD-ZWCZ-UA79/switchPorts/41'
		print('Building configuration SwitchPort41 switch Q2LD-ZWCZ-UA79',file=f)
		f.flush()
		payload = '{"name": "UPLINK to DUENET04 - Gi1/0/47", "tags": null, "enabled": "true", "poeEnabled": "true", "type": "trunk", "vlan": 1, "voiceVlan": null, "allowedVlans": "10,40,50,60,90-92,100", "isolationEnabled": "false", "rstpEnabled": "true", "stpGuard": "bpdu guard", "accessPolicyNumber": null, "linkNegotiation": "Auto negotiate", "number": "41"}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		print('Response: ',response.status_code,file=f)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2LD-ZWCZ-UA79/switchPorts/42'
		print('Building configuration SwitchPort42 switch Q2LD-ZWCZ-UA79',file=f)
		f.flush()
		payload = '{"name": "UPLINK to DUENET04 - Gi1/0/48", "tags": null, "enabled": "true", "poeEnabled": "true", "type": "trunk", "vlan": 1, "voiceVlan": null, "allowedVlans": "10,40,50,60,90-92,100", "isolationEnabled": "false", "rstpEnabled": "true", "stpGuard": "bpdu guard", "accessPolicyNumber": null, "linkNegotiation": "Auto negotiate", "number": "42"}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		print('Response: ',response.status_code,file=f)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2LD-ZWCZ-UA79/switchPorts/43'
		print('Building configuration SwitchPort43 switch Q2LD-ZWCZ-UA79',file=f)
		f.flush()
		payload = '{"name": "Meraki-AP", "tags": null, "enabled": "true", "poeEnabled": "true", "type": "trunk", "vlan": "100", "voiceVlan": null, "allowedVlans": "10,40,50,60,90-92,100", "isolationEnabled": "false", "rstpEnabled": "true", "stpGuard": "bpdu guard", "accessPolicyNumber": null, "linkNegotiation": "Auto negotiate", "number": "43"}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		print('Response: ',response.status_code,file=f)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2LD-ZWCZ-UA79/switchPorts/44'
		print('Building configuration SwitchPort44 switch Q2LD-ZWCZ-UA79',file=f)
		f.flush()
		payload = '{"name": "Client / Voice", "tags": null, "enabled": "true", "poeEnabled": "true", "type": "access", "vlan": "999", "voiceVlan": "998", "allowedVlans": "10,40,50,60,90-92,100", "isolationEnabled": "false", "rstpEnabled": "true", "stpGuard": "bpdu guard", "accessPolicyNumber": 1, "linkNegotiation": "Auto negotiate", "number": "44"}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		print('Response: ',response.status_code,file=f)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2LD-ZWCZ-UA79/switchPorts/45'
		print('Building configuration SwitchPort45 switch Q2LD-ZWCZ-UA79',file=f)
		f.flush()
		payload = '{"name": "Meraki-AP", "tags": null, "enabled": "true", "poeEnabled": "true", "type": "trunk", "vlan": "100", "voiceVlan": null, "allowedVlans": "10,40,50,60,90-92,100", "isolationEnabled": "false", "rstpEnabled": "true", "stpGuard": "bpdu guard", "accessPolicyNumber": null, "linkNegotiation": "Auto negotiate", "number": "45"}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		print('Response: ',response.status_code,file=f)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2LD-ZWCZ-UA79/switchPorts/46'
		print('Building configuration SwitchPort46 switch Q2LD-ZWCZ-UA79',file=f)
		f.flush()
		payload = '{"name": "802.1X DOWN", "tags": null, "enabled": "true", "poeEnabled": "true", "type": "access", "vlan": "999", "voiceVlan": "998", "allowedVlans": "10,40,50,60,90-92,100", "isolationEnabled": "false", "rstpEnabled": "true", "stpGuard": "bpdu guard", "accessPolicyNumber": 1, "linkNegotiation": "Auto negotiate", "number": "46"}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		print('Response: ',response.status_code,file=f)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2LD-ZWCZ-UA79/switchPorts/47'
		print('Building configuration SwitchPort47 switch Q2LD-ZWCZ-UA79',file=f)
		f.flush()
		payload = '{"name": "Meraki-AP", "tags": null, "enabled": "true", "poeEnabled": "true", "type": "trunk", "vlan": "100", "voiceVlan": null, "allowedVlans": "10,40,50,60,90-92,100", "isolationEnabled": "false", "rstpEnabled": "true", "stpGuard": "bpdu guard", "accessPolicyNumber": null, "linkNegotiation": "Auto negotiate", "number": "47"}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		print('Response: ',response.status_code,file=f)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2LD-ZWCZ-UA79/switchPorts/48'
		print('Building configuration SwitchPort48 switch Q2LD-ZWCZ-UA79',file=f)
		f.flush()
		payload = '{"name": "Client / Voice", "tags": null, "enabled": "true", "poeEnabled": "true", "type": "access", "vlan": "999", "voiceVlan": "998", "allowedVlans": "10,40,50,60,90-92,100", "isolationEnabled": "false", "rstpEnabled": "true", "stpGuard": "bpdu guard", "accessPolicyNumber": 1, "linkNegotiation": "Auto negotiate", "number": "48"}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		print('Response: ',response.status_code,file=f)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2LD-ZWCZ-UA79/switchPorts/49'
		print('Building configuration SwitchPort49 switch Q2LD-ZWCZ-UA79',file=f)
		f.flush()
		payload = '{"name": "*** SFP unused ***", "tags": null, "enabled": "true", "poeEnabled": "true", "type": "trunk", "vlan": 1, "voiceVlan": null, "allowedVlans": "10,40,50,60,90-92,100", "isolationEnabled": "false", "rstpEnabled": "true", "stpGuard": "bpdu guard", "accessPolicyNumber": null, "linkNegotiation": "Auto negotiate", "number": "49"}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		print('Response: ',response.status_code,file=f)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2LD-ZWCZ-UA79/switchPorts/50'
		print('Building configuration SwitchPort50 switch Q2LD-ZWCZ-UA79',file=f)
		f.flush()
		payload = '{"name": "UPLINK to DUENET05 - Gig 1/0/26", "tags": null, "enabled": "true", "poeEnabled": "true", "type": "trunk", "vlan": 1, "voiceVlan": null, "allowedVlans": "10,40,50,60,90-92,100", "isolationEnabled": "false", "rstpEnabled": "true", "stpGuard": "bpdu guard", "accessPolicyNumber": null, "linkNegotiation": "Auto negotiate", "number": "50"}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		print('Response: ',response.status_code,file=f)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2LD-ZWCZ-UA79/switchPorts/51'
		print('Building configuration SwitchPort51 switch Q2LD-ZWCZ-UA79',file=f)
		f.flush()
		payload = '{"name": "*** SFP unused ***", "tags": null, "enabled": "true", "poeEnabled": "true", "type": "trunk", "vlan": 1, "voiceVlan": null, "allowedVlans": "10,40,50,60,90-92,100", "isolationEnabled": "false", "rstpEnabled": "true", "stpGuard": "bpdu guard", "accessPolicyNumber": null, "linkNegotiation": "Auto negotiate", "number": "51"}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		print('Response: ',response.status_code,file=f)
		puturl = 'https://api.meraki.com/api/v0/devices/Q2LD-ZWCZ-UA79/switchPorts/52'
		print('Building configuration SwitchPort52 switch Q2LD-ZWCZ-UA79',file=f)
		f.flush()
		payload = '{"name": "UPLINK to DUENET05 - Gig 1/0/28", "tags": null, "enabled": "true", "poeEnabled": "true", "type": "trunk", "vlan": 1, "voiceVlan": null, "allowedVlans": "10,40,50,60,90-92,100", "isolationEnabled": "false", "rstpEnabled": "true", "stpGuard": "bpdu guard", "accessPolicyNumber": null, "linkNegotiation": "Auto negotiate", "number": "52"}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		print('Response: ',response.status_code,file=f)
	except requests.exceptions.HTTPError as err:
		print(err,file=f)
		print('There was an error configuring the switchs configuration, check the logs for more details.',file=f)
	print('Switch configuration complete.',file=f)
	f.flush()
	f.close()

