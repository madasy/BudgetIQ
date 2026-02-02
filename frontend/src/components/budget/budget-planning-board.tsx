import { Input } from "@/components/ui/input";
import { apiFetch } from "@/lib/api";
import { cn } from "@/lib/utils";
import { useCallback, useEffect, useMemo, useState } from "react";

const DETAIL_GROUPS = [
  "Migros Kreditkarte",
  "WISE",
  "Spenden",
  "Jaehrliche Kosten",
];

type BudgetKind = "income" | "expense" | "detail";

interface Category {
  id: number;
  name: string;
  kind?: string | null;
}

interface BudgetItem {
  id: number;
  category_id: number;
  kind: BudgetKind;
  amount: string | number;
  currency: string;
  group_name?: string | null;
  position?: number | null;
  parent_item_id?: number | null;
  category?: Category | null;
}

interface BudgetPlan {
  id: number;
  name?: string | null;
  is_current: boolean;
  base_currency: string;
  items: BudgetItem[];
}

interface TableSection {
  title: string;
  tone: string;
  rows: BudgetItem[];
  footer?: { label: string; value: string };
}

interface BudgetPlanningBoardProps {
  refreshToken?: number;
}

const SALARY_CATEGORY_NAMES = [
  "Bruttolohn",
  "Bruttolohn (Netto)",
  "Personenlohn",
  "Personenlohn (Netto)",
  "Personenlohn Netto",
  "Lohn",
  "Salary",
];

const SALARY_DEDUCTIONS = [
  { label: "AHV", type: "percent" as const, rate: 0.053 },
  { label: "ALV", type: "percent" as const, rate: 0.011 },
  { label: "NBUV-Beitrag", type: "percent" as const, rate: 0.00974 },
  { label: "KTG-Beitrag", type: "percent" as const, rate: 0.00846 },
  { label: "PK/BVG-Beitrag", type: "fixed" as const, amount: 305 },
  { label: "Mobile", type: "fixed" as const, amount: 30 },
  { label: "Reduktion Geschaeftswagen", type: "fixed" as const, amount: 475.5 },
];

const formatMoney = (value: number, currency: string) => {
  try {
    return new Intl.NumberFormat("de-CH", {
      style: "currency",
      currency,
      maximumFractionDigits: 0,
    }).format(value);
  } catch {
    return `${currency} ${value.toFixed(0)}`;
  }
};

const formatMoneyDetailed = (value: number, currency: string) => {
  try {
    return new Intl.NumberFormat("de-CH", {
      style: "currency",
      currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  } catch {
    return `${currency} ${value.toFixed(2)}`;
  }
};

const toNumber = (value: string | number) => {
  if (typeof value === "number") return value;
  const parsed = Number(value);
  return Number.isNaN(parsed) ? 0 : parsed;
};

const roundToTwo = (value: number) => Math.round(value * 100) / 100;

function AmountInput({
  value,
  currency,
  onCommit,
}: {
  value: number;
  currency: string;
  onCommit: (amount: number) => void;
}) {
  const [draft, setDraft] = useState(String(value));

  useEffect(() => {
    setDraft(String(value));
  }, [value]);

  const commit = useCallback(() => {
    const parsed = Number(draft);
    if (Number.isNaN(parsed)) {
      setDraft(String(value));
      return;
    }
    onCommit(parsed);
  }, [draft, onCommit, value]);

  return (
    <div className="flex items-center gap-2">
      <Input
        type="number"
        min={0}
        step={10}
        value={draft}
        onChange={(event) => setDraft(event.target.value)}
        onBlur={commit}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            commit();
            event.currentTarget.blur();
          }
          if (event.key === "Escape") {
            setDraft(String(value));
            event.currentTarget.blur();
          }
        }}
        className="h-8 w-28 bg-slate-900/70 text-right text-sm"
      />
      <span className="text-xs text-slate-400">{currency}</span>
    </div>
  );
}

function calculateNetSalary(gross: number) {
  const deductions = SALARY_DEDUCTIONS.map((item) => {
    if (item.type === "percent") {
      return { label: item.label, amount: roundToTwo(gross * item.rate) };
    }
    return { label: item.label, amount: item.amount };
  });
  const totalDeductions = roundToTwo(deductions.reduce((sum, item) => sum + item.amount, 0));
  const net = roundToTwo(gross - totalDeductions);
  return { net, deductions, totalDeductions };
}

