package com.example.backend.service;

import com.example.backend.dto.Purchase;
import com.example.backend.dto.PurchaseResponse;

public interface CheckoutService {

    PurchaseResponse placeOrder(Purchase purchase);
}
