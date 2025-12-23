import Link from "next/link";
import Layout from "@/src/layouts/Layout";
import PromoBanner from "@/src/components/PromoBanner";
import {
  getTrailerBySlug,
  getAllTrailerSlugs,
  formatPrice,
  getStatusLabel,
  getTrailerImage,
} from "@/lib/inventory";

export default function TrailerDetail({ trailer }) {
  if (!trailer) {
    return (
      <Layout>
        <section className="page-header gap">
          <div className="container">
            <h1>Trailer Not Found</h1>
            <Link href="/inventory" className="button button-2">
              Back to Inventory
            </Link>
          </div>
        </section>
      </Layout>
    );
  }

  const statusLabel = getStatusLabel(trailer.status);
  const imageSrc = getTrailerImage(trailer);

  // Status badge color classes
  const statusColors = {
    Stock: "status-in-stock",
    "In-Transit": "status-arriving",
    Sold: "status-sold",
    "On Sale": "status-sale",
    Repo: "status-repo",
  };
  const statusClass = statusColors[trailer.status] || "status-default";

  return (
    <Layout>
      {/* Breadcrumb */}
      <section className="breadcrumb-section">
        <div className="container">
          <nav className="breadcrumb">
            <Link href="/">Home</Link>
            <span>/</span>
            <Link href="/inventory">Inventory</Link>
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
              <div className="trailer-detail-image">
                <img src={imageSrc} alt={trailer.name} />
                <span className={`trailer-status-badge large ${statusClass}`}>{statusLabel}</span>
              </div>

              {/* Image Gallery (if multiple images) */}
              {trailer.images && trailer.images.length > 1 && (
                <div className="trailer-gallery">
                  {trailer.images.map((img, index) => (
                    <div key={index} className="gallery-thumb">
                      <img src={img} alt={`${trailer.name} - Image ${index + 1}`} />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Info Column */}
            <div className="col-lg-5">
              <div className="trailer-detail-info">
                <span className="trailer-category-tag">{trailer.category}</span>
                <h1>{trailer.name}</h1>
                <p className="trailer-size-detail">{trailer.size}</p>

                <div className="trailer-price-block">
                  <span className="price-label">Starting at</span>
                  <span className="price-value">{formatPrice(trailer.price)}</span>
                </div>

                {trailer.description && (
                  <p className="trailer-description">{trailer.description}</p>
                )}

                {/* Specs */}
                {trailer.specs && Object.keys(trailer.specs).length > 0 && (
                  <div className="trailer-specs">
                    <h4>Specifications</h4>
                    <dl>
                      {Object.entries(trailer.specs).map(([key, value]) => (
                        <div key={key} className="spec-row">
                          <dt>{key.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}</dt>
                          <dd>{value}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                )}

                {/* CTA */}
                <div className="trailer-cta">
                  <Link href="/contacts" className="button button-2">
                    Get a Quote
                  </Link>
                  <Link href="/inventory" className="button button-outline">
                    Back to Inventory
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Promo Banner */}
          <PromoBanner price={trailer.price} />
        </div>
      </section>
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

  return {
    props: {
      trailer,
    },
  };
}
