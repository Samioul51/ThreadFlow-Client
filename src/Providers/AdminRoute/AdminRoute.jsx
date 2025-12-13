import React, { use } from 'react';
import { AuthContext } from '../AuthProvider/AuthProvider';
import { useLocation } from 'react-router';
import Loading from '../../Components/Loading/Loading';
import Forbidden from '../../Components/Forbidden/Forbidden';

const AdminRoute = ({children}) => {
    const {user,userData,loading}=use(AuthContext);
    const location=useLocation();

    if(loading)
        return <Loading></Loading>;

    if(userData?.role!=="admin")
        return <Forbidden></Forbidden>;
    
    return children;
};

export default AdminRoute;