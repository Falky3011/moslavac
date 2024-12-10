package com.af.moslavac.services;

import com.af.moslavac.dtos.NotificationRequest;
import com.google.firebase.messaging.FirebaseMessaging;
import com.google.firebase.messaging.Message;
import org.springframework.stereotype.Service;

@Service
public class NotificationService {

    public void sendNotification(NotificationRequest notification) {
        Message message = Message.builder()
                .putData("title", notification.getTitle())
                .putData("body", notification.getBody())
                .setToken(notification.getToken())
                .build();

        try {
            String response = FirebaseMessaging.getInstance().send(message);
            System.out.println("Successfully sent message: " + response);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
