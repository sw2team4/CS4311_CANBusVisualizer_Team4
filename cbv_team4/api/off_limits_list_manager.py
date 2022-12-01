from global_variables import oll, dbc
from flask_cors import CORS
from flask import Blueprint

#Must put this blueprint in api.py so that these routes can be called
off_limits_list_manager = Blueprint('off_limits_list_manager', __name__)
CORS(off_limits_list_manager)

mount = 0

'''
Description: Adds a node to Off-limits list.
@return: str: 
'''
@off_limits_list_manager.route('/oll_add')
def oll_add():
    pass
    
'''
Description: Removes a node to Off-limits list.
@return: str: 
'''
@off_limits_list_manager.route('/oll_delete')
def oll_delete():
    pass
        
'''
Description: Allows for viewing of Off-limits list.
@return: str: Off-limits list in JSON format.
'''
@off_limits_list_manager.route('/oll_view')
def oll_view():
    global mount
    mount += 1
    if mount % 2 != 0:
        return {'oll': []}

    json = []
    for id in oll.get_all():
        msg = dbc.decode(int(id, 16))
        decoded = {'id': hex(msg.frame_id), 'name': str(msg.name), 'comment' : str(msg.comment)}
        json.append(decoded)
    #print(json)
    return {'oll': json} 
'''
Description: Allows to modify a node within the off limits list
@return: str: 
'''
@off_limits_list_manager.route('/oll_modify')
def oll_modify():
    pass