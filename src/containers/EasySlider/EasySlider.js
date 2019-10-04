import React, { Component } from "react";
import Slider from "react-slick";



import "./EasySlider.css";

export default class EasySlider extends Component {
  render() {
    const settings = {
      dots: false,
      infinite: true,
      arrows: true,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 1
    };
    return (
      <div className="EasySliderWrapper">
        <Slider {...settings}>
        {this.props.images.map(el=>
          <div>
              <img width="100%" src={el} alt="photo1" />
            </div>
        )}
        </Slider>
      </div>
    );
  }
}
