package com.veerdev.repo;

import java.util.List;

import com.veerdev.entity.Book;
import org.springframework.data.jpa.repository.JpaRepository;

import com.veerdev.entity.BorrowRecord;
import com.veerdev.entity.User;

public interface BorrowRepository
        extends JpaRepository<BorrowRecord, Integer> {

    List<BorrowRecord> findByUser(User user);

    boolean existsByUserAndBookAndReturnedFalse(
            User user,
            Book book
    );

}