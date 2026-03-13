import ImageThumbnail from "./ImageThumbnail";


export default function ImageLibrary({
  images,
  selectedIds,
  setSelectedIds,
  onHoverImage,
}) {
  const handleSelect = (e, id, index) => {
    if (e.shiftKey && selectedIds.length > 0) {
      const lastIndex = images.findIndex(
        img => img.id === selectedIds[selectedIds.length - 1]
      );

      const range = images
        .slice(
          Math.min(lastIndex, index),
          Math.max(lastIndex, index) + 1
        )
        .map(img => img.id);

      setSelectedIds(Array.from(new Set([...selectedIds, ...range])));
    } else if (e.ctrlKey || e.metaKey) {
      setSelectedIds(prev =>
        prev.includes(id)
          ? prev.filter(i => i !== id)
          : [...prev, id]
      );
    } else {
      setSelectedIds([id]);
    }
  };

  return (
    <div className="grid grid-cols-2 gap-2">
      {images.map((img, index) => {
        const selected = selectedIds.includes(img.id);

        return (
          <div
            key={img.id}
            draggable
            onDragStart={e =>
              e.dataTransfer.setData("image", JSON.stringify(img))
            }
            onMouseEnter={() => onHoverImage(img)}
            onMouseLeave={() => onHoverImage(null)}
            onClick={e => handleSelect(e, img.id, index)}
            className={`relative cursor-pointer rounded overflow-hidden border transition
              ${
                selected
                  ? "border-blue-500 ring-2 ring-blue-200"
                  : "border-gray-200 hover:border-gray-400"
              }`}
          >
            <img
              src={img.src}
              className="w-full h-24 object-cover"
              draggable={false}
            />

            {/* USED BADGE */}
            {img.usedCount > 0 && (
              <span className="absolute top-1 right-1 bg-black/70 text-white text-[10px] px-1 rounded">
                {img.usedCount}
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}
