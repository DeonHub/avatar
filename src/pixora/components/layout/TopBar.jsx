export default function TopBar() {
  return (
    <div className="h-12 border-b bg-white flex items-center px-4">
      {/* LEFT */}
      <div className="flex-1 flex items-center gap-3">
        <span className="font-semibold text-sm">Pixory Editor</span>
      </div>

      {/* CENTER */}
      <div className="flex-1 flex justify-center text-sm text-gray-600">
        Page Editor
      </div>

      {/* RIGHT */}
      <div className="flex-1 flex justify-end gap-3">
        <button className="text-sm px-3 py-1 border rounded">
          Save
        </button>
      </div>
    </div>
  );
}
