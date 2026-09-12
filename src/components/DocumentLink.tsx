import type { DocumentLink as Document } from "../content/types";

export default function DocumentLink({
  document,
  className = "text-link",
}: {
  document: Document;
  className?: string;
}) {
  const { file } = document;
  const size = file
    ? file.bytes >= 1_000_000
      ? `${(file.bytes / 1_000_000).toFixed(1)} MB`
      : `${(file.bytes / 1_000).toFixed(1)} kB`
    : null;

  return (
    <a
      href={document.src}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      <span>{document.name}</span>
      {file && (
        <span className="document-meta">
          {file.format}, {size}
        </span>
      )}
      <span className="document-meta">opens in a new tab</span>
    </a>
  );
}
