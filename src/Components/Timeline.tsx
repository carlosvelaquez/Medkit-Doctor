import React, { useContext, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

import { Icon } from "@iconify/react";
import stethoscopeIcon from "@iconify-icons/mdi/stethoscope";
import clipboardPulseOutline from "@iconify-icons/mdi/clipboard-pulse-outline";
import imageMultipleOutline from "@iconify-icons/mdi/image-multiple-outline";
import historyIcon from "@iconify-icons/mdi/history";

import { useDatabase } from "../realm";
import { UserContext } from "../context";
import Gallery from "./Gallery";

import "./Styles/Timeline.scss";
import * as Interfaces from "../Helpers/Interfaces";


type EventProps = {
  event: Interfaces.Consultation // TODO: More event types here
}

const Event = ({ event } : EventProps) => {
  const { t } = useTranslation();
  const { __typename } = event;
  const eventDatetime = new Date(event.datetime);

  const getEventIcon = () => {
    switch (__typename) {
      case "Consultation":
        return stethoscopeIcon;

      case "Procedure":
        return clipboardPulseOutline;

      case "Images":
        return imageMultipleOutline;

      default:
        return historyIcon;
    }
  };

  const buildBody = () => {
    switch (__typename) {
      case "Consultation":
        const { chiefConcern } = event;

        return (
          <>
            <b>{t("Chief Concern")}</b>
            {chiefConcern}
          </>
        );

      case "Procedure":
        return clipboardPulseOutline;

      case "Images":
        return imageMultipleOutline;

      default:
        return historyIcon;
    }
  };

  return (
    <div className="event">
      <div className="type-row">
        <div className="type">
          <Icon icon={getEventIcon()} />
          {t(__typename)}
        </div>
        <div className="spacer" />
        <div className="time">
          {eventDatetime.toLocaleString("es", {
            timeStyle: "short",
            hour12: true,
          })}
        </div>
      </div>
      <div className="body">{buildBody()}</div>
    </div>
  );
};

type VisitProps = {
  visit: Interfaces.Visit;
  color: string
}

export const Visit = ({
  visit,
  color
} : VisitProps) => {
  const { t } = useTranslation();
  const {startTime, events} = visit;

  const date = startTime; // TODO: Date only

  console.log(visit);

  return (
    <div className="visit">
      <div className="header">
        <div className="icon-bubble-wrapper">
          <div className="icon-bubble" style={{ backgroundColor: color }} />
          {/* <Icon icon={stethoscopeIcon} />
          </div> */}
        </div>
        <div className="date">
          {date.toLocaleString("es", { dateStyle: "medium" })}
        </div>
      </div>
      {events.map((e) => {
        return <Event event={e} />;
      })}
      {/* <div className="visit">
        <div className="type-row">
          <div className="type">
            <Icon icon={clipboardPulseOutline} />
            {t("Procedure")}
          </div>
          <div className="spacer" />
          <div className="time">
            {date.toLocaleString("es", {
              timeStyle: "short",
              hour12: true,
            })}
          </div>
        </div>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam.
      </div>
      <div className="visit">
        <div className="type-row">
          <div className="type">
            <Icon icon={imageMultipleOutline} />
            {t("Images")}
          </div>
          <div className="spacer" />
          <div className="time">2 elementos</div>
        </div>
        <Gallery
          images={[
            {
              uri: "https://storage.googleapis.com/gen-atmedia/3/2018/06/0ce6fd25c8ae28f81c720e1e45b69507fc6748f4.jpeg",
            },
            {
              uri: "https://i.pinimg.com/736x/f3/00/79/f30079ea1351280ae0176b9258987b21.jpg",
            },
          ]}
        />
      </div> */}
    </div>
  );
};

type TimelineProps = {
  visits: Array<Interfaces.Visit>
}

export const Timeline = ({ visits = [] } : TimelineProps) => {
  const sortedVisits = visits.sort(); // TODO: Sort by start time
  console.log(sortedVisits);

  // Color interpolation
  const startColor = [128, 1, 252];
  const endColor = [197, 1, 226];

  const steps = startColor.map(
    (c, i) => (endColor[i] - c) / (sortedVisits.length - 1)
  );

  return (
    <div className="timeline">
      {sortedVisits.map((v, index) => {
        const color = `rgb(${steps.map((s, i) => startColor[i] + s * index).join()})`;

        return (
          <Visit
            visit={v}
            color={color}
          />
        );
      })}
    </div>
  );
};
