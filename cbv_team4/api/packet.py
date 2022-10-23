class packet(object):
    def __init__(self, timestamp, type, id, data, decoded=-1):
        self.timestamp = timestamp
        self.type = type
        self.id = id
        self.data = data
        self.decoded = decoded
        self.prev = []

    def __str__(self):
        return f'\nTimestamp: {hex(self.timestamp)} Type: {self.type} ID: {hex(self.id)} Data: {hex(self.data)} \nDecoded: {self.decoded} \nPrevious Versions: {self.prev}'
