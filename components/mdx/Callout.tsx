import { ReactNode } from "react";

type CalloutProps = {
  children: ReactNode;
  type?: "info" | "success" | "warning";
};

const styles = {
  info: {
    border: "border-blue-200",
    background: "bg-blue-50",
    title: "Info",
  },
  success: {
    border: "border-green-200",
    background: "bg-green-50",
    title: "Pro Tip",
  },
  warning: {
    border: "border-amber-200",
    background: "bg-amber-50",
    title: "Important",
  },
};

export default function Callout({
  children,
  type = "info",
}: CalloutProps) {
  const style = styles[type];

  return (
    <aside
      className={`my-8 rounded-2xl border ${style.border} ${style.background} p-6`}
    >
      <p className="font-bold text-gray-900 mb-2">
        {style.title}
      </p>

      <div className="text-gray-700 leading-7">
        {children}
      </div>
    </aside>
  );
}