import { internshipGuidesCategory } from "./internship-guides";

const categories = {
  "internship-guides": internshipGuidesCategory,
} as const;

export function getCategoryConfig(slug: string) {
  return (
    categories[
      slug as keyof typeof categories
    ] ?? null
  );
}