import React from "react";
import MiniDrawer from "../drawer/MiniDrawer";
import "./header.css";
import "./keep.png";
import { connect } from "react-redux";

function header(props) {
  const logo =
    "https://www.gstatic.com/images/branding/product/2x/keep_2020q4_48dp.png";
  const menu =
    "https://img.icons8.com/material-outlined/24/000000/menu--v1.png";
  const refresh = "https://img.icons8.com/ios-glyphs/30/000000/refresh--v1.png";
  const listView =
    "https://img.icons8.com/ios-glyphs/30/000000/view-stream.png";
  const setting =
    "https://img.icons8.com/material-outlined/30/000000/settings--v1.png";
  const app =
    "https://img.icons8.com/material-outlined/30/000000/circled-menu.png";
  const profile =
    "https://img.icons8.com/material/30/000000/user-male-circle--v1.png";

  const drawerMenu = () => {
    props.ListentoMenu(true);
  };

  return (
    <>
      <div className="header">
        <div className="menu" onClick={drawerMenu}>
          <img src={menu} alt="menu" />
        </div>
        <div className="logo">
          <img src={logo} alt="logo" />
        </div>
        <div className="name">
          <h3>{props.title}</h3>
        </div>
        <div className="search">
          <input
            type="email"
            className="form-control"
            id="exampleFormControlInput1"
            placeholder="Search"
          />
        </div>
        <div className="refresh">
          <img src={refresh} alt="refresh" />
        </div>
        <div className="list">
          <img src={listView} alt="List" />
        </div>
        <div className="setting">
          <img src={setting} alt="setting" />
        </div>
        <div className="apps">
          <img src={app} alt="apps" />
        </div>
        <div className="profile">
          <img src={profile} alt="profile" />
        </div>
      </div>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    title: state.drawerReducer.title,
  };
};

export default connect(mapStateToProps)(header);
