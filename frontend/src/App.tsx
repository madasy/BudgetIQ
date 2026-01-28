import ComponentsPage from "@/components/docs/components";
import ConfigurationPage from "@/components/docs/configuration";
import InstallationPage from "@/components/docs/installation";
import IntroductionPage from "@/components/docs/introduction";
import ReleasePage from "@/components/docs/release";
import RoutingPage from "@/components/docs/routing";
import ThemeConfigPage from "@/components/docs/theme-config";
import Accounts from "@/pages/accounts";
import Budget from "@/pages/budget";
import Demo from "@/pages/demo";
import Docs from "@/pages/docs";
import Expenses from "@/pages/expenses";
import Home from "@/pages/home";
import Imports from "@/pages/imports";
import Investments from "@/pages/investments";
import Login from "@/pages/login";
import Notifications from "@/pages/notifications";
import Referrals from "@/pages/referrals";
import Reports from "@/pages/reports";
import Register from "@/pages/register";
import Savings from "@/pages/savings";
import Settings from "@/pages/settings";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import RootLayout from "./layout";
export default function Router() {
  return (
    <>
      <BrowserRouter>
        <RootLayout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/referrals" element={<Referrals />} />
            <Route path="/docs" element={<Docs />}>
              <Route
                index
                element={<Navigate to="/docs/introduction" replace />}
              />
              <Route path="introduction" element={<IntroductionPage />} />
              <Route path="installation" element={<InstallationPage />} />
              <Route path="configuration" element={<ConfigurationPage />} />
              <Route
                path="configuration/theme-config"
                element={<ThemeConfigPage />}
              />
              <Route path="components" element={<ComponentsPage />} />
              <Route path="routing" element={<RoutingPage />} />
              <Route path="release" element={<ReleasePage />} />
              <Route
                path="*"
                element={<Navigate to="/docs/introduction" replace />}
              />
            </Route>
            <Route path="/accounts" element={<Accounts />} />
            <Route path="/budget" element={<Budget />} />
            <Route path="/demo" element={<Demo />} />
            <Route path="/savings" element={<Savings />} />
            <Route path="/expenses" element={<Expenses />} />
            <Route path="/imports" element={<Imports />} />
            <Route path="/investments" element={<Investments />} />
          </Routes>
        </RootLayout>
      </BrowserRouter>
    </>
  );
}
