import { useEffect, useState } from "react";

interface Installation {
  name: string;
  status: string;
  scene: string;
  cpu: number | null;
  memory: number | null;
  uptime: string;
  version: string;
}

function App() {
  const [installations, setInstallations] = useState<Installation[]>([]);
  const [events, setEvents] = useState<any[]>([]);
  
  const loadData = async () => {
    const installationsResponse = await fetch("http://localhost:8000/installations");
    const installationsData = await installationsResponse.json();

    const eventsResponse = await fetch("http://localhost:8000/events");
    const eventsData = await eventsResponse.json();

    setInstallations(installationsData);
    setEvents(eventsData);

  };
  
  const changeScene = async (name: string, scene: string) => {
  await fetch(
    `http://localhost:8000/installations/${encodeURIComponent(name)}/scene`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ scene }),
    }
  );

    await loadData();
  };


  useEffect(() => {
    loadData();
  }, []);



  return (
  <div>
    <h1>Stagehand</h1>

    {installations.map((installation) => (
      <div
        key={installation.name}
        style={{
          border: "1px solid #ccc",
          padding: "1rem",
          marginBottom: "1rem",
          borderRadius: "8px",
        }}
      >
        <h2>{installation.name}</h2>
        <p>Status: {installation.status}</p>
        <p>CPU: {installation.cpu}</p>
        <p>Memory: {installation.memory}</p>
        <p>Uptime: {installation.uptime}</p>
        <p>Version: {installation.version}</p>
        <p>Scene: {installation.scene}</p>

        <div>
          <button
            onClick={() => changeScene(installation.name, "Aurora")}
          >
            Aurora
          </button>

          <button
            onClick={() => changeScene(installation.name, "Particles")}
          >
            Particles
          </button>

          <button
            onClick={() => changeScene(installation.name, "Galaxy")}
          >
            Galaxy
          </button>
        </div>
      </div>
    ))}

    <h2>Recent Activity</h2>

    {events.map((event, index) => (
      <div
        key={index}
        style={{
          border: "1px solid #ccc",
          padding: "0.5rem",
          marginBottom: "0.5rem",
          borderRadius: "4px",
        }}
      >
        {event.installation} changed scene to {event.scene}
      </div>
    ))}
  </div>
);
}

export default App;