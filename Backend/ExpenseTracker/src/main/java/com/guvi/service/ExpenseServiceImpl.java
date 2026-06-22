package com.guvi.service;

import java.time.LocalDate;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.guvi.dto.input.ExpenseDto;
import com.guvi.dto.response.CategoryResponseDto;
import com.guvi.dto.response.ExpenseResponseDto;
import com.guvi.dto.response.MonthlyExpenseSummary;
import com.guvi.entity.Account;
import com.guvi.entity.Category;
import com.guvi.entity.Expense;
import com.guvi.repository.AccountRepository;
import com.guvi.repository.CategoryRepository;
import com.guvi.repository.ExpenseRepository;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class ExpenseServiceImpl implements ExpenseService {

    @Autowired
    private ExpenseRepository expenseRepo;

    @Autowired
    private AccountRepository accountRepo;

    @Autowired
    private CategoryRepository categoryRepo;




    public boolean addExpense(String username, ExpenseDto dto) {

        // 1. Get account
        Account account = accountRepo.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Account not found"));

        // 2. Get category
        Category category = categoryRepo.findById(dto.getCategoryId())
                .orElseThrow(() -> new RuntimeException("Category not found"));

        // 3. Create expense
        Expense expense = new Expense();
        expense.setAmount(dto.getAmount());
        expense.setExpenseDateTime(LocalDate.now());
        expense.setAccount(account);
        expense.setCategory(category);

        // 4. Save
        expenseRepo.save(expense);

        return true;
    }

    // ----------------------------
    // CURRENT MONTH (TILL TODAY)
    // ----------------------------
    @Override
    public MonthlyExpenseSummary getExpensesThisMonth(String username) {

        Account account = accountRepo.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Account not found"));

        LocalDate start = LocalDate.now().withDayOfMonth(1);
        LocalDate end = LocalDate.now();

        return calculateSummary(account, start, end);
    }

    // ----------------------------
    // SELECTED YEAR & MONTH
    // ----------------------------
    @Override
    public MonthlyExpenseSummary getExpensesForMonth(
            String username, int year, int month) {

        Account account = accountRepo.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Account not found"));

        LocalDate start = LocalDate.of(year, month, 1);
        LocalDate end = start.withDayOfMonth(start.lengthOfMonth());

        return calculateSummary(account, start, end);
    }

    // ----------------------------
    // COMMON CALCULATION METHOD
    // ----------------------------
    private MonthlyExpenseSummary calculateSummary(
            Account account, LocalDate from, LocalDate to) {

        List<Expense> expenses =
                expenseRepo.findByAccountAndExpenseDateBetween(account, from, to);

        double total = 0.0;
        Map<String, Double> categoryMap = new HashMap<>();

        for (Expense e : expenses) {
            total += e.getAmount();

            String categoryName = e.getCategory().getCategoryName();
            categoryMap.put(
                    categoryName,
                    categoryMap.getOrDefault(categoryName, 0.0) + e.getAmount()
            );
        }

        MonthlyExpenseSummary summary = new MonthlyExpenseSummary();
        summary.setTotalSpend(total);
        summary.setCategoryWiseSpend(categoryMap);

        return summary;
    }

    @Override
    public List<ExpenseResponseDto> getAllExpenses(String username) {

        Account account = accountRepo.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Account not found"));

        List<Expense> expenses = expenseRepo.findByAccount(account);

        return expenses.stream()
                .map(e -> new ExpenseResponseDto(
                        e.getExpenseId(),
                        e.getAmount(),
                        e.getExpenseDateTime(),
                        new CategoryResponseDto(
                                e.getCategory().getCategoryId(),
                                e.getCategory().getCategoryName()
                        )
                ))
                .toList();
    }

    @Override
    public boolean deleteExpense(String username, Long expenseId) {

        Account account = accountRepo.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Account not found"));

        Expense expense = expenseRepo.findByExpenseIdAndAccount(expenseId, account)
                .orElseThrow(() -> new RuntimeException("Expense not found"));

        expenseRepo.delete(expense);

        return true;
    }

    @Override
    public MonthlyExpenseSummary getYearlySummary(String username) {

        Account account=accountRepo.findByUsername(username).orElseThrow(()->new RuntimeException("Account not Found"));

        LocalDate startDate=LocalDate.now().withDayOfYear(1);

        LocalDate endDate=LocalDate.now();

        List<Expense> expenses=expenseRepo.findByAccountAndExpenseDateBetween(account, startDate, endDate);
        double totalSpend=expenses.stream().mapToDouble(Expense::getAmount).sum();

        Map<String,Double> categoryWiseSpend =expenses.stream().collect(Collectors.groupingBy(e->
        e.getCategory().getCategoryName(),Collectors.summingDouble(Expense::getAmount)));

        MonthlyExpenseSummary summary=new MonthlyExpenseSummary();
        summary.setTotalSpend(totalSpend);
        summary.setCategoryWiseSpend(categoryWiseSpend);

        return summary;
    }
}