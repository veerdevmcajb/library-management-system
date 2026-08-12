package com.veerdev.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;

import org.springframework.security.crypto.password.PasswordEncoder;

import org.springframework.web.bind.annotation.*;

import com.veerdev.dto.LoginRequest;
import com.veerdev.dto.LoginResponse;
import com.veerdev.entity.Role;
import com.veerdev.entity.User;
import com.veerdev.repo.RoleRepo;
import com.veerdev.repo.UserRepo;
import com.veerdev.security.JwtService;


@RestController
@RequestMapping("/auth")
@CrossOrigin
public class AuthController {

    private final UserRepo userRepo;
    private final RoleRepo roleRepo;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;


    public AuthController(
            UserRepo userRepo,
            RoleRepo roleRepo,
            PasswordEncoder passwordEncoder,
            AuthenticationManager authenticationManager,
            JwtService jwtService) {

        this.userRepo = userRepo;
        this.roleRepo = roleRepo;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.jwtService = jwtService;
    }


    // ==========================================
    // REGISTER
    // ==========================================

    @PostMapping("/register")
    public ResponseEntity<String> register(
            @RequestBody User user) {


        // Check if email already exists

        if (userRepo.findByEmail(user.getEmail()).isPresent()) {

            return ResponseEntity
                    .status(HttpStatus.CONFLICT)
                    .body("Email already registered");
        }


        // Encode password

        user.setPassword(
                passwordEncoder.encode(
                        user.getPassword()
                )
        );


        // Always assign USER role

        Role userRole =
                roleRepo.findByRoleName("user");


        if (userRole == null) {

            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("User role not found");
        }


        user.setRoles(
                List.of(userRole)
        );


        userRepo.save(user);


        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body("Registration successful");
    }


    // ==========================================
    // LOGIN
    // ==========================================

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(
            @RequestBody LoginRequest request) {


        Authentication authentication =
                authenticationManager.authenticate(

                        new UsernamePasswordAuthenticationToken(
                                request.getEmail(),
                                request.getPassword()
                        )
                );


        // Get logged-in user's email

        String email =
                authentication.getName();


        // Generate JWT

        String token =
                jwtService.generateToken(email);


        // Get role

        String role =
                authentication
                        .getAuthorities()
                        .stream()
                        .findFirst()
                        .map(GrantedAuthority::getAuthority)
                        .orElse("ROLE_USER");


        return ResponseEntity.ok(

                new LoginResponse(
                        token,
                        email,
                        role
                )
        );
    }

}