import { useState } from "react";
import Link from "next/link";
import Layout from "@/src/layouts/Layout";
import ImageModal from "@/src/components/ImageModal";
import {
  getTrailerBySlug,
  getAllTrailerSlugs,
  getStatusLabel,
  getTrailerImage,
  getUpgrades,
  getUpgradesDisclaimer,
  getWarranty,
  getBuildTime,
} from "@/lib/inventory";
import { fetchPublicInventory } from "@/lib/saleshub-inventory";

export default function TrailerDetail({
  trailer,
  upgrades,
  upgradesDisclaimer,
  warranty,
  buildTime,
  availableCount,
  totalAvailable,
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
              Back to Trailer Types
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

  const quoteUrl = `/get-a-quote?type=${encodeURIComponent(trailer.category)}&trailer=${encodeURIComponent(trailer.name)}`;

  return (
    <Layout>
      {/* Breadcrumb */}
      <section className="breadcrumb-section">
        <div className="container">
          <nav className="breadcrumb">
            <Link href="/">Home</Link>
            <span>/</span>
            <Link href="/trailers">Trailer Types</Link>
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

                {/* Live Stock Count Badge */}
                {availableCount > 0 && (
                  <Link href={`/inventory`} className="live-stock-badge">
                    <span className="stock-pulse"></span>
                    <span>
                      <strong>{availableCount}</strong> {trailer.size} units currently in stock
                    </span>
                    <i className="fa-solid fa-arrow-right"></i>
                  </Link>
                )}

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
                        <strong>Custom Build: {buildTime.standard}</strong>
                        <span>{buildTime.disclaimer}</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* CTA Buttons */}
                <div className="trailer-cta">
                  <Link href="/inventory" className="button button-2">
                    <i className="fa-solid fa-boxes-stacked"></i> Check Availability
                  </Link>
                  <Link href={quoteUrl} className="button button-outline">
                    <i className="fa-solid fa-file-lines"></i> Request a Quote
                  </Link>
                </div>

                {/* Trust Strip */}
                <div className="trailer-trust-strip">
                  <div className="trust-item">
                    <i className="fa-solid fa-shield-check"></i>
                    <span>5-Year Warranty</span>
                  </div>
                  <div className="trust-item">
                    <i className="fa-solid fa-hammer"></i>
                    <span>10-15 Day Builds</span>
                  </div>
                  <div className="trust-item">
                    <i className="fa-solid fa-calculator"></i>
                    <span>Financing Available</span>
                  </div>
                  {totalAvailable > 0 && (
                    <div className="trust-item">
                      <i className="fa-solid fa-warehouse"></i>
                      <span>{totalAvailable}+ In Stock</span>
                    </div>
                  )}
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

          {/* Custom Build CTA Section */}
          <div className="custom-build-cta">
            <div className="custom-build-content">
              <h3>Don&apos;t see exactly what you need?</h3>
              <p>
                We can custom-build your ideal {trailer.size} trailer in 10&ndash;15 business days.
                Choose from dozens of upgrades including height increases, electrical packages, A/C,
                custom colors, and more.
              </p>
              <Link href={quoteUrl} className="button button-2">
                <i className="fa-solid fa-hammer"></i> Request a Custom Build
              </Link>
            </div>
          </div>

          {/* Back to Trailers */}
          <div className="back-link">
            <Link href="/trailers">
              <i className="fa-solid fa-arrow-left" /> Back to Trailer Types
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

  // Fetch live stock count for this trailer's size
  let availableCount = 0;
  let totalAvailable = 0;
  try {
    const inventoryData = await fetchPublicInventory();
    if (!inventoryData._fallback && trailer) {
      totalAvailable = inventoryData.totalAvailable || 0;
      availableCount = inventoryData.stockBySize?.[trailer.size] || 0;
    }
  } catch {
    // Silently fail — page still works without live count
  }

  return {
    props: {
      trailer,
      upgrades,
      upgradesDisclaimer,
      warranty,
      buildTime,
      availableCount,
      totalAvailable,
    },
    revalidate: 300,
  };
}
