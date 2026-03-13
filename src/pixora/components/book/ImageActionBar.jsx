import { useState } from "react";

import {
    RotateCw,
    RotateCcw,
    Trash2,
    ZoomIn,
    ZoomOut,
    FlipHorizontal,
    FlipVertical,
    Layers,
    ChevronDown,
} from "lucide-react";


export default function ImageActionBar({
    position,
    onRotateLeft,
    onRotateRight,
    onFlipH,
    onFlipV,
    onZoomIn,
    onZoomOut,
    onDelete,
    onLayerAction,
}) {
    const [layersOpen, setLayersOpen] = useState(false);

    if (!position) return null;
    const { top, left } = position;

    return (
        <div
            className="absolute z-50"
            style={{
                top: position.top,
                left: position.centerX,
                transform: "translateX(-50%)",
            }}
        >
            <div className="relative flex items-center gap-1 bg-white shadow-lg rounded-xl px-2 py-1 border">
                <ActionBtn label="Rotate Left" onClick={onRotateLeft}>
                    <RotateCcw size={16} />
                </ActionBtn>

                <ActionBtn label="Rotate Right" onClick={onRotateRight}>
                    <RotateCw size={16} />
                </ActionBtn>

                <ActionBtn label="Flip Horizontal" onClick={onFlipH}>
                    <FlipHorizontal size={16} />
                </ActionBtn>

                <ActionBtn label="Flip Vertical" onClick={onFlipV}>
                    <FlipVertical size={16} />
                </ActionBtn>

                <ActionBtn label="Zoom In" onClick={onZoomIn}>
                    <ZoomIn size={16} />
                </ActionBtn>

                <ActionBtn label="Zoom Out" onClick={onZoomOut}>
                    <ZoomOut size={16} />
                </ActionBtn>

                {/* LAYERS */}
                <div className="relative">
                    <ActionBtn
                        label="Layers"
                        onClick={() => setLayersOpen(v => !v)}
                    >
                        <Layers size={16} />
                        <ChevronDown size={12} />
                    </ActionBtn>

                    {layersOpen && (
                        <div
                            className="absolute top-full mt-2 right-0
      bg-white border shadow-lg rounded-lg
      min-w-[180px] overflow-hidden"
                        >
                            <LayerItem
                                icon="⬆⬆"
                                onClick={() => onLayerAction("front")}
                            >
                                Bring to Front
                            </LayerItem>

                            <LayerItem
                                icon="⬆"
                                onClick={() => onLayerAction("forward")}
                            >
                                Move Forward
                            </LayerItem>

                            <LayerItem
                                icon="⬇"
                                onClick={() => onLayerAction("backward")}
                            >
                                Move Backward
                            </LayerItem>

                            <LayerItem
                                icon="⬇⬇"
                                onClick={() => onLayerAction("back")}
                            >
                                Send to Back
                            </LayerItem>
                        </div>
                    )}

                </div>

                <div className="w-px h-4 bg-gray-300 mx-1" />

                <ActionBtn danger label="Delete" onClick={onDelete}>
                    <Trash2 size={16} />
                </ActionBtn>
            </div>
        </div>
    );
}



function ActionBtn({ children, onClick, label, danger }) {
    return (
        <div className="relative group">
            <button
                onClick={onClick}
                className={`p-2 rounded flex items-center gap-1 transition
          ${danger
                        ? "hover:bg-red-50 text-red-600"
                        : "hover:bg-gray-100 text-gray-700"
                    }`}
            >
                {children}
            </button>

            {/* Tooltip */}
            <div className="absolute -top-9 left-1/2 -translate-x-1/2
        opacity-0 group-hover:opacity-100 transition
        bg-gray-900 text-white text-[8px] px-2 py-1 rounded whitespace-nowrap">
                {label}
            </div>
        </div>
    );
}

function LayerItem({ icon, children, onClick }) {
    return (
        <button
            onClick={onClick}
            className="flex items-center gap-3
        w-full px-4 py-2 text-sm
        whitespace-nowrap
        hover:bg-gray-100"
        >
            <span className="text-gray-500">{icon}</span>
            <span>{children}</span>
        </button>
    );
}

