
        package com.veerdev.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import com.veerdev.entity.BorrowRecord;
import com.veerdev.service.BorrowService;

@RestController
@RequestMapping("/borrow")
public class BorrowController {

    private final BorrowService borrowService;

    public BorrowController(BorrowService borrowService) {
        this.borrowService = borrowService;
    }


    // ==========================================
    // BORROW BOOK
    // LOGGED-IN USER
    // ==========================================

    @PostMapping("/{bookId}")
    public ResponseEntity<BorrowRecord> borrowBook(
            @PathVariable Integer bookId,
            Authentication authentication) {

        String email = authentication.getName();

        return ResponseEntity.ok(
                borrowService.borrowBook(email, bookId)
        );
    }


    // ==========================================
    // USER - MY BORROW HISTORY
    // ==========================================

    @GetMapping("/my-history")
    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    public ResponseEntity<List<BorrowRecord>> getMyHistory(
            Authentication authentication) {

        String email = authentication.getName();

        return ResponseEntity.ok(
                borrowService.getBorrowedBooks(email)
        );
    }


    // ==========================================
    // ADMIN - GET USER BORROW HISTORY
    // ==========================================

    @GetMapping("/user/{userId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<BorrowRecord>> getUserHistory(
            @PathVariable Integer userId) {

        return ResponseEntity.ok(
                borrowService.getBorrowedBooksByUserId(userId)
        );
    }


    // ==========================================
    // RETURN BOOK
    // ==========================================

    @PutMapping("/return/{borrowId}")
    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    public ResponseEntity<BorrowRecord> returnBook(
            @PathVariable Integer borrowId,
            Authentication authentication) {

        String email = authentication.getName();

        return ResponseEntity.ok(
                borrowService.returnBook(
                        email,
                        borrowId
                )
        );
    }

    //get all borrow records

    @GetMapping("/admin/all")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<BorrowRecord>> getAllBorrowRecords() {

        return ResponseEntity.ok(
                borrowService.getAllBorrowRecords()
        );
    }
}

