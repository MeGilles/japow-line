import { UserState, SIGN_IN, SIGN_OUT } from "./types"

export const signInAction = (userState: UserState) => {
    return {
        type: SIGN_IN,
        payload: {
            isSignedIn: true,
            role: userState.role,
            uid: userState.uid,
            username: userState.username
        }
    }
}

export const signOutAction = () => {
    return { 
        type: SIGN_OUT,
        payload: {
            isSignedIn: false,
            role: "",
            uid: "",
            username: ""
        }
    }
}