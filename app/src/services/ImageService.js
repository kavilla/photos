import axios from 'axios';
import Config from '../config';
import ImageModel from '../models/Image';

const imageUrl = Config.BASE_URL + 'images';

let images = [];
let selectedImage = null;

const ImageService = {
  getImages: async function(options) {
    let url = imageUrl;
    console.log(options);
    if (options) {
      try {
        Object.keys(options).forEach((key, index) => {
          if (isNaN(options[key])) {
            throw new Error(options[key] + 'is not a number.');
          }

          if (options[key] < 0) {
            throw new Error(options[key] + 'cannot be less than 0.');
          }
          url += (index === 0 ? '?' : '&') + key + '=' + options[key];
        });
      } catch (error) {
        return Promise.reject(error.message);
      }
    }

    return axios
      .get(url)
      .then(resp => {
        images = resp.data.map(
          image => new ImageModel(image['image_id'], image['width'], image['height'], image['url']),
        );
        return Promise.resolve(images);
      })
      .catch(err => {
        return Promise.reject(err);
      });
  },

  getSelectedImage: function() {
    return Promise.resolve(selectedImage);
  },

  setSelectedImage: function(image) {
    selectedImage = image;
    return Promise.resolve(selectedImage);
  },
};

export default ImageService;
