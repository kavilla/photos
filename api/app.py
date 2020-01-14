from image import ns as ns_image
from init import api, app

api.add_namespace(ns_image)

# Initialize API
api.init_app(app)

app.run(debug=True)
