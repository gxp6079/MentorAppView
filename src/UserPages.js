import React, { useState } from "react";
import { Tabs, TabPane, Heading, Button } from "@athena/forge";
import { Redirect, Link } from "react-router-dom";

function UserPages(props) {
  const tabIndex = props.location.pathname === "/userPage/mentee" ? 1 : 0;
  const [user, setUser] = useState(props.location.query.user);

  function updateUsers(updatedUser) {
    setUser(updatedUser);
    props.location.query.updateUser(updatedUser);
  }

  return (
    <>
      <div
        style={{
          flex: 1,
          flexDirection: "row",
        }}
      >
        <div
          className="fe_u_padding--large"
          style={{ display: "inline-block" }}
        >
          <Heading text="Drew's athenaMentor" />
        </div>
        <Link to={"/"}>
          <Button
            text="Log Out"
            className="fe_u_padding--large"
            variant="tertiary"
            style={{ float: "right" }}
          />
        </Link>
      </div>

      <Tabs selectedIndex={tabIndex}>
        <TabPane label="My Mentor">
          <Redirect
            to={{
              pathname: "/userPage/mentor",
              query: {
                user: user,
                updateUser: updateUsers,
              },
            }}
          />
        </TabPane>
        <TabPane label="My Mentees">
          <Redirect
            to={{
              pathname: "/userPage/mentee",
              query: {
                user: user,
                updateUser: updateUsers,
              },
            }}
          />
        </TabPane>
      </Tabs>
    </>
  );
}

export default UserPages;
