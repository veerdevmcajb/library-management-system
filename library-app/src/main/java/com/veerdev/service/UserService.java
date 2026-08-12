package com.veerdev.service;

import java.util.List;

import com.veerdev.dto.UserDto;
import com.veerdev.entity.User;

public interface UserService {

	 User saveUser(User user);

	    List<User> getAllUsers();

	    User getUserById(Integer id);

	    User updateUser(Integer id, User user);

	    void deleteUser(Integer id);

}
