import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, Phone, X } from "lucide-react";
import { Logo } from "./Logo";
import { nav, site } from "@/config/site";

export function Navbar() {
  const [open, setOpen] = useState(false);

  const pathname = useRouterState({
    select: (s) => s.location.pathname,
  });

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      {/* Navbar */}
      <header className="fixed inset-x-0 top-0 z-50 border-b border-gray-200 bg-white">
        <div className="mx-auto flex h-20  items-center justify-between px-6 lg:px-8">
          <Logo />

          {/* Desktop Nav */}
          <nav className="hidden items-center gap-10 lg:flex">
            {nav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="text-[15px] font-medium text-gray-700 transition-colors hover:text-[color:var(--brand)]"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Desktop Buttons */}
          <div className="hidden items-center gap-3 lg:flex">
            <a href={site.phoneHref} className="btn-outline h-11 px-5">
              <Phone className="h-4 w-4" />
              Call Now
            </a>

            <Link to="/contact" className="btn-primary h-11 px-6">
              Get Free Quote
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setOpen(true)}
            className="rounded-md p-2 transition hover:bg-gray-100 lg:hidden"
            aria-label="Open Menu"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </header>

      {/* Overlay */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-[998] bg-black/40 lg:hidden"
        />
      )}

      {/* Mobile Menu */}
      <div
        className={`fixed inset-y-0 right-0 z-[999] w-full bg-white transition-transform duration-300 lg:hidden ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-5">
          <Logo />

          <button
            onClick={() => setOpen(false)}
            className="rounded-md p-2 transition hover:bg-gray-100"
            aria-label="Close Menu"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Menu Links */}
        <div className="flex flex-col px-6 py-6">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => setOpen(false)}
              className="border-b border-gray-200 py-4 text-lg font-medium text-gray-700 transition hover:text-[color:var(--brand)]"
            >
              {item.label}
            </Link>
          ))}

          <div className="mt-8 flex flex-col gap-3">
            <a href={site.phoneHref} className="btn-outline justify-center">
              <Phone className="h-4 w-4" />
              Call {site.phone}
            </a>

            <Link
              to="/contact"
              onClick={() => setOpen(false)}
              className="btn-primary justify-center"
            >
              Get Free Quote
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}