import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

type Props = {
  component: React.FunctionComponent<any>;
};

export const ProtectedRoute: React.FunctionComponent<Props> = ({
  component: Component,
  ...rest
}) => {
  const { user } = useSelector((state: any) => state.authSlice);

  return (
    <Route
      {...rest}
      render={(props) =>
        user ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};
