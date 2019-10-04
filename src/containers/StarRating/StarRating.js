import React from 'react';
import Ratings from 'react-ratings-declarative';

const StarRating = (props) => {

      const {rating, changeRating, review} = props;

      return (
          <Ratings
            rating={rating}
            widgetRatedColors="#EB5527"
            changeRating={review ? changeRating : null}
          >
            <Ratings.Widget
                widgetDimension="2rem"
                widgetSpacing=".25rem"
            />
            <Ratings.Widget
                widgetDimension="2rem"
                widgetSpacing=".25rem"
             />
            <Ratings.Widget 
                widgetDimension="2rem"
                widgetSpacing=".25rem"
            />
            <Ratings.Widget 
                widgetDimension="2rem"
                widgetSpacing=".25rem"
            />
            <Ratings.Widget 
                widgetDimension="2rem"
                widgetSpacing=".25rem"
            />
          </Ratings>
      );
    }

export default StarRating;
 