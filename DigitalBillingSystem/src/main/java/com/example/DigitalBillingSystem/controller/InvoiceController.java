package com.example.DigitalBillingSystem.controller;

import com.example.DigitalBillingSystem.dto.InvoiceDTO;
import com.example.DigitalBillingSystem.entity.Invoice;
import com.example.DigitalBillingSystem.service.InvoiceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/invoices")
@CrossOrigin(origins = "http://localhost:5173")
public class InvoiceController {

    @Autowired
    private InvoiceService invoiceService;

    // Create Invoice (bill)
    @PostMapping
    public InvoiceDTO createInvoice(@RequestBody Invoice invoice) {
        return invoiceService.createInvoice(invoice);
    }
    @GetMapping
    public List<Invoice> getAllInvoices() {
        return invoiceService.getAllInvoices();
    }
}