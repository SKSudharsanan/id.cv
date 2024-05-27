import LogoDefault from "../assets/svg/logo.svg";

import { APP_NAME } from "../utils/constants";

const Logo = () => (
  <div className="logo_container">
    <img className="icon" src={LogoDefault} alt={`${APP_NAME} logo`} />
  </div>
);

export default Logo;
