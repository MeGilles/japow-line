export interface UserState {
    isSignedIn: boolean,
    role: string,
    uid: string,
    username: string,
}

export const SIGN_IN = "SIGN_IN"
export const SIGN_OUT = "SIGN_OUT"

export interface SignInAction {
    type: typeof SIGN_IN,
    payload: UserState
}

export interface SignOutAction {
    type: typeof SIGN_OUT,
    payload: UserState
}

export type UsersActionTypes = SignInAction | SignOutAction;

