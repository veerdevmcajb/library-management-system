package com.veerdev.serviceimpl;

import java.time.LocalDate;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.veerdev.entity.Book;
import com.veerdev.entity.BorrowRecord;
import com.veerdev.entity.User;
import com.veerdev.repo.BookRepo;
import com.veerdev.repo.BorrowRepository;
import com.veerdev.repo.UserRepo;
import com.veerdev.service.BorrowService;

@Service
public class BorrowServiceImpl implements BorrowService {

    private final BorrowRepository borrowRepository;
    private final UserRepo userRepo;
    private final BookRepo bookRepo;


    public BorrowServiceImpl(
            BorrowRepository borrowRepository,
            UserRepo userRepo,
            BookRepo bookRepo) {

        this.borrowRepository = borrowRepository;
        this.userRepo = userRepo;
        this.bookRepo = bookRepo;
    }


    // ==========================================
    // BORROW BOOK
    // ==========================================

    @Transactional
    @Override
    public BorrowRecord borrowBook(
            String email,
            Integer bookId) {


        // Find logged-in user
        User user = userRepo.findByEmail(email)
                .orElseThrow(() -> new RuntimeException( "User not found" ) );

        // Find book
         Book book = bookRepo.findById(bookId)
                 .orElseThrow(() -> new RuntimeException( "Book not found" ) );


        // Check if user already borrowed this book

        boolean alreadyBorrowed =
                borrowRepository
                        .existsByUserAndBookAndReturnedFalse(
                                user,
                                book
                        );

        if (alreadyBorrowed) {

            throw new RuntimeException(
                    "You have already borrowed this book."
            );
        }


         // Check book quantity
        if (book.getQuantity() == null || book.getQuantity() <= 0)
        {
            throw new RuntimeException( "Book is not available." );
        }

        // Decrease quantity
        book.setQuantity( book.getQuantity() - 1 );
        bookRepo.save(book);


        // Create borrow record

        BorrowRecord record = new BorrowRecord();
        record.setUser(user);
        record.setBook(book);
        record.setIssueDate( LocalDate.now()
        );

        record.setReturned(false);

        return borrowRepository.save(record);
    }


    // ==========================================
    // RETURN BOOK
    // ==========================================

    @Transactional
    @Override
    public BorrowRecord returnBook(
            String email,
            Integer borrowId) {

        // Find logged-in user

        User user =
                userRepo.findByEmail(email)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "User not found"
                                )
                        );


        // Find borrow record

        BorrowRecord record =
                borrowRepository.findById(borrowId)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Borrow record not found"
                                )
                        );


        // Security check
        // Make sure this record belongs
        // to the logged-in user

        if (!record.getUser().getId()
                .equals(user.getId())) {

            throw new RuntimeException(
                    "You cannot return another user's book."
            );
        }


        // Check if already returned

        if (record.isReturned()) {

            throw new RuntimeException(
                    "Book is already returned."
            );
        }


        // Mark book as returned

        record.setReturned(true);

        record.setReturnDate(
                LocalDate.now()
        );


        // Increase book quantity

        Book book = record.getBook();

        book.setQuantity(
                book.getQuantity() + 1
        );

        bookRepo.save(book);


        // Save borrow record

        return borrowRepository.save(record);
    }



    // ==========================================
    // MY BORROW HISTORY
    // ==========================================

    @Override
    public List<BorrowRecord> getBorrowedBooks(
            String email) {


        // Find logged-in user

        User user =
                userRepo.findByEmail(email)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "User not found"
                                )
                        );


        // Return only this user's records

        return borrowRepository.findByUser(user);
    }


    @Override
    public List<BorrowRecord> getBorrowedBooksByUserId(Integer userId) {

        User user = userRepo.findById(userId)
                .orElseThrow(() ->
                        new RuntimeException("User not found")
                );

        return borrowRepository.findByUser(user);
    }


    @Override
    public List<BorrowRecord> getAllBorrowRecords() {

        return borrowRepository.findAll();
    }

}

