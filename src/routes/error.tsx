import { Link, isRouteErrorResponse, useRouteError } from "react-router-dom";
import { Navbar, Alignment, Button } from "@blueprintjs/core";

export default function ErrorPage() {
  const error = useRouteError();

  console.error(error);

  return (
    <>
      <div id="nav" style={{ paddingBottom: "45px" }}>
        <Navbar fixedToTop>
          <Navbar.Group align={Alignment.LEFT}>
            <Navbar.Heading>
              <Link to="/">
                <Button className="bp5-minimal bp5-navbar-heading">
                  Imken Lab
                </Button>
              </Link>
            </Navbar.Heading>
          </Navbar.Group>
        </Navbar>
      </div>
      <div id="main">
        <main>
          <div id="error-page">
            <h1>Error</h1>
            {isRouteErrorResponse(error) ? (
              <p>
                {error.status} {error.statusText}
              </p>
            ) : (
              <strong>
                An unexpected error occurred. Please try again later. If the
                problem persists, please contact the administrator. For more
                details, see console in developer tools.
              </strong>
            )}
          </div>
        </main>
      </div>
    </>
  );
}
