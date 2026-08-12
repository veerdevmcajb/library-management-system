package com.veerdev.repo;

import org.springframework.data.jpa.repository.JpaRepository;


import com.veerdev.entity.User;
import java.util.Optional;

public interface UserRepo extends JpaRepository<User, Integer>{

	  Optional<User> findByEmail(String email);
	
}
