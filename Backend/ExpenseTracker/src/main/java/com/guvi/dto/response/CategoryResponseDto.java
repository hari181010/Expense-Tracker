package com.guvi.dto.response;

public class CategoryResponseDto {

    private Long categoryId;
    private String categoryName;

    public CategoryResponseDto(Long categoryId, String categoryName) {
        this.categoryId = categoryId;
        this.categoryName = categoryName;
    }

    public Long getCategoryId() {
        return categoryId;
    }

    public String getCategoryName() {
        return categoryName;
    }
}