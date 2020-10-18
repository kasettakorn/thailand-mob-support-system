import { Carousel } from "antd";
import React, { Component } from "react";
import img1 from '../images/carousel1.jpg';
const contentStyle = {
    height: '300px',
    color: '#fff',
    lineHeight: '300px',
    textAlign: 'center',
    background: '#364d79',
  };
export default class Home extends Component {
  render() {
    return (
      <div>
        <Carousel autoplay>
          <div>
            <h3 style={contentStyle}>Thailand mob support system</h3>
          </div>
          <div>
            <h3 style={contentStyle}>We want to help you.</h3>
          </div>
        </Carousel>
      </div>
    );
  }
}
