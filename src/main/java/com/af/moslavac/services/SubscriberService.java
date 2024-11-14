package com.af.moslavac.services;

import com.af.moslavac.entities.Subscriber;
import com.af.moslavac.repositories.SubscriberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.mail.MailSenderAutoConfiguration;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class SubscriberService {
    @Autowired
    private SubscriberRepository subscriberRepository;

    @Autowired
    private JavaMailSender mailSender;

    public Subscriber addSubscriber(String email) {
        if (!subscriberRepository.existsByEmail(email)) {
            Subscriber subscriber = new Subscriber();
            subscriber.setEmail(email);
            return subscriberRepository.save(subscriber);
        }
        throw new IllegalArgumentException("Subscriber with email already exists.");
    }

    public List<Subscriber> getAllSubscribers() {
        return subscriberRepository.findAll();
    }

    public void sendNewsletter(String subject, String content) {
        List<Subscriber> subscribers = getAllSubscribers();
        for (Subscriber subscriber : subscribers) {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(subscriber.getEmail());
            message.setSubject(subject);
            message.setText(content);
            mailSender.send(message);
        }
    }
}

