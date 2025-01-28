import flask
import json
import os

#Done 0. import pickledb
from pickledb import PickleDB

#Done 1. load empty file "shopping.db"
db = PickleDB('shopping.db')

#Done 2. Create a dictionary in database if it does not exist yet "shopping"
db_name = "shopping"
if db.get(db_name) is None:
    db.set(db_name, {})

#Done 3. remove in-memory dictionary and replace with pickledb
# shopping_list={}

app = flask.Flask(__name__,             # ie "http_server_starter"
            static_url_path='', 	    # Treat all files as static files.
            static_folder='public')	    # Look in the public folder.

#Done 4. load the dictionary key values from db instead of memory
@app.get("/API/LOAD")
def handle_load():
    return flask.jsonify(db.get(db_name))


#Done 5. refactor save code to use db instead of memory, make sure to save the data to the db

@app.post("/API/SAVE")
def handle_save():
    post_data = flask.request.form
    print("/API/SAVE invoked, post_data:")
    print(post_data)
    shopping_list = db.get(db_name)
    new_keys=0
    for key in post_data.keys():
        if not key in shopping_list:
            new_keys+=1
        shopping_list[key] = post_data[key]
    db.set(db_name, shopping_list)
    db.save()

    data = json.dumps( f"OK. Added {new_keys} new items." )
    return flask.Response(data, status=200, headers={
        "Content-Type": "text/javascript; charset=utf-8"
    })



app.run(host='0.0.0.0', port=8080, debug=True)