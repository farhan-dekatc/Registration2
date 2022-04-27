package com.services.registration.users.repository;

import com.services.registration.users.entity.Role;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleRepo extends JpaRepository<Role, Long> {
    // for pagination
    Page<Role> findAll(Pageable p);

    Role findByName(String name);

}
