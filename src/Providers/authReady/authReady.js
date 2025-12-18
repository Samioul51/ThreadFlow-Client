import { onAuthStateChanged } from "firebase/auth";
import auth from "../../Firebase/firebase.init";



let authResolved=false;
let authUser=null;
let waiters=[];

onAuthStateChanged(auth,(user)=>{
    authResolved=true;
    authUser=user;
    waiters.forEach((cb)=>cb(user));
    waiters=[];
});

export const authReady=()=>
    authResolved
    ?
    Promise.resolve(authUser)
    :
    new Promise(resolve=>waiters.push(resolve));