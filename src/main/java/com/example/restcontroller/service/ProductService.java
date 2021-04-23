package com.example.restcontroller.service;

import com.example.restcontroller.jpa.Product;
import com.example.restcontroller.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ProductService {
    private final ProductRepository productRepository;


    public List<Product> fillAllProduct () {
        return productRepository.findAll();
    }

    public Product saveProduct (Product product) {
        return productRepository.save(product);
    }

    public Optional<Product> findById (Integer id) {
        return productRepository.findById(id);
    }

    public void deleteProductById (int id) {
        productRepository.deleteById(id);
    }


}
