import pymongo
from bson.objectid import ObjectId

class Movie():
    def __init__(self, title, synopsis, release_date, poster):
        self.title = title
        self.synopsis= synopsis
        self.release_date = release_date
        self.poster= poster


    def create(self):
        movie_id = db.movies.insert(self.set_dict())
        self._id= movie_id
        return str(movie_id)


    def set_dict(self):
        return {'title': self.title, 'synopsis': self.synopsis, 'release_date': self.release_date, 'poster': self.poster}

    
def delete(title):
    
    db.movies.delete_one({"title": title})

def checkExist(title):
    exist =db.movies.find_one({"title": title})
    
    return exist


def get_documents():
    params = {}
      
    cursor = db.movies.find(params, {'_id': 0})
    return list(cursor)

def get_db_connection(uri):
    client = pymongo.MongoClient(uri) 
    return client.moviemongo


db= get_db_connection('mongodb://mongo-movie:27017/')