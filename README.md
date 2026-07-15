#  Gym Tracker PWA

Aplicación web progresiva (PWA) para el seguimiento de entrenamientos de gimnasio, con rutinas por grupo muscular, gráficos de progreso y detección automática de récords personales.

##  Descripción

Gym Tracker nació como un proyecto personal para reemplazar una hoja de cálculo de Excel donde llevaba mi rutina de entrenamiento. Terminó convirtiéndose en una aplicación web completa con autenticación de usuarios, base de datos en tiempo real y visualización de progreso.

##  Funcionalidades

- **Autenticación de usuarios** con Firebase Authentication
- **Registro de entrenamientos** organizados por rutina (Upper / Lower / Push / Pull / Legs)
- **Gráficos de progreso** de peso levantado por ejercicio, usando Chart.js
- **Detección automática de récords personales (PR)** al registrar un nuevo peso máximo
- **Temporizador de descanso** entre series, con vibración y alerta sonora al finalizar
- **Dashboard** con racha de días entrenados, peso corporal y vista previa de la siguiente sesión
- **Seguimiento de frecuencia por grupo muscular**, para identificar qué músculos necesitan más volumen de entrenamiento

##  Tecnologías utilizadas

- **Frontend**: HTML5, CSS3, JavaScript
- **Backend / Base de datos**: Firebase Authentication + Firestore
- **Visualización de datos**: Chart.js
- **Despliegue**: Netlify

##  Motivación del proyecto

Como practicante de gimnasio con una rutina estructurada, quería una herramienta que no solo registrara mis pesos, sino que me mostrara progreso real a lo largo del tiempo y me avisara automáticamente cuando superaba un récord personal — algo que una hoja de Excel no podía hacer de forma práctica.

##  Cómo ejecutarlo localmente

1. Clona este repositorio:
   ```bash
   git clone https://github.com/S3b4sBv/gym-tracker-pwa.git
   ```
2. Abre la carpeta del proyecto
3. Crea un proyecto en [Firebase Console](https://console.firebase.google.com/) y habilita Authentication y Firestore
4. Reemplaza la configuración de Firebase en el archivo de configuración con las credenciales de tu propio proyecto
5. Abre `index.html` en tu navegador (o sirve la carpeta con una extensión tipo Live Server)

## Estado del proyecto

Proyecto personal en desarrollo activo. Próximas mejoras planeadas:
- Calendario de actividad estilo GitHub (heatmap de días entrenados)

## Autor

**Sebastian Cardenas**
Estudiante de Ingeniería de Sistemas — Universidad Privada del Norte (UPN)
correo personal sc2697002@gmail.com
