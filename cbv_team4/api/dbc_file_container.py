import cantools

class dbc_file_container(object):
  def __init__(self, file_path = ''):
    self.db = cantools.db.load_file(file_path)