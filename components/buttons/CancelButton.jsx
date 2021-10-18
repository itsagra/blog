export default function CancelButton({ cancel }) {
  return (
    <button
      type="button"
      onClick={cancel}
      className="p-2 px-5 bg-white rounded text-red-500 hover:text-red-200 hover:shadow-inner border border-red-300 outline-none mx-2 shadow"
    >
      Cancel
    </button>
  );
}
