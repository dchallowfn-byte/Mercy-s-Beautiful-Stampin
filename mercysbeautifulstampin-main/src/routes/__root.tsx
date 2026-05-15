import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/sonner";

import appCss from "../styles.css?url";
import logo from "@/assets/logo.png";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Mercy's Beautiful Stampin" },
      { name: "description", content: "StampingWelcome to Mercy’s Beautiful Stampin’ — where every card is handcrafted with care, creativity, and love. From birthdays and weddings to Up Custom  Cards" },
      { name: "author", content: "Lovable" },
      { property: "og:title", content: "Mercy's Beautiful Stampin" },
      { property: "og:description", content: "StampingWelcome to Mercy’s Beautiful Stampin’ — where every card is handcrafted with care, creativity, and love. From birthdays and weddings to Up Custom  Cards" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:site", content: "@Lovable" },
      { name: "twitter:title", content: "Mercy's Beautiful Stampin" },
      { name: "twitter:description", content: "StampingWelcome to Mercy’s Beautiful Stampin’ — where every card is handcrafted with care, creativity, and love. From birthdays and weddings to Up Custom  Cards" },
      { property: "og:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/attachments/og-images/ccc13cc2-4540-4d2c-af2f-2de66fd684be" },
      { name: "twitter:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/attachments/og-images/ccc13cc2-4540-4d2c-af2f-2de66fd684be" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen flex flex-col bg-background text-foreground">
        <Toaster richColors position="top-center" />
        <SiteHeader />
        <main className="flex-1">
          <Outlet />
        </main>
        <SiteFooter />
      </div>
    </QueryClientProvider>
  );
}

function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 backdrop-blur-md bg-background/70 border-b border-border">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="Mercy's Beautiful Stampin logo" className="w-10 h-10 rounded-full object-cover" />
          <span className="font-semibold tracking-tight text-lg">Mercy's Beautiful Stampin'</span>
        </Link>
        <nav className="hidden md:flex items-center gap-8 text-sm">
          <Link to="/" activeOptions={{ exact: true }} activeProps={{ className: "text-primary" }} className="hover:text-primary transition-colors">Home</Link>
          <Link to="/how-it-works" activeProps={{ className: "text-primary" }} className="hover:text-primary transition-colors">How it works</Link>
          <Link to="/design" activeProps={{ className: "text-primary" }} className="hover:text-primary transition-colors">Design & Order</Link>
        </nav>
        <Link to="/design"><Button size="sm" className="rounded-full">Design & Order</Button></Link>
      </div>
    </header>
  );
}

function SiteFooter() {
  return (
    <footer id="contact" className="mt-auto border-t border-border bg-secondary/40">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 gap-10 items-start">
          <div>
            <h2 className="text-3xl md:text-4xl font-semibold">Say hello</h2>
            <p className="text-muted-foreground mt-3 max-w-md">
              Questions, custom requests, or bulk orders? Mercy would love to chat.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            <a href="mailto:mercy.cuenca@gmail.com" className="p-5 rounded-2xl border border-border bg-card hover:border-primary transition-colors flex items-center gap-3">
              <Mail className="w-5 h-5 text-primary" />
              <div>
                <div className="text-xs text-muted-foreground">Email</div>
                <div className="text-sm font-medium">mercy.cuenca@gmail.com</div>
              </div>
            </a>
            <a href="tel:+14088006362" className="p-5 rounded-2xl border border-border bg-card hover:border-primary transition-colors flex items-center gap-3">
              <Phone className="w-5 h-5 text-primary" />
              <div>
                <div className="text-xs text-muted-foreground">Phone</div>
                <div className="text-sm font-medium">(408) 800-6362</div>
              </div>
            </a>
          </div>
        </div>
        <div className="mt-12 pt-6 border-t border-border text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} Mercy's Beautiful Stampin · Made with Stampin' Up!® products
        </div>
      </div>
    </footer>
  );
}
