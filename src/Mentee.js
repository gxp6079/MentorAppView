import React, { useState, useEffect } from "react";
import { Heading, Select, Button, Banner, BannerItem } from "@athena/forge";
import { editUser } from "./api/userAPI";
import MenteeCard from "./MenteeCard";
import moment from "moment";

function Mentee(props) {
  const [user, setUser] = useState(props.location.query.user);
  const [capacity, setCapacity] = useState(user.menteeCapacity);
  const [availability, setAvailability] = useState(
    user.menteeCapacity - user.mentees.length
  );
  const [showBanner, setShowBanner] = useState(false);

  function updateCapacity() {
    const newUser = { ...user, menteeCapacity: capacity };
    editUser(newUser).then(() => {
      setUser(newUser);
      props.location.query.updateUser(newUser);
      setAvailability(capacity - newUser.mentees.length);
      setShowBanner(true);
    });
  }

  function updateTime(menteeName) {
    const newMentees = user.mentees.map((_mentee) => {
      if (_mentee.name === menteeName) {
        const newExp = moment(_mentee.expirationDate)
          .add(6, "months")
          .format("MM/DD/YYYY");
        return { ..._mentee, expirationDate: newExp };
      }
      return _mentee;
    });
    const newUser = { ...user, mentees: newMentees };
    setUser(newUser);
    editUser(newUser);
    props.location.query.updateUser(newUser);
  }

  return (
    <>
      {showBanner && (
        <Banner
          className="fe_u_margin--left-xlarge  fe_u_margin--right-xlarge fe_u_margin--bottom-xlarge"
          alertType="success"
          onHide={() => {
            setShowBanner(false);
          }}
        >
          <BannerItem headerText="Mentee Capacity Updated">
            When a new mentee match is ready you will be notified by email and
            will be able to see their name below.
          </BannerItem>
        </Banner>
      )}
      <div className="fe_u_padding--left-xlarge">
        <div className="fe_u_padding--bottom-large">
          {availability > 0 && user.mentees.length > 0 && (
            <p>
              When a new mentee match is ready you will be notified by email and
              will be able to see their name below.
            </p>
          )}
          {user.mentees.length > 0 && (
            <p>Your mentee capacity is set to {capacity} mentees.</p>
          )}
        </div>
        <ol>
          {user.mentees.map((_mentee) => {
            return (
              <li key={_mentee.name} className="fe_u_font-size--large">
                <MenteeCard mentee={_mentee} updateTime={updateTime} />
              </li>
            );
          })}
        </ol>
      </div>

      {user.mentees.length > 0 && <hr className="fe_u_margin--xlarge" />}

      <div className="fe_u_padding--left-xlarge fe_u_margin--top-small">
        <Heading
          text="Mentee Capacity"
          variant="section"
          className="fe_u_padding--bottom-small"
          headingDescription="Update your mentee capacity to indicate the number of mentees you would like to be matched with."
          style={{
            fontWeight: "normal",
          }}
        />

        <Select
          hasNullDefault={false}
          defaultValue={capacity.toString()}
          onChange={(e) => setCapacity(parseInt(e.target.value))}
          options={["1", "2", "3", "4", "5"]}
          className="fe_u_margin--top-large"
        />

        <Button
          text="Update"
          onClick={updateCapacity}
          disabled={capacity === user.menteeCapacity}
          className="fe_u_margin--large"
        />
      </div>
    </>
  );
}

export default Mentee;
