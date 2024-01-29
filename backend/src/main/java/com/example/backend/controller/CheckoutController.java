package com.example.backend.controller;

import com.example.backend.dto.PaymentInfo;
import com.example.backend.dto.Purchase;
import com.example.backend.dto.PurchaseResponse;
import com.example.backend.service.CheckoutService;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/checkout")
public class CheckoutController {

    private CheckoutService checkoutService;

    public CheckoutController(CheckoutService checkoutService) {
        this.checkoutService = checkoutService;
    }

    @PostMapping("/purchase")
    public PurchaseResponse placeOrder(@RequestBody Purchase purchase){
        PurchaseResponse purchaseResponse=checkoutService.placeOrder(purchase);

        return  purchaseResponse;
    }

    @PostMapping("/payment_intent")
    public ResponseEntity<String> createPaymentIntent(@RequestBody PaymentInfo paymentInfo) throws StripeException{
        PaymentIntent paymentIntent=checkoutService.createPaymentIntent(paymentInfo);

        String paymentStr=paymentIntent.toJson();

        return  new ResponseEntity<>(paymentStr, HttpStatus.OK);
    }
}
