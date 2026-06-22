package com.guvi.service;




import java.util.List;

	
import com.guvi.dto.input.ExpenseDto;
import com.guvi.dto.response.ExpenseResponseDto;
import com.guvi.dto.response.MonthlyExpenseSummary;
import com.guvi.entity.Expense;

public interface ExpenseService {

    // already exists
    boolean addExpense(String username, ExpenseDto dto);

    // NEW - current month summary
    MonthlyExpenseSummary getExpensesThisMonth(String username);

    // NEW - selected year & month summary
    MonthlyExpenseSummary getExpensesForMonth(
          String username,
          int year,
          int month
    );


    List<ExpenseResponseDto> getAllExpenses(String username);

    boolean deleteExpense(String username,Long expenseId);

    MonthlyExpenseSummary getYearlySummary(String username);
}