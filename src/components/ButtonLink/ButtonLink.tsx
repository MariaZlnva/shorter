import { Link } from "react-router-dom";
import "./ButtonLink.scss";

interface IBtnLink {
  textBtn: string;
  textLinkBtn: string;
  path: string;
}
const ButtonLink: React.FC<IBtnLink> = ({ textBtn, textLinkBtn, path }) => {
  return (
    <div className="btn-link__wrap">
      <p className="btn-link__text">{textBtn}</p>
      <Link to={path} className="btn-link__link">
        {textLinkBtn}
      </Link>
    </div>
  );
};

export default ButtonLink;
