import { createFileRoute, Link } from "@tanstack/react-router";
import heroCard from "@/assets/hero-card.jpg";
import { Button } from "@/components/ui/button";
import { Sparkles, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Mercy's Beautiful Stampin — Handmade Custom Cards" },
      { name: "description", content: "Handcrafted custom greeting cards made with Stampin' Up! products. $50 each, fully personalized. Add a 3D pop-up for $25." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <section className="relative overflow-hidden" style={{ background: "var(--gradient-hero)" }}>
      <div className="max-w-6xl mx-auto px-6 py-20 md:py-28 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-primary font-medium">
            <Sparkles className="w-3.5 h-3.5" /> Handmade with love
          </span>
          <h1 className="mt-4 text-5xl md:text-7xl font-semibold leading-[0.95]">
            A card as <em className="italic text-primary">unique</em> as the moment.
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-md">
            Custom greeting cards crafted with Stampin' Up!® products. You describe it — colors, background, message — Mercy makes it.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link to="/design">
              <Button size="lg" className="rounded-full px-8">
                Design & Order · $50 <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
            <Link to="/how-it-works">
              <Button size="lg" variant="outline" className="rounded-full px-8">How it works</Button>
            </Link>
          </div>
        </div>
        <div className="relative">
          <div className="absolute -inset-4 bg-accent/30 blur-3xl rounded-full" />
          <img
            src={heroCard}
            alt="Handmade pop-up greeting card with floral stamping"
            width={1536}
            height={1152}
            className="relative rounded-2xl shadow-2xl"
            style={{ boxShadow: "var(--shadow-soft)" }}
          />
        </div>
      </div>
    </section>
  );
}
