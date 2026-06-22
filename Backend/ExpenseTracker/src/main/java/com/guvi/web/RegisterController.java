package com.guvi.web;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.guvi.dto.input.RegisterDto;
import com.guvi.dto.response.TokenDto;
import com.guvi.repository.CategoryRepository;
import com.guvi.security.AuthRequest;
import com.guvi.security.JwtService;
import com.guvi.service.AccountService;
import com.guvi.service.ExpenseService;

import jakarta.validation.Valid;

@RestController
@CrossOrigin(origins= {"http://localhost:5173"})

public class RegisterController {

    private final CategoryRepository categoryRepository;

    private final CategoryController categoryController;
    @Autowired
    private AccountService service;

    @Autowired
    private AuthenticationManager authManager;

    @Autowired
    private JwtService jwtService;

    RegisterController(CategoryController categoryController, CategoryRepository categoryRepository) {
        this.categoryController = categoryController;
        this.categoryRepository = categoryRepository;
    }

    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@Valid @RequestBody RegisterDto dto,
            BindingResult br)
    {

        if(service.register(dto)) {
            return new ResponseEntity<>("Employee added Succesfully", HttpStatus.CREATED);
        }
        else {
            throw new  ResponseStatusException(HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/generateToken")
    public TokenDto authenticateAndGetToken(@RequestBody AuthRequest authRequest) {
        System.out.println(authRequest.getUsername());
        Authentication authentication = authManager.authenticate(
            new UsernamePasswordAuthenticationToken(authRequest.getUsername(),
                authRequest.getPassword())
        );
        if (authentication.isAuthenticated()) {
            List<String> roles=authentication.getAuthorities()
                    .stream()
                    .map(GrantedAuthority :: getAuthority)
                    .toList();
            String token=jwtService.generateToken(authRequest.getUsername(),roles);

            TokenDto dto=new TokenDto();
            dto.setToken(token);
            dto.setRoles(roles.toArray(String[]::new));
            dto.setUserName(authRequest.getUsername());
            dto.setAccountName(service.getAccountByUserName(authRequest.getUsername()).getName());
            return dto;
        } else {
            throw new UsernameNotFoundException("Invalid user request!");
        }
    }
}