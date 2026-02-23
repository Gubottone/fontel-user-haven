import { AlertCircle } from "lucide-react";

interface FormErrorProps {
  id: string;
  message: string;
}

export function FormError({ id, message }: FormErrorProps) {
  if (!message) return null;
  return (
    <p id={id} role="alert" className="mt-1.5 flex items-center gap-1.5 text-sm font-medium text-status-unpaid">
      <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
      {message}
    </p>
  );
}
