import { useState } from "react";

interface YoutubeEmbedProps {
  readonly embedId: string;
  readonly title?: string;
}

/** No player or remote thumbnail request until the visitor chooses to play. */
export default function YoutubeEmbed({
  embedId,
  title = "Embedded youtube",
}: YoutubeEmbedProps) {
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
}
