import { Layout } from "@/components/layout";
import { SettingsHeader } from "@/components/settings/settings-header";
import { SettingsTabs } from "@/components/settings/settings-tabs";

export default function SettingsPage() {
  return (
    <Layout>
      <div className="space-y-6">
        <SettingsHeader />
        <SettingsTabs />
      </div>
    </Layout>
  );
}
