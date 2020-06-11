import React, { useState, useEffect } from "react";
import { Heading, Button } from "@athena/forge";
import { useRouteMatch, Link, Redirect, Route } from "react-router-dom";
import { editUser } from "./api/userAPI";
import { getRelations } from "./api/relationshipAPI";

function Home(props) {
  const match = useRouteMatch();
  const { userId } = match.params;
  const [user, setUser] = useState(
    props.users.filter((_user) => _user.id === parseInt(userId))[0]
  );
  const [loggingOut, setLoggingOut] = useState(false);
  const [mentoringStatus, setMentoringStatus] = useState(
    user.menteeCapacity !== 0 || user.mentees.length !== 0
      ? "My Mentees"
      : "Become a Mentor"
  );
  const [mentees, setMentees] = useState([]);
  const [mentor, setMentor] = useState(null);

  useEffect(() => {
    getRelations().then((_relations) => {
      const newMentees = _relations.filter((relation) => {
        const inside = user.mentees.some((item) => item === relation.id);
        return inside;
      });
      setMentees(newMentees);
      if (user.mentor) {
        setMentor(
          _relations.filter((relation) => user.mentor === relation.id)[0]
        );
      } else {
        setMentor(null);
      }
    });
  }, []);

  function logout() {
    setLoggingOut(true);
  }

  function setSearchingForMentee() {
    const newUser = { ...user, menteeCapacity: 1 };
    editUser(newUser);
    props.updateUser([newUser]);
    setUser(newUser);
    setMentoringStatus("My Mentees");
  }

  function removeRelationship(mentee) {
    debugger;
    const mentorUser = props.users.filter(
      (_user) => _user.name === mentor.mentor
    )[0];
    mentorUser.mentees = mentorUser.mentees.filter((id) => id !== mentor.id);
    mentorUser.pastMentees.push(mentor.id);
    editUser(mentorUser).then(() => {
      props.updateUser([mentorUser, mentee]);
    });
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
        <Link
          to={{
            pathname: "/userPage/mentor",
            query: {
              user: user,
              mentor: mentor,
              updateRelation: {},
              updeteMentor: {},
              updateUser: props.updateUser,
              mentees: mentees,
              removeMentor: removeRelationship,
            },
          }}
        >
          <Button text={"My Mentor"} className="fe_u_margin--medium" />
        </Link>

        {mentoringStatus === "My Mentees" ? (
          <Link
            to={{
              pathname: "/userPage/mentee",
              query: {
                user: user,
                mentor: mentor,
                updateRelation: {},
                updeteMentor: {},
                updateUser: props.updateUser,
                mentees: mentees,
                removeMentor: removeRelationship,
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
