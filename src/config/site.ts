// Central place to edit real business details. Replace placeholders any time.
export const site = {
  name: "Tejaswi Enterprises",
  tagline: "Smart Solar Energy for Homes, Farms & Industries",
  description:
    "Tejaswi Enterprises provides reliable, affordable solar energy solutions for homes, agriculture, commercial buildings and industries — with complete consultation, installation, EPC and after-sales support.",
  phone: "+91 98765 43210",
  phoneHref: "tel:+919876543210",
  whatsapp: "919876543210",
  whatsappHref: "https://wa.me/919876543210",
  email: "info@tejaswienterprises.in",
  emailHref: "mailto:info@tejaswienterprises.in",
  address: "1st Floor, Green Plaza, MG Road, Pune, Maharashtra 411001, India",
  hours: "Mon – Sat · 9:00 AM to 7:00 PM",
  social: {
    facebook: "https://facebook.com/",
    instagram: "https://instagram.com/",
    linkedin: "https://linkedin.com/",
    youtube: "https://youtube.com/",
  },
  mapEmbed:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15132.4!2d73.8567!3d18.5204!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sPune!5e0!3m2!1sen!2sin!4v1700000000000",
};

export const nav = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/projects", label: "Projects" },
  { to: "/gallery", label: "Gallery" },
  { to: "/contact", label: "Contact" },
] as const;