function SectionTable({ section, currency, onAmountCommit }: { section: TableSection; currency: string; onAmountCommit: (id: number, amount: number) => void }) {
  return (
    <div className="rounded-xl border border-white/10 bg-slate-950/80 text-slate-50 shadow-[0_12px_40px_rgba(0,0,0,0.45)]">
      <div className={cn("px-3 py-2 text-xs font-semibold uppercase tracking-widest", section.tone)}>
        {section.title}
      </div>
      <div className="divide-y divide-white/10 text-sm">
        {section.rows.length === 0 && (
          <div className="px-3 py-6 text-center text-xs text-slate-400">Keine Eintraege</div>
        )}
        {section.rows.map((row) => (
          <div key={row.id} className="px-3 py-2">
            <div className="flex items-center justify-between gap-3">
              <span className="text-slate-100">{row.category?.name ?? "Unbekannt"}</span>
              <AmountInput
                value={toNumber(row.amount)}
                currency={row.currency || currency}
                onCommit={(amount) => onAmountCommit(row.id, amount)}
              />
            </div>
            <div className="mt-1 text-xs text-slate-400">
              {formatMoney(toNumber(row.amount), row.currency || currency)}
            </div>
          </div>
        ))}
      </div>
      {section.footer && (
        <div className="flex items-center justify-between border-t border-white/10 px-3 py-2 text-xs font-semibold text-slate-200">
          <span>{section.footer.label}</span>
          <span>{section.footer.value}</span>
        </div>
      )}
    </div>
  );
}

