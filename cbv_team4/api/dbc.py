import cantools

class DBC(object):
    def __init__(self):
        self.db = None

    def add_file(self, filename: str, frame_mask=0x1FFFFFFF):
        self.db = cantools.db.load_file(filename=filename, frame_id_mask=frame_mask)

    def messages(self):
        return self.db.messages

    def decode(self, param):
        assert(param is not None, 'Field must not be left empty')
        if type(param) == int:
            return self.db.get_message_by_frame_id(param)
        return self.db.get_message_by_name(param)