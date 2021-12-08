import axios from "axios";

let configObjForaddNotes = {
  headers: {
    "Content-Type": "multipart/form-data",
    Authorization: localStorage.getItem("token"),
  },
};

let configObjArchivedNotes = {
  headers: {
    Authorization: localStorage.getItem("token"),
  },
};

let configObjColorNotes = {
  headers: {
    Authorization: localStorage.getItem("token"),
  },
};

let configObjTrashNotes = {
  headers: {
    Authorization: localStorage.getItem("token"),
  },
};

export const AddNotes = async (formData) => {
  let response = await axios.post(
    "http://fundoonotes.incubation.bridgelabz.com/api/notes/addNotes",
    formData,
    configObjForaddNotes
  );
  return response;
};

export const GetNotes = async () => {
  let response = await axios.get(
    "http://fundoonotes.incubation.bridgelabz.com/api/notes/getNotesList",
    configObjForaddNotes
  );
  return response;
};

export const ArchiveNotes = async (archivedObject) => {
  console.log(archivedObject);
  let response = await axios.post(
    "http://fundoonotes.incubation.bridgelabz.com/api/notes/archiveNotes",
    archivedObject,
    configObjArchivedNotes
  );
  return response;
};

export const changesColorNotes = async (colorObject) => {
  console.log(colorObject);
  let response = await axios.post(
    "http://fundoonotes.incubation.bridgelabz.com/api/notes/changesColorNotes",
    colorObject,
    configObjColorNotes
  );
  return response;
};

export const trashNotes = async (trashObject) => {
  console.log(trashObject);
  let response = await axios.post(
    "http://fundoonotes.incubation.bridgelabz.com/api/notes/trashNotes",
    trashObject,
    configObjTrashNotes
  );
  return response;
};

export const getTrashNotesList = async () => {
  let response = await axios.get(
    "http://fundoonotes.incubation.bridgelabz.com/api/notes/getTrashNotesList",
    configObjTrashNotes
  );
  return response;
};

export const updateNotes = async (formData) => {
  let response = await axios.post(
    "http://fundoonotes.incubation.bridgelabz.com/api/notes/updateNotes",
    formData,
    configObjForaddNotes
  );
  return response;
};

export const searchUserList = async (searchObject) => {
  let response = await axios.post(
    "http://fundoonotes.incubation.bridgelabz.com/api/user/searchUserList",
    searchObject,
    configObjArchivedNotes
  );
  return response;
};
