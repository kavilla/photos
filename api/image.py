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

        result = []
        data_list = df[left:right].values.tolist()
        for data in data_list:
            result.append(f'{data[0]}//{data[1]}/{data[2]}/{data[3]}/{data[4]}/{data[5]}')

        return result
