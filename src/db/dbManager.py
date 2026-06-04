from db.dbHandler import *

def get_all_items():
    result = exec_get_all("SELECT * FROM Items")
    return [{"itemid": row[0], "category": row[1], "itemname": row[2], "expdate": str(row[3])} for row in result]

def add_item(category, itemname, date):
    exec_commit("INSERT INTO Items (ItemID, Category, ItemName, ExpDate) VALUES (DEFAULT, %s, %s, %s)", (category, itemname, date,))