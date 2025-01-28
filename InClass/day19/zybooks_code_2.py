from pickledb import PickleDB

# Initialize the database
db = PickleDB('my_database.db')

# Add a key-value pair
db.set('greeting', 'Hello, world!')

# Retrieve the value
print(db.get('greeting'))  # Output: Hello, world!

# Save the data to disk
db.save()