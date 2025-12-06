import auth from '../../Firebase/firebase.init';
import { AuthContext } from './AuthContext';

const AuthProvider = ({children}) => {
    const authData={
        auth,
    };
    
    return <AuthContext.Provider value={authData}>{children}</AuthContext.Provider>
};

export default AuthProvider;