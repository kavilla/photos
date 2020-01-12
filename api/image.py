from flask import Flask
from flask_restplus import Api, Resource, reqparse

from init import df
from models import NotFoundException

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


def map_to_url_list(data_list):
    result = []
    for data in data_list:
        result.append(f'{data[0]}//{data[1]}/{data[2]}/{data[3]}/{data[4]}/{data[5]}')
    return result


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

        return map_to_url_list(df[left:right].values.tolist())


@ns.route('/<int:image_id>')
class Image(Resource):
    @ns.doc(responses={
        200: 'Success',
        404: 'Not Found'
    })
    def get(self, image_id):
        try:
            result = map_to_url_list(df.query(f'id == {image_id}').values.tolist())

            if len(result) == 0:
                raise NotFoundException

            return result[0]
        except NotFoundException as e:
            ns.abort(
                404,
                e.__doc__,
                status='Could not find image with id',
                statusCode='404'
            )
