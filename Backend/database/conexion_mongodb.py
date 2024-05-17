from pymongo import MongoClient

try:
    
    client = MongoClient('localhost',27017)

    database = client['users_pruebas']

    collection = database['user']

    documents = collection.find()
    
    for i in documents:
        print(i)
    client.close()
except Exception as ex:
    print('error conexion BD....')