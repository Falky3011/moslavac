importScripts("https://www.gstatic.com/firebasejs/9.17.1/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/9.17.1/firebase-messaging-compat.js");


const firebaseConfig = {
    apiKey: "AIzaSyC8g2Z8VdVPxXffDUNMIY6-r2hLmWSR-YE",
    authDomain: "moslavac-9d4c8.firebaseapp.com",
    projectId: "moslavac-9d4c8",
    storageBucket: "moslavac-9d4c8.firebasestorage.app",
    messagingSenderId: "150038206448",
    appId: "1:150038206448:web:5fb794aa744f69bf0d2f35",
    measurementId: "G-9VGHLHQFC2"
};
firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
    console.log("Received background message: ", payload);
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
        icon: payload.notification.icon,
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
});
