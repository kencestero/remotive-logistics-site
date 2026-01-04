import { useState, useEffect, useCallback } from "react";

/**
 * ImageModal - Full-screen image gallery with navigation
 */
export default function ImageModal({ images, initialIndex = 0, isOpen, onClose, trailerName }) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  // Reset index when modal opens with new initialIndex
  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(initialIndex);
    }
  }, [isOpen, initialIndex]);

  // Navigation handlers
  const goToPrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  }, [images.length]);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  }, [images.length]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowLeft") {
        goToPrevious();
      } else if (e.key === "ArrowRight") {
        goToNext();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    // Prevent body scroll when modal is open
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose, goToPrevious, goToNext]);

  if (!isOpen || !images || images.length === 0) return null;

  return (
    <div className="image-modal-overlay" onClick={onClose}>
      <div className="image-modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Close button */}
        <button className="image-modal-close" onClick={onClose} aria-label="Close gallery">
          <i className="fa-solid fa-xmark" />
        </button>

        {/* Main image */}
        <div className="image-modal-main">
          <img
            src={images[currentIndex]}
            alt={`${trailerName} - Image ${currentIndex + 1} of ${images.length}`}
          />
        </div>

        {/* Navigation arrows (only show if multiple images) */}
        {images.length > 1 && (
          <>
            <button
              className="image-modal-nav image-modal-prev"
              onClick={goToPrevious}
              aria-label="Previous image"
            >
              <i className="fa-solid fa-chevron-left" />
            </button>
            <button
              className="image-modal-nav image-modal-next"
              onClick={goToNext}
              aria-label="Next image"
            >
              <i className="fa-solid fa-chevron-right" />
            </button>
          </>
        )}

        {/* Image counter */}
        <div className="image-modal-counter">
          {currentIndex + 1} / {images.length}
        </div>

        {/* Thumbnail strip */}
        {images.length > 1 && (
          <div className="image-modal-thumbs">
            {images.map((img, index) => (
              <button
                key={index}
                className={`image-modal-thumb ${index === currentIndex ? "active" : ""}`}
                onClick={() => setCurrentIndex(index)}
                aria-label={`View image ${index + 1}`}
              >
                <img src={img} alt={`Thumbnail ${index + 1}`} />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
