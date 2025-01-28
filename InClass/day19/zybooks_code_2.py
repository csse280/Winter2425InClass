import pickledb

#This will load from file (creating if it does not exist)
# The second argument is if you would like to automatically save after each transaction (slower but safer)
db = pickledb.load('pickle.db', False)   

#This stores the key value pair
db.set('foo', 'bar')

#This retrieves the value associated with the key
loaded_value = db.get('foo')
print(loaded_value )

# This saves the current data to file 
# Would not be necessary if you had specified:
#    db = pickledb.load('pickle.db', True)  
# at the top of the file
db.dump()