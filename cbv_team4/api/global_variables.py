from dbc import DBC
from packet_container import Packet_Container
from node_container import Node_Container
# TODO: 
# - ADD PROJECT MANAGER INSTANCE TO GLOBALS
# - CREATE PROJECT MANAGER CLASS TO CONTAIN PID AND OTHER USEFUL FUNCTIONS
pid = -1 # unique projet id
nodes = Node_Container()
packets = Packet_Container()
dbc = DBC()