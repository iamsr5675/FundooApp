import React, { useState } from "react";
import "./TextNote2.css";
import AddAlertOutlinedIcon from "@mui/icons-material/AddAlertOutlined";
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";
import ColorLensOutlinedIcon from "@mui/icons-material/ColorLensOutlined";
import CropOriginalOutlinedIcon from "@mui/icons-material/CropOriginalOutlined";
import ArchiveOutlinedIcon from "@mui/icons-material/ArchiveOutlined";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import UndoOutlinedIcon from "@mui/icons-material/UndoOutlined";
import RedoOutlinedIcon from "@mui/icons-material/RedoOutlined";
import Button from "@mui/material/Button";
import { AddNotes } from "../../../service/DataService";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import ColorPopper from "../colorPopper/ColorPopper";
import SimplePopper from "../colorPopper/ColorPopper";
import Collaborator from "../collaborator/Collaborator";

function TextNote2(props) {
  const [noteColor, setNoteColor] = useState("");
  const [collaborator, setCollaborator] = useState(false);
  const [collaborator2, setCollaborator2] = useState([]);
  const [noteObj, setNoteObj] = useState({
    title: "",
    description: "",
    isArchived: false,
  });

  const changeNote = () => {
    props.listenToTakeNote1(true);
  };

  const takeTitle = (e) => {
    setNoteObj({ ...noteObj, title: e.target.value });
  };

  const takeDescription = (e) => {
    setNoteObj({ ...noteObj, description: e.target.value });
  };

  const takeArchived = (e) => {
    e.preventDefault();
    setNoteObj({ ...noteObj, isArchived: !noteObj.isArchived });
  };

  const setColor = (color) => {
    console.log(color);
    setNoteColor(color);
  };

  const submit = () => {
    console.log(noteObj);
    const data = new FormData();
    data.append("title", noteObj.title);
    data.append("description", noteObj.description);
    data.append("isArchived", noteObj.isArchived);
    data.append("color", noteColor);
    data.append("collaberators", JSON.stringify(collaborator2));
    AddNotes(data)
      .then((response) => {
        console.log(response);
        props.listenToTakeNote1(false);
      })
      .catch((error) => {
        console.log(error);
        props.listenToTakeNote1(true);
      });
  };

  const displayCollaborator = () => {
    setCollaborator(true);
  };

  const ListentoCollaborator = (data) => {
    console.log("collabarator", data);
    if (data == true) {
      setCollaborator(false);
    }
  };

  const ListenToTakeCollaborator = (data) => {
    setCollaborator2(data);
  };

  return (
    <div className="primary">
      <ClickAwayListener onClickAway={changeNote}>
        {collaborator ? (
          <Collaborator
            ListentoCollaborator={ListentoCollaborator}
            ListenToTakeCollaborator={ListenToTakeCollaborator}
            collaborator2={collaborator2}
          />
        ) : (
          <form className="p1">
            <input
              style={{ backgroundColor: noteColor }}
              className="input"
              type="text"
              placeholder="Title"
              onChange={takeTitle}
            />
            <input
              style={{ backgroundColor: noteColor }}
              className="input1"
              type="text"
              placeholder="Take a note..."
              onChange={takeDescription}
            />
            {collaborator2.length !== 0 ? (
              <div className="collab">
                {collaborator2.map(() => (
                  <div className="collabicon">
                    <img src="https://img.icons8.com/windows/2x/user-male-circle.png" />
                  </div>
                ))}
              </div>
            ) : null}
            <div className="input3" style={{ backgroundColor: noteColor }}>
              <AddAlertOutlinedIcon
                style={{ color: "#5f6368" }}
                className="icons"
              />
              <PersonAddAltOutlinedIcon
                style={{ color: "#5f6368" }}
                className="icons"
                onClick={displayCollaborator}
              />
              {/* <ColorLensOutlinedIcon className="icons" /> */}
              <SimplePopper setColor={setColor} action="create" />
              <CropOriginalOutlinedIcon
                style={{ color: "#5f6368" }}
                className="icons"
              />
              <ArchiveOutlinedIcon
                style={{ color: "#5f6368" }}
                onClick={takeArchived}
                className="icons"
              />
              <MoreVertOutlinedIcon
                style={{ color: "#5f6368" }}
                className="icons"
              />
              <UndoOutlinedIcon
                style={{ color: "#5f6368" }}
                className="icons"
              />
              <RedoOutlinedIcon
                style={{ color: "#5f6368" }}
                className="icons"
              />
              <Button
                onClick={changeNote}
                onClick={submit}
                variant="text"
                color="success"
              >
                Close
              </Button>
            </div>
          </form>
        )}
      </ClickAwayListener>
    </div>
  );
}

export default TextNote2;
