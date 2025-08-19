import { Navigate } from "react-router-dom";
import useAuth from "./useAuth";

function ProtectedRoute({ component: Component }) {
    const { isAuthenticated } = useAuth();

    if (!isAuthenticated) return <Navigate to="/login" replace/>

    return Component;
}

export default ProtectedRoute;
