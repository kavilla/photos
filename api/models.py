from flask_restplus import fields

from init import image_url


# Custom Exception
class NotFoundException(Exception):
    pass


# Custom Classes
class ImageModel:
    fields = {
        'image_id': fields.Integer,
        'width': fields.Integer,
        'height': fields.Integer,
        'url': fields.String
    }

    def __init__(self, image_id, width, height):
        self.image_id = image_id
        self.width = width
        self.height = height
        self.url = image_url % {'image_id': image_id, 'width': width, 'height': height}
