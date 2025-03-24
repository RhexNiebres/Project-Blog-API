import { getToken, logout } from "../services/AuthService"; 
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();
  const token = getToken(); // Get token safely

  return (
    <nav>
      {!token ? (
        <>
          <button onClick={() => navigate("/signup")}>Sign Up</button>
          <button onClick={() => navigate("/login")}>Log In</button>
        </>
      ) : (
        <button onClick={() => logout(navigate)}>Log Out</button> 
      )}
    </nav>
  );
};

export default NavBar;
