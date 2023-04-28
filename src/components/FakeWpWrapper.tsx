const FakeWPwrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <div
        style={{
          height: "32px",
          width: "100%",
          background: "#1d2327",
          position: "fixed",
        }}
      />
      <div
        style={{
          height: "100vh",
          width: "160px",
          background: "#1d2327",
          float: "left",
          position: "fixed",
        }}
      />
      <div
        style={{
          width: "100%",
          paddingTop: "32px",
          paddingLeft: "calc( 160px + 20px )",
          float: "left",
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default FakeWPwrapper;
