package com.guvi.web;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.guvi.dto.response.AccountResponseDto;
import com.guvi.service.AccountService;

@RestController
@CrossOrigin(origins= {"http://localhost:5173"})
@RequestMapping("/api/account")
public class AccountController {

    @Autowired
    private AccountService accountService;

    // ================== GET ACCOUNT ==================

    @GetMapping(path = "/get/{userName}", produces = "application/json")
    public ResponseEntity<AccountResponseDto> getAccount(@PathVariable String userName) {
        return new ResponseEntity<>(
                accountService.getAccountDtoByUserName(userName),
                HttpStatus.OK
        );
    }

    // ================== DELETE ACCOUNT ==================

    @DeleteMapping(path = "/delete/{username}", produces = "application/json")
    public ResponseEntity<String> deleteAccount(@PathVariable String username) {
        accountService.deleteAccountByUsername(username);
        return new ResponseEntity<>(
                "Account deleted successfully",
                HttpStatus.NO_CONTENT
        );
    }


    // ================== GET ALL ACCOUNTS ==================
    @GetMapping(path = "/getAll", produces = "application/json")
    public ResponseEntity<?> getAllAccounts() {
        return new ResponseEntity<>(accountService.getAllAccounts(),HttpStatus.OK);
    }


    @PutMapping(path = "/update/{username}", produces = "application/json")
    public ResponseEntity<AccountResponseDto> updateAccount(
            @PathVariable String username,
            @RequestBody AccountResponseDto dto) {

        AccountResponseDto updated =
                accountService.updateAccountByUserName(username, dto);
        
        

        return new ResponseEntity<>(updated, HttpStatus.OK);
    }

}