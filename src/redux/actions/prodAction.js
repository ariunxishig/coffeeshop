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
                    let value = Object.entries(v);
                    if(value[1][1]>500) continue; //smoothie shake-g db deerh bugeer haruulahguin tuld
                    PRODS.push([`${k}`, 0, 0, 0, value[1][1], value[0][1], 5000, 2000]);
                }
                PROD_ROW.push([key, 'running', 'details', 0, PRODS]);
            }
            dispatch(loadProdsSuccess(PROD_ROW))
        }).catch(err=>{
            if(err.message==="Network Error"){
                const PROD_ROW=[];
                const sampleData = require("../../database/products.json");
                const arr = Object.entries(sampleData);
                arr.forEach(el => {
                    let PRODS = [];
                    for (const [k, v] of Object.entries(el[1])) {
                        let value = Object.entries(v);
                        if(value[0][1]>500) continue; //smoothie shake-g db deerh bugeer haruulahguin tuld
                        PRODS.push([`${k}`, 0, 0, 0,  value[0][1], value[1][1], 5000, 2000]);
                    }
                    PROD_ROW.push([el[0], 'running', 'details', 0, PRODS]);
                })
                dispatch(loadProdsSuccess(PROD_ROW));
            } else {
                dispatch(loadProdsError(err))
            }
        });
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

export const loadProdsError = error=>{
    return {
        type:"LOAD_PRODS_ERROR",
        error: error
    }
};