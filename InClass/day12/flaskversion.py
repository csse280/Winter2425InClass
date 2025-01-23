import flask

shopping_list = {}

app = flask.Flask(__name__, 
                  static_folder="public", 
                  static_url_path="")

@app.get("/API/LOAD")
def handle_load():
    return flask.jsonify(shopping_list)

@app.post("/API/SAVE")
def handle_save():
    global shopping_list
    print("/API/SAVE invoked, post_data:")
    shopping_list = flask.request.json
    return flask.jsonify(f"Success!")    
    
app.run(host="0.0.0.0", port=8080, debug=True)