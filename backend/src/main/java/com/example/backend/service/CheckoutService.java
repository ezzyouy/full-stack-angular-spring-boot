package com.example.backend.service;

import com.example.backend.dto.PaymentInfo;
import com.example.backend.dto.Purchase;
import com.example.backend.dto.PurchaseResponse;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;

public interface CheckoutService {

    PurchaseResponse placeOrder(Purchase purchase) ;
    PaymentIntent createPaymentIntent(PaymentInfo paymentInfo) throws StripeException;
}
