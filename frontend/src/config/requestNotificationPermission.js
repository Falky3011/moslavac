import { messaging } from "./firebaseConfig";
import { getToken } from "firebase/messaging";

export const requestNotificationPermission = async () => {
  try {
    // Registracija servisnog radnika
    const registration = await navigator.serviceWorker.register(
      "/firebase-messaging-sw.js"
    );

    // Zatraži dozvolu za notifikacije
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      // Dohvati token
      const token = await getToken(messaging, {
        vapidKey:
          "BKVKwZRCWn0Vc-I5iWVbdcyz7ehFV8eqPf1ZAUDC-kUwqV61x-Qs5pgG4PDV15BYXKZK3Q1Y18RvQQSdzjChqwE", // Zamijeni pravim VAPID ključem
        serviceWorkerRegistration: registration,
      });
      if (token) {
        return token;
      } else {
        console.error(
          "No registration token available. Request permission to generate one."
        );
      }
    } else {
      console.error("Notification permission not granted");
    }
  } catch (error) {
    console.error("Error getting notification token:", error);
  }
};
