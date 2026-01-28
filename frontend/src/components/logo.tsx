import { Link } from "react-router-dom";

interface LogoProps {
  className?: string;
  size?: "small" | "default" | "large";
  showText?: boolean;
  firstPart?: string;
  secondPart?: string;
  href?: string;
  noLink?: boolean;
}

export function Logo({
  className = "",
  size = "default",
  showText = true,
  firstPart = "Budget",
  secondPart = "IQ",
  href = "/",
  noLink = false,
}: LogoProps) {
  const logoSizes: Record<string, string> = {
    small: "h-5 w-5",
    default: "h-8 w-8",
    large: "h-10 w-10",
  };

  const logoSize = logoSizes[size] || logoSizes.default;

  const content = (
    <>
      <div className={`relative ${logoSize} flex items-center justify-center`}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 64 64"
          className="h-full w-full"
        >
          <rect x="4" y="4" width="56" height="56" rx="14" fill="#0f172a" />
          <path
            d="M22 18h14c8 0 14 6 14 14s-6 14-14 14H22V18z"
            fill="#38bdf8"
            opacity="0.9"
          />
          <path
            d="M22 24h12c4.4 0 8 3.6 8 8s-3.6 8-8 8H22V24z"
            fill="#e2e8f0"
          />
          <rect x="30" y="28" width="4" height="12" rx="2" fill="#0f172a" />
          <rect x="36" y="30" width="4" height="10" rx="2" fill="#0f172a" />
          <rect x="42" y="32" width="4" height="8" rx="2" fill="#0f172a" />
        </svg>
      </div>
      {showText && (
        <span className="font-semibold font-sans text-3xl tracking-wider">
          <span className="text-accent-foreground">{firstPart}</span>
          <span className="text-muted-foreground">{secondPart}</span>
        </span>
      )}
    </>
  );

  if (noLink) {
    return <div className={`flex items-center gap-2 ${className}`}>{content}</div>;
  }

  return (
    <Link to={href} className={`flex items-center gap-2 ${className}`}>
      {content}
    </Link>
  );
}
