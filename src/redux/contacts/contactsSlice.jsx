import { createSlice } from '@reduxjs/toolkit';
import {
  fetchContacts,
  addContact,
  delContact,
  toggleCompleted,
} from './operations';

const handlePending = state => {
  state.isLoading = true;
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

export const contactsSlice = createSlice({
  name: 'contacts',
  initialState: {
    items: [],
    isLoading: false,
    error: null,
    filter: '',
  },

  extraReducers: {
    [fetchContacts.pending]: handlePending,
    [fetchContacts.fulfilled](state, action) {
      state.isLoading = false;
      state.error = null;
      state.items = action.payload;
    },
    [fetchContacts.rejected]: handleRejected,
    [addContact.pending]: handlePending,
    [addContact.fulfilled](state, action) {
      console.log('add', state, action);
      state.isLoading = false;
      state.error = null;
      state.items.push(action.payload);
    },

    [addContact.rejected]: handleRejected,
    [delContact.pending]: handlePending,
    [delContact.fulfilled](state, action) {
      state.isLoading = false;
      state.error = null;
      const index = state.items.findIndex(
        contact => contact.id === action.payload.id
      );
      state.items.splice(index, 1);
    },
    [delContact.rejected]: handleRejected,
    [toggleCompleted.pending]: handlePending,
    [toggleCompleted.fulfilled](state, action) {
      state.isLoading = false;
      state.error = null;
      const index = state.items.findIndex(
        contact => contact.id === action.payload.id
      );
      state.items.splice(index, 1, action.payload);
    },
    [toggleCompleted.rejected]: handleRejected,
  },
});

export const contactsReducer = contactsSlice.reducer;






// import { createSlice } from '@reduxjs/toolkit';
// import { fetchContacts, addContact, deleteContact, editContact } from './operations';

// const initialState = {
//   contacts: {
//     items: [],
//     isLoading: false,
//     error: null,
//   },
//   filter: '',
// };

// const contactsSlice = createSlice({
//   name: 'contacts',
//   initialState,
//   extraReducers: builder => {
//     builder.addCase(fetchContacts.fulfilled, (state, action) => {
//       state.contacts.items = action.payload;
//       state.contacts.isLoading = false;
//     });
//     builder.addCase(fetchContacts.pending, state => {
//       state.contacts.isLoading = true;
//     });
//     builder.addCase(fetchContacts.rejected, (state, action) => {
//       state.contacts.error = action.payload;
//       state.contacts.isLoading = false;
//     });

//     builder.addCase(addContact.fulfilled, (state, action) => {
//       state.contacts.items.push(action.payload);
//       state.contacts.isLoading = false;
//     });
//     builder.addCase(addContact.pending, state => {
//       state.contacts.isLoading = true;
//     });
//     builder.addCase(addContact.rejected, (state, action) => {
//       state.contacts.error = action.payload;
//       state.contacts.isLoading = false;
//     });

//     builder.addCase(deleteContact.fulfilled, (state, action) => {
//       const index = state.contacts.items.findIndex(
//         contact => contact.id === action.payload
//       );
//       state.contacts.items.splice(index, 1);
//       state.contacts.isLoading = false;
//     });
//     builder.addCase(deleteContact.pending, state => {
//       state.contacts.isLoading = true;
//     });
//     builder.addCase(deleteContact.rejected, (state, action) => {
//       state.contacts.error = action.payload;
//       state.contacts.isLoading = false;
//     });

//     builder.addCase(editContact.fulfilled, (state, action) => {
//       const index = state.contacts.items.findIndex(
//         contact => contact.id === action.payload.id
//       );
//       state.contacts.items.splice(index, 1, action.payload);
//       state.contacts.isLoading = false;
//     });
//     builder.addCase(editContact.pending, state => {
//       state.contacts.isLoading = true;
//     });
//     builder.addCase(editContact.rejected, (state, action) => {
//       state.contacts.error = action.payload;
//       state.contacts.isLoading = false;
//     });
//   },
//   reducers: {
//     setFilter(state, action) {
//       state.filter = action.payload;
//     },
//   },
// });

// export const { setFilter } = contactsSlice.actions;
// export const contactsReducer = contactsSlice.reducer;
