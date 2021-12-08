import React, { useState, useEffect } from "react";
import "./MiniDrawer.css";
import { styled, useTheme } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import LightbulbOutlinedIcon from "@mui/icons-material/LightbulbOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import ArchiveOutlinedIcon from "@mui/icons-material/ArchiveOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { connect } from "react-redux";
import {
  changeToArchive,
  changeToTrash,
  changeToNotes,
} from "../../../store/Action";

const drawerWidth = 240;
const marginTop = 65;

const openedMixin = (theme) => ({
  width: drawerWidth,
  marginTop: marginTop,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  marginTop: marginTop,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(9)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

function MiniDrawer(props) {
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (props.displayOption == true) {
      setOpen(true);
    } else if (props.displayOption == false) {
      setOpen(false);
    }
  }, [props.displayOption]);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const displayNormalNotes = () => {
    props.ListenToParticularLists("allNotes");
    props.dispatch(changeToNotes());
  };

  const displayArchiveLists = () => {
    // props.setArchiveTitle();
    props.dispatch(changeToArchive());
    props.ListenToParticularLists("isArchived");
  };

  const displayTrashLists = () => {
    props.dispatch(changeToTrash());
    props.ListenToParticularLists("isDeleted");
  };

  return (
    <>
      <Drawer variant="permanent" open={open}>
        <List>
          <ListItem
            button
            onClick={displayNormalNotes}
            style={{
              backgroundColor: "rgb(253, 239, 195)",
              borderRadius: "0px 22px 22px 0px",
            }}
          >
            <ListItemIcon>
              <LightbulbOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="Notes" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <NotificationsNoneOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="Reminders" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <EditOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="Edit labels" />
          </ListItem>
          <ListItem button onClick={displayArchiveLists}>
            <ListItemIcon>
              <ArchiveOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="Archive" />
          </ListItem>
          <ListItem button onClick={displayTrashLists}>
            <ListItemIcon>
              <DeleteOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="Bin" />
          </ListItem>
        </List>
      </Drawer>
    </>
  );
}

// const mapDispatchToProps = (dispatch) => {
//   return {
//     setArchiveTitle: () => dispatch({ type: "Remainder" }),
//   };
// };

export default connect()(MiniDrawer);
