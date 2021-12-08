import React, { useState, useEffect } from "react";
import "./Dashboard.css";
import Header from "../../components/dashboard/header/Header";
import TextNote1 from "../../components/dashboard/textnote1/TextNote1";
import TextNote2 from "../../components/dashboard/textnote2/TextNote2";
import TextNote3 from "../../components/dashboard/textnote3/TextNote3";
import MiniDrawer from "../../components/dashboard/drawer/MiniDrawer";
import { GetNotes } from "../../service/DataService";

function Dashboard() {
  const [active, setActive] = useState(false);
  const [displayOption, setDisplayOption] = useState(false);
  const [notesArray, setNotesArray] = useState([]);

  useEffect(() => {
    getNotes("allNotes");
  }, []);

  const listenToTakeNote1 = (data) => {
    if (data === true) {
      setActive(true);
    } else if (data === false) {
      setActive(false);
      getNotes("allNotes");
    }
  };

  const getNotes = (action) => {
    GetNotes()
      .then((response) => {
        let filterArray = response.data.data.data.filter(function (note) {
          if (action == "allNotes") {
            if (note.isArchived === false && note.isDeleted === false) {
              return note;
            }
          } else if (action == "isArchived") {
            if (note.isArchived === true && note.isDeleted === false) {
              return note;
            }
          } else if (action == "isDeleted") {
            if (note.isArchived === false && note.isDeleted === true) {
              return note;
            }
          }
        });
        // console.log(response.data.data.data);
        setNotesArray(filterArray);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const ListenToParticularLists = (data) => {
    getNotes(data);
  };

  const ListentoMenu = (data) => {
    if (data === true) {
      setDisplayOption(!displayOption);
    }
  };

  const ListentoColorPopper = (data) => {
    getNotes();
  };

  const ListentoTrashNotes = (data) => {
    getNotes();
  };

  const updateModal = () => {
    getNotes();
  };

  return (
    <div className="board">
      <Header ListentoMenu={ListentoMenu} />
      <MiniDrawer
        displayOption={displayOption}
        ListenToParticularLists={ListenToParticularLists}
      />

      {active ? (
        <TextNote2 listenToTakeNote1={listenToTakeNote1} />
      ) : (
        <TextNote1 listenToTakeNote1={listenToTakeNote1} />
      )}

      <div className="notesContainer">
        {notesArray.map((note) => (
          <TextNote3
            note={note}
            ListentoColorPopper={ListentoColorPopper}
            ListentoTrashNotes={ListentoTrashNotes}
            updateModal={updateModal}
          />
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
