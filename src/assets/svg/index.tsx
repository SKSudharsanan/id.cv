import { Arrow } from "./arrow";
import { Cart } from "./cart";
import { Certification } from "./certification";
import { Close } from "./close";
import { Data } from "./data";
import { Document } from "./document";
import { Edit } from "./edit";
import { Email } from "./email";
import { ErrorCircle } from "./error-circle";
import { Facebook } from "./facebook";
import { Help } from "./help";
import { History } from "./history";
import { Identification } from "./identification";
import { Instagram } from "./instagram";
import { LinkedIn } from "./linkedin";
import { Name } from "./name";
import { Notification } from "./notification";
import { Occupation } from "./occupation";
import { Request } from "./request";
import { Search } from "./search";
import { Settings } from "./settings";
import { Twitter } from "./twitter";
import { Uploaded } from "./uploaded";
import { User } from "./user";
import { Verified } from "./verified";

const Icon = ({ name }: { name: string }) => {
  switch (name) {
    case "arrow":
      return <Arrow />;
    case "cart":
      return <Cart />;
    case "certification":
      return <Certification />;
    case "close":
      return <Close />;
    case "data":
      return <Data />;
    case "document":
      return <Document />;
    case "edit":
      return <Edit />;
    case "email":
      return <Email />;
    case "errorCircle":
      return <ErrorCircle />;
    case "facebook":
      return <Facebook />;
    case "help":
      return <Help />;
    case "history":
      return <History />;
    case "identification":
      return <Identification />;
    case "instagram":
      return <Instagram />;
    case "linkedin":
      return <LinkedIn />;
    case "name":
      return <Name />;
    case "notification":
      return <Notification />;
    case "occupation":
      return <Occupation />;
    case "request":
      return <Request />;
    case "search":
      return <Search />;
    case "settings":
      return <Settings />;
    case "twitter":
      return <Twitter />;
    case "uploaded":
      return <Uploaded />;
    case "user":
      return <User />;
    case "verified":
      return <Verified />;
    default:
      return <Close />;
  }
};

export default Icon;
