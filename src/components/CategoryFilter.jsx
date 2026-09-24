function CategoryFilter({
  categories,
  selectedCategory,
  setSelectedCategory,
}) {
  return (
    <select
      className="category-filter"
      value={selectedCategory}
      onChange={(event) => setSelectedCategory(event.target.value)}
    >
      <option value="all">All Categories</option>

      {categories.map((category) => (
        <option
          key={category.slug}
          value={category.slug}
        >
          {category.name}
        </option>
      ))}
    </select>
  );
}

export default CategoryFilter;