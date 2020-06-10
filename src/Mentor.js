import React, { useState } from "react";
import { Heading } from "@athena/forge";
import MentorCard from "./MentorCard";
import moment from "moment";
import { editRelations } from "./api/relationshipAPI";

function Mentor(props) {
  const [mentor, setMentor] = useState(props.location.query.mentor);
  debugger;

  function updateTime() {
    const newMentor = { ...mentor };
    if (mentor.mentorUpdate) {
      const newExp = moment(mentor.expirationDate)
        .add(6, "months")
        .format("MM/DD/YYYY");
      newMentor.expirationDate = newExp;
      newMentor.mentorUpdate = false;
    } else {
      newMentor.menteeUpdate = true;
    }
    setMentor(newMentor);
    editRelations(newMentor);
    props.location.query.updeteMentor(newMentor);
  }

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
      {mentor !== null && (
        <MentorCard mentorinRelation={mentor} updateTime={updateTime} />
      )}
    </>
  );
}

export default Mentor;
