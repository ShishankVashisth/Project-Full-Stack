package com.example.DigitalBillingSystem.entity;

import jakarta.persistence.*;
import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
public class InvoiceItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private int quantity;
    private double price;
    private double gst;
    private double total;

    // Relationship with Product
    @ManyToOne
    @JoinColumn(name = "product_id")
    private Product product;

    // Relationship with Invoice
    @ManyToOne
    @JoinColumn(name = "invoice_id")
    @JsonBackReference
    private Invoice invoice;

    // Getters and Setters

    public int getId() { return id; }
    public void setId(int id) { this.id = id; }

    public int getQuantity() { return quantity; }
    public void setQuantity(int quantity) { this.quantity = quantity; }

    public double getPrice() { return price; }
    public void setPrice(double price) { this.price = price; }

    public double getGst() { return gst; }
    public void setGst(double gst) { this.gst = gst; }

    public double getTotal() { return total; }
    public void setTotal(double total) { this.total = total; }

    public Product getProduct() { return product; }
    public void setProduct(Product product) { this.product = product; }

    public Invoice getInvoice() { return invoice; }
    public void setInvoice(Invoice invoice) { this.invoice = invoice; }
}
