import { getSession, storeSession } from "./session";
import { getAddOrViewCartConfig} from './api'

import axios from "axios";
import { isArray, isEmpty } from "lodash";
import { CART_ENDPOINT } from "../constants/endpoints";

/**
 * Add to Cart Request Handler
 * 
 * @param {init} productId Product ID .
 * @param {init} qty Product Quantity.
 * @param {Function} setIsAddedToCart
 * @param {Function} setLoading
 * @param {Function} setCart
 */

export const addToCart = ( productId, qty = 1, setIsAddedToCart, setLoading, setCart ) => {
    const storedSession = getSession();
    const addOrViewCartConfig = getAddOrViewCartConfig();

    setLoading(true)

    axios.post(CART_ENDPOINT, {
        product_id: productId,
        quantity: qty,
    },
    addOrViewCartConfig,
    ).
    then( (res) => {
        if ( isEmpty(storedSession) ) {
            storeSession( res?.headers?.[ 'x-wc-session' ] )
        }
        setIsAddedToCart(true)
        setLoading(false)
        viewCart(setCart)
    })
    .catch( err => {
        setLoading(false)
        console.error('error: ', err)
    })
}

/**
 * View Cart Request handler
 */

export const viewCart = ( setCart ) => {
    
    const addOrViewCartConfig = getAddOrViewCartConfig();

    axios.get( CART_ENDPOINT, addOrViewCartConfig )
        .then( (res) => {
            const formattedCartData = getFormattedCartData( res?.data ?? [])
            setCart( formattedCartData )
        })
        .catch( err => console.error(err) )
}

/**
 * Get Formatted Cart Data 
 * 
 * @param  cartData 
 * @returns {null|{cartTotal:{totalQty:number, totalPrice:number}, cartItems: ({length}|*|*[])}}
 */

const getFormattedCartData = ( cartData ) => {
    if( ! cartData.length ) {
        return null
    }

    const cartTotal = calculateCartQtyAndPrice( cartData || [] )

    return {
        cartItems: cartData || [],
        ...cartTotal
    }
}

/**
 * Calculate Cart Qty and Price
 * 
 * @param cartItems 
 * @returns  {{totalQty: number, totalPrice: number}}
 */


const calculateCartQtyAndPrice = ( cartItems ) => {
    const qtyAndPrice = {
        totalQty: 0,
        totalPrice: 0,
    }

    if ( !isArray(cartItems) || !cartItems?.length ) {
        return qtyAndPrice
    }

    cartItems.forEach( (item, index)  => {
        qtyAndPrice.totalQty += item?.quantity ?? 0
        qtyAndPrice.totalPrice += item?.line_total ?? 0
    });

    return qtyAndPrice
}