from flask import Flask
from flask_restplus import Api
from flask_cors import CORS

api = Api(
    title='goTenna API',
    version='1.0',
    description='API for photo viewing.'
)

app = Flask(__name__)

cors = CORS(app, resources={r"*": {"origins": "*"}})

# api.add_namespace(ns_auth)
# api.add_namespace(ns_paper)
# api.add_namespace(ns_participator)
# api.add_namespace(ns_review)

# Initialize API
api.init_app(app)

app.run(debug=True)
