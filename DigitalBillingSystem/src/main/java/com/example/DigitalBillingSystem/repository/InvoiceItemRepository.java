package com.example.DigitalBillingSystem.repository;

import com.example.DigitalBillingSystem.entity.InvoiceItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InvoiceItemRepository extends JpaRepository<InvoiceItem, Integer> {

}
