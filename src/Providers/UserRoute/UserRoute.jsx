import React, { use } from 'react';
import { AuthContext } from '../AuthProvider/AuthProvider';
import { useLocation } from 'react-router';
import Loading from '../../Components/Loading/Loading';
import Forbidden from '../../Components/Forbidden/Forbidden';

const UserRoute = ({children}) => {
    const {user,loading,userData}=use(AuthContext);
    const location=useLocation();
    if(loading)
        return <Loading></Loading>;

    if(userData.role!=="buyer")
        return <Forbidden></Forbidden>
    return children;
};

export default UserRoute;