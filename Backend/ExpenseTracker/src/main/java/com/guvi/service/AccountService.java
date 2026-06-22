package com.guvi.service;

import java.util.List;
import org.springframework.stereotype.Service;

import com.guvi.dto.input.RegisterDto;
import com.guvi.dto.response.AccountResponseDto;
import com.guvi.entity.Account;

public interface AccountService {

    Account getAccount(Long accountId);

    boolean register(RegisterDto dto);

    boolean deleteAccount(Long accountId);

    boolean deleteAccountByUsername(String username);

    List<Account> getAllAccounts();

    public Account getAccountByUserName(String userName);

    AccountResponseDto getAccountDtoByUserName(String username);

    AccountResponseDto updateAccountByUserName(String username, AccountResponseDto dto);
    
}