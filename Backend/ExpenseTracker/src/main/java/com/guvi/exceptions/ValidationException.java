package com.guvi.exceptions;

import java.util.List;
import org.springframework.validation.FieldError;

public class ValidationException extends RuntimeException {

    public ValidationException() {
        super();
    }

    public ValidationException(String message) {
        super(message);
    }

    public ValidationException(List<FieldError> errors) {
        super();
        this.errors = errors;
    }

    private List<FieldError> errors;

    public List<FieldError> getErrors() {
        return errors;
    }

    public void setErrors(List<FieldError> errors) {
        this.errors = errors;
    }
}