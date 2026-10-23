<script setup>
import SolutionPanel from './SolutionPanel.vue';
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
    d: 'PIBIC, monografias e TCCs com imagens georreferenciadas e dados rastreáveis.',
  },
  {
    t: 'Stricto sensu',
    d: 'Mestrado e doutorado compatíveis com publicações revisadas por pares.',
  },
  {
    t: 'Extensão e ciência cidadã',
    d: 'Pesquisa distribuída, com instrumentação compartilhada e o Hub ATLAS.',
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
  <SolutionPanel
    title="Educação"
    tagline="Protagonismo digital investigativo. A ciência onde o aluno está."
    :cta-href="cta"
  >
    <template #lead>
      <p class="p-lead anim" style="--k: 2">
        Transformamos o smartphone, de distração passiva, em uma
        <strong>estação científica de alta performance</strong>, em conformidade com a
        Lei nº 15.100/2025.
      </p>
      <div class="anim" style="--k: 3">
        <p class="edu__bncc">
          Uso dirigido, supervisionado e finalístico do smartphone, alinhado às competências gerais
          da BNCC:
        </p>
        <div class="chip-row">
          <span class="chip">Pensamento científico (CG 02)</span>
          <span class="chip">Cultura digital (CG 05)</span>
          <span class="chip">Argumentação (CG 07)</span>
        </div>
      </div>
    </template>

    <template #side>
      <figure>
        <div class="media-card" v-reveal:wipe v-progress="'view'">
          <LazyVideo
            src="/videos/educacao.mp4"
            poster="/images/bg-educacao.jpg"
            label="Sistema Ø—1™ em operação em sala de aula"
          />
        </div>
        <figcaption class="media-caption">
          Sistema Ø—1™ em operação: resolução de 0,7&nbsp;µm (bactérias e células), integração
          nativa com o smartphone e quatro lentes de engenharia óptica.
        </figcaption>
      </figure>
    </template>

    <div class="p-cols rail-mobile anim" style="--k: 5">
      <div class="p-col">
        <h4>Campos de aplicação</h4>
        <dl>
          <div v-for="item in fields" :key="item.t">
            <dt>{{ item.t }}</dt>
            <dd>{{ item.d }}</dd>
          </div>
        </dl>
      </div>
      <div class="p-col">
        <h4>Por que adotar a Catalucca</h4>
        <dl>
          <div v-for="item in reasons" :key="item.t">
            <dt>{{ item.t }}</dt>
            <dd>{{ item.d }}</dd>
          </div>
        </dl>
      </div>
      <div class="p-col">
        <h4>Ensino superior e pesquisa (RUO)</h4>
        <dl>
          <div v-for="item in research" :key="item.t">
            <dt>{{ item.t }}</dt>
            <dd>{{ item.d }}</dd>
          </div>
        </dl>
      </div>
    </div>

    <div class="quotes rail-mobile anim" style="--k: 6">
      <figure v-for="item in testimonials" :key="item.author" class="quote">
        <blockquote>“{{ item.quote }}”</blockquote>
        <figcaption>{{ item.author }}</figcaption>
      </figure>
    </div>
  </SolutionPanel>
</template>

<style scoped>
.edu__bncc {
  margin-bottom: 0.85rem;
  font-size: 0.9375rem;
  color: var(--text);
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
  gap: 1.25rem;
  padding-top: 1.25rem;
  border-top: 1px solid var(--line);
}

.quote blockquote {
  font-size: 0.9375rem;
  line-height: 1.6;
  letter-spacing: -0.01em;
  color: var(--ink);
}

.quote figcaption {
  font-size: 0.8125rem;
  color: var(--muted);
}
</style>
