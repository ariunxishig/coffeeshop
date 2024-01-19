const initialState = {
    orderid: 'date + user',
    isRegistered: false,
    totalprice: 0,
    cash: 0,
    card: 0,
    pos: true,
    transfer: 0,
    products: [],
    error: null
  };

  const reducer = (state = initialState, action) => {
    switch (action.type) {
        case "SAVE_ORDER_START":
            return {
                ...state
            } 
        case "SAVE_ORDER_SUCCESS":
            return {
                ...state,
                products: action.order
            } 
        case "CHANGE_CASH":
            return {
                ...state,
                cash: action.cash
            } 
        case "SAVE_ORDER_DATA":
            return {
                ...state,
                totalprice: action.data.totalprice,
                pos: action.data.pos,
                card: action.data.card,
                transfer: action.data.transfer
            } 
        case "SAVE_ORDER_ERROR":
            return {
                ...state,
                error: action.error
            } 
      default:
        return state;
    }
  };

export default reducer;