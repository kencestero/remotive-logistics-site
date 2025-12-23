import { getStatusLabel } from "@/lib/inventory";

/**
 * TrailerFilters - Category dropdown and status tabs
 */
export default function TrailerFilters({
  categories,
  statuses,
  selectedCategory,
  selectedStatus,
  onCategoryChange,
  onStatusChange,
}) {
  return (
    <div className="trailer-filters">
      {/* Category Dropdown */}
      <div className="filter-group">
        <label htmlFor="category-filter">Category</label>
        <select
          id="category-filter"
          value={selectedCategory}
          onChange={(e) => onCategoryChange(e.target.value)}
          className="filter-select"
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Status Pills */}
      <div className="filter-group">
        <label>Status</label>
        <div className="status-pills">
          <button
            className={`status-pill ${selectedStatus === "" ? "active" : ""}`}
            onClick={() => onStatusChange("")}
          >
            All
          </button>
          {statuses
            .filter((s) => s !== "Sold") // Don't show Sold filter on public page
            .map((status) => (
              <button
                key={status}
                className={`status-pill ${selectedStatus === status ? "active" : ""}`}
                onClick={() => onStatusChange(status)}
              >
                {getStatusLabel(status)}
              </button>
            ))}
        </div>
      </div>
    </div>
  );
}
