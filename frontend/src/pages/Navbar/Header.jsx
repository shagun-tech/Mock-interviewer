import { Link, useNavigate } from "react-router-dom";
import MainNav from "./MainNav";
import MobileNav from "./MobileNav";
import { ModeToggle } from "../DarkMode/ModeToggle";
import { Button } from "@/components/ui/button";
import useHandleLogout from "@/hooks/useHandleLogout";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useContext, useState } from "react";
import { AppContext } from "@/context/AppContext";
import { User } from "lucide-react";
import axios from "axios";

export default function Header() {
  const logout = useHandleLogout();
  const navigate = useNavigate();
  const { userData } = useContext(AppContext);

  const [loading, setLoading] = useState(false);

  const handleNavigationToEmailVerification = async () => {
    if (!userData?.email) {
      alert("User email is missing. Cannot send OTP.");
      return;
    }

    try {
      setLoading(true);

      axios.defaults.withCredentials = true;
      const response = await axios.post(
        "http://localhost:8080/api/v1.0/send-otp",
        { email: userData.email }
      );

      if (response.status === 200) {
        alert("OTP sent successfully!");
        navigate("/email-verify");
      } else {
        alert("Failed to send OTP. Try again.");
      }
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Error sending OTP. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <header className="sticky top-0 w-full border-b">
      <div className="h-14 container flex items-center">
        {/* Desktop */}
        <MainNav />

        {/* Mobile */}
        <MobileNav />

        {/* Desktop & mobile */}
        <div className="flex items-center justify-end flex-1 mr-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                className="mr-3 border border-gray-500"
                variant="outline"
                disabled={loading}
              >
                <User />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel className="dark:text-white">
                {userData?.name || "User"}
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleNavigationToEmailVerification}>
                {loading ? "Sending OTP..." : "Verify Email"}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}
