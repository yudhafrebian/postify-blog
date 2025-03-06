import { createSlice } from "@reduxjs/toolkit";

interface IAuth {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  profilePic: string
}

const initialState: IAuth = {
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    profilePic: ""
}

const AuthSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setLogin: (state, action) => {
            console.log("Check Action SignIn", action)
            return action.payload
        },
        setLogout: () => {
            return initialState
        }
    }
})

export const {setLogin, setLogout} = AuthSlice.actions
export default AuthSlice.reducer