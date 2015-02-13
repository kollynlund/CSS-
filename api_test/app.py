#!flask/bin/python

from flask import Flask
from flask.ext.restless import APIManager
from flask.ext.sqlalchemy import SQLAlchemy


app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///kneaders.db'
app.config['DEBUG'] = True
db = SQLAlchemy(app)


class User(db.Model):
	id = db.Column(db.Integer, primary_key=True)
	username = db.Column(db.String(64), index=True, unique=True)
	password = db.Column(db.String(64))
	company = db.Column(db.String(100))


class Survey(db.Model):
	id = db.Column(db.Integer, primary_key=True)
	survey_name = db.Column(db.String(64), index=True, unique=True)
	is_live = db.Column(db.Boolean)
	q1_text = db.Column(db.String(1000))
	q1_type = db.Column(db.Integer)
	q2_text = db.Column(db.String(1000))
	q2_type = db.Column(db.Integer)
	q3_text = db.Column(db.String(1000))
	q3_type = db.Column(db.Integer)
	q4_text = db.Column(db.String(1000))
	q4_type = db.Column(db.Integer)
	q5_text = db.Column(db.String(1000))
	q5_type = db.Column(db.Integer)
	answers = db.relationship('Answer', backref='survey', lazy='dynamic')

	def __repr__(self):
		return '<Survey %r>' % (self.survey_name)


class Answer(db.Model):
	id = db.Column(db.Integer, primary_key=True)
	q1_answer = db.Column(db.Integer)
	q2_answer = db.Column(db.Integer)
	q3_answer = db.Column(db.Integer)
	q4_answer = db.Column(db.Integer)
	q5_answer = db.Column(db.Integer)
	timestamp = db.Column(db.DateTime)
	survey_id = db.Column(db.Integer, db.ForeignKey('survey.id'))

	def __repr__(self):
		return '<Answer %r>' % (self.survey.survey_name + ': ' + str(self.q1_answer) + ', ' + str(self.q2_answer) + ', ' + str(self.q3_answer) + ', ' + str(self.q4_answer) + ', ' + str(self.q5_answer))


def add_cors_headers(response):
    	response.headers['Access-Control-Allow-Origin'] = 'http://localhost:8010'    
    	response.headers['Access-Control-Allow-Credentials'] = 'true'
	response.headers['Access-Control-Allow-Headers'] = 'content-type'
    	return response


db.create_all()

api_manager = APIManager(app, flask_sqlalchemy_db=db)
survey_api = api_manager.create_api(Survey, methods=['GET', 'POST', 'DELETE', 'PUT'], exclude_columns=['answers'])
answer_api = api_manager.create_api(Answer, methods=['GET', 'POST', 'DELETE', 'PUT'])
user_api = api_manager.create_api(User, methods=['GET', 'POST', 'DELETE', 'PUT'])

app.after_request(add_cors_headers)

if __name__ == '__main__':
	app.run()
