// ===== CONFIGURACIÓN DE FIREBASE =====
const firebaseConfig = {
  apiKey: "AIzaSyCK0BBg8IG6iVhJrJHWuZcWqUBU9tywDPI",
  authDomain: "gym-tracker-sebas.firebaseapp.com",
  projectId: "gym-tracker-sebas",
  storageBucket: "gym-tracker-sebas.firebasestorage.app",
  messagingSenderId: "82181441696",
  appId: "1:82181441696:web:f6a8b48a43dfc73d3261c5"
};

// Inicializamos Firebase
firebase.initializeApp(firebaseConfig);

// Exportamos las referencias que vamos a usar en toda la app
const db = firebase.firestore();
const auth = firebase.auth();