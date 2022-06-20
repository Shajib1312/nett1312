import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Account from "./pages/Account";
import { Container } from "@mui/material";
import Trending from "./pages/Trending";
import Series from "./pages/Series";
import Movies from "./pages/Movies";
import Searching from "./pages/Searching";

function App() {
  return (
    <>
      <AuthContextProvider>
        <Navbar />
        <div className="pt-[130px] pb-[70px] text-white">
          <Container>
            <Routes>
              <Route path="/" element={<Trending />} />
              <Route path="/series" element={<Series />} />
              <Route path="/movies" element={<Movies />} />
              <Route path="/searching" element={<Searching />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/account" element={<Account />} />
            </Routes>
          </Container>
        </div>
      </AuthContextProvider>
    </>
  );
}

export default App;
