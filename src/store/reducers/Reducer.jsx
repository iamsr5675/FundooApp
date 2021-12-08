const initialTitleState = {
  title: "KEEP",
};

export const drawerReducer = (state = initialTitleState, action) => {
  switch (action.type) {
    case "Notes":
      return {
        ...state,
        title: "NOTES",
      };

    case "Archive":
      return {
        title: "ARCHIVE",
      };

    case "Trash":
      return {
        title: "TRASH",
      };

    default:
      return state;
  }
};
