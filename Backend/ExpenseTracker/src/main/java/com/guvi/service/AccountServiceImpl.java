package com.guvi.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.guvi.dto.input.RegisterDto;
import com.guvi.dto.response.AccountResponseDto;
import com.guvi.entity.Account;
import com.guvi.entity.Role;
import com.guvi.entity.RolePK;
import com.guvi.entity.User;
import com.guvi.repository.AccountRepository;
import com.guvi.repository.ExpenseRepository;
import com.guvi.repository.RoleRepository;
import com.guvi.repository.UserRepository;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class AccountServiceImpl implements AccountService {

    @Autowired
    private AccountRepository accountRepo;

    @Autowired
    private UserRepository userRepo;

    @Autowired
    private RoleRepository roleRepo;

    @Autowired
    private ExpenseRepository expenseRepo;

    @Autowired
    private PasswordEncoder passwordEncoder;

    // -------------------- GET --------------------
    @Override
    public Account getAccount(Long accountId) {
        Optional<Account> opt = accountRepo.findById(accountId);

        if (opt.isEmpty()) {
            throw new RuntimeException("Account not found for id " + accountId);
        }

        return opt.get();
    }

    // -------------------- REGISTER --------------------
    @Override
    public boolean register(RegisterDto dto) {

        // check account already exists
        if (accountRepo.existsByEmail(dto.getEmail())
                || accountRepo.existsByPhone(dto.getPhone())) {
            throw new RuntimeException("Duplicate values");
        }

        // create user
        User user = new User();
        user.setUsername(dto.getUsername());
        user.setPassword(passwordEncoder.encode(dto.getPassword()));
        user.setEnabled(Boolean.TRUE);
        userRepo.save(user);

        // create role
        Role role = new Role();
        RolePK key = new RolePK();

        key.setUserName(dto.getUsername());
        key.setRoleName("ROLE_" + dto.getRole().toUpperCase());

        role.setKey(key);
        roleRepo.save(role);

        // create account
        Account account = new Account();
        account.setName(dto.getName());
        account.setEmail(dto.getEmail());
        account.setPhone(dto.getPhone());
        account.setUsername(dto.getUsername());

        accountRepo.save(account);

        return true;
    }

    // -------------------- DELETE --------------------
    @Override
    public boolean deleteAccount(Long accountId) {

        Optional<Account> opt = accountRepo.findById(accountId);

        if (opt.isEmpty()) {
            throw new RuntimeException("Account not found for id " + accountId);
        }

        Account account = opt.get();
        String username = account.getUsername();

        roleRepo.deleteByKeyUserName(username);
        accountRepo.deleteById(accountId);
        userRepo.deleteById(username);

        return true;
    }

    @Override
    public List<Account> getAllAccounts() {
        return accountRepo.findAll();
    }

    @Override
    public Account getAccountByUserName(String userName) {
        Optional<Account> opt = accountRepo.findByUsername(userName);
        if (opt.isEmpty())
            throw new RuntimeException("Account not found");
        return opt.get();
    }

    @Override
    public AccountResponseDto getAccountDtoByUserName(String username) {

        Account account = accountRepo.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Account not found"));

        List<Role> roles = roleRepo.findByKeyUserName(username);

        String roleName = null;
        if (!roles.isEmpty()) {
            roleName = roles.get(0).getKey().getRoleName();
        }

        return new AccountResponseDto(
                account.getAccountId(),
                account.getUsername(),
                account.getName(),
                account.getEmail(),
                account.getPhone(),
                roleName
        );
    }

    @Override
    @Transactional
    public boolean deleteAccountByUsername(String username) {

        Account account = accountRepo.findByUsername(username)
                .orElseThrow(() -> new RuntimeException(
                        "Account not found for username: " + username));

        Long accountId = account.getAccountId();

        expenseRepo.deleteByAccountAccountId(accountId);
        roleRepo.deleteByKeyUserName(username);
        userRepo.deleteByUsername(username);
        accountRepo.deleteByUsername(username);

        return true;
    }

    @Override
    @Transactional
    public AccountResponseDto updateAccountByUserName(String username, AccountResponseDto dto) {

        Account account = accountRepo.findByUsername(username)
                .orElseThrow(() -> new RuntimeException(
                        "Account not found for username: " + username));

        account.setName(dto.getName());
        account.setEmail(dto.getEmail());
        account.setPhone(dto.getPhone());

        accountRepo.save(account);

        return new AccountResponseDto(
                account.getAccountId(),
                account.getUsername(),
                account.getName(),
                account.getEmail(),
                account.getPhone(),
                dto.getRole()
        );   
    }
}