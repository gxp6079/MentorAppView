import React, { useState } from "react";
import { Tabs, TabPane, Heading, Button } from "@athena/forge";
import { Redirect, Link } from "react-router-dom";

function UserPages(props) {
  const tabIndex = props.location.pathname === "/userPage/mentee" ? 1 : 0;
  const [user, setUser] = useState(props.location.query.user);
  const [mentees, setMentees] = useState(props.location.query.mentees);
  const [mentor, setMentor] = useState(props.location.query.mentor);

  function updateUser(updatedUser) {
    setUser(updatedUser);
    debugger;
    props.location.query.updateUser([updatedUser]);
  }

  function removeMentor(newUser) {
    setMentor(null);
    props.location.query.removeMentor(newUser);
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
                mentees: mentees,
                mentor: mentor,
                updateRelation: setMentees,
                updeteMentor: setMentor,
                updateUser: updateUser,
                removeMentor: removeMentor,
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
                mentees: mentees,
                mentor: mentor,
                updateRelation: setMentees,
                updeteMentor: setMentor,
                updateUser: updateUser,
                removeMentor: removeMentor,
              },
            }}
          />
        </TabPane>
      </Tabs>
    </>
  );
}

export default UserPages;
