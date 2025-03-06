import { createSlice } from "@reduxjs/toolkit";

type FormType = "signin" | "signup" | "signup-success";

interface IFormState {
  formtype: FormType;
}

const initialState: IFormState = {
  formtype: "signup",
};

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    setFormType: (state, action) => {
      state.formtype = action.payload;
    },
  },
});

export const { setFormType } = formSlice.actions;
export default formSlice.reducer;
