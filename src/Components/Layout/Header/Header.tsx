/* eslint-disable tailwindcss/classnames-order */
import { DarkThemeToggle, Navbar, TextInput } from "flowbite-react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { TRootState } from "../../../Store/BigPie";
import { userActions } from "../../../Store/UserSlice";
import { CiSearch } from "react-icons/ci";
import { searchActions } from "../../../Store/SearchSlice";
import { useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const Header = () => {
  const user = useSelector((state: TRootState) => state.UserSlice.user);
  const dispatch = useDispatch();
  const nav = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    dispatch(userActions.logout());
    nav("/");
  };

  const search = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    dispatch(searchActions.searchWord(value));
  };

const location = useLocation().pathname

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      (async () => {
        axios.defaults.headers.common["x-auth-token"] =
          localStorage.getItem("token");
        const user = await axios.get(
          "https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users/" +
            (jwtDecode(token) as { _id: string })._id,
        );
        dispatch(userActions.login(user.data));
      })();
    }
  }, []);

  return (
    <Navbar fluid rounded className=" bg-greeny dark:bg-brown">
      <Navbar.Brand as={Link} href="https://flowbite-react.com">
        <span className="self-center text-xl font-semibold text-white whitespace-nowrap dark:text-pinky">
          Batel A
        </span>
      </Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse>
        <Navbar.Link as={Link} to={"/"} href="/" className="text-white dark:text-pinky">
          Home
        </Navbar.Link>

        {!user && (
          <Navbar.Link
            as={Link}
            to={"/register"}
            href="/register"
            className="text-white dark:text-pinky"
          >
            Register
          </Navbar.Link>
        )}
        {!user && (
          <Navbar.Link
            as={Link}
            to={"/signin"}
            href="/signin"
            className="text-white dark:text-pinky"
          >
            Sign In
          </Navbar.Link>
        )}
        
        {user && (
          <>
            <Navbar.Link
              as={Link}
              to={"/profile"}
              href="/profile"
              className="text-white dark:text-pinky"
            >
              Profile
            </Navbar.Link>
            <Navbar.Link
              as={Link}
              to={"/favorites"}
              href="/favorites"
              className="text-white dark:text-pinky"
            >
              Favorites
            </Navbar.Link>
            {user.isBusiness && (
              <Navbar.Link
                as={Link}
                to={"/my-cards"}
                href="/my-cards"
                className="text-white dark:text-pinky"
              >
                My Cards
              </Navbar.Link>
            )}
            <Navbar.Link as={Link}
                            href="/about"
                            to="/about"
                            active={location === "/about" || location === ""}
                            className="text-white dark:text-pinky"
                            >
                            About
                        </Navbar.Link>
            {user && (
          <Navbar.Link className="text-white cursor-pointer dark:text-pinky" onClick={logout}>
            Sign Out
          </Navbar.Link>
        )}
          </>
        )}
      </Navbar.Collapse>
      <TextInput rightIcon={CiSearch} onChange={search} />
      <DarkThemeToggle className="max-md:flex max-md:flex-col" />
    </Navbar>
  );
};

export default Header;
