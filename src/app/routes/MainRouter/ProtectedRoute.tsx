import { Navigate } from "react-router-dom";
import { Props } from "./utils";

const ProtectedRoute: React.FC<Props> = ({user, children}) => {
    console.log(user);
    
    if(user === undefined){
        return <Navigate to="/" replace/>
    }
    return (
        <>
            {children}
        </>
    )
}
 
export default ProtectedRoute;