import { Button } from "@/components/ui/button";
import SignInModal from "./SignInModal";
import { useEffect, useState } from "react";

export default function Navbar() {
  // For signup/login modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Check login status
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    setIsLoggedIn(!!token);
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    window.location.href = "/"; // redirect to home page
  };

  return (
    <header className="w-full border-b bg-background">
      <nav className="flex items-center justify-between px-6 py-4">
        <div className="spirax-regular">Mindly</div>

        <div className="flex items-center justify-end gap-4">
          <ul className="flex items-center gap-10 text-sm text-muted-foreground">
            <li>
              <a href="#" className="hover:text-foreground whitespace-nowrap">
                Features
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-foreground whitespace-nowrap">
                Contact team
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-foreground whitespace-nowrap">
                Write
              </a>
            </li>
          </ul>

          {isLoggedIn ? (
            <Button
              variant="destructive"
              className="rounded-full px-10"
              onClick={handleSignOut}
            >
              Sign Out
            </Button>
          ) : (
            <Button
              className="rounded-full px-10"
              onClick={() => setIsModalOpen(true)}
            >
              Sign In
            </Button>
          )}
        </div>
      </nav>

      {/* Show login modal */}
      {!isLoggedIn && isModalOpen && (
        <SignInModal onClose={() => setIsModalOpen(false)} />
      )}
    </header>
  );
}
