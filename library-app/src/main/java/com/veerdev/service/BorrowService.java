
  package com.veerdev.service;

import java.util.List;

import com.veerdev.entity.BorrowRecord;
import org.jspecify.annotations.Nullable;

  public interface BorrowService {

    BorrowRecord borrowBook(
            String email,
            Integer bookId
    );


    BorrowRecord returnBook(
            String email,
            Integer borrowId
    );


    List<BorrowRecord> getBorrowedBooks(
            String email
    );

     List<BorrowRecord> getBorrowedBooksByUserId(Integer userId);

      List<BorrowRecord> getAllBorrowRecords();
}

