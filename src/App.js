import React, { useEffect, useState } from "react";
import { Route } from "react-router-dom";
import { getUsers } from "./api/userAPI";
import logo from "./athena_logo.svg";
import Login from "./Login";
import Home from "./Home";
import UserPages from "./UserPages";
import Mentee from "./Mentee";
import Mentor from "./Mentor";
function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers().then((_users) => setUsers(_users));
  }, []);

  function updateUser(editedUser) {
    const editedUsers = users.map((_user) => {
      if (_user.id === editedUser.id) {
        return editedUser;
      }
      return _user;
    });
    setUsers(editedUsers);
  }

  return (
    <>
      <div
        style={{
          width: "100%",
          background: "#43364D",
        }}
      >
        <img
          className="fe_u_padding--small"
          src={logo}
          style={{
            widht: 40,
            height: 40,
          }}
        />
      </div>
      <Route
        path="/"
        render={(props) => {
          return <Login users={users} />;
        }}
        exact
      />
      <Route
        path="/home/:userId"
        render={(props) => {
          return <Home users={users} updateUser={updateUser} />;
        }}
      />

      <Route path={"/userPage"} component={UserPages} />
      <Route path={"/userPage/mentor"} component={Mentor} />
      <Route path={"/userPage/mentee"} component={Mentee} />
    </>
  );
}

export default App;
