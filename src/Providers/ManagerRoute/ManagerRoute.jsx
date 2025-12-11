import React, { use } from 'react';
import { useLocation } from 'react-router';
import Loading from '../../Components/Loading/Loading';
import Forbidden from '../../Components/Forbidden/Forbidden';
import { AuthContext } from '../AuthProvider/AuthProvider';

const ManagerRoute = ({children}) => {
    const {user,loading,userData}=use(AuthContext);
    const location=useLocation();
    if(loading)
        return <Loading></Loading>;

    if(userData.role!=="manager" || userData.roleStatus=== "pending")
        return <Forbidden></Forbidden>
    return children;
};
export default ManagerRoute;