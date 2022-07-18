import axios from "axios";
const apiURL = process.env.REACT_APP_API_URL;

const BearerToken = () =>
  localStorage.getItem("jwt")
    ? JSON.parse(localStorage.getItem("jwt")).token
    : false;
const Headers = () => {
  return {
    headers: {
      token: `Bearer ${BearerToken()}`,
    },
  };
};

export const getAllUsers = async () => {
    try {
      let res = await axios.get(`${apiURL}/api/user/all-user`);
      return res.data;
    } catch (error) {
      console.log(error);
    }
};

export const deleteUserAxios = async (userID) => {
    try {
        let res = await axios.post(
        `${apiURL}/api/user/delete-user`,
        { userID },
        Headers());
        console.log([userID])
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

