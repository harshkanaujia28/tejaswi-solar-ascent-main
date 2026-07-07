import { Link } from "@tanstack/react-router";
import logo from "@/assets/logo.png";

type Props = {
  className?: string;
};

export function Logo({ className = "" }: Props) {
  return (
    <Link
      to="/"
      aria-label="Tejaswi Enterprises Home"
      className={`inline-flex items-center ${className}`}
    >
   <img
  src={logo}
  alt="Tejaswi Enterprises Logo"
  className="
    h-14
    max-w-[180px]
    w-auto
    object-contain
    transition-transform
    duration-300
    hover:scale-105

    sm:h-16 sm:max-w-[210px]
    md:h-[68px] md:max-w-[240px]
    lg:h-[78px] lg:max-w-[270px]
  "
/>
    </Link>
  );
}