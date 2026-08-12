package com.veerdev.serviceimpl;



import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.veerdev.entity.Role;
import com.veerdev.entity.User;
import com.veerdev.repo.RoleRepo;
import com.veerdev.repo.UserRepo;
import com.veerdev.service.UserService;



@Service
public class UserServiceImpl implements UserService {

	@Autowired
    private  UserRepo userRepo;
    
	@Autowired
	private  RoleRepo roleRepo;
	
	@Autowired
	private  PasswordEncoder passwordEncoder;
	
//
//    public UserServiceImpl(UserRepo userRepo,
//                           PasswordEncoder passwordEncoder) {
//        this.userRepo = userRepo;
//        this.passwordEncoder = passwordEncoder;
//    }

    @Override
    public User saveUser(User user) {

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        
        List<Role> roles = user.getRoles().stream()
                .map(role -> roleRepo.findById(role.getId())
                        .orElseThrow(() ->
                                new RuntimeException("Role not found: " + role.getId())))
                .toList();

        user.setRoles(roles);

        return userRepo.save(user);
    }

    @Override
    public List<User> getAllUsers() {
        return userRepo.findAll();
    }

    @Override
    public User getUserById(Integer id) {

        return userRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    @Override
    public User updateUser(Integer id, User user) {

        User existing = getUserById(id);

        existing.setFirstName(user.getFirstName());
        existing.setLastName(user.getLastName());
        existing.setEmail(user.getEmail());

        if (user.getPassword() != null && !user.getPassword().isEmpty()) {
            existing.setPassword(passwordEncoder.encode(user.getPassword()));
        }

        existing.setRoles(user.getRoles());

        return userRepo.save(existing);
    }

    @Override
    public void deleteUser(Integer id) {

        User user = getUserById(id);

        userRepo.delete(user);
    }

	
}