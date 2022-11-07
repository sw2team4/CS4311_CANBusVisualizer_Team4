class Node_Container(object):
    '''
    Description: Default costructor for Node Container
    '''
    def __init__(self):
        self.node = {}

    '''
    Description: Creates a string format for container
    @return: str: String format of node container
    '''
    def __str__(self):
        return f'Nodes: {self.nodes}'

    '''
    Description: Add node to container
    @param: key: Node ID that points to a Message or a message container that are associated.
    @param: node: Node object
    '''
    def add(self, key, node):
        assert key is not None and node is not None, 'Fields must not by empty'
        self.node[key] = node

    '''
    Description: Returns a node or all nodes from container
    @param: id: int: id of desired node
    @return: node or set: node with desired id if defined, otherwise all nodes within container
    '''
    def get(self, id=None):
        if id is None:
            return self.node
        assert id in self.node.keys(), 'ID not found within set'
        return self.node[id]

