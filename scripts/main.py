from flask import Flask, request, jsonify, make_response
import joblib
from flask_restplus import Api, Resource, fields
from sklearn.externals import joblib
import numpy as np
import sys 
from flask_cors import CORS

flask_app = Flask(__name__)
CORS(flask_app)

@flask_app.route("/home")
def hello():
    return "FICD System"

app = Api(app = flask_app, 
		  version = "1.0", 
		  title = "Fraud Automobile Insurance Claim Detection System", 
		  description = "Predict the fraudlent insurance claims")
name_space = app.namespace('prediction', description='Prediction APIs')

model = app.model('ficds',{
    'incidentSeverity':fields.Float(required = True,description = 'Incident Severity',help = 'Incident Severity'),
    'incidentState':fields.Float(required = True,description = 'Incident State',help = 'Incident State'),
    'monthsAsCustomer':fields.Float(required = True,description = 'Months As Customer',help = 'Months As Customer'),
    'vehicleClaim':fields.Float(required = True,description = 'Vehicle Claim',help = 'Vehicle Claim'),
    'totalClaim':fields.Float(required = True,description = 'Total Claim',help = 'Total Claim'),
    'incidentType':fields.Float(required = True,description = 'Incident Type',help = 'Incident Type'),
    
    # 'policyNumber':fields.String(required = False,description = 'Policy Number',help = 'Policy Number'),
    # 'gender':fields.String(required = False,description = 'Gender',help = 'Gender'),
    # 'authoritiesContacted':fields.String(required = False,description = 'Authorities Contacted',help = 'Authorities COntacted'),
    # 'incidentDate':fields.String(required = False,description = 'Incident Date',help = 'Incident Date'),
    # 'umbrellaLimit':fields.Float(required = False,description = 'Umbrella Limit',help = 'Umbrella Limit')
})

classifier = joblib.load('classifier.joblib')

@name_space.route('/')
class MainClass(Resource):
    def options(self):
        response = make_response()
        response.headers.add('Access-Control-Allow-Origin','*')
        response.headers.add('Access-Control-Allow-Headers','*')
        response.headers.add('Access-Controll-Allow-Methods','*')
        return response
    
    @app.expect(model)
    def post(self):
        try:
            formData = request.json
            data = [val for val in formData.values()]
            prediction = classifier.predict(np.array(data).reshape(1,-1))
            types = {0:'Fraudlent',1:'Non Fraudlent'}
            response = jsonify({
                'statusCode':200,
                'status':'Prediction Complete',
                'result':"This Insurance Claim is " + types[prediction[0]]
            })
            response.headers.add('Access-Control-Allow-Origin','*')
            return response
        except Exception as error:
            return jsonify({
                'statusCode':500,
                'status':'Could not Predict',
                'error':str(error)
            })


if __name__ == '__main__':
    flask_app.run(debug=True)