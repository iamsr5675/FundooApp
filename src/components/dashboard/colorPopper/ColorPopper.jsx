import React, { useState } from "react";
import Box from "@mui/material/Box";
import Popper from "@mui/material/Popper";
import Typography from "@mui/material/Typography";
import Fade from "@mui/material/Fade";
import CircleIcon from "@mui/icons-material/Circle";
import IconButton from "@mui/material/IconButton";
import ColorLensOutlinedIcon from "@mui/icons-material/ColorLensOutlined";
import { changesColorNotes } from "../../../service/DataService"

export default function SimplePopper(props) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState();

  const handleEnter = (newPlacement) => (event) => {
    setAnchorEl(event.currentTarget);
    setOpen((prev) => placement !== newPlacement || !prev);
    setPlacement(newPlacement);
  };

  const handleLeave = () => {
    setOpen(false);
  };

  const color = [
    "#fff",
    "#f28b82",
    "#fbbc04",
    "#fff475",
    "#ccff90",
    "#a7ffeb",
    "#cbf0f8",
    "#aecbfa",
    "#d7aefb",
    "#fdcfe8",
    "#e6c9a8",
    "#e8eaed",
  ];

  const sendColor = (color) => {
    // console.log(color);
    // props.setColor(color);
    console.log(props.action);
    if (props.action === "create") {
      props.setColor(color);
    } else if (props.action === "update") {
      let data = {
        noteIdList: [props.noteId],
        color: color,
      };
      changesColorNotes(data).then((response) => {
        console.log(response);
        props.ListentoColorPopper(true)
        // props.setColor(color)
      })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <Box onMouseLeave={handleLeave}>
      <Popper
        style={{ border: "1px solid #C2C3C3", backgroundColor: "white" }}
        open={open}
        anchorEl={anchorEl}
        placement={placement}
        transition
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps}>
            <Typography
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
              }}
              sx={{ p: 1 }}
            >
              {color.map((color) => (
                <CircleIcon
                  onClick={() => sendColor(color)}
                  id={color}
                  style={{
                    border: "1px solid #f3f3f3",
                    borderRadius: "50%",
                    marginRight: "5px",
                    color: color,
                  }}
                />
              ))}
            </Typography>
          </Fade>
        )}
      </Popper>
      <IconButton size="small" onMouseEnter={handleEnter("top-start")}>
        <ColorLensOutlinedIcon style={{ color: "#5f6368" }} />
      </IconButton>
    </Box>
  );
}
