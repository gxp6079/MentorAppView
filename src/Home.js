import React, { useState } from "react";
import { Heading, Button } from "@athena/forge";
import { useRouteMatch, Link, Redirect, Route } from "react-router-dom";
import { editUser } from "./api/userAPI";

function Home(props) {
  const match = useRouteMatch();
  const { userId } = match.params;
  const [user, setUser] = useState(
    props.users.filter((_user) => _user.id === parseInt(userId))[0]
  );
  const [loggingOut, setLoggingOut] = useState(false);
  const [mentorSatus, setMentorStatus] = useState(
    user.mentor !== null || user.searching ? "My Mentor" : "Get a Mentor"
  );
  const [mentoringStatus, setMentoringStatus] = useState(
    user.menteeCapacity !== 0 || user.mentees.length !== 0
      ? "My Mentees"
      : "Become a Mentor"
  );

  function logout() {
    setLoggingOut(true);
  }

  function setSearchingForMentor() {
    const newUser = { ...user, searching: true };
    editUser(newUser);
    props.updateUser(newUser);
    setUser(newUser);
    setMentorStatus("My Mentor");
  }

  function setSearchingForMentee() {
    const newUser = { ...user, menteeCapacity: 1 };
    editUser(newUser);
    props.updateUser(newUser);
    setUser(newUser);
    setMentoringStatus("My Mentees");
  }

  return (
    <>
      {loggingOut && <Redirect to="/" />}
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
          <Heading
            text="Drew's athenaMentor"
            headingDescription="Instructions about what will happen go here."
            className="fe_u_padding--bottom-medium"
          />
        </div>
        <Button
          text="Log Out"
          variant="tertiary"
          className="fe_u_padding--large"
          onClick={logout}
          style={{ float: "right" }}
        />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {mentorSatus === "My Mentor" ? (
          <Link
            to={{
              pathname: "/userPage/mentor",
              query: {
                user: user,
                updateUser: props.updateUser,
                turnSearchinOn: setSearchingForMentor,
              },
            }}
          >
            <Button text={mentorSatus} className="fe_u_margin--medium" />
          </Link>
        ) : (
          <Button
            text={mentorSatus}
            onClick={setSearchingForMentor}
            className="fe_u_margin--medium"
          />
        )}

        {mentoringStatus === "My Mentees" ? (
          <Link
            to={{
              pathname: "/userPage/mentee",
              query: {
                user: user,
                updateUser: props.updateUser,
              },
            }}
          >
            <Button text="My Mentees" className="fe_u_margin--medium" />
          </Link>
        ) : (
          <Button
            text={mentoringStatus}
            onClick={setSearchingForMentee}
            className="fe_u_margin--medium"
          />
        )}
      </div>
    </>
  );
}

export default Home;
