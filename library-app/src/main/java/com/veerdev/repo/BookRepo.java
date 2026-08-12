package com.veerdev.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.veerdev.entity.Book;

public interface BookRepo extends JpaRepository<Book, Integer> {

	
}
