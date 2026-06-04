from flask_restful import Resource, request
from flask import jsonify
from db.dbHandler import *
from db.dbManager import *  

class Items(Resource):
    def get(self):
        return get_all_items(), 200
    
    def post(self):
        body = dict(request.get_json())

        category = body["category"]
        itemname = body["itemname"]
        date = body["expdate"]

        add_item(category, itemname, date)
        return {"Message": "Success"}, 200