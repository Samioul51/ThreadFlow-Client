import React, { use, useEffect, useState } from 'react';
import { motion, useScroll } from "framer-motion"
import { AuthContext } from '../../Providers/AuthProvider/AuthProvider';
import toast from 'react-hot-toast';
import LightPillar from '../../Components/Trust/LightPiller/LightPillar';

const ProfileDashboard = () => {
    const { user, userData, userToken } = use(AuthContext);
    const { scrollYProgress } = useScroll();
    const [loading, setLoading] = useState(false);

    const [myOrders, setMyOrders] = useState([]);
    const [deliveredOrders, setMyDeliveredOrders] = useState([]);
    const [totalSpent, setTotalSpent] = useState(0);

    const [myProducts, setMyProducts] = useState([]);
    const [myClients, setMyClients] = useState([]);
    const [managerOrders, setManagerOrders] = useState([]);
    const [totalEarned,setTotalEarned]=useState([]);

    const [users, setUsers] = useState([]);
    const [allOrders, setAllOrders] = useState([]);
    const [allProducts, setAllProducts] = useState([]);

    // User Orders

    useEffect(() => {
        const fetchOrders = async () => {
            setLoading(true);
            try {
                const response = await fetch("https://thread-flow-server51.vercel.app/orders", {
                    headers: {
                        Authorization: `Bearer ${userToken}`
                    }
                });
                const data = await response.json();
                const orders = data.data.filter(order => order.email === user.email);
                setMyOrders(orders);
                let total = 0;
                orders.map(order => total += order.totalPrice);
                setTotalSpent(total);
                const delivered = orders.filter(o => o.deliveryStatus === "shipped");
                setMyDeliveredOrders(delivered);

            } catch (error) {
                toast.error("Failed to load orders!");
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, [user.email, userToken]);

    // Manager and Admin Products

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const response = await fetch("https://thread-flow-server51.vercel.app/products");
                const data = await response.json();
                setAllProducts(data.data);
                const products = data.data.filter(product => product.email === user.email);
                setMyProducts(products);
            } catch (error) {
                toast.error("Failed to load products! " + error.message);
            } finally {
                setLoading(false);
            }
        }

        fetchProducts();
    }, [user.email]);

    // Manager's Clients

    useEffect(() => {
        const fetchOrders = async () => {
            setLoading(true);
            try {
                const response = await fetch("https://thread-flow-server51.vercel.app/orders", {
                    headers: {
                        Authorization: `Bearer ${userToken}`
                    }
                });
                const data = await response.json();
                setAllOrders(data.data);
                const orders = data.data.filter(order => order.sellerEmail === user.email);
                setManagerOrders(orders);
                const uniqueClients = Array.from(
                    new Map(orders.map(item => [item.email, item])).values()
                );
                let total = 0;
                orders.map(order => total += order.totalPrice);
                setTotalEarned(total);
                setMyClients(uniqueClients);
            } catch (error) {
                toast.error("Failed to load orders!");
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, [user.email, userToken]);

    // All Users

    if (userData?.role === "admin") {
        useEffect(() => {
            if (!user)
                return;
            const fetchUsers = async () => {
                setLoading(true);
                try {
                    const res = await fetch("https://thread-flow-server51.vercel.app/users", {
                        headers: {
                            Authorization: `Bearer ${userToken}`
                        }
                    })
                        .then(res => res.json());
                    if (res.success)
                        setUsers(res.data);
                    else
                        toast.error(res.message);
                } catch (error) {
                    toast.error("Failed to fetch users!");
                } finally {
                    setLoading(false);
                }
            };
            fetchUsers();
        }, [user, userToken]);
    }

    return (
        <>
            <motion.div
                id="scroll-indicator"
                style={{
                    scaleX: scrollYProgress,
                    position: "fixed",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: 10,
                    originX: 0,
                    backgroundColor: "#545454",
                    zIndex: 9999
                }}
            />
            <div className='py-5 px-3 mx-5 mt-5 flex flex-col items-center bg-white-bg font-inter'>
                <title>{`ThreadFlow | My Dashboard`}</title>
                <p className='tf_heading font-playfair text-black text-3xl font-bold text- mb-5'>MY DASHBOARD</p>
                <div style={{ width: '100%', height: '200px', position: 'relative', borderRadius: "10px", overflow: "hidden" }}>
                    <LightPillar
                        mixBlendMode="normal"
                        topColor="#000000"
                        bottomColor="#99a1af"
                    />
                    <div className='absolute inset-0 z-50 flex flex-col px-8 md:px-16'>
                        <p className='font-playfair font-medium text-base md:text-lg lg:text-3xl mt-10 mb-5' style={{ color: "#FFFFFF" }}>WELCOME BACK, {userData?.name}!</p>
                        <p className='text-sm' style={{ color: "#99a1af" }}>Here's what's happening with your account.</p>
                    </div>
                </div>
                {
                    loading ? <div className="flex justify-center items-center my-10">
                        <span className="loading loading-spinner text-primary"></span>
                    </div>
                    :
                    (
                        
                    userData?.role === "buyer"? <>
                        <div className='w-full gap-5 max-w-full flex flex-col lg:flex-row lg:justify-between px-4 mt-5'>
                            <div className='w-full flex flex-col justify-center items-center p-[2rem] border-2 border-solid border-[#e0e0e0] text-center'>
                                <p className='text-md mb-[1rem] text-[#666]'>MY ORDERS</p>
                                <p className='text-black text-4xl font-playfair font-bold'>{myOrders.length}</p>
                            </div>
                            <div className='w-full flex flex-col justify-center items-center p-[2rem] border-2 border-solid border-[#e0e0e0] text-center'>
                                <p className='text-md mb-[1rem] text-[#666]'>SHIPPED</p>
                                <p className='text-black text-4xl font-playfair font-bold'>{deliveredOrders.length}</p>
                            </div>
                            <div className='w-full flex flex-col items-center p-[2rem] border-2 border-solid border-[#e0e0e0] text-center'>
                                <p className='text-md mb-[1rem] text-[#666]'>TOTAL SPENT</p>
                                <p className='text-black text-4xl font-playfair font-bold'>৳ {totalSpent}</p>
                            </div>
                        </div>
                    </>
                    :
                    (
                        userData?.role ==="manager"
                        ?
                        <div className='w-full gap-5 max-w-full flex flex-col lg:flex-row lg:justify-between px-4 mt-5'>
                            <div className='w-full flex flex-col justify-center items-center p-[2rem] border-2 border-solid border-[#e0e0e0] text-center'>
                                <p className='text-md mb-[1rem] text-[#666]'>MY PRODUCTS</p>
                                <p className='text-black text-4xl font-playfair font-bold'>{myProducts.length}</p>
                            </div>
                            <div className='w-full flex flex-col justify-center items-center p-[2rem] border-2 border-solid border-[#e0e0e0] text-center'>
                                <p className='text-md mb-[1rem] text-[#666]'>MY ORDERS</p>
                                <p className='text-black text-4xl font-playfair font-bold'>{managerOrders.length}</p>
                            </div>
                            <div className='w-full flex flex-col items-center p-[2rem] border-2 border-solid border-[#e0e0e0] text-center'>
                                <p className='text-md mb-[1rem] text-[#666]'>MY CLIENTS</p>
                                <p className='text-black text-4xl font-playfair font-bold'>{myClients.length}</p>
                            </div>
                            <div className='w-full flex flex-col items-center p-[2rem] border-2 border-solid border-[#e0e0e0] text-center'>
                                <p className='text-md mb-[1rem] text-[#666]'>TOTAL EARNED</p>
                                <p className='text-black text-4xl font-playfair font-bold'>৳ {totalEarned}</p>
                            </div>
                        </div>
                        :
                        <div className='w-full gap-5 max-w-full flex flex-col lg:flex-row lg:justify-between px-4 mt-5'>
                            <div className='w-full flex flex-col justify-center items-center p-[2rem] border-2 border-solid border-[#e0e0e0] text-center'>
                                <p className='text-md mb-[1rem] text-[#666]'>USERS</p>
                                <p className='text-black text-4xl font-playfair font-bold'>{users.length}</p>
                            </div>
                            <div className='w-full flex flex-col justify-center items-center p-[2rem] border-2 border-solid border-[#e0e0e0] text-center'>
                                <p className='text-md mb-[1rem] text-[#666]'>TOTAL ORDERS</p>
                                <p className='text-black text-4xl font-playfair font-bold'>{allOrders.length}</p>
                            </div>
                            <div className='w-full flex flex-col items-center p-[2rem] border-2 border-solid border-[#e0e0e0] text-center'>
                                <p className='text-md mb-[1rem] text-[#666]'>TOTAL PRODUCTS</p>
                                <p className='text-black text-4xl font-playfair font-bold'>{allProducts.length}</p>
                            </div>
                        </div>
                    )
                
                    )
                }
            </div>
        </>
    );
};

export default ProfileDashboard;