package com.example.backend.config;

import com.example.backend.entity.Product;
import com.example.backend.entity.ProductCatgeory;
import jakarta.persistence.EntityManager;
import jakarta.persistence.metamodel.EntityType;
import lombok.AllArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.http.HttpMethod;
import org.springframework.web.servlet.config.annotation.CorsRegistry;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Configuration
@AllArgsConstructor
public class MyDataRestConfig implements RepositoryRestConfigurer {

    private EntityManager entityManager;


    @Override
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config, CorsRegistry cors) {
        RepositoryRestConfigurer.super.configureRepositoryRestConfiguration(config, cors);
        HttpMethod[] theUnsupportedAction={HttpMethod.PUT, HttpMethod.DELETE,HttpMethod.POST, HttpMethod.PATCH};

        config.getExposureConfiguration()
                .forDomainType(Product.class)
                .withItemExposure((metdata, httpMethods) -> httpMethods.disable(theUnsupportedAction))
                .withCollectionExposure((metdata, httpMethods) -> httpMethods.disable(theUnsupportedAction));

        config.getExposureConfiguration()
                .forDomainType(ProductCatgeory.class)
                .withItemExposure((metdata, httpMethods) -> httpMethods.disable(theUnsupportedAction))
                .withCollectionExposure((metdata, httpMethods) -> httpMethods.disable(theUnsupportedAction));

        exposeIds(config);
    }
    private void exposeIds(RepositoryRestConfiguration config){
        Set<EntityType<?>> entityTypes=entityManager.getMetamodel().getEntities();
        List<Class> entityClasses=new ArrayList<>();

        for(EntityType tempEntityType : entityTypes){
            entityClasses.add(tempEntityType.getJavaType());
        }
        Class[] domainType=entityClasses.toArray(new Class[0]);
        config.exposeIdsFor(domainType);
    }
}
