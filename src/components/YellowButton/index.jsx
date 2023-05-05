import "./style.css";

export default function YellowButton({ text, disabled, onClick }) {
  return (
    <button onClick={onClick} disabled={disabled} className="yellow-button">
      {text}
    </button>
  );
}
