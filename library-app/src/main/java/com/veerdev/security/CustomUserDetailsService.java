package com.veerdev.security;

import com.veerdev.entity.User;
import com.veerdev.repo.UserRepo;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.stream.Collectors;

@Service
public class CustomUserDetailsService implements UserDetailsService {

 private final UserRepo userRepo;

 public CustomUserDetailsService(UserRepo userRepo){
     this.userRepo=userRepo;
 }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {

     User user = userRepo.findByEmail(email).orElseThrow(()->new UsernameNotFoundException("User not found : " + email));

        return new org.springframework.security.core.userdetails.User(

                user.getEmail(),

                user.getPassword(),

                user.getRoles()
                        .stream()
                        .map(role ->
                                new SimpleGrantedAuthority(
                                        "ROLE_" + role.getRoleName().toUpperCase()
                                )
                        )
                        .collect(Collectors.toList())

        );
    }
}
