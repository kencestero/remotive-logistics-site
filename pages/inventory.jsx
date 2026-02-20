import { useState } from "react";
import Layout from "@/src/layouts/Layout";
import Link from "next/link";
import InventoryCard from "@/src/components/InventoryCard";
import { fetchPublicInventory } from "@/lib/saleshub-inventory";

// Helper to parse size string (e.g., "6x12" -> 72)
const parseSizeToNumber = (size) => {
  if (!size) return 0;
  const match = size.toLowerCase().match(/(\d+\.?\d*)x(\d+\.?\d*)/);
  if (match) {
    return parseFloat(match[1]) * parseFloat(match[2]);
  }
  return 0;
};

export default function Inventory({ totalAvailable, stockBySize, units, isFallback }) {
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedSort, setSelectedSort] = useState("");

  // Filter by size
  const filteredUnits = units.filter((unit) => {
    return !selectedSize || unit.size === selectedSize;
  });

  // Sort
  const sortedUnits = [...filteredUnits].sort((a, b) => {
    switch (selectedSort) {
      case "price-low":
        return (a.startingPrice || 0) - (b.startingPrice || 0);
      case "price-high":
        return (b.startingPrice || 0) - (a.startingPrice || 0);
      case "size-small":
        return parseSizeToNumber(a.size) - parseSizeToNumber(b.size);
      case "size-large":
        return parseSizeToNumber(b.size) - parseSizeToNumber(a.size);
      default:
        return 0;
    }
  });

  // Available sizes for filter dropdown
  const availableSizes = Object.keys(stockBySize || {}).sort(
    (a, b) => parseSizeToNumber(a) - parseSizeToNumber(b)
  );

  return (
    <Layout>
      {/* Page Header */}
      <section className="page-header gap" style={{ backgroundColor: "var(--bg-secondary)" }}>
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="page-header-content" data-aos="fade-up">
                <h1>Available Inventory</h1>
                <p>
                  {totalAvailable > 0
                    ? `${totalAvailable} trailers ready for immediate purchase`
                    : "Browse our available trailers"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="inventory-section gap">
        <div className="container">
          {/* Fallback: API is down */}
          {isFallback ? (
            <div className="inventory-fallback">
              <h3>Inventory Temporarily Unavailable</h3>
              <p>
                We&apos;re having trouble loading our current inventory. Please check back shortly,
                or contact us directly for availability.
              </p>
              <div
                style={{
                  display: "flex",
                  gap: "1rem",
                  justifyContent: "center",
                  flexWrap: "wrap",
                }}
              >
                <Link href="/get-a-quote" className="button button-2">
                  Request a Quote
                </Link>
                <Link href="/trailers" className="button-outline">
                  View Trailer Catalog
                </Link>
              </div>
            </div>
          ) : (
            <>
              {/* Stock Summary by Size */}
              {availableSizes.length > 0 && (
                <div className="stock-summary">
                  {availableSizes.map((size) => (
                    <div key={size} className="stock-summary-item">
                      <span className="stock-count">{stockBySize[size]}</span>
                      <span className="stock-size">{size}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Filters */}
              <div className="trailer-filters">
                <div className="filter-group">
                  <label htmlFor="size-filter">Size</label>
                  <select
                    id="size-filter"
                    value={selectedSize}
                    onChange={(e) => setSelectedSize(e.target.value)}
                    className="filter-select"
                  >
                    <option value="">All Sizes</option>
                    {availableSizes.map((size) => (
                      <option key={size} value={size}>
                        {size} ({stockBySize[size]} available)
                      </option>
                    ))}
                  </select>
                </div>
                <div className="filter-group">
                  <label htmlFor="sort-filter">Sort By</label>
                  <select
                    id="sort-filter"
                    value={selectedSort}
                    onChange={(e) => setSelectedSort(e.target.value)}
                    className="filter-select"
                  >
                    <option value="">Default</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="size-small">Size: Small to Large</option>
                    <option value="size-large">Size: Large to Small</option>
                  </select>
                </div>
              </div>

              {/* Results Count */}
              <div className="inventory-results-count">
                <p>
                  Showing <strong>{sortedUnits.length}</strong> trailer
                  {sortedUnits.length !== 1 ? "s" : ""}
                </p>
              </div>

              {/* Unit Grid */}
              {sortedUnits.length > 0 ? (
                <div className="trailer-grid">
                  {sortedUnits.map((unit) => (
                    <InventoryCard key={unit.id} unit={unit} />
                  ))}
                </div>
              ) : (
                <div className="no-results">
                  <p>No trailers found matching your criteria.</p>
                  <button
                    className="button button-2"
                    onClick={() => {
                      setSelectedSize("");
                      setSelectedSort("");
                    }}
                  >
                    Clear Filters
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </Layout>
  );
}

export async function getStaticProps() {
  const data = await fetchPublicInventory();

  return {
    props: {
      totalAvailable: data.totalAvailable || 0,
      stockBySize: data.stockBySize || {},
      units: data.units || [],
      isFallback: !!data._fallback,
    },
    revalidate: 60,
  };
}
