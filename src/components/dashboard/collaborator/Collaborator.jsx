import React from "react";
import "./Collaborator.css";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import Avatar from "@mui/material/Avatar";
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";
import { deepOrange } from "@mui/material/colors";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { searchUserList } from "../../../service/DataService";
import Box from "@mui/material/Box";
import Popper from "@mui/material/Popper";

function Collaborator(props) {
  const [searcArray, setsearchArray] = React.useState([]);
  const [searchword, setsearchword] = React.useState("");
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = () => {
    props.ListentoCollaborator(true);
  };
  console.log(props);
  const searchUser = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
    console.log(event.target.value);
    setsearchword(event.target.value);
    let data = {
      searchWord: event.target.value,
    };
    searchUserList(data)
      .then((response) => {
        console.log(response);
        let searcArray = response.data.data.details.filter(function (obj) {
          if (obj.email.includes(searchword)) {
            return obj;
          }
        });
        setsearchArray(searcArray);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const open = Boolean(anchorEl);
  const id = open ? "simple-popper" : undefined;

  const SelectId = (search) => {
    setsearchword(search);
    console.log(search);
    setAnchorEl(null);
  };

  const handleSave = () => {
    let filArray = searcArray.filter(function (obj) {
      if (searchword === obj.email) {
        return obj;
      }
    });
    props.ListenToTakeCollaborator([...props.collaborator2, filArray[0]]);
    setsearchword("");
    props.ListentoCollaborator(true);
  };

  return (
    <div className="row">
      <div className="row1">
        <h5 style={{ marginLeft: "25px" }}>Collaborators</h5>
      </div>
      <Divider />
      <div className="row2">
        <List component="nav" aria-label="mailbox folders">
          <ListItem>
            <Avatar sx={{ bgcolor: deepOrange[500] }}>S</Avatar>
            <ListItemText
              primary="Saurabh Ranjan (Owner)"
              secondary="saurabhranjan5675@gmail.com"
            />
          </ListItem>
          {props.collaborator2.map((obj) => (
            <div className="getemail">
              <img src="https://img.icons8.com/windows/2x/user-male-circle.png" />
              <input className="inputemail" type="text" value={obj.email} />
            </div>
          ))}
          {/* <ListItem>
            {props.collaborator2.map((obj) => {
              <>
                <Avatar>
                  <PersonAddAltOutlinedIcon
                    style={{ color: "#5f6368", marginLeft: "3px" }}
                  />
                </Avatar>
                <input
                  value={obj.email}
                  type="text"
                  style={{ width: "30vw", border: "none", outline: "none" }}
                  placeholder="Person or email to share with"
                />
              </>;
            })}
          </ListItem> */}
          <ListItem>
            <Avatar>
              <PersonAddAltOutlinedIcon
                style={{ color: "#5f6368", marginLeft: "3px" }}
              />
            </Avatar>

            <input
              value={searchword}
              onChange={searchUser}
              type="text"
              style={{ width: "30vw", border: "none", outline: "none" }}
              placeholder="Person or email to share with"
            />

            <Popper id={id} open={open} anchorEl={anchorEl}>
              <Box sx={{ border: 1, p: 1, bgcolor: "background.paper" }}>
                {searcArray.map((search) => (
                  <div onClick={() => SelectId(search.email)}>
                    {search.email}{" "}
                  </div>
                ))}
              </Box>
            </Popper>
          </ListItem>
        </List>
      </div>
      <div className="row3">
        <Stack spacing={2} direction="row">
          <Button variant="text" onClick={handleClick}>
            Cancel
          </Button>
          <Button variant="text" onClick={handleSave}>
            Save
          </Button>
        </Stack>
      </div>
    </div>
  );
}

export default Collaborator;
