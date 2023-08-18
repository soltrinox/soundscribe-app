import { Navigate } from 'react-router-dom'
import UserContext from '../UserContext'
import { useEffect, useContext } from 'react'
import { Link, NavLink } from 'react-router-dom'




export default function Logout(){
	const {  setUser } = useContext(UserContext)

	// Using the context, clear the contents of the local storage
	// unsetUser()

	// An effect which removes the user email from the global use state that comes from the context
	useEffect(() => {

		setUser({
			id: null,
            isAdmin: null
		})
	}, [])

	return(
        
    	<Navigate to="/login"/>
    )
}
