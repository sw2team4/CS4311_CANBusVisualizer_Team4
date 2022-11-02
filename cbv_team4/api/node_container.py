class Node_Container(object):
    def __init__(self):
        self.node = {}

    def __str__(self):
        return f'Nodes: {self.nodes}'

    def add(self, key, node):
        assert(key is not None and node is not None, 'Fields must not by empty')
        self.node[key] = node

    def get(self, id=None):
        if id is None:
            return self.node
        assert(id in self.node.keys(), 'ID not found within set')
        return self.node[id]

