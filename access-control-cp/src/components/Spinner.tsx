export default function Spinner() {
  return (
    <div className="flex min-h-[200px] items-center justify-center">
      <div className="animate-pulse text-xs font-semibold uppercase tracking-[0.35em] text-slate-400">
        carregando...
      </div>
    </div>
  );
}
