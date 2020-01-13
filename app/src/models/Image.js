export default class ImageModel {
  constructor(id, width, height, src) {
    this.id = id;
    this.width = width;
    this.height = height;
    this.src = src;
    this.isGray = false;
  }
}
