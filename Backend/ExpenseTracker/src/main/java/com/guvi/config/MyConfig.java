package com.guvi.config;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.jdbc.core.JdbcTemplate;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.jdbc.JdbcDaoImpl;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import io.swagger.v3.oas.annotations.enums.SecuritySchemeIn;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeType;
import io.swagger.v3.oas.annotations.security.SecurityScheme;

@Configuration
@SecurityScheme(

        name = "BearerAuth", // Name for your security scheme

        type = SecuritySchemeType.HTTP,

        bearerFormat = "JWT",

        scheme = "bearer",

        in = SecuritySchemeIn.HEADER

)
public class MyConfig {

    /*@Bean
    public UserDetailsService userDetailsService(){

        UserDetails ramesh = User.builder()
                .username("ramesh")
                .password(passwordEncoder().encode("password"))
                .roles("USER")
                .build();

        UserDetails admin = User.builder()
                .username("admin")
                .password(passwordEncoder().encode("admin"))
                .roles("ADMIN")
                .build();

        return new InMemoryUserDetailsManager(ramesh, admin);
    }*/

    /*
    @Bean
    public DataSource dataSource() {

        DriverManagerDataSource dataSource = new DriverManagerDataSource();

        dataSource.setUrl("jdbc:postgresql://localhost:5432/ugf16db");

        dataSource.setUsername("postgres");

        dataSource.setPassword("1234");

        dataSource.setDriverClassName("org.postgresql.Driver");

        return dataSource;
    }
    */

    @Autowired
    private DataSource dataSource;

    @Bean
    public JdbcTemplate jdbcTemplate() {

        return new JdbcTemplate(dataSource);

    }

    @Bean
    public UserDetailsService userDetailsService() {

        JdbcDaoImpl obj = new org.springframework.security.core.userdetails.jdbc.JdbcDaoImpl();

        obj.setJdbcTemplate(new JdbcTemplate(dataSource));

        return obj;

    }

    /*
     * Password encoder bean (uses BCrypt hashing)
     * Critical for secure password storage
     */
    @Bean
    public PasswordEncoder passwordEncoder() {

        return new BCryptPasswordEncoder();

    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration builder) throws Exception {

        return builder.getAuthenticationManager();

    }

}