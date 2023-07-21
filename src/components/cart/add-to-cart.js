import { useState } from "react"
import { isEmpty } from "lodash"
import { addToCart } from "@/src/utils/cart"
import { useContext } from "react"
import { AppContext } from "../context"
import cx from 'classnames'
import Link from 'next/link'

const AddToCart = ( {product} ) => {

    const [ cart, setCart ] = useContext( AppContext )
    const [isAddedToCart, setIsAddedToCart] = useState(false)
    const [loading, setLoading] = useState(false)

    const addToCartBtnClasses = cx (
        'text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow',
        {
            'bg-white hover:bg-gray-100' : ! loading,
            'bg-gray-200': loading
        },
    )

    if ( isEmpty(product)) {
        return null
    }

    return (
        <>
            <button 
                className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow "
                onClick={ () => addToCart(product?.id ?? 0, 1, setIsAddedToCart, setLoading, setCart) }
                disabled={loading}
            >
                { loading ? 'Añadiendo...' : 'Añadir al Carrito'}
            </button>
            {
                isAddedToCart && !loading ? (
                    <Link href="/cart">
                        <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold ml-4 py-11px px-4 border border-gray-400 rounded shadow">
                            View Cart
                        </button>
                    </Link>
                ): null
            }
        </>
    )
}

export default AddToCart