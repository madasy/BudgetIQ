import { Layout } from "@/components/layout";
import { EarningsOverview } from "@/components/referrals/earnings-overview";
import { HowItWorks } from "@/components/referrals/how-it-works";
import { ReferralsHeader } from "@/components/referrals/referrals-header";
import { ReferralsLink } from "@/components/referrals/referrals-link";

export default function ReferralsPage() {
  return (
    <Layout>
      <div className="space-y-6">
        <ReferralsHeader />
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <ReferralsLink />
            <HowItWorks />
          </div>
          <div>
            <EarningsOverview />
          </div>
        </div>
      </div>
    </Layout>
  );
}
