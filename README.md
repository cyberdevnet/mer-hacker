<h1 align="center">
  <br>
  <a href="https://imgbb.com/"><img src="https://i.ibb.co/S6PZnsk/Mer-Haker-big.png" alt="Mer-Haker-big" border="0" /></a>
  <br>
  Mer-hacker
  <br>
</h1>

<h4 align="center">Mer-hacker is a troubleshoting and configuration application for Meraki organizations, built with react, python3 and nodejs.</h4>

<p align="center">
  <a href="#description">Description</a> •
  <a href="#dashboard">Dashboard</a> •
  <a href="#tools">Tools</a> •
  <a href="#topology">Topology</a> •
  <a href="#how-to-use">How To Use</a> •
  <a href="#live-demo">Live Demo</a> •
  <a href="#credits">Credits</a> •
  <a href="#related">Related</a> •
  <a href="#license">License</a>
</p>

## Description

Mer-hacker is a troubleshoting and configuration application for Meraki organizations, useful for daily basis repetitive tasks.
Most of the functions available are custom and not present in the Meraki dashboard.
The goal of mer-hacker is to simplify some troubleshooting and configuration tasks visualizing the output of python script fetched from the Meraki API in a beautiful manner using, tables, charts and much more.

## Dashboard

  - A simple dashboard with charts for latency/packet-loss visualization, devices count, devices status and more
  
     <p align="center">
        <img src="https://media.giphy.com/media/PI9aoZNqSP06vyfhuS/source.gif" width="750" height="400"/>
     </p>


## Tools

- Get all devices IPs
  - This scripts returns all the IPs, serial-numbers and models of all devices assigned to the selected network.
- Get all subnets
  - This scripts returns all VLANs configured in a network.
  - The script works only on MX and Z3 devices, does not work on VPN HUBs, the network must be reachable in the Meraki Dashboard.
- Get all Organization subnets

  - This script iterates through all networks in an organization and returns all the subnets and VLANs associated with every network.
  - The script works only on MX and Z3 devices, does not work on VPN HUBs, the network must be reachable in the Meraki Dashboard.

- Get all Clients

  - This scripts returns all the clients active in the last 1 hour on a network.

- Get all SwitchPorts
  - This scripts returns all the Switchports of a selected Switch.
- Network Top Users Report

  - This script finds the top 10 heaviest bandwidth users of an MX security appliance in the last 10, 30 and 60 minutes.

- Find Port

  - This script finds the switch and ports where a clients is connected, searching either by clients MAC address or IP address.
  - This script works only on MS-series switch.

- Network Analysis

  - This script aggregates all of the detected applications for a given time frame or device type.
  - Time frame options for hourly, weekly, daily and monthly are available.
  - Device type options for combined, switch, wireless and appliance are available.

- Backup & Restore

  - This script makes a snapshot of a network and creates a downloadable python file used to restore the configuration.
  - The configuration will be restored creating a new network with name "your-new-network-restore"
  - Since the Switchs configuration is lost when a device is moved to another network, the backup process must be run in two steps.

    - Run Backup.
    - Review the script snapshot before starting the restore.
    - Download the script(optional).
    - Restore the configuration (a new network with name "your-new-network-restore" will be created).
    - Go to your Meraki dashboard and move your devices to the newly created network.
    - Restore the switchports configuration.

  - Note that the Restore will not overwrite existing networks but creates a new one.
  - The script can be modified before the Restore process (basic knowledge of python required).

- Migrate Tool

  - This script converts a cisco running-config into a Meraki Switch-Port configuration and creates a downloadable python file used to push the new switchport configuration.
  - Before to convert and push the configuration be sure to:

    - Check if the switch serial-number has been claimed for you Organization.
    - Check if the new switch has been added to the right Network
    - Check if the an Access Policy is configured

  - Instructions:
    - Insert the serial number or a list of comma-separated serial-numbers
    - Load the Cisco running-config, the file must be in .txt format
    - Convert the configuration
    - Check the script
    - The script can be modified before the pushing the configuration (basic knowledge of python required).
    - Download the script(optional).
    - Push the configuration to the meraki Switch
    - Go to your Meraki dashboard and check if the configuration is successfully uploaded

- Switchport Templates

  - This tool is useful when no Meraki template are in use or you want to ovveride the switchport configuration.
  - You can create a set of Switchport Templates and save/modify it for later use.
    - Insert the serial number or a list of comma-separated serial-numbers
    - Load the Cisco running-config, the file must be in .txt format
    - Convert the configuration
    - Check the script
    - The script can be modified before the pushing the configuration (basic knowledge of python required).
    - Download the script(optional).
    - Push the configuration to the meraki Switch
    - Go to your Meraki dashboard and check if the configuration is successfully uploaded
  - Please note: There's currently a bug in the APi preventing the StormControl configuration
  
       <p align="center">
        <img src="https://media.giphy.com/media/nAZM5lWwKsKMpA5qUg/giphy.gif" width="750" height="400"/>
        </p>

- Change log
  - This scripts returns all changes have been made in an organization.
    - You can filter the result based on Administrator, specific network or time Interval (default 1 week)
    - Click on a row to display the change details
- Inventory
  - This scripts returns the inventory for the selected organization.
  
## Topology

- Two type of topology are available:
  - Client Topology
    - Client Topology shows you a map of all VPN spokes connected to a central Hub
  - VPN topology
    - VPN topology shows you a detailed topology of all hosts connected to an MX, MS or MR device, client IP adresses, mac, switchports and much more.
    
     <p align="center">
        <img src="https://media.giphy.com/media/wFqlTYfAZEpCM116a9/giphy.gif" width="750" height="400"/>
     </p>

## How To Use

- Instruction:
  - To run Mer-hacker on your server you need:
    - Detailed instruction WIP
    
## Live Demo
- A full functional demo is available here: http://mer-hacker.com/login
  - username: mer-hacker
  - password: mer-hacker
  - To try out you can use the Meraki always-on api-key => https://developer.cisco.com/meraki/meraki-platform/
  - a session timeout of 15 minutes will log you out on idle
  - only 1 user log-in is supported, if the application is currently used please wait until session is completed
  
  - please remeber that:
    
     <p align="center">
        <img src="https://tenor.com/view/spiderman-responsibility-gif-4589950.gif" width="480" height="257"/>
     </p>

## Credits
  - some of the tools used by this application are heavily inspired by:
    - https://github.com/meraki/automation-scripts 
    - https://www.ifm.net.nz/cookbooks/meraki-backup.html

## Related

## License

MIT License

Copyright (c) 2020 cyberdevnet

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
