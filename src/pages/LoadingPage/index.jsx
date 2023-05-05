import Loader from "../../components/Loader";
import "./style.css";

export default function LoadingPage() {
  return (
    <>
      <div className="main center">
        <img src="logo_no_text.png" alt="토킹이 로고" />
        <p>
          즐거운 대화였어!
          <br />
          이야기를 만들고 있으니 잠시만 기다려줘.
        </p>

        <Loader />
      </div>
    </>
  );
}
