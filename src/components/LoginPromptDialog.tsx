import { Link } from 'react-router-dom';

export default function LoginPromptDialog({ onClose }: { onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 bg-ink/60 flex items-end sm:items-center justify-center z-50 px-4 pb-6 sm:pb-0"
      onClick={onClose}
    >
      <div
        className="bg-paper border-2 border-ink rounded-lg w-full max-w-sm p-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Eyebrow */}
        <div className="eyebrow mb-3">Sign in to continue</div>
        <h2 className="font-display text-2xl uppercase leading-tight mb-1">
          Save. Applaud. Follow.
        </h2>
        <p className="text-sm text-muted mb-6 leading-relaxed">
          Back the businesses doing good in your city.
        </p>
        <div className="flex flex-col gap-2">
          <Link to="/login" className="btn-primary text-center">Sign in</Link>
          <Link to="/signup" className="btn-secondary text-center">Create account</Link>
        </div>
        <button
          onClick={onClose}
          className="w-full mt-3 font-mono text-xs uppercase tracking-wider text-muted hover:text-ink transition-colors"
        >
          Maybe later
        </button>
      </div>
    </div>
  );
}
