import glob

import pandas as pd
from flask import Flask
from flask_cors import CORS
from flask_restplus import Api

api = Api(
    title='goTenna API',
    version='1.0',
    description='API for photo viewing.'
)

app = Flask(__name__)

cors = CORS(app, resources={r"*": {"origins": "*"}})

df = pd.read_csv(
    glob.glob("./data/*.csv")[0],
    sep='/',
    header=None,
    usecols=[4, 5, 6],
    names=['id', 'width', 'height']
).sort_values('id', ascending=False)
