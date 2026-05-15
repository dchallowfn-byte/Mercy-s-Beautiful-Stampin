import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Palette, Minus, Plus } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/design")({
  head: () => ({
    meta: [
      { title: "Design & Order — Mercy's Beautiful Stampin" },
      { name: "description", content: "Design your custom card. $50 each, +$25 for a 3D pop-up. Choose colors, background, message, quantity, and shipping address." },
    ],
  }),
  component: DesignPage,
});

function DesignPage() {
  const [popUp, setPopUp] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [form, setForm] = useState({
    name: "",
    email: "",
    occasion: "",
    colors: "",
    background: "",
    message: "",
    extras: "",
    popUpDescription: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    zip: "",
    country: "United States",
  });

  const unitPrice = 50 + (popUp ? 25 : 0);
  const total = useMemo(() => unitPrice * quantity, [unitPrice, quantity]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.occasion) {
      toast.error("Please fill in your name, email, and occasion.");
      return;
    }
    if (!form.address1 || !form.city || !form.state || !form.zip) {
      toast.error("Please complete your shipping address.");
      return;
    }
    if (popUp && !form.popUpDescription.trim()) {
      toast.error("Please describe the pop-up you'd like.");
      return;
    }
    const subject = encodeURIComponent(`Custom Card Order — ${form.occasion} (x${quantity})`);
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\n\n` +
      `Quantity: ${quantity}\n3D Pop-Up: ${popUp ? "Yes (+$25 each)" : "No"}\nUnit price: $${unitPrice}\nTotal: $${total}\n\n` +
      (popUp ? `Pop-up description: ${form.popUpDescription}\n\n` : "") +
      `Occasion: ${form.occasion}\nColors: ${form.colors}\nBackground: ${form.background}\nMessage inside: ${form.message}\nExtras: ${form.extras}\n\n` +
      `Shipping address:\n${form.address1}\n${form.address2 ? form.address2 + "\n" : ""}${form.city}, ${form.state} ${form.zip}\n${form.country}`
    );
    const checkoutUrl = popUp
      ? "https://mercysbeautifulstampin.mysellauth.com/product/mercys-beautiful-stampin-cards"
      : "https://mercysbeautifulstampin.mysellauth.com/product/mercys-beautiful-stampin-cards";
    // Send order details to Mercy via email, then open checkout in a new tab.
    window.open(`mailto:mercy.cuenca@gmail.com?subject=${subject}&body=${body}`, "_self");
    setTimeout(() => window.open(checkoutUrl, "_blank", "noopener,noreferrer"), 400);
    toast.success("Order details sent to Mercy — opening checkout to pay!");
  };

  return (
    <section className="bg-secondary/30">
      <div className="max-w-4xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <Palette className="w-8 h-8 mx-auto text-primary" />
          <h1 className="text-5xl md:text-6xl font-semibold mt-4">Design & Order</h1>
          <p className="text-muted-foreground mt-3">Fill in the blanks. Mercy will take it from there.</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-card rounded-3xl p-8 md:p-12 border border-border" style={{ boxShadow: "var(--shadow-soft)" }}>
          {/* Contact info */}
          <h2 className="text-xl font-semibold mb-4">Your details</h2>
          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <Label htmlFor="name">Your name</Label>
              <Input id="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} maxLength={100} className="mt-1.5" />
            </div>
            <div>
              <Label htmlFor="email">Your email</Label>
              <Input id="email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} maxLength={255} className="mt-1.5" />
            </div>
          </div>

          {/* Card details */}
          <h2 className="text-xl font-semibold mt-10 mb-4">Card details</h2>
          <div>
            <Label htmlFor="occasion">Occasion (birthday, wedding, thank you…)</Label>
            <Input id="occasion" value={form.occasion} onChange={(e) => setForm({ ...form, occasion: e.target.value })} maxLength={120} className="mt-1.5" />
          </div>
          <div className="grid md:grid-cols-2 gap-5 mt-5">
            <div>
              <Label htmlFor="colors">What colors?</Label>
              <Input id="colors" placeholder="Blush pink, sage green, gold…" value={form.colors} onChange={(e) => setForm({ ...form, colors: e.target.value })} maxLength={200} className="mt-1.5" />
            </div>
            <div>
              <Label htmlFor="background">What background / theme?</Label>
              <Input id="background" placeholder="Floral, geometric, rustic…" value={form.background} onChange={(e) => setForm({ ...form, background: e.target.value })} maxLength={200} className="mt-1.5" />
            </div>
          </div>
          <div className="mt-5">
            <Label htmlFor="message">Message inside the card</Label>
            <Textarea id="message" rows={3} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} maxLength={500} className="mt-1.5" />
          </div>
          <div className="mt-5">
            <Label htmlFor="extras">Anything else? (special details, embellishments…)</Label>
            <Textarea id="extras" rows={2} value={form.extras} onChange={(e) => setForm({ ...form, extras: e.target.value })} maxLength={500} className="mt-1.5" />
          </div>

          {/* Add-ons */}
          <h2 className="text-xl font-semibold mt-10 mb-4">Add-ons & quantity</h2>
          <label className="flex items-start gap-3 p-5 rounded-xl border border-border bg-background cursor-pointer hover:border-primary transition-colors">
            <Checkbox checked={popUp} onCheckedChange={(v) => setPopUp(!!v)} className="mt-1" />
            <div className="flex-1">
              <div className="font-semibold flex items-center justify-between">
                <span>Add a 3D pop-up</span>
                <span className="text-primary">+$25 each</span>
              </div>
              <p className="text-sm text-muted-foreground mt-1">Make your card unforgettable with a hand-built pop-up element.</p>
            </div>
          </label>

          {popUp && (
            <div className="mt-4 ml-2 pl-5 border-l-2 border-primary animate-in fade-in slide-in-from-top-2 duration-300">
              <Label htmlFor="popUpDescription">Describe your pop-up</Label>
              <p className="text-sm text-muted-foreground mt-1">What should pop up? (a flower bouquet, a cake, a heart, your pet…)</p>
              <Textarea
                id="popUpDescription"
                rows={3}
                value={form.popUpDescription}
                onChange={(e) => setForm({ ...form, popUpDescription: e.target.value })}
                maxLength={500}
                placeholder="e.g. A bouquet of pink peonies with gold leaves that lifts up when the card opens."
                className="mt-2"
              />
            </div>
          )}

          <div className="mt-5 p-5 rounded-xl border border-border bg-background flex items-center justify-between gap-4">
            <div>
              <div className="font-semibold">Quantity</div>
              <p className="text-sm text-muted-foreground">How many cards would you like?</p>
            </div>
            <div className="flex items-center gap-2">
              <Button type="button" variant="outline" size="icon" className="rounded-full" onClick={() => setQuantity((q) => Math.max(1, q - 1))} aria-label="Decrease quantity">
                <Minus className="w-4 h-4" />
              </Button>
              <Input
                type="number"
                min={1}
                max={100}
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, Math.min(100, parseInt(e.target.value) || 1)))}
                className="w-20 text-center"
              />
              <Button type="button" variant="outline" size="icon" className="rounded-full" onClick={() => setQuantity((q) => Math.min(100, q + 1))} aria-label="Increase quantity">
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Shipping */}
          <h2 className="text-xl font-semibold mt-10 mb-4">Shipping address</h2>
          <div>
            <Label htmlFor="address1">Street address</Label>
            <Input id="address1" value={form.address1} onChange={(e) => setForm({ ...form, address1: e.target.value })} maxLength={200} className="mt-1.5" />
          </div>
          <div className="mt-5">
            <Label htmlFor="address2">Apt, suite, etc. (optional)</Label>
            <Input id="address2" value={form.address2} onChange={(e) => setForm({ ...form, address2: e.target.value })} maxLength={100} className="mt-1.5" />
          </div>
          <div className="grid md:grid-cols-3 gap-5 mt-5">
            <div>
              <Label htmlFor="city">City</Label>
              <Input id="city" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} maxLength={100} className="mt-1.5" />
            </div>
            <div>
              <Label htmlFor="state">State / Region</Label>
              <Input id="state" value={form.state} onChange={(e) => setForm({ ...form, state: e.target.value })} maxLength={100} className="mt-1.5" />
            </div>
            <div>
              <Label htmlFor="zip">ZIP / Postal</Label>
              <Input id="zip" value={form.zip} onChange={(e) => setForm({ ...form, zip: e.target.value })} maxLength={20} className="mt-1.5" />
            </div>
          </div>
          <div className="mt-5">
            <Label htmlFor="country">Country</Label>
            <Input id="country" value={form.country} onChange={(e) => setForm({ ...form, country: e.target.value })} maxLength={100} className="mt-1.5" />
          </div>

          {/* Total */}
          <div className="mt-10 pt-6 border-t border-border flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="text-sm text-muted-foreground">{quantity} × ${unitPrice}</div>
              <div className="text-3xl font-semibold">${total}<span className="text-base font-normal text-muted-foreground"> total</span></div>
            </div>
            <Button type="submit" size="lg" className="rounded-full px-8">Send order & checkout</Button>
          </div>

          {/* Payment instructions */}
          <div className="mt-8 p-6 rounded-2xl border border-border bg-background">
            <h2 className="text-xl font-semibold mb-2">How payment works</h2>
            <p className="text-sm text-muted-foreground">
              When you submit, your order details are emailed to Mercy and a secure SellAuth checkout page opens in a new tab where you can pay <span className="font-semibold text-foreground">${total}</span> with card, Cash App, or PayPal.
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}
