import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyC8g2Z8VdVPxXffDUNMIY6-r2hLmWSR-YE",
    authDomain: "moslavac-9d4c8.firebaseapp.com",
    projectId: "moslavac-9d4c8",
    storageBucket: "moslavac-9d4c8.firebasestorage.app",
    messagingSenderId: "150038206448",
    appId: "1:150038206448:web:5fb794aa744f69bf0d2f35",
    measurementId: "G-9VGHLHQFC2"
};

const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app);

export const generateToken = async () => {
    try {
        const permission = await Notification.requestPermission();
        if (permission === 'granted') {
            const token = await getToken(messaging, {
                vapidKey: 'BKVKwZRCWn0Vc-I5iWVbdcyz7ehFV8eqPf1ZAUDC-kUwqV61x-Qs5pgG4PDV15BYXKZK3Q1Y18RvQQSdzjChqwE',
            });
            return token || null; // Vraća token ili `null` ako nije dostupan
        } else {
            console.error('Permission not granted for notifications');
            return null;
        }
    } catch (error) {
        console.error('Error retrieving Firebase token:', error);
        return null;
    }
};