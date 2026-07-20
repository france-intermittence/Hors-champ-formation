// template.tsx se remonte à chaque navigation : l'animation .page-enter joue
// donc à chaque changement de page (transition « cut » cinéma). Léger et fiable.
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="page-enter">{children}</div>;
}
