class MGPortForwardingRules(object):
    def __init__(self, session):
        super(MGPortForwardingRules, self).__init__()
        self._session = session
    
    def getDeviceCellularGatewaySettingsPortForwardingRules(self, serial: str):
        """
        **Returns the port forwarding rules for a single MG.**
        https://developer.cisco.com/meraki/api/#!get-device-cellular-gateway-settings-port-forwarding-rules
        
        - serial (string)
        """

        metadata = {
            'tags': ['MG port forwarding rules'],
            'operation': 'getDeviceCellularGatewaySettingsPortForwardingRules',
        }
        resource = f'/devices/{serial}/cellularGateway/settings/portForwardingRules'

        return self._session.get(metadata, resource)

    def updateDeviceCellularGatewaySettingsPortForwardingRules(self, serial: str, **kwargs):
        """
        **Updates the port forwarding rules for a single MG.**
        https://developer.cisco.com/meraki/api/#!update-device-cellular-gateway-settings-port-forwarding-rules
        
        - serial (string)
        - rules (array): An array of port forwarding params
        """

        kwargs.update(locals())

        metadata = {
            'tags': ['MG port forwarding rules'],
            'operation': 'updateDeviceCellularGatewaySettingsPortForwardingRules',
        }
        resource = f'/devices/{serial}/cellularGateway/settings/portForwardingRules'

        body_params = ['rules']
        payload = {k: v for (k, v) in kwargs.items() if k in body_params}

        return self._session.put(metadata, resource, payload)

