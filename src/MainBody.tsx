import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";
import { startOfYear, endOfYear, eachDayOfInterval, format } from "date-fns";
import { useState } from "react";
import ReactTooltip from "react-tooltip";
import "./MainBody.css";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

interface DatesWithColour {
  date: Date;
  colour: "red" | "filled";
}
export default function MainBody(): JSX.Element {
  const startDate = startOfYear(new Date());
  const endDate = endOfYear(new Date());
  const dates = eachDayOfInterval({ start: startDate, end: endDate });
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const datesWithColour: DatesWithColour[] = dates.map((date) => {
    return {
      date: date,
      colour: "red",
    };
  });
  const [datesToUse, setDatesToUse] =
    useState<DatesWithColour[]>(datesWithColour);
  const handleLogButton = () => {
    const newDateswithColours: DatesWithColour[] = datesToUse.map((object) => {
      if (object.date.getTime() === selectedDate.getTime()) {
        return { ...object, colour: "filled" };
      }
      return object;
    });
    setDatesToUse(newDateswithColours);
  };

  return (
    <>
      <>
        <div className="calendarMap">
          <CalendarHeatmap
            showWeekdayLabels={true}
            startDate={startDate}
            endDate={endDate}
            values={datesToUse}
            classForValue={(value) => {
              if (!value) {
                return "color-empty";
              }
              if (value.colour === "red") {
                return "colour-red";
              }
              if (value.colour === "filled") {
                return "colour-filled";
              }
              return "color-white";
            }}
            tooltipDataAttrs={(value: any) => {
              return {
                "data-tip": `Value: ${value?.date} & colour is ${value.colour}`,
              };
            }}
          />
        </div>
        <Calendar value={selectedDate} onChange={setSelectedDate} />
        <p>
          <b>Date Selected is:</b>{" "}
        </p>
        {format(selectedDate, "MMM dd, yyyy")}
      </>
      <hr />
      <button className="log-button" onClick={handleLogButton}>
        Log Date
      </button>
      <ReactTooltip />
    </>
  );
}
