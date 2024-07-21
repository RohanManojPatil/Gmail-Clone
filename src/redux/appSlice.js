import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

const emailsAdapter = createEntityAdapter({
  selectId: (email) => email.id,
});

const appSlice = createSlice({
  name: 'app',
  initialState: emailsAdapter.getInitialState({
    open: false,
    selectedMail: null,
    freshMail: [], // Ensure freshMail is initialized as an array
    searchText: "",
    authUser: null,
  }),
  reducers: {
    setOpen: (state, action) => {
      state.open = action.payload;
    },
    setEmails: (state, action) => {
      const emailsWithSerializableDates = action.payload.map((email) => ({
        ...email,
        createdAt: email.createdAt instanceof Date
          ? email.createdAt.toISOString()
          : email.createdAt, // Assuming already serialized if not Date
      }));
      emailsAdapter.setAll(state, emailsWithSerializableDates);
    },
    setSelectedMail: (state, action) => {
      state.selectedMail = action.payload;
    },
    setFreshMail: (state, action) => {
      state.freshMail = action.payload;
    },
    setSearchText: (state, action) => {
      state.searchText = action.payload;
    },
    setAuthUser: (state, action) => {
      state.authUser = action.payload;
    }
  },
});

export const { setOpen, setEmails, setSelectedMail, setFreshMail, setSearchText, setAuthUser } = appSlice.actions;

export const { selectAll: selectAllEmails } = emailsAdapter.getSelectors(
  (state) => state.app
);

export default appSlice.reducer;
