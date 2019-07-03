import pymongo
from flask import Flask, jsonify, render_template,request,redirect,url_for, json
from bson.json_util import dumps
import requests
import config
from movies import movie as movie
from flask_cors import CORS
import firebase_admin
from firebase_admin import credentials, firestore

api_key= config.api_key


app = Flask(__name__)

cred = credentials.Certificate("extensionapp-ff057-0dcb2ef39615.json")
firebase_admin.initialize_app(cred)
db = firestore.client()
CORS(app)

@app.route('/movies/search')
def index():

    f =request.values.get("f")
    r =requests.get('https://api.themoviedb.org/3/search/movie?api_key='+api_key+'&query='+f+'&language=es-AR')
    json_data = r.json()

    movies_results = json_data['results']
    mov= []
    for film in movies_results:
        
        title= film["title"]
        synopsis= film["overview"]
        rd= film["release_date"]
        poster= film["poster_path"]
       
        print(title)
        print(synopsis)
        print(rd)
        print(poster)
        mov.append({'title':film["title"], 'synopsis':film["overview"],'release_date':film["release_date"],'poster':film["poster_path"]})
    
    return jsonify(mov)
    

  
@app.route('/add', methods=['POST'])
def add():
    data = request.get_json()
    if (request.method == 'POST'):
        
        title= data.get("title")    
        synopsis= data.get("synopsis")
        rd= data.get("release_date")
        poster= data.get("poster")
        exist= movie.checkExist(title)
        if exist is None:
            add= movie.Movie(title, synopsis, rd, poster)
            add.create()
            return jsonify({'ok': True, 'message': 'Pelicula guardada con éxito'})
        else:
            return jsonify({'No': True, 'message': 'La pelicula ya existe'})
        
    
@app.route('/movies')
def show():
    m = movie.get_documents()
    
    return jsonify(m)

@app.route('/delete')
def delete():
    d =request.values.get("d")
    movie.delete(d)
    return jsonify({'success': True})

@app.route('/update/<field>/<id>', methods=['PUT'])
def update(id, field):
    
    data= request.get_json()

  
    synopsis= data.get("synopsis")
    rd= data.get("release_date")
    

    db= movie.get_db_connection('mongodb://mongo-movie:27017/')
    db.movies.find_one_and_update({'title': id}, {'$set': {'title': field, 'synopsis': synopsis, 'release_date':rd}}, upsert=False)
    
   
    return jsonify({'ok': True, 'message': 'Pelicula actualizada con éxito'})


@app.route('/updateH/<heroe>/<heroeN>', methods=['PUT'])
def updateHeroe(heroe, heroeN):
    data= request.get_json()
    
    bio= data.get("bio")
    aparicion= data.get("aparicion")
    p= data.get("peliculas")
    peliculas=  p.split(sep=',')
    h= db.collection("heroes")
    href= h.where('nombre','==' ,heroeN).get()
    for doc in href:
        de=(u'{}'.format(doc.id))
        h.document(de).update({
            u'nombre':heroe,
            u'bio': bio,
            u'aparicion': aparicion,
            u'peliculas': peliculas
        })
    return jsonify({'success': True})

@app.route('/get')
def get():
    l=[]
    h= db.collection(u"heroes")
    docs= h.get()
    for doc in docs:
        print(u'{}'.format(doc.to_dict()))
        l.append({'nombre':doc.get('nombre'), 'bio':doc.get('bio'),'aparicion':doc.get('aparicion'),'peliculas':doc.get('peliculas'),'ruta':doc.get('ruta')})
  
    return jsonify(l)

@app.route('/addH',  methods=['POST'])
def addHeroe():
    data = request.get_json()
    if (request.method == 'POST'):
        nombre= data.get("nombre")    
        bio= data.get("bio")
        ruta= data.get("ruta")
        ap= data.get("aparicion")
        p= data.get("peliculas")
        peliculas=  p.split()
        h= db.collection("heroes")
        h.add({"nombre": nombre, "bio": bio,"ruta": ruta, "aparicion":ap,"peliculas": peliculas})

        return jsonify({'ok': True, 'message': 'Heroe areado con éxito'})  

@app.route('/del')
def deleteH():
    data = request.values.get("h")

    h= db.collection("heroes")
    href= h.where('nombre','==' ,data).get()

    for doc in href:
        de=(u'{}'.format(doc.id))
        h.document(de).delete()
    return jsonify({'success': True})
    
@app.route('/heroe/search')
def searchH():
    f= request.values.get("f")
    
    h= db.collection(u"heroes")
    href= h.where('peliculas','array_contains',f).get()
    heroe= []
    for doc in href:
        print(u'{}'.format(doc.to_dict()))
        heroe.append({'nombre':doc.get('nombre'), 'bio':doc.get('bio'),'aparicion':doc.get('aparicion'),'peliculas':doc.get('peliculas'),'ruta':doc.get('ruta')})
    return jsonify(heroe)

if __name__ =='__main__':
    app.run()