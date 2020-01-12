from flask import Flask
from flask_restplus import Api, Resource

from init import df

app = Flask(__name__)
api = Api(app=app)
ns = api.namespace('images', description='Image operations')


@ns.route("/")
class ImageList(Resource):
    @ns.doc(responses={
        200: 'Success'
    })
    def get(self):
        app.logger.error(df.head(5))
        return False
