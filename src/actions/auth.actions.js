import { auth, firestore } from 'firebase';
import { authConstanst } from '../constants';


export const signup = (user) => {
    return async (dispatch) => {
        const db = firestore();
        dispatch({ type: `${authConstanst.USER_LOGIN}_REQUEST` });
        auth()
            .createUserWithEmailAndPassword(user.email, user.password)
            .then(data => {
                console.log(user);
                const currentUser = auth().currentUser;
                const name = `${user.firstName} ${user.lastName}`
                currentUser.updateProfile({
                    displayName: name
                })
                    .then(() => {
                        db.collection('users').add({
                            firstName: user.firstName,
                            lastName: user.lastName,
                            uid: data.user.uid,
                            createdAt: new Date()
                        })
                            .then(() => {
                                //successful
                                const loggedInUser = {
                                    firstName: user.firstName,
                                    lastName: user.lastName,
                                    uid: data.user.uid,
                                    email: user.email
                                }
                                localStorage.setItem('user', JSON.stringify(loggedInUser))
                                console.log('user logged in')
                                dispatch({
                                    type: `${authConstanst.USER_LOGIN}_SUCCESS`,
                                    payload: { user: loggedInUser }
                                })
                            })
                            .catch(error => {
                                console.log(error);
                                dispatch({
                                    type: `${authConstanst.USER_LOGIN}_FAILURE`,
                                    payload: { error: error }
                                });

                            })
                    })
            })
            .catch(error => {
                console.log(error)
            })
    }
}

export const signin = (user) => {
    return async dispatch =>{
        dispatch({type: `${authConstanst.USER_LOGIN}_REQUEST`});
        auth()
        .signInWithEmailAndPassword(user.email, user.password)
        .then((data) => {
            console.log(data);

            const name = data.user.displayName;
            const firstName = name[0];
            const lastName= name[1];

            const loggedInUser = {
                firstName,
                lastName,
                uid: data.user.uid,
                email: data.user.email
            } 

            localStorage.setItem('user', JSON.stringify(loggedInUser));

            dispatch({
                type: `${authConstanst.USER_LOGIN}_SUCCESS`,
                payload: {user: loggedInUser}
            });


        })
        .catch(error => {
            console.log(error)
            dispatch({
                type: `${authConstanst.USER_LOGIN}_FAILURE`,
                payload: {error}
            })
        })
    }
}