package com.example.DigitalBillingSystem.repository;

import com.example.DigitalBillingSystem.entity.Invoice;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InvoiceRepository extends JpaRepository<Invoice, Integer> {
}
