import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { loadSearchResultsThunk } from "../../store/search";
import { useSearch } from "../../context/SearchContext";

function Search() {
  const dispatch = useDispatch();
  const history = useHistory();

  const { setSearchQuery, searchQuery } = useSearch();

  const handleSearch = async (e) => {
    e.preventDefault();
    dispatch(loadSearchResultsThunk(searchQuery));
    setSearchQuery("");
    history.push("/search");
  };

  return (
    <div>
      <div className="search__form-container">
        <form className="search__form-input" onSubmit={handleSearch}>
          <input
            style={{fontFamily: "sans-serif, FontAwesome"}}
            type="text"
            placeholder="  Search Furniture"
            maxLength="80"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          <button type="submit" className="search__form-button" title="Search">
          <i className="fas fa-search"></i>
          </button>
        </form>
      </div>
    </div>
  );
}

export default Search;
