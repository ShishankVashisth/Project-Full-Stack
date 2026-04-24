package com.example.DigitalBillingSystem.dto;

import java.util.List;

public class InvoiceDTO {

    private int invoiceId;
    private String buyerName;
    private String buyerGst;
    private double totalAmount;
    private List<InvoiceItemDTO> items;

    // Getters & Setters
    public int getInvoiceId() { return invoiceId; }
    public void setInvoiceId(int invoiceId) { this.invoiceId = invoiceId; }

    public String getBuyerName() { return buyerName; }
    public void setBuyerName(String buyerName) { this.buyerName = buyerName; }

    public String getBuyerGst() { return buyerGst; }
    public void setBuyerGst(String buyerGst) { this.buyerGst = buyerGst; }

    public double getTotalAmount() { return totalAmount; }
    public void setTotalAmount(double totalAmount) { this.totalAmount = totalAmount; }

    public List<InvoiceItemDTO> getItems() { return items; }
    public void setItems(List<InvoiceItemDTO> items) { this.items = items; }
}
