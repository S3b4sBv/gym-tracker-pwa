// ===== FUNCIONES DE BASE DE DATOS (FIRESTORE) =====

// Guarda una sesión de entrenamiento para el usuario actual
function guardarSesion(sessionData) {
  const user = auth.currentUser;

  if (!user) {
    console.error('No hay usuario logueado');
    return Promise.reject('No hay usuario logueado');
  }

  // Guardamos en: users/{uid}/sesiones/{id automático}
  return db.collection('users')
    .doc(user.uid)
    .collection('sesiones')
    .add(sessionData);
}

// Obtiene todas las sesiones del usuario actual, ordenadas por fecha
function obtenerSesiones() {
  const user = auth.currentUser;

  if (!user) {
    console.error('No hay usuario logueado');
    return Promise.resolve([]);
  }

  return db.collection('users')
    .doc(user.uid)
    .collection('sesiones')
    .orderBy('fecha', 'desc')
    .get()
    .then((querySnapshot) => {
      const sesiones = [];
      querySnapshot.forEach((doc) => {
        sesiones.push({
          id: doc.id,       // el ID que Firestore le asignó al documento
          ...doc.data()     // todos los campos: fecha, sesion, exercises
        });
      });
      return sesiones;
    });
}

// Guarda una medida corporal para el usuario actual
function guardarMedida(medidaData) {
  const user = auth.currentUser;

  if (!user) {
    console.error('No hay usuario logueado');
    return Promise.reject('No hay usuario logueado');
  }

  return db.collection('users')
    .doc(user.uid)
    .collection('medidas')
    .add(medidaData);
}

// Obtiene todas las medidas del usuario actual, ordenadas por fecha
function obtenerMedidas() {
  const user = auth.currentUser;

  if (!user) {
    console.error('No hay usuario logueado');
    return Promise.resolve([]);
  }

  return db.collection('users')
    .doc(user.uid)
    .collection('medidas')
    .orderBy('fecha', 'desc')
    .get()
    .then((querySnapshot) => {
      const medidas = [];
      querySnapshot.forEach((doc) => {
        medidas.push({
          id: doc.id,
          ...doc.data()
        });
      });
      return medidas;
    });
}