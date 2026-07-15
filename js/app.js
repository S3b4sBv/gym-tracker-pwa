// ===== RUTINA: datos de todos los ejercicios por sesión =====
const ROUTINE = {
  UPPER: [
    { name: "Press de banca plano", series: 4, reps: "6-10", musculos: ["Pecho"] },
    { name: "Press inclinado mancuernas", series: 3, reps: "8-12", musculos: ["Pecho"] },
    { name: "Remo con barra", series: 4, reps: "6-10", musculos: ["Espalda"] },
    { name: "Remo 1 mano mancuerna", series: 3, reps: "8-12", musculos: ["Espalda"] },
    { name: "Curl con barra Z", series: 3, reps: "8-12", musculos: ["Bíceps"] },
    { name: "Extensión de tríceps", series: 3, reps: "8-12", musculos: ["Tríceps"] },
  ],
  LOWER: [
    { name: "Sentadilla con barra", series: 4, reps: "6-10", musculos: ["Cuádriceps", "Glúteos"] },
    { name: "Peso muerto rumano", series: 4, reps: "8-12", musculos: ["Isquiotibiales", "Glúteos"] },
    { name: "Zancadas mancuernas", series: 3, reps: "10/pierna", musculos: ["Cuádriceps", "Glúteos"] },
    { name: "Hip thrust con barra", series: 3, reps: "10-12", musculos: ["Glúteos"] },
    { name: "Elevaciones de pantorrillas", series: 4, reps: "15-20", musculos: ["Pantorrillas"] },
  ],
  PUSH: [
    { name: "Press de banca", series: 4, reps: "8-12", musculos: ["Pecho"] },
    { name: "Press inclinado", series: 3, reps: "8-12", musculos: ["Pecho"] },
    { name: "Press militar", series: 4, reps: "8-12", musculos: ["Hombros"] },
    { name: "Elevaciones laterales", series: 3, reps: "12-15", musculos: ["Hombros"] },
    { name: "Extensión francesa Z", series: 3, reps: "10-12", musculos: ["Tríceps"] },
  ],
  PULL: [
    { name: "Remo con barra", series: 4, reps: "8-12", musculos: ["Espalda"] },
    { name: "Peso muerto rumano ligero", series: 3, reps: "10", musculos: ["Isquiotibiales", "Espalda"] },
    { name: "Remo con mancuerna", series: 3, reps: "10-12", musculos: ["Espalda"] },
    { name: "Curl con barra Z", series: 4, reps: "8-12", musculos: ["Bíceps"] },
    { name: "Curl martillo", series: 3, reps: "10-12", musculos: ["Bíceps"] },
  ],
  LEGS: [
    { name: "Sentadilla", series: 4, reps: "8-12", musculos: ["Cuádriceps", "Glúteos"] },
    { name: "Sentadilla búlgara", series: 3, reps: "10/pierna", musculos: ["Cuádriceps", "Glúteos"] },
    { name: "Peso muerto rumano", series: 3, reps: "8-12", musculos: ["Isquiotibiales", "Glúteos"] },
    { name: "Hip thrust", series: 3, reps: "10-12", musculos: ["Glúteos"] },
    { name: "Elevaciones de pantorrillas", series: 4, reps: "15-20", musculos: ["Pantorrillas"] },
    { name: "Crunches", series: 3, reps: "15-20", musculos: ["Abdomen"] },
    { name: "Elevaciones de piernas", series: 3, reps: "12-15", musculos: ["Abdomen"] },
    { name: "Plancha", series: 3, reps: "30-60s", musculos: ["Abdomen"] },
  ]
};


