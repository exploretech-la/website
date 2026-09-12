import { Link } from "react-router-dom";

export default function PageNotFound() {
  return (
    <section className="PageNotFound page-container page-header">
      <h1>This page could not be found</h1>
      <p>
        The address may have changed. You can explore our programs or find the
        right contact below.
      </p>
      <div className="action-row">
        <Link className="action action-primary" to="/events">
          Explore programs
        </Link>
        <Link className="action action-outline" to="/get-involved">
          Get involved
        </Link>
        <Link className="text-link" to="/">
          Return home
        </Link>
      </div>
    </section>
  );
}
