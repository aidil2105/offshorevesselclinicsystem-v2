import { Link, useLocation } from "react-router-dom";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const location = useLocation();
  
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Crew Records", path: "/crew-records" },
    { name: "Visit Log", path: "/visit-log" },
    { name: "Emergencies", path: "/emergencies" },
    { name: "Medicine Inventory", path: "/medicine-inventory" },
    { name: "Analytics", path: "/analytics" },
    { name: "Settings", path: "/settings" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header */}
      <header className="border-b-2 border-black p-4">
        <div className="flex justify-between items-center">
          <div className="border-2 border-black px-4 py-2">
            <span>MarMed Onboard Clinic</span>
          </div>
          <div className="flex gap-4">
            <Link to="#" className="underline">User Profile</Link>
            <Link to="#" className="underline">Logout</Link>
          </div>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Sidebar Navigation */}
        <aside className="w-64 border-r-2 border-black p-4">
          <nav>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className={`block px-4 py-2 border-2 border-black ${
                      location.pathname === link.path ? "bg-black text-white" : "bg-white"
                    }`}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>

      {/* Footer */}
      <footer className="border-t-2 border-black p-4 text-center">
        <p>© 2025 MarMed Onboard Clinic – For Authorized Medical Use Only | Contact: support@marmed.com | Maritime Health Portal</p>
      </footer>
    </div>
  );
}
