import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, Phone, X } from "lucide-react";
import { Logo } from "./Logo";
import { nav, site } from "@/config/site";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const pathname = useRouterState({
    select: (s) => s.location.pathname,
  });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <>
   <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200">
  <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">

    <Logo />

    <nav className="hidden lg:flex items-center gap-10">
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

       <div className="hidden lg:flex items-center gap-3">
            <a
              href={site.phoneHref}
              className="btn-outline h-11 px-5"
            >
              <Phone className="h-4 w-4" />
              Call Now
            </a>

            <Link
              to="/contact"
              className="btn-primary h-11 px-6"
            >
              Get Free Quote
            </Link>
          </div>

    <button className="lg:hidden">
      <Menu />
    </button>

  </div>
</header>

      {/* Mobile Menu */}
     <div
  className={`fixed inset-0 z-40 bg-white transition-all duration-300 lg:hidden ${
    open
      ? "opacity-100 pointer-events-auto"
      : "opacity-0 pointer-events-none"
  }`}
>
  <div className="flex items-center justify-between border-b border-gray-200 px-6 py-5">
    <Logo />
    <button
      onClick={() => setOpen(false)}
      className="rounded-md p-2 hover:bg-gray-100"
    >
      <X className="h-6 w-6" />
    </button>
  </div>

  <div className="px-6 py-6 flex flex-col gap-2">
    {nav.map((n) => (
      <Link
        key={n.to}
        to={n.to}
        className="border-b border-gray-200 py-4 text-lg font-medium text-gray-700"
      >
        {n.label}
      </Link>
    ))}

    <div className="mt-8 flex flex-col gap-3">
      <a href={site.phoneHref} className="btn-outline">
        <Phone className="h-4 w-4" />
        Call {site.phone}
      </a>

      <Link to="/contact" className="btn-primary">
        Get Free Quote
      </Link>
    </div>
  </div>
</div>
    </>
  );
}