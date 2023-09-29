import { useRouteError } from "react-router-dom";

function Error() {
  const err = useRouteError();

  return (
    <div>
      <h1>Something went wrong</h1>
      <p>{`${err.error.message}`}</p>
    </div>
  );
}

export default Error;
