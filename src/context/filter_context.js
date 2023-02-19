import { useContext, useEffect } from "react";
import { useReducer } from "react";
import { createContext } from "react";
import { useProductContext } from "./productcontext";
import reducer from "../reducer/filterReducer"

const FilterContext = createContext();
const initialState = {
    filter_products: [],
    all_products: [],
    grid_view: false,
    sorting_value:"lowest",
}

export const FilterContextProvider = ({children}) => {
    const {products} = useProductContext();
    const [state, dispatch] = useReducer(reducer, initialState);
    // set grid view
    const setGridView = () => {
        return dispatch({type: "SET_GRID_VIEW"})
    }

    const setListView = () => {
        return dispatch({type: "SET_LIST_VIEW"})
    }

    const sorting = () => {
        dispatch({type:"GET_SORT_VALUE"});
    }

    useEffect(() => {
      dispatch({type: "SORTING_PRODUCTS", payload: products})
    }, [state.sorting_value])
    

    useEffect(() => {
        dispatch({type: "LOAD_FILTER_PRODUCTS", payload: products})
    }, [products]);
    return (
        <FilterContext.Provider value={{...state, setGridView, setListView, sorting}}>
            {children}
        </FilterContext.Provider>
    )
}

export const useFilterContext = () => {
    return useContext(FilterContext);
}