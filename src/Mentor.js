import React, { useState } from "react";
import { Heading, Button, Banner, BannerItem } from "@athena/forge";
import MentorCard from "./MentorCard";
import moment from "moment";
import { editRelations, getRelation } from "./api/relationshipAPI";
import { editUser } from "./api/userAPI";

function Mentor(props) {
  const [user, setUser] = useState(props.location.query.user);
  const [mentor, setMentor] = useState(props.location.query.mentor);
  debugger;

  function getUpdatedRealtion() {
    getRelation(mentor).then((updatedMentor) => {
      return updateTime(updatedMentor, true);
    });
  }

  function setSearchingForMentor() {
    const newUser = { ...user, searching: true };
    editUser(newUser);
    props.location.query.updateUser(newUser);
    setUser(newUser);
  }

  function updateTime(updatedMentor, renew) {
    const newMentor = { ...updatedMentor };
    if (renew && mentor.mentorUpdate) {
      const newExp = moment(mentor.expirationDate)
        .add(6, "months")
        .format("MM/DD/YYYY");
      newMentor.expirationDate = newExp;
      newMentor.mentorUpdate = false;
      setMentor(newMentor);
    } else if (renew) {
      newMentor.menteeUpdate = true;
      setMentor(newMentor);
    } else {
      const newExp = moment().format("MM/DD/YYYY");
      newMentor.expirationDate = newExp;
    }
    editRelations(newMentor);
    props.location.query.updeteMentor(newMentor);
  }

  function releaseMentor(turnOnSearch) {
    const newUser = { ...user, mentor: null };
    debugger;
    if (turnOnSearch) {
      newUser.searching = true;
    }
    editUser(newUser).then(() => {
      setUser(newUser);
      setMentor(null);
      updateTime(mentor, false);
      props.location.query.removeMentor(newUser);
    });
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
        <MentorCard
          mentorinRelation={mentor}
          update={getUpdatedRealtion}
          releaseMentor={releaseMentor}
        />
      )}

      {mentor === null && !user.searching && (
        <Button
          text="Get a Mentor"
          variant="secondary"
          icon="Add"
          className="fe_u_margin--left-xlarge"
          onClick={setSearchingForMentor}
        />
      )}

      {mentor === null && user.searching && (
        <Banner
          className="fe_u_margin--left-xlarge  fe_u_margin--right-xlarge fe_u_margin--bottom-xlarge"
          alertType="info"
        >
          <BannerItem headerText="Mentor Requested">
            When a new mentor match is ready you will be notified by email and
            will be able to see the mentor's information below.
          </BannerItem>
        </Banner>
      )}
    </>
  );
}

export default Mentor;
