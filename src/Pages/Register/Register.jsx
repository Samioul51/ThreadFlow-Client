import React, { use, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { AuthContext } from '../../Providers/AuthProvider/AuthProvider';
import toast from 'react-hot-toast';

const Register = () => {
    const { createUser, setUser, updateUser, signInWithGoogle,createUserInDb } = use(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const [error, setError] = useState("");


    const handleRegister = async (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;
        const role = form.role.value;
        const photoFile = form.photo.files[0];
        

        const newUser = {
            name: name,
            email: email,
            role: role,
            roleStatus: "pending",
            createdAt: new Date()
        }

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;

        if (!passwordRegex.test(password)) {
            setError("Password must be at least 6 characters. Include uppercase and lowercase letters.")
            return;
        }
        else
            setError("");

        try {
            const formData = new FormData();
            formData.append("image", photoFile);

            const imgbb = import.meta.env.VITE_IMG_BB_API_KEY;

            const res = await fetch(`https://api.imgbb.com/1/upload?key=${imgbb}`, {
                method: "POST",
                body: formData
            });

            const data = await res.json();

            const photoURL = data.data.url;

            const result = await createUser(email, password);
            const user = result.user;

            await updateUser({
                displayName: name,
                photoURL: photoURL
            });
            
            setUser({ ...user, displayName: name, photoURL });
            
            await createUserInDb({
                ...newUser
            });

            toast.success("Registered Successfully!");
            navigate(`${location.state ? location.state : "/"}`);
        }
        catch (error) {
            toast.error(error.message);
        }
    }

    const handleGoogleRegister = () => {
        signInWithGoogle().then(async (res) => {
            if (!res)
                return;

            const loggedUser = res.user;
            
            await createUserInDb({
                name: loggedUser.displayName,
                email: loggedUser.email,
                role: "buyer",
                roleStatus: "pending",
                createdAt: new Date()
            });

            toast.success("Signed up with Google!");
            
            navigate(`${location.state ? location.state : "/"}`);
        }).catch((error) => {
            toast.error(error.message);
        });
    }

    return (
        <div className='w-full mx-auto max-w-[1440px] h-screen'>
            <title>{`ThreadFlow | Register`}</title>
            <div className='bg-white shadow-2xl p-[64px]  w-full max-w-[720px] mx-auto mt-48'>
                <p className='font-playfair font-bold text-[40px] mb-[8px]'>Create Account</p>
                <form onSubmit={handleRegister}>
                    <div className='flex flex-col mb-[24px]'>
                        <label className="label mb-[8px] font-medium text-black">Full Name</label>
                        <input type="text" className="input bg-[#fafafa] px-[14px] py-[19px] w-full text-[1rem] rounded-lg border border-gray-200 focus:outline-none focus:border-gray-300" name="name" placeholder="Enter your full name" required />
                    </div>
                    <div className='flex flex-col mb-[24px]'>
                        <label className="label mb-[8px] font-medium text-black">Email Address</label>
                        <input type="email" className="input bg-[#fafafa] px-[14px] py-[19px] w-full text-[1rem] rounded-lg border border-gray-200 focus:outline-none focus:border-gray-300" name="email" placeholder="Enter your Email" required />
                    </div>
                    <div className='flex flex-col mb-[24px]'>
                        <label className="label mb-[8px] font-medium text-black">Photo</label>
                        <input type="file" className="file-input bg-[#fafafa] w-full" name="photo" required />
                    </div>
                    <div className='flex flex-col mb-[24px]'>
                        <label className="label mb-[8px] font-medium text-black">Select Role</label>
                        <select
                            className="bg-[#fafafa] px-[14px] h-[40px] w-full text-[1rem] rounded-lg border border-gray-200 focus:outline-none focus:border-gray-300"
                            name="role"
                            defaultValue=""
                            required
                        >
                            <option value="" disabled>
                                Select a role
                            </option>
                            <option value="buyer">Buyer</option>
                            <option value="manager">Manager</option>
                        </select>
                    </div>
                    <div className='flex flex-col mb-[8px]'>
                        <label className="label mb-[8px] font-medium text-black">Password</label>
                        <input type="password" className="input bg-[#fafafa] px-[14px] py-[19px] w-full text-[1rem] rounded-lg border border-gray-200 focus:outline-none focus:border-gray-300" name="password" placeholder="Enter Password" />
                    </div>
                    {
                        error && <p className='text-xs text-red-500'>{error}</p>
                    }
                    <p className='mb-[24px]'>Already registered? <Link to="/login" className='text-blue-500'>Login</Link></p>

                    <button type="submit" className='w-full  bg-black text-white text-center py-2 px-4 rounded hover:bg-gray-800 transition-colors ease-in-out duration-500 cursor-pointer mb-[24px]'>
                        Register
                    </button>
                </form>
                <button onClick={handleGoogleRegister} className="w-full btn bg-white text-black border-[#e5e5e5] shadow-2xl">
                    <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
                    Login with Google
                </button>
            </div>

        </div>
    );
};

export default Register;