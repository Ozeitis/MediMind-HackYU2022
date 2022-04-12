from . import db
from .models import User, Prescription, EmergCon
from flask import Blueprint, request, jsonify
import datetime
from twilio.rest import Client
api = Blueprint('api', __name__)

account_sid = "AC759971794a410d5813bde4aeeb9c336d"
auth_token  = "3a7713f93bf2d7446104084fb6dd90d1"
client = Client(account_sid, auth_token)

@api.route("/api/add_emergency", methods=["POST"])
def add_emergency():
    req = request.get_json(force=True)
    user_id = req.get("user_id", None)
    name = req.get("name", None)
    phone = req.get("phone", None)

    emerg_con = EmergCon(name, phone, user_id)
    db.session.add(emerg_con)
    db.session.commit()
    return jsonify({"success": True})

@api.route("/api/get_emergency", methods=["GET"])
def get_emergency():
    user_id = request.args.get("user_id", None)
    #get that users emergency contacts
    emergency_nums = EmergCon.query.filter_by(user_id=user_id).all()
    return jsonify(emergency_nums), 200



@api.route("/api/add_prescription", methods=["POST"])
def add_prescription():
    req = request.get_json(force=True)
    user_id = req.get("user_id", None)
    drug_name = req.get("drug_name", None)
    rx_num = req.get("rx_number", None)
    perscriber_id = 2
    frequency = req.get("time", None)
    pharmacy_name = req.get("pharmacy_name", None)
    num_pills = req.get("quantity", None)
    start_date = req.get("start_date", None)
    end_date = req.get("end_date", None)

    prescription = Prescription(user_id, drug_name, frequency, rx_num, perscriber_id, pharmacy_name, num_pills, str(start_date), str(end_date))
    db.session.add(prescription)
    db.session.commit()
    return jsonify({"success": True})
    
@api.route("/api/get_prescriptions", methods=["POST"])
def get_prescriptions():
    req = request.get_json(force=True)
    user_id = req.get("user_id", None)
    prescriptions = Prescription.query.filter_by(user_id=user_id).all()
    json_percs = [perc.to_json() for perc in prescriptions]
    return jsonify(json_percs), 200
    
@api.route("/api/send_msg", methods=["GET"])
def send_msg():
    print("1---Started MediMind minder check!")
    all_presc = Prescription.query.all()
    print("Started MediMind minder check!")
    for presc in all_presc: 
        print("Checking ", presc.drug_name)
        user = User.query.filter_by(userID=presc.user_id).first()
        #get current hours and minutes
        now = datetime.datetime.now()
        
        presc_time = presc.frequency.split(":")
        #presc_datetime = datetime.datetime(now.year, now.month, now.day, int(presc_time[0]), int(presc_time[1]))   
        #if (presc_time >= presc_datetime) and (now <= perc_datetime + datetime.datetime(now.year, now.month, now.day, int(persc_time[0]), int(persc_time[1])+1)): #if current_date is within a 60 second interval of date
                # get that patients emergency contact number
        #emerg_num = EmergCon.query.filter_by(user_id=user.userID)
            #get that patients doctor number
        #doctor_num = User.query.filter_by(userID=user.doctor_id).first()
        #   get that patient's number
        patient_num = user.phone
        #numbers = [doctor_num, emerg_num]
        #   send message to patient
        send_message = client.messages.create(
            to = patient_num, 
            from_="+12568184031",
            body="Hello, this is MediMind reminding you to take [" + str(presc.num_pills) + "mg] of [" + presc.drug_name + "] at " + presc.frequency + "."
            )
        print(send_message)
        print("Text sent to "+user.phone+"!\n")
        #if the user has taken the perscription then we can just reset it to false and continue
        #to the next perscription, otherwise contact emergency pplz         
        #has_taken_meds = presc.has_taken
    # elif ((alarm_after_date >= current_date) and current_date <= alarm_after_date+60):
        # if has_taken_meds:
        #     #set taken_meds to not done 
        #     continue
        # elif not has_taken_meds:
        #         for number in numbers:
        #             meds_not_taken_message = client.message.create(
        #             to = number,
        #             from_ = "+12568184031",
        #             body= user.first_name + " " + user.last_name + " did not take their meds, please contact them!") 
        return jsonify({"success": True})
