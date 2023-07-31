import Link from "next/link"
import Image from "next/image"
import { sanitize } from "../../utils/miscellaneous"
import { isEmpty } from "lodash"
import AddToCart from "../cart/add-to-cart"

const Product = ({product}) => {

    if ( isEmpty(product)) {
        return null
    }

    const img = product?.images[0] ?? {};
    const productType = product?.type ?? ''


    // console.log(product)

    return (
        <div
            className='my-2 px-2 w-full overflow-hidden sm:w-1/2 md:w-1/3 xl:w-1/4'
            >
            <Link href={product?.permalink ?? "/"}>
                <Image
                src={img?.src ?? ""}
                alt={img?.alt ?? ""}
                title={product?.name ?? ""}
                width={380}
                height={380}
                />
                <h3 className='font-bold uppercase'>{product?.name}</h3>
                <div
                dangerouslySetInnerHTML={{
                    __html: sanitize(product?.short_description ?? ""),
                }}
                />
                <div
                dangerouslySetInnerHTML={{
                    __html: sanitize(product?.price_html ?? ""),
                }}
                />
            </Link>

            { 'simple' === productType ? <AddToCart product={product} /> : null }
        </div>
    )
}

export default Product