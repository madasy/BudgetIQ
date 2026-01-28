import { SearchDialog } from "@/components/layout/search-dialog";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { useState } from "react";

export function SearchButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        variant="default"
        className="top-6 right-6 gap-2"
        onClick={() => setOpen(true)}
      >
        <Search className="h-4 w-4" />
        <span>Search</span>
      </Button>
      <SearchDialog open={open} onOpenChange={setOpen} />
    </>
  );
}
