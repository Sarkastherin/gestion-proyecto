import Header from "./Header";
function Container({ text, to, children }) {
  return (
    <div className="fixed w-full ">
      <Header text={text} to={to} />
      {children}
    </div>
  );
}
export default Container;
