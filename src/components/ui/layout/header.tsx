import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

interface HeaderProps {
  title?: string;
}

export function Header({ title = "AI Chat App" }: HeaderProps) {
  return (
    <header className="sticky top-0 z-10 bg-background border-b">
      <div className="flex items-center justify-between p-4">
        <h1 className="text-lg font-semibold">{title}</h1>
        <Button variant="ghost" size="icon">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Menu</span>
        </Button>
      </div>
    </header>
  );
}
