import { useState } from "react";
import Layout from "@/src/layouts/Layout";
import TrailerCard from "@/src/components/TrailerCard";
import TrailerFilters from "@/src/components/TrailerFilters";
import { getTrailers, getCategories, getStatuses } from "@/lib/inventory";

export default function Inventory({ trailers, categories, statuses }) {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");

  // Filter trailers based on selection
  const filteredTrailers = trailers.filter((trailer) => {
    const matchesCategory = !selectedCategory || trailer.category === selectedCategory;
    const matchesStatus = !selectedStatus || trailer.status === selectedStatus;
    // Hide sold trailers from public grid by default
    const notSold = trailer.status !== "Sold";
    return matchesCategory && matchesStatus && notSold;
  });

  return (
    <Layout>
      {/* Page Header */}
      <section className="page-header gap" style={{ backgroundColor: "var(--bg-secondary)" }}>
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="page-header-content" data-aos="fade-up">
                <h1>Trailer Inventory</h1>
                <p>Browse our selection of quality trailers</p>
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
            statuses={statuses}
            selectedCategory={selectedCategory}
            selectedStatus={selectedStatus}
            onCategoryChange={setSelectedCategory}
            onStatusChange={setSelectedStatus}
          />

          {/* Results Count */}
          <div className="inventory-results-count">
            <p>
              Showing <strong>{filteredTrailers.length}</strong> trailer
              {filteredTrailers.length !== 1 ? "s" : ""}
            </p>
          </div>

          {/* Trailer Grid */}
          {filteredTrailers.length > 0 ? (
            <div className="trailer-grid">
              {filteredTrailers.map((trailer) => (
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
                  setSelectedStatus("");
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
  const statuses = getStatuses();

  return {
    props: {
      trailers,
      categories,
      statuses,
    },
  };
}
