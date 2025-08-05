import { Link } from "react-router-dom";
import MySvgIcon from "../../assets/name-logo-favicon.svg";
import MySvgIconDark from "../../assets/name-logo-white.svg";
import { useTheme } from "../DarkMode/ThemeProvider";

export default function MainNav() {

  const { theme } = useTheme();

  return (
    <div className="hidden md:flex">
      <Link to="/">
        <img
          className="w-auto h-6 ml-2 xs:h-10 sm:h-10"
          src={theme === "dark" ? MySvgIconDark : MySvgIcon}
          alt="logo"
        />
      </Link>
      {/* <nav className="flex items-center gap-3 lg:gap-4 ml-16">
        <Link to="/project" className="hover:text-blue-500 dark:hover:text-gray-500">
          Project
        </Link>
        <Link to="/about" className="hover:text-blue-500 dark:hover:text-gray-500">
          About
        </Link>
        <Link to="/contact" className="hover:text-blue-500 dark:hover:text-gray-500">
          Contact
        </Link>
      </nav> */}
    </div>
  );
}
