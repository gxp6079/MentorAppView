import React, { useState } from "react";
import { Heading, Button } from "@athena/forge";
import { useRouteMatch, Link, Redirect, Route } from "react-router-dom";

function Home(props) {
  const match = useRouteMatch();
  const { userId } = match.params;
  const [user, setUser] = useState(
    props.users.filter((_user) => _user.id === parseInt(userId))[0]
  );
  const [loggingOut, setLoggingOut] = useState(false);

  function logout() {
    setLoggingOut(true);
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
              updateUser: props.updateUser,
            },
          }}
        >
          <Button text="Get a Mentor" className="fe_u_margin--medium" />
        </Link>
        <Link
          to={{
            pathname: "/userPage/mentee",
            query: {
              user: user,
              updateUser: props.updateUser,
            },
          }}
        >
          <Button text="Become a Mentor" className="fe_u_margin--medium" />
        </Link>
      </div>
    </>
  );
}

export default Home;
