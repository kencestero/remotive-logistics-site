/**
 * TrailerFilters - Category dropdown and Sort By dropdown
 */
export default function TrailerFilters({
  categories,
  selectedCategory,
  selectedSort,
  onCategoryChange,
  onSortChange,
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
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="size-small">Size: Small to Large</option>
          <option value="size-large">Size: Large to Small</option>
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
        </select>
      </div>
    </div>
  );
}
