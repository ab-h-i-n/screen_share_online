import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./common/pages/home/page";
import StartRoom from "./common/pages/share/start/page";
import JoinRoom from "./common/pages/share/join/page";
import Header from "./common/components/Header";
import { SocketContext } from "./utils/Context";
import { useState } from "react";

function App() {
  const [socket, setSocket] = useState(null);

  return (
    <SocketContext.Provider value={{socket, setSocket}}>
      <BrowserRouter>
        <main className="h-screen bg-slate-950 grid grid-rows-[min-content,1fr]">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/room/start" element={<StartRoom />} />
            <Route path="/room/join" element={<JoinRoom />} />
          </Routes>
        </main>
      </BrowserRouter>
    </SocketContext.Provider>
  );
}

export default App;
