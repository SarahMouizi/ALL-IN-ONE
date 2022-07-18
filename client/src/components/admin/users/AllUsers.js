import React, { Fragment, useContext, useEffect } from "react";
import {getAllUsers, deleteUserAxios} from "./FetchApi";
import { UsersContext } from "./users";
import moment from "moment";

const AllUsers = (props) => {
  const { data, dispatch } = useContext(UsersContext);
  const { users, loading } = data;

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchData = async () => {
    dispatch({ type: "loading", payload: true });
    let responseData = await getAllUsers();
    setTimeout(() => {
      if (responseData && responseData.Users) {
        dispatch({
          type: "fetchUsers",
          payload: responseData.Users,
        });
        dispatch({ type: "loading", payload: false });
      }
    }, 1000);
  };

  const deleteUserReq = async (userID) => {
    let deleteUser = await deleteUserAxios(userID);
    if (deleteUser.error) {
      console.log(deleteUser.error);
    } else if (deleteUser.success) {
      console.log(deleteUser.success);
      fetchData();
    }
  };


  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <svg
          class="w-12 h-12 animate-spin text-gray-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
          ></path>
        </svg>
      </div>
    );
  }

  return (
    <Fragment>
      <div className="col-span-1 overflow-auto bg-white shadow-lg p-4">
        <table className="table-auto border w-full my-2">
          <thead>
            <tr>
              <th className="px-4 py-2 border">Name</th>
              <th className="px-4 py-2 border">E-mail</th>
              <th className="px-4 py-2 border">Created at</th>
              <th className="px-4 py-2 border">Updated at</th>
              <th className="px-4 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users && users.length > 0 ? (
              users.map((item, key) => {
                return (
                  <UsersTable
                    user={item}
                    deleteUserProp={(userID) => deleteUserReq(userID)}
                    key={key}
                  />
                );
              })
            ) : (
              <tr>
                <td
                  colSpan="7"
                  className="text-xl text-center font-semibold py-8"
                >
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <div className="text-sm text-gray-600 mt-2">
          Total {users && users.length} user found
        </div>
      </div>
    </Fragment>
  );
};

/* Single Category Component */
const UsersTable = ({ user, deleteUserProp }) => {
  return (
    <Fragment>
      <tr>
        <td className="p-2 text-left">
          {user.name.length > 20
            ? user.name.slice(0, 20) + "..."
            : user.name}
        </td>

        <td className="p-2 text-left">
          {user.email.length > 30
            ? user.email.slice(0, 30) + "..."
            : user.email}
        </td>

        <td className="p-2 text-center">
          {moment(user.createdAt).format("lll")}
        </td>

        <td className="p-2 text-center">
          {moment(user.updatedAt).format("lll")}
        </td>

        {user.userRole === 0 ? (        
        <td>
        <span
            onClick={(e) => deleteUserProp(user._id)}
            className="cursor-pointer hover:bg-gray-200 rounded-lg p-2 mx-1"
          >
            <svg
              className="w-6 h-6 fill-current text-red-500"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </span>
        </td>
        ):(        
        <td>
        <span
            className="delete-admin-button cursor-pointer hover:bg-gray-200 rounded-lg p-2 mx-1"
          >
            <svg
              className="w-6 h-6 fill-current text-blue-500"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </span>
        </td>
        )}
      </tr>
    </Fragment>
  );
};

export default AllUsers;
