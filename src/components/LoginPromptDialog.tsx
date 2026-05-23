import { Link } from 'react-router-dom';

export default function LoginPromptDialog({ onClose }: { onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl shadow-lg p-6 max-w-sm w-full mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-bold mb-2">Sign in to continue</h2>
        <p className="text-sm text-stone-600 mb-4">
          Save favourites, applaud contributions, and follow businesses you care about.
        </p>
        <div className="flex gap-2">
          <Link
            to="/login"
            className="flex-1 bg-heart-500 text-white rounded p-2 text-center font-semibold"
          >
            Sign in
          </Link>
          <Link
            to="/signup"
            className="flex-1 border border-stone-300 rounded p-2 text-center font-semibold"
          >
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}
