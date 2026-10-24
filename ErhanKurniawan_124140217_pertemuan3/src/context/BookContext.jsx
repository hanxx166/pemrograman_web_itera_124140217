// src/context/BookContext.jsx
import { useEffect, useReducer } from "react";
import PropTypes from "prop-types";
import useLocalStorage from "../hooks/useLocalStorage";
import { BookContext, BOOK_ACTIONS, bookReducer } from "./bookStore";

export function BookProvider({ children }) {
  const [storedBooks, setStoredBooks] = useLocalStorage("paw-books", []);

  const [books, dispatch] = useReducer(bookReducer, storedBooks, (initial) => {
    return Array.isArray(initial) ? initial : [];
  });

  useEffect(() => {
    setStoredBooks(books);
  }, [books, setStoredBooks]);

  const addBook = (book) =>
    dispatch({ type: BOOK_ACTIONS.ADD_BOOK, payload: book });
  const updateBook = (book) =>
    dispatch({ type: BOOK_ACTIONS.UPDATE_BOOK, payload: book });
  const deleteBook = (id) =>
    dispatch({ type: BOOK_ACTIONS.DELETE_BOOK, payload: id });

  const value = { books, addBook, updateBook, deleteBook };

  return <BookContext.Provider value={value}>{children}</BookContext.Provider>;
}

BookProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
