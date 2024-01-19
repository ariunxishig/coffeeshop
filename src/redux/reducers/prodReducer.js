const initialState={
    data:[],
    totalPrice: 0,
    loading : false,
    error: null
}
export const loadProdsStart =()=>{
    return {
        type:"LOAD_PRODS_START"
    }
};

const reducer = (state=initialState, action)=>{
    if(action.type ==="LOAD_PRODS_START"){
        return {
            ...state,
            loading: true
        }
    } else if(action.type ==="LOAD_PRODS_SUCCESS"){
        return {
            ...state,
            loading: false,
            totalPrice: 0,
            data: action.prods
        }
    } else if(action.type ==="LOAD_PRODS_ERROR"){
        return {
            ...state,
            loading: false,
            error: action.error
        }
    } else if(action.type==="PRODS_INC_DEC"){
        return{
            ...state,
            data: action.prods
        }
    } else if(action.type==="CALC_TOTAL_PRICE"){
        return {
            ...state,
            totalPrice: action.prods
        }
    } 
    return state;
}
export default reducer;