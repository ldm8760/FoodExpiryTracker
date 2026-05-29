from flask_restful import Resource, request
from flask import jsonify
from db.dbHandler import *
from db.dbManager import *  

class Items(Resource):
    def get(self):
        return get_all_items(), 200