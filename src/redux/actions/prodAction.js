import axios from "../../axios-orders";

export const loadProds =()=>{
    return function(dispatch){
        dispatch(loadProdsStart()); //prods tataj ehelleeg medegdeh spinner ajillulah
        const PROD_ROW=[];
        axios
        .get("/products.json")
        .then(response =>{
            const arr = Object.entries(response.data);
            for (const [key] of Object.entries(arr[0][1])) {
                let PRODS = [];
                for (const [k, v] of Object.entries(arr[0][1][key])) {
                    let cost = Object.entries(v);
                    if(cost[1][1]>500) continue;
                    PRODS.push([`${k}: ${cost[0][1]}`, 0, 0, 0, cost[1][1]]);
                }
                PROD_ROW.push([key, 'running', 'details', 0, PRODS]);
            }
            dispatch(loadProdsSuccess(PROD_ROW))
        }).catch(err=>dispatch(loadProdsError(err)));
    };
};

export const loadProdsStart =()=>{
    return {
        type:"LOAD_PRODS_START"
    }
};

export const loadProdsSuccess = prodsLoaded =>{
    return {
        type:"LOAD_PRODS_SUCCESS",
        prods: prodsLoaded
    }
};

export const loadProdsError =error=>{
    return {
        type:"LOAD_PRODS_ERROR",
        error: error
    }
};