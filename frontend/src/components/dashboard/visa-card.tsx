import CreditCardComponent from "@/components/cards/credit-card-component";
import VisacardLogo from "@/components/cards/visacard-logo.svg";
import { CreditCard } from "lucide-react";

const VisaCard = () => {
  return (
    <CreditCardComponent
      type="Visa"
      variant="Gold"
      holder="John Doe"
      balance="$3,254"
      last4="1234"
      expires="12/27"
      icon={CreditCard}
      logo={VisacardLogo}
      className="bg-primary text-primary-foreground"
    />
  );
};

export default VisaCard;
