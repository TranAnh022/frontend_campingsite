import React from "react";
import { Carousel } from "react-bootstrap";
import { ImEarth } from "react-icons/im";

type Props = {};

function Thumbnail({}: Props) {
  return (
    <div
      className="container d-flex justify-content-center align-items-center"
      style={{ height: "90vh" }}
    >
      <div className="row text-center">
        <div className="col-md-6 offset-md-3">
          <h1 className="display-4"> Find yourself outside. </h1>
          <h6>Discover and enjoy the beauty of nature.</h6>
          <a href="#main" className="btn p-2 rounded bg-success w-50 my-2">
            <div className="d-flex justify-content-center align-items-center gap-2 text-white ">
              <ImEarth />
              Explore Now
            </div>
          </a>
        </div>
        <div className="mt-3">
          <Carousel interval={5000}>
            <Carousel.Item>
              <img
                className="d-block w-100 rounded-4"
                src="https://images.unsplash.com/photo-1563299796-17596ed6b017?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80"
                alt="First slide"
                style={{ height: "480px" }}
              />
              <Carousel.Caption>
                <h3>Escape to the great outdoors</h3>
                <p>
                  Looking for a way to unwind and recharge? A camping trip may
                  be just what you need to escape the stress of everyday life.
                </p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100 rounded-4"
                src="https://images.unsplash.com/photo-1631635589499-afd87d52bf64?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80"
                alt="Second slide"
                style={{ height: "480px" }}
              />

              <Carousel.Caption>
                <h3>Unleash your wild side</h3>
                <p>
                  Experience the beauty and wonder of the great outdoors
                  firsthand with a memorable camping adventure."
                </p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100 rounded-4"
                src="https://images.unsplash.com/photo-1524137224090-114639b09a84?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1167&q=80"
                alt="Third slide"
                style={{ height: "480px" }}
              />

              <Carousel.Caption>
                <h3>Experience nature like never before</h3>
                <p>
                  From stunning scenery to unforgettable memories, camping
                  offers an endless array of possibilities for those seeking
                  adventure and relaxation.
                </p>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
        </div>
      </div>
    </div>
  );
}

export default Thumbnail;
