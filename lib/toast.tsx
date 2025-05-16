"use client"
// lib/toasts.tsx
import { toast } from 'sonner';
import { AlertTriangle, CheckCircle2 } from "lucide-react";


export function showSuccessToast(
  title: string = "Success",
  message: string = "Your action was completed successfully."
) {
  toast.success(title, {
    description: message,
    icon: <CheckCircle2 className="text-green-600 " />,
    duration: 4000,
  });
}
export function showErrorToast(message: string = "Something went wrong.") {
  toast.error("Error", {
    description: message,
    icon: <AlertTriangle className="text-red-500 " />,
    duration: 5000,
  });
}