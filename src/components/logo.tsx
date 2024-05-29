import LogoDefault from "../assets/svg/logo.svg";
import LogoColored from "../assets/svg/logo-colored.svg";

import { APP_NAME } from "../utils/constants";

const Logo = ({ colored }: { colored?: boolean }) => (
  <div className="logo_container">
    <img
      className="icon"
      src={colored ? LogoColored : LogoDefault}
      alt={`${APP_NAME} logo`}
    />
  </div>
);

export default Logo;
