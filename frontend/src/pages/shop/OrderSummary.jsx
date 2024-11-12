import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {clearCart} from '../../redux/features/cart/cartSlice';
import {getBaseUrl} from '../../utils/baseURL';

const OrderSummary = () => {
    const dispatch = useDispatch()

    const {selectedItems, totalPrice, tax, taxRate, grandTotal, products} = useSelector((store) => store.cart);

    const handleClearCart = () => {
        dispatch(clearCart())
    }

    // payment integration
    const makePayment = async (e) => {
        const token = localStorage.getItem('authToken'); // Retrieve the token from local storage
        const user = JSON.parse(localStorage.getItem('user')); // Retrieve the user from local storage
        const transformedProducts = products.map(product => ({
            productId: product._id,
            quantity: product.quantity
        }));

        console.log({transformedProducts});

        console.log(user.email);
        const response = await fetch(`${getBaseUrl()}/api/momo/pay`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${token}`
            },
            body: JSON.stringify({
                user: user,
                amount: Number(grandTotal).toFixed(0),
                orderInfo: 'pay with MoMo',
                products: transformedProducts,
                email: user.email,
                address: document.getElementById('address').value
            }),
        });

        if (response.status === 401) {
            alert('You need to log in to place an order');
            return;
        }

        const data = await response.json();

        if (data.payUrl) {
            window.location.href = data.payUrl;
        } else {
            console.error('Payment URL not found');
        }
    };

    return (
        <div className='bg-primary-light mt-5 rounded text-base'>
            <div className='px-6 py-4 space-y-5'>
                <h2 className='text-xl text-text-dark'>Order Summary</h2>
                <p className='text-text-dark mt-2'>SelectedItems: {selectedItems}</p>
                <p>Total Price: {Number(Number(totalPrice).toFixed(0)).toLocaleString('de-DE')} VNĐ</p>
                <p>Tax ({taxRate * 100}%): {Number(Number(tax).toFixed(0)).toLocaleString('de-DE')} VNĐ</p>
                <h3 className='font-bold'>GrandTotal: {Number(Number(grandTotal).toFixed(0)).toLocaleString('de-DE')} VNĐ</h3>
                <div className='mt-4'>
                    <label htmlFor='address' className='block text-sm font-medium text-gray-700'>Address</label>
                    <input
                        type='text'
                        id='address'
                        name='address'
                        className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm'
                        placeholder='Enter your address'
                        required
                    />
                </div>
                <div className='px-4 mb-6'>
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            handleClearCart();
                        }}
                        className='bg-red-500 px-3 py-1.5 text-white  mt-2 rounded-md flex justify-between items-center mb-4'>
                        <span className='mr-2'>Clear cart</span>
                        <i className="ri-delete-bin-7-line"></i>
                    </button>

                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            makePayment(e);
                        }}
                        className='bg-green-600 px-3 py-1.5 text-white  mt-2 rounded-md flex justify-between items-center'>
                        <span className='mr-2'>Proceed Checkout</span><i className="ri-bank-card-line"></i></button>
                </div>
            </div>
        </div>
    )
}

export default OrderSummary