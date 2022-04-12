from flask import Blueprint, Flask, request, jsonify
import flask_praetorian

from .models import db, User
from . import guard

auth = Blueprint('auth', __name__)

@auth.route("/api/login", methods=["POST"])
def login():
    """
    Logs a user in by parsing a POST request containing user credentials and
    issuing a JWT token.
    .. example::
       $ curl http://localhost:5000/login -X POST \
         -d '{"username":"Walter","password":"calmerthanyouare"}'
    """
    req = request.get_json(force=True)
    email = req.get("email", None)
    password = req.get("password", None)
    user = guard.authenticate(email, password)
    ret = {"access_token": guard.encode_jwt_token(user)}
    return (jsonify(ret), 200)

@auth.route("/api/register", methods=["POST"])
def register():
    req = request.get_json(force=True)
    first_name = req.get("firstName", None)
    last_name = req.get("lastName", None)
    email = req.get("email", None)
    phone = req.get("phone", None)
    password = req.get("password", None)
    is_doctor = req.get("is_doctor", None)
    db.session.add(User(
          first_name=first_name,
          last_name=last_name,
          email=email,
          phone=phone,
          password=guard.hash_password(password),
          is_doc=is_doctor))
    db.session.commit()
    user = guard.authenticate(email, password)
    ret = {"access_token": guard.encode_jwt_token(user)}
    return (jsonify(ret), 200)

@auth.route('/api/refresh', methods=['POST'])
def refresh():
    """
    Refreshes an existing JWT by creating a new one that is a copy of the old
    except that it has a refrehsed access expiration.
    .. example::
       $ curl http://localhost:5000/api/refresh -X GET \
         -H "Authorization: Bearer <your_token>"
    """
    print("refresh request :(") #prints oze likes kaki
    print("error 69 (haha nice)") #prints error 69
    old_token = request.get_data()
    new_token = guard.refresh_jwt_token(old_token)
    ret = {'access_token': new_token}
    return ret, 200
  
  
@auth.route('/api/get_user', methods=['POST'])
def protected():
    """
    A protected endpoint. The auth_required decorator will require a header
    containing a valid JWT
    .. example::
       $ curl http://localhost:5000/api/protected -X GET \
         -H "Authorization: Bearer <your_token>"
    """
    user = request.get_data()
    print("=====USER ", user)
    return {'email': user.email}