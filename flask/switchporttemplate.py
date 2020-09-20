#!/usr/bin/env python3
# -*- coding: utf-8 -*-
#
#
# this  script is used to push the configuaration generated by src/components/Tools/SwitchPortTemplate.js

# It seems that Storm Control options is not configurable with API, otion is disabled

import requests
import json
from flask import jsonify


def deploy(ARG_APIKEY, SERIAL_NUM, payload):

    headers = {
        "Content-Type": "application/json",
        "Accept": "application/json",
        'x-cisco-meraki-api-key': ARG_APIKEY,
    }

    defaultPayload = {
        "name": "",
        "tags": None,
        "enabled": 'true',
        "poeEnabled": 'true',
        "type": "trunk",
        "vlan": None,
        "voiceVlan": None,
        "allowedVlans": "all",
        "isolationEnabled": 'false',
        "rstpEnabled": 'true',
        "stpGuard": "disabled",
        "linkNegotiation": "Auto negotiate",
        "portScheduleId": None,
        "udld": "Alert only",
        "accessPolicyNumber": None,
    }

    try:
        data = []
        for x in payload:

            # delete not necessary entries from payload
            del x['payload']['id']
            del x['payload']['templateName']

            # storm control section
            if x['payload']['StormControl']['Storm Control supported'] == 'Yes':
                if x['payload']['StormControl']['stormControlEnabled'] == 'Disabled':
                    x['payload'].update({'stormControlEnabled': False})
                elif x['payload']['StormControl']['stormControlEnabled'] == 'Enabled':
                    x['payload'].update({'stormControlEnabled': True})
            # if x['payload']['StormControl']['Storm Control supported'] == 'No':
            del x['payload']['StormControl']

            # change condition from enabled/disabled to true/false boolean
            if x['payload']['enabled'] == "Enabled":
                x['payload'].update({'enabled': True})
            else:
                x['payload'].update({'enabled': False})

            if x['payload']['stacking'] == "Enabled":
                x['payload'].update({'stacking': True})
            else:
                x['payload'].update({'stacking': False})

            if x['payload']['poeEnabled'] == "Enabled":
                x['payload'].update({'poeEnabled': True})
            else:
                x['payload'].update({'poeEnabled': False})

            if x['payload']['rstpEnabled'] == "Enabled":
                x['payload'].update({'rstpEnabled': True})
            else:
                x['payload'].update({'rstpEnabled': False})

            if x['payload']['isolationEnabled'] == "Enabled":
                x['payload'].update({'isolationEnabled': True})
            else:
                x['payload'].update({'isolationEnabled': False})

            if x['payload']['trusted'] == "Enabled":
                x['payload'].update({'trusted': True})
            else:
                x['payload'].update({'trusted': False})

            if x['payload']['Port']['type'] == "Access":
                del x['payload']['Port']['type']
                x['payload'].update({"type": "access"})

                # change accessPolicyNumber from Name to number
                if x['payload']['Port']['Policy']['accessPolicyNumber'] == "CustomPolicy":
                    x['payload'].update({"accessPolicyNumber": 1})
                    x['payload'].update(
                        {"vlan": x['payload']['Port']['Policy']['vlan']})
                    if x['payload']['Port']['Policy'].get('voiceVlan'):
                        x['payload'].update(
                            {"voiceVlan": x['payload']['Port']['Policy']['voiceVlan']})
                    del x['payload']['Port']['Policy']

                elif x['payload']['Port']['Policy']['accessPolicyNumber'] == "Open":
                    x['payload'].update({"accessPolicyNumber": 0})
                    x['payload'].update(
                        {"vlan": x['payload']['Port']['Policy']['vlan']})
                    if x['payload']['Port']['Policy'].get('voiceVlan'):
                        x['payload'].update(
                            {"voiceVlan": x['payload']['Port']['Policy']['voiceVlan']})
                    # x['payload'].update({"voiceVlan": x['payload']['Port']['Policy']['voiceVlan']})
                    del x['payload']['Port']['Policy']
                elif x['payload']['Port']['Policy']['accessPolicyNumber'] == "MAC Whitelist":
                    # convert macaddresses to list
                    macs = x['payload']['Port']['Policy']['macWhitelist']
                    maclist = macs.split(sep=",", maxsplit=-1)
                    x['payload'].update({"macWhitelist": maclist})
                    x['payload'].update(
                        {"vlan": x['payload']['Port']['Policy']['vlan']})
                    if x['payload']['Port']['Policy'].get('voiceVlan'):
                        x['payload'].update(
                            {"voiceVlan": x['payload']['Port']['Policy']['voiceVlan']})
                    # x['payload'].update({"voiceVlan": x['payload']['Port']['Policy']['voiceVlan']})
                    del x['payload']['Port']['Policy']
                elif x['payload']['Port']['Policy']['accessPolicyNumber'] == "Sticky MAC Whitelist":
                    # convert macaddresses to list
                    macs = x['payload']['Port']['Policy']['macWhitelist']
                    maclist = macs.split(sep=",", maxsplit=-1)
                    x['payload'].update(
                        {"vlan": x['payload']['Port']['Policy']['vlan']})
                    # x['payload'].update({"voiceVlan": x['payload']['Port']['Policy']['voiceVlan']})
                    if x['payload']['Port']['Policy'].get('voiceVlan'):
                        x['payload'].update(
                            {"voiceVlan": x['payload']['Port']['Policy']['voiceVlan']})
                    x['payload'].update({"stickyMacWhitelist": maclist})
                    x['payload'].update(
                        {"stickyMacWhitelistLimit": x['payload']['Port']['Policy']['stickyMacWhitelistLimit']})
                    del x['payload']['Port']['Policy']
                del x['payload']['Port']

            elif x['payload']['Port']['type'] == "Trunk":
                del x['payload']['Port']['Policy']
                x['payload'].update({"type": "trunk"})
                x['payload'].update(
                    {"allowedVlans": x['payload']['Port']['allowedVlans']})
                if x['payload']['Port'].get('vlan'):
                    x['payload'].update({"vlan": x['payload']['Port']['vlan']})
                del x['payload']['Port']

            data.append({'config': x['payload'], 'number': x['number']})

        # normal configuration of switchport
        for x in data:
            number = x['number']
            config = json.dumps(x['config'])
            error = []
            print('Iteration number', number)
            url = f"https://api.meraki.com/api/v0/devices/{SERIAL_NUM}/switchPorts/{number}"
            response = requests.request(
                'PUT', url, headers=headers, data=config)
            response_data = response.json()

            # removing stormControlEnabled from payload and send error message, port will be however configured
            if response_data.get('errors'):
                if response_data['errors'][0] == 'Storm control is currently not supported in this network':
                    error = 'Storm control is currently not supported in this network/switch, Storm control configuration removed. '
                    del x['config']['stormControlEnabled']
                    config = json.dumps(x['config'])
                    url = f"https://api.meraki.com/api/v0/devices/{SERIAL_NUM}/switchPorts/{number}"
                    response = requests.request(
                        'PUT', url, headers=headers, data=config)
                    response_data = response.json()

            # find which part of the payload should be configured again in order to clear the config
            dict1 = x['config']
            dict2 = response_data

            keys_one = set(dict1.keys())
            keys_two = set(dict2.keys())
            same_keys = keys_one.intersection(keys_two)
            NOTsame_keys = keys_one.symmetric_difference(keys_two)
            # To get a list of the keys:
            result = list(same_keys)
            UNresult = list(NOTsame_keys)

            newPayload = {}
            for x in UNresult:
                newPayload.update({x: None})

            if 'number' in newPayload:
                del newPayload['number']
            if 'allowedVlans' in newPayload:
                newPayload.update({'allowedVlans': 'all'})
            if 'stickyMacWhitelist' in newPayload:
                del newPayload['stickyMacWhitelist']
            if 'macWhitelist' in newPayload:
                del newPayload['macWhitelist']
            if 'stickyMacWhitelistLimit' in newPayload:
                del newPayload['stickyMacWhitelistLimit']

            # set port to a default config only if no errors, if any errors port should not be configured at all (except for stormcontrol)
            if response_data.get('errors'):
                pass
            else:
                defaultConfig = json.dumps(newPayload)
                url = f"https://api.meraki.com/api/v0/devices/{SERIAL_NUM}/switchPorts/{number}"
                response = requests.request(
                    'PUT', url, headers=headers, data=defaultConfig)
                response_data = response.json()

        return (response_data, error)

    except Exception as err:
        print('Exception: ', err)
