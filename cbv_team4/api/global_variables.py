from dbc import DBC
from packet_container import Packet_Container
from node_container import Node_Container
from off_limits import Off_Limits
from project  import Project

numMount = 0
nodes = Node_Container()
packets = Packet_Container()
dbc = DBC()
oll = Off_Limits()
project = Project(-1, -1, -1, -1, -1, -1, -1, -1)