const fetchReviewsReducer = (state = {}, action) => {
    switch (action.type) {
      case "GET":
        return action.data;
      case "POST":
        return action.data;
      case "COMMENT":
        return action.data;
      case "PAGINATION":
        return action.data;
      default:
        return state;
    }
  }
  export default fetchReviewsReducer;