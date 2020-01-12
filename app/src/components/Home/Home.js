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

    this.state = {
      images: [],
    };

    ImageService.getImages().then(resp => {
      this.setState(() => ({
        images: resp,
      }));
    });
  }

  render() {
    const imageCards = this.state.images.map(image => (
      <div className="card">
        <div className="card-middle">
          <img src={image.url} alt={image.url} />
        </div>
      </div>
    ));

    return (
      <div className="home">
        <div className="card-container">{imageCards}</div>
      </div>
    );
  }
}
