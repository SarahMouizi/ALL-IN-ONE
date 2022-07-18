import React, { Fragment, createContext, useReducer } from "react";
import AdminLayout from "../layout";
import AllUsers from "./AllUsers";
import { userState, userReducer } from "./UserContext";
import "./style.css";


/* This context manage all of the caregories component's data */
export const UsersContext = createContext();

const UsersComponent = () => {
  return (
    <div className="grid grid-cols-1 space-y-4 p-4">
        <AllUsers />
    </div>
  );
};

const Users = (props) => {
  const [data, dispatch] = useReducer(userReducer, userState);
  return (
    <Fragment>
      <UsersContext.Provider value={{ data, dispatch }}>
        <AdminLayout children={<UsersComponent />} />
      </UsersContext.Provider>
    </Fragment>
  );
};

export default Users;