import { Plus, Copy, Trash2 } from "lucide-react";

import { Modal, Radio } from "antd";
import { useState } from "react";

export default function PageStrip({
  pages,
  currentPage,
  setCurrentPage,
  addPage,
  removePage,
  duplicatePage,
  reorderPages,
}) {
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState("after");

  const handleAdd = () => {
    addPage(position);
    setOpen(false);
  };

  return (
    <>
      <div className="relative h-36 border-t bg-gradient-to-b from-white to-gray-50 flex">
        {/* SCROLLABLE */}
        <div className="flex-1 overflow-x-auto px-6">
          <div className="flex gap-6 items-center h-full">
            {pages.map((page, index) => (
              <PageThumbnail
                key={page.id}
                page={page}
                index={index}
                active={index === currentPage}
                onClick={() => setCurrentPage(index)}
                onMove={reorderPages}
              />
            ))}
          </div>
        </div>

        {/* FIXED ACTION BAR */}
        <div className="sticky right-0 top-0 h-full bg-white/95 backdrop-blur border-l px-4 flex flex-col justify-center gap-3">
          <StripAction
            icon={<Plus size={16} />}
            label="Add page"
            onClick={() => setOpen(true)}
          />
          <StripAction
            icon={<Copy size={16} />}
            label="Duplicate page"
            onClick={() => duplicatePage(currentPage)}
          />
          <StripAction
            danger
            icon={<Trash2 size={16} />}
            label="Remove page"
            onClick={() => removePage(currentPage)}
          />
        </div>
      </div>

      {/* ADD PAGE MODAL */}
      <Modal
        title="Add page"
        open={open}
        onOk={handleAdd}
        onCancel={() => setOpen(false)}
        okText="Add page"
      >
        <Radio.Group
          onChange={e => setPosition(e.target.value)}
          value={position}
          className="flex flex-col gap-2"
        >
          <Radio value="after">Add after current page</Radio>
          <Radio value="end">Add at end</Radio>
        </Radio.Group>
      </Modal>
    </>
  );
}



function StripAction({ icon, label, onClick, danger }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-3 py-2 rounded-lg border shadow-sm text-sm transition
        ${danger
          ? "text-red-600 hover:bg-red-50"
          : "text-gray-700 hover:bg-gray-100"}
      `}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}


function PageThumbnail({
  page,
  index,
  active,
  onClick,
  onMove,
}) {
  const leftImages = page.images.filter(img => img.x < 350);
  const rightImages = page.images.filter(img => img.x >= 350);

  return (
    <div
      draggable
      onDragStart={e => e.dataTransfer.setData("pageIndex", index)}
      onDragOver={e => e.preventDefault()}
      onDrop={e => {
        const from = Number(e.dataTransfer.getData("pageIndex"));
        onMove(from, index);
      }}
      onClick={onClick}
      className={`group flex flex-col items-center cursor-pointer transition
        ${active ? "scale-105" : "hover:scale-[1.03]"}
      `}
    >
      {/* MINI BOOK */}
      <div
        className={`relative w-36 h-24 rounded-2xl bg-gradient-to-br from-gray-100 to-gray-200
          shadow-md border transition
          ${active
            ? "border-blue-500 ring-2 ring-blue-200"
            : "border-gray-300 group-hover:border-blue-400"}
        `}
      >
        {/* LEFT PAGE */}
        <MiniPage images={leftImages} />

        {/* RIGHT PAGE */}
        <MiniPage right images={rightImages} />

        {/* GUTTER */}
        <div className="absolute top-2 bottom-2 left-1/2 w-px bg-gray-300" />
      </div>

      {/* PAGE NUMBER */}
      <div className="mt-1 text-xs font-medium text-gray-600">
        Page {index * 2 + 1}–{index * 2 + 2}
      </div>
    </div>
  );
}



function MiniPage({ images, right }) {
  return (
    <div
      className={`absolute top-2 bottom-2 w-[46%] bg-white rounded-lg overflow-hidden
        ${right ? "right-2" : "left-2"}
      `}
    >
      {images.map(img => (
        <MiniImage key={img.instanceId} img={img} />
      ))}
    </div>
  );
}

function MiniImage({ img }) {
  return (
    <img
      src={img.src}
      className="absolute rounded-sm"
      style={{
        left: `${(img.x % 350) / 350 * 100}%`,
        top: `${img.y / 480 * 100}%`,
        width: `${img.width / 350 * 100}%`,
        height: `${img.height / 480 * 100}%`,
        transform: `rotate(${img.rotation || 0}deg)`,
        objectFit: "cover",
      }}
    />
  );
}


