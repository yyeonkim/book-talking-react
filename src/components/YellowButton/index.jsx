import "./style.css";

function YellowButton({ text, disabled, onClick }) {
  return (
    <button onClick={onClick} disabled={disabled} className="YellowButton">
      {text}
    </button>
  );
}

export default YellowButton;
