package com.veerdev.serviceimpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.veerdev.entity.Book;
import com.veerdev.repo.BookRepo;
import com.veerdev.service.BookService;


@Service
public class BookServiceImpl implements BookService {

	@Autowired
	 private final BookRepo bookRepository;

	    public BookServiceImpl(BookRepo bookRepository) {
	        this.bookRepository = bookRepository;
	    }

	    @Override
	    public Book addBook(Book book) {
	        return bookRepository.save(book);
	    }

	    @Override
	    public List<Book> getAllBooks() {
	        return bookRepository.findAll();
	    }

	    @Override
	    public Book getBookById(Integer id) {
	        return bookRepository.findById(id)
	                .orElseThrow(() -> new RuntimeException("Book not found with id : " + id));
	    }

	    @Override
	    public Book updateBook(Integer id, Book book) {

	        Book existing = getBookById(id);

	        existing.setTitle(book.getTitle());
	        existing.setAuthor(book.getAuthor());
	        existing.setPrice(book.getPrice());

	        return bookRepository.save(existing);
	    }

	    @Override
	    public void deleteBook(Integer id) {

	        Book book = getBookById(id);
	        bookRepository.delete(book);

	    }
}
