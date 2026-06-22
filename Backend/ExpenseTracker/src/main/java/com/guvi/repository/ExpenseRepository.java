package com.guvi.repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.guvi.entity.Account;
import com.guvi.entity.Expense;

@Repository
public interface ExpenseRepository extends JpaRepository<Expense, Long> {

    List<Expense> findByAccount(Account account);

    List<Expense> findByAccountAndExpenseDateBetween(
            Account account,
            LocalDate start,
            LocalDate end
    );

    Optional<Expense> findByExpenseIdAndAccount(Long id, Account account);

    void deleteByAccountAccountId(Long accountId);
}