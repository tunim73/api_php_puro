import { NavBar } from "components";
import { NavLink } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { useAuthContext } from "shared/contexts";

export const LayoutWithAuth = () => {
  const { user } = useAuthContext();

  if (user) {
    return (
      <>
        <div className="">
          <NavBar />
        </div>
        <div className="h-full flex items-center justify-center">
          <Outlet />
        </div>
      </>
    );
  } else {
    return (
      <>
        <NavLink to="/login">
          {" "}
          Usuário não autenticado! Clique aqui para realizar login ou
          cadastrar-se.{" "}
        </NavLink>
      </>
    );
  }
};
