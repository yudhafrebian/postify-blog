import { createSlice } from "@reduxjs/toolkit";

type sectionType = "home" | "my-post"

interface ISectionState {
    sectionType: sectionType
}

const initialState: ISectionState = {
    sectionType: "home"
}

const sectionSlice = createSlice({
    name: "section",
    initialState,
    reducers: {
        setSectionType: (state, action) => {
            state.sectionType = action.payload
        }
    }
})

export const { setSectionType } = sectionSlice.actions;
export default sectionSlice.reducer