import { userConstants } from "../constants";
import { firestore } from 'firebase';

export const getRealtimeUsers = (uid) => {

    return async (dispatch) => {

        dispatch({ type: `${userConstants.GET_REALTIME_USERS}_REQUEST` })

        const db = firestore();
        const unsubscribe = db.collection("users")
            // .where("uid", "!==", uid)
            .onSnapshot((querySnapshot) => {
                const users = [];
                querySnapshot.forEach(function (doc) {
                    if (doc.data().uid !== uid) {
                        users.push(doc.data());
                    }

                });
                // console.log(users);

                dispatch({
                    type: `${userConstants.GET_REALTIME_USERS}_SUCCESS`,
                    payload: { users }
                })
            });
        return unsubscribe;
    }
}



export const updateMessage = (msgObj) => {
    return async dispatch => {
        const db = firestore();
        db.collection('conversation')
            .add({
                ...msgObj,
                isView: false,
                createdAt: new Date()
            })
            .then((data) => {
                // dispatch({
                //     type: userConstants.GET_REAL_TIME_MESSAGES,
                //     payload: msgObj
                // })
            })
            .catch(error => {
                console.log(error)
            })
    }
}

export const getRealtimeConversation = (user) => {
    return async dispatch => {

        const db = firestore();
        db.collection('conversation')
            .where('user_uid_1', 'in', [user.uid_1, user.uid_2])
            .orderBy('createdAt', 'asc')
            .onSnapshot((querySnapshot) => {

                const conversation = [];


                querySnapshot.forEach(doc => {

                    if (
                        (doc.data().user_uid_1 === user.uid_1 && doc.data().user_uid_2 === user.uid_2)
                        ||
                        (doc.data().user_uid_1 === user.uid_2 && doc.data().user_uid_2 === user.uid_1)
                    ) {
                        conversation.push(doc.data())
                    }

                    // if(conversation.length > 0){
                    //     dispatch({
                    //         type: userConstants.GET_REAL_TIME_MESSAGES,
                    //         payload: {conversation}
                    //     })
                    // }else{
                    //     dispatch({
                    //         type:`${userConstants.GET_REAL_TIME_MESSAGES}_FAILURE`,
                    //         payload: {conversation}
                    //     })
                    // }


                });

                dispatch({
                    type: userConstants.GET_REAL_TIME_MESSAGES,
                    payload: { conversation }
                })
            })
    }
}