<script setup>
defineProps({
  variant: {
    type: String,
    default: 'custody',
    validator: (v) => ['custody', 'sovereign'].includes(v),
  },
});

const steps = [
  { n: '01', t: 'Capturar com estabilidade', d: 'Pipeline CameraX/Camera2. Foco, exposição e balanço de branco travados por código.' },
  { n: '02', t: 'Travar parâmetros', d: 'Quando o hardware não suporta trava automática, ícone de cadeado libera o disparo manualmente.' },
  { n: '03', t: 'Validar nitidez', d: 'Métrica computacional (variância, contraste, borda) decide quando a captura está pronta.' },
  { n: '04', t: 'Registrar localmente', d: 'Hash criptográfico e timestamp gerados no dispositivo, mesmo offline.' },
  { n: '05', t: 'Empilhar frames', d: 'Burst curto sob parâmetros travados. Stacking reduz ruído e aumenta nitidez efetiva.' },
  { n: '06', t: 'Gerar derivado', d: 'Imagem final preserva metadados e hashes dos frames de origem em corrente matemática.' },
  { n: '07', t: 'Preservar originais', d: 'Frames originais nunca são apagados. Permanecem como base da custódia técnica.' },
  { n: '08', t: 'Sincronizar depois', d: 'Hub ATLAS recebe registros quando há conexão, sem quebrar a cadeia de custódia.' },
];

const fields = [
  'Hash das imagens de origem',
  'Hash da imagem derivada final',
  'Timestamp da captura',
  'Parâmetros de captura (foco, ISO, exposição, WB)',
  'Identificação do dispositivo',
  'Versão do app',
  'Identificação do operador',
];
</script>

<template>
  <section class="section tech-custody-section">
    <div class="container">
      <div class="section-header" v-reveal>
        <span class="section-label">Protocolo Técnico LABMOB</span>
        <h2 v-if="variant === 'sovereign'" class="section-title">
          Operação Offline-first com Cadeia de Custódia Auditável
        </h2>
        <h2 v-else class="section-title">
          Cadeia de Custódia Matemática
        </h2>
        <p class="section-subtitle">
          Cada evidência é vinculada matematicamente aos seus frames originais. Stacking não-destrutivo
          como núcleo. Stitching como função secundária de visualização.
        </p>
      </div>

      <ol class="tech-steps">
        <li v-for="(step, idx) in steps" :key="step.n" class="tech-step" v-reveal="{ delay: idx * 90 }">
          <span class="tech-step-number">{{ step.n }}</span>
          <div class="tech-step-body">
            <h3>{{ step.t }}</h3>
            <p>{{ step.d }}</p>
          </div>
        </li>
      </ol>

      <div class="tech-custody-grid">
        <div class="tech-custody-card" v-reveal:left>
          <h3>Registro de cada captura</h3>
          <p>Cada evento é assinado localmente com os seguintes campos auditáveis:</p>
          <ul class="app-list">
            <li v-for="f in fields" :key="f">{{ f }}</li>
          </ul>
        </div>
        <div class="tech-custody-card tech-custody-card--accent" v-reveal:right="{ delay: 140 }">
          <h3>Princípio de não-destruição</h3>
          <p>
            A imagem derivada serve como produto analítico, mas os <strong>frames originais permanecem
            intactos</strong>. Se a derivada for questionada, é possível demonstrar matematicamente
            que ela vem exatamente do conjunto original capturado em campo.
          </p>
          <p>
            <strong>Stacking</strong> é o processo principal de melhoria de imagem.
            <strong>Stitching</strong> opera apenas como função secundária — não é o núcleo da
            proposta pericial.
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
