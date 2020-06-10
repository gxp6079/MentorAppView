import React, { useState } from "react";
import { Heading } from "@athena/forge";
import MentorCard from "./MentorCard";

function Mentor(props) {
  const [user, setUser] = useState(props.location.query.user);

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
      {user.mentor !== null && <MentorCard mentorinRelation={user.mentor} />}
    </>
  );
}

export default Mentor;
