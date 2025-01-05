package com.af.moslavac.services;

import com.af.moslavac.dtos.NotificationRequest;
import com.google.firebase.messaging.FirebaseMessaging;
import com.google.firebase.messaging.Message;
import org.springframework.stereotype.Service;

@Service
public class NotificationService {

    public void sendNotification(NotificationRequest notification) {
        Message.Builder messageBuilder = Message.builder()
                .putData("title", notification.getTitle())
                .putData("body", notification.getBody())
                .setToken(notification.getToken());

        // Ako je URL slike dostupan, dodajte ga
        if (notification.getIcon() != null) {
            messageBuilder.putData("icon", notification.getIcon());
        }

        Message message = messageBuilder.build();

        try {
            FirebaseMessaging.getInstance().send(message);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}