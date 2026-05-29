from flask_restful import Api
from flask import Flask
from db.dbHandler import *
from api.management import *


app = Flask(__name__)
api = Api(app)

api.add_resource(Items, '/api/Items')

if __name__ == "__main__":
    exec_sql_file('src/db/schema.sql')
    app.run(debug=True)