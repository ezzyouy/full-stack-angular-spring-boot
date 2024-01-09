package com.example.backend.dao;

import com.example.backend.entity.ProductCatgeory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

@RepositoryRestResource(collectionResourceRel = "productCategory", path = "product-category")
@CrossOrigin(origins = {"http://localhost:4200","http://localhost:64737"})
public interface ProductCategoryRepository extends JpaRepository<ProductCatgeory, Long> {
}
