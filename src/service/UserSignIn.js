import axios from "axios";

export const UserSignIn = async (obj) => {
  let response = await axios.post(
    "http://fundoonotes.incubation.bridgelabz.com/api/user/login",
    obj
  );
  return response;
};
