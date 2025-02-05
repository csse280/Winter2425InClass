import flask
import json
import os


shopping_list={}

app = flask.Flask(__name__,             # ie "http_server_starter"
            static_url_path='', 	    # Treat all files as static files.
            static_folder='public')	    # Look in the public folder.

@app.get("/shutdown")
def shutdown():
    print("Shutting down the server")
    os._exit(0)

@app.get("/API/LOAD")
def handle_load():
    data = json.dumps(shopping_list)
    return flask.Response(data, status=200, headers={
        "Content-Type": "text/javascript; charset=utf-8"
    })

@app.post("/API/SAVE")
def handle_save():
    post_data = flask.request.form
    print("/API/SAVE invoked, post_data:")
    print(post_data)
    new_keys=0
    for key in post_data.keys():
        if not key in shopping_list:
            new_keys+=1
        shopping_list[key] = post_data[key]

    data = json.dumps( f"OK. Added {new_keys} new items." )
    return flask.Response(data, status=200, headers={
        "Content-Type": "text/javascript; charset=utf-8"
    })

# TODO - Change Port to an appropriate individual port for yourself
app.run(host='0.0.0.0', port=5001)