import React, { useEffect } from "react";

import LinkWithArrow from "components/common/LinkWithArrow";

function PageNotFound() {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = "Page Not Found • exploretech.la";
    return () => {
      document.title = previousTitle;
    };
  }, []);

  return (
    <section className="PageNotFound">
      <h3>Sorry, this page isn't available.</h3>
      <p>
        The link you followed may be broken, or the page may have been removed.
      </p>
      <LinkWithArrow text="Go back to exploretech.la" to="/" />
    </section>
  );
}

PageNotFound.displayName = "PageNotFound";
export default PageNotFound;
