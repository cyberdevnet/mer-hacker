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
		puturl = 'https://api.meraki.com/api/v0/devices/aaaa-ssss-ssss/switchPorts/1'
		print('Building configuration SwitchPort1 switch aaaa-ssss-ssss',file=f)
		f.flush()
		payload = '{"name": null, "tags": null, "enabled": "true", "poeEnabled": "true", "type": "access", "vlan": 999, "voiceVlan": "192", "allowedVlans": "all", "isolationEnabled": "false", "rstpEnabled": "true", "stpGuard": "disabled", "accessPolicyNumber": 1, "linkNegotiation": "Auto negotiate", "number": "1"}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		print('Response: ',response.status_code,file=f)
		puturl = 'https://api.meraki.com/api/v0/devices/aaaa-ssss-ssss/switchPorts/2'
		print('Building configuration SwitchPort2 switch aaaa-ssss-ssss',file=f)
		f.flush()
		payload = '{"name": null, "tags": null, "enabled": "true", "poeEnabled": "true", "type": "access", "vlan": 999, "voiceVlan": "192", "allowedVlans": "all", "isolationEnabled": "false", "rstpEnabled": "true", "stpGuard": "disabled", "accessPolicyNumber": 1, "linkNegotiation": "Auto negotiate", "number": "2"}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		print('Response: ',response.status_code,file=f)
		puturl = 'https://api.meraki.com/api/v0/devices/aaaa-ssss-ssss/switchPorts/3'
		print('Building configuration SwitchPort3 switch aaaa-ssss-ssss',file=f)
		f.flush()
		payload = '{"name": null, "tags": null, "enabled": "true", "poeEnabled": "true", "type": "access", "vlan": 999, "voiceVlan": "192", "allowedVlans": "all", "isolationEnabled": "false", "rstpEnabled": "true", "stpGuard": "disabled", "accessPolicyNumber": 1, "linkNegotiation": "Auto negotiate", "number": "3"}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		print('Response: ',response.status_code,file=f)
		puturl = 'https://api.meraki.com/api/v0/devices/aaaa-ssss-ssss/switchPorts/4'
		print('Building configuration SwitchPort4 switch aaaa-ssss-ssss',file=f)
		f.flush()
		payload = '{"name": null, "tags": null, "enabled": "true", "poeEnabled": "true", "type": "access", "vlan": 999, "voiceVlan": "192", "allowedVlans": "all", "isolationEnabled": "false", "rstpEnabled": "true", "stpGuard": "disabled", "accessPolicyNumber": 1, "linkNegotiation": "Auto negotiate", "number": "4"}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		print('Response: ',response.status_code,file=f)
		puturl = 'https://api.meraki.com/api/v0/devices/aaaa-ssss-ssss/switchPorts/5'
		print('Building configuration SwitchPort5 switch aaaa-ssss-ssss',file=f)
		f.flush()
		payload = '{"name": null, "tags": null, "enabled": "true", "poeEnabled": "true", "type": "access", "vlan": 999, "voiceVlan": "192", "allowedVlans": "all", "isolationEnabled": "false", "rstpEnabled": "true", "stpGuard": "disabled", "accessPolicyNumber": 1, "linkNegotiation": "Auto negotiate", "number": "5"}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		print('Response: ',response.status_code,file=f)
		puturl = 'https://api.meraki.com/api/v0/devices/aaaa-ssss-ssss/switchPorts/6'
		print('Building configuration SwitchPort6 switch aaaa-ssss-ssss',file=f)
		f.flush()
		payload = '{"name": null, "tags": null, "enabled": "true", "poeEnabled": "true", "type": "access", "vlan": 999, "voiceVlan": "192", "allowedVlans": "all", "isolationEnabled": "false", "rstpEnabled": "true", "stpGuard": "disabled", "accessPolicyNumber": 1, "linkNegotiation": "Auto negotiate", "number": "6"}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		print('Response: ',response.status_code,file=f)
		puturl = 'https://api.meraki.com/api/v0/devices/aaaa-ssss-ssss/switchPorts/7'
		print('Building configuration SwitchPort7 switch aaaa-ssss-ssss',file=f)
		f.flush()
		payload = '{"name": null, "tags": null, "enabled": "true", "poeEnabled": "true", "type": "access", "vlan": 999, "voiceVlan": "192", "allowedVlans": "all", "isolationEnabled": "false", "rstpEnabled": "true", "stpGuard": "disabled", "accessPolicyNumber": 1, "linkNegotiation": "Auto negotiate", "number": "7"}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		print('Response: ',response.status_code,file=f)
		puturl = 'https://api.meraki.com/api/v0/devices/aaaa-ssss-ssss/switchPorts/8'
		print('Building configuration SwitchPort8 switch aaaa-ssss-ssss',file=f)
		f.flush()
		payload = '{"name": null, "tags": null, "enabled": "true", "poeEnabled": "true", "type": "access", "vlan": 999, "voiceVlan": "192", "allowedVlans": "all", "isolationEnabled": "false", "rstpEnabled": "true", "stpGuard": "disabled", "accessPolicyNumber": 1, "linkNegotiation": "Auto negotiate", "number": "8"}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		print('Response: ',response.status_code,file=f)
		puturl = 'https://api.meraki.com/api/v0/devices/aaaa-ssss-ssss/switchPorts/1'
		print('Building configuration SwitchPort1 switch aaaa-ssss-ssss',file=f)
		f.flush()
		payload = '{"name": "to LBZ-NT-AS001", "tags": null, "enabled": "true", "poeEnabled": "true", "type": "trunk", "vlan": 1, "voiceVlan": null, "allowedVlans": "all", "isolationEnabled": "false", "rstpEnabled": "true", "stpGuard": "disabled", "accessPolicyNumber": null, "linkNegotiation": "Auto negotiate", "number": "1"}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		print('Response: ',response.status_code,file=f)
		puturl = 'https://api.meraki.com/api/v0/devices/aaaa-ssss-ssss/switchPorts/2'
		print('Building configuration SwitchPort2 switch aaaa-ssss-ssss',file=f)
		f.flush()
		payload = '{"name": "to LBZ-NT-AS001", "tags": null, "enabled": "true", "poeEnabled": "true", "type": "access", "vlan": 1, "voiceVlan": null, "allowedVlans": "all", "isolationEnabled": "false", "rstpEnabled": "true", "stpGuard": "disabled", "accessPolicyNumber": 1, "linkNegotiation": "Auto negotiate", "number": "2"}'
		response = requests.request('PUT', puturl, headers=headers, data = payload)
		print('Response: ',response.status_code,file=f)
	except requests.exceptions.HTTPError as err:
		print(err,file=f)
		print('There was an error configuring the switchs configuration, check the logs for more details.',file=f)
	print('Switch configuration complete.',file=f)
	f.flush()
	f.close()

