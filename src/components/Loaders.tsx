import React from "react";
import "../style/loadersStyle.scss";

const Loaders: React.FC = () => {
  return (
    <div>
      <div className="loader">
        <span className="loader-text">loading</span>
        <span className="load"></span>
      </div>
    </div>
  );
};

export default Loaders;
