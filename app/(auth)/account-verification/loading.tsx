// app/loading.tsx
import { Card } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <Card className="w-[300px] p-6 flex flex-col items-center justify-center gap-4 shadow-xl">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
        <p className="text-sm text-muted-foreground">Please wait, loading content...</p>
      </Card>
    </div>
  );
}
