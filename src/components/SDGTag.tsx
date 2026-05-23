export default function SDGTag({ sdg }: { sdg: string }) {
  return (
    <span className="inline-block font-mono text-[11px] uppercase tracking-wider rounded px-2 py-0.5 border border-muted text-muted leading-none">
      {sdg}
    </span>
  );
}
