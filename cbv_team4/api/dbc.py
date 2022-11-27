import cantools

class DBC(object):
    '''
    Description: Default constructor for dbc file
    '''
    def __init__(self):
        self.db = None

    '''
    Description: Initializes DBC file from cantools.db
    @param: filename: str: path of DBC file
    @param: frame_mask: int: mask applied to packets when decoding
    '''
    def add_file(self, filename: str, frame_mask=0x1FFFFFFF):
        self.db = cantools.db.load_file(filename=filename, frame_id_mask=frame_mask)
        
    '''
    Description: Access all DBC Node Messages of a DBC File
    @return: cantools.db.messages: Returns all CAN DBC Node messages.
    '''
    def messages(self):
        return self.db.messages
        
    '''
    Description: Decode a CAN Raw Message using the DBC File
    @param: param: str or int: parameter of a CAN Raw Message. May be Message ID or Message Name.
    @return: can.Message: Returns corresponding message.
    '''
    def decode(self, param):
        assert(param is not None, 'Field must not be left empty')
        if type(param) == int:
            return self.db.get_message_by_frame_id(param)
        return self.db.get_message_by_name(param)