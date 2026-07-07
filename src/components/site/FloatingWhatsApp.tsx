import { FaWhatsapp } from "react-icons/fa";
import { site } from "@/config/site";

export function FloatingWhatsApp() {
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <span className="absolute inset-0 animate-ping rounded-full bg-[#25D366] opacity-30"></span>

      <a
        href={site.whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-[0_0_30px_rgba(37,211,102,0.6)] active:scale-95"
      >
        <FaWhatsapp className="h-7 w-7" />
      </a>
    </div>
  );
}