import axios from 'axios';
import Config from '../config';
import ImageModel from '../models/Image';

const imageUrl = Config.BASE_URL + 'images';

let images = [];

/**
 * Returns request URL with appropriate query parameters
 *
 * @param {object=} options
 * @private
 */
function generateUrl(options) {
  let url = imageUrl;
  if (options) {
    Object.keys(options).forEach(key => {
      if (options[key] === '' || options[key] === null) {
        delete options[key];
        return;
      }
    });

    Object.keys(options).forEach((key, index) => {
      const value = options[key];
      if (isNaN(value)) {
        throw new Error(key + 'is not a number.');
      }

      if (value < 0) {
        throw new Error(key + 'cannot be less than 0.');
      }
      url += (index === 0 ? '?' : '&') + key + '=' + value;
    });
  }
  return url;
}

const ImageService = {
  /**
   * Appends optional query parameters to request and performs request to API
   *
   * @param {number=} options['pageIndex']
   * @param {number=} options['width']
   * @param {number=} options['height']
   * @public
   */
  getImages: async function(options) {
    let url = null;
    try {
      url = generateUrl(options);
    } catch (error) {
      return Promise.reject(error.message);
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
};

export default ImageService;
