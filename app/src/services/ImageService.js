import axios from 'axios';
import Config from '../config';
import ImageModel from '../models/Image';

const imageUrl = Config.BASE_URL + 'images';

const ImageService = {
  getImages: async function() {
    const resp = await axios.get(imageUrl);
    return Promise.resolve(resp.data);
  },
};

export default ImageService;
