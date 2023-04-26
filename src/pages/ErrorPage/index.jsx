import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.log(error);

  return (
    <div id="error-page">
      <h1>이런!</h1>
      <p>에러가 발생했어요. 다시 시도해주세요.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}
