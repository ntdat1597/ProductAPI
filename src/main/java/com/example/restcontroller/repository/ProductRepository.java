package com.example.restcontroller.repository;

import com.example.restcontroller.jpa.Product;
import org.springframework.data.jpa.repository.JpaRepository;


public interface ProductRepository extends JpaRepository<Product,Integer> {

}
