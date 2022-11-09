from packet import Packet

class Packet_Container(object):
    '''
    Description: Default contructor for Packet Container
    '''
    def __init__(self):
        self.session = {}
        self.saved = {}

    '''
    Description: View Session Packets and Saved Packets when printing Packet_Container class when referred to as string
    @return: str: String that prints all session packets and save packets of current project.
    '''
    def __str__(self):
        return f'Session Packets: {self.session}\nSaved Packets: {self.saved}'

    '''
    Description: Adds a packet to the saved container
    @param: packet: Packet: Packet to be added
    '''
    def add_saved(self, packet: Packet):
        assert packet is not None, 'Packet field must not be empty'
        self.saved[packet.id] = packet

    '''
    Description: Adds a packet to the session container
    @param: packet: Packet: Packet to be added
    '''
    def add_session(self, packet: Packet):
        assert packet is not None, 'Packet field must not be empty'
        self.session[packet.id] = packet

    '''
    Description: Returns a packet or all packets from saved container
    @param: id: int: id of desired packet
    @return: packet or set: packet with desired id if defined, otherwise all packets within saved container
    '''
    def get_saved(self, id=None):
        if id is None:
            return self.saved
        return self.saved[id]

    '''
    Desctiption: Returns a packet or all packets from session container
    @param: id: int of desired packet
    @return: packet or set: packet with desired id if defined, otherwise all packets within session container
    '''
    def get_session(self, id=None):
        if id is None:
            return self.session
        return self.session[id]
    
    '''
    Description
    Ref: https://www.geeksforgeeks.org/python-program-for-bubble-sort/
    '''
    #TODO Implement with bubble sort for now. 
    #Question,should we sort the saved packets array? Or Give a temporary saved packet array to use to display in table?
    #Sort by highest ID,Lowest ID, Oldest ID or Most recent
    #We need to moduralize this method into smaller method by types of sorts instead of the sort_by method
    #This is textbook high cohesion...
    def sort_saved_by_highest_id(self, sort_by: int):
        s = [i for i in self.saved]
        n = len(self.saved)
        # optimize code, so if the array is already sorted, it doesn't need
        # to go through the entire process
        swapped = False
        # Traverse through all array elements
        for i in range(n-1):
            # range(n) also work but outer loop will
            # repeat one time more than needed.
            # Last i elements are already in place
            for j in range(0, n-i-1):

                # traverse the array from 0 to n-i-1
                # Swap if the element found is greater
                # than the next element
                if s[j] > s[j + 1]:
                    swapped = True
                    s[j], s[j + 1] = s[j + 1], s[j]
        
            if not swapped:
                # if we haven't needed to make a single swap, we
                # can just exit the main loop.
                return 'not swapped'
            else:
                #give a temporary saved packets list to view when the user chooses this option
                temporary_saved_packets = dict()
                for key in s:
                    temporary_saved_packets[key] = self.session[key]
                return temporary_saved_packets

    #This is logical cohesion...but it is what it is
    def sort_saved_by_lowest_id(self):
        s = [i for i in self.saved]
        n = len(self.saved)
        # optimize code, so if the array is already sorted, it doesn't need
        # to go through the entire process
        swapped = False
        # Traverse through all array elements
        for i in range(n-1):
            # range(n) also work but outer loop will
            # repeat one time more than needed.
            # Last i elements are already in place
            for j in range(0, n-i-1):

                # traverse the array from 0 to n-i-1
                # Swap if the element found is less than or equal
                # than the next element
                if s[j] <= s[j + 1]:
                    swapped = True
                    s[j], s[j + 1] = s[j + 1], s[j]
        
            if not swapped:
                # if we haven't needed to make a single swap, we
                # can just exit the main loop.
                return 'not swapped'
            else:
                #give a temporary saved packets list to view when the user chooses this option
                temporary_saved_packets = dict()
                for key in s:
                    temporary_saved_packets[key] = self.session[key]
                return temporary_saved_packets

    def sort_saved_by_oldest_id(self):
        pass 
    def sort_saved_by_newest_id(self):
        pass   

    #TODO Implement with bubbe sort for now.
    def sort_filter(self, sort_by: int):
        pass


    '''
    Description:
    @param:
    @param:
    '''
    def filter_saved(self, filter_type: int, filter_field):
        assert filter_type is not None and filter_field is not None, 'ID field must not be empty'

        f = []
        for key in self.saved:
            if filter_type == 0: # Node
                if self.saved[key].id == filter_field:
                    f.append(self.saved[key])
            elif filter_type == 1: # Timestamp
                if self.saved[key].timestamp == filter_field:
                    f.append(self.saved[key])
        return f

    '''
    Description:
    @param:
    @param: 
    '''
    def filter_session(self, filter_type: int, filter_field):
        assert filter_type is not None and filter_field is not None, 'ID field must not be empty'

        f = []
        for key in self.session:
            if filter_type == 0: # Node
                if self.session[key].id == filter_field:
                    f.append(self.session[key])
            elif filter_type == 1: # Timestamp
                if self.session[key].timestamp == filter_field:
                    f.append(self.session[key])
        return f

        
