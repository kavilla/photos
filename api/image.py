from flask import Flask
from flask_restplus import Api, Resource, reqparse

from init import df
from models import NotFoundException, ImageModel

app = Flask(__name__)
api = Api(app=app)
ns = api.namespace(
    'images',
    description='Image operations'
)


def map_to_image_list(data_list):
    result = []
    for data in data_list:
        image_id = data[0]
        width = data[1]
        height = data[2]
        result.append(ImageModel(image_id, width, height))
    return result


@ns.route('')
class ImageList(Resource):
    def __init__(self, *args, **kwargs):
        self.parser = reqparse.RequestParser()
        self.parser.add_argument(
            'page',
            type=int,
            default=0,
            required=False,
            help='Page Index'
        )
        self.parser.add_argument(
            'count',
            type=int,
            default=10,
            required=False,
            help='Number of Results'
        )
        super(ImageList, self).__init__(*args, **kwargs)

    @ns.doc(responses={
        200: 'Success'
    })
    @ns.marshal_list_with(ImageModel.fields)
    def get(self):
        args = self.parser.parse_args()
        page = args['page']
        count = args['count']
        left = page * count
        right = left + count

        return map_to_image_list(df[left:right].values.tolist())


@ns.route('/<int:image_id>')
class Image(Resource):
    @ns.doc(responses={
        200: 'Success',
        404: 'Not Found'
    })
    @ns.marshal_with(ImageModel.fields)
    def get(self, image_id):
        try:
            result = map_to_image_list(df.query(f'id == {image_id}').values.tolist())

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
