import { useEffect, useState } from "react";
import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { apiFetch, apiUpload } from "@/lib/api";

interface Account {
  id: number;
  name: string;
}

export default function ImportsPage() {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [accountId, setAccountId] = useState<string>("");
  const [importType, setImportType] = useState("yuh");
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState("");

  useEffect(() => {
    apiFetch<Account[]>("/accounts").then((data) => {
      setAccounts(data);
      if (data.length) {
        setAccountId(String(data[0].id));
      }
    });
  }, []);

  const handleImport = async () => {
    if (!file || !accountId) {
      setStatus("Pick an account and CSV file first.");
      return;
    }
    const formData = new FormData();
    formData.append("file", file);
    try {
      const payload = await apiUpload<{ transactions_added: number; investment_lots_added: number }>(
        `/imports/${importType}?account_id=${accountId}`,
        formData
      );
      setStatus(
        `Imported ${payload.transactions_added} transactions, ${payload.investment_lots_added} lots.`
      );
    } catch (err) {
      setStatus(err instanceof Error ? err.message : "Import failed");
    }
  };

  return (
    <Layout>
      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle>CSV import</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label>Import type</Label>
            <Select value={importType} onValueChange={setImportType}>
              <SelectTrigger>
                <SelectValue placeholder="Choose type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="yuh">Yuh</SelectItem>
                <SelectItem value="migros">Migros Bank</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Account</Label>
            <Select value={accountId} onValueChange={setAccountId}>
              <SelectTrigger>
                <SelectValue placeholder="Choose account" />
              </SelectTrigger>
              <SelectContent>
                {accounts.map((account) => (
                  <SelectItem key={account.id} value={String(account.id)}>
                    {account.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>CSV file</Label>
            <input
              type="file"
              accept=".csv"
              onChange={(event) => setFile(event.target.files?.[0] || null)}
            />
          </div>
          <Button onClick={handleImport}>Import CSV</Button>
          {status ? <p className="text-sm text-muted-foreground">{status}</p> : null}
        </CardContent>
      </Card>
    </Layout>
  );
}
