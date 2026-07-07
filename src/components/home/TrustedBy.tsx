import { Building2, Factory, GraduationCap, Guitar as Hospital, Home, Landmark, Tractor } from "lucide-react";

const items = [
  { Icon: Home, label: "Residential" },
  { Icon: Tractor, label: "Farm Owners" },
  { Icon: Building2, label: "Commercial" },
  { Icon: GraduationCap, label: "Schools" },
  { Icon: Hospital, label: "Hospitals" },
  { Icon: Factory, label: "Industries" },
  { Icon: Landmark, label: "Government" },
];

export function TrustedBy() {
  const loop = [...items, ...items];
  return (
    <section className="border-y border-[color:var(--leaf)] bg-white/60 py-10 overflow-hidden">
      <div className="container-x">
        <p className="text-center text-xs font-semibold tracking-[0.28em] text-muted-foreground uppercase">
          Trusted across India by
        </p>
        <div className="mt-6 relative">
          <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-white to-transparent z-10" />
          <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-white to-transparent z-10" />
          <div className="flex gap-10 animate-marquee w-max">
            {loop.map(({ Icon, label }, i) => (
              <div
                key={`${label}-${i}`}
                className="flex items-center gap-3 px-6 py-3 rounded-full bg-white border border-[color:var(--leaf)] shadow-sm shrink-0"
              >
                <Icon className="h-5 w-5 text-[color:var(--brand)]" />
                <span className="font-semibold text-[color:var(--forest)]">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
