import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export const Route = createFileRoute("/how-it-works")({
  head: () => ({
    meta: [
      { title: "How it works — Mercy's Beautiful Stampin" },
      { name: "description", content: "Three little steps from idea to mailbox: describe your card, Mercy creates it, and it ships to you." },
    ],
  }),
  component: HowItWorks,
});

function HowItWorks() {
  const steps = [
    { n: "01", t: "Describe it", d: "Tell Mercy the occasion, colors, background, and message you want on your card." },
    { n: "02", t: "Mercy creates it", d: "Each card is hand-stamped with premium Stampin' Up!® supplies — no two are alike." },
    { n: "03", t: "Delivered to you", d: "Receive your one-of-a-kind card, ready to give and treasure." },
  ];

  return (
    <section className="max-w-6xl mx-auto px-6 py-20">
      <div className="text-center max-w-2xl mx-auto">
        <span className="text-xs uppercase tracking-[0.2em] text-primary font-medium">The process</span>
        <h1 className="text-5xl md:text-6xl font-semibold mt-4">How it works</h1>
        <p className="text-muted-foreground mt-4 text-lg">Three little steps from idea to mailbox.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mt-14">
        {steps.map((s) => (
          <div key={s.n} className="p-8 rounded-2xl bg-card border border-border" style={{ boxShadow: "var(--shadow-soft)" }}>
            <div className="text-sm tracking-[0.3em] text-primary">{s.n}</div>
            <h3 className="text-2xl font-semibold mt-3">{s.t}</h3>
            <p className="text-muted-foreground mt-2">{s.d}</p>
          </div>
        ))}
      </div>

      <div className="mt-16 text-center">
        <Link to="/design">
          <Button size="lg" className="rounded-full px-8">
            Design & Order your card <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </Link>
      </div>
    </section>
  );
}
