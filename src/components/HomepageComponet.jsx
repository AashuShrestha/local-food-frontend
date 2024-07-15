import React from "react";
import { Link } from "react-router-dom";
import "../css/homeheader.css";
function HomeHeader(props) {
  return (
    <div>
      <div>
        <header
          className="masthead"
          style={{ backgroundImage: `url(${props.image})` }}
        >
          <div className="container">
            <div className="masthead-subheading">{props.title}</div>
            <div className="masthead-heading text-uppercase">
              {props.subtitle}
            </div>
            {props.showButton && (
              <Link
                className="px-8 py-3 btn btn-dark btn-xl text-uppercase"
                to={`${props.Link}`}
              >
                {" "}
                {props.buttonText}
              </Link>
            )}
          </div>
        </header>
      </div>
    </div>
  );
}

export default HomeHeader;
