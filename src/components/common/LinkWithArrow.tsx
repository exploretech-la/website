import { Link } from "react-router-dom";
import { MdKeyboardArrowRight } from "react-icons/md";

interface LinkWithArrowProps {
  readonly text: string;
  readonly to: string;
}

export default function LinkWithArrow({ text, to }: LinkWithArrowProps) {
  return (
    <div className="LinkWithArrow">
      <Link to={to}>
        <span className="link-text">{text}</span>
        <MdKeyboardArrowRight className="MdKeyboardArrowRight" />
      </Link>
    </div>
  );
}
