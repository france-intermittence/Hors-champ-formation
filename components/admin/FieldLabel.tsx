import FieldHint from "@/components/admin/FieldHint";

interface FieldLabelProps {
  htmlFor?: string;
  children: React.ReactNode;
  hint?: string;
  required?: boolean;
}

export default function FieldLabel({ htmlFor, children, hint, required }: FieldLabelProps) {
  return (
    <label
      htmlFor={htmlFor}
      className="mb-1.5 flex items-center gap-1.5 font-condensed text-xs font-semibold uppercase tracking-wide2 text-muted"
    >
      {children}
      {required && " *"}
      {hint && <FieldHint text={hint} />}
    </label>
  );
}
