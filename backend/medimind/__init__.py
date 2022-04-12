import os
from venv import create
from flask import Flask
from flask.helpers import send_from_directory
import flask_praetorian
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import time
import datetime
from twilio.rest import Client
from time import sleep
from apscheduler.schedulers.background import BackgroundScheduler
import threading

POOL_TIME = 30 #Seconds
    
# variables that are accessible from anywhere
commonDataStruct = {}
# lock to control access to variable
dataLock = threading.Lock()
# thread handler
yourThread = threading.Thread()

# init SQLAlchemy so we can use it later in our models
db = SQLAlchemy(session_options={"autoflush": False})
guard = flask_praetorian.Praetorian()
cors = CORS()

#put the checkpercs


def create_app():
    app = Flask(__name__, instance_relative_config=True)
    app.config['DEBUG'] = True if os.getenv('DEBUG') == 'True' else False
    app.config['LISTEN_HOST'] = os.getenv('LISTEN_HOST', '0.0.0.0')
    app.config['LISTEN_PORT'] = int(os.getenv('LISTEN_PORT', '5000'))
    app.config['APP_URL'] = os.getenv('APP_URL') 
    app.config['SESSION_SECRET'] = os.urandom(256)
    app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DB_INFO', 'sqlite:///medimind.db')
    app.config['SQLALCHEMY_ECHO'] = app.config['DEBUG']
    app.config['SESSION_COOKIE_SAMESITE'] = 'None'
    app.config['SESSION_COOKIE_SECURE']=True
    app.static_folder = 'static'

    # Flask-User settings
    app.config['USER_APP_NAME'] = "MediMind"      # Shown in and email templates and page footers
    app.config['USER_ENABLE_EMAIL'] = True        # Enable email authentication
    app.config['USER_ENABLE_USERNAME'] = False    # Disable username authentication
    app.config['USER_EMAIL_SENDER_NAME'] = "MediMind" #The name of Oze's tiny penis website
    app.config['USER_EMAIL_SENDER_EMAIL'] = os.getenv('MAIL_EMAIL') #Why does oze keep kissing boys
    
    app.config['SECRET_KEY'] = os.urandom(42)
    app.config['JWT_ACCESS_LIFESPAN'] = {'hours': 24}
    app.config['JWT_REFRESH_LIFESPAN'] = {'days': 30}
    
    db.init_app(app) #ezraemersonlikesball
    cors.init_app(app)
    
    def interrupt():
        global yourThread
        yourThread.cancel()
    
    #init db's
    from .models import User, EmergCon, Prescription
    app.app_context().push()
    with app.app_context():
        db.create_all()
        
    guard.init_app(app, User)
        
    #blueprint for auth routes in our app
    from .auth import auth as auth_blueprint
    app.register_blueprint(auth_blueprint)
    
    from .api import api as api_blueprint
    app.register_blueprint(api_blueprint)
    #check_percs()
    return app
create_app()