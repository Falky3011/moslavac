package com.af.moslavac.controllers;

import com.af.moslavac.entities.Subscriber;
import com.af.moslavac.services.SubscriberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/newsletter")
@CrossOrigin(origins = "http://localhost:5173")
public class SubscriberController {
    @Autowired
    private SubscriberService subscriberService;

    @PostMapping("/subscribe")
    public Subscriber subscribe(@RequestParam String email) {
        return subscriberService.addSubscriber(email);
    }

    @PostMapping("/send")
    public String sendNewsletter(@RequestParam String subject, @RequestParam String content) {
        subscriberService.sendNewsletter(subject, content);
        return "Newsletter sent to all subscribers.";
    }
}

