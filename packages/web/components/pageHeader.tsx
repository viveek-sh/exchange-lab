export function PageHeader({
  title,
  description,
}: {
  title: string;
  description?: string;
}) {
  return (
    <header className="space-y-3">
      <h1 className="text-3xl font-semibold tracking-tight">{title}</h1>
      {description && (
        <p className="text-muted-foreground leading-relaxed">{description}</p>
      )}
    </header>
  );
}
