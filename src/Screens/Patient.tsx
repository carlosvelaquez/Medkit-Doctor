import React, {
  useState,
  useEffect,
  useCallback,
  useContext,
  useRef,
} from "react";

import Axios from "axios";
import { Row, Col, Breadcrumb } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { ObjectId } from "bson";
import { useTranslation } from "react-i18next";
import { gql } from "@apollo/client";

import { Icon } from "@iconify/react";
import calendarAccount from "@iconify-icons/mdi/calendar-account";
import humanMaleFemale from "@iconify-icons/mdi/human-male-female";
import accountClock from "@iconify-icons/mdi/account-clock";
import cardAccountDetails from "@iconify-icons/mdi/card-account-details";
import calendarClock from "@iconify-icons/mdi/calendar-clock";
import accountTie from "@iconify-icons/mdi/account-tie";
import ringIcon from "@iconify-icons/mdi/ring";

import { useDatabase } from "../realm";
import { LayoutContext, UserContext } from "../context";
import { useQueryResult } from "../Helpers/GraphQL";

import ErrorScreen from "./ErrorScreen";
import WarningScreen from "./WarningScreen";
import LoadingScreen from "./LoadingScreen";

import DivButton from "../Components/DivButton";
import JumboButton from "../Components/JumboButton";
import TabbedSection from "../Components/TabbedSection";
import DynamicContainer from "../Components/DynamicContainer";
import { Timeline, TimelineCard } from "../Components/Timeline";

import "./Styles/Patient.scss";

const GENDER = {
  0: "Male",
  1: "Female",
  3: "Other",
};

const MARITAL_STATUS = {
  0: "Single",
  1: "Married",
  3: "Divorced",
  4: "Widowed",
  5: "Free Union",
  6: "Other",
};

const Patient = () => {
  const { t } = useTranslation();
  const db = useDatabase();

  const { setScreenName, setPadding } = useContext(LayoutContext);

  const [tagAdderVisible, setTagAdderVisible] = useState(false);
  const tagAdderInput = useRef();

  useEffect(() => {
    setPadding(true);
  }, []);

  const { patientId } = useParams();
  const { data, loading, error } = useQueryResult(gql`
  {
    patient(query: {_id: "${patientId}"}) {
      _id
      firstName
      middleName
      firstSurname
      secondSurname
      gender
      birthDate
      occupation
      maritalStatus
    }
  }`);

  console.log(data, error);

  if (error) return <ErrorScreen error={error} />;
  if (loading) return <LoadingScreen />;
  if (!data) return <ErrorScreen error={{ message: "No data was sent" }} />;

  // const { patient, consultations } = data;
  const { patient } = data;
  if (!patient) return <ErrorScreen error={{ message: "Patient not found" }} />;

  const eventHistory = {};

  // consultations.forEach((con) => {
  //   const datetime = new Date(con.datetime);

  //   // Separar la fecha de la hora para ponerlo como llave y sortear en la timeline
  //   const dateKey = con.datetime.split("T")[0];

  //   if (!eventHistory[dateKey]) eventHistory[dateKey] = [];

  //   eventHistory[dateKey].push({ ...con, datetime });
  // });

  console.log(eventHistory);

  const {
    firstName,
    middleName,
    firstSurname,
    secondSurname,
    gender,
    occupation,
    maritalStatus,
    background,
  } = patient;

  const birthDate = new Date(patient.birthDate);

  const age = Math.abs(
    new Date(new Date() - birthDate).getUTCFullYear() - 1970
  );

  return (
    <>
      <div className={`tag-adder ${tagAdderVisible ? "visible" : ""}`}>
        <input
          placeholder={t("Start writing to search tags")}
          onBlur={() => setTagAdderVisible(false)}
          ref={tagAdderInput}
        ></input>
      </div>

      <div className="patient-screen">
        {/* <Row>
        <Col>
          <Breadcrumb>
            <Breadcrumb.Item href="/patients">{t("Patients")}</Breadcrumb.Item>
            <Breadcrumb.Item
              active
            >{`${firstName} ${middleName} ${firstSurname} ${secondSurname}`}</Breadcrumb.Item>
          </Breadcrumb>
        </Col>
      </Row> */}
        <Row>
          <Col>
            {/* <div className="muted">{t("Patient Profile")}</div> */}
            <h1>{`${firstName} ${middleName} ${firstSurname} ${secondSurname}`}</h1>
          </Col>
        </Row>

        <Row>
          <Col>
            <TabbedSection
              title={t("Personal Data")}
              icon={cardAccountDetails}
              color="green"
            >
              <Row>
                <Col xs={12} lg={3}>
                  <div className="icon-attribute">
                    <div className="title">
                      <Icon icon={calendarAccount} />
                      {t("Date of Birth")}
                    </div>
                    <div className="value">{`${birthDate.toLocaleDateString(
                      "es",
                      { year: "numeric", month: "long", day: "numeric" }
                    )} (${age} ${t("years old")})`}</div>
                  </div>
                </Col>
                <Col xs={12} sm={6} lg={3}>
                  <div className="icon-attribute">
                    <div className="title">
                      <Icon icon={humanMaleFemale} />
                      {t("Gender")}
                    </div>
                    <div className="value">{t(GENDER[gender])}</div>
                  </div>
                </Col>
                <Col xs={12} sm={6} lg={3}>
                  <div className="icon-attribute">
                    <div className="title">
                      <Icon icon={accountTie} />
                      {t("Occupation")}
                    </div>
                    <div className="value">{occupation}</div>
                  </div>
                </Col>
                <Col xs={12} sm={6} lg={3}>
                  <div className="icon-attribute">
                    <div className="title">
                      <Icon icon={ringIcon} />
                      {t("Marital Status")}
                    </div>
                    <div className="value">
                      {t(MARITAL_STATUS[maritalStatus])}
                    </div>
                  </div>
                </Col>
              </Row>
            </TabbedSection>
            <TabbedSection
              title={t("Visit History")}
              icon={calendarClock}
              color="purple"
            >
              <Timeline events={eventHistory} />
            </TabbedSection>
            <TabbedSection title={t("Medical Background")} icon={accountClock}>
              {background ? (
                <div>background</div>
              ) : (
                <DivButton
                  action={() => {
                    if (tagAdderInput.current) {
                      setTagAdderVisible(true);
                      tagAdderInput.current.focus();
                    }
                  }}
                >
                  {t("Tap here to add background")}
                </DivButton>
                // <></>
              )}
            </TabbedSection>
          </Col>
        </Row>
        {/* <Row>
        <Col>
          <div className="button-row">
            <JumboButton
              text={t("Add Medical Background")}
              icon={accountClock}
              hidden={patient.background}
              action={() =>
                setPatient((p) => {
                  return {
                    ...p,
                    background: {},
                  };
                })
              }
            />
            <JumboButton
              text={t("Add Consultation")}
              icon={stethoscopeIcon}
              hidden={patient.consultation}
              variant="purple"
              action={() =>
                setPatient((p) => {
                  return {
                    ...p,
                    consultation: {},
                  };
                })
              }
            />
            <JumboButton
              text={t("Add Procedure")}
              icon={clipboardPulse}
              hidden={patient.procedure}
              variant="green"
              action={() =>
                setPatient((p) => {
                  return {
                    ...p,
                    procedure: {},
                  };
                })
              }
            />
          </div>
        </Col>
      </Row> */}
        {/* <div className="section">
        <h2>Antecedentes</h2>
      </div>
      <div className="section">
        <h2>Historial de Visitas</h2>
      </div> */}
      </div>
    </>
  );
};

export default Patient;
