import json

# Example dictionary
data = {'name': 'Dave Fisher', 'age': 48, 'occupation': 'Professor'}

# Save the dictionary to a file using json library
with open('json_data.db', 'w') as file:
    json_string = json.dumps(data)
    file.write( json_string  )

# Load the dictionary back from the file
with open('json_data.db', 'r') as file:
    loaded_data = json.load(file)

# Print the loaded dictionary
print(loaded_data)