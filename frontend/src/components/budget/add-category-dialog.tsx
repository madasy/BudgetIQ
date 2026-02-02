import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
    Car,
    Coffee,
    Film,
    Gamepad2,
    GraduationCap,
    Heart,
    Home,
    Plane,
    Shirt,
    ShoppingBag,
    Utensils,
    Wifi,
    type LucideIcon,
} from "lucide-react";
import { useState } from "react";
import { apiFetch } from "@/lib/api";

interface AddCategoryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCategoryAdded?: () => void;
}

interface IconItem {
  name: string;
  icon: LucideIcon;
}

interface ColorItem {
  name: string;
  class: string;
  value: string;
}

export function AddCategoryDialog({
  open,
  onOpenChange,
  onCategoryAdded,
}: AddCategoryDialogProps) {
  const [categoryName, setCategoryName] = useState("");
  const [selectedIcon, setSelectedIcon] = useState<IconItem | null>(null);
  const [selectedColor, setSelectedColor] = useState<ColorItem | null>(null);
  const [budgetLimit, setBudgetLimit] = useState(500);
  const [categoryKind, setCategoryKind] = useState<"income" | "expense" | "detail">("expense");
  const [detailGroup, setDetailGroup] = useState("Migros Kreditkarte");
  const [saving, setSaving] = useState(false);

  const icons: IconItem[] = [
    { name: "Shopping", icon: ShoppingBag },
    { name: "Housing", icon: Home },
    { name: "Transportation", icon: Car },
    { name: "Food", icon: Utensils },
    { name: "Entertainment", icon: Film },
    { name: "Utilities", icon: Wifi },
    { name: "Health", icon: Heart },
    { name: "Gaming", icon: Gamepad2 },
    { name: "Travel", icon: Plane },
    { name: "Education", icon: GraduationCap },
    { name: "Coffee", icon: Coffee },
    { name: "Clothing", icon: Shirt },
  ];

  const colors: ColorItem[] = [
    {
      name: "Blue",
      class: "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300",
      value: "blue",
    },
    {
      name: "Green",
      class:
        "bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300",
      value: "green",
    },
    {
      name: "Purple",
      class:
        "bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300",
      value: "purple",
    },
    {
      name: "Orange",
      class:
        "bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-300",
      value: "orange",
    },
    {
      name: "Pink",
      class: "bg-pink-100 dark:bg-pink-900 text-pink-700 dark:text-pink-300",
      value: "pink",
    },
    {
      name: "Yellow",
      class:
        "bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300",
      value: "yellow",
    },
    {
      name: "Red",
      class: "bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300",
      value: "red",
    },
    {
      name: "Indigo",
      class:
        "bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300",
      value: "indigo",
    },
  ];

  const handleSubmit = async () => {
    if (!categoryName) return;
    setSaving(true);
    try {
      const category = await apiFetch<{ id: number }>("/categories", {
        method: "POST",
        body: JSON.stringify({
          name: categoryName,
          kind: categoryKind === "income" ? "income" : "expense",
        }),
      });

      await apiFetch("/budget-plan/items", {
        method: "POST",
        body: JSON.stringify({
          category_id: category.id,
          kind: categoryKind,
          amount: budgetLimit,
          group_name: categoryKind === "detail" ? detailGroup : null,
        }),
      });

      onCategoryAdded?.();

      setCategoryName("");
      setSelectedIcon(null);
      setSelectedColor(null);
      setBudgetLimit(500);
      setCategoryKind("expense");
      setDetailGroup("Migros Kreditkarte");
      onOpenChange(false);
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add Budget Category</DialogTitle>
          <DialogDescription>
            Create a new budget category to track your spending
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Category Type */}
          <div className="space-y-2">
            <Label>Kategorie Typ</Label>
            <Select value={categoryKind} onValueChange={(value) => setCategoryKind(value as "income" | "expense" | "detail")}>
              <SelectTrigger>
                <SelectValue placeholder="Auswaehlen" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="income">Einkuenfte</SelectItem>
                <SelectItem value="expense">Ausgaben</SelectItem>
                <SelectItem value="detail">Detail</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {categoryKind === "detail" && (
            <div className="space-y-2">
              <Label>Detail Gruppe</Label>
              <Select value={detailGroup} onValueChange={setDetailGroup}>
                <SelectTrigger>
                  <SelectValue placeholder="Auswaehlen" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Migros Kreditkarte">Migros Kreditkarte</SelectItem>
                  <SelectItem value="WISE">WISE</SelectItem>
                  <SelectItem value="Spenden">Spenden</SelectItem>
                  <SelectItem value="Jaehrliche Kosten">Jaehrliche Kosten</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Category Name */}
          <div className="space-y-2">
            <Label htmlFor="categoryName">Category Name</Label>
            <Input
              id="categoryName"
              placeholder="e.g., Groceries, Gas, Subscriptions"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
            />
          </div>

          {/* Icon Selection */}
          <div className="space-y-2">
            <Label>Choose an Icon</Label>
            <div className="grid grid-cols-6 gap-2">
              {icons.map((iconItem) => (
                <button
                  key={iconItem.name}
                  type="button"
                  onClick={() => setSelectedIcon(iconItem)}
                  className={`h-12 w-12 rounded-lg border-2 flex items-center justify-center transition-colors ${
                    selectedIcon?.name === iconItem.name
                      ? "border-primary bg-primary/10"
                      : "border-muted hover:border-primary/50 hover:bg-accent"
                  }`}
                >
                  <iconItem.icon className="h-5 w-5" />
                </button>
              ))}
            </div>
            {selectedIcon && (
              <p className="text-sm text-muted-foreground">
                Selected: {selectedIcon.name}
              </p>
            )}
          </div>

          {/* Color Selection */}
          <div className="space-y-2">
            <Label>Choose a Color</Label>
            <div className="grid grid-cols-4 gap-2">
              {colors.map((color) => (
                <button
                  key={color.value}
                  type="button"
                  onClick={() => setSelectedColor(color)}
                  className={`h-12 rounded-lg border-2 flex items-center justify-center transition-colors ${
                    color.class
                  } ${
                    selectedColor?.value === color.value
                      ? "border-primary ring-2 ring-primary/20"
                      : "border-transparent hover:border-primary/50"
                  }`}
                >
                  <span className="text-sm font-medium">{color.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Budget Limit */}
          <div className="space-y-2">
            <Label>Monthly Budget Limit</Label>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Amount</span>
                <span className="text-lg font-semibold">${budgetLimit}</span>
              </div>
              <Input
                type="number"
                min={50}
                max={2000}
                step={25}
                value={budgetLimit}
                onChange={(event) => setBudgetLimit(Number(event.target.value))}
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>$50</span>
                <span>$2,000</span>
              </div>
            </div>
          </div>

          {/* Preview */}
          {categoryName && selectedIcon && selectedColor && (
            <div className="space-y-2">
              <Label>Preview</Label>
              <div className="flex items-center gap-3 p-3 rounded-lg border bg-muted/50">
                <div
                  className={`h-10 w-10 rounded-full ${selectedColor.class} flex items-center justify-center`}
                >
                  <selectedIcon.icon className="h-5 w-5" />
                </div>
                <div>
                  <div className="font-medium">{categoryName}</div>
                  <div className="text-sm text-muted-foreground">
                    Budget: ${budgetLimit} per month
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={!categoryName || saving}
          >
            Add Category
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
