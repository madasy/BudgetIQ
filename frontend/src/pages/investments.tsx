import { useEffect, useMemo, useState } from "react";
import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { apiFetch } from "@/lib/api";

interface Holding {
  id: number;
  symbol: string;
  name?: string | null;
  quantity: number;
  avg_cost: number;
  current_price?: number | null;
  last_price?: number | null;
}

interface Lot {
  id: number;
  symbol: string;
  trade_date: string;
  quantity: number;
  price_per_unit: number;
  side: string;
}

export default function InvestmentsPage() {
  const [holdings, setHoldings] = useState<Holding[]>([]);
  const [lots, setLots] = useState<Lot[]>([]);
  const [status, setStatus] = useState("");

  const load = async () => {
    const [holdingData, lotData] = await Promise.all([
      apiFetch<Holding[]>("/holdings"),
      apiFetch<Lot[]>("/investments/lots"),
    ]);
    setHoldings(holdingData);
    setLots(lotData);
  };

  useEffect(() => {
    load().catch((error) => setStatus(error instanceof Error ? error.message : "Failed to load"));
  }, []);

  const totals = useMemo(() => {
    const cost = holdings.reduce((sum, holding) => sum + Number(holding.quantity) * Number(holding.avg_cost), 0);
    const value = holdings.reduce((sum, holding) => {
      const price = Number(holding.current_price || holding.last_price || holding.avg_cost || 0);
      return sum + Number(holding.quantity) * price;
    }, 0);
    return { cost, value, pnl: value - cost };
  }, [holdings]);

  const refreshPrices = async () => {
    setStatus("");
    try {
      const payload = await apiFetch<{ updated: number; failed: number }>("/prices/refresh", { method: "POST" });
      await load();
      setStatus(`Updated ${payload.updated} prices${payload.failed ? ` (${payload.failed} failed)` : ""}.`);
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Price update failed");
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="grid gap-6 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Cost basis</CardTitle>
            </CardHeader>
            <CardContent className="text-2xl font-semibold">CHF {totals.cost.toFixed(2)}</CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Market value</CardTitle>
            </CardHeader>
            <CardContent className="text-2xl font-semibold">CHF {totals.value.toFixed(2)}</CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Unrealized P/L</CardTitle>
            </CardHeader>
            <CardContent className="text-2xl font-semibold">CHF {totals.pnl.toFixed(2)}</CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Holdings</CardTitle>
            <Button onClick={refreshPrices}>Update prices</Button>
          </CardHeader>
          <CardContent>
            {status ? <p className="text-sm text-muted-foreground mb-4">{status}</p> : null}
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Symbol</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Avg Cost</TableHead>
                  <TableHead>Market Price</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {holdings.map((holding) => (
                  <TableRow key={holding.id}>
                    <TableCell>{holding.symbol}</TableCell>
                    <TableCell>{holding.name || "-"}</TableCell>
                    <TableCell>{Number(holding.quantity).toFixed(4)}</TableCell>
                    <TableCell>CHF {Number(holding.avg_cost).toFixed(2)}</TableCell>
                    <TableCell>
                      CHF {Number(holding.current_price || holding.last_price || holding.avg_cost || 0).toFixed(2)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Investment lots</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Symbol</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Side</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Price</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {lots.map((lot) => (
                  <TableRow key={lot.id}>
                    <TableCell>{lot.symbol}</TableCell>
                    <TableCell>{lot.trade_date}</TableCell>
                    <TableCell>{lot.side}</TableCell>
                    <TableCell>{Number(lot.quantity).toFixed(4)}</TableCell>
                    <TableCell>CHF {Number(lot.price_per_unit).toFixed(2)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
