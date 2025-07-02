export function toSlug(label: string): string {
  return label
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "") // remove punctuation
    .trim()
    .replace(/\s+/g, "-") // replace spaces with hyphens
    .replace(/-+/g, "-") // collapse multiple dashes to one
    .replace(/^-+|-+$/g, "");
}
