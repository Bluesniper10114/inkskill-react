import React, { Component } from 'react';
import Slider from 'react-slick';
import * as Arrow from 'core/components/Arrows';

// eslint-disable-next-line react/prefer-stateless-function
class Carousel extends Component {
  next = () => {
    this.slider.slickNext();
  };

  prev = () => {
    this.slider.slickPrev();
  };

  render() {
    const { items } = this.props;
    const settings = {
      arrows: false,
      adaptiveHeight: true,
      lazyLoad: true,
      dots: true,
      dotsClass: 'carousel-indicators',
      customPaging: index => (
        <img src={items[index]} alt="Slide 1" />
      ),
    };

    return (
      <div id="carousel-example-generic" className="carousel slide">
        <div className="carousel-inner" role="listbox">
          <Slider ref={(c) => { this.slider = c; }} {...settings}>
            {items.map(item => (
              <div key={item} className="item active">
                <img src={item} alt="Slide" />
              </div>
            ))}
          </Slider>
        </div>

        <span className="left carousel-control" onClick={this.prev}>
          <Arrow.Left />
        </span>
        <span className="right carousel-control" onClick={this.next}>
          <Arrow.Right />
        </span>
      </div>
    );
  }
}

export default Carousel;
