import React, { useState } from "react";
import moment from "moment";
import { Heading, Button } from "@athena/forge";

function MentorCard(props) {
  const now = moment();
  const startTime = moment(props.mentorinRelation.matchedDate);
  const endTime = moment(props.mentorinRelation.expirationDate);
  const endingIn = endTime.diff(now);
  const started = now.diff(startTime);
  const months = moment.duration(endingIn).asMonths();
  const weeks = moment.duration(started).asWeeks();
  debugger;

  function updateTime() {
    //props.updateTime();
  }

  function releaseMentor() {
    //release mentor
  }

  return (
    <>
      <Heading
        text={props.mentorinRelation.mentor}
        variant="section"
        className="fe_u_font-weight--regular fe_u_padding--left-xlarge"
      />
      <div
        style={{
          flex: 1,
          flexDirection: "row",
        }}
        className="fe_u_padding--left-xlarge"
      >
        <p
          className="fe_u_font-size--default fe_u_padding--right-small"
          style={{ display: "inline-block" }}
        >
          Matched {props.mentorinRelation.matchedDate}
        </p>
        <p
          className="fe_u_font-size--default fe_u_padding--left-small"
          style={{ display: "inline-block" }}
        >
          Expires {props.mentorinRelation.expirationDate}
        </p>
        {months <= 1 && (
          <Button
            className="fe_u_margin--left-small"
            variant="tertiary"
            icon="Time"
            text="Renew for another 6 months"
            onClick={updateTime}
            style={{
              display: "inline-block",
            }}
          />
        )}
      </div>
      {weeks >= 2 && (
        <div
          className="fe_u_padding--left-xlarge"
          style={{
            flex: 1,
            flexDirection: "row",
          }}
        >
          <Button
            text="Release"
            style={{
              display: "inline-block",
            }}
            onClick={releaseMentor}
            className="fe_u_margin--right-small"
          />
          <Button
            text="Release and Match"
            style={{
              display: "inline-block",
            }}
            onClick={() => {
              releaseMentor();
              props.turnSearchinOn();
            }}
            className="fe_u_margin--right-small"
          />
        </div>
      )}
    </>
  );
}

export default MentorCard;
