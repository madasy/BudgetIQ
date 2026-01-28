import CreditCardComponent from "@/components/cards/credit-card-component";
import MastercardLogo from "@/components/cards/mastercard-logo.svg?url";
import { CreditCard } from "lucide-react";

const MasterCard = () => (
  <CreditCardComponent
    type="Visa"
    variant="Gold"
    holder="John Doe"
    balance="$3,254"
    last4="1234"
    expires="12/27"
    icon={CreditCard}
    logo={<img src={MastercardLogo} alt="Visa" className="h-6 w-auto" />}
    className="bg-secondary text-secondary-foreground"
  />
);

export default MasterCard;
