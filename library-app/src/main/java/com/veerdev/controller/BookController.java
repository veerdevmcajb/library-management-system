package com.veerdev.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.veerdev.entity.Book;
import com.veerdev.service.BookService;

@RestController
@RequestMapping("/books")
public class BookController {

    private final BookService bookService;

    public BookController(BookService bookService) {
        this.bookService = bookService;
    }


    // ==========================================
    // GET ALL BOOKS
    // ADMIN + USER
    // ==========================================

    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
    public ResponseEntity<List<Book>> getAllBooks() {

        return ResponseEntity.ok(
                bookService.getAllBooks()
        );
    }


    // ==========================================
    // GET BOOK BY ID
    // ADMIN + USER
    // ==========================================

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
    public ResponseEntity<Book> getBookById(
            @PathVariable Integer id) {

        return ResponseEntity.ok(
                bookService.getBookById(id)
        );
    }


    // ==========================================
    // ADD BOOK
    // ADMIN ONLY
    // ==========================================

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Book> addBook(
            @RequestBody Book book) {

        Book savedBook =
                bookService.addBook(book);

        return new ResponseEntity<>(
                savedBook,
                HttpStatus.CREATED
        );
    }


    // ==========================================
    // UPDATE BOOK
    // ADMIN ONLY
    // ==========================================

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Book> updateBook(
            @PathVariable Integer id,
            @RequestBody Book book) {

        return ResponseEntity.ok(
                bookService.updateBook(id, book)
        );
    }


    // ==========================================
    // DELETE BOOK
    // ADMIN ONLY
    // ==========================================

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<String> deleteBook(
            @PathVariable Integer id) {

        bookService.deleteBook(id);

        return ResponseEntity.ok(
                "Book deleted successfully."
        );
    }

}