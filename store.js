import { configureStore } from "@reduxjs/toolkit";

import ProductReducer from "./ProductReducer";
import cartReducer from "./cartReducer";



export default configureStore({
    reducer:{
        cart:cartReducer,
        product:ProductReducer
    }
    
})