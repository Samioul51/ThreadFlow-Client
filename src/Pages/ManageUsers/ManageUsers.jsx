import React, { use, useState } from 'react';
import toast from 'react-hot-toast';
import { IoIosArrowDropdown } from 'react-icons/io';

const userPromise = fetch("http://localhost:3000/users").then(res => res.json());

const ManageUsers = () => {

    const userResponse = use(userPromise);
    const users = userResponse.data;
    // console.log(users);

    const [selectedUser, setSelectedUser] = useState(null);

    const categories = ["All Role", "Buyer", "Manager", "Admin"];
    const allStatus = ["All Status", "Pending", "Suspended", "Approved"];

    const [category, setCategory] = useState("All Role");
    const [status, setStatus] = useState("All Status");
    const [search, setSearch] = useState("");

    const filteredUsers = users.filter(p => {
        const matchCategory = category === "All Role" ? true : p.role.toLowerCase() === category.toLowerCase();
        const matchStatus = status === "All Status" ? true : p.roleStatus.toLowerCase() === status.toLowerCase();
        const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.email.toLowerCase().includes(search.toLowerCase()) || p.role.toLowerCase().includes(search.toLowerCase()) || p.roleStatus.toLowerCase().includes(search.toLowerCase());
        return matchCategory && matchStatus && matchSearch;
    });

    const handleOpenModal = (user) => {
        setSelectedUser(user);
        document.getElementById("update_user_modal").showModal();
    }

    const handleCloseModal = () => {
        document.getElementById("update_user_modal").close();
        setSelectedUser(null);
    }

    const handleUserUpdate = async (e) => {
        e.preventDefault();
        if (!selectedUser)
            return;
        const form = e.target;

        const roleStatus = form.roleStatus.value;
        const feedback = form?.feedback?.value || "";

        const updatedInfo = {
            roleStatus: roleStatus,
            feedback: feedback
        };

        const res = await fetch(`http://localhost:3000/users/${selectedUser._id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updatedInfo),
        });

        if (res.ok) {
            toast.success("User updated!");
            handleCloseModal();
            setSelectedUser(null);
            window.location.reload();
        }
        else
            toast.error("Failed to update!");
    }

    return (
        <div className='py-5 mx-10 mt-10 flex flex-col items-center min-h-screen bg-white font-inter'>
            <p className='font-playfair text-black text-3xl font-bold text-center mb-5'>MANAGE USERS</p>
            <div className='w-full max-w-full p-[16px] box-border flex justify-between items-center'>
                <div className="dropdown dropdown-start">
                    <div tabIndex={0} role="button" className="btn m-1">{category} <IoIosArrowDropdown /></div>
                    <ul tabIndex="-1" className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
                        {
                            categories.map(c => <li key={c}><a onClick={() => setCategory(c)}>{c}</a></li>)
                        }
                    </ul>
                </div>
                <div className="dropdown dropdown-start">
                    <div tabIndex={0} role="button" className="btn m-1">{status} <IoIosArrowDropdown /></div>
                    <ul tabIndex="-1" className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
                        {
                            allStatus.map(c => <li key={c}><a onClick={() => setStatus(c)}>{c}</a></li>)
                        }
                    </ul>
                </div>
                <input type="text" placeholder="Search" className="input input-primary" onChange={(e) => setSearch(e.target.value)} />
            </div>
            {
                filteredUsers.length > 0 ?
                    <div className="w-full overflow-x-auto">
                        <table className="table">
                            {/* head */}
                            <thead>
                                <tr>
                                    <th className='text-black font-bold font-playfair'>USER ID</th>
                                    <th className='text-black font-bold font-playfair'>NAME</th>
                                    <th className='text-black font-bold font-playfair'>EMAIL</th>
                                    <th className='text-black font-bold font-playfair'>ROLE</th>
                                    <th className='text-black font-bold font-playfair'>ROLE STATUS</th>
                                    <th className='text-black font-bold font-playfair'>ACTIONS</th>
                                </tr>
                            </thead>

                            <tbody>
                                {
                                    filteredUsers?.map((user, index) => (
                                        <tr key={index}>
                                            <td>
                                                {index + 1}
                                            </td>
                                            <td>
                                                {user?.name.toUpperCase()}
                                            </td>
                                            <td>
                                                {user?.email}
                                            </td>
                                            <td>
                                                {user?.role.toUpperCase()}
                                            </td>
                                            <td>
                                                {user?.roleStatus === "pending" && <p className='text-blue-500'>{user?.roleStatus.toUpperCase()}</p>}
                                                {user?.roleStatus === "suspended" && <p className='text-red-500'>{user?.roleStatus.toUpperCase()}</p>}
                                                {user?.roleStatus === "approved" && <p className='text-green-500'>{user?.roleStatus.toUpperCase()}</p>}
                                            </td>
                                            <td className='flex flex-col items-center gap-1'>
                                                <button onClick={() => handleOpenModal(user)} className='w-full  bg-black text-white text-center py-2 px-4 rounded hover:bg-gray-800 transition-colors ease-in-out duration-500 cursor-pointer'>
                                                    UPDATE
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                    :
                    <div className='w-full max-w-[1440px] flex justify-center items-center my-10'>
                        <p className='font-playfair text-2xl text-center font-bold text-black'>NO USERS FOUND!</p>
                    </div>
            }

            {/* Modal for update */}
            <dialog id="update_user_modal" className="modal modal-bottom sm:modal-middle">
                <div className="modal-box max-w-xl">
                    <h3 className="font-bold text-lg">Update User</h3>
                    <form onSubmit={handleUserUpdate}>
                        {/* User Status */}
                        <div className="mt-3">
                            <label className="font-medium">User Status</label>
                            <select
                                name="roleStatus"
                                value={selectedUser?.roleStatus || ""}
                                onChange={(e) =>
                                    setSelectedUser(prev => ({
                                        ...prev,
                                        roleStatus: e.target.value
                                    }))
                                }
                                className="bg-[#fafafa] px-[14px] h-[40px] w-full text-[1rem] rounded-lg border border-gray-200 focus:outline-none focus:border-gray-300w-full bg-[#fafafa]"
                            >
                                <option value="pending">Pending</option>
                                <option value="approved">Approve</option>
                                <option value="suspended">Suspend</option>
                            </select>
                        </div>

                        {/* Suspend Message */}
                        <div className="mt-3">
                            <label className="font-medium">Suspend Feedback</label>
                            <input
                                type="text"
                                name="feedback"
                                className="input w-full bg-[#fafafa]"
                                disabled={selectedUser?.roleStatus !== "suspended"}
                                required={selectedUser?.roleStatus === "suspended"}
                            />
                        </div>

                        <div className="modal-action">
                            <button type="submit" className="btn">
                                Update
                            </button>
                            <button className="btn" onClick={handleCloseModal}>Cancel</button>
                        </div>
                    </form>
                </div>
            </dialog>
        </div>
    );
};

export default ManageUsers;