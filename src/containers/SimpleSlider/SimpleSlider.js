import React from "react";
import Slider from "react-slick";
import "./SimpleSlider.css";

import fedoriv from "../../assets/img/fedoriv.png";
import gofriends from "../../assets/img/goFriends.png";

class SimpleSlider extends React.Component {
  render() {
    const settings = {
      dots: false,
      infinite: true,
      arrows: true,
      speed: 500,
      slidesToShow: 6,
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 1300,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 1,
            infinite: true,
            dots: false,
            arrows: true
          }
        },
        {
          breakpoint: 900,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
            infinite: true,
            dots: false,
            arrows: true
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
            infinite: true,
            dots: false,
            arrows: true
          }
        },
        {
          breakpoint: 425,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            infinite: true,
            dots: false,
            arrows: true
          }
        }
      ]
    };
    return (
      <div className="WrapperSlick">
        <Slider {...settings}>
          <div>
            <img src={fedoriv} alt="logo" />
          </div>
          <div>
            <img src={gofriends} alt="logo" />
          </div>
          <div>
            <img src={fedoriv} alt="logo" />
          </div>
          <div>
            <img src={gofriends} alt="logo" />
          </div>
          <div>
            <img src={fedoriv} alt="logo" />
          </div>
          <div>
            <img src={gofriends} alt="logo" />
          </div>
          <div>
            <img src={fedoriv} alt="logo" />
          </div>
          <div>
            <img src={gofriends} alt="logo" />
          </div>
        </Slider>
      </div>
    );
  }
}

export default SimpleSlider;
