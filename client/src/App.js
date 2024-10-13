import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserList from "./pages/UserList";
import LeaderBoard from "./pages/LeaderBoard";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<UserList />} />
          <Route path="/leaderboard" element={<LeaderBoard />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
