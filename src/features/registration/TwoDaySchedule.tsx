import type { ScheduleDay } from "../../content/events/types";

function Column({ day, side }: { day: ScheduleDay; side: "left" | "right" }) {
  return (
    <div className={`${side}-column text`}>
      <div className="section-title">
        <h3 className="title">{day.title}</h3>
        <div className="pill-divider" />
      </div>
      <div className="schedule-text">
        <p>
          {day.items.map((entry) => (
            <h4 key={entry.key}>
              <b>{entry.time}:</b> {entry.name}
            </h4>
          ))}
        </p>
      </div>
    </div>
  );
}

/** The 2021 event ran over two days, so its schedule renders as two columns. */
export default function TwoDaySchedule({
  days,
}: {
  days: readonly [ScheduleDay, ScheduleDay];
}) {
  return (
    <section className="Section Schedule">
      <div className="schedule-content">
        <div className="schedule-content schedule-title">
          <h2 className="title">Schedule</h2>
          <div className="pill-divider" />
        </div>
        <div className="schedule-content schedule-column-container">
          <Column day={days[0]} side="left" />
          <Column day={days[1]} side="right" />
        </div>
      </div>
    </section>
  );
}
