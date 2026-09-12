import { useEffect, useRef, useState } from "react";

interface YoutubeEmbedProps {
  readonly embedId: string;
  readonly title: string;
}

/** No player or remote thumbnail request until the visitor chooses to play. */
export default function YoutubeEmbed({ embedId, title }: YoutubeEmbedProps) {
  const [activated, setActivated] = useState(false);
  const playerRef = useRef<HTMLIFrameElement>(null);
  const focusPlayer = useRef(false);

  useEffect(() => {
    if (activated && focusPlayer.current) playerRef.current?.focus();
  }, [activated]);

  return (
    <div className="video-responsive">
      <div className="video-frame">
        {activated ? (
          <iframe
            ref={playerRef}
            tabIndex={0}
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
            onClick={(event) => {
              focusPlayer.current = event.detail === 0;
              setActivated(true);
            }}
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
