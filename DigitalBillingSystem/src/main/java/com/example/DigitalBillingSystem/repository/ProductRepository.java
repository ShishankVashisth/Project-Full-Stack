package com.example.DigitalBillingSystem.repository;

import com.example.DigitalBillingSystem.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Integer> {

    // Custom search (important for your project)
    Product findByName(String name);
    List<Product> findByNameContainingIgnoreCase(String name);
}
