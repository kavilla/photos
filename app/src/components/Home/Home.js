import React from 'react';
import { Button, FormGroup, FormControl, FormLabel } from 'react-bootstrap';
import './Home.css';
import './../../App.css';
import ImageService from '../../services/ImageService';
import Gallery from 'react-photo-gallery';

export default class Home extends React.Component {
  constructor(props) {
    super(props);

    this.queryParameters = {
      width: null,
      height: null,
      pageIndex: 0,
    };

    this.state = {
      currentPageIndex: 0,
      isLoading: true,
      images: [],
      showModal: false,
      selectedImage: null,
    };

    ImageService.getImages().then(images => {
      this.setState(() => ({
        isLoading: false,
        images: images,
      }));
    });
  }

  handleUpdatePageIndex = value => {
    const nextPageIndex = this.queryParameters.pageIndex + value >= 0 ? this.queryParameters.pageIndex + value : 0;

    if (this.queryParameters.pageIndex === nextPageIndex) {
      return;
    }

    const lastPageIndex = this.queryParameters.pageIndex;
    this.queryParameters.pageIndex = nextPageIndex;

    this.setState(() => ({
      isLoading: true,
    }));

    ImageService.getImages(this.queryParameters)
      .then(resp => {
        this.setState(() => ({
          images: resp,
        }));
      })
      .catch(() => {
        this.queryParameters.pageIndex = lastPageIndex;
      })
      .finally(() => {
        this.setState(() => ({
          isLoading: false,
          currentPageIndex: this.queryParameters.pageIndex,
        }));
      });
  };

  handlePhotoClick = (_, options) => {
    this.setState(() => ({
      showModal: true,
      selectedImage: options.photo,
    }));
  };

  handleHideModal = () => {
    this.setState(() => ({
      showModal: false,
      selectedImage: null,
    }));
  };

  handleChange = (event, image) => {
    const targetId = event.target.id;
    if (targetId === 'isGray') {
      image.isGray = event.target.checked;
      this.setState({
        selectedImage: image,
      });
    }
  };

  handleSearchChange = event => {
    this.queryParameters[event.target.name] = event.target.value;
  };

  filterImages = () => {
    ImageService.getImages(this.queryParameters).then(resp => {
      this.setState(() => ({
        isLoading: false,
        images: resp,
      }));
    });
  };

  render() {
    const header = (
      <div className="filter-container">
        <input
          type="text"
          name="width"
          placeholder="Width..."
          className="form-control home-non-body-item filter-search-bar"
          onChange={this.handleSearchChange}
        />
        <input
          type="text"
          name="height"
          placeholder="Height..."
          className="form-control home-non-body-item filter-search-bar"
          onChange={this.handleSearchChange}
        />
        <Button className="form-control home-non-body-item" onClick={this.filterImages}>
          Filter
        </Button>
      </div>
    );

    const footer = (
      <div className="page-index-container">
        <Button className="form-control home-non-body-item btn-light" onClick={() => this.handleUpdatePageIndex(-1)}>
          Previous
        </Button>
        <span className="home-non-body-item page-index">{this.state.currentPageIndex + 1}</span>
        <Button className="form-control home-non-body-item" onClick={() => this.handleUpdatePageIndex(1)}>
          Next
        </Button>
      </div>
    );

    const body =
      !this.state.isLoading && this.state.images.length > 0 ? (
        <Gallery photos={this.state.images} onClick={this.handlePhotoClick} direction={'column'} />
      ) : null;

    const imageModal =
      this.state.showModal && this.state.selectedImage !== null ? (
        <div className="app-modal-container">
          <div className="app-modal">
            <div className="app-modal-close-button-container">
              <Button className="app-modal-close-button btn-light" onClick={this.handleHideModal}>
                X
              </Button>
            </div>
            <h5 className="app-modal-item">Source: {this.state.selectedImage.src}</h5>
            <span className="app-modal-item">
              ({this.state.selectedImage.width} x {this.state.selectedImage.height})
            </span>
            <FormGroup controlId="isGray" className="app-modal-item checkbox-container">
              <FormControl
                value={this.state.selectedImage.isGray}
                onChange={event => this.handleChange(event, this.state.selectedImage)}
                type="checkbox"
                className="checkbox"
              />
              <FormLabel className="checkbox-label">Show in grayscale?</FormLabel>
            </FormGroup>
            <div className="app-modal-item img-container">
              <img
                src={
                  this.state.selectedImage.isGray
                    ? this.state.selectedImage.src + '?grayscale'
                    : this.state.selectedImage.src
                }
                alt={this.state.selectedImage.id}
              />
            </div>
          </div>
        </div>
      ) : null;

    return (
      <div className="home">
        <div className="home-non-body">{header}</div>
        <div className="home-body">{body}</div>
        <div className="home-non-body">{footer}</div>
        <div>{imageModal}</div>
      </div>
    );
  }
}
