package com.guvi.repository;

import com.guvi.entity.Role;
import com.guvi.entity.RolePK;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoleRepository extends JpaRepository<Role, RolePK> {

    void deleteByKeyUserName(String username);

    List<Role> findByKeyUserName(String username);
}