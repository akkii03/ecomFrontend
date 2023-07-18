import axios from 'axios';
import {
    ALL_PRODUCT_REQUEST,
    ALL_PRODUCT_FAIL,
    ALL_PRODUCT_SUCCESS,
    CLEAR_ERROR,
  } from "../constants/productConstants";
import {allproductAPi} from '../Apis/allApis';
  
export const getProduct = async(dispatch) =>{
    
        dispatch({type:ALL_PRODUCT_REQUEST});
        await axios.get(allproductAPi).then(res=>{
            dispatch({type:ALL_PRODUCT_SUCCESS,payload:res.data})
        }).catch(err=>{
            dispatch({type:ALL_PRODUCT_FAIL,payload:err})
        })
     
} 

export const clear_error = (dispatch)=>{
    dispatch({type:CLEAR_ERROR})
}