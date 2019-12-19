import React from "react";
import "../menu-item/menu-item.styles.scss";
import { withRouter } from "react-router-dom";
const MenuItem = ({ title, imageUrl, size, history, linkUrl, match }) => (
  <div
    className={`${size} menu-item`}
    //Asi se rutea en REACT!!!
    onClick={() => history.push(`${match.url}${linkUrl}`)}
  >
    <div
      className="backgroundImage"
      style={{
        backgroundImage: `url(${imageUrl})`
      }}
    ></div>
    <div className="content">
      <div className="title">{title.toUpperCase()}</div>
      <span className="subtitle">SHOP NOW</span>
    </div>
  </div>
);

export default withRouter(MenuItem);
