const SearchBar = () => {
    return (
        <div className="searchbar">
            <button type="submit" className="loupe-button"><svg className="loupe" height="25" width="25"></svg></button>
            <input type="search" placeholder="Przeszukaj pocztę"/>
            <button type="button" className="sliders-button"><svg className="sliders" height="25" width="25"></svg></button>
        </div>
    )
}

export default SearchBar