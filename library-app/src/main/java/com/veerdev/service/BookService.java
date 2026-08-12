package com.veerdev.service;

import java.util.List;

import com.veerdev.entity.Book;

public interface BookService {

	 Book addBook(Book book);

	    List<Book> getAllBooks();

	    Book getBookById(Integer id);

	    Book updateBook(Integer id, Book book);

	    void deleteBook(Integer id);
	    
}
