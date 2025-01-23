import flask

shopping_list={}

app = flask.Flask(__name__, static_folder="public", static_url_path="")

@app.get("/API/LOAD")
def handle_load():
    return flask.jsonify(shopping_list)

@app.post("/API/SAVE")
def handle_save():
    print("/API/SAVE invoked, post_data:")
    post_data = flask.request.form
    print(post_data)
    new_keys=0
    for key in post_data.keys():
        if not key in shopping_list:
            new_keys+=1
        shopping_list[key] = post_data[key]
    return flask.jsonify(f"OK. Added {new_keys} new items.")    
    
app.run(host="0.0.0.0", port=8080, debug=True)