"use client";

import DocsLayout from "@/components/docs/DocsLayout";
import { useI18n } from "@/lib/i18n-provider";

export default function DocsPage() {
  const { t, ta } = useI18n();

  const sections = [
    {
      id: "getting-started",
      title: t("docsContent.gettingStarted.title"),
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 10V3L4 14h7v7l9-11h-7z"
          />
        </svg>
      ),
      content: (
        <div className="space-y-4 text-text-secondary">
          <p className="text-lg leading-relaxed">
            {t("docsContent.gettingStarted.intro")}
          </p>

          <h3 className="text-xl font-semibold text-white mt-6 mb-3">
            {t("docsContent.gettingStarted.quickStartTitle")}
          </h3>
          <ol className="list-decimal list-inside space-y-2 ml-4">
            {ta<string[]>("docsContent.gettingStarted.quickStartSteps", {
              returnObjects: true,
            }).map((step, i) => (
              <li key={i}>{step}</li>
            ))}
          </ol>

          <div className="mt-6 p-4 rounded-lg bg-accent/10 border border-accent/20">
            <div className="flex items-start gap-3">
              <svg
                className="w-5 h-5 text-accent flex-shrink-0 mt-0.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                />
              </svg>
              <p className="text-accent font-medium">
                <strong>{t("docsContent.tip")}:</strong>{" "}
                {t("docsContent.gettingStarted.tip")}
              </p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "account-setup",
      title: t("docsContent.accountSetup.title"),
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          />
        </svg>
      ),
      content: (
        <div className="space-y-4 text-text-secondary">
          <h3 className="text-xl font-semibold text-white mb-3">
            {t("docsContent.accountSetup.creatingAccount")}
          </h3>
          <p className="leading-relaxed">
            {t("docsContent.accountSetup.accountDesc")}
          </p>

          <h3 className="text-xl font-semibold text-white mt-6 mb-3">
            {t("docsContent.accountSetup.businessProfile")}
          </h3>
          <p className="leading-relaxed mb-3">
            {t("docsContent.accountSetup.profileDesc")}
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            {ta<string[]>("docsContent.accountSetup.profileFields", {
              returnObjects: true,
            }).map((field, i) => (
              <li key={i} dangerouslySetInnerHTML={{ __html: field }} />
            ))}
          </ul>

          <div className="mt-6 p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
            <div className="flex items-start gap-3">
              <svg
                className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <p className="text-blue-400 font-medium">
                <strong>{t("docsContent.note")}:</strong>{" "}
                {t("docsContent.accountSetup.note")}
              </p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "creating-invoices",
      title: t("docsContent.creatingInvoices.title"),
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
      ),
      content: (
        <div className="space-y-4 text-text-secondary">
          <h3 className="text-xl font-semibold text-white mb-3">
            {t("docsContent.creatingInvoices.builder")}
          </h3>
          <p className="leading-relaxed">
            {t("docsContent.creatingInvoices.builderDesc")}
          </p>

          <h4 className="text-lg font-semibold text-white mt-6 mb-3">
            {t("docsContent.creatingInvoices.stepByStep")}
          </h4>
          <ol className="list-decimal list-inside space-y-3 ml-4">
            {ta<string[]>("docsContent.creatingInvoices.steps", {
              returnObjects: true,
            }).map((step, i) => (
              <li key={i} dangerouslySetInnerHTML={{ __html: step }} />
            ))}
          </ol>

          <h4 className="text-lg font-semibold text-white mt-6 mb-3">
            {t("docsContent.creatingInvoices.fieldsTitle")}
          </h4>
          <div className="space-y-2">
            {ta<Array<{ label: string; desc: string }>>(
              "docsContent.creatingInvoices.fields",
              { returnObjects: true }
            ).map((field, i) => (
              <div
                key={i}
                className="p-3 rounded-lg bg-bg-elevated border border-bg-border"
              >
                <strong className="text-white">{field.label}:</strong>{" "}
                {field.desc}
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      id: "customer-management",
      title: t("docsContent.customerManagement.title"),
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
      ),
      content: (
        <div className="space-y-4 text-text-secondary">
          <p className="leading-relaxed">
            {t("docsContent.customerManagement.intro")}
          </p>

          <h3 className="text-xl font-semibold text-white mt-6 mb-3">
            {t("docsContent.customerManagement.addingTitle")}
          </h3>
          <p className="leading-relaxed mb-3">
            {t("docsContent.customerManagement.addingDesc")}
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            {ta<string[]>("docsContent.customerManagement.requiredInfo", {
              returnObjects: true,
            }).map((info, i) => (
              <li key={i}>{info}</li>
            ))}
          </ul>

          <h3 className="text-xl font-semibold text-white mt-6 mb-3">
            {t("docsContent.customerManagement.managingTitle")}
          </h3>
          <ul className="list-disc list-inside space-y-2 ml-4">
            {ta<string[]>("docsContent.customerManagement.managingActions", {
              returnObjects: true,
            }).map((action, i) => (
              <li key={i} dangerouslySetInnerHTML={{ __html: action }} />
            ))}
          </ul>

          <div className="mt-6 p-4 rounded-lg bg-accent/10 border border-accent/20">
            <div className="flex items-start gap-3">
              <svg
                className="w-5 h-5 text-accent flex-shrink-0 mt-0.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                />
              </svg>
              <p className="text-accent font-medium">
                <strong>{t("docsContent.tip")}:</strong>{" "}
                {t("docsContent.customerManagement.tip")}
              </p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "bilingual-invoices",
      title: t("docsContent.bilingualInvoices.title"),
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
          />
        </svg>
      ),
      content: (
        <div className="space-y-4 text-text-secondary">
          <p className="leading-relaxed">
            {t("docsContent.bilingualInvoices.intro")}
          </p>

          <h3 className="text-xl font-semibold text-white mt-6 mb-3">
            {t("docsContent.bilingualInvoices.howItWorks")}
          </h3>
          <ul className="list-disc list-inside space-y-2 ml-4">
            {ta<string[]>("docsContent.bilingualInvoices.features", {
              returnObjects: true,
            }).map((feature, i) => (
              <li key={i}>{feature}</li>
            ))}
          </ul>

          <h3 className="text-xl font-semibold text-white mt-6 mb-3">
            {t("docsContent.bilingualInvoices.settingsTitle")}
          </h3>
          <p className="leading-relaxed mb-3">
            {t("docsContent.bilingualInvoices.settingsDesc")}
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            {ta<string[]>("docsContent.bilingualInvoices.languageOptions", {
              returnObjects: true,
            }).map((option, i) => (
              <li key={i} dangerouslySetInnerHTML={{ __html: option }} />
            ))}
          </ul>

          <div className="mt-6 p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
            <div className="flex items-start gap-3">
              <svg
                className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <p className="text-blue-400 font-medium">
                <strong>{t("docsContent.note")}:</strong>{" "}
                {t("docsContent.bilingualInvoices.note")}
              </p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "payment-tracking",
      title: t("docsContent.paymentTracking.title"),
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
          />
        </svg>
      ),
      content: (
        <div className="space-y-4 text-text-secondary">
          <p className="leading-relaxed">
            {t("docsContent.paymentTracking.intro")}
          </p>

          <h3 className="text-xl font-semibold text-white mt-6 mb-3">
            {t("docsContent.paymentTracking.statusesTitle")}
          </h3>
          <div className="space-y-3">
            {ta<Array<{ color: string; label: string; desc: string }>>(
              "docsContent.paymentTracking.statuses",
              { returnObjects: true }
            ).map((status, i) => {
              const colorClass =
                status.color === "yellow"
                  ? "bg-yellow-500"
                  : status.color === "blue"
                  ? "bg-blue-500"
                  : status.color === "green"
                  ? "bg-green-500"
                  : status.color === "red"
                  ? "bg-red-500"
                  : "bg-gray-500";
              return (
                <div
                  key={i}
                  className="p-4 rounded-lg bg-bg-elevated border border-bg-border"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`w-3 h-3 rounded-full ${colorClass}`}></div>
                    <strong className="text-white">{status.label}</strong>
                  </div>
                  <p>{status.desc}</p>
                </div>
              );
            })}
          </div>

          <h3 className="text-xl font-semibold text-white mt-6 mb-3">
            {t("docsContent.paymentTracking.remindersTitle")}
          </h3>
          <p className="leading-relaxed">
            {t("docsContent.paymentTracking.remindersDesc")}
          </p>
        </div>
      ),
    },
    {
      id: "dashboard",
      title: t("docsContent.dashboard.title"),
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
          />
        </svg>
      ),
      content: (
        <div className="space-y-4 text-text-secondary">
          <p className="leading-relaxed">{t("docsContent.dashboard.intro")}</p>

          <h3 className="text-xl font-semibold text-white mt-6 mb-3">
            {t("docsContent.dashboard.metricsTitle")}
          </h3>
          <ul className="list-disc list-inside space-y-2 ml-4">
            {ta<string[]>("docsContent.dashboard.metrics", {
              returnObjects: true,
            }).map((metric, i) => (
              <li key={i} dangerouslySetInnerHTML={{ __html: metric }} />
            ))}
          </ul>

          <h3 className="text-xl font-semibold text-white mt-6 mb-3">
            {t("docsContent.dashboard.activityTitle")}
          </h3>
          <p className="leading-relaxed">
            {t("docsContent.dashboard.activityDesc")}
          </p>

          <h3 className="text-xl font-semibold text-white mt-6 mb-3">
            {t("docsContent.dashboard.actionsTitle")}
          </h3>
          <ul className="list-disc list-inside space-y-2 ml-4">
            {ta<string[]>("docsContent.dashboard.actions", {
              returnObjects: true,
            }).map((action, i) => (
              <li key={i}>{action}</li>
            ))}
          </ul>
        </div>
      ),
    },
    {
      id: "settings",
      title: t("docsContent.settings.title"),
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      ),
      content: (
        <div className="space-y-4 text-text-secondary">
          <p className="leading-relaxed">{t("docsContent.settings.intro")}</p>

          <h3 className="text-xl font-semibold text-white mt-6 mb-3">
            {t("docsContent.settings.businessTitle")}
          </h3>
          <ul className="list-disc list-inside space-y-2 ml-4">
            {ta<string[]>("docsContent.settings.businessSettings", {
              returnObjects: true,
            }).map((setting, i) => (
              <li key={i}>{setting}</li>
            ))}
          </ul>

          <h3 className="text-xl font-semibold text-white mt-6 mb-3">
            {t("docsContent.settings.appearanceTitle")}
          </h3>
          <ul className="list-disc list-inside space-y-2 ml-4">
            {ta<string[]>("docsContent.settings.appearanceSettings", {
              returnObjects: true,
            }).map((setting, i) => (
              <li key={i} dangerouslySetInnerHTML={{ __html: setting }} />
            ))}
          </ul>

          <h3 className="text-xl font-semibold text-white mt-6 mb-3">
            {t("docsContent.settings.accountTitle")}
          </h3>
          <ul className="list-disc list-inside space-y-2 ml-4">
            {ta<string[]>("docsContent.settings.accountSettings", {
              returnObjects: true,
            }).map((setting, i) => (
              <li key={i}>{setting}</li>
            ))}
          </ul>

          <div className="mt-6 p-4 rounded-lg bg-red-500/10 border border-red-500/20">
            <div className="flex items-start gap-3">
              <svg
                className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
              <p className="text-red-400 font-medium">
                <strong>{t("docsContent.warning")}:</strong>{" "}
                {t("docsContent.settings.warning")}
              </p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "tax-compliance",
      title: t("docsContent.taxCompliance.title"),
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
          />
        </svg>
      ),
      content: (
        <div className="space-y-4 text-text-secondary">
          <p className="leading-relaxed">
            {t("docsContent.taxCompliance.intro")}
          </p>

          <h3 className="text-xl font-semibold text-white mt-6 mb-3">
            {t("docsContent.taxCompliance.requiredTitle")}
          </h3>
          <ul className="list-disc list-inside space-y-2 ml-4">
            {ta<string[]>("docsContent.taxCompliance.requiredInfo", {
              returnObjects: true,
            }).map((info, i) => (
              <li key={i} dangerouslySetInnerHTML={{ __html: info }} />
            ))}
          </ul>

          <h3 className="text-xl font-semibold text-white mt-6 mb-3">
            {t("docsContent.taxCompliance.vatTitle")}
          </h3>
          <p className="leading-relaxed mb-3">
            {t("docsContent.taxCompliance.vatDesc")}
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            {ta<string[]>("docsContent.taxCompliance.vatRates", {
              returnObjects: true,
            }).map((rate, i) => (
              <li key={i}>{rate}</li>
            ))}
          </ul>

          <h3 className="text-xl font-semibold text-white mt-6 mb-3">
            {t("docsContent.taxCompliance.invoiceTitle")}
          </h3>
          <p className="leading-relaxed mb-3">
            {t("docsContent.taxCompliance.invoiceDesc")}
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            {ta<string[]>("docsContent.taxCompliance.invoiceRequirements", {
              returnObjects: true,
            }).map((req, i) => (
              <li key={i}>{req}</li>
            ))}
          </ul>

          <div className="mt-6 p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
            <div className="flex items-start gap-3">
              <svg
                className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <p className="text-blue-400 font-medium">
                <strong>{t("docsContent.note")}:</strong>{" "}
                {t("docsContent.taxCompliance.note")}
              </p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "faq",
      title: t("docsContent.faq.title"),
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      content: (
        <div className="space-y-6 text-text-secondary">
          {ta<Array<{ q: string; a: string }>>("docsContent.faq.items", {
            returnObjects: true,
          }).map((item, i) => (
            <div key={i}>
              <h4 className="text-lg font-semibold text-white mb-2">
                {item.q}
              </h4>
              <p
                className="leading-relaxed"
                dangerouslySetInnerHTML={{ __html: item.a }}
              />
            </div>
          ))}
        </div>
      ),
    },
  ];

  return <DocsLayout sections={sections} />;
}
