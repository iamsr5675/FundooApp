import React, { useRef } from "react";
import "./TextNote3.css";
import AddAlertOutlinedIcon from "@mui/icons-material/AddAlertOutlined";
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";
import CropOriginalOutlinedIcon from "@mui/icons-material/CropOriginalOutlined";
import ArchiveOutlinedIcon from "@mui/icons-material/ArchiveOutlined";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import { ArchiveNotes } from "../../../service/DataService";
import SimplePopper from "../colorPopper/ColorPopper";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { trashNotes } from "../../../service/DataService";
import { updateNotes } from "../../../service/DataService";

function TextNote3(props) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  console.log(props);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 600,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const updateArchived = (event) => {
    event.preventDefault();

    console.log(event.target.id);

    let archivedObject = {
      noteIdList: [event.target.id],
      isArchived: true,
    };
    ArchiveNotes(archivedObject)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const updateTrash = (event) => {
    event.preventDefault();

    let trashObject = {
      noteIdList: [event.target.id],
      isDeleted: true,
    };
    trashNotes(trashObject)
      .then((response) => {
        console.log(response);
        props.ListentoTrashNotes(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const title = useRef(null);
  const description = useRef(null);

  const handleClose1 = () => {
    // console.log(titleData.current.value)
    // console.log(descriptionData.current.value)
    setOpen(false);

    const data = new FormData();
    data.append("noteId", props.note.id);
    data.append("title", title.current.value);
    data.append("description", description.current.value);

    updateNotes(data)
      .then((response) => {
        console.log(response);
        props.updateModal(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="lead">
      <form className="q1" onClick={handleOpen}>
        <input
          className="card1"
          type="text"
          placeholder={props.note.title}
          style={{ backgroundColor: props.note.color }}
        />
        <input
          className="card2"
          style={{ backgroundColor: props.note.color }}
          type="text"
          placeholder={props.note.description}
        />
        {props.note.collaborators.length !== 0 ? (
          <div>
            {props.note.collaborators.map(() => (
              <div>
                <img src="https://img.icons8.com/windows/2x/user-male-circle.png" />
              </div>
            ))}
          </div>
        ) : null}
        <div className="card3" style={{ backgroundColor: props.note.color }}>
          <div className="iconss">
            <AddAlertOutlinedIcon
              style={{ color: "#5f6368" }}
              className="iconic"
            />
            <PersonAddAltOutlinedIcon
              style={{ color: "#5f6368" }}
              className="iconic"
            />
            <SimplePopper
              action="update"
              noteId={props.note.id}
              ListentoColorPopper={props.ListentoColorPopper}
            />
            <DeleteOutlineOutlinedIcon
              style={{ color: "#5f6368" }}
              className="iconic"
              onClick={updateTrash}
              id={props.note.id}
            />
            <CropOriginalOutlinedIcon
              style={{ color: "#5f6368" }}
              className="iconic"
            />
            <ArchiveOutlinedIcon
              style={{ color: "#5f6368" }}
              onClick={updateArchived}
              id={props.note.id}
              className="iconic"
            />
            <MoreVertOutlinedIcon
              style={{ color: "#5f6368" }}
              className="iconic"
            />
          </div>
        </div>
      </form>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} style={{ backgroundColor: props.note.color }}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            style={{ display: "flex", justifyContent: "flex-start" }}
          >
            <input
              type="text"
              ref={title}
              style={{
                backgroundColor: props.note.color,
                border: "none",
                outline: "none",
              }}
              defaultValue={props.note.title}
            />
          </Typography>
          <Typography
            id="modal-modal-description"
            style={{ display: "flex", justifyContent: "flex-start" }}
            sx={{ mt: 2 }}
          >
            <input
              type="text"
              ref={description}
              style={{
                backgroundColor: props.note.color,
                border: "none",
                outline: "none",
              }}
              defaultValue={props.note.description}
            />
          </Typography>
          <Typography
            id="modal-modal-description"
            style={{ display: "flex", justifyContent: "space-between" }}
            sx={{ mt: 2 }}
          >
            <AddAlertOutlinedIcon
              style={{ color: "#5f6368" }}
              className="iconic"
            />
            <PersonAddAltOutlinedIcon
              style={{ color: "#5f6368" }}
              className="iconic"
            />
            <SimplePopper
              action="update"
              noteId={props.note.id}
              ListentoColorPopper={props.ListentoColorPopper}
            />
            <DeleteOutlineOutlinedIcon
              style={{ color: "#5f6368" }}
              className="iconic"
              onClick={updateTrash}
              id={props.note.id}
            />
            <CropOriginalOutlinedIcon
              style={{ color: "#5f6368" }}
              className="iconic"
            />
            <ArchiveOutlinedIcon
              style={{ color: "#5f6368" }}
              onClick={updateArchived}
              id={props.note.id}
              className="iconic"
            />
            <MoreVertOutlinedIcon
              style={{ color: "#5f6368" }}
              className="iconic"
            />
            <Button variant="text" color="success" onClick={handleClose1}>
              Close
            </Button>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}

export default TextNote3;
