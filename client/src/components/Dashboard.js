import React from "react";

const Dashboard = () => {
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    fetch("/api/post")
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, []);

  return (
    <div>
      <div>--</div>
      <div>DASHBOARD PAGE AT ROUTE "/react"</div>
      <div>--</div>
      <div>{!data ? "Loading..." : data}</div>
      <div>--</div>
    </div>
  );
};

export default Dashboard;
