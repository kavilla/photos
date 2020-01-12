import axios from 'axios';
import Config from '../config';
import ImageModel from '../models/Image';

const imageUrl = Config.BASE_URL + 'images';

let images = [];

const ImageService = {
  getImages: async function(pageIndex = 0) {
    if (pageIndex < 0) {
      return Promise.reject('Page index cannot be less than 0.');
    }

    return axios
      .get(imageUrl + '?page_index=' + pageIndex)
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
