import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Logout from "@mui/icons-material/Logout";
import Axios from "axios";

export function Header() {
  const [auth, setAuth] = useState(false);
  const [staff, setStaff] = useState(0);

  Axios.defaults.withCredentials = true;

  useEffect(() => {
    Axios.get("http://localhost:5000/auth/header")
      .then((res) => {
        console.log("Header: ", res.data);

        if (res.data.msg === "Autenticação bem-sucedida") {
          setAuth(true);
          setStaff(res.data.user.staff);
        } else {
          setAuth(false);
        }
      })
      .catch((err) => console.log("Erro ao buscar header:", err));
  }, []);

  const handleLogout = () => {
    Axios.get("http://localhost:5000/auth/logout")
      .then(() => {
        location.reload(true);
      })
      .catch((err) => console.log("Erro ao fazer logout:", err));
  };

  return (
    <div>
      <div>
        <Link to="/">Home</Link>

        {auth && staff === 1 && <Link to="/crud_login">Crud Login</Link>}

        {auth ? (
          <Logout onClick={handleLogout} />
        ) : (
          <>
            <Link to="/login"> Login </Link>
            <Link to="/register"> Register </Link>
          </>
        )}
      </div>
    </div>
  );
}
