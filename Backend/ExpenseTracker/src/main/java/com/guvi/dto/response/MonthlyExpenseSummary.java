package com.guvi.dto.response;

import java.util.List;
import java.util.Map;

import com.fasterxml.jackson.annotation.JsonPropertyOrder;

@JsonPropertyOrder({"totalSpend", "categoryWiseSpend"})
public class MonthlyExpenseSummary {

    private Double totalSpend;
    private Map<String, Double> categoryWiseSpend;

    public Double getTotalSpend() {
        return totalSpend;
    }

    public void setTotalSpend(Double totalSpend) {
        this.totalSpend = totalSpend;
    }

    public Map<String, Double> getCategoryWiseSpend() {
        return categoryWiseSpend;
    }

    public void setCategoryWiseSpend(Map<String, Double> categoryWiseSpend) {
        this.categoryWiseSpend = categoryWiseSpend;
    }

    // getters & setters
}