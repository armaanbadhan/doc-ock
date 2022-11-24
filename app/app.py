from flask import Flask, redirect, request, url_for
import dbinteract
from flask_cors import CORS, cross_origin
import base64

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'






@app.route("/login", methods=["POST"])           # login validation of user
def login():
    dict = request.json
    response = dbinteract.check_password(dict["username"], dict["password"])
    return str(response)


@app.route("/signup", methods=["POST"])          # signup of a new user
@cross_origin()
def signup():
    dict = request.json
    response = dbinteract.insert_user(
        username=dict["username"], 
        name=dict["name"], 
        email=dict["email"], 
        password=dict["password"],
        type_=dict["type"]
        )
    return "1" if response else "0"


@app.route("/doc-upload", methods=["POST"])      # user aploading a new document
def doc_upload():
    dict = request.json
    for i in dict:
        print(i, dict[i])
    with open(f"fileToSave.{dict['extension']}", "wb") as fh:
        fh.write(base64.b64decode(dict["data"]))
    return "uploaded or not uploaded"                   # sucessfully uploaded, give a unique iq type-username-1.2.3


@app.route("/<name>", methods=["GET"])          # signup of new user
def user(name):
    dict = request.json
    for i in dict:
        print(i, dict[i])
    return "all files of user"                 # return files of user


@app.route("/")                                         # useless
def hello():
    return "Hello World!"


if __name__ == "__main__":
    app.run(debug=True)
