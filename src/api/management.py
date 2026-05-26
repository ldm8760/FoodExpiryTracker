from flask_restful import Resource, request
from flask import jsonify
from db.dbHandler import *

class Items(Resource):
    def get(self):
        result = exec_get_all('SELECT * FROM Items')
        result = [{'ItemID': item[0], 'Category': item[1], 'ItemName': item[2], 'ExpDate': str(item[3])} for item in result]
        return result, 200
    
class Item(Resource):
    def get(self):
        body = dict(request.get_json())
        itemId = body.get('ItemID')
        return exec_get_one('SELECT * FROM Items WHERE ItemID = %s', (itemId,)), 200