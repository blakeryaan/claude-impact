import { Link } from 'react-router-dom';

export default function LoginPromptDialog({ onClose }: { onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-end sm:items-center justify-center z-50 px-4 pb-6 sm:pb-0"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-sm"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-center mb-5">
          <div className="text-4xl mb-2">♥</div>
          <h2 className="text-xl font-black">Sign in to continue</h2>
          <p className="text-sm text-stone-500 mt-1">
            Save favourites, applaud contributions, and follow businesses you love.
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <Link
            to="/login"
            className="w-full bg-heart-500 hover:bg-heart-600 text-white rounded-xl py-3 text-center font-bold transition-colors"
          >
            Sign in
          </Link>
          <Link
            to="/signup"
            className="w-full border border-stone-200 rounded-xl py-3 text-center font-semibold text-stone-700 hover:bg-stone-50 transition-colors"
          >
            Create an account
          </Link>
        </div>
        <button
          onClick={onClose}
          className="w-full mt-3 text-sm text-stone-400 hover:text-stone-600"
        >
          Maybe later
        </button>
      </div>
    </div>
  );
}
