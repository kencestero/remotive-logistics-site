import { useState } from "react";
import Link from "next/link";
import Layout from "@/src/layouts/Layout";
import ImageModal from "@/src/components/ImageModal";
import FinanceCalculator from "@/src/components/FinanceCalculator";
import {
  getTrailerBySlug,
  getAllTrailerSlugs,
  formatPrice,
  getStatusLabel,
  getTrailerImage,
  getUpgrades,
  getUpgradesDisclaimer,
  getWarranty,
  getBuildTime,
} from "@/lib/inventory";

export default function TrailerDetail({
  trailer,
  upgrades,
  upgradesDisclaimer,
  warranty,
  buildTime,
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImageIndex, setModalImageIndex] = useState(0);

  if (!trailer) {
    return (
      <Layout>
        <section className="page-header gap">
          <div className="container">
            <h1>Trailer Not Found</h1>
            <Link href="/trailers" className="button button-2">
              Back to Trailers
            </Link>
          </div>
        </section>
      </Layout>
    );
  }

  const statusLabel = getStatusLabel(trailer.status);
  const imageSrc = getTrailerImage(trailer);
  const images = trailer.images || [imageSrc];

  // Status badge color classes
  const statusColors = {
    Stock: "status-in-stock",
    "In-Transit": "status-arriving",
    Sold: "status-sold",
    "On Sale": "status-sale",
    Repo: "status-repo",
  };
  const statusClass = statusColors[trailer.status] || "status-default";

  // Axle type display
  const axleLabel = trailer.axleType === "TA" ? "Tandem Axle" : "Single Axle";

  // Open modal at specific image
  const openModal = (index = 0) => {
    setModalImageIndex(index);
    setIsModalOpen(true);
  };

  return (
    <Layout>
      {/* Breadcrumb */}
      <section className="breadcrumb-section">
        <div className="container">
          <nav className="breadcrumb">
            <Link href="/">Home</Link>
            <span>/</span>
            <Link href="/trailers">Trailers</Link>
            <span>/</span>
            <span>{trailer.name}</span>
          </nav>
        </div>
      </section>

      {/* Main Content */}
      <section className="trailer-detail gap">
        <div className="container">
          <div className="row">
            {/* Image Column */}
            <div className="col-lg-7">
              <div className="trailer-detail-image" onClick={() => openModal(0)}>
                <img src={imageSrc} alt={trailer.name} />
                <span className={`trailer-status-badge large ${statusClass}`}>{statusLabel}</span>
                <div className="image-zoom-hint">
                  <i className="fa-solid fa-expand" />
                  <span>Click to enlarge</span>
                </div>
              </div>

              {/* Image Gallery Thumbnails */}
              {images.length > 1 && (
                <div className="trailer-gallery">
                  {images.map((img, index) => (
                    <button
                      key={index}
                      className={`gallery-thumb ${index === 0 ? "active" : ""}`}
                      onClick={() => openModal(index)}
                    >
                      <img src={img} alt={`${trailer.name} - View ${index + 1}`} />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Info Column */}
            <div className="col-lg-5">
              <div className="trailer-detail-info">
                <span className="trailer-category-tag">{trailer.category}</span>
                <h1>{trailer.name}</h1>

                {/* Quick specs badges */}
                <div className="trailer-spec-badges">
                  <span className="spec-badge">{trailer.size}</span>
                  <span className="spec-badge">{axleLabel}</span>
                  {trailer.standardHeight && (
                    <span className="spec-badge">{trailer.standardHeight} Standard Height</span>
                  )}
                </div>

                {/* Optional heights */}
                {trailer.optionalHeights && trailer.optionalHeights.length > 0 && (
                  <p className="optional-heights">
                    <strong>Height Options:</strong> {trailer.optionalHeights.join(", ")} available
                  </p>
                )}

                {/* Price Block */}
                <div className="trailer-price-block">
                  <span className="price-label">{trailer.priceLabel || "Starting at"}</span>
                  <span className="price-value">{formatPrice(trailer.price)}</span>
                </div>

                {trailer.description && (
                  <p className="trailer-description">{trailer.description}</p>
                )}

                {/* Warranty & Build Time Badges */}
                <div className="info-badges">
                  {warranty && warranty.duration && (
                    <div className="info-badge warranty-badge">
                      <i className="fa-solid fa-shield-check" />
                      <div>
                        <strong>
                          {warranty.duration} {warranty.type}
                        </strong>
                        <span>{warranty.description}</span>
                      </div>
                    </div>
                  )}
                  {buildTime && buildTime.standard && (
                    <div className="info-badge build-badge">
                      <i className="fa-solid fa-clock" />
                      <div>
                        <strong>Build Time: {buildTime.standard}</strong>
                        <span>{buildTime.disclaimer}</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Finance Calculator */}
                <FinanceCalculator price={trailer.price} />

                {/* CTA Buttons */}
                <div className="trailer-cta">
                  <Link href="/get-approved" className="button button-2">
                    Get Pre-Approved
                  </Link>
                  <Link href="/contact" className="button button-outline">
                    Request a Quote
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Features Section */}
          {trailer.features && trailer.features.length > 0 && (
            <div className="trailer-features-section">
              <h3>Standard Features</h3>
              <ul className="features-grid">
                {trailer.features.map((feature, index) => (
                  <li key={index}>
                    <i className="fa-solid fa-check" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Upgrades Section */}
          {upgrades && upgrades.length > 0 && (
            <div className="trailer-upgrades-section">
              <h3>Available Upgrades</h3>
              <ul className="upgrades-list">
                {upgrades.map((upgrade, index) => (
                  <li key={index}>
                    <i className="fa-solid fa-plus-circle" />
                    {upgrade}
                  </li>
                ))}
              </ul>
              {upgradesDisclaimer && <p className="upgrades-disclaimer">{upgradesDisclaimer}</p>}
            </div>
          )}

          {/* Back to Trailers */}
          <div className="back-link">
            <Link href="/trailers">
              <i className="fa-solid fa-arrow-left" /> Back to All Trailers
            </Link>
          </div>
        </div>
      </section>

      {/* Image Modal */}
      <ImageModal
        images={images}
        initialIndex={modalImageIndex}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        trailerName={trailer.name}
      />
    </Layout>
  );
}

export async function getStaticPaths() {
  const slugs = getAllTrailerSlugs();

  return {
    paths: slugs.map((slug) => ({ params: { slug } })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const trailer = getTrailerBySlug(params.slug);
  const upgrades = getUpgrades();
  const upgradesDisclaimer = getUpgradesDisclaimer();
  const warranty = getWarranty();
  const buildTime = getBuildTime();

  return {
    props: {
      trailer,
      upgrades,
      upgradesDisclaimer,
      warranty,
      buildTime,
    },
  };
}