export function BudgetPlanningBoard({ refreshToken = 0 }: BudgetPlanningBoardProps) {
  const [plan, setPlan] = useState<BudgetPlan | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [grossSalary, setGrossSalary] = useState("");
  const [salarySaving, setSalarySaving] = useState(false);

  const loadPlan = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await apiFetch<BudgetPlan>("/budget-plan/current");
      setPlan(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load plan");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadPlan();
  }, [loadPlan, refreshToken]);

  const handleAmountCommit = useCallback(
    async (itemId: number, amount: number) => {
      try {
        await apiFetch<BudgetItem>(`/budget-plan/items/${itemId}`, {
          method: "PUT",
          body: JSON.stringify({ amount }),
        });
        setPlan((current) => {
          if (!current) return current;
          return {
            ...current,
            items: current.items.map((item) => (item.id === itemId ? { ...item, amount } : item)),
          };
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to update amount");
      }
    },
    []
  );

  const currency = plan?.base_currency || "CHF";

  const { incomeItems, expenseItems, detailGroups, incomeSum, expenseSum } = useMemo(() => {
    const items = plan?.items ?? [];
    const incomeItems = items.filter((item) => item.kind === "income");
    const expenseItems = items.filter((item) => item.kind === "expense");
    const detailItems = items.filter((item) => item.kind === "detail");

    const groupMap = new Map<string, BudgetItem[]>();
    detailItems.forEach((item) => {
      const group = item.group_name || "Details";
      const existing = groupMap.get(group) || [];
      existing.push(item);
      groupMap.set(group, existing);
    });

    DETAIL_GROUPS.forEach((group) => {
      if (!groupMap.has(group)) {
        groupMap.set(group, []);
      }
    });

    const detailGroups = Array.from(groupMap.entries()).map(([group, rows]) => ({
      title: group,
      rows: rows.sort((a, b) => (a.position ?? 0) - (b.position ?? 0)),
    }));

    const incomeSum = incomeItems.reduce((sum, item) => sum + toNumber(item.amount), 0);
    const expenseSum = expenseItems.reduce((sum, item) => sum + toNumber(item.amount), 0);

    return {
      incomeItems: incomeItems.sort((a, b) => (a.position ?? 0) - (b.position ?? 0)),
      expenseItems: expenseItems.sort((a, b) => (a.position ?? 0) - (b.position ?? 0)),
      detailGroups,
      incomeSum,
      expenseSum,
    };
  }, [plan]);

  const salaryDetails = useMemo(() => {
    const gross = Number(grossSalary);
    if (!gross || Number.isNaN(gross)) {
      return null;
    }
    return calculateNetSalary(gross);
  }, [grossSalary]);

  const applyNetSalary = useCallback(async () => {
    const gross = Number(grossSalary);
    if (!gross || Number.isNaN(gross)) {
      return;
    }
    const { net } = calculateNetSalary(gross);
    setSalarySaving(true);
    setError(null);
    try {
      const existingItem = plan?.items.find(
        (item) =>
          item.kind === "income" &&
          SALARY_CATEGORY_NAMES.some((name) => name.toLowerCase() === item.category?.name?.toLowerCase())
      );
      if (existingItem) {
        await apiFetch<BudgetItem>(`/budget-plan/items/${existingItem.id}`, {
          method: "PUT",
          body: JSON.stringify({ amount: net, gross_amount: gross, net_amount: net }),
        });
        setPlan((current) => {
          if (!current) return current;
          return {
            ...current,
            items: current.items.map((item) =>
              item.id === existingItem.id
                ? { ...item, amount: net, gross_amount: gross, net_amount: net }
                : item
            ),
          };
        });
        return;
      }

      const categories = await apiFetch<Category[]>("/categories");
      const existingCategory = categories.find((category) =>
        SALARY_CATEGORY_NAMES.some((name) => name.toLowerCase() === category.name.toLowerCase())
      );
      const category =
        existingCategory ??
        (await apiFetch<Category>("/categories", {
          method: "POST",
          body: JSON.stringify({ name: SALARY_CATEGORY_NAMES[0], kind: "income" }),
        }));

      const nextPosition = Math.max(-1, ...incomeItems.map((item) => item.position ?? 0)) + 1;
      const newItem = await apiFetch<BudgetItem>("/budget-plan/items", {
        method: "POST",
        body: JSON.stringify({
          category_id: category.id,
          kind: "income",
          amount: net,
          gross_amount: gross,
          net_amount: net,
          position: nextPosition,
        }),
      });
      const newItemWithCategory = { ...newItem, category };

      setPlan((current) => {
        if (!current) return current;
        return { ...current, items: [...current.items, newItemWithCategory] };
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to apply salary");
    } finally {
      setSalarySaving(false);
    }
  }, [grossSalary, incomeItems, plan]);

  if (loading) {
    return (
      <section className="rounded-3xl border border-slate-900/40 bg-slate-950 p-6 text-white">Loading budget plan...</section>
    );
  }

  if (error) {
    return (
      <section className="rounded-3xl border border-red-500/30 bg-red-950/40 p-6 text-white">{error}</section>
    );
  }

  return (
    <section className="relative overflow-hidden rounded-3xl border border-slate-900/40 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-6 text-white shadow-xl">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.16),transparent_55%),radial-gradient(circle_at_bottom,_rgba(16,185,129,0.16),transparent_50%)]" />
      <div className="relative grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-6">
          <div className="rounded-xl border border-white/10 bg-slate-950/80 px-4 py-3 text-sm text-slate-200">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div className="space-y-1">
                <div className="text-xs font-semibold uppercase tracking-widest text-emerald-300">Bruttolohn</div>
                <div className="flex items-center gap-2">
                  <Input
                    type="number"
                    min={0}
                    step={10}
                    value={grossSalary}
                    onChange={(event) => setGrossSalary(event.target.value)}
                    placeholder="Brutto"
                    className="h-8 w-32 bg-slate-900/70 text-right text-sm"
                  />
                  <span className="text-xs text-slate-400">{currency}</span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-xs uppercase tracking-widest text-slate-400">Netto</div>
                <div className="text-lg font-semibold text-emerald-300">
                  {salaryDetails ? formatMoneyDetailed(salaryDetails.net, currency) : formatMoneyDetailed(0, currency)}
                </div>
              </div>
            </div>
            {salaryDetails && (
              <div className="mt-3 grid gap-2 text-xs text-slate-300 sm:grid-cols-2">
                {salaryDetails.deductions.map((item) => (
                  <div key={item.label} className="flex items-center justify-between">
                    <span>{item.label}</span>
                    <span>-{formatMoneyDetailed(item.amount, currency)}</span>
                  </div>
                ))}
                <div className="flex items-center justify-between font-semibold text-slate-100 sm:col-span-2">
                  <span>Summe Abzuege</span>
                  <span>-{formatMoneyDetailed(salaryDetails.totalDeductions, currency)}</span>
                </div>
              </div>
            )}
            <div className="mt-3 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={applyNetSalary}
                disabled={salarySaving || !salaryDetails}
                className="rounded-md bg-emerald-500 px-3 py-1.5 text-xs font-semibold text-slate-950 transition hover:bg-emerald-400 disabled:cursor-not-allowed disabled:bg-slate-700"
              >
                Netto berechnen
              </button>
            </div>
          </div>
          <SectionTable
            section={{
              title: "Einkuenfte",
              tone: "bg-emerald-500",
              rows: incomeItems,
              footer: { label: "Summe der Einkuenfte", value: formatMoney(incomeSum, currency) },
            }}
            currency={currency}
            onAmountCommit={handleAmountCommit}
          />
          <SectionTable
            section={{
              title: "Ausgaben",
              tone: "bg-orange-500",
              rows: expenseItems,
              footer: { label: "Summe der Ausgaben", value: formatMoney(expenseSum, currency) },
            }}
            currency={currency}
            onAmountCommit={handleAmountCommit}
          />
          <div className="rounded-xl border border-white/10 bg-slate-950/80 px-4 py-3 text-sm text-slate-200">
            <div className="flex items-center justify-between">
              <span>Verbleibender Betrag</span>
              <span className={cn("font-semibold", incomeSum - expenseSum < 0 ? "text-red-400" : "text-emerald-300")}>
                {formatMoney(incomeSum - expenseSum, currency)}
              </span>
            </div>
          </div>
        </div>
        <div className="space-y-6">
          {detailGroups.map((group) => (
            <SectionTable
              key={group.title}
              section={{
                title: group.title,
                tone: "bg-sky-500",
                rows: group.rows,
              }}
              currency={currency}
              onAmountCommit={handleAmountCommit}
            />
          ))}
        </div>
        <div className="space-y-6" />
      </div>
    </section>
  );
}