document.addEventListener('DOMContentLoaded', () => {

  // ============================================
  // NAVEGACIÓN ENTRE PANTALLAS
  // ============================================
  const navButtons = document.querySelectorAll('.nav-btn');
  const screens = document.querySelectorAll('.screen');

  navButtons.forEach(button => {
    button.addEventListener('click', () => {

      const targetScreen = button.dataset.screen;

      screens.forEach(screen => screen.classList.remove('active'));
      document.getElementById('screen-' + targetScreen).classList.add('active');

      navButtons.forEach(btn => btn.classList.remove('active'));

      if (targetScreen === 'home') {
        renderHome();
      }

      if (targetScreen === 'history') {
        renderHistory();
      }

      if (targetScreen === 'progress') {
        renderProgress();
      }

      if (targetScreen === 'tools') {
        renderMedidas();
      }

      button.classList.add('active');
    });
  });


  // ============================================
  // REGISTRAR: generar ejercicios según la sesión elegida
  // ============================================
  const selectSesion = document.getElementById('reg-sesion');
  const exercisesContainer = document.getElementById('reg-exercises-container');

  function renderExercises() {
    const sesion = selectSesion.value;
    const exercises = ROUTINE[sesion];

    exercisesContainer.innerHTML = '';

    exercises.forEach((exercise, exIndex) => {

      let seriesHTML = '';
      for (let s = 0; s < exercise.series; s++) {
        seriesHTML += `
          <div class="serie-box">
            <div class="serie-title">SERIE ${s + 1}</div>
            <div class="serie-inputs">
              <div>
                <label>Kg</label>
                <input type="number" class="input-kg" data-ex="${exIndex}" data-serie="${s}" placeholder="0" step="0.5" min="0">
              </div>
              <div>
                <label>Reps</label>
                <input type="number" class="input-reps" data-ex="${exIndex}" data-serie="${s}" placeholder="0" min="0">
              </div>
            </div>
          </div>
        `;
      }

      const exerciseHTML = `
        <div class="exercise-card">
          <div class="exercise-name">${exercise.name}</div>
          <div class="exercise-meta">${exercise.series} series × ${exercise.reps} reps</div>
          ${seriesHTML}
        </div>
      `;

      exercisesContainer.innerHTML += exerciseHTML;
    });
  }

  function detectarSesionDeHoy() {
    const diaSemana = new Date().getDay();

    const mapaDias = {
      1: 'UPPER',
      2: 'LOWER',
      3: 'PUSH',
      4: 'PULL',
      5: 'LEGS',
    };

    return mapaDias[diaSemana] || 'UPPER';
  }

  selectSesion.value = detectarSesionDeHoy();
  selectSesion.addEventListener('change', renderExercises);
  renderExercises();

  document.getElementById('reg-fecha').value = new Date().toISOString().split('T')[0];

    // Guardamos la hora de inicio cuando el usuario entra a Registrar
  let horaInicioSesion = null;

  // Cada vez que se genera/regenera el formulario, marcamos la hora de inicio
  function marcarHoraInicio() {
    horaInicioSesion = new Date();
  }

  // Marcamos al cargar por primera vez
  marcarHoraInicio();

  // Y también cada vez que cambia la sesión (nuevo entrenamiento)
  selectSesion.addEventListener('change', marcarHoraInicio);


  // ============================================
  // DETECCIÓN DE RÉCORDS
  // ============================================
  function calcularRecordsActuales() {
    const records = {};

    sesionesCache.forEach((sesion) => {
      sesion.exercises.forEach((ex) => {
        let maxKg = 0;
        ex.series.forEach((serie) => {
          const kg = parseFloat(serie.kg) || 0;
          if (kg > maxKg) maxKg = kg;
        });

        if (maxKg > 0) {
          if (!records[ex.name] || maxKg > records[ex.name]) {
            records[ex.name] = maxKg;
          }
        }
      });
    });

    return records;
  }

  function detectarNuevosRecords(sessionData, recordsActuales) {
    const nuevosRecords = [];

    sessionData.exercises.forEach((ex) => {
      let maxKgEnEstaSesion = 0;
      ex.series.forEach((serie) => {
        const kg = parseFloat(serie.kg) || 0;
        if (kg > maxKgEnEstaSesion) maxKgEnEstaSesion = kg;
      });

      if (maxKgEnEstaSesion === 0) return;

      const recordAnterior = recordsActuales[ex.name] || 0;

      if (maxKgEnEstaSesion > recordAnterior) {
        nuevosRecords.push({
          nombre: ex.name,
          pesoNuevo: maxKgEnEstaSesion,
          pesoAnterior: recordAnterior
        });
      }
    });

    return nuevosRecords;
  }


  // ============================================
  // GUARDAR SESIÓN
  // ============================================
  const btnSave = document.getElementById('btn-save-session');

  btnSave.addEventListener('click', () => {
    const sesion = selectSesion.value;
    const fecha = document.getElementById('reg-fecha').value;
    const exercises = ROUTINE[sesion];

    const sessionData = {
      fecha: fecha,
      sesion: sesion,
      exercises: exercises.map((exercise, exIndex) => {

        const seriesData = [];
        for (let s = 0; s < exercise.series; s++) {
          const kgInput = document.querySelector(`.input-kg[data-ex="${exIndex}"][data-serie="${s}"]`);
          const repsInput = document.querySelector(`.input-reps[data-ex="${exIndex}"][data-serie="${s}"]`);

          seriesData.push({
            kg: kgInput.value,
            reps: repsInput.value
          });
        }

        return {
          name: exercise.name,
          series: seriesData
        };
      })
    };

    const recordsActuales = calcularRecordsActuales();
    const nuevosRecords = detectarNuevosRecords(sessionData, recordsActuales);

    guardarSesion(sessionData)
      .then(() => {
        if (nuevosRecords.length > 0) {
          const mensajeRecords = nuevosRecords.map(r =>
            `🏆 Nuevo récord: ${r.nombre} ${r.pesoNuevo} kg` +
            (r.pesoAnterior > 0 ? ` (antes ${r.pesoAnterior} kg)` : ' (¡primera vez!)')
          ).join('\n');

          alert('¡Sesión guardada!\n\n' + mensajeRecords);
        } else {
          alert('¡Sesión guardada!');
        }

        renderExercises();
      })
      .catch((error) => {
        console.error(error);
        alert('Error al guardar: ' + error.message);
      });

      const horaFin = new Date();
    const duracionMinutos = horaInicioSesion
      ? Math.round((horaFin - horaInicioSesion) / 60000)
      : null;

    const sessionData = {
      fecha: fecha,
      sesion: sesion,
      duracionMinutos: duracionMinutos,
      horaInicio: horaInicioSesion ? horaInicioSesion.toTimeString().slice(0, 5) : null,
      horaFin: horaFin.toTimeString().slice(0, 5),
      exercises: exercises.map((exercise, exIndex) => {

        const seriesData = [];
        for (let s = 0; s < exercise.series; s++) {
          const kgInput = document.querySelector(`.input-kg[data-ex="${exIndex}"][data-serie="${s}"]`);
          const repsInput = document.querySelector(`.input-reps[data-ex="${exIndex}"][data-serie="${s}"]`);

          seriesData.push({
            kg: kgInput.value,
            reps: repsInput.value
          });
        }

        return {
          name: exercise.name,
          series: seriesData
        };
      })
    };

  });


  // ============================================
  // HISTORIAL
  // ============================================
  const histList = document.getElementById('hist-list');
  const modalOverlay = document.getElementById('modal-overlay');
  const modalBody = document.getElementById('modal-body');
  const btnCloseModal = document.getElementById('btn-close-modal');

  let sesionesCache = [];

  function renderHistory() {
    histList.innerHTML = '<p style="color:#666; text-align:center; padding:20px 0;">Cargando...</p>';

    obtenerSesiones().then((sesiones) => {
      sesionesCache = sesiones;

      if (sesiones.length === 0) {
        histList.innerHTML = '<p style="color:#666; text-align:center; padding:20px 0;">Sin sesiones aún</p>';
        return;
      }

      histList.innerHTML = '';

      sesiones.forEach((sesion) => {
        let volumenTotal = 0;
        let totalSeries = 0;

        sesion.exercises.forEach((ex) => {
          ex.series.forEach((serie) => {
            const kg = parseFloat(serie.kg) || 0;
            const reps = parseInt(serie.reps) || 0;
            if (kg > 0) totalSeries++;
            volumenTotal += kg * reps;
          });
        });

        const badgeClass = 'badge-' + sesion.sesion.toLowerCase();

        const cardHTML = `
          <div class="history-card" data-id="${sesion.id}">
            <div class="history-card-header">
              <span class="badge ${badgeClass}">${sesion.sesion}</span>
              <span class="history-card-date">${sesion.fecha}</span>
            </div>
            <div class="row" style="border-bottom:none; padding:4px 0;">
              <span style="font-size:12px; color:var(--text2);">${sesion.exercises.length} ejercicios · ${totalSeries} series</span>
              <span style="font-size:12px; color:var(--accent2); font-weight:500;">${Math.round(volumenTotal)} kg vol.</span>
            </div>
          </div>
        `;

        histList.innerHTML += cardHTML;
      });

      document.querySelectorAll('.history-card').forEach((card) => {
        card.addEventListener('click', () => {
          const id = card.dataset.id;
          const sesion = sesionesCache.find(s => s.id === id);
          mostrarDetalleSesion(sesion);
        });
      });

      // ===== MÚSCULOS MÁS ENTRENADOS (últimos 7 días) =====
      const hace7Dias = new Date();
      hace7Dias.setDate(hace7Dias.getDate() - 7);
      const fechaLimite = hace7Dias.toISOString().split('T')[0];

      // Mapa de nombre de ejercicio → músculos
      const mapaMusculosEjercicio = {};
      Object.values(ROUTINE).flat().forEach(ex => {
        mapaMusculosEjercicio[ex.name] = ex.musculos || [];
      });

      // Contamos series por músculo en los últimos 7 días
      const seriesPorMusculo = {};

      sesiones
        .filter(s => s.fecha >= fechaLimite)
        .forEach(sesion => {
          sesion.exercises.forEach(ex => {
            const musculos = mapaMusculosEjercicio[ex.name] || [];
            const seriesHechas = ex.series.filter(s => parseFloat(s.kg) > 0).length;

            musculos.forEach(musculo => {
              seriesPorMusculo[musculo] = (seriesPorMusculo[musculo] || 0) + seriesHechas;
            });
          });
        });

      const homeMusculosEl = document.getElementById('home-musculos');

      if (Object.keys(seriesPorMusculo).length === 0) {
        homeMusculosEl.innerHTML = '<p style="color:#666; font-size:12px;">Sin entrenamientos en los últimos 7 días</p>';
      } else {
        // Ordenamos de mayor a menor
        const musculosOrdenados = Object.entries(seriesPorMusculo)
          .sort((a, b) => b[1] - a[1]);

        const maxSeries = musculosOrdenados[0][1];

        homeMusculosEl.innerHTML = musculosOrdenados.map(([musculo, series]) => {
          const porcentaje = Math.round((series / maxSeries) * 100);
          return `
            <div class="muscle-row">
              <span class="muscle-name">${musculo}</span>
              <div class="muscle-bar-container">
                <div class="muscle-bar" style="width:${porcentaje}%"></div>
              </div>
              <span class="muscle-series">${series} series</span>
            </div>
          `;
        }).join('');
      }
    });
  }

  function mostrarDetalleSesion(sesion) {
    const badgeClass = 'badge-' + sesion.sesion.toLowerCase();

    let exercisesHTML = '';
    sesion.exercises.forEach((ex) => {
      let seriesHTML = '';
      ex.series.forEach((serie, i) => {
        if (serie.kg) {
          seriesHTML += `
            <div class="detail-serie">
              <span>Serie ${i + 1}:</span>
              <span class="kg">${serie.kg} kg</span>
              <span>× ${serie.reps || '?'} reps</span>
            </div>
          `;
        }
      });

      if (seriesHTML) {
        exercisesHTML += `
          <div class="detail-exercise">
            <div class="detail-exercise-name">${ex.name}</div>
            ${seriesHTML}
          </div>
        `;
      }
    });

    modalBody.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
        <span class="badge ${badgeClass}" style="font-size:13px;">${sesion.sesion}</span>
        <span style="color:var(--text2); font-size:13px;">${sesion.fecha}</span>
      </div>
      ${exercisesHTML}
    `;

    modalOverlay.classList.add('open');
  }

  btnCloseModal.addEventListener('click', () => {
    modalOverlay.classList.remove('open');
  });

  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
      modalOverlay.classList.remove('open');
    }
  });


  // ============================================
  // PROGRESO
  // ============================================
  const progSelect = document.getElementById('prog-select');
  const progStats = document.getElementById('prog-stats');
  const progEmpty = document.getElementById('prog-empty');
  const progMax = document.getElementById('prog-max');
  const progSessions = document.getElementById('prog-sessions');
  const progGain = document.getElementById('prog-gain');
  const progChartCanvas = document.getElementById('prog-chart');

  let chartInstance = null;

  function renderProgress() {
    if (sesionesCache.length === 0) {
      obtenerSesiones().then((sesiones) => {
        sesionesCache = sesiones;
        prepararSelectorEjercicios();
      });
    } else {
      prepararSelectorEjercicios();
    }
  }

  function prepararSelectorEjercicios() {
    const nombresSet = new Set();
    sesionesCache.forEach((sesion) => {
      sesion.exercises.forEach((ex) => nombresSet.add(ex.name));
    });

    const nombres = Array.from(nombresSet).sort();

    if (nombres.length === 0) {
      progSelect.innerHTML = '';
      progStats.style.display = 'none';
      progChartCanvas.style.display = 'none';
      progEmpty.style.display = 'block';
      return;
    }

    progEmpty.style.display = 'none';
    progChartCanvas.style.display = 'block';

    const seleccionPrevia = progSelect.value;

    progSelect.innerHTML = nombres.map(n => `<option value="${n}">${n}</option>`).join('');

    if (nombres.includes(seleccionPrevia)) {
      progSelect.value = seleccionPrevia;
    }

    actualizarGrafica();
  }

  function actualizarGrafica() {
    const ejercicioSeleccionado = progSelect.value;

    const puntos = [];

    sesionesCache.forEach((sesion) => {
      const ex = sesion.exercises.find(e => e.name === ejercicioSeleccionado);
      if (!ex) return;

      let maxKg = 0;
      ex.series.forEach((serie) => {
        const kg = parseFloat(serie.kg) || 0;
        if (kg > maxKg) maxKg = kg;
      });

      if (maxKg > 0) {
        puntos.push({ fecha: sesion.fecha, maxKg });
      }
    });

    puntos.sort((a, b) => a.fecha.localeCompare(b.fecha));

    if (puntos.length === 0) {
      progStats.style.display = 'none';
      if (chartInstance) chartInstance.destroy();
      return;
    }

    progStats.style.display = 'block';

    const pesos = puntos.map(p => p.maxKg);
    const maximo = Math.max(...pesos);
    const ganancia = puntos[puntos.length - 1].maxKg - puntos[0].maxKg;

    progMax.textContent = maximo + ' kg';
    progSessions.textContent = puntos.length;
    progGain.textContent = (ganancia >= 0 ? '+' : '') + ganancia.toFixed(1) + ' kg';

    if (chartInstance) chartInstance.destroy();

    chartInstance = new Chart(progChartCanvas, {
      type: 'line',
      data: {
        labels: puntos.map(p => p.fecha),
        datasets: [{
          label: 'Peso máx (kg)',
          data: puntos.map(p => p.maxKg),
          borderColor: '#e94560',
          backgroundColor: 'rgba(233, 69, 96, 0.15)',
          tension: 0.3,
          fill: true,
          pointBackgroundColor: '#e94560',
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: false }
        },
        scales: {
          x: {
            ticks: { color: '#aaaaaa', font: { size: 10 } },
            grid: { color: '#333333' }
          },
          y: {
            ticks: { color: '#aaaaaa' },
            grid: { color: '#333333' }
          }
        }
      }
    });
  }

  progSelect.addEventListener('change', actualizarGrafica);


  // ============================================
  // TEMPORIZADOR DE DESCANSO
  // ============================================
  const timerDisplay = document.getElementById('timer-display');
  const timerCard = document.getElementById('timer-card');
  const timerButtons = document.querySelectorAll('.timer-btn');
  const btnTimerPause = document.getElementById('btn-timer-pause');
  const btnTimerReset = document.getElementById('btn-timer-reset');

  let timerInterval = null;
  let segundosRestantes = 0;
  let segundosTotal = 0;
  let timerPausado = false;

  function formatearTiempo(segundos) {
    const min = Math.floor(segundos / 60);
    const seg = segundos % 60;
    return String(min).padStart(2, '0') + ':' + String(seg).padStart(2, '0');
  }

  function iniciarTimer(segundos) {
    detenerTimer();

    segundosTotal = segundos;
    segundosRestantes = segundos;
    timerPausado = false;

    timerDisplay.textContent = formatearTiempo(segundosRestantes);
    timerCard.classList.remove('timer-finished');

    btnTimerPause.style.display = 'block';
    btnTimerPause.textContent = 'Pausar';
    btnTimerReset.style.display = 'block';

    timerButtons.forEach(b => b.classList.remove('active-timer'));
    const botonActivo = document.querySelector(`.timer-btn[data-seconds="${segundos}"]`);
    if (botonActivo) botonActivo.classList.add('active-timer');

    timerInterval = setInterval(() => {
      segundosRestantes--;
      timerDisplay.textContent = formatearTiempo(segundosRestantes);

      if (segundosRestantes <= 0) {
        finalizarTimer();
      }
    }, 1000);
  }

  function finalizarTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
    timerCard.classList.add('timer-finished');
    timerDisplay.textContent = '¡Listo!';

    btnTimerPause.style.display = 'none';

    if ('vibrate' in navigator) {
      navigator.vibrate([300, 100, 300]);
    }

    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification('Gym Tracker', { body: '¡Descanso terminado! 💪' });
    }

    reproducirBeep();
  }

  function reproducirBeep() {
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioCtx.destination);

      oscillator.frequency.value = 880;
      gainNode.gain.value = 0.3;

      oscillator.start();
      oscillator.stop(audioCtx.currentTime + 0.4);
    } catch (e) {
      console.log('No se pudo reproducir el sonido:', e);
    }
  }

  function pausarReanudarTimer() {
    if (timerPausado) {
      timerInterval = setInterval(() => {
        segundosRestantes--;
        timerDisplay.textContent = formatearTiempo(segundosRestantes);

        if (segundosRestantes <= 0) {
          finalizarTimer();
        }
      }, 1000);
      btnTimerPause.textContent = 'Pausar';
      timerPausado = false;
    } else {
      clearInterval(timerInterval);
      btnTimerPause.textContent = 'Reanudar';
      timerPausado = true;
    }
  }

  function detenerTimer() {
    if (timerInterval) {
      clearInterval(timerInterval);
      timerInterval = null;
    }
    timerPausado = false;
  }

  function reiniciarTimer() {
    detenerTimer();
    timerDisplay.textContent = '00:00';
    timerCard.classList.remove('timer-finished');
    btnTimerPause.style.display = 'none';
    btnTimerReset.style.display = 'none';
    timerButtons.forEach(b => b.classList.remove('active-timer'));
  }

  timerButtons.forEach((boton) => {
    boton.addEventListener('click', () => {
      const segundos = parseInt(boton.dataset.seconds);
      iniciarTimer(segundos);
    });
  });

  btnTimerPause.addEventListener('click', pausarReanudarTimer);
  btnTimerReset.addEventListener('click', reiniciarTimer);

  if ('Notification' in window && Notification.permission === 'default') {
    Notification.requestPermission();
  }


  // ============================================
  // HERRAMIENTAS: CALCULADORA DE PROGRESIÓN
  // ============================================
  const btnCalcProgresion = document.getElementById('btn-calc-progresion');
  const calcResultado = document.getElementById('calc-resultado');

  btnCalcProgresion.addEventListener('click', () => {
    const pesoActual = parseFloat(document.getElementById('calc-peso').value) || 0;
    const incremento = parseFloat(document.getElementById('calc-inc').value) || 0;
    const seriesObjetivo = parseInt(document.getElementById('calc-series-obj').value) || 0;
    const repsObjetivo = parseInt(document.getElementById('calc-reps-obj').value) || 0;
    const repsLogradas = parseInt(document.getElementById('calc-reps-min').value) || 0;

    if (pesoActual === 0) {
      calcResultado.innerHTML = '<div class="calc-result"><div class="calc-result-title">Ingresa el peso actual</div></div>';
      return;
    }

    const puedeSubir = repsLogradas >= repsObjetivo;

    if (puedeSubir) {
      const nuevoPeso = pesoActual + incremento;
      calcResultado.innerHTML = `
        <div class="calc-result success">
          <div class="calc-result-title">✅ ¡Sube de peso!</div>
          <div class="calc-result-detail">
            Completaste ${seriesObjetivo}×${repsObjetivo} con buena técnica.<br>
            Próxima sesión: <strong style="color:var(--accent3);">${nuevoPeso} kg</strong>
          </div>
        </div>
      `;
    } else {
      calcResultado.innerHTML = `
        <div class="calc-result warning">
          <div class="calc-result-title">⏳ Mantén el mismo peso</div>
          <div class="calc-result-detail">
            Aún no llegas a ${repsObjetivo} reps en todas las series.<br>
            Sigue con <strong style="color:var(--accent2);">${pesoActual} kg</strong> hasta lograrlo.
          </div>
        </div>
      `;
    }
  });


  // ============================================
  // HERRAMIENTAS: CALCULADORA DE CALENTAMIENTO
  // ============================================
  const warmPeso = document.getElementById('warm-peso');
  const warmBarra = document.getElementById('warm-barra');
  const warmResultado = document.getElementById('warm-resultado');

  function calcularCalentamiento() {
    const pesoTrabajo = parseFloat(warmPeso.value) || 0;
    const pesoBarra = parseFloat(warmBarra.value) || 20;

    if (pesoTrabajo === 0) {
      warmResultado.innerHTML = '';
      return;
    }

    const redondear = (n) => Math.round(n / 2.5) * 2.5;

    const series = [
      { porcentaje: 40, reps: '8-10' },
      { porcentaje: 60, reps: '5' },
      { porcentaje: 80, reps: '3' },
      { porcentaje: 100, reps: 'Serie de trabajo' },
    ];

    let html = '';
    series.forEach((s) => {
      let peso = redondear(pesoTrabajo * (s.porcentaje / 100));
      if (peso < pesoBarra) peso = pesoBarra;

      html += `
        <div class="row" style="border-bottom:none; padding:4px 0;">
          <span style="font-size:12px; color:var(--text2);">${s.porcentaje}% — ${s.reps}</span>
          <span style="font-size:13px; color:var(--accent2); font-weight:500;">${peso} kg</span>
        </div>
      `;
    });

    warmResultado.innerHTML = html;
  }

  warmPeso.addEventListener('input', calcularCalentamiento);
  warmBarra.addEventListener('input', calcularCalentamiento);


  // ============================================
  // HERRAMIENTAS: GUÍA RPE
  // ============================================
  const rpeGuide = document.getElementById('rpe-guide');

  const rpeData = [
    { numero: 10, desc: 'Esfuerzo máximo, no podrías hacer ni 1 rep más' },
    { numero: 9, desc: 'Podrías hacer 1 rep más' },
    { numero: 8, desc: 'Podrías hacer 2 reps más' },
    { numero: 7, desc: 'Podrías hacer 3 reps más' },
    { numero: 6, desc: 'Esfuerzo moderado, te sientes cómodo' },
  ];

  rpeGuide.innerHTML = rpeData.map(r => `
    <div class="rpe-row">
      <span class="rpe-number">${r.numero}</span>
      <span class="rpe-desc">${r.desc}</span>
    </div>
  `).join('');


  // ============================================
  // HERRAMIENTAS: MEDIDAS CORPORALES
  // ============================================
  const btnSaveMedida = document.getElementById('btn-save-medida');
  const medHistorial = document.getElementById('med-historial');

  document.getElementById('med-fecha').value = new Date().toISOString().split('T')[0];

  btnSaveMedida.addEventListener('click', () => {
    const medidaData = {
      fecha: document.getElementById('med-fecha').value,
      peso: parseFloat(document.getElementById('med-peso').value) || null,
      cintura: parseFloat(document.getElementById('med-cintura').value) || null,
      pecho: parseFloat(document.getElementById('med-pecho').value) || null,
      brazo: parseFloat(document.getElementById('med-brazo').value) || null,
    };

    guardarMedida(medidaData)
      .then(() => {
        alert('¡Medidas guardadas!');
        renderMedidas();
      })
      .catch((error) => {
        console.error(error);
        alert('Error al guardar: ' + error.message);
      });
  });

  function renderMedidas() {
    obtenerMedidas().then((medidas) => {
      if (medidas.length === 0) {
        medHistorial.innerHTML = '<p style="color:#666; font-size:12px;">Sin medidas registradas</p>';
        return;
      }

      medHistorial.innerHTML = medidas.slice(0, 5).map(m => `
        <div class="medida-row">
          <span>${m.fecha}</span>
          <span class="peso">${m.peso ? m.peso + ' kg' : '-'}</span>
        </div>
      `).join('');
    });
  }


  // ============================================
  // INICIO
  // ============================================
  const statSesiones = document.getElementById('stat-sesiones');
  const statSemanas = document.getElementById('stat-semanas');
  const homeLastSession = document.getElementById('home-last-session');
  const homeRecords = document.getElementById('home-records');
  const homeGreeting = document.getElementById('home-greeting');

  function renderHome() {
    const hora = new Date().getHours();
    let saludo = 'Hola';
    if (hora < 12) saludo = 'Buenos días';
    else if (hora < 19) saludo = 'Buenas tardes';
    else saludo = 'Buenas noches';
    homeGreeting.textContent = saludo + ' 💪';

    // ===== PRÓXIMA SESIÓN =====
    const hoy = new Date().getDay();
    const proximaSesion = {
      1: { sesion: 'UPPER', dia: 'Lunes' },
      2: { sesion: 'LOWER', dia: 'Martes' },
      3: { sesion: 'PUSH',  dia: 'Miércoles' },
      4: { sesion: 'PULL',  dia: 'Jueves' },
      5: { sesion: 'LEGS',  dia: 'Viernes' },
    };

    let proximoDia = null;
    for (let i = 0; i <= 7; i++) {
      const dia = ((hoy + i - 1) % 7) + 1;
      if (proximaSesion[dia]) {
        proximoDia = proximaSesion[dia];
        break;
      }
    }

    const homeNextSession = document.getElementById('home-next-session');
    if (proximoDia) {
      const badgeClass = 'badge-' + proximoDia.sesion.toLowerCase();
      const esHoy = proximaSesion[hoy] && proximaSesion[hoy].sesion === proximoDia.sesion;
      homeNextSession.innerHTML = `
        <div style="display:flex; align-items:center; gap:10px; padding:4px 0;">
          <span class="badge ${badgeClass}">${proximoDia.sesion}</span>
          <span style="font-size:13px;">${proximoDia.dia}</span>
          ${esHoy ? '<span style="font-size:11px; color:var(--accent3); font-weight:500;">← HOY</span>' : ''}
        </div>
      `;
    }

    // ===== PESO CORPORAL =====
    obtenerMedidas().then((medidas) => {
      const statPesoCorporal = document.getElementById('stat-peso-corporal');
      if (medidas.length > 0 && medidas[0].peso) {
        statPesoCorporal.textContent = medidas[0].peso + ' kg';
      } else {
        statPesoCorporal.textContent = '-';
      }
    });

    // ===== SESIONES + RACHA + ÚLTIMA SESIÓN + RÉCORDS =====
    obtenerSesiones().then((sesiones) => {
      sesionesCache = sesiones;

      statSesiones.textContent = sesiones.length;

      if (sesiones.length === 0) {
        statSemanas.textContent = '0';
        document.getElementById('stat-racha').textContent = '0';
        homeLastSession.innerHTML = '<p style="color:#666;">Sin sesiones aún</p>';
        homeRecords.innerHTML = '<p style="color:#666;">Sin récords aún</p>';
        return;
      }

      // ===== SEMANAS ACTIVO =====
      const semanasSet = new Set();
      sesiones.forEach((sesion) => {
        const semana = obtenerAnioSemana(sesion.fecha);
        semanasSet.add(semana);
      });
      statSemanas.textContent = semanasSet.size;

      // ===== DURACIÓN =====
      const sesionesConDuracion = sesiones.filter(s => s.duracionMinutos);
      const statDuracionUltima = document.getElementById('stat-duracion-ultima');
      const statDuracionPromedio = document.getElementById('stat-duracion-promedio');

      if (sesionesConDuracion.length > 0) {
        // Última sesión con duración registrada
        const ultimaConDuracion = sesionesConDuracion[0];
        statDuracionUltima.textContent = ultimaConDuracion.duracionMinutos + ' min';

        // Promedio de todas las sesiones con duración
        const totalMinutos = sesionesConDuracion.reduce((acc, s) => acc + s.duracionMinutos, 0);
        const promedio = Math.round(totalMinutos / sesionesConDuracion.length);
        statDuracionPromedio.textContent = promedio + ' min';
      } else {
        statDuracionUltima.textContent = '-';
        statDuracionPromedio.textContent = '-';
      }

      // ===== RACHA DE DÍAS CONSECUTIVOS =====
      const fechasUnicas = [...new Set(sesiones.map(s => s.fecha))].sort().reverse();

      let racha = 0;
      let fechaEsperada = new Date();
      fechaEsperada.setHours(0, 0, 0, 0);

      for (const fechaStr of fechasUnicas) {
        const fechaSesion = new Date(fechaStr + 'T00:00:00');
        const diffDias = Math.round((fechaEsperada - fechaSesion) / (1000 * 60 * 60 * 24));

        if (diffDias === 0 || diffDias === 1) {
          racha++;
          fechaEsperada = fechaSesion;
        } else {
          break;
        }
      }

      document.getElementById('stat-racha').textContent = racha;

      // ===== ÚLTIMA SESIÓN =====
      const ultima = sesiones[0];
      let volumenTotal = 0;
      let totalSeries = 0;

      ultima.exercises.forEach((ex) => {
        ex.series.forEach((serie) => {
          const kg = parseFloat(serie.kg) || 0;
          const reps = parseInt(serie.reps) || 0;
          if (kg > 0) totalSeries++;
          volumenTotal += kg * reps;
        });
      });

      const badgeClass = 'badge-' + ultima.sesion.toLowerCase();

      const duracionTexto = ultima.duracionMinutos
        ? `${ultima.duracionMinutos} min`
        : '-';

      const horariosTexto = (ultima.horaInicio && ultima.horaFin)
        ? `${ultima.horaInicio} → ${ultima.horaFin}`
        : '';

      homeLastSession.innerHTML = `
        <div class="row" style="border-bottom:none; padding:4px 0;">
          <span class="badge ${badgeClass}">${ultima.sesion}</span>
          <span style="font-size:12px; color:var(--text2);">${ultima.fecha}</span>
        </div>
        <div class="row" style="border-bottom:none; padding:4px 0;">
          <span style="font-size:12px; color:var(--text2);">${ultima.exercises.length} ejercicios · ${totalSeries} series</span>
          <span style="font-size:12px; color:var(--accent2); font-weight:500;">${Math.round(volumenTotal)} kg vol.</span>
        </div>
        <div class="row" style="border-bottom:none; padding:4px 0;">
          <span style="font-size:12px; color:var(--text2);">${horariosTexto}</span>
          <span style="font-size:12px; color:var(--accent); font-weight:500;">⏱️ ${duracionTexto}</span>
        </div>
      `;

      // ===== RÉCORDS PERSONALES =====
      const records = {};

      sesiones.forEach((sesion) => {
        sesion.exercises.forEach((ex) => {
          let maxKg = 0;
          ex.series.forEach((serie) => {
            const kg = parseFloat(serie.kg) || 0;
            if (kg > maxKg) maxKg = kg;
          });

          if (maxKg > 0) {
            if (!records[ex.name] || maxKg > records[ex.name]) {
              records[ex.name] = maxKg;
            }
          }
        });
      });

      const recordsArray = Object.entries(records)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5);

      if (recordsArray.length === 0) {
        homeRecords.innerHTML = '<p style="color:#666;">Sin récords aún</p>';
      } else {
        homeRecords.innerHTML = recordsArray.map(([nombre, kg]) => `
          <div class="row">
            <span style="font-size:12px;">${nombre}</span>
            <span style="font-size:13px; color:var(--accent2); font-weight:500;">${kg} kg</span>
          </div>
        `).join('');
      }
    });
  }

  function obtenerAnioSemana(fechaStr) {
    const fecha = new Date(fechaStr + 'T00:00:00');
    const inicioAnio = new Date(fecha.getFullYear(), 0, 1);
    const dias = Math.floor((fecha - inicioAnio) / (24 * 60 * 60 * 1000));
    const semana = Math.ceil((dias + inicioAnio.getDay() + 1) / 7);
    return fecha.getFullYear() + '-W' + semana;
  }

  window.renderHome = renderHome;

});


// ===== REGISTRAR SERVICE WORKER (para PWA) =====
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./service-worker.js')
    .then(() => console.log('Service Worker registrado'))
    .catch((error) => console.error('Error registrando Service Worker:', error));
}