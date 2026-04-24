package com.example.DigitalBillingSystem.dto;

public class InvoiceItemDTO {

    private int productId;
    private String productName;
    private int quantity;
    private double price;
    private double gst;
    private double total;

    // Getters & Setters
    public int getProductId() { return productId; }
    public void setProductId(int productId) { this.productId = productId; }

    public String getProductName() { return productName; }
    public void setProductName(String productName) { this.productName = productName; }

    public int getQuantity() { return quantity; }
    public void setQuantity(int quantity) { this.quantity = quantity; }

    public double getPrice() { return price; }
    public void setPrice(double price) { this.price = price; }

    public double getGst() { return gst; }
    public void setGst(double gst) { this.gst = gst; }

    public double getTotal() { return total; }
    public void setTotal(double total) { this.total = total; }
}
