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

def check_if_username_exists(username):
    check_script = "SELECT COUNT(*) FROM users WHERE username=%s"
    check_value = (username,)
    cur.execute(check_script, check_value)
    conn.commit()
    return cur.fetchone()[0]

def check_password(username, password):
    check_script = "SELECT COUNT(*) FROM users WHERE username=%s AND password=%s"
    check_value = (username,password,)
    cur.execute(check_script, check_value)
    conn.commit()
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
