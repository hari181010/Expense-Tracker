package com.guvi.entity;

import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;

@Entity
@Table(name = "authorities")
public class Role {

    @EmbeddedId
    private RolePK key;

    public RolePK getKey() {
        return key;
    }

    public void setKey(RolePK key) {
        this.key = key;
    }
}