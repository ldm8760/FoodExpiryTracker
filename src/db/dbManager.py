from db.dbHandler import *

def get_all_items():
    result = exec_get_all(
        """SELECT ItemID, Category, ItemName, TO_CHAR(ExpDate, \'YYYY-MM-DD\') 
        AS ExpDate FROM Items""")
    return result
       