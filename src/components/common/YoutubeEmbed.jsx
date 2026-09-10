import React, { useState } from "react";
import PropTypes from "prop-types";

// No player or remote thumbnail request until the visitor chooses to play.
const YoutubeEmbed = ({ embedId, title }) => {
  const [activated, setActivated] = useState(false);

  return (
    <div className="video-responsive">
      <div className="video-frame">
        {activated ? (
          <iframe
            src={`https://www.youtube.com/embed/${embedId}?autoplay=1`}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title={title}
          />
        ) : (
          <button
            type="button"
            className="video-facade"
            onClick={() => setActivated(true)}
            aria-label={`Play video: ${title}`}
            title={title}
          >
            <span className="video-facade-play" aria-hidden="true" />
          </button>
        )}
      </div>
    </div>
  );
};

YoutubeEmbed.propTypes = {
  embedId: PropTypes.string.isRequired,
  title: PropTypes.string,
};

YoutubeEmbed.defaultProps = {
  title: "Embedded youtube",
};

export default YoutubeEmbed;
