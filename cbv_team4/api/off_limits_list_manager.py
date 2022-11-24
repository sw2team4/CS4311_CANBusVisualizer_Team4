from off_limits import Off_Limits

from flask import Blueprint

#Must put this blueprint in api.py so that these routes can be called
off_limits_list_manager = Blueprint('off_limits_list_manager', __name__)

'''
Description: Adds a node to Off-limits list.
@return: str: 
'''
off_limits_list_manager.route('/oll_add')
def oll_add():
    pass
    
'''
Description: Removes a node to Off-limits list.
@return: str: 
'''
off_limits_list_manager.route('/oll_delete')
def oll_delete():
    pass
        
'''
Description: Allows for viewing of Off-limits list.
@return: str: Off-limits list in JSON format.
'''
off_limits_list_manager.route('/oll_view')
def oll_view():
    pass

'''
Description: Allows to modify a node within the off limits list
@return: str: 
'''
off_limits_list_manager.route('/oll_modify')
def oll_modify():
    pass