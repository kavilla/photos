import React from 'react';
import { Redirect } from 'react-router-dom';
import { Button } from 'react-bootstrap';
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

  render() {
    const imageCards = !this.state.isLoading
      ? this.state.images.map(image => (
          <div className="card">
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

    return (
      <div className="home">
        <div className="card-container">{imageCards}</div>
        <div>{prevButton}</div>
        <div>{nextButton}</div>
      </div>
    );
  }
}
