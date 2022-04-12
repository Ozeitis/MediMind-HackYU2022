from . import db
import datetime
from werkzeug.security import generate_password_hash, check_password_hash
# import flask_praetorian

from . import guard

# class DocPat(db.Model):
#     __tablename__ = "docpatrel"
#     userID = db.Column(db.Integer, db.ForeignKey("users.userID"))
#     user = db.relationship('User', backref='docpatrel', uselist=False)
#     docID = db.Column(db.Integer, db.ForeignKey("users.userID"))
#     doc = db.relationship('User', backref='docpatrel', uselist=False)

#     def __init__(self):

class User(db.Model): # Patient will recieve a reminder to take their meds and will notify the doctor is they do 
    __tablename__ = "users"
    userID = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(32), nullable=False)
    last_name = db.Column(db.String(32), nullable=False)
    email = db.Column(db.String(256), unique=True, nullable=False)
    phone = db.Column(db.CHAR(10)) #lets hold 10 and remove everything but the numbers(remove slashes and stuff)
    password = db.Column(db.Text)
    #pic = db.Column(db.Stri tng())
    #relationship one to oneo a doctor
    #doctorID = db.Column(db.Integer, db.ForeignKey('doctors.docID'), nullable=False)
    #doctor = db.relationship('Doctor', backref='users', uselist=False)
    doc_id = db.Column(db.Integer, nullable=True)
    patient_id = db.Column(db.Integer, nullable=True)
    #is doc
    is_doc = db.Column(db.Boolean, nullable=False, default=False)
    
    
    @classmethod
    def lookup(db, email):
        """
        *Required Method*
        flask-praetorian requires that the user class implements a ``lookup()``
        class method that takes a single ``username`` argument and returns a user
        instance if there is one that matches or ``None`` if there is not.
        """
        return db.query.filter_by(email=email).first()

    @classmethod
    def identify(cls, userID):
        """
        *Required Method*
        flask-praetorian requires that the user class implements an ``identify()``
        class method that takes a single ``id`` argument and returns user instance if
        there is one that matches or ``None`` if there is not.
        """
        return User.query.filter_by(userID=userID)

    def __init__(self, first_name, last_name, email, password, phone, is_doc):
        self.first_name = first_name
        self.last_name = last_name
        self.email = email
        self.password = password
        self.phone = phone
        self.is_doc = is_doc

class EmergCon(db.Model): #Emergency contacts can be contacted by the doctor if they are in need of help
    __tablename__ = "emergency_contacts"
    
    ecID = db.Column(db.Integer, primary_key=True)
    #One to one with patient
    user_id = db.Column(db.Integer, nullable = False)
    name = db.Column(db.String(32), unique=True, nullable=False)
    phone = db.Column(db.CHAR(10), nullable = False) #lets hold 10 and remove everything but the numbers(remove slashes and stuff)
    
    def __init__(self, name, phone, user_id):
        self.name = name
        self.phone = phone
        self.user_id = user_id

class Prescription(db.Model): #The medication prescribed by the doctor. It will notify doctor when there should be a refil
    __tablename__ = "prescription"

    persID = db.Column(db.Integer, primary_key=True) #prescription ID
    user_id = db.Column(db.Integer, nullable=False)
    drug_name = db.Column(db.String(256), nullable=False) #name of the medicine
    frequency = db.Column(db.Integer, nullable=False) #how often the patient should take the medicine
    rx_num = db.Column(db.Integer, nullable=False) #rx number of the medicine
    #has taken med
    has_taken = db.Column(db.Boolean, default=False, nullable=False)
    #one to one relationship
    perscriber_id = db.Column(db.Integer, nullable=False)
    #one to one relationship
    pharmacy_name = db.Column(db.String(256), nullable=False)
    num_pills = db.Column(db.Integer) #number of pills
    start_date = db.Column(db.String()) #the time the prescription was started
    #current_time = db.Column(db.DateTime, index=False, unique=False, nullable=True) #current time
    end_date = db.Column(db.String()) #the time the prescription was ended
    
    def to_json(self):
        return {
            'persID': self.persID,
            'user_id': self.user_id,
            'drug_name': self.drug_name,
            'frequency': self.frequency,
            'rx_num': self.rx_num,
            'has_taken': self.has_taken,
            'perscriber_id': self.perscriber_id,
            'pharmacy_name': self.pharmacy_name,
            'num_pills': self.num_pills,
            'start_date': self.start_date,
            'end_date': self.end_date
        }

    def __init__(self, user_id, drug_name, frequency, rx_num, perscriber_id, pharmacy_name, num_pills, start_date, end_date):
        self.user_id = user_id
        self.drug_name = drug_name
        self.frequency = frequency
        self.rx_num = rx_num
        self.perscriber_id = perscriber_id
        self.pharmacy_name = pharmacy_name
        self.num_pills = num_pills
        self.start_date = start_date
        self.end_date = end_date


