import React, { useState } from "react";
import ImageUploader from "../components/uploader/ImageUploader";
import ImageLibrary from "../components/uploader/ImageLibrary";
import ImagePreview from "../components/uploader/ImagePreview";
import BookPage from "../components/book/BookPage";
import TopBar from "../components/layout/TopBar";
import PageStrip from "../components/pagestrip/PageStrip";
import LeftPanel from "../components/uploader/LeftPanel";

export default function Editor() {
  const [libraryImages, setLibraryImages] = useState([]);
  const [bookImages, setBookImages] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [hoveredImage, setHoveredImage] = useState(null);

  const totalPhotos = libraryImages.length;
  const usedPhotos = libraryImages.filter(i => i.usedCount > 0).length;

  const [pages, setPages] = useState([
    { id: crypto.randomUUID(), images: [] },
  ]);
  const [currentPage, setCurrentPage] = useState(0);

  
  const addPage = (position = "end") => {
  setPages(prev => {
    const copy = [...prev];
    const newPage = { id: crypto.randomUUID(), images: [] };

    if (position === "after") {
      copy.splice(currentPage + 1, 0, newPage);
    } else {
      copy.push(newPage);
    }

    return copy;
  });

  if (position === "after") {
    setCurrentPage(p => p + 1);
  }
};


  
const removePage = (index) => {
  setPages(prev => {
    const pageToRemove = prev[index];

    if (pageToRemove) {
      setLibraryImages(lib =>
        lib.map(img => {
          const count = pageToRemove.images.filter(
            pImg => pImg.libraryId === img.id
          ).length;

          return count > 0
            ? { ...img, usedCount: Math.max(0, img.usedCount - count) }
            : img;
        })
      );
    }

    const newPages = prev.filter((_, i) => i !== index);

    return newPages.length ? newPages : [{ id: crypto.randomUUID(), images: [] }];
  });

  setCurrentPage(prev => Math.max(0, prev - 1));
};


const duplicatePage = (index) => {
  setPages(prev => {
    const page = prev[index];
    if (!page) return prev;

    // increment usedCount for duplicated images
    setLibraryImages(lib =>
      lib.map(img => {
        const count = page.images.filter(
          pImg => pImg.libraryId === img.id
        ).length;

        return count > 0
          ? { ...img, usedCount: img.usedCount + count }
          : img;
      })
    );

    const clonedImages = page.images.map(img => ({
      ...img,
      instanceId: crypto.randomUUID(),
    }));

    const newPage = {
      id: crypto.randomUUID(),
      images: clonedImages,
    };

    const copy = [...prev];
    copy.splice(index + 1, 0, newPage);
    return copy;
  });
};


  const deleteSelected = () => {
    const used = libraryImages.some(
      img => selectedIds.includes(img.id) && img.usedCount > 0
    );

    if (used) {
      alert("Remove image from book before deleting.");
      return;
    }

    setLibraryImages(prev =>
      prev.filter(img => !selectedIds.includes(img.id))
    );
    setSelectedIds([]);
  };

  const handleDropToBook = (libraryImage, pos) => {
    setPages(prev =>
      prev.map((p, i) =>
        i === currentPage
          ? {
            ...p,
            images: [
              ...p.images,
              {
                instanceId: crypto.randomUUID(),
                libraryId: libraryImage.id,
                src: libraryImage.src,
                x: pos.x,
                y: pos.y,
                width: 120,
                height: 90,
                rotation: 0,
              },
            ],
          }
          : p
      )
    );

    setLibraryImages(prev =>
      prev.map(img =>
        img.id === libraryImage.id
          ? { ...img, usedCount: img.usedCount + 1 }
          : img
      )
    );
  };

 const handleUpdateImage = (updated) => {
  setPages(prevPages => {
    const newPages = prevPages.map(page => {
      const imgs = [...page.images];
      const index = imgs.findIndex(i => i.instanceId === updated.instanceId);

      if (index === -1) return page;

      // DELETE
      if (updated._delete) {
        const removed = imgs[index]; // capture before removal
        imgs.splice(index, 1);

        // Decrement usedCount safely
        setLibraryImages(prevLib =>
          prevLib.map(img =>
            img.id === removed.libraryId
              ? { ...img, usedCount: Math.max(0, img.usedCount - 1) }
              : img
          )
        );
      }

      // LAYER ACTIONS
      else if (updated._layerAction) {
        const img = imgs[index];
        imgs.splice(index, 1);

        switch (updated._layerAction) {
          case "front":
            imgs.push(img);
            break;
          case "back":
            imgs.unshift(img);
            break;
          case "forward":
            imgs.splice(Math.min(index + 1, imgs.length), 0, img);
            break;
          case "backward":
            imgs.splice(Math.max(index - 1, 0), 0, img);
            break;
        }
      }

      // NORMAL UPDATE
      else {
        imgs[index] = updated;
      }

      return { ...page, images: imgs };
    });

    return newPages;
  });
};


const reorderPages = (from, to) => {
  setPages(prev => {
    const copy = [...prev];
    const [moved] = copy.splice(from, 1);
    copy.splice(to, 0, moved);
    return copy;
  });

  setCurrentPage(to);
};




  return (
    <div className="h-screen flex flex-col">
      {/* TOP BAR */}
      <TopBar />

      {/* MAIN */}
      <div className="flex flex-1 overflow-hidden">
        {/* LEFT PANEL */}
        <LeftPanel
          images={libraryImages}
          selectedIds={selectedIds}
          setSelectedIds={setSelectedIds}
          onImagesAdded={imgs =>
            setLibraryImages(prev => [...prev, ...imgs])
          }
          onDeleteSelected={deleteSelected}
          usedPhotos={usedPhotos}
          totalPhotos={totalPhotos}
          onHoverImage={setHoveredImage}
        />

        <ImagePreview image={hoveredImage} />

        {/* BOOK */}
        <div className="flex-1 bg-gray-100 flex items-center justify-center">
          <BookPage
            images={pages[currentPage].images}
            onDropImage={handleDropToBook}
            onUpdateImage={handleUpdateImage}
          />


        </div>
      </div>

      {/* PAGE STRIP */}
      <PageStrip
        pages={pages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        addPage={addPage}
        removePage={removePage}
        duplicatePage={duplicatePage}
        reorderPages={reorderPages}
      />
    </div >

  );
}
