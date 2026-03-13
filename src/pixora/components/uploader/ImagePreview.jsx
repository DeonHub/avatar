export default function ImagePreview({ image }) {
  if (!image) return null;

  return (
    <div
      style={{
        position: "absolute",
        left: 300,
        top: 80,
        width: 300,
        height: 300,
        background: "#fff",
        border: "1px solid #ccc",
        zIndex: 20,
        padding: 8,
      }}
    >
      <img
        src={image.src}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "contain",
        }}
      />
    </div>
  );
}
