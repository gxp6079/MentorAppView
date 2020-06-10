import React from "react";
import UserPages from "./UserPages";
import { Heading } from "@athena/forge";

function Mentor(props) {
  return (
    <>
      <Heading
        text="My Mentor"
        variant="section"
        className="fe_u_padding--left-xlarge"
        style={{
          fontWeight: "normal",
        }}
      />
    </>
  );
}

export default Mentor;
