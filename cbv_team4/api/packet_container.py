from packet import Packet

class Packet_Container(object):
    '''
    Description: Default contructor for Packet Container
    '''
    def __init__(self):
        self.session = {}
        self.saved = {}

    '''
    Description: View Session Packets and Saved Packets when printing Packet_Container class when referred to as string
    @return: str: String that prints all session packets and save packets of current project.
    '''
    def __str__(self):
        return f'Session Packets: {self.session}\nSaved Packets: {self.saved}'

    '''
    Description: Adds a packet to the saved container
    @param: packet: Packet: Packet to be added
    '''
    def add_saved(self, packet: Packet):
        assert packet is not None, 'Packet field must not be empty'
        self.saved[packet.id] = packet

    '''
    Description: Adds a packet to the session container
    @param: packet: Packet: Packet to be added
    '''
    def add_session(self, packet: Packet):
        assert packet is not None, 'Packet field must not be empty'
        self.session[packet.id] = packet

    '''
    Description: Returns a packet or all packets from saved container
    @param: id: int: id of desired packet
    @return: packet or set: packet with desired id if defined, otherwise all packets within saved container
    '''
    def get_saved(self, id=None):
        if id is None:
            return self.saved
        return self.saved[id]

    '''
    Desctiption: Returns a packet or all packets from session container
    @param: id: int of desired packet
    @return: packet or set: packet with desired id if defined, otherwise all packets within session container
    '''
    def get_session(self, id=None):
        if id is None:
            return self.session
        return self.session[id]
