export default function ImageUploader({ onImagesAdded }) {
  const handleUpload = e => {
    const files = Array.from(e.target.files);

    const images = files.map(file => ({
      id: crypto.randomUUID(),
      src: URL.createObjectURL(file),
      usedCount: 0,
    }));

    onImagesAdded(images);
  };

  return (
    <label className="block w-full">
      <input
        type="file"
        multiple
        accept="image/*"
        onChange={handleUpload}
        className="hidden"
      />
      <div className="w-full border border-dashed rounded px-3 py-6 text-center text-sm text-gray-500 hover:border-gray-400 cursor-pointer">
        + Upload Images
      </div>
    </label>
  );
}

