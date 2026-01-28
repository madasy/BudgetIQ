// src/components/cards/credit-card-component.tsx
import { cn } from "@/lib/utils";
import React from "react";

interface CreditCardComponentProps {
  type: string;
  variant: string;
  holder: string;
  balance: string;
  last4: string;
  expires: string;
  icon: React.ElementType;
  logo?: React.ReactNode | React.ElementType; // ✅ supports <img> OR imported SVG component
  className?: string;
  gradient?: string;
}

const CreditCardComponent: React.FC<CreditCardComponentProps> = ({
  type,
  variant,
  holder,
  balance,
  last4,
  expires,
  icon: Icon,
  logo: Logo,
  className,
  gradient,
}) => {
  const displayName = `${type} ${variant}`;
  return (
    <div
      className={cn(
        "w-full max-w-lg rounded-xl p-6 shadow-lg text-primary-foreground relative overflow-hidden flex flex-col justify-between",
        "bg-primary",
        className,
        gradient
      )}
    >
      {/* Card Top */}
      <div className="flex justify-between items-center">
        {Icon && <Icon className="w-6 h-6 opacity-70" />}
        <span className="text-md font-bold tracking-wide">{displayName}</span>
        {Logo &&
          (typeof Logo === "function" ? (
            <Logo className="h-6 w-auto" />
          ) : (
            <div className="h-6 w-auto">{Logo}</div>
          ))}
      </div>
      {/* Card Body */}
      <div className="mt-6 space-y-2">
        <div className="w-10 h-8 bg-accent rounded-sm mt-4 mb-2 shadow-inner" />
        <div className="text-lg font-medium mb-1">{balance}</div>
        <p className="tracking-widest text-lg font-mono">
          **** **** **** {last4}
        </p>
        <div className="flex justify-between text-sm">
          <div>
            <p className="uppercase text-xs">Card Holder</p>
            <p className="font-semibold">{holder}</p>
          </div>
          <div>
            <p className="uppercase text-xs">Expires</p>
            <p className="font-semibold">{expires}</p>
          </div>
        </div>
      </div>
      {/* Background Decoration */}
      <div className="absolute w-40 h-40 bg-muted opacity-10 rounded-full -bottom-10 -right-10"></div>
    </div>
  );
};

export default CreditCardComponent;
