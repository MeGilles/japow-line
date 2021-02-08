import { State } from './types';

const initialState: State = {
    users: {
        isSignedIn: false,
        role: "",
        uid: "",
        username: ""
    }
}

export default initialState