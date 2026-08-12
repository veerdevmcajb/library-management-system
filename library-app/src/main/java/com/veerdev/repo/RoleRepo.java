package com.veerdev.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.veerdev.entity.Role;

public interface RoleRepo extends JpaRepository<Role, Integer> {

    Role findByRoleName(String roleName);
}
