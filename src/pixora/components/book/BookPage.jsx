import React, { useRef, useState } from "react";
import { Stage, Layer, Rect, Line } from "react-konva";
import DraggableImage from "./DraggableImage";
import ImageActionBar from "./ImageActionBar";

const BOOK_WIDTH = 700;
const BOOK_HEIGHT = 480;
const PAGE_PADDING = 15;

export default function BookPage({
  images,
  onDropImage,
  onUpdateImage,
}) {
  const stageRef = useRef();
  const [selectedId, setSelectedId] = useState(null);
  const [hoveredId, setHoveredId] = useState(null);

  // const stageRef = useRef();
  const containerRef = useRef();

  const selectedImage = images.find(
    img => img.instanceId === selectedId
  );


  const updateSelectedImage = (patch) => {
    if (!selectedImage) return;

    onUpdateImage({
      ...selectedImage,
      ...patch,
    });
  };

  const moveLayer = (type) => {
  if (!selectedImage) return;

  onUpdateImage({
    ...selectedImage,
    _layerAction: type,
  });
};


  const deleteSelectedImage = () => {
    if (!selectedImage) return;

    onUpdateImage({
      ...selectedImage,
      _delete: true,
    });
  };


  const handleDrop = (e) => {
    e.preventDefault();
    stageRef.current.setPointersPositions(e);

    const libraryImage = JSON.parse(
      e.dataTransfer.getData("image")
    );

    const pos = stageRef.current.getPointerPosition();

    onDropImage(libraryImage, pos);

    stageRef.current.stopDrag();
  };

const GAP = 8;
const TOOLBAR_HEIGHT = 44;

const getToolbarPosition = (img) => {
  if (!stageRef.current || !containerRef.current) return null;

  const stage = stageRef.current;
  const node = stage.findOne(`#${img.instanceId}`);
  if (!node) return null;

  // image bounding box in STAGE space
  const box = node.getClientRect({ relativeTo: stage });

  // DOM rects
  const stageRect = stage.container().getBoundingClientRect();
  const containerRect = containerRef.current.getBoundingClientRect();

  // image center in VIEWPORT space
  const imageCenterX =
    stageRect.left + box.x + box.width / 2;

  const imageBottomY =
    stageRect.top + box.y + box.height;

  const imageTopY =
    stageRect.top + box.y;

  // convert viewport → container space
  const centerX = imageCenterX - containerRect.left;

  // decide vertical placement (below by default)
  let top = imageBottomY + GAP - containerRect.top;
  let placement = "bottom";

  // 🔁 flip ABOVE if overflowing bottom
  if (
    top + TOOLBAR_HEIGHT >
    containerRect.height
  ) {
    top =
      imageTopY -
      TOOLBAR_HEIGHT -
      GAP -
      containerRect.top;

    placement = "top";
  }

  // final clamp (no vertical overflow allowed)
  top = Math.max(8, top);

  return { top, centerX, placement };
};



  return (
    <div
      ref={containerRef}
      onDrop={handleDrop}
      onDragOver={e => e.preventDefault()}
      className="relative flex-1 bg-gray-100 flex items-center justify-center"
    >
      <Stage
        width={BOOK_WIDTH}
        height={BOOK_HEIGHT}
        ref={stageRef}
        onMouseDown={e => {
          if (e.target === e.target.getStage()) {
            setSelectedId(null);
          }
        }}
      >
        <Layer>
          {/* BOOK SHADOW */}
          <Rect
            x={5}
            y={5}
            width={BOOK_WIDTH - 10}
            height={BOOK_HEIGHT - 10}
            fill="#e5e5e5"
            cornerRadius={14}
            listening={false}
          />

          {/* LEFT PAGE */}
          <Rect
            x={PAGE_PADDING}
            y={PAGE_PADDING}
            width={(BOOK_WIDTH / 2) - PAGE_PADDING}
            height={BOOK_HEIGHT - PAGE_PADDING * 2}
            fill="#fff"
            cornerRadius={8}
            listening={false}
          />

          {/* RIGHT PAGE */}
          <Rect
            x={BOOK_WIDTH / 2}
            y={PAGE_PADDING}
            width={(BOOK_WIDTH / 2) - PAGE_PADDING}
            height={BOOK_HEIGHT - PAGE_PADDING * 2}
            fill="#fff"
            cornerRadius={8}
            listening={false}
          />

          {/* GUTTER */}
          <Line
            points={[
              BOOK_WIDTH / 2,
              PAGE_PADDING,
              BOOK_WIDTH / 2,
              BOOK_HEIGHT - PAGE_PADDING,
            ]}
            stroke="#ddd"
            strokeWidth={2}
            listening={false}
          />

          {images.map(img => (

            <DraggableImage
              key={img.instanceId}
              image={img}
              isSelected={img.instanceId === selectedId}
              isHovered={img.instanceId === hoveredId}
              onHover={() => setHoveredId(img.instanceId)}
              onHoverOut={() => setHoveredId(null)}
              onSelect={() => setSelectedId(img.instanceId)}
              onChange={onUpdateImage}
            />
          ))}
        </Layer>
      </Stage>

      {selectedImage && (
        <ImageActionBar
          position={getToolbarPosition(selectedImage)}
          onRotateLeft={() => updateSelectedImage({ imageRotation: (selectedImage.imageRotation || 0) - 90 })}
          onRotateRight={() => updateSelectedImage({ imageRotation: (selectedImage.imageRotation || 0) + 90 })}
          onFlipH={() => updateSelectedImage({ imageFlipX: !selectedImage.imageFlipX })}
          onFlipV={() => updateSelectedImage({ imageFlipY: !selectedImage.imageFlipY })}
          onZoomIn={() => updateSelectedImage({ imageScale: Math.min((selectedImage.imageScale || 1) + 0.1, 3) })}
          onZoomOut={() => updateSelectedImage({ imageScale: Math.max((selectedImage.imageScale || 1) - 0.1, 0.3) })}
          onLayerAction={moveLayer}
          onDelete={deleteSelectedImage}
        />

      )}

    </div>
  );
}

