package com.guvi.web;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.guvi.entity.Category;
import com.guvi.service.CategoryService;

@RestController
@CrossOrigin(origins= {"http://localhost:5173"})
@RequestMapping("/category")
public class CategoryController {

    @Autowired
    private CategoryService service;

    //@PreAuthorize("hasAuthority('ROLE_USER')")
    @GetMapping("/getAll")
    public List<Category> getAllCategories() {
        return service.getAllCategories();
    }
}