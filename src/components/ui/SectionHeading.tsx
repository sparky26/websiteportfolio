export function SectionHeading({
  eyebrow,
  title,
  children
}: {
  eyebrow: string;
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="retro-section-heading">
      <span className="eyebrow">{eyebrow}</span>
      <h2>{title}</h2>
      {children ? <p className="retro-muted text-sm mt-2 max-w-2xl mx-auto">{children}</p> : null}
      <div className="retro-hr mt-4"></div>
    </div>
  );
}
