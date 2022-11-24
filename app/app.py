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
        filecat = str(dict["filecat"]), 
        username = dict["username"], 
        extension = dict["extension"], 
        status = "0", 
        data = dict["data"]
    )
    return str(status)


@app.route("/fetch-admin", methods=["GET"])
def fetch_admin():
    return dbinteract.fetch_files_all()


@app.route("/file/<username>", methods=["GET"])
def user(username):
    return dbinteract.fetch_user_files(username)


@app.route("/status-update", methods=["POST"])
def admin_status_update():
    dict = request.json
    dbinteract.update_status(fileid=dict["fileid"], status=dict["status"])
    return '1'


@app.route("/")
def hello():
    return "Hello World!"


if __name__ == "__main__":
    app.run(debug=True)
