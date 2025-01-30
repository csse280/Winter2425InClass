import flask

leaderboard = []
leaderboard.append({"name": "Dave0", "numMoves": 100})
leaderboard.append({"name": "Dave1", "numMoves": 200})
leaderboard.append({"name": "Dave2", "numMoves": 300})
leaderboard.append({"name": "Dave3", "numMoves": 400})
leaderboard.append({"name": "Dave4", "numMoves": 500})
leaderboard.append({"name": "Dave5", "numMoves": 600})

app = flask.Flask(__name__, static_folder="public", static_url_path="")

@app.get("/")
def handle_naked_domain():
    return flask.redirect("/index.html")


@app.get("/api/leaderboard")
def handle_leaderboard():
    return flask.jsonify(leaderboard[:5])


@app.get("/api/threshold")
def handle_threshold():
    thresold = 99
    if len(leaderboard) >= 5:
        thresold = leaderboard[4]["numMoves"]
    return flask.jsonify( {"threshold": thresold} )

@app.post("/api/add_name")
def handle_add_name():
    print("/api/add_name invoked, post_data:")
    post_data = flask.request.json
    print(post_data)
    num_moves = post_data["numMoves"]
    insert_at = len(leaderboard)
    for k in range(len(leaderboard)):
        current_num_moves = leaderboard[k]["numMoves"]
        if num_moves <= current_num_moves:
            insert_at = k
            break
    leaderboard.insert(insert_at, post_data)
    return flask.jsonify(leaderboard[:5])    
    
app.run(host="0.0.0.0", port=8080, debug=True)