import React, { useRef, useEffect } from "react";
import { Group, Rect, Image, Transformer } from "react-konva";
import useImage from "use-image";

export default function DraggableImage({
  image,
  isSelected,
  isHovered,
  onSelect,
  onHover,
  onHoverOut,
  onChange,
}) {
  const groupRef = useRef();
  const trRef = useRef();
  const [img] = useImage(image.src);

  // ✅ SINGLE effect, always called
  useEffect(() => {
    if (isSelected && trRef.current && groupRef.current) {
      trRef.current.nodes([groupRef.current]);
      trRef.current.getLayer().batchDraw();
    }
  }, [
    isSelected,
    image.width,
    image.height,
    image.rotation,
  ]);

  // ✅ Early return AFTER hooks
  if (!img) return null;

  return (
    <>
      <Group
        id={image.instanceId}
        ref={groupRef}
        x={image.x}
        y={image.y}
        rotation={image.rotation || 0}
        draggable
        onMouseEnter={onHover}
        onMouseLeave={onHoverOut}
        onMouseDown={(e) => {
          e.cancelBubble = true;
          onSelect();
        }}
        onDragStart={(e) => {
          e.cancelBubble = true;
        }}
        onDragEnd={(e) => {
          e.cancelBubble = true;
          onChange({
            ...image,
            x: e.target.x(),
            y: e.target.y(),
          });
        }}
        onTransformEnd={() => {
          const node = groupRef.current;
          const scaleX = node.scaleX();
          const scaleY = node.scaleY();

          node.scaleX(1);
          node.scaleY(1);

          onChange({
            ...image,
            x: node.x(),
            y: node.y(),
            rotation: node.rotation(),
            width: Math.max(80, image.width * scaleX),
            height: Math.max(80, image.height * scaleY),
          });
        }}
      >
        {/* FRAME */}
        <Rect
          width={image.width}
          height={image.height}
          fill="#f8f8f8"
          cornerRadius={6}
        />

        {/* IMAGE */}
        <Group clipFunc={(ctx) => ctx.rect(0, 0, image.width, image.height)}>
          <Image
            image={img}
            width={image.width}
            height={image.height}
            rotation={image.imageRotation || 0}
            scaleX={(image.imageScale || 1) * (image.imageFlipX ? -1 : 1)}
            scaleY={image.imageScale || 1}
            x={image.imageFlipX ? image.width : 0}
            y={image.imageFlipY ? image.width: 0}
          />
        </Group>

        {/* HOVER BORDER */}
        {isHovered && !isSelected && (
          <Rect
            width={image.width}
            height={image.height}
            stroke="#94a3b8"
            strokeWidth={1}
            dash={[4, 4]}
            listening={false}
          />
        )}

        {/* SELECTED BORDER */}
        {isSelected && (
          <Rect
            width={image.width}
            height={image.height}
            stroke="#2563eb"
            strokeWidth={2}
            dash={[6, 4]}
            listening={false}
          />
        )}
      </Group>

      {isSelected && (
        <Transformer
          ref={trRef}
          rotateEnabled
          boundBoxFunc={(oldBox, newBox) =>
            newBox.width < 80 || newBox.height < 80
              ? oldBox
              : newBox
          }
        />
      )}
    </>
  );
}



