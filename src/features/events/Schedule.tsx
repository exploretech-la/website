import type { ScheduleEntry } from "../../content/events/types";

export function Timetable({
  items,
  caption,
}: {
  items: readonly ScheduleEntry[];
  caption: string;
}) {
  return (
    <table className="event-timetable">
      <caption className="visually-hidden">{caption}</caption>
      <thead>
        <tr>
          <th scope="col">Time</th>
          <th scope="col">Activity</th>
        </tr>
      </thead>
      <tbody>
        {items.map((entry) => (
          <tr key={entry.key}>
            <th scope="row">{entry.time}</th>
            <td>{entry.name}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default function Schedule({
  items,
}: {
  items: readonly ScheduleEntry[];
}) {
  return (
    <section
      id="schedule"
      className="event-section Schedule"
      aria-labelledby="schedule-heading"
    >
      <h2 id="schedule-heading">Schedule</h2>
      <Timetable items={items} caption="Archived event schedule" />
    </section>
  );
}
