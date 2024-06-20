
import React, { useContext, useEffect, useState } from 'react'
import CartProduct from '../components/CartCard'
import { AuthContext } from '../../../context/auth/AuthContext'
import { CartContext } from '../../../context/cart/CartContext'

const products = [
    {
        product: {

            id: 1,
            name: 'Nike Air Force 1 07 LV8',
            href: '#',
            price: '₹47,199',
            originalPrice: '₹48,900',
            discount: '5% Off',
            color: 'Orange',
            size: '8 UK',
            imageSrc:
                'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/54a510de-a406-41b2-8d62-7f8c587c9a7e/air-force-1-07-lv8-shoes-9KwrSk.png',
        },
        quantity: 1
    },
    {
        product: {
            id: 2,
            name: 'Nike Blazer Low 77 SE',
            href: '#',
            price: '₹1,549',
            originalPrice: '₹2,499',
            discount: '38% off',
            color: 'White',
            leadTime: '3-4 weeks',
            size: '8 UK',
            imageSrc:
                'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/e48d6035-bd8a-4747-9fa1-04ea596bb074/blazer-low-77-se-shoes-0w2HHV.png',
        },
        quantity: 2
    },
]

export default function Cart() {

    const { user } = useContext(AuthContext)
    const { getCarts, cart } = useContext(CartContext)


    useEffect(() => {
        if (user && user._id) {
            getCarts()
        }
    }, [user])


    useEffect(() => {
        if (cart && cart.products) {
            setValues({
                ...values,
                products: cart.products
            })
        }
    }, [cart])

  


    const { values, setValues } = useState([]);

    const changeQuantity = (value, index) => {
        values.products[index] = {
            ...values.products[index],
            quantity: value,
        };
        console.log(values);
        setValues({
            ...values,
        });
    };

    // const createOrderApi = (payload) => {
    //     let token = localStorage.getItem('token');
    //     axios.post(`${apiUrl}/api/orders/create/${user._id}`, { products: payload }, {
    //         headers: {
    //             Authorization: `Bearer ${token}`
    //         }
    //     })
    //         .then(res => {
    //             esewaCall(res.data.order)
    //         })
    //         .catch(err => console.log(err))
    // }

   

    return (
        <div className="mx-auto max-w-7xl px-2 lg:px-0">
            <div className="mx-auto max-w-2xl py-8 lg:max-w-7xl">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                    Shopping Cart
                </h1>
                <section aria-labelledby="cart-heading" className="rounded-lg bg-white lg:col-span-8">
                            <h2 id="cart-heading" className="sr-only">
                                Items in your shopping cart
                            </h2>
                            <ul  className="divide-y divide-gray-200">
                                <div
                                    name='products'
                                    render={(arrayHelper) => (
                                        <>
                                            {values.products.length > 0 ? (
                                                values.products.map((product, index) =>
                                                    <CartProduct product={product.product} quantity={product.quantity} changeQuantity={changeQuantity} index={index} removeItem={() => arrayHelper.remove(index)} />
                                                )
                                            ) : (
                                                <div
                                                    className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                                                >
                                                    Add Product to Cart
                                                </div >)}
                                        </>
                                    )}
                                />
                            </ul>
                            <button
                                type='submit'
                                className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                            >
                                Save Cart
                            </button >
                        </section>
            </div>
        </div >
    )
}
