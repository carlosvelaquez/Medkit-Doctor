import React, { useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { gql } from "@apollo/client";

import * as Types from "../Helpers/Types";
import { useQueryResult } from "../Helpers/GraphQL";
import { useWindowDimensions } from "../Helpers/Hooks";
import { LayoutContext, UserContext } from "../context";

import DivButton from "../Components/DivButton";

import ErrorScreen from "./ErrorScreen";
import LoadingScreen from "./LoadingScreen";

import "./Styles/Patients.scss"

type PatientRowProps = {
  patient: Types.Patient
};

const PatientRow = ({ patient }: PatientRowProps) => {
  const {
    _id,
    firstName,
    middleName,
    firstSurname,
    secondSurname,
    profilePicture = "https://static.vecteezy.com/system/resources/previews/002/275/847/original/male-avatar-profile-icon-of-smiling-caucasian-man-vector.jpg",
  } = patient;

  const history = useHistory();

  return (
    <DivButton
      className="patient-row"
      action={() => history.push(`/patients/${_id}`)}
    >
      <div className="profile-picture">
        <img src={profilePicture} alt={firstName} />
      </div>
      <div className="name">{`${firstName} ${middleName} ${firstSurname} ${secondSurname}`}</div>
    </DivButton>
  );
};

const Patients = () => {
  const { setScreenName, setPadding } = useContext(LayoutContext);
  const { width } = useWindowDimensions();

  const { data, loading, error } = useQueryResult(gql`
    {
      patients {
        _id
        firstName
        middleName
        firstSurname
        secondSurname
        birthDate
      }
    }
  `);

  useEffect(() => {
    setScreenName("Patients");
  }, []);

  useEffect(() => {
    if (width < 768) setPadding(false);
    else setPadding(true);
  }, [width]);

  if (error) return <ErrorScreen error={error} />;
  if (loading) return <LoadingScreen />;
  if (!data) return <ErrorScreen error={{name: "NoDataSent", message: "No data was sent" }} />;

  const { patients } = data;

  return (
    <div className="patients-screen">
      <div className="content-container">
        {patients.map((p : Types.Patient) => (
          <PatientRow patient={p} />
        ))}
      </div>
    </div>
  );
};

export default Patients;
