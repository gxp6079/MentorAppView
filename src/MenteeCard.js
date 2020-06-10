import React from "react";
import { Heading, Icon, Button } from "@athena/forge";
import moment from "moment";

function MenteeCard(props) {
  const now = moment();
  const endTime = moment(props.mentoringRelation.expirationDate);
  const diff = endTime.diff(now);
  const months = moment.duration(diff).asMonths();

  function updateTime() {
    debugger;
    props.updateTime(props.mentoringRelation.id);
  }

  return (
    <>
      <Heading
        text={props.mentoringRelation.mentee}
        variant="section"
        className="fe_u_font-weight--regular"
      />
      <div
        style={{
          flex: 1,
          flexDirection: "row",
        }}
      >
        <p
          className="fe_u_font-size--default fe_u_padding--right-small"
          style={{ display: "inline-block" }}
        >
          Matched {props.mentoringRelation.matchedDate}
        </p>
        <p
          className="fe_u_font-size--default fe_u_padding--left-small"
          style={{ display: "inline-block" }}
        >
          Expires {props.mentoringRelation.expirationDate}
        </p>
        {months <= 1 && !props.mentoringRelation.mentorUpdate && (
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
    </>
  );
}

export default MenteeCard;
