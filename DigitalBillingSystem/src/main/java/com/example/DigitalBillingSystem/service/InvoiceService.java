package com.example.DigitalBillingSystem.service;

import com.example.DigitalBillingSystem.dto.InvoiceDTO;
import com.example.DigitalBillingSystem.dto.InvoiceItemDTO;
import com.example.DigitalBillingSystem.entity.*;
import com.example.DigitalBillingSystem.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
public class InvoiceService {

    @Autowired
    private InvoiceRepository invoiceRepository;

    @Autowired
    private ProductRepository productRepository;

    public InvoiceDTO createInvoice(Invoice invoice) {

        double grandTotal = 0;

        // Set current date
        invoice.setDate(LocalDate.now());

        List<InvoiceItem> items = invoice.getItems();

        for (InvoiceItem item : items) {

            Product product = productRepository.findById(
                    item.getProduct().getId()
            ).orElse(null);

            if (product == null) {
                throw new RuntimeException("Product not found");
            }

            // Set price from DB (avoid tampering)
            item.setPrice(product.getPrice());

            // GST calculation
            double gstAmount = (product.getPrice() * item.getQuantity() * product.getGstPercent()) / 100;

            double total = (product.getPrice() * item.getQuantity()) + gstAmount;

            item.setGst(gstAmount);
            item.setTotal(total);

            // Link item with invoice
            item.setInvoice(invoice);

            // Reduce stock
            product.setStockQuantity(
                    product.getStockQuantity() - item.getQuantity()
            );
            productRepository.save(product);

            grandTotal += total;
        }

        invoice.setTotalAmount(grandTotal);

        Invoice savedInvoice = invoiceRepository.save(invoice);
        return convertToDTO(savedInvoice);

    }
    private InvoiceDTO convertToDTO(Invoice invoice) {

        InvoiceDTO dto = new InvoiceDTO();
        dto.setInvoiceId(invoice.getId());
        dto.setBuyerName(invoice.getBuyerName());
        dto.setBuyerGst(invoice.getBuyerGst());
        dto.setTotalAmount(invoice.getTotalAmount());

        List<InvoiceItemDTO> itemDTOList = new ArrayList<>();

        for (InvoiceItem item : invoice.getItems()) {
            InvoiceItemDTO itemDTO = new InvoiceItemDTO();

            itemDTO.setProductId(item.getProduct().getId());
            itemDTO.setProductName(item.getProduct().getName());
            itemDTO.setQuantity(item.getQuantity());
            itemDTO.setPrice(item.getPrice());
            itemDTO.setGst(item.getGst());
            itemDTO.setTotal(item.getTotal());

            itemDTOList.add(itemDTO);
        }

        dto.setItems(itemDTOList);

        return dto;
    }
    public List<Invoice> getAllInvoices() {
        return invoiceRepository.findAll();
    }
}