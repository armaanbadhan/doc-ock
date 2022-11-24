from flask import Flask, request
import dbinteract
from flask_cors import CORS, cross_origin

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'



@app.route("/login", methods=["POST"])
def login():
    dict = request.json
    response = dbinteract.check_password(dict["username"], dict["password"])
    return str(response)


@app.route("/signup", methods=["POST"])
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
    status = dbinteract.insert_file(
        filecat = dict["filecat"], 
        username = dict["username"], 
        extension = dict["extension"], 
        status = "0", 
        data = dict["data"]
    )
    return str(status)


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
