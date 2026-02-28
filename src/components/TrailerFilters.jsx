/**
 * TrailerFilters - Sort By dropdown (no price sorting)
 */
export default function TrailerFilters({ selectedSort, onSortChange }) {
  return (
    <div className="trailer-filters">
      {/* Sort By Dropdown */}
      <div className="filter-group">
        <label htmlFor="sort-filter">Sort By</label>
        <select
          id="sort-filter"
          value={selectedSort}
          onChange={(e) => onSortChange(e.target.value)}
          className="filter-select"
        >
          <option value="">Default</option>
          <option value="size-small">Size: Small to Large</option>
          <option value="size-large">Size: Large to Small</option>
        </select>
      </div>
    </div>
  );
}
