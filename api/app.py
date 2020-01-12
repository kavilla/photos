from init import api, app
from image import ns as ns_image

api.add_namespace(ns_image)

# Initialize API
api.init_app(app)

app.run(debug=True)
