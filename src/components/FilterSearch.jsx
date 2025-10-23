const FilterSearch = ({filteredSearch , onSearchChange}) =>{
    return (
        <div>
            <strong>Filter shown with</strong>
            <input type="search" value={filteredSearch} onChange={onSearchChange}/>
        </div>
    )
}

export default FilterSearch