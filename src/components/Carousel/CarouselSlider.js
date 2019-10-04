import React from "react";
import { Carousel } from "react-responsive-carousel";

import "./CarouselSlider.css";


const CarouselSlider = (props) => {
  console.log(props);
  return (
  <Carousel
      autoPlay={true}
      showArrows={false}
      showStatus={false}
      infiniteLoop={true}
      selectedItem={0}
      showThumbs={false}
    >
    {props.images.map(el=>
      <div id="slide">
        <img src={el} alt="slide"/>
      </div>
      )
    }
      {/* <div id="slide">
        <img src={slideOne} alt="grilled_food" />
      </div>
      <div id="slide">
        <img src={slideTwo} alt="grilled_food" />
      </div>
      <div id="slide">
        <img src={slideThree} alt="grilled_food" />
      </div> */}
    </Carousel>
  )
}

export default CarouselSlider;

