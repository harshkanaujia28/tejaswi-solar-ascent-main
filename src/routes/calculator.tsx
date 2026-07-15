import { createFileRoute } from "@tanstack/react-router";
import { useState, useRef } from "react";
import { motion } from "framer-motion";
import {
  Sun, Zap, IndianRupee, Leaf, TrendingUp, ArrowRight, CheckCircle2,
  Phone, Sparkles, ShieldCheck, Award, Factory, Calculator as CalcIcon,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { z } from "zod";
import { toast } from "sonner";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { site } from "@/config/site";

export const Route = createFileRoute("/calculator")({
  head: () => ({
    meta: [
      { title: "Solar Savings Calculator — Estimate ROI in 60 sec | Tejaswi" },
      { name: "description", content: "Instant solar savings calculator. Enter your monthly bill and get personalised system size, savings, subsidy and payback estimate." },
      { property: "og:title", content: "Solar Savings Calculator — Tejaswi Enterprises" },
      { property: "og:description", content: "See how much you can save with rooftop solar in 60 seconds." },
      { property: "og:url", content: "/calculator" },
    ],
    links: [{ rel: "canonical", href: "/calculator" }],
  }),
  component: CalculatorPage,
});

// -------------- Domain data --------------
const INDIAN_STATES = [
  "Andhra Pradesh", "Assam", "Bihar", "Chhattisgarh", "Delhi", "Goa", "Gujarat", "Haryana", "Himachal Pradesh",
  "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Odisha", "Punjab", "Rajasthan", "Tamil Nadu",
  "Telangana", "Uttar Pradesh", "Uttarakhand", "West Bengal",
];
const STATE_SUN_HOURS: Record<string, number> = {
  Rajasthan: 5.8, Gujarat: 5.6, "Madhya Pradesh": 5.5, Maharashtra: 5.4,
  Karnataka: 5.4, Telangana: 5.5, "Andhra Pradesh": 5.5, "Tamil Nadu": 5.4,
  Haryana: 5.3, Punjab: 5.2, Delhi: 5.2, "Uttar Pradesh": 5.1,
  Bihar: 5.0, "West Bengal": 4.9, Assam: 4.5,
};
const TARIFF: Record<string, number> = { Residential: 7.5, Commercial: 9.5 };
const ROOF_FACTORS: Record<string, number> = {
  "RCC / Concrete": 1.0,
  "Metal Sheet": 0.95,
  "Tile Roof": 0.92,
  "Ground Mount": 1.05,
};
const PRICING: Record<string, Record<string, number>> = {
  Residential: { DCR: 45000, "Non-DCR": 35000 },
  Commercial: { DCR: 35000, "Non-DCR": 25000 },
};
const SYSTEM_EFFICIENCY = 0.77;
const UTILIZATION = 0.9;
const CO2_PER_KWH = 0.716;

type ConsumerType = "Residential" | "Commercial";
type PanelType = "DCR" | "Non-DCR";
type RoofType = keyof typeof ROOF_FACTORS;

interface CalcResult {
  capacity: number;
  monthlySavings: number;
  annualSavings: number;
  lifetimeSavings: number;
  paybackYears: number;
  annualGeneration: number;
  co2Reduction: number;
  systemCost: number;
  subsidy: number;
  netInvestment: number;
}

function calcSubsidy(capacity: number, consumerType: ConsumerType, panelType: PanelType) {
  if (!(consumerType === "Residential" && panelType === "DCR")) return 0;
  if (capacity <= 2) return capacity * 30000;
  if (capacity <= 3) return 60000;
  return 78000;
}

function calculate(inputs: {
  monthlyBill: number; state: string; consumerType: ConsumerType;
  panelType: PanelType; roofType: RoofType;
}): CalcResult {
  const tariff = TARIFF[inputs.consumerType];
  const sunHours = STATE_SUN_HOURS[inputs.state] ?? 5.0;
  const roofFactor = ROOF_FACTORS[inputs.roofType];

  const monthlyUnits = inputs.monthlyBill / tariff;
  let capacity = monthlyUnits / (30 * sunHours * roofFactor * SYSTEM_EFFICIENCY);
  capacity = Math.max(1, Math.round(capacity * 10) / 10);

  const dailyGeneration = capacity * sunHours * roofFactor * SYSTEM_EFFICIENCY;
  const annualGeneration = dailyGeneration * 365;
  const annualConsumption = monthlyUnits * 12;
  const annualSavings = Math.min(annualGeneration, annualConsumption) * tariff * UTILIZATION;
  const monthlySavings = annualSavings / 12;

  let lifetime = 0;
  for (let y = 0; y < 25; y++) {
    const degraded = Math.pow(1 - 0.005, y);
    const escalated = Math.pow(1.03, y);
    lifetime += annualSavings * degraded * escalated;
  }

  const systemCost = capacity * PRICING[inputs.consumerType][inputs.panelType];
  const subsidy = calcSubsidy(capacity, inputs.consumerType, inputs.panelType);
  const netInvestment = systemCost - subsidy;
  const paybackYears = Math.round((netInvestment / annualSavings) * 10) / 10;
  const co2Reduction = annualGeneration * CO2_PER_KWH;

  return {
    capacity, monthlySavings, annualSavings, lifetimeSavings: lifetime,
    paybackYears, annualGeneration, co2Reduction, systemCost, subsidy, netInvestment,
  };
}

const fmtINR = (n: number) => "₹" + Math.round(n).toLocaleString("en-IN");
const fmtLakh = (n: number) => `₹${(n / 100000).toFixed(2)} Lakh`;

const leadSchema = z.object({
  name: z.string().trim().min(2, "Name is required").max(100),
  phone: z.string().trim().regex(/^[6-9]\d{9}$/, "Enter valid 10-digit phone"),
  email: z.string().trim().email("Invalid email").max(255),
  city: z.string().trim().min(2, "City is required").max(100),
});

// -------------- UI atoms --------------
function StepBadge({ n, label, active, done }: { n: number; label: string; active: boolean; done: boolean }) {
  return (
    <div className="flex items-center gap-3">
      <div className={`h-9 w-9 rounded-full flex items-center justify-center font-bold text-sm border-2 transition-all ${done ? "bg-[color:var(--brand)] text-white border-[color:var(--brand)]" : active ? "bg-white text-[color:var(--brand)] border-[color:var(--brand)]" : "bg-white text-muted-foreground border-[color:var(--leaf)]"}`}>
        {done ? <CheckCircle2 className="h-5 w-5" /> : n}
      </div>
      <div className="hidden md:block">
        <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Step {n}</div>
        <div className={`text-sm font-semibold ${active || done ? "text-[color:var(--forest)]" : "text-muted-foreground"}`}>{label}</div>
      </div>
    </div>
  );
}

function ResultCard({ icon: Icon, label, value, accent }: { icon: typeof Sun; label: string; value: string; accent?: boolean }) {
  return (
    <div className={`rounded-2xl p-5 border ${accent ? "bg-gradient-to-br from-[color:var(--brand)] to-[color:var(--brand-2)] text-white border-transparent shadow-lg" : "bg-white border-[color:var(--leaf)] shadow-sm"}`}>
      <div className={`inline-flex h-10 w-10 items-center justify-center rounded-xl ${accent ? "bg-white/20" : "bg-[color:var(--section)]"}`}>
        <Icon className={`h-5 w-5 ${accent ? "text-white" : "text-[color:var(--brand)]"}`} />
      </div>
      <div className={`mt-3 text-xs uppercase tracking-widest ${accent ? "text-white/80" : "text-muted-foreground"}`}>{label}</div>
      <div className={`mt-1 text-2xl font-bold ${accent ? "text-white" : "text-[color:var(--forest)]"}`}>{value}</div>
    </div>
  );
}

// -------------- Page --------------
function CalculatorPage() {
  const resultsRef = useRef<HTMLDivElement>(null);
  const leadRef = useRef<HTMLDivElement>(null);
  const proposalRef = useRef<HTMLDivElement>(null);

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [monthlyBill, setMonthlyBill] = useState(3000);
  const [state, setState] = useState("Maharashtra");
  const [consumerType, setConsumerType] = useState<ConsumerType>("Residential");
  const [panelType, setPanelType] = useState<PanelType>("DCR");
  const [roofType, setRoofType] = useState<RoofType>("RCC / Concrete");
  const [result, setResult] = useState<CalcResult | null>(null);
  const [lead, setLead] = useState({ name: "", phone: "", email: "", city: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  const handleCalculate = () => {
    if (monthlyBill < 500) {
      toast.error("Please enter monthly bill of at least ₹500");
      return;
    }
    const r = calculate({ monthlyBill, state, consumerType, panelType, roofType });
    setResult(r);
    setStep(2);
    setTimeout(() => resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 80);
  };

  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = leadSchema.safeParse(lead);
    if (!parsed.success) {
      const errs: Record<string, string> = {};
      parsed.error.issues.forEach((i) => { errs[i.path[0] as string] = i.message; });
      setErrors(errs);
      return;
    }
    setErrors({});
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setStep(4);
      toast.success("Proposal Unlocked! Our solar expert will contact you within 24 hours.");
      setTimeout(() => proposalRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 80);
    }, 600);
  };

  const billPresets = [1500, 3000, 5000, 8000, 15000, 25000];

  return (
    <>
      <PageHero
        eyebrow="SOLAR CALCULATOR"
        title={<>Calculate your <span className="text-gradient-gold">solar savings</span> in 60 seconds</>}
        subtitle="Get an instant estimate of your system size, monthly savings, government subsidy and payback — powered by Tejaswi engineers."
        crumbs={[{ to: "/", label: "Home" }, { to: "/calculator", label: "Calculator" }]}
      />

      {/* Step indicator */}
      <section className="bg-white border-b border-[color:var(--leaf)]">
        <div className="container-x py-6 flex items-center justify-between gap-4 overflow-x-auto">
          <StepBadge n={1} label="Your usage" active={step === 1} done={step > 1} />
          <div className="flex-1 h-px bg-[color:var(--leaf)] min-w-4" />
          <StepBadge n={2} label="Savings" active={step === 2} done={step > 2} />
          <div className="flex-1 h-px bg-[color:var(--leaf)] min-w-4" />
          <StepBadge n={3} label="Your details" active={step === 3} done={step > 3} />
          <div className="flex-1 h-px bg-[color:var(--leaf)] min-w-4" />
          <StepBadge n={4} label="Proposal" active={step === 4} done={false} />
        </div>
      </section>

      {/* STEP 1 — inputs */}
      <section className="py-16 bg-section">
        <div className="container-x">
          <Reveal>
            <div className="max-w-4xl mx-auto card-elevated p-6 md:p-10">
              <div className="flex items-center gap-4">
                <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[color:var(--brand)] to-[color:var(--brand-2)] text-white shadow-lg">
                  <Zap className="h-6 w-6" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-[color:var(--forest)]">Your usage details</h2>
                  <p className="text-sm text-muted-foreground">Tell us about your electricity consumption.</p>
                </div>
              </div>

              <div className="mt-8 space-y-8">
                <div>
                  <label className="text-xs font-semibold uppercase tracking-widest text-[color:var(--forest)]">Monthly electricity bill</label>
                  <div className="mt-3 rounded-2xl border border-[color:var(--leaf)] bg-white p-5">
                    <div className="flex items-baseline gap-3">
                      <IndianRupee className="h-6 w-6 text-[color:var(--brand)]" />
                      <input
                        type="number"
                        value={monthlyBill}
                        onChange={(e) => setMonthlyBill(Math.max(0, Number(e.target.value) || 0))}
                        className="bg-transparent text-3xl md:text-4xl font-bold w-44 outline-none text-[color:var(--forest)]"
                      />
                      <span className="text-sm text-muted-foreground">per month (₹)</span>
                    </div>
                    <input
                      type="range"
                      min={500}
                      max={50000}
                      step={500}
                      value={monthlyBill}
                      onChange={(e) => setMonthlyBill(Number(e.target.value))}
                      className="mt-4 w-full accent-[color:var(--brand)] cursor-pointer"
                    />
                    <div className="mt-2 flex justify-between text-xs text-muted-foreground">
                      <span>₹500</span><span>₹25,000</span><span>₹50,000+</span>
                    </div>
                    <div className="mt-4 flex flex-wrap items-center gap-2">
                      <span className="text-xs text-muted-foreground">Quick select:</span>
                      {billPresets.map((p) => (
                        <button
                          key={p}
                          type="button"
                          onClick={() => setMonthlyBill(p)}
                          className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${monthlyBill === p ? "bg-gradient-to-r from-[color:var(--brand)] to-[color:var(--brand-2)] border-transparent text-white shadow-sm" : "bg-white border-[color:var(--leaf)] text-[color:var(--forest)] hover:border-[color:var(--brand)]"}`}
                        >
                          ₹{p.toLocaleString("en-IN")}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-widest text-[color:var(--forest)]">State</label>
                    <select
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      className="mt-2 w-full rounded-2xl border border-[color:var(--leaf)] bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[color:var(--brand)]"
                    >
                      {INDIAN_STATES.map((s) => <option key={s}>{s}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-widest text-[color:var(--forest)]">Roof type</label>
                    <select
                      value={roofType}
                      onChange={(e) => setRoofType(e.target.value as RoofType)}
                      className="mt-2 w-full rounded-2xl border border-[color:var(--leaf)] bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[color:var(--brand)]"
                    >
                      {Object.keys(ROOF_FACTORS).map((r) => <option key={r}>{r}</option>)}
                    </select>
                  </div>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-widest text-[color:var(--forest)]">Consumer type</label>
                    <div className="mt-2 grid grid-cols-2 gap-2 rounded-2xl bg-[color:var(--section)] p-1 border border-[color:var(--leaf)]">
                      {(["Residential", "Commercial"] as ConsumerType[]).map((t) => (
                        <button
                          key={t}
                          type="button"
                          onClick={() => setConsumerType(t)}
                          className={`py-2.5 rounded-xl text-sm font-semibold transition-all ${consumerType === t ? "bg-gradient-to-r from-[color:var(--brand)] to-[color:var(--brand-2)] text-white shadow" : "text-muted-foreground hover:text-[color:var(--forest)]"}`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-widest text-[color:var(--forest)]">Panel type</label>
                    <div className="mt-2 grid grid-cols-2 gap-2 rounded-2xl bg-[color:var(--section)] p-1 border border-[color:var(--leaf)]">
                      {(["DCR", "Non-DCR"] as PanelType[]).map((t) => (
                        <button
                          key={t}
                          type="button"
                          onClick={() => setPanelType(t)}
                          className={`py-2.5 rounded-xl text-sm font-semibold transition-all ${panelType === t ? "bg-gradient-to-r from-[color:var(--brand)] to-[color:var(--brand-2)] text-white shadow" : "text-muted-foreground hover:text-[color:var(--forest)]"}`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                    <p className="mt-2 text-xs text-muted-foreground">
                      {panelType === "DCR" ? "DCR panels qualify for govt. subsidy (residential)." : "Non-DCR: lower cost, no subsidy."}
                    </p>
                  </div>
                </div>
              </div>

              <button onClick={handleCalculate} className="btn-primary mt-10 w-full sm:w-auto">
                <CalcIcon className="h-4 w-4" /> Calculate my savings <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* STEP 2 — savings */}
      <div ref={resultsRef}>
        {result && (
          <section className="py-20 bg-white">
            <div className="container-x">
              <Reveal>
                <div className="text-center max-w-3xl mx-auto">
                  <span className="inline-flex items-center gap-2 rounded-full bg-[color:var(--section)] px-4 py-1.5 text-xs font-semibold tracking-widest text-[color:var(--brand)] border border-[color:var(--leaf)]">
                    <Sparkles className="h-3.5 w-3.5" /> YOUR SAVINGS POTENTIAL
                  </span>
                  <h2 className="mt-5 text-3xl md:text-5xl font-bold text-[color:var(--forest)]">
                    You can save <span className="text-gradient-gold">{fmtINR(result.monthlySavings)}</span> every month
                  </h2>
                  <p className="mt-3 text-muted-foreground">With a {result.capacity} kW Tejaswi solar system.</p>
                </div>
              </Reveal>

              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4"
              >
                <ResultCard icon={Sun} label="System size" value={`${result.capacity} kW`} />
                <ResultCard icon={IndianRupee} label="Monthly savings" value={fmtINR(result.monthlySavings)} accent />
                <ResultCard icon={TrendingUp} label="Annual savings" value={fmtINR(result.annualSavings)} />
                <ResultCard icon={Zap} label="Annual generation" value={`${Math.round(result.annualGeneration).toLocaleString("en-IN")} kWh`} />
                <ResultCard icon={Leaf} label="CO₂ offset / yr" value={`${(result.co2Reduction / 1000).toFixed(2)} t`} />
                <ResultCard icon={ShieldCheck} label="Payback period" value={`${result.paybackYears} yrs`} />
                <ResultCard icon={CalcIcon} label="25-yr lifetime savings" value={fmtLakh(result.lifetimeSavings)} accent />
                <ResultCard icon={Award} label="Panel warranty" value="25 years" />
              </motion.div>

              <Reveal delay={0.1}>
                <div className="mt-12 text-center rounded-3xl bg-gradient-to-br from-[color:var(--section)] to-white border border-[color:var(--leaf)] p-8">
                  <h3 className="text-xl font-bold text-[color:var(--forest)]">Want the full proposal with pricing & subsidy?</h3>
                  <p className="mt-2 text-sm text-muted-foreground">Unlock your detailed system cost, subsidy eligibility, and net investment.</p>
                  <button
                    onClick={() => {
                      setStep(3);
                      setTimeout(() => leadRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 80);
                    }}
                    className="btn-primary mt-6"
                  >
                    Get your detailed proposal <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </Reveal>
            </div>
          </section>
        )}
      </div>

      {/* STEP 3 — lead form */}
      <div ref={leadRef}>
        {result && step >= 3 && step < 4 && (
          <section className="py-20 bg-section">
            <div className="container-x max-w-2xl">
              <Reveal>
                <div className="card-elevated p-6 md:p-10">
                  <div className="text-center">
                    <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[color:var(--gold)] to-[color:var(--gold-soft)] text-[color:var(--forest)]">
                      <Sparkles className="h-6 w-6" />
                    </div>
                    <h2 className="mt-4 text-2xl md:text-3xl font-bold text-[color:var(--forest)]">Almost there!</h2>
                    <p className="mt-2 text-sm text-muted-foreground">Get your detailed proposal with pricing & subsidy details.</p>
                  </div>

                  <form onSubmit={handleLeadSubmit} className="mt-8 grid gap-4 sm:grid-cols-2">
                    {[
                      { key: "name", label: "Full name", type: "text", placeholder: "Your name" },
                      { key: "phone", label: "Phone number", type: "tel", placeholder: "10-digit mobile" },
                      { key: "email", label: "Email address", type: "email", placeholder: "you@email.com" },
                      { key: "city", label: "City", type: "text", placeholder: "Your city" },
                    ].map((f) => (
                      <div key={f.key} className="sm:col-span-1">
                        <label className="text-xs font-semibold uppercase tracking-widest text-[color:var(--forest)]">{f.label}</label>
                        <input
                          type={f.type}
                          placeholder={f.placeholder}
                          value={(lead as Record<string, string>)[f.key]}
                          onChange={(e) => setLead({ ...lead, [f.key]: e.target.value })}
                          className="mt-2 w-full rounded-2xl border border-[color:var(--leaf)] bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[color:var(--brand)]"
                        />
                        {errors[f.key] && <p className="mt-1 text-xs text-destructive">{errors[f.key]}</p>}
                      </div>
                    ))}
                    <div className="sm:col-span-2">
                      <button type="submit" disabled={submitting} className="btn-primary w-full">
                        {submitting ? "Submitting…" : (<>Unlock detailed proposal <ArrowRight className="h-4 w-4" /></>)}
                      </button>
                      <p className="mt-3 text-center text-xs text-muted-foreground">🔒 Your information is secure. We respect your privacy.</p>
                    </div>
                  </form>
                </div>
              </Reveal>
            </div>
          </section>
        )}
      </div>

      {/* STEP 4 — proposal */}
      <div ref={proposalRef}>
        {result && step === 4 && (
          <section className="py-20 bg-white">
            <div className="container-x max-w-5xl">
              <Reveal>
                <div className="text-center">
                  <span className="inline-flex items-center gap-2 rounded-full bg-[color:var(--section)] px-4 py-1.5 text-xs font-semibold tracking-widest text-[color:var(--brand)] border border-[color:var(--leaf)]">
                    <CheckCircle2 className="h-3.5 w-3.5" /> PROPOSAL UNLOCKED
                  </span>
                  <h2 className="mt-5 text-3xl md:text-5xl font-bold text-[color:var(--forest)]">Your <span className="text-gradient-green">Tejaswi Solar</span> proposal</h2>
                  <p className="mt-3 text-muted-foreground">Hi {lead.name}, here's your complete solar investment breakdown.</p>
                </div>
              </Reveal>

              <div className="mt-10 grid gap-4 md:grid-cols-3">
                <ResultCard icon={IndianRupee} label="System cost" value={fmtINR(result.systemCost)} />
                <ResultCard icon={Award} label={result.subsidy > 0 ? "Govt subsidy" : "Subsidy"} value={result.subsidy > 0 ? fmtINR(result.subsidy) : "Not eligible"} accent />
                <ResultCard icon={CalcIcon} label="Net investment" value={fmtINR(result.netInvestment)} />
              </div>

              <div className="mt-10 card-elevated p-6 md:p-10">
                <h3 className="text-xl font-bold text-[color:var(--forest)]">Proposal summary</h3>
                <dl className="mt-6 divide-y divide-[color:var(--leaf)]">
                  {([
                    ["Recommended capacity", `${result.capacity} kW`],
                    ["Panel type", `${panelType} (Tejaswi Tier-1)`],
                    ["Roof type", roofType],
                    ["Consumer type", consumerType],
                    ["State", state],
                    ["Annual generation", `${Math.round(result.annualGeneration).toLocaleString("en-IN")} kWh`],
                    ["Annual savings", fmtINR(result.annualSavings)],
                    ["25-year lifetime savings", fmtLakh(result.lifetimeSavings)],
                    ["System cost", fmtINR(result.systemCost)],
                    ["Government subsidy", result.subsidy > 0 ? `− ${fmtINR(result.subsidy)}` : "Not applicable"],
                    ["Net investment", fmtINR(result.netInvestment)],
                    ["Payback period", `${result.paybackYears} years`],
                    ["CO₂ offset / year", `${(result.co2Reduction / 1000).toFixed(2)} tonnes`],
                  ] as [string, string][]).map(([k, v]) => (
                    <div key={k} className="flex justify-between gap-4 py-3">
                      <dt className="text-sm text-muted-foreground">{k}</dt>
                      <dd className="text-sm font-semibold text-[color:var(--forest)] text-right">{v}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <a href={site.phoneHref} className="btn-primary"><Phone className="h-4 w-4" /> Talk to solar expert</a>
                <a href={site.whatsappHref} className="inline-flex items-center gap-2 rounded-full bg-[#25D366] text-white font-semibold px-5 py-3 hover:brightness-110">
                  <FaWhatsapp /> WhatsApp us
                </a>
              </div>
              <p className="mt-4 text-center text-xs text-muted-foreground">
                Our solar expert will reach out within 24 hours with a site survey & customised quote.
              </p>
            </div>
          </section>
        )}
      </div>

      {/* Why Tejaswi */}
      <section className="py-20 bg-section">
        <div className="container-x">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-[color:var(--forest)]">Why <span className="text-gradient-green">Tejaswi Solar</span></h2>
            <p className="mt-3 text-muted-foreground">Certified engineering, ethical practices, and 25-year performance you can trust.</p>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: Factory, title: "In-house EPC", desc: "Design, supply and installation under one roof." },
              { icon: Award, title: "Tier-1 quality", desc: "Certified modules with global certifications." },
              { icon: ShieldCheck, title: "25-year warranty", desc: "Performance guarantee for long-term peace of mind." },
              { icon: Leaf, title: "Eco-first", desc: "Clean, silent energy from India's most abundant resource." },
            ].map((f, i) => (
              <Reveal key={f.title} delay={i * 0.05}>
                <div className="card-elevated h-full p-6 text-center">
                  <div className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[color:var(--brand)] to-[color:var(--brand-2)] text-white shadow-lg">
                    <f.icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-4 font-bold text-[color:var(--forest)]">{f.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{f.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
