const LOAD_SEARCH_RESULTS = "search/LOAD_SEARCH_RESULTS";

const loadSearchResults = (products) => ({
  type: LOAD_SEARCH_RESULTS,
  products: products,
});

export const loadSearchResultsThunk = (query) => async (dispatch) => {
  const response = await fetch(`/api/search/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query,
    }),
  });

  if (response.ok) {
    const searchResults = await response.json();

    dispatch(loadSearchResults(searchResults));
    return ["Results", searchResults];
  }
};

const initialState = {};

const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_SEARCH_RESULTS:
      const allResults = {};
      console.log(action.products.products)
      for (let product of action.products.products) {
        allResults[product.id] = product;
      }
      return { ...allResults };
    default:
      return state;
  }
};

export default searchReducer;