import React, { useState, useEffect } from "react";
import { Form, FormField, Heading } from "@athena/forge";
import { Redirect } from "react-router-dom";
import { getUsers } from "./api/userAPI";

function Login(props) {
  const [username, setUsername] = useState("");
  const [validUser, setValid] = useState(false);
  const [userId, setUserId] = useState(null);

  function handleUsernameChange(event) {
    setUsername(event.target.value);
  }

  function handleSubmit() {
    const user = props.users.filter((user) => user.name === username);
    if (user.length > 0) {
      setValid(true);
      setUserId(user[0].id);
      const check = userId;
    }
  }

  return (
    <>
      {validUser && <Redirect to={"/home/" + userId} />}
      <Heading text="Login" className="fe_u_padding--large" />
      <Form onSubmit={handleSubmit} className="fe_u_padding--left-large">
        <FormField
          id="username"
          labelText="Username"
          onChange={handleUsernameChange}
        />
      </Form>
    </>
  );
}

export default Login;
