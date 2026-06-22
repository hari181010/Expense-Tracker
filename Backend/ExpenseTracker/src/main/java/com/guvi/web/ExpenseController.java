package com.guvi.web;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.guvi.dto.input.ExpenseDto;
import com.guvi.service.ExpenseService;

@RestController
@CrossOrigin(origins= {"http://localhost:5173"})
@RequestMapping("/api/expense")
public class ExpenseController {

    @Autowired
    private ExpenseService expenseService;

    // ================= ADD EXPENSE =================
    @PostMapping(path = "/add", produces = "application/json")
    public ResponseEntity<?> addExpense(
            @RequestParam String username,
            @RequestBody ExpenseDto dto) {

        expenseService.addExpense(username, dto);

        return new ResponseEntity<>(
                "Expense added successfully",
                HttpStatus.OK
        );
    }

    // ================= GET ALL EXPENSES =================
    @GetMapping(path = "/get/{username}", produces = "application/json")
    public ResponseEntity<?> getAllExpenses(
            @PathVariable String username) {

        return new ResponseEntity<>(
                expenseService.getAllExpenses(username),
                HttpStatus.OK
        );
    }

    // ================= DELETE EXPENSE =================
    @DeleteMapping(path = "/delete/{expenseId}")
    public ResponseEntity<Void> deleteExpense(
            @RequestParam String username,
            @PathVariable Long expenseId) {

        expenseService.deleteExpense(username, expenseId);

        return ResponseEntity.noContent().build();
    }

    // ================= CURRENT MONTH SUMMARY =================
    @GetMapping(path = "/summary/current-month", produces = "application/json")
    public ResponseEntity<?> getCurrentMonthSummary(
            @RequestParam String username) {

        return new ResponseEntity<>(
                expenseService.getExpensesThisMonth(username),
                HttpStatus.OK
        );
    }

    // ================= SELECTED MONTH SUMMARY =================
    @GetMapping(path = "/summary/{year}/{month}", produces = "application/json")
    public ResponseEntity<?> getSelectedMonthSummary(
            @RequestParam String username,
            @PathVariable int year,
            @PathVariable int month) {

        return new ResponseEntity<>(
                expenseService.getExpensesForMonth(username, year, month),
                HttpStatus.OK
        );
    }

    @GetMapping(path="/yearly/summary/{username}",produces="application/json")
    public ResponseEntity<?> getYearlySummary(@PathVariable String username){
        return new ResponseEntity<>(
                expenseService.getYearlySummary(username),HttpStatus.OK);

    }
}