import axios from 'axios';
import Config from '../config';
import ImageModel from '../models/Image';

const imageUrl = Config.BASE_URL + 'images';

let images = [];

const ImageService = {
  getImages: async function() {
    const resp = await axios.get(imageUrl);
    images = resp.data.map(image => new ImageModel(image['image_id'], image['width'], image['height'], image['url']));
    return Promise.resolve(images);
  },
};

export default ImageService;
