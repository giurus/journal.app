import React, { useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';
import { JournalScreen } from '../components/journal/JournalScreen';
import { AuthRouter } from './AuthRouter';
import { useDispatch } from 'react-redux';
import { login } from '../actions/auth';
import { PrivateRoutes } from './PrivateRoutes';
import { PublicRoutes } from './PublicRoutes';
import { startLoadingNotes } from '../actions/notes';

export const AppRouter = () => {
	const dispatch = useDispatch();

	const [cheking, setCheking] = useState(true);
	const [isLogged, setIsLogged] = useState(false);

	useEffect(() => {
		const auth = getAuth();
		onAuthStateChanged(auth, async (user) => {
			if (user?.uid) {
				dispatch(login(user.uid, user.displayName));
				setIsLogged(true);
				dispatch(startLoadingNotes(user.uid))
				
			} else {
				setIsLogged(false);
			}
			setCheking(false);
		});
	}, [dispatch, setCheking, setIsLogged]);

	if (cheking) {
		return <h1>Loading...</h1>;
	}

	return (
		<Router>
			<Switch>
				<PublicRoutes isAuth={isLogged} path="/auth" component={AuthRouter} />
				<PrivateRoutes isAuth={isLogged} path="/" exact component={JournalScreen} />
				<Redirect to="/auth/login" />
			</Switch>
		</Router>
	);
};
