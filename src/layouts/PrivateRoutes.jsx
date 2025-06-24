import {Navigate} from 'react-router-dom'
import {useAuth} from "../store/auth"

export default function PrivateRoute(children){
    const loggedIn = useAuth((state) => state.isLoggedIn)()

    return loggedIn ? <>{children}</> : <Navigate to="/login/" />
}