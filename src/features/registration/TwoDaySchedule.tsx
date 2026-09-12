import type { ScheduleDay } from "../../content/events/types";
import { Timetable } from "../events/Schedule";

export default function TwoDaySchedule({
  days,
}: {
  days: readonly [ScheduleDay, ScheduleDay];
}) {
  return (
    <section
      id="schedule"
      className="event-section Schedule"
      aria-labelledby="schedule-heading"
    >
      <h2 id="schedule-heading">Schedule</h2>
      <div className="event-logistics">
        {days.map((day) => (
          <div key={day.title}>
            <h3>{day.title}</h3>
            <Timetable items={day.items} caption={day.title} />
          </div>
        ))}
      </div>
    </section>
  );
}
