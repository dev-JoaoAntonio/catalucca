<script setup>
import VerticalBlock from './VerticalBlock.vue';
import LazyVideo from '@/components/ui/LazyVideo.vue';
import { whatsappLink } from '@/data/contact';

const cta = whatsappLink('Olá! Gostaria de conhecer o Sistema Ø—1™ da Catalucca para educação.');

const fields = [
  { t: 'Biologia', d: 'Células, estruturas celulares e microrganismos.' },
  { t: 'Ciência dos materiais', d: 'Microestruturas e cristais.' },
  { t: 'Ciências ambientais', d: 'Microplásticos e ecossistemas.' },
  { t: 'Botânica', d: 'Pólens e tecidos vegetais.' },
];

const reasons = [
  { t: 'Acessibilidade', d: 'Redução drástica de custos em relação aos laboratórios fixos.' },
  { t: 'Mobilidade', d: 'Ciência que cabe em uma maleta.' },
  { t: 'Simbiose', d: 'Valorização dos dispositivos que a escola já tem.' },
  { t: 'Ecossistema', d: 'Workshops e experiências prontas para aplicar.' },
];

const research = [
  {
    t: 'Iniciação científica',
    d: 'PIBIC, monografias e TCCs com imagens georreferenciadas e dados rastreáveis para a banca avaliadora.',
  },
  {
    t: 'Stricto sensu',
    d: 'Mestrado e doutorado com infraestrutura compatível com publicações revisadas por pares e rastreabilidade integral do método.',
  },
  {
    t: 'Extensão e ciência cidadã',
    d: 'Projetos comunitários e pesquisa distribuída, com instrumentação compartilhada e sincronização com o Hub ATLAS.',
  },
];

const testimonials = [
  {
    quote:
      'O DIPLE é uma ferramenta incrível. Mesmo sem experiência prévia, vi um envolvimento total dos alunos. Até os estudantes mais “difíceis” se tornaram investigadores focados.',
    author: 'Professor de ensino médio',
  },
  {
    quote:
      'Usamos a câmera do tablet como uma estação de vídeo externa. As ferramentas são fáceis de usar, e os participantes viram tudo com clareza, mesmo a distância.',
    author: 'Professor de ensino fundamental',
  },
  {
    quote:
      'Um sucesso! Os estudantes viram impressões de células vegetais pela primeira vez. Os professores estão entusiasmados para levar esses microscópios para as suas salas.',
    author: 'Professor universitário, Oregon State University',
  },
];
</script>

<template>
  <VerticalBlock
    id="educacao"
    title="Educação"
    tagline="Protagonismo digital investigativo. A ciência onde o aluno está."
    :cta-href="cta"
  >
    <div class="v-stack">
      <p class="v-lead" v-reveal>
        Transformamos o smartphone, de distração passiva, em uma
        <strong>estação científica de alta performance</strong>, em conformidade com a
        Lei nº 15.100/2025.
      </p>

      <figure>
        <div class="media-card" v-reveal:wipe>
          <LazyVideo
            src="/videos/educacao.mp4"
            poster="/images/bg-educacao.jpg"
            label="Sistema Ø—1™ em operação em sala de aula"
          />
        </div>
        <figcaption class="media-caption" v-reveal="{ delay: 200 }">
          Sistema Ø—1™ em operação: resolução de 0,7&nbsp;µm (bactérias e células), integração nativa
          com o smartphone e quatro lentes de engenharia óptica.
        </figcaption>
      </figure>

      <div v-reveal>
        <h4 class="v-block__title">Lei nº 15.100/2025 e BNCC</h4>
        <p class="v-block__text">
          O Sistema Ø—1™ estabelece o uso dirigido, supervisionado e finalístico do smartphone no
          ambiente escolar, alinhado às competências gerais da BNCC.
        </p>
        <div class="chip-row">
          <span class="chip">Pensamento científico (CG 02)</span>
          <span class="chip">Cultura digital (CG 05)</span>
          <span class="chip">Argumentação (CG 07)</span>
        </div>
      </div>

      <div v-reveal>
        <h4 class="v-block__title">Campos de aplicação</h4>
        <div class="v-grid">
          <div v-for="item in fields" :key="item.t" class="v-item">
            <h5>{{ item.t }}</h5>
            <p>{{ item.d }}</p>
          </div>
        </div>
      </div>

      <div v-reveal>
        <h4 class="v-block__title">Por que adotar a Catalucca</h4>
        <div class="v-grid">
          <div v-for="item in reasons" :key="item.t" class="v-item">
            <h5>{{ item.t }}</h5>
            <p>{{ item.d }}</p>
          </div>
        </div>
      </div>

      <div class="research" v-reveal>
        <h4 class="v-block__title">Ensino superior e pesquisa (RUO)</h4>
        <p class="v-block__text">
          Equipamento classificado como <strong>Research Use Only</strong>: infraestrutura dedicada
          à investigação científica avançada, com cadeia de custódia matemática, dados auditáveis
          para publicação e independência em relação aos laboratórios centralizados.
        </p>
        <ol class="research__list">
          <li v-for="(item, i) in research" :key="item.t">
            <span class="mono">0{{ i + 1 }}</span>
            <div>
              <h5>{{ item.t }}</h5>
              <p>{{ item.d }}</p>
            </div>
          </li>
        </ol>
      </div>

      <div>
        <h4 class="v-block__title" v-reveal>O que dizem os professores</h4>
        <div class="quotes">
          <figure
            v-for="(item, i) in testimonials"
            :key="item.author"
            class="quote"
            v-reveal="{ delay: i * 100 }"
          >
            <blockquote>“{{ item.quote }}”</blockquote>
            <figcaption>{{ item.author }}</figcaption>
          </figure>
        </div>
      </div>
    </div>
  </VerticalBlock>
</template>

<style scoped>
.research {
  padding: clamp(1.5rem, 3vw, 2.25rem);
  border-radius: var(--radius-sm);
  background: var(--bg-soft);
}

.research__list {
  display: grid;
  gap: 1.25rem;
  margin-top: 0.5rem;
}

.research__list li {
  display: grid;
  grid-template-columns: 2.25rem 1fr;
  gap: 0.75rem;
  padding-top: 1.25rem;
  border-top: 1px solid var(--line-strong);
}

.research__list .mono {
  font-size: 0.75rem;
  line-height: 1.9;
  color: var(--muted);
}

.research__list h5 {
  margin-bottom: 0.3rem;
  font-size: 1rem;
}

.research__list p {
  font-size: 0.9375rem;
  color: var(--muted);
}

.quotes {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 2rem;
}

.quote {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--ink);
}

.quote blockquote {
  font-family: var(--font-display);
  font-size: 1.0625rem;
  font-weight: 400;
  line-height: 1.55;
  color: var(--ink);
  letter-spacing: -0.015em;
}

.quote figcaption {
  font-size: 0.8125rem;
  color: var(--muted);
}

@media (max-width: 1100px) {
  .quotes {
    grid-template-columns: 1fr;
  }
}
</style>
