import panelImg from "@/assets/panel-closeup.jpg";
import pumpImg from "@/assets/solar-pump.jpg";
import commercialImg from "@/assets/commercial-solar.jpg";
import industrialImg from "@/assets/industrial-solar.jpg";
import residentialImg from "@/assets/residential-solar.jpg";
import agriImg from "@/assets/agri-solar.jpg";
import schoolImg from "@/assets/school-solar.jpg";
import teamImg from "@/assets/team-install.jpg";

export type Product = {
  slug: string;
  name: string;
  category: string;
  tagline: string;
  price: string;
  image: string;
  highlights: string[];
  specs: Record<string, string>;
  description: string;
  warranty: string;
};

export const products: Product[] = [
  {
    slug: "mono-perc-540w",
    name: "Tejaswi Mono-PERC 540W Solar Panel",
    category: "Solar Panels",
    tagline: "Tier-1 mono-crystalline module for maximum rooftop output",
    price: "₹14,500",
    image: panelImg,
    highlights: [
      "21.5% module efficiency",
      "144 half-cut cells",
      "Anti-PID & salt-mist resistant",
      "IEC & BIS certified",
    ],
    specs: {
      "Peak Power": "540 Wp",
      "Cell Type": "Mono-PERC Half Cut",
      "Efficiency": "21.5%",
      "Voc / Isc": "49.8V / 13.9A",
      "Dimensions": "2278 × 1134 × 35 mm",
      "Weight": "27.5 kg",
    },
    description:
      "Our flagship 540W mono-PERC module engineered for high-yield rooftop installations. Enhanced low-light performance and industry-leading temperature coefficient deliver consistent generation across Indian climates.",
    warranty: "12-yr product · 25-yr linear performance",
  },
  {
    slug: "poly-335w",
    name: "Tejaswi Polycrystalline 335W Panel",
    category: "Solar Panels",
    tagline: "Reliable, budget-friendly workhorse for residential systems",
    price: "₹9,800",
    image: residentialImg,
    highlights: [
      "17.2% efficiency",
      "Anti-reflective toughened glass",
      "Snow & wind load certified",
      "5 busbar cells",
    ],
    specs: {
      "Peak Power": "335 Wp",
      "Cell Type": "Polycrystalline",
      "Efficiency": "17.2%",
      "Voc / Isc": "45.6V / 9.3A",
      "Dimensions": "1956 × 992 × 40 mm",
      "Weight": "22.5 kg",
    },
    description:
      "Time-tested polycrystalline module perfect for homes and small commercial rooftops. Rugged aluminium frame and IP68 junction box for years of trouble-free operation.",
    warranty: "10-yr product · 25-yr performance",
  },
  {
    slug: "bifacial-550w",
    name: "Tejaswi Bifacial 550W Glass-Glass",
    category: "Solar Panels",
    tagline: "Dual-side generation with up to 25% bifacial gain",
    price: "₹17,900",
    image: commercialImg,
    highlights: [
      "Glass-glass double protection",
      "Up to 25% rear-side gain",
      "30-year power warranty",
      "Ideal for ground-mount & carport",
    ],
    specs: {
      "Peak Power": "550 Wp (front)",
      "Bifaciality": "70% ± 5%",
      "Efficiency": "21.9%",
      "Voc / Isc": "50.2V / 14.0A",
      "Dimensions": "2278 × 1134 × 30 mm",
      "Weight": "32 kg",
    },
    description:
      "Premium glass-glass bifacial module capturing sunlight from both surfaces. Perfect for commercial ground-mount plants where every extra kWh matters.",
    warranty: "15-yr product · 30-yr performance",
  },
  {
    slug: "ongrid-inverter-5kw",
    name: "Tejaswi On-Grid Inverter 5kW",
    category: "Inverters",
    tagline: "Grid-tie inverter with WiFi monitoring and 98.4% efficiency",
    price: "₹52,000",
    image: industrialImg,
    highlights: [
      "Dual MPPT trackers",
      "98.4% peak efficiency",
      "WiFi + mobile app monitoring",
      "IP65 outdoor rated",
    ],
    specs: {
      "Rated Power": "5 kW",
      "MPPT Trackers": "2",
      "Max Input Voltage": "600V DC",
      "Grid Voltage": "230V AC",
      "Efficiency": "98.4%",
      "Protection": "IP65",
    },
    description:
      "Grid-tie string inverter for residential and small commercial rooftops. Real-time production tracking via the Tejaswi app with SMS alerts on faults.",
    warranty: "5-yr standard · extendable to 10 yr",
  },
  {
    slug: "hybrid-inverter-3kw",
    name: "Tejaswi Hybrid Inverter 3kW",
    category: "Inverters",
    tagline: "Solar + battery + grid — all-in-one intelligent inverter",
    price: "₹68,500",
    image: schoolImg,
    highlights: [
      "Works with Li-ion & Lead-acid",
      "Zero-export function",
      "5ms UPS switchover",
      "Parallel-stacking capable",
    ],
    specs: {
      "Rated Power": "3 kW",
      "Battery Voltage": "48V",
      "Solar Input": "4.5 kWp",
      "Backup Time": "Configurable",
      "Efficiency": "97.6%",
      "Protection": "IP20 indoor",
    },
    description:
      "Take charge of your energy: store solar in batteries, sell excess to grid, and keep essential loads running during outages. Ideal for homes and small offices.",
    warranty: "5-yr comprehensive",
  },
  {
    slug: "lithium-battery-5kwh",
    name: "Tejaswi LFP Battery 5 kWh",
    category: "Batteries",
    tagline: "Lithium iron phosphate battery — 6000 cycles of clean storage",
    price: "₹1,85,000",
    image: teamImg,
    highlights: [
      "LiFePO₄ chemistry — safest lithium",
      "6000+ deep cycles",
      "Built-in BMS with app monitoring",
      "Wall or rack mount",
    ],
    specs: {
      "Capacity": "5.12 kWh",
      "Nominal Voltage": "51.2V",
      "Cycle Life": "6000+ @ 80% DoD",
      "Depth of Discharge": "95%",
      "Communication": "CAN / RS485",
      "Dimensions": "600 × 500 × 180 mm",
    },
    description:
      "High-density lithium iron phosphate storage engineered for daily solar cycling. Fully sealed, maintenance-free and safe for indoor installation.",
    warranty: "10-yr / 6000-cycle",
  },
  {
    slug: "solar-pump-3hp",
    name: "Tejaswi Solar Water Pump 3 HP",
    category: "Solar Pumps",
    tagline: "PM-KUSUM approved submersible pump — zero fuel farming",
    price: "₹2,15,000",
    image: pumpImg,
    highlights: [
      "PM-KUSUM component B / C approved",
      "AC submersible with VFD",
      "Auto sun-tracking controller",
      "Suits 4\" & 6\" bore wells",
    ],
    specs: {
      "Pump Rating": "3 HP (2.2 kW)",
      "Panel Requirement": "3.0 kWp",
      "Max Head": "70 m",
      "Discharge": "60,000 L/day",
      "Pipe Size": "40 mm",
      "Controller": "MPPT VFD",
    },
    description:
      "Diesel-free irrigation for farmers. Includes solar array, mounting, VFD controller and submersible pump — delivered and commissioned under PM-KUSUM scheme.",
    warranty: "5-yr comprehensive on pump & controller",
  },
  {
    slug: "solar-street-light-60w",
    name: "Tejaswi All-in-One Solar Street Light 60W",
    category: "Solar Lighting",
    tagline: "Integrated LED street light with motion sensor & dusk-to-dawn",
    price: "₹18,500",
    image: agriImg,
    highlights: [
      "Integrated panel + battery + LED",
      "PIR motion sensor",
      "IP66 aluminium housing",
      "3-night autonomy",
    ],
    specs: {
      "LED Power": "60 W",
      "Lumens": "9000 lm",
      "Panel": "80 W mono",
      "Battery": "LiFePO₄ 25.6V 30Ah",
      "Autonomy": "3 rainy days",
      "Pole Height": "6–7 m recommended",
    },
    description:
      "Turnkey solar street light for villages, campuses and highways. Auto ON at dusk, dims to 30% after peak hours, ramps to 100% on motion detection.",
    warranty: "3-yr on LED · 5-yr on battery",
  },
  {
    slug: "mppt-charge-controller-60a",
    name: "Tejaswi MPPT Charge Controller 60A",
    category: "Balance of System",
    tagline: "Smart MPPT charge controller with LCD & Bluetooth",
    price: "₹22,000",
    image: industrialImg,
    highlights: [
      "99% tracking efficiency",
      "12/24/36/48V auto-detect",
      "Bluetooth monitoring",
      "Load timer & dusk-to-dawn",
    ],
    specs: {
      "Rated Current": "60 A",
      "Max PV Voltage": "150V DC",
      "Battery Voltage": "12/24/36/48V",
      "Peak Efficiency": "99%",
      "Display": "LCD + Bluetooth",
      "Protection": "IP32",
    },
    description:
      "Advanced MPPT charge controller for off-grid solar systems. Real-time energy statistics on your phone with battery-life analytics.",
    warranty: "3-yr replacement",
  },
  {
    slug: "rooftop-mounting-structure",
    name: "Tejaswi Rooftop Mounting Structure (per kW)",
    category: "Structure",
    tagline: "Hot-dip galvanised structure engineered for 180 km/h winds",
    price: "₹4,200",
    image: commercialImg,
    highlights: [
      "Hot-dip galvanised MS",
      "Rated for 180 km/h wind",
      "Custom tilt 10°–30°",
      "25-yr rust-through warranty",
    ],
    specs: {
      "Material": "MS HDG (80 μ)",
      "Wind Load": "180 km/h",
      "Snow Load": "1.5 kN/m²",
      "Tilt Range": "10° – 30°",
      "Roof Types": "RCC / Metal / Tile",
      "Compliance": "IS 875 & IS 4759",
    },
    description:
      "Custom-designed and fabricated mounting structure to hold panels securely for decades. Site-specific tilt & orientation for maximum yield.",
    warranty: "25-yr rust-through",
  },
];

export const productBySlug = (slug: string) =>
  products.find((p) => p.slug === slug);
