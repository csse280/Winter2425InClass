import flask

app = flask.Flask(__name__, static_folder="public", static_url_path="")

@app.get("/API/LOAD")
def handle_load():
    result = {"message": "Hello", "num": 7}
    return flask.jsonify(result)
    

app.run(host="0.0.0.0", port=8080, debug=True)
