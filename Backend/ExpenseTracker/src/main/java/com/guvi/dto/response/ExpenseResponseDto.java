package com.guvi.dto.response;

import java.time.LocalDate;

public class ExpenseResponseDto {

    private Long expenseId;
    private Double amount;
    private LocalDate expenseDate;
    private CategoryResponseDto category;

    public ExpenseResponseDto(
            Long expenseId,
            Double amount,
            LocalDate expenseDate,
            CategoryResponseDto category) {

        this.expenseId = expenseId;
        this.amount = amount;
        this.expenseDate = expenseDate;
        this.category = category;
    }

    // getters only (no setters needed)
    public Long getExpenseId() {
        return expenseId;
    }

    public Double getAmount() {
        return amount;
    }

    public LocalDate getExpenseDate() {
        return expenseDate;
    }

    public CategoryResponseDto getCategory() {
        return category;
    }
}