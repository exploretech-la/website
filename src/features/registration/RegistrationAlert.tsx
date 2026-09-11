import { Link } from "react-router-dom";

import type { RegistrationContent } from "../../content/events/2021";
import GA from "../../util/GoogleAnalytics";

export default function RegistrationAlert({
  alert,
}: {
  alert: RegistrationContent["alert"];
}) {
  return (
    <div className="RegistrationAlert">
      <h3>
        <b>{alert.heading}</b>
      </h3>
      <div className="notes">
        <h5>{alert.note}</h5>
      </div>
      <div className="buttons">
        <div className="button">
          <Link
            className="action action-inverse action-large"
            to={alert.to}
            onClick={() =>
              GA.trackEvent({
                category: "RegistrationAlert",
                action: "Click",
                label: alert.trackingLabel,
              })
            }
          >
            {alert.linkLabel}
          </Link>
        </div>
      </div>
    </div>
  );
}
