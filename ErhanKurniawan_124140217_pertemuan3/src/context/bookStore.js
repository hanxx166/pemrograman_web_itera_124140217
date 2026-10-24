// src/context/bookStore.js
import { createContext, useContext } from "react";

export const BOOK_ACTIONS = {
  SET_BOOKS: "SET_BOOKS",
  ADD_BOOK: "ADD_BOOK",
  UPDATE_BOOK: "UPDATE_BOOK",
  DELETE_BOOK: "DELETE_BOOK",
};

export function bookReducer(state, action) {
  switch (action.type) {
    case BOOK_ACTIONS.SET_BOOKS:
      return action.payload;
    case BOOK_ACTIONS.ADD_BOOK:
      return [...state, { ...action.payload, id: Date.now().toString() }];
    case BOOK_ACTIONS.UPDATE_BOOK:
      return state.map((book) =>
        book.id === action.payload.id ? action.payload : book,
      );
    case BOOK_ACTIONS.DELETE_BOOK:
      return state.filter((book) => book.id !== action.payload);
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

export const BookContext = createContext();

export function useBooks() {
  const context = useContext(BookContext);
  if (context === undefined) {
    throw new Error("useBooks must be used within a BookProvider");
  }
  return context;
}
