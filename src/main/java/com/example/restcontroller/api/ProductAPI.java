package com.example.restcontroller.api;

import com.example.restcontroller.jpa.Product;
import com.example.restcontroller.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.xml.ws.Response;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("api/v1/products")
@RequiredArgsConstructor
public class ProductAPI {
    private final ProductService productService;

    @GetMapping
    public ResponseEntity<List<Product>> findAll () {
        return ResponseEntity.ok(productService.fillAllProduct());
    }

    @PostMapping
    private ResponseEntity createProduct (@Valid @RequestBody Product product) {
        return ResponseEntity.ok(productService.saveProduct(product));
    }

    @GetMapping("/id")
    public ResponseEntity<Product> findById (@PathVariable Integer id) {
        Optional<Product> product = productService.findById(id);
        if ( !product.isPresent() ) {
            ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok(product.get());
    }

    @DeleteMapping
    public ResponseEntity deleteProduct (@PathVariable Integer id) {
        Optional<Product> product = productService.findById(id);
        if ( !product.isPresent() ) {
            ResponseEntity.badRequest().build();
        }
        productService.deleteProductById(id);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/id")
    public ResponseEntity<Product> findById (@PathVariable Integer id, @Valid @RequestBody Product pro) {
        Optional<Product> product = productService.findById(id);
        if ( !product.isPresent() ) {
            ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok(productService.saveProduct(pro));
    }

}
