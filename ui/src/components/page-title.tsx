import { Helmet } from "react-helmet";

import { APP_NAME } from "../utils/constants";

type Props = {
  title: string;
};

const PageTitle = ({ title }: Props) => (
  <Helmet>
    <title>
      {title} - {APP_NAME}
    </title>
  </Helmet>
);

export default PageTitle;
