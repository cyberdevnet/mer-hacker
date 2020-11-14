from ttp import ttp
import io
import os
import re
from pathlib import Path
import json


# dirname = os.path.dirname(__file__)
# abspath = os.path.abspath(__file__)
# log_file = os.path.abspath(__file__ + "/../../logs/log_file.log")


def ios_to_meraki(serial_numbers, USER):
    dirname = os.path.dirname(__file__)
    abspath = os.path.abspath(__file__)
    log_file = os.path.abspath(
        __file__ + "/../../logs/{}_log_file.log".format(USER))
    backup_path = os.path.abspath(__file__ + "/../config_backups/backups")
    for filename in os.listdir(backup_path):
        try:
            backup_file = (backup_path + '/{}'.format(filename))
            dirname = os.path.dirname(__file__)
            filename = os.path.join(
                dirname, '{}_build_meraki_switchconfig.py'.format(USER))

            template_file = dirname+'/ttp/interfaces.j2'

            # comma separated SN if stack-switch
            # serial_numbers = ['GGG-JJJ-KKK', 'HHH-JJJ-KKK', 'RRR-HHH-ZZZ']
            splitSN = serial_numbers.split(",")
            serial_numbers = splitSN
            parser = ttp(data=backup_file, template=template_file)
            parser.parse()
            interfaces = parser.result()[0][0]

            payloadModel = {
                "name": None,
                "tags": None,
                "enabled": 'true',
                "poeEnabled": 'true',
                "type": "access",
                "vlan": 999,
                "voiceVlan": 1,
                "allowedVlans": 'all',
                "isolationEnabled": 'false',
                "rstpEnabled": 'true',
                "stpGuard": "disabled",
                "accessPolicyNumber": "1",
                "linkNegotiation": "Auto negotiate",
                "number": 1
            }

            with io.open(filename, 'w', encoding='utf-8', errors='ignore') as file:
                f = open(log_file, 'w')
                print('Writing script file {}_build_meraki_switchconfig.py'.format(
                    USER), file=f)
                f.flush()

                # Start writing Function block
                file.write("#!/usr/bin/env python3\n")
                file.write("#-*- coding: utf-8 -*-\n")
                file.write("#\n")
                file.write("#\n")
                file.write("import os\n")
                file.write("import argparse\n")
                file.write("import requests\n")
                file.write("\n")
                file.write("\n")
                file.write("def build_switchports(ARG_APIKEY,USER):\n")
                file.write("\tabspath = os.path.abspath(__file__)\n")
                file.write(
                    "\tlog_file = os.path.abspath(__file__  + ""'/../../logs/{}_log_file.log'.format(USER)"")\n")
                file.write("\tf = open(log_file, 'w')\n")
                file.write("\n")
                file.write("\theaders = {\n")
                file.write("\t\t'x-cisco-meraki-api-key': ARG_APIKEY,\n")
                file.write("\t\t'Content-Type': 'application/json',\n")
                file.write("\t\t'Accept': 'application/json',\n")
                file.write("\t\t}\n")
                file.write("\n")
                file.write("\tsession = requests.Session()\n")
                file.write("\n")
                file.write("\n")
                file.write(
                    "# Configuring Meraki Switchport from a Cisco Ios running-config\n")
                file.write("\n")
                file.write("\n")
                file.write("\ttry:\n")
                file.write(
                    "\t\tprint('Starting configuration switchports',file=f)\n")
                file.write(
                    "\t\tf.flush()\n")

                interface_type = ''
                for x in interfaces:
                    length = len(x['interface'])

                    # finding interface type/pattern
                    if x['interface'][0] == 'F':
                        interface_type = 'FastEthernet'
                    if x['interface'][0] == 'G':
                        interface_type = 'GigabitEthernet'
                    if x['interface'][0] == 'T':
                        interface_type = 'TenGigabitEthernet'
                    if x['interface'][0] == 'V':
                        interface_type = 'Vlan'
                    if x['interface'][0] == 'L':
                        interface_type = 'Loopback'
                    if x['interface'][0] == 'P':
                        interface_type = 'Port-channel'

                    # skipping interface that are not switchport
                    # like FastEthernet1, GigabitEthernet0 or Vlan
                    if interface_type == 'FastEthernet' and length == 13:
                        print('Interface '+x['interface']+' ignored', file=f)
                        f.flush()
                        continue
                    if interface_type == 'GigabitEthernet' and length == 16:
                        print('Interface '+x['interface']+' ignored', file=f)
                        f.flush()
                        continue
                    if interface_type == 'TenGigabitEthernet':
                        print('Interface '+x['interface']+' ignored', file=f)
                        f.flush()
                        continue
                    if interface_type == 'Vlan':
                        print('Interface '+x['interface']+' ignored', file=f)
                        f.flush()
                        continue
                    if interface_type == 'Loopback':
                        print('Interface '+x['interface']+' ignored', file=f)
                        f.flush()
                        continue
                    if interface_type == 'Port-channel':
                        print('Interface '+x['interface']+' ignored', file=f)
                        f.flush()
                        continue

                    if 'interface' in x:
                        print('Writing Switchport', x['interface'], file=f)
                        f.flush()
                        length = len(x['interface'])

                        # parsing interface type FastEthernet0/1 or FastEthernet1/0/1
                        if interface_type == 'FastEthernet' and length == 15:
                            number = x['interface'][length - 1:]
                            stack_number = x['interface'][12]
                            SN = serial_numbers[int(stack_number)]
                            print('Switch '+SN, file=f)
                            file.write("\t\tputurl = 'https://api.meraki.com/api/v0/devices/" +
                                       SN+"/switchPorts/"+number+"'\n")
                            file.write(
                                "\t\tprint('Building configuration SwitchPort"+number+" switch "+SN+"',file=f)\n")
                            payloadModel.update({"number": number})
                            file.write("\t\tf.flush()\n")

                        if interface_type == 'FastEthernet' and length == 16:
                            number = x['interface'][length - 2:]
                            stack_number = x['interface'][12]
                            SN = serial_numbers[int(stack_number)]
                            print('Switch '+SN, file=f)
                            file.write("\t\tputurl = 'https://api.meraki.com/api/v0/devices/" +
                                       SN+"/switchPorts/"+number+"'\n")
                            file.write(
                                "\t\tprint('Building configuration SwitchPort"+number+" switch "+SN+"',file=f)\n")
                            payloadModel.update({"number": number})
                            file.write("\t\tf.flush()\n")

                        if interface_type == 'FastEthernet' and length == 17:
                            if x['interface'][14] == '0':
                                number = x['interface'][length - 1:]
                                stack_number = x['interface'][12]
                                SN = serial_numbers[int(stack_number) - 1]
                                print('Switch '+SN, file=f)
                                file.write("\t\tputurl = 'https://api.meraki.com/api/v0/devices/" +
                                           SN+"/switchPorts/"+number+"'\n")
                                file.write(
                                    "\t\tprint('Building configuration SwitchPort"+number+" switch "+SN+"',file=f)\n")
                                payloadModel.update({"number": number})
                                file.write("\t\tf.flush()\n")

                        if interface_type == 'FastEthernet' and length == 18:
                            if x['interface'][14] == '0':
                                number = x['interface'][length - 2:]
                                stack_number = x['interface'][12]
                                SN = serial_numbers[int(stack_number) - 1]
                                print('Switch '+SN, file=f)
                                file.write("\t\tputurl = 'https://api.meraki.com/api/v0/devices/" +
                                           SN+"/switchPorts/"+number+"'\n")
                                file.write(
                                    "\t\tprint('Building configuration SwitchPort"+number+" switch "+SN+"',file=f)\n")
                                payloadModel.update({"number": number})
                                file.write("\t\tf.flush()\n")

                        # parsing interface type GigabitEthernet0/1 or GigabitEthernet1/0/1
                        if interface_type == 'GigabitEthernet' and length == 18:
                            number = x['interface'][length - 1:]
                            stack_number = x['interface'][15]
                            SN = serial_numbers[int(stack_number)]
                            print('Switch '+SN, file=f)
                            file.write("\t\tputurl = 'https://api.meraki.com/api/v0/devices/" +
                                       SN+"/switchPorts/"+number+"'\n")
                            file.write(
                                "\t\tprint('Building configuration SwitchPort"+number+" switch "+SN+"',file=f)\n")
                            payloadModel.update({"number": number})
                            file.write("\t\tf.flush()\n")

                        if interface_type == 'GigabitEthernet' and length == 19:
                            number = x['interface'][length - 2:]
                            stack_number = x['interface'][15]
                            SN = serial_numbers[int(stack_number)]
                            print('Switch '+SN, file=f)
                            file.write("\t\tputurl = 'https://api.meraki.com/api/v0/devices/" +
                                       SN+"/switchPorts/"+number+"'\n")
                            file.write(
                                "\t\tprint('Building configuration SwitchPort"+number+" switch "+SN+"',file=f)\n")
                            payloadModel.update({"number": number})
                            file.write("\t\tf.flush()\n")

                        if interface_type == 'GigabitEthernet' and length == 20:
                            if x['interface'][17] == '0':
                                number = x['interface'][length - 1:]
                                stack_number = x['interface'][15]

                                SN = serial_numbers[int(stack_number) - 1]
                                print('Switch '+SN, file=f)

                                file.write("\t\tputurl = 'https://api.meraki.com/api/v0/devices/" +
                                           SN+"/switchPorts/"+number+"'\n")
                                file.write(
                                    "\t\tprint('Building configuration SwitchPort"+number+" switch "+SN+"',file=f)\n")
                                payloadModel.update({"number": number})
                                file.write("\t\tf.flush()\n")

                        if interface_type == 'GigabitEthernet' and length == 21:
                            if x['interface'][17] == '0':
                                number = x['interface'][length - 2:]
                                stack_number = x['interface'][15]

                                SN = serial_numbers[int(stack_number) - 1]
                                print('Switch '+SN, file=f)

                                file.write("\t\tputurl = 'https://api.meraki.com/api/v0/devices/" +
                                           SN+"/switchPorts/"+number+"'\n")
                                file.write(
                                    "\t\tprint('Building configuration SwitchPort"+number+" switch "+SN+"',file=f)\n")
                                payloadModel.update({"number": number})
                                file.write("\t\tf.flush()\n")

                        if 'description' in x:
                            name = x['description']
                            payloadModel.update({'name': name})

                        else:
                            pass
                        if 'switchport_mode' in x:
                            mode = x['switchport_mode']
                            payloadModel.update({'type': mode})

                            if x['switchport_mode'] == 'access':
                                if 'dot1x_pae' in x:
                                    accessPolicyNumber = 1
                                    payloadModel.update(
                                        {'accessPolicyNumber': accessPolicyNumber})
                                else:
                                    accessPolicyNumber = None
                                    payloadModel.update(
                                        {'accessPolicyNumber': accessPolicyNumber})
                            elif x['switchport_mode'] == 'trunk':
                                payloadModel.update(
                                    {'voiceVlan': None, 'accessPolicyNumber': None})
                                if 'switchport_native_vlan' in x:
                                    vlan = x['switchport_native_vlan']
                                    payloadModel.update({'vlan': vlan})
                                else:
                                    payloadModel.update({'vlan': 1})
                                if 'switchport_trunk_vlans' in x:
                                    allowedVlans = x['switchport_trunk_vlans']
                                    payloadModel.update(
                                        {'allowedVlans': allowedVlans})
                                else:
                                    pass

                        else:
                            pass

                        if 'switchport_access_vlan' in x:
                            vlan = x['switchport_access_vlan']
                            payloadModel.update({'vlan': vlan})
                        else:
                            pass
                        if 'switchport_voice_vlan' in x:
                            voiceVlan = x['switchport_voice_vlan']
                            payloadModel.update({'voiceVlan': voiceVlan})

                        else:
                            pass
                        if 'spanning_tree' in x:
                            if x['spanning_tree'] == 'portfast':
                                rstpEnabled = 'true'
                                payloadModel.update(
                                    {'rstpEnabled': rstpEnabled})
                        else:
                            pass
                        if 'spanning_tree_bpduguard' in x:
                            if x['spanning_tree_bpduguard'] == 'enable':
                                stpGuard = 'bpdu guard'
                                payloadModel.update({'stpGuard': stpGuard})

                        else:
                            pass

                        # replace None with null in payload
                        for key, value in x.items():
                            if value == None:
                                a = "null"
                                b = a.strip('"')
                                x[key] = b

                        length = len(x['interface'])
                        # parsing interface type FastEthernet0/1 or FastEthernet1/0/1
                        if interface_type == 'FastEthernet' and length == 15 or length == 16:
                            dumpsport = json.dumps(payloadModel)
                            file.write("\t\tpayload = '"+dumpsport+"'\n")
                            file.write(
                                "\t\tresponse = requests.request('PUT', puturl, headers=headers, data = payload)\n")
                            file.write(
                                "\t\tprint('Response: ',response.status_code,file=f)\n")

                        else:
                            pass
                        if interface_type == 'FastEthernet' and length >= 17:
                            if x['interface'][14] == '0':

                                dumpsport = json.dumps(payloadModel)
                                file.write("\t\tpayload = '"+dumpsport+"'\n")
                                file.write(
                                    "\t\tresponse = requests.request('PUT', puturl, headers=headers, data = payload)\n")
                                file.write(
                                    "\t\tprint('Response: ',response.status_code,file=f)\n")

                            else:
                                pass

                        # parsing interface type GigabitEthernet0/1 or GigabitEthernet1/0/1
                        if interface_type == 'GigabitEthernet' and length == 18 or length == 19:
                            dumpsport = json.dumps(payloadModel)
                            file.write("\t\tpayload = '"+dumpsport+"'\n")
                            file.write(
                                "\t\tresponse = requests.request('PUT', puturl, headers=headers, data = payload)\n")
                            file.write(
                                "\t\tprint('Response: ',response.status_code,file=f)\n")

                        else:
                            pass
                        if interface_type == 'GigabitEthernet' and length >= 20:
                            if x['interface'][17] == '0':

                                dumpsport = json.dumps(payloadModel)
                                file.write("\t\tpayload = '"+dumpsport+"'\n")
                                file.write(
                                    "\t\tresponse = requests.request('PUT', puturl, headers=headers, data = payload)\n")
                                file.write(
                                    "\t\tprint('Response: ',response.status_code,file=f)\n")

                            else:
                                pass
                        else:
                            pass
                    else:
                        print('No interfaces found or invalid file.', file=f)
                        pass

                file.write("\texcept requests.exceptions.HTTPError as err:\n")
                file.write("\t\tprint(err,file=f)\n")
                file.write(
                    "\t\tprint('There was an error configuring the switchs configuration, check the logs for more details.',file=f)\n")
                file.write(
                    "\tprint('Switch configuration complete.',file=f)\n")
                file.write("\tf.flush()\n")
                file.write("\tf.close()\n")
                file.write("\n")
                file.flush()
                print('Writing complete, check the script before restore.', file=f)
                f.flush()
                # f.close()
        except Exception as err:
            print('ciao')
            print(
                'No interfaces found,invalid file or serial-number not in list.', file=f)
            print('Exception: ', err)
            print('Exception: ', err, file=f)
            with io.open(filename, 'w', encoding='utf-8', errors='ignore') as file:
                # Start writing Function block
                file.write("#!/usr/bin/env python3\n")
                file.write("#-*- coding: utf-8 -*-\n")
                file.write("#\n")
                file.write(
                    "# Search for \"#restored\" and edit below that to control what is restored.\n")
                file.write("#\n")
                file.write("import os\n")
                file.write("import argparse\n")
                file.write("import requests\n")
                file.write("\n")
                file.write("\n")
                file.write("def build_switchports(ARG_APIKEY):\n")
                file.write("\tabspath = os.path.abspath(__file__)\n")
                file.write(
                    "\tlog_file = os.path.abspath(__file__  + ""'/../../logs/{}_log_file.log'.format(USER)"")\n")
                file.write("\tf = open(log_file, 'w')\n")
                file.write("\n")
                file.write("\theaders = {\n")
                file.write("\t\t'x-cisco-meraki-api-key': ARG_APIKEY,\n")
                file.write("\t\t'Content-Type': 'application/json',\n")
                file.write("\t\t'Accept': 'application/json',\n")
                file.write("\t\t}\n")
                file.write("\n")
                file.write("\tsession = requests.Session()\n")
                file.write("\n")
                file.write("\n")
            return {'error': err}
    # file.close()


# if __name__ == "__main__":
#     ios_to_meraki(serial_numbers, USER)
