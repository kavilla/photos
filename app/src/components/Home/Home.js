import React from 'react';
import { Redirect } from 'react-router-dom';
import { Button, FormGroup, FormControl, FormLabel } from 'react-bootstrap';
import './Home.css';
import './../../App.css';
import ImageService from '../../services/ImageService';
import ImageModel from '../../models/Image';

export default class Home extends React.Component {
  constructor(props) {
    super(props);

    this.currentPageIndex = 0;

    this.state = {
      isLoading: true,
      images: [],
      showModal: false,
      selectedImage: null,
    };

    ImageService.getImages().then(resp => {
      this.setState(() => ({
        isLoading: false,
        images: resp,
      }));
    });
  }

  handleUpdatePageIndex = value => {
    const nextPageIndex = this.currentPageIndex + value >= 0 ? this.currentPageIndex + value : 0;

    if (this.currentPageIndex === nextPageIndex) {
      return;
    }

    const lastPageIndex = this.currentPageIndex;
    this.currentPageIndex = nextPageIndex;

    this.setState(() => ({
      isLoading: true,
    }));

    ImageService.getImages(this.currentPageIndex)
      .then(resp => {
        this.setState(() => ({
          isLoading: false,
          images: resp,
        }));
      })
      .catch(() => {
        this.currentPageIndex = lastPageIndex;
        this.setState(() => ({
          isLoading: false,
        }));
      });
  };

  handleCardClick = image => {
    ImageService.setSelectedImage(image).then(resp => {
      this.setState(() => ({
        showModal: true,
        selectedImage: resp,
      }));
    });
  };

  handleHideModal = () => {
    ImageService.setSelectedImage(null).then(() => {
      this.setState(() => ({
        showModal: false,
        selectedImage: null,
      }));
    });
  };

  handleChange = (event, image) => {
    const targetId = event.target.id;
    if (targetId === 'isGray') {
      image.isGray = event.target.checked;
      ImageService.setSelectedImage(image).then(resp => {
        this.setState({
          selectedImage: resp,
        });
      });
      return;
    }

    this.setState({
      [targetId]: event.target.value,
    });
  };

  render() {
    const imageCards = !this.state.isLoading
      ? this.state.images.map(image => (
          <div className="card" key={image.url} onClick={() => this.handleCardClick(image)}>
            <div className="card-middle">
              <img src={image.url} alt={image.id} />
            </div>
          </div>
        ))
      : null;

    const prevButton = (
      <div className="prev-button-container btn-primary" onClick={() => this.handleUpdatePageIndex(-1)}>
        <span>&larr;</span>
      </div>
    );

    const nextButton = (
      <div className="next-button-container btn-primary" onClick={() => this.handleUpdatePageIndex(1)}>
        <span>&rarr;</span>
      </div>
    );

    const imageModal =
      this.state.showModal && this.state.selectedImage !== null ? (
        <div className="app-modal-container">
          <div className="app-modal">
            <div className="app-modal-close-button-container">
              <Button className="app-modal-close-button btn-light" onClick={() => this.handleHideModal()}>
                X
              </Button>
            </div>
            <div className="app-modal-item">
              <FormGroup controlId="isGray" className="signup-checkbox-container">
                <FormControl
                  value={this.state.selectedImage.isGray}
                  onChange={event => this.handleChange(event, this.state.selectedImage)}
                  type="checkbox"
                  className="signup-checkbox"
                />
                <FormLabel className="signup-checkbox-label">Is Gray?</FormLabel>
              </FormGroup>
            </div>
            <div className="app-modal-item">
              <img
                src={
                  this.state.selectedImage.isGray
                    ? this.state.selectedImage.url + '?grayscale'
                    : this.state.selectedImage.url
                }
                alt={this.state.selectedImage.id}
              />
            </div>
          </div>
        </div>
      ) : null;

    return (
      <div className="home">
        <div className="card-container">{imageCards}</div>
        <div>{prevButton}</div>
        <div>{nextButton}</div>
        <div>{imageModal}</div>
      </div>
    );
  }
}
