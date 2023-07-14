import { Header } from "../../components";
import { Outlet } from "react-router-dom";
import { LayoutContainer } from "./DefaultLayout.style";

export function DefaultLayout() {
  return (
    <LayoutContainer>
      <Header />
      <Outlet />
    </LayoutContainer>
  );
}
