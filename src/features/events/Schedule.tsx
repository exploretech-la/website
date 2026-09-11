import type { ScheduleEntry } from "../../content/events/types";

export default function Schedule({
  items,
}: {
  items: readonly ScheduleEntry[];
}) {
  return (
    <section className="Section Schedule">
      <div className="schedule-content">
        <div className="schedule-content schedule-title">
          <h2 className="title">Schedule</h2>
          <div className="pill-divider" />
        </div>
        <div className="schedule-text">
          <p>
            {items.map((entry) => (
              <h4 key={entry.key}>
                <b>{entry.time} </b>
                {entry.name}
              </h4>
            ))}
          </p>
        </div>
      </div>
    </section>
  );
}
