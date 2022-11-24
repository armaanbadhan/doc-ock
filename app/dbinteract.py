import psycopg2
import psycopg2.errors
import psycopg2.extras

hostname = "localhost"
database = "demo"
username = "postgres"
pwd = "admin"
port_id = 5432

conn = psycopg2.connect(
    host = hostname,
    dbname = database,
    user = username,
    password = pwd,
    port = port_id
)

cur = conn.cursor(cursor_factory=psycopg2.extras.DictCursor)


# def create_users_table():
#     create_script = """
#     CREATE TABLE IF NOT EXISTS users (
#         username    varchar(30) PRIMARY KEY,
#         name        varchar(40),
#         email       varchar(40),
#         password    varchar(80),
#         type        varchar(5)
#     )
#     """
#     cur.execute(create_script)
#     conn.commit()


# def create_files_table():
#     create_script = """
#     CREATE TABLE IF NOT EXISTS files (
#         fileid      varchar(50) PRIMARY KEY,
#         username    varchar(30),
#         filecat     varchar(40),
#         extension   varchar(10),
#         status      varchar(10),
#         data        text
#     )
#     """
#     cur.execute(create_script)
#     conn.commit()


def check_if_username_exists(username):
    check_script = "SELECT COUNT(*) FROM users WHERE username=%s"
    check_value = (username,)
    cur.execute(check_script, check_value)
    return cur.fetchone()[0]

def check_password(username, password):
    check_script = "SELECT COUNT(*) FROM users WHERE username=%s AND password=%s"
    check_value = (username,password,)
    cur.execute(check_script, check_value)
    ret = cur.fetchone()[0]

    if not ret:
        return ret
    
    cur.execute("SELECT TYPE FROM users WHERE username=%s", (username,))
    user_type = cur.fetchone()[0]
    return 2 if (user_type=="admin") else 1

def insert_user(username, name, email, password, type_="user"):
    if check_if_username_exists(username):
        return False

    insert_script = "INSERT INTO users (username, name, email, password, type) VALUES (%s, %s, %s, %s, %s)"
    insert_value = (str(username), str(name), str(email), str(password), str(type_),)

    cur.execute(insert_script, insert_value)
    conn.commit()
    return True


def check_if_files_exists(filename):
    check_script = f"SELECT COUNT(*) FROM files WHERE fileid LIKE '{filename}%'"
    cur.execute(check_script)
    return int(cur.fetchone()[0])


def run_model_here(filedata):
    return '1'


def insert_file(filecat, username, extension, status, data):
    count = check_if_files_exists(filecat + '-' + username) + 1

    uniqid = filecat + "-" + username + "-" + str(count)

    insert_script = "INSERT INTO files (fileid, filecat, username, extension, status, data) VALUES (%s, %s, %s, %s, %s, %s)"
    insert_value = (uniqid, filecat, username, extension, status, data,)

    cur.execute(insert_script, insert_value)
    conn.commit()

    ret_cat = run_model_here(data)

    status = int(ret_cat == filecat)

    change_script = f"UPDATE files SET status='{status}' WHERE fileid='{uniqid}'"
    cur.execute(change_script)
    conn.commit()

    return status


def fetch_files_all():
    fetch_script = "SELECT * FROM files WHERE status!='2'"

    cur.execute(fetch_script)
    ans = cur.fetchall()
    dict_result = []
    for row in ans:
        dict_result.append(dict(row))
    return dict_result


def fetch_user_files(username):
    if check_if_username_exists(username):
        fetch_script1 = f"SELECT * FROM files WHERE username='{username}'"

        cur.execute(fetch_script1)
        ans = cur.fetchall()
        dict_result = []
        for row in ans:
            dict_result.append(dict(row))
        return dict_result
    else:
        print("not found")
        return "[]"


def update_status(fileid, status):
    if status == '2':
        cur.execute(f"DELETE FROM files WHERE fileid='{fileid}'")
        conn.commit()
    else:
        change_script = f"UPDATE files SET status='{status}' WHERE fileid='{fileid}'"
        cur.execute(change_script)
        conn.commit()

def get_file_user(fileid):
    cur.execute(f"SELECT username FROM files WHERE fileid='{fileid}'")
    return cur.fetchone()[0]

def get_user(user):
    cur.execute(f"SELECT * FROM users WHERE username='{user}'")
    return cur.fetchone()[0]

