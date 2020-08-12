#!/usr/bin/env python3
#-*- coding: utf-8 -*-
#
#
# this  script is used to push the configuaration generated by src/components/Tools/SwitchPortTemplate.js

import requests
import json
from flask import jsonify


def deploy(ARG_APIKEY,SERIAL_NUM,payload):

    headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
    'x-cisco-meraki-api-key': ARG_APIKEY,
    }

    try:
        data = []
        for x in payload:

            if x['payload']['tags'] == '':
                x['payload'].update({'tags': None})
            # if x['payload']['Port']['Policy']['voiceVlan'] == '':
            #     x['payload'].update({'voiceVlan': None})

            
            # delete not necessary entries from payload
            del x['payload']['id']
            del x['payload']['templateName']


            # change condition from enabled/disabled to true/false boolean
            if x['payload']['enabled'] == "Enabled":
                x['payload'].update({'enabled':True})
            else:
                x['payload'].update({'enabled':False})

            if x['payload']['stacking'] == "Enabled":
                x['payload'].update({'stacking':True})
            else:
                x['payload'].update({'stacking':False})

            if x['payload']['poeEnabled'] == "Enabled":
                x['payload'].update({'poeEnabled':True})
            else:
                x['payload'].update({'poeEnabled':False})

            if x['payload']['rstpEnabled'] == "Enabled":
                x['payload'].update({'rstpEnabled':True})
            else:
                x['payload'].update({'rstpEnabled':False})

            if x['payload']['isolationEnabled'] == "Enabled":
                x['payload'].update({'isolationEnabled':True})
            else:
                x['payload'].update({'isolationEnabled':False})

            if x['payload']['trusted'] == "Enabled":
                x['payload'].update({'trusted':True})
            else:
                x['payload'].update({'trusted':False})

            # workaround: remove stormControlEnabled if "Storm control is currently not supported in this network"
            # NOT SURE IF WORKS PROPERLY

            stormControlEnabled = x['payload']['stormControlEnabled']
            if stormControlEnabled == "Enabled":
                x['payload'].update({'stormControlEnabled':True})
            elif stormControlEnabled == "Disabled":
                del x['payload']['stormControlEnabled']
                # x['payload'].update({'stormControlEnabled':False})


            
            if x['payload']['Port']['type'] == "Access":
                del x['payload']['Port']['type']
                x['payload'].update({"type": "access"})

                # change accessPolicyNumber from Name to number
                if x['payload']['Port']['Policy']['accessPolicyNumber'] == "HybridAuthISE":
                    x['payload'].update({"accessPolicyNumber": 1})
                    x['payload'].update({"vlan": x['payload']['Port']['Policy']['vlan']})
                    x['payload'].update({"voiceVlan": x['payload']['Port']['Policy']['voiceVlan']})   
                    del x['payload']['Port']['Policy']

                elif x['payload']['Port']['Policy']['accessPolicyNumber'] == "Open":
                    x['payload'].update({"accessPolicyNumber": 0})
                    x['payload'].update({"vlan": x['payload']['Port']['Policy']['vlan']})
                    x['payload'].update({"voiceVlan": x['payload']['Port']['Policy']['voiceVlan']})
                    del x['payload']['Port']['Policy']
                elif x['payload']['Port']['Policy']['accessPolicyNumber'] == "MAC Whitelist":
                    # convert macaddresses to list
                    macs = x['payload']['Port']['Policy']['macWhitelist']
                    maclist = macs.split(sep=",", maxsplit=-1)
                    x['payload'].update({"macWhitelist": maclist})
                    x['payload'].update({"vlan": x['payload']['Port']['Policy']['vlan']})
                    x['payload'].update({"voiceVlan": x['payload']['Port']['Policy']['voiceVlan']})
                    del x['payload']['Port']['Policy']
                elif x['payload']['Port']['Policy']['accessPolicyNumber'] == "Sticky MAC Whitelist":
                    # convert macaddresses to list
                    macs = x['payload']['Port']['Policy']['macWhitelist']
                    maclist = macs.split(sep=",", maxsplit=-1)
                    x['payload'].update({"vlan": x['payload']['Port']['Policy']['vlan']})
                    x['payload'].update({"voiceVlan": x['payload']['Port']['Policy']['voiceVlan']})
                    x['payload'].update({"stickyMacWhitelist": maclist})
                    x['payload'].update({"stickyMacWhitelistLimit": x['payload']['Port']['Policy']['stickyMacWhitelistLimit']})
                    del x['payload']['Port']['Policy']
                del x['payload']['Port']

                # data.append({'config' : x['payload'], 'number' : x['number']} )
 


            elif x['payload']['Port']['type'] == "Trunk":
                x['payload'].update({"type": "trunk"})
                x['payload'].update({"allowedVlans": x['payload']['Port']['allowedVlans']})
                x['payload'].update({"vlan": x['payload']['Port']['vlan']})
                # del x['payload']['Port']['type']
                # del x['payload']['Port']['Policy']
                del x['payload']['Port']

        
            data.append({'config' : x['payload'], 'number' : x['number']} )

        for x in data:
            number = x['number']
            config = json.dumps(x['config'])
            print('Iteration number',number)
            url = f"https://api.meraki.com/api/v0/devices/{SERIAL_NUM}/switchPorts/{number}"
            response = requests.request('PUT', url, headers=headers, data=config)
            response_data =response.json()
            print(response_data)
        return (response_data)

        #     if response_data['errors'][0] == 'Storm control is currently not supported in this network':
        #         x['config'].pop('stormControlEnabled')
        #         nostormControlEnabled = json.dumps(x['config'])
        #         for x in data:
        #             number = x['number']
        #             config = json.dumps(x['config'])

        #             url = f"https://api.meraki.com/api/v0/devices/{SERIAL_NUM}/switchPorts/{number}"
        #             response = requests.request('PUT', url, headers=headers, data=nostormControlEnabled)
        #             response_data =response.json()
        #         print(response_data)
        # return (response_data)
            


    except Exception as err:
        print('Exception: ',err)
        # return(err)
        

    


