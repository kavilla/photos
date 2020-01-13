from flask import Flask
from flask_restplus import Api, Resource, reqparse

from init import df, df_length
from models import NotFoundException, InvalidRequest, ImageModel

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
            'page_index',
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
        200: 'Success',
        400: 'Invalid Request'
    })
    @ns.marshal_list_with(ImageModel.fields)
    def get(self):
        try:
            args = self.parser.parse_args()

            page = args['page_index']
            if page < 0:
                raise InvalidRequest

            count = args['count']
            left = page * count
            if df_length <= left:
                raise InvalidRequest

            right = (left + count)

            return map_to_image_list(df[left:right].values.tolist())
        except InvalidRequest as e:
            ns.abort(
                400,
                e.__doc__,
                status='Page index is out of range'
            )


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
