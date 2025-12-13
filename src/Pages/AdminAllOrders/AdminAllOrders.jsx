import React, { use, useState } from 'react';
import { IoIosArrowDropdown } from 'react-icons/io';

const ordersPromise = fetch("http://localhost:3000/orders").then(res => res.json());

const AdminAllOrders = () => {
    const data = use(ordersPromise);
    const orders = data.data;
    // console.log(orders);

    const categories = ["All", "Pending", "Rejected", "Approved"];

    const [category, setCategory] = useState("All");
    const [search, setSearch] = useState("");

    const filteredOrders = orders.filter(p => {
        let matchCategory = true;

        if (category === "Pending")
            matchCategory = p.deliveryStatus === "pending";
        else if (category === "Rejected")
            matchCategory = p.deliveryStatus === "rejected";
        else if (category === "Approved")
            matchCategory = (p.deliveryStatus !== "pending" && p.deliveryStatus !== "rejected");

        let matchSearch = true;

        const searchText=search.trim().toLowerCase();

        if (searchText) {
            if ("approved".includes(searchText))
                matchSearch = (p.deliveryStatus.toLowerCase() !== "pending" &&
                    p.deliveryStatus.toLowerCase() !== "rejected");
            else if ("pending".includes(searchText))
                matchSearch = p.deliveryStatus.toLowerCase() === "pending";
            else if ("rejected".includes(searchText))
                matchSearch = p.deliveryStatus.toLowerCase() === "rejected";
            else {
                matchSearch =
                    p.productName.toLowerCase().includes(searchText) ||
                    p.firstName.toLowerCase().includes(searchText) ||
                    p.lastName.toLowerCase().includes(searchText) ||
                    p.deliveryStatus.toLowerCase().includes(searchText) ||
                    p._id.toLowerCase().includes(searchText);
            }
        }
        return matchCategory && matchSearch;
    });

    return (
        <div className='py-5 mx-10 mt-10 flex flex-col items-center min-h-screen bg-white font-inter'>
            <p className='font-playfair text-black text-3xl font-bold text-center mb-5'>ALL ORDERS</p>
            <div className='w-full max-w-full p-[16px] box-border flex justify-between items-center'>
                <div className="dropdown dropdown-start">
                    <div tabIndex={0} role="button" className="btn m-1">{category} <IoIosArrowDropdown /></div>
                    <ul tabIndex="-1" className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
                        {
                            categories.map(c => <li key={c}><a onClick={() => setCategory(c)}>{c}</a></li>)
                        }
                    </ul>
                </div>
                <input type="text" placeholder="Search" className="input input-primary" onChange={(e) => setSearch(e.target.value)} />
            </div>
            {
                filteredOrders.length > 0 ?
                    <div className="w-full overflow-x-auto">
                        <table className="table">
                            {/* head */}
                            <thead>
                                <tr>
                                    <th className='text-black font-bold font-playfair'>ORDER ID</th>
                                    <th className='text-black font-bold font-playfair'>USER</th>
                                    <th className='text-black font-bold font-playfair'>PRODUCT NAME</th>
                                    <th className='text-black font-bold font-playfair'>QUANTITY</th>
                                    <th className='text-black font-bold font-playfair'>STATUS</th>
                                    <th className='text-black font-bold font-playfair'>ACTIONS</th>
                                </tr>
                            </thead>

                            <tbody>
                                {
                                    filteredOrders.map(order => (
                                        <tr key={order._id}>
                                            <td>
                                                {order._id}
                                            </td>
                                            <td>
                                                {order.firstName.toUpperCase()} {order.lastName.toUpperCase()}
                                            </td>
                                            <td>
                                                {order.productName.toUpperCase()}
                                            </td>
                                            <td>
                                                {order.quantity}
                                            </td>
                                            <td>
                                                {
                                                    order?.deliveryStatus === "pending" && <span className='text-blue-500'>PENDING</span>
                                                }
                                                {
                                                    (order?.deliveryStatus !== "pending" && order?.deliveryStatus !== "rejected") && <span className='text-green-500'>APPROVED</span>
                                                }
                                                {
                                                    order?.deliveryStatus === "rejected" && <span className='text-red-500'>REJECTED</span>
                                                }
                                            </td>
                                            <td className='flex flex-col items-center gap-1'>
                                                <button className='w-full bg-black text-white text-center py-2 px-4 rounded hover:bg-gray-800 transition-colors ease-in-out duration-500 cursor-pointer'>VIEW</button>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                    :
                    <div className='w-full max-w-[1440px] flex justify-center items-center my-10'>
                        <p className='font-playfair text-2xl text-center font-bold text-black'>NO ORDERS FOUND!</p>
                    </div>
            }
        </div>
    );
};

export default AdminAllOrders;