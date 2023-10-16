import { Link, Outlet } from "react-router-dom";
import { Navbar, Alignment, Button } from "@blueprintjs/core";

export default function Root() {
  return (
    <>
      <div id="nav" style={{paddingBottom: "45px"}}>
        <Navbar fixedToTop>
          <Navbar.Group align={Alignment.LEFT}>
            <Navbar.Heading>
              <Link to="/">
                <Button className="bp5-minimal bp5-navbar-heading">Imken Lab</Button>
              </Link>
            </Navbar.Heading>
          </Navbar.Group>
        </Navbar>
      </div>
      <div id="main">
        <main>
          <Outlet />
        </main>
      </div>
    </>
  );
}
