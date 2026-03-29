import React, { use } from 'react';
import { AuthContext } from '../../Providers/AuthProvider/AuthProvider';
import { useNavigate } from 'react-router';
import toast from 'react-hot-toast';
import { motion, useScroll } from "framer-motion"

const UserProfile = () => {
    const { user, userToken, userData, logout,setUserData } = use(AuthContext);
    const navigate = useNavigate();
    const { scrollYProgress } = useScroll();
    const handleOpenModal = () => document.getElementById("my_modal_5").showModal();
    const handleCloseModal = () => document.getElementById("my_modal_5").close();

    const handleOpenUpdateModal=()=>document.getElementById("update_modal").showModal();
    const handleCloseUpdateModal=()=>document.getElementById("update_modal").close();

    const handleProfileUpdate=async (e)=>{
        e.preventDefault();
        const name=e.target.name.value;
        
        // console.log(name);

        const updatedProfile={
            name:name
        };

        const res=await fetch(`${import.meta.env.VITE_SERVER_URL}/profile/${userData?._id}`,{
            method:"PATCH",
            headers:{
                "Content-Type":"application/json",
                Authorization:`Bearer ${userToken}`
            },
            body:JSON.stringify(updatedProfile),
        });

        handleCloseUpdateModal();

        if(res.ok)
            toast.success("Profile updated successfully!");
        else
            toast.error("Profile update failed!");
    }

    const handleLogout = () => {
        handleCloseModal();
        navigate("/", { replace: true });
        logout().then(() => {
            toast.success("Logged out successfully!");
        }).catch((error) => {
            toast.error(error.message);
            handleCloseModal();
        })
    }

    // console.log(userData);
    // console.log(user);
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
                <title>{`ThreadFlow | My Profile`}</title>
                <img src={userData?.role === "admin" ? userData?.photoURL : user.photoURL} className='w-[150px] h-[150px] rounded-[50%] mb-10 border border-black' />
                <p className='tf_heading font-playfair font-bold text-xl lg:text-[40px] text-black text-center mb-10'>{userData?.name?.toUpperCase()}</p>
                <div className="w-full max-w-[600px] self-center divider divider-neutral"></div>
                <div className='w-full max-w-[600px]'>
                    <div className='text-[12px] lg:text-[16px] flex justify-between mb-5'>
                        <p className='font-inter font-bold text-black'>FULL NAME</p>
                        <p className='font-medium font-inter text-[#666]'>{userData?.name?.toUpperCase()}</p>
                    </div>
                    <div className="divider divider-neutral mb-5"></div>
                </div>
                <div className='w-full max-w-[600px]'>
                    <div className='text-[12px] lg:text-[16px] flex justify-between mb-5'>
                        <p className='font-inter font-bold text-black'>EMAIL</p>
                        <p className='font-medium font-inter text-[#666]'>{user.email}</p>
                    </div>
                    <div className="divider divider-neutral mb-5"></div>
                </div>
                {
                    userData?.roleStatus === "pending" || userData?.roleStatus === "approved"
                        ?
                        <div className='w-full max-w-[600px]'>
                            <div className='text-[12px] lg:text-[16px] flex justify-between mb-5'>
                                <p className='font-inter font-bold text-black'>ACCOUNT STATUS</p>
                                {
                                    userData?.roleStatus === "pending" ?
                                        <p className='font-medium font-inter text-blue-500'>PENDING</p>
                                        :
                                        <p className='font-medium font-inter text-green-500'>APPROVED</p>
                                }
                            </div>
                            <div className="divider divider-neutral mb-5"></div>
                        </div>
                        :
                        <div className='w-full max-w-[600px]'>
                            <div>
                                <div className='text-[12px] lg:text-[16px] flex justify-between mb-5'>
                                    <p className='font-inter font-bold text-black'>ACCOUNT STATUS</p>
                                    <p className='font-medium font-inter text-red-500'>SUSPENDED</p>
                                </div>
                                <div className="divider divider-neutral mb-5"></div>
                            </div>
                            <div>
                                <div className='text-[12px] lg:text-[16px] flex justify-between mb-5'>
                                    <p className='font-inter font-bold text-black'>SUSPENSION FEEDBACK</p>
                                    <p className='font-medium font-inter text-gray-500'>{userData?.feedback}</p>
                                </div>
                                <div className="divider divider-neutral mb-5"></div>
                            </div>
                        </div>
                }

                <div className='w-full max-w-[600px]'>
                    <div className='text-[12px] lg:text-[16px] flex justify-between mb-5'>
                        <p className='font-inter font-bold text-black'>USER TYPE</p>
                        <p className='font-medium font-inter text-[#666]'>{userData?.role.toUpperCase()}</p>
                    </div>
                    <div className="divider divider-neutral mb-5"></div>
                </div>
                <div className='w-full max-w-[600px]'>
                    <div className='text-[12px] lg:text-[16px] flex justify-between mb-5'>
                        <p className='font-inter font-bold text-black'>MEMBER SINCE</p>
                        <p className='font-medium font-inter text-[#666]'>{userData?.createdAt.split("T")[0]}</p>
                    </div>
                    <div className="divider divider-neutral mb-5"></div>
                </div>
                <div className='w-full max-w-[600px] flex flex-col items-center gap-5 lg:flex-row lg:justify-between '>
                    <button className='text-white bg-black rounded-[2px] font-medium w-[100px] h-[40px] cursor-pointer hover:bg-gray-800 transition-colors ease-in-out duration-500' onClick={handleOpenUpdateModal}>Edit</button>
                    <button className='text-white bg-black rounded-[2px] font-medium w-[100px] h-[40px] cursor-pointer hover:bg-gray-800 transition-colors ease-in-out duration-500' onClick={handleOpenModal}>Logout</button>
                </div>
                {/* Modal for logout */}

                <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
                    <div className="modal-box">
                        <p className="py-4">Are you sure you want to logout?</p>
                        <div className="modal-action">
                            <form method="dialog">
                                <button onClick={handleLogout} className="btn">Yes</button>
                                <button onClick={handleCloseModal} className="btn">No</button>
                            </form>
                        </div>
                    </div>
                </dialog>

                {/* Modal for update */}
                <dialog id="update_modal" className="modal modal-bottom sm:modal-middle">
                    <div className="modal-box max-w-xl">
                        <h3 className="font-bold text-lg">Update Profile</h3>
                        <form onSubmit={handleProfileUpdate} className='mb-3'>
                            {/* Name */}
                            <div className="mt-3">
                                <label className="font-medium">Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    defaultValue={userData?.name}
                                    className="input w-full bg-gray-100"
                                />
                            </div>
                            <div className="modal-action">
                                <button type="submit" className="btn">
                                    Update
                                </button>
                                <button type="button" className="btn" onClick={handleCloseUpdateModal}>Cancel</button>
                            </div>
                        </form>
                        <p className='text-sm text-red-600 text-center'>You can only update your name.</p>
                    </div>
                </dialog>
            </div>
        </>
    );
};

export default UserProfile;