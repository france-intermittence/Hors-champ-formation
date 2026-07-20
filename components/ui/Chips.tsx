/** Liste de tags rectangulaires (matériel, mots-clés). */
export default function Chips({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-wrap gap-3">
      {items.map((item) => (
        <li
          key={item}
          className="border border-line bg-paper px-4 py-2 font-condensed text-sm font-semibold uppercase tracking-wide2 text-ink"
        >
          {item}
        </li>
      ))}
    </ul>
  );
}
