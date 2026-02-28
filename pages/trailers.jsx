import { useState } from "react";
import Link from "next/link";
import Layout from "@/src/layouts/Layout";
import TrailerCard from "@/src/components/TrailerCard";
import TrailerFilters from "@/src/components/TrailerFilters";
import { getTrailers } from "@/lib/inventory";

// Helper to parse size string (e.g., "6x12" -> 72 sq ft)
const parseSizeToNumber = (size) => {
  if (!size) return 0;
  const match = size.toLowerCase().match(/(\d+\.?\d*)x(\d+\.?\d*)/);
  if (match) {
    return parseFloat(match[1]) * parseFloat(match[2]);
  }
  return 0;
};

const SIZE_TIERS = [
  {
    tier: "Small",
    sizes: "4x6 – 5x10",
    icon: "fa-solid fa-motorcycle",
    uses: "Utility, motorcycles, small moves, tools & equipment",
  },
  {
    tier: "Standard",
    sizes: "6x10 – 6x12",
    icon: "fa-solid fa-toolbox",
    uses: "General cargo, contractors, landscaping equipment",
  },
  {
    tier: "Mid-Size",
    sizes: "7x12 – 7x18",
    icon: "fa-solid fa-truck-moving",
    uses: "Landscaping, business, mobile workshops, side-by-sides",
  },
  {
    tier: "Full-Size",
    sizes: "8.5x10 – 8.5x20",
    icon: "fa-solid fa-warehouse",
    uses: "Commercial cargo, food trucks, mobile businesses",
  },
  {
    tier: "Large",
    sizes: "8.5x22 – 8.5x36",
    icon: "fa-solid fa-car",
    uses: "Car haulers, race trailers, living quarters, gooseneck",
  },
];

export default function Trailers({ trailers }) {
  const [selectedSort, setSelectedSort] = useState("");

  // Filter trailers — hide sold
  const filteredTrailers = trailers.filter((trailer) => trailer.status !== "Sold");

  // Sort trailers based on selection
  const sortedTrailers = [...filteredTrailers].sort((a, b) => {
    switch (selectedSort) {
      case "size-small":
        return parseSizeToNumber(a.size) - parseSizeToNumber(b.size);
      case "size-large":
        return parseSizeToNumber(b.size) - parseSizeToNumber(a.size);
      default:
        return 0;
    }
  });

  return (
    <Layout>
      {/* Page Header */}
      <section className="page-header gap" style={{ backgroundColor: "var(--bg-secondary)" }}>
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="page-header-content" data-aos="fade-up">
                <h1>Enclosed Trailer Types</h1>
                <p>Diamond Cargo enclosed trailers &mdash; available in sizes from 4x6 to 8.5x36</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Diamond Cargo Intro */}
      <section className="trailer-types-intro">
        <div className="container">
          <div className="intro-content">
            <h2>Built by Diamond Cargo</h2>
            <p>
              All of our enclosed trailers are manufactured by Diamond Cargo, one of the
              industry&apos;s most trusted names in enclosed trailer construction. Every unit
              features heavy-duty steel tube frames, Polycore exterior panels, plywood-lined
              interiors, full LED lighting, and a <strong>5-year limited warranty</strong>.
            </p>
            <p>
              Whether you need a compact 4x6 for tools and equipment or a full-size 8.5x36 car
              hauler, we carry it or we can build it. Custom orders typically take{" "}
              <strong>10&ndash;15 business days</strong> with dozens of upgrade options available.
            </p>
            <div className="intro-cta">
              <Link href="/inventory" className="button button-2">
                <i className="fa-solid fa-boxes-stacked"></i> View Current Inventory
              </Link>
              <Link href="/get-a-quote" className="button-outline">
                <i className="fa-solid fa-hammer"></i> Request a Custom Build
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Size Guide */}
      <section className="size-guide-section">
        <div className="container">
          <h3>Size Guide</h3>
          <p className="size-guide-subtitle">
            Not sure what size you need? Here&apos;s a quick breakdown.
          </p>
          <div className="size-guide-grid">
            {SIZE_TIERS.map((tier) => (
              <div key={tier.tier} className="size-guide-card">
                <div className="size-guide-icon">
                  <i className={tier.icon}></i>
                </div>
                <h4>{tier.tier}</h4>
                <span className="size-guide-range">{tier.sizes}</span>
                <p>{tier.uses}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trailer Types Grid */}
      <section className="inventory-section gap">
        <div className="container">
          <h3 style={{ marginBottom: "1.5rem" }}>Standard Models &amp; Specs</h3>

          {/* Filters */}
          <TrailerFilters selectedSort={selectedSort} onSortChange={setSelectedSort} />

          {/* Results Count */}
          <div className="inventory-results-count">
            <p>
              Showing <strong>{sortedTrailers.length}</strong> trailer type
              {sortedTrailers.length !== 1 ? "s" : ""}
            </p>
          </div>

          {/* Trailer Grid */}
          {sortedTrailers.length > 0 ? (
            <div className="trailer-grid">
              {sortedTrailers.map((trailer) => (
                <TrailerCard key={trailer.id} trailer={trailer} />
              ))}
            </div>
          ) : (
            <div className="no-results">
              <p>No trailers found matching your criteria.</p>
              <button className="button button-2" onClick={() => setSelectedSort("")}>
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Axle & Nose Types Info */}
      <section className="trailer-info-section gap">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="info-block">
                <h3>
                  <i className="fa-solid fa-circle-nodes"></i> Axle Types
                </h3>
                <div className="info-items">
                  <div className="info-item">
                    <strong>Single Axle</strong>
                    <span>
                      One axle (2 wheels). Lighter, easier to tow. Typical on trailers up to 6x12.
                    </span>
                  </div>
                  <div className="info-item">
                    <strong>Tandem Axle</strong>
                    <span>
                      Two axles (4 wheels). More stability, higher payload capacity. Standard on
                      7x12 and larger.
                    </span>
                  </div>
                  <div className="info-item">
                    <strong>Triple Axle</strong>
                    <span>
                      Three axles (6 wheels). Heavy-duty for the largest trailers (8.5x28+).
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="info-block">
                <h3>
                  <i className="fa-solid fa-shapes"></i> Nose Types
                </h3>
                <div className="info-items">
                  <div className="info-item">
                    <strong>V-Nose</strong>
                    <span>
                      Tapers to a point at the front. Better aerodynamics, extra interior space.
                      Most popular option.
                    </span>
                  </div>
                  <div className="info-item">
                    <strong>Slant V-Nose</strong>
                    <span>
                      Partial V-shape. Compromise between V-Nose and Flat Front for moderate
                      aerodynamics.
                    </span>
                  </div>
                  <div className="info-item">
                    <strong>Flat Front</strong>
                    <span>
                      Square front wall. Maximum interior width at the front. Common on smaller
                      trailers.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export async function getStaticProps() {
  const trailers = getTrailers();

  return {
    props: {
      trailers,
    },
  };
}
