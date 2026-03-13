import ImageUploader from "./ImageUploader";
import ImageLibrary from "./ImageLibrary";

export default function LeftPanel({
  images,
  selectedIds,
  setSelectedIds,
  onImagesAdded,
  onDeleteSelected,
  usedPhotos,
  totalPhotos,
  onHoverImage,
}) {
  return (
    <div className="w-[20%] min-w-[260px] border-r bg-white flex flex-col">
      {/* UPLOADER */}
      <div className="p-3 border-b">
        <ImageUploader onImagesAdded={onImagesAdded} />
      </div>

      {/* STATS + DELETE */}
      <div className="px-3 py-2 flex items-center justify-between border-b">
        <span className="text-xs text-gray-600">
          {usedPhotos} used / {totalPhotos} photos
        </span>

        <button
          disabled={selectedIds.length === 0}
          onClick={onDeleteSelected}
          className={`px-3 py-1 rounded text-xs font-medium transition
            ${
              selectedIds.length === 0
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-red-500 text-white hover:bg-red-600"
            }`}
        >
          Delete
        </button>
      </div>

      {/* IMAGE GRID */}
      <div className="flex-1 overflow-y-auto p-2">
        <ImageLibrary
          images={images}
          selectedIds={selectedIds}
          setSelectedIds={setSelectedIds}
          onHoverImage={onHoverImage}
        />
      </div>
    </div>
  );
}
