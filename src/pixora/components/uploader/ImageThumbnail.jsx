export default function ImageThumbnail({
  image,
  isSelected,
  onClick,
  onHover,
}) {
  return (
    <div
      draggable
      onDragStart={(e) =>
        e.dataTransfer.setData("image", JSON.stringify(image))
      }
      onClick={onClick}
      onMouseEnter={() => onHover(image)}
      onMouseLeave={() => onHover(null)}
      style={{
        border: isSelected ? "2px solid #2563eb" : "1px solid #ccc",
        cursor: "pointer",
        padding: 2,
      }}
    >
      <img
        src={image.src}
        style={{
          width: "100%",
          height: 80,
          objectFit: "cover",
        }}
      />
    </div>
  );
}
