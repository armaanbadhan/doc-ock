1. get a postgresql server up and running.
2. copy the postgresql server credentials and put them in app/dbinteract.py file.
3. cd to `/app`.
4. install requirements from `requirements.txt` file.
5. run to command `flask run --host 0.0.0.0` to get the backend running.
6. cd to `../app_ui`.
7. add the backend url with port number in `.env.development`.
8. run `yarn install` to install dependencies.
9. run `yarn run dev` to start the frontend.
10. the website is now running on `localhost:3000`!