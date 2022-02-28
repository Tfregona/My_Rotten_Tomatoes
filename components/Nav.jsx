import { useState, useEffect } from "react";
import { NavLink } from ".";
import { userService } from "services";

export { Nav };

function Nav() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const subscription = userService.user.subscribe((x) => setUser(x));
    return () => subscription.unsubscribe();
  }, []);

  function logout() {
    userService.logout();
  }

  // only show nav when logged in
  // if (!user) return null;

  return (
    <nav className="navbar navbar-expand navbar-dark bg-dark">
      <div className="navbar-nav">
        <div className="navbar-brand">
          <div className="flex">
          <img src="https://i.ibb.co/k3Vb2t5/tomato.png" width="40" /> 
          <p>My Rotten Tomatoes</p>
          </div>
        </div>
        <NavLink href="/" exact className="nav-item nav-link">
          Home
        </NavLink>
        {!user ? (
          <NavLink href="/account/login" className="nav-item nav-link">
            Sign in
          </NavLink>
        ) : (
          <>
            {userService.userValue?.role === "user" ? (
              <NavLink href="/profile" className="nav-item nav-link">
                Profile
              </NavLink>
            ) : (
              <>
                <NavLink href="/profile" className="nav-item nav-link">
                  Profile Admin
                </NavLink>
              </>
            )}
            <a onClick={logout} className="nav-item nav-link">
              Logout
            </a>
          </>
        )}
      </div>
    </nav>
  );
}
