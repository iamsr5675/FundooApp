import React from "react";
import "./TextNote1.css";

function TextNote1(props) {
  const checked =
    "https://img.icons8.com/material-outlined/24/000000/checked-checkbox.png";
  const brush =
    "https://img.icons8.com/ios-glyphs/30/000000/calligraphy-brush.png";
  const gallery =
    "https://img.icons8.com/material-outlined/30/000000/stack-of-photos--v1.png";

  const changeNote = () => {
    props.listenToTakeNote1(true);
  };

  return (
    <div className="main">
      <div className="note" onClick={changeNote}>
        <h5>Take a note...</h5>
        <div className="img1">
          <img src={checked} alt="check" />
        </div>
        <div className="img2">
          <img src={brush} alt="brush" />
        </div>
        <div className="img3">
          <img src={gallery} alt="gallery" />
        </div>
      </div>
    </div>
  );
}

export default TextNote1;
