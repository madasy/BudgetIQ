

import { Logo } from "@/components/logo";
import {
    Book,
    ChevronUp,
    Drone,
    Edit3,
    Frame,
    Layers,
    Menu,
    Moon,
    Palette,
    PieChart,
    RefreshCw,
    Smartphone,
    Star,
    Sun,
    SunMoon,
    Table,
    TrendingUp,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

// Define interface for icon map
interface IconMap {
  [key: string]: React.ComponentType<{ className?: string }>;
}

// Define icon map with type
const iconMap: IconMap = {
  TrendingUp,
  SunMoon,
  Layers,
  Palette,
  Star,
  Smartphone,
  Edit3,
  PieChart,
  Table,
  RefreshCw,
  Book,
  Frame,
  Drone,
};

// Define interfaces for component data
interface Page {
  href: string;
  img: string;
  text: string;
  alt: string;
}

interface Feature {
  icon: string;
  title: string;
  desc: string;
}

interface Review {
  name: string;
  category: string;
  review: string;
}

export default function DemoPage() {
  const [isDark, setIsDark] = useState<boolean>(false);

  const toggleTheme = (): void => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center">
      {/* Theme Script - Inline for demo */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            (function() {
              const savedTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
              if (savedTheme === 'dark') {
                document.documentElement.classList.add('dark');
              }
            })();
          `,
        }}
      />

      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
        <div className="container mx-auto h-16  flex items-center justify-between">
          <div className="flex items-center flex-row gap-3">
            <div className="flex items-center justify-center relative overflow-hidden h-10 w-auto rounded-full">
              <div className="flex h-16 shrink-0 items-center py-4 px-4">
                <Logo />
              </div>
            </div>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link
              to="#intro"
              className="text-sm font-medium hover:text-primary"
            >
              Home
            </Link>
            <Link
              to="#pages"
              className="text-sm font-medium hover:text-primary"
            >
              Pages
            </Link>
            <Link
              to="#features"
              className="text-sm font-medium hover:text-primary"
            >
              Features
            </Link>
            <Link
              to="#reviews"
              className="text-sm font-medium hover:text-primary"
            >
              Reviews
            </Link>
            <Link
              to="#support"
              className="text-sm font-medium hover:text-primary"
            >
              Support
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <button
              onClick={toggleTheme}
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:bg-accent hover:text-accent-foreground h-9 w-9 rounded-full relative bg-card shadow"
              aria-label="Switch to dark mode"
            >
              <Sun
                className={`h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0`}
              />
              <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            </button>
            <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-3xl text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
              Buy Now
            </button>
            <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-3xl text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 w-10 md:hidden">
              <Menu className="h-4 w-4" />
              <span className="sr-only">Toggle menu</span>
            </button>
          </div>
        </div>
      </header>

      <main>
        <section id="intro" className="py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-6">
                <div className="space-y-3">
                  <h1 className="text-xl font-medium tracking-tighter sm:text-2xl md:text-3xl">
                    BudgetIQ - Personal Finance Dashboard
                  </h1>
                  <p className="text-muted-foreground">
                    BudgetIQ is a personal finance dashboard tailored for
                    managing accounts, imports, and investments in one place.
                  </p>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <h3 className="text-2xl font-bold">12+</h3>
                    <p className="text-sm text-muted-foreground">Pages</p>
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-2xl font-bold">50+</h3>
                    <p className="text-sm text-muted-foreground">Components</p>
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-2xl font-bold">100+</h3>
                    <p className="text-sm text-muted-foreground">Widgets</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-3">
                  <Link
                    target="_blank"
                    to="/"
                    className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-primary text-primary-foreground hover:bg-primary/90 h-11 rounded-3xl px-8"
                  >
                    View Demo
                  </Link>
                  <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-11 rounded-3xl px-8">
                    <span>Get Started</span>
                  </button>
                </div>
              </div>
              <div className="relative overflow-hidden border rounded-3xl bg-muted/50 shadow-lg h-100 md:h-[400px] lg:h-[500px]">
                <img
                  src="/images/demo/1.jpg"
                  alt="BudgetIQ dashboard"
                  className="shadow-lg transition-transform duration-500 ease-in-out hover:scale-105 object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-muted/50" />
              </div>
            </div>
          </div>
        </section>

        <section id="pages" className="py-12 md:py-24 bg-muted/30">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="inline-block rounded-3xl bg-muted px-3 py-1 text-sm">
                Pages
              </div>
              <h2 className="text-xl font-bold tracking-tighter">
                Explore a Package Loaded with Interactive Live Demos
              </h2>
            </div>
            <div className="mt-16 grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {(
                [
                  {
                    href: "/",
                    img: "/images/demo/1.jpg",
                    text: "Dashboard",
                    alt: "Dashboard page preview",
                  },
                  {
                    href: "/budget",
                    img: "/images/demo/2.jpg",
                    text: "Wallets",
                    alt: "Budget Planning",
                  },
                  {
                    href: "/expenses",
                    img: "/images/demo/3.jpg",
                    text: "Budgets",
                    alt: "Expenses",
                  },
                  {
                    href: "/savings",
                    img: "/images/demo/4.jpg",
                    text: "Goals",
                    alt: "Savings Goals",
                  },
                  {
                    href: "/accounts",
                    img: "/images/demo/5.jpg",
                    text: "Profile",
                    alt: "Accounts Cards",
                  },
                  {
                    href: "/reports",
                    img: "/images/demo/6.jpg",
                    text: "Analytics",
                    alt: "Reports",
                  },
                  {
                    href: "/referrals",
                    img: "/images/demo/7.jpg",
                    text: "Referrals",
                    alt: "Referrals",
                  },
                  {
                    href: "/settings",
                    img: "/images/demo/8.jpg",
                    text: "Profile",
                    alt: "Settings-Profile",
                  },
                  {
                    href: "/settings",
                    img: "/images/demo/9.jpg",
                    text: "App",
                    alt: "Settings-App",
                  },
                  {
                    href: "/settings",
                    img: "/images/demo/10.jpg",
                    text: "Security",
                    alt: "Settings-Security",
                  },
                  {
                    href: "/settings",
                    img: "/images/demo/11.jpg",
                    text: "Help",
                    alt: "Settings-Help",
                  },
                  {
                    href: "/settings",
                    img: "/images/demo/12.jpg",
                    text: "Resource",
                    alt: "Settings-Resources",
                  },
                  {
                    href: "/login",
                    img: "/images/demo/13.jpg",
                    text: "Login",
                    alt: "Auth-Login",
                  },
                  {
                    href: "/register",
                    img: "/images/demo/14.jpg",
                    text: "Sign up",
                    alt: "Auth-Sign-up",
                  },
                  {
                    href: "/forgot-password",
                    img: "/images/demo/15.jpg",
                    text: "Forgot Password",
                    alt: "Auth-Forgot-Password",
                  },
                  {
                    href: "/reset-password",
                    img: "/images/demo/16.jpg",
                    text: "Reset Password",
                    alt: "Auth-Reset-Password",
                  },
                ] as Page[]
              ).map((page: Page, index: number) => (
                <Link
                  key={index}
                  to={page.href}
                  className="group relative text-center border rounded-3xl bg-background"
                >
                  <div className="aspect-4/2 overflow-hidden">
                    <img
                      src={`${page.img}?height=300&width=400&text=${page.text}`}
                      alt={page.alt}
                      width={400}
                      height={300}
                      className="rounded-tl-3xl rounded-tr-3xl w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium">{page.text}</h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section id="features" className="py-12 md:py-24 bg-muted/30">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="inline-block rounded-3xl bg-muted px-3 py-1 text-sm">
                Features
              </div>
              <h2 className="text-xl font-bold tracking-tighter sm:text-2xl md:text-3xl">
                Extraordinary Features, Endless Flexibility
              </h2>
            </div>
            <div className="mt-16 grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {(
                [
                  {
                    icon: "TrendingUp",
                    title: "Money Management Flow",
                    desc: "We built this specifically for money management applications. So the flow of money is all covered here.",
                  },
                  {
                    icon: "SunMoon",
                    title: "Light & Dark",
                    desc: "Included Light & Dark for getting desire look and feel.",
                  },
                  {
                    icon: "Layers",
                    title: "12+ Pages & 50+ Components ",
                    desc: "No more pages but covered all necessary components to meet specific goal",
                  },
                  {
                    icon: "Palette",
                    title: "Tailwind CSS",
                    desc: "BudgetIQ Dashboard is built with Tailwind CSS, so you can easily customize it.",
                  },
                  {
                    icon: "Drone",
                    title: "TypeScript",
                    desc: "TypeScript raises the floor on code quality while protecting delivery pace, customer trust, and audit needs in fintech.",
                  },
                  {
                    icon: "Frame",
                    title: "React 19 & Vite",
                    desc: "The BudgetIQ Dashboard is constructed using React 19 and Vite, offering a fast and modern development experience.",
                  },
                  {
                    icon: "Star",
                    title: "Lucide Icons",
                    desc: "Here we use Lucide Icon which will make you easy to develop your application.",
                  },
                  {
                    icon: "Smartphone",
                    title: "Fully Responsive",
                    desc: "All the layout of BudgetIQ Admin Dashboard is Fully Responsive and widely tested.",
                  },
                  {
                    icon: "Edit3",
                    title: "Easy to Customize",
                    desc: "Customization will be easy as we understand your pain.",
                  },
                  {
                    icon: "PieChart",
                    title: "Rechart",
                    desc: "You used modern and powerful charts to generate reports from Recharts.",
                  },
                  {
                    icon: "Table",
                    title: "Necessary Tables",
                    desc: "Here also available all necessary tables for data presentation.",
                  },
                  {
                    icon: "RefreshCw",
                    title: "Regular Updates",
                    desc: "We are constantly updating our pack with new features.",
                  },
                  {
                    icon: "Book",
                    title: "Detailed Documentation",
                    desc: "We have made detailed documentation, so it will easy to use.",
                  },
                ] as Feature[]
              ).map((feature: Feature, idx: number) => {
                const IconComponent = iconMap[feature.icon];
                return (
                  <div
                    key={idx}
                    className="rounded-3xl border-0 bg-card text-card-foreground shadow-sm"
                  >
                    <div className="p-6">
                      <div className="flex flex-col items-center text-center space-y-2">
                        <div className="rounded-full bg-primary/10 p-3 text-primary">
                          {IconComponent && (
                            <IconComponent className="h-6 w-6" />
                          )}
                        </div>
                        <h3 className="text-xl font-medium">{feature.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          {feature.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section id="reviews" className="py-12 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="inline-block rounded-3xl bg-muted px-3 py-1 text-sm">
                Reviews
              </div>
              <h2 className="text-xl font-bold tracking-tighter sm:text-2xl md:text-3xl">
                Read, what our customers say on our profile!
              </h2>
            </div>
            <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {(
                [
                  {
                    name: "for Design Quality",
                    category: "TechWave - AI React NextJS Admin Template",
                    review:
                      "Very nice, well-documented, and clean code, and one-of-a-kind support.",
                  },
                  {
                    name: "for Customer Support",
                    category:
                      "Cavani | Tailwind NextJs Personal Portfolio Template",
                    review:
                      "Great design and excellent customer support, completely satisfied and recommended.",
                  },
                  {
                    name: "for Code Quality",
                    category:
                      "Tapsi | Personal Portfolio React NextJS Template",
                    review:
                      "Outstanding design and very dynamic code quality. This is perfection.",
                  },
                ] as Review[]
              ).map((review: Review, idx: number) => (
                <div
                  key={idx}
                  className="rounded-3xl border-0 bg-card text-card-foreground shadow-sm"
                >
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-muted flex shrink-0 items-center justify-center">
                          <img
                            src="/images/demo/envato.jpg"
                            alt="Reviewer avatar"
                            width={40}
                            height={40}
                            className="rounded-full"
                          />
                        </div>
                        <div>
                          <h4 className="font-medium">{review.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            {review.category}
                          </p>
                        </div>
                      </div>
                      <div className="flex text-amber-500">
                        {[...Array(5)].map((_, i: number) => (
                          <svg
                            key={i}
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-4 w-4"
                          >
                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                          </svg>
                        ))}
                      </div>
                    </div>
                    <p className="text-sm">{review.review}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t py-6 md:py-0 w-full">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row mx-auto">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            © 2025 BudgetIQ. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link
              to="#"
              className="text-muted-foreground hover:text-foreground"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
              >
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
              <span className="sr-only">Facebook</span>
            </Link>
            <Link
              to="#"
              className="text-muted-foreground hover:text-foreground"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
              >
                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
              </svg>
              <span className="sr-only">Twitter</span>
            </Link>
            <Link
              to="#"
              className="text-muted-foreground hover:text-foreground"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
              >
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect width="4" height="12" x="2" y="9" />
                <circle cx="4" cy="4" r="2" />
              </svg>
              <span className="sr-only">LinkedIn</span>
            </Link>
            <Link
              to="#"
              className="text-muted-foreground hover:text-foreground"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
              >
                <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
                <path d="m10 15 5-3-5-3z" />
              </svg>
              <span className="sr-only">YouTube</span>
            </Link>
          </div>
        </div>
      </footer>

      <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 w-10 fixed bottom-4 right-4 rounded-full shadow-md">
        <ChevronUp className="h-4 w-4" />
        <span className="sr-only">Scroll to top</span>
      </button>
    </div>
  );
}
