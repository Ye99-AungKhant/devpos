import axios from 'axios';
import React, { useEffect, useState, useRef } from 'react'
import MainLayout from '../layouts/MainLayout'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ComponentToPrint } from '../components/ComponentToPrint';
import { useReactToPrint } from 'react-to-print';
import { Link } from 'react-router-dom';



function POSPage() {

    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [cart, setCart] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0);

    const [name, setItemname] = useState('');
    const [price, setItemprice] = useState(0);
    const [quantity, setQty] = useState(0);
    const [total, setTotal] = useState(0);

    const toastOption = {
        autoClose: 400,
        pauseOnHover: true,
    }

    const fetchProducts = async () => {
        setIsLoading(true);
        const result = await axios.get('http://localhost:5000/products');
        setProducts(await result.data);
        setIsLoading(false);
    }

    const addProductToCart = async (product) => {
        //check if the adding product exist
        let findProductInCart = await cart.find(i => {
            return i.id === product.id
        });

        if (findProductInCart) {
            let newcart = [];
            let newItem;

            cart.forEach(cartItem => {
                if (cartItem.id === product.id) {
                    newItem = {
                        ...cartItem,
                        quantity: cartItem.quantity + 1,
                        totalAmount: cartItem.price * (cartItem.quantity + 1)
                    }
                    newcart.push(newItem);
                } else {
                    newcart.push(cartItem);
                }
            });

            setCart(newcart);
            toast(`Added ${newItem.name} to cart`, toastOption)

        } else {
            let addingProduct = {
                ...product,
                'quantity': 1,
                'totalAmount': product.price,
            }
            setCart([...cart, addingProduct]);
            toast(`Added ${product.name} to cart`, toastOption)

        }
    }

    const removeProduct = async (product) => {
        const newCart = cart.filter(cartItem => cartItem.id !== product.id);
        setCart(newCart);
    }

    const componentRef = useRef();

    const handleReactToPrint = useReactToPrint({
        content: () => componentRef.current,
    });

    const handlePrint = () => {
        handleReactToPrint();

    }

    const handleSale = (e) => {
        e.preventDefault();
        const sale = { name, price, quantity, total };

        fetch('http://localhost:5000/sales', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(sale)
        }).then(() => {
            console.log("new items sale");
        });

    }

    useEffect(() => {
        fetchProducts();
    }, []);

    useEffect(() => {
        let newTotalAmount = 0;
        cart.forEach(icart => {
            newTotalAmount = newTotalAmount + parseInt(icart.totalAmount);
        })
        setTotalAmount(newTotalAmount);
    }, [cart])

    return (
        <MainLayout>
            <div className="row">
                <div className="col-lg-8">
                    <Link to="/additem" className='btn bg-primary text-white mb-3'>Add Item</Link>
                    {isLoading ? 'Loading' : <div className="row">

                        {products.map((product, key) =>
                            <div key={key} className="col-lg-4 mb-4">
                                <div className="pos-item px-3 text-center border" onClick={() => addProductToCart(product)}>
                                    <p>{product.name}</p>
                                    <img src={product.image} className="img-fluid" alt={product.name} />
                                    <p>$ {product.price}</p>
                                </div>
                            </div>
                        )}

                    </div>}

                </div>
                <div className="col-lg-4">
                    <div style={{ display: "none" }}>
                        <ComponentToPrint cart={cart} totalAmount={totalAmount}
                            ref={componentRef} />

                    </div>
                    <div className="table-responsive bg-dark">
                        <table className='table table-responsive table-dark table-hover'>
                            <thead>
                                <tr>
                                    <td>#</td>
                                    <td>Name</td>
                                    <td>Price</td>
                                    <td>QTY</td>
                                    <td>Total</td>
                                    <td>Action</td>
                                </tr>
                            </thead>

                            <tbody>
                                {cart ? cart.map((cartProduct, key) =>
                                    <tr key={key}>
                                        <td >{cartProduct.id}</td>
                                        <td >{cartProduct.name}</td>
                                        <td>{cartProduct.price}</td>
                                        <td>{cartProduct.quantity}</td>
                                        <td>{cartProduct.totalAmount}</td>
                                        <td>
                                            <button className='btn btn-danger btn-sm' onClick={() => removeProduct(cartProduct)}>Remove</button>
                                        </td>
                                    </tr>)
                                    : 'No Item in Cart'}
                            </tbody>
                        </table>
                        <h2 className='px-2 text-white' onClick={handleSale}>Total Amount : $ {totalAmount}</h2>
                    </div>
                    <div className="mt-3">
                        {
                            totalAmount !== 0 ? <div>
                                <button className='btn btn-primary'>Pay Now</button>
                            </div> : 'Please add a product to the cart'
                        }
                    </div>


                </div>
            </div>
        </MainLayout>
    )
}

export default POSPage