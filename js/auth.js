// ===== AUTENTICACIÓN =====

document.addEventListener('DOMContentLoaded', () => {

  const emailInput = document.getElementById('login-email');
  const passwordInput = document.getElementById('login-password');
  const errorMsg = document.getElementById('login-error');
  const btnLogin = document.getElementById('btn-login');
  const btnRegister = document.getElementById('btn-register');
  const navbar = document.getElementById('main-navbar');

  // ===== INICIAR SESIÓN =====
  btnLogin.addEventListener('click', () => {
    const email = emailInput.value;
    const password = passwordInput.value;

    errorMsg.textContent = '';

    auth.signInWithEmailAndPassword(email, password)
      .catch((error) => {
        errorMsg.textContent = traducirError(error.code);
      });
  });

  // ===== CREAR CUENTA =====
  btnRegister.addEventListener('click', () => {
    const email = emailInput.value;
    const password = passwordInput.value;

    errorMsg.textContent = '';

    if (password.length < 6) {
      errorMsg.textContent = 'La contraseña debe tener al menos 6 caracteres';
      return;
    }

    auth.createUserWithEmailAndPassword(email, password)
      .catch((error) => {
        errorMsg.textContent = traducirError(error.code);
      });
  });

  // ===== DETECTAR CAMBIOS DE SESIÓN =====
  // Esto se ejecuta automáticamente cuando el usuario inicia sesión o cierra sesión
  auth.onAuthStateChanged((user) => {
    const screenLogin = document.getElementById('screen-login');
    const screenHome = document.getElementById('screen-home');
    const screens = document.querySelectorAll('.screen');
    const navButtons = document.querySelectorAll('.nav-btn');

    if (user) {
      // Usuario logueado: ocultar login, mostrar app
      screens.forEach(s => s.classList.remove('active'));
      screenHome.classList.add('active');
      navbar.style.display = 'flex';

      // Marcar "Inicio" como activo en el navbar
      navButtons.forEach(b => b.classList.remove('active'));
      document.querySelector('.nav-btn[data-screen="home"]').classList.add('active');

      console.log('Usuario logueado:', user.uid);

      // Cargamos las stats de Inicio
      if (typeof window.renderHome === 'function') {
        window.renderHome();
      }

    } else {
      // No hay usuario: mostrar login, ocultar app
      screens.forEach(s => s.classList.remove('active'));
      screenLogin.classList.add('active');
      navbar.style.display = 'none';
    }
  });

  // ===== TRADUCIR ERRORES DE FIREBASE =====
  function traducirError(code) {
    const errores = {
      'auth/invalid-email': 'Correo inválido',
      'auth/user-not-found': 'No existe una cuenta con ese correo',
      'auth/wrong-password': 'Contraseña incorrecta',
      'auth/email-already-in-use': 'Ya existe una cuenta con ese correo',
      'auth/invalid-credential': 'Correo o contraseña incorrectos',
      'auth/weak-password': 'La contraseña debe tener al menos 6 caracteres',
    };
    return errores[code] || 'Error: ' + code;
  }

});