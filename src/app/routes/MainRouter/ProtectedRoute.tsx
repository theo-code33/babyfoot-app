import { Navigate } from "react-router-dom";
import { Props } from "./utils";

const ProtectedRoute: React.FC<Props> = ({user, children, onlyAdmin = false}) => {
    if(user === undefined){
        return <Navigate to="/" replace/>
    }
    if(onlyAdmin && !user.isAdmin){
        return <Navigate to="/" replace/>
    }
    return (
        <>
            {children}
        </>
    )
}
 
export default ProtectedRoute;