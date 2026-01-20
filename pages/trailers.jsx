import { useState } from "react";
import Layout from "@/src/layouts/Layout";
import TrailerCard from "@/src/components/TrailerCard";
import TrailerFilters from "@/src/components/TrailerFilters";
import { getTrailers, getCategories } from "@/lib/inventory";

// Helper to parse size string (e.g., "6x12" -> 72 sq ft)
const parseSizeToNumber = (size) => {
  if (!size) return 0;
  const match = size.toLowerCase().match(/(\d+\.?\d*)x(\d+\.?\d*)/);
  if (match) {
    return parseFloat(match[1]) * parseFloat(match[2]);
  }
  return 0;
};

export default function Trailers({ trailers, categories }) {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSort, setSelectedSort] = useState("");

  // Filter trailers based on category
  const filteredTrailers = trailers.filter((trailer) => {
    const matchesCategory = !selectedCategory || trailer.category === selectedCategory;
    // Hide sold trailers from public grid by default
    const notSold = trailer.status !== "Sold";
    return matchesCategory && notSold;
  });

  // Sort trailers based on selection
  const sortedTrailers = [...filteredTrailers].sort((a, b) => {
    switch (selectedSort) {
      case "price-low":
        return (a.price || 0) - (b.price || 0);
      case "price-high":
        return (b.price || 0) - (a.price || 0);
      case "size-small":
        return parseSizeToNumber(a.size) - parseSizeToNumber(b.size);
      case "size-large":
        return parseSizeToNumber(b.size) - parseSizeToNumber(a.size);
      case "newest":
        return (b.id || 0) - (a.id || 0);
      case "oldest":
        return (a.id || 0) - (b.id || 0);
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
                <h1>Our Trailers</h1>
                <p>Browse our selection of quality trailers at competitive prices</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Inventory Section */}
      <section className="inventory-section gap">
        <div className="container">
          {/* Filters */}
          <TrailerFilters
            categories={categories}
            selectedCategory={selectedCategory}
            selectedSort={selectedSort}
            onCategoryChange={setSelectedCategory}
            onSortChange={setSelectedSort}
          />

          {/* Results Count */}
          <div className="inventory-results-count">
            <p>
              Showing <strong>{sortedTrailers.length}</strong> trailer
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
              <button
                className="button button-2"
                onClick={() => {
                  setSelectedCategory("");
                  setSelectedSort("");
                }}
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}

export async function getStaticProps() {
  const trailers = getTrailers();
  const categories = getCategories();

  return {
    props: {
      trailers,
      categories,
    },
  };
}
