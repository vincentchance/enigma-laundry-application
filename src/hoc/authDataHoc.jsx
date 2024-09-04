import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux'

//jika login
export const IsAuth = (WrappedComponent) => {
	const authComponent = (props) => {
		const authData = useSelector((state) => state.auth.authData)
		if(authData){
			return <Navigate to={`/dashboard/${authData.username}`} />
		}
		return <WrappedComponent {...props} />
	}
	return authComponent;
}

//jika logout
export const NotAuth = (WrappedComponent) => {
	const authComponent = (props) => {
		const authData = useSelector((state) => state.auth.authData)
		if(!authData){
			return <Navigate to="/" />
		}
		return <WrappedComponent {...props} />
	}
	return authComponent;
}