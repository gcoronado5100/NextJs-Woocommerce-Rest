import React, {useState, useEffect} from "react";


export const AppContext = React.createContext( [
    {},
    () => {}
])

export const AppProvider = (props) => {

    const [ cart, setCart ] = useState(null)

    /**
     * This will be called once on initial load ( component mount).
     * 
     * Sets the cart data from localStorage to 'cart' in the context.
     */

    useEffect( () => {

        if(process.browser) {
            let carData = localStorage.getItem( 'next-cart' )
            carData = null !== carData ? JSON.parse( carData ) : ''
            setCart(carData)
        }

    }, [])


    /**
     * 1.  When setCart() is called that changes the calue of 'cart'
     * this will set the new data in the localStorage.
     * 
     * 2. The 'cart' will anyways have the new data, as setCart()
     * would have to set that.
     * 
     */
    useEffect( () => {
        if ( process.browser ) {
            localStorage.setItem('next-car', JSON.stringify(cart))
        }
    }, [ cart ])
    

    return (
        <AppContext.Provider value={[cart, setCart]}>
            {props.children}
        </AppContext.Provider>
    )

}