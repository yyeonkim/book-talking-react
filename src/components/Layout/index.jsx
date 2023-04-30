import Header from "./Header";

import "./style.css";

export default function Layout({ children }) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}
