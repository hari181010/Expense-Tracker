package com.guvi.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.guvi.entity.Category;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {
}