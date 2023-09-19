import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store/store.ts";

function RequireAuth({ children }: { children: ReactNode } ) {
	// const token = localStorage.getItem('jwt_token')
	const token = useSelector((state: RootState) => state.user.token)


	if (!token) {
		return <Navigate to={'/auth/login'} replace />
	}
	return children
}

export default RequireAuth;