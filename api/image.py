from flask import Flask
from flask_restplus import Api, Resource, reqparse

from init import df

app = Flask(__name__)
api = Api(app=app)
ns = api.namespace(
    'images',
    description='Image operations'
)

parser = reqparse.RequestParser()
parser.add_argument(
    'page',
    type=int,
    default=0,
    required=False,
    help='Page Index'
)
parser.add_argument(
    'count',
    type=int,
    default=10,
    required=False,
    help='Number of Results'
)


@ns.route('')
class ImageList(Resource):
    @ns.doc(responses={
        200: 'Success'
    })
    def get(self):
        args = parser.parse_args()
        page = args['page']
        count = args['count']
        left = page * count
        right = left + count
        return df[left:right].values.tolist()
