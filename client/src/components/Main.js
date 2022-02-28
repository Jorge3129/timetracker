const Main = ({ title, children }) => {
  return (
    <main className="page-container">
      <header className="page-header">
        <h1 className="page-header-title">{title}</h1>
      </header>
      <div className="content">{children}</div>
    </main>
  );
};

export default Main;
