<script setup>
import { useSectionLink } from '@/composables/useSectionLink';
import { ADDRESSES, EMAIL, PHONE_DISPLAY, whatsappLink } from '@/data/contact';

const go = useSectionLink();
const currentYear = new Date().getFullYear();

const columns = [
  {
    title: 'Navegação',
    links: [
      { hash: '#sobre', label: 'Quem somos' },
      { hash: '#tecnologia', label: 'Tecnologia' },
      { hash: '#metodo', label: 'Método Ø—1™' },
      { hash: '#haas', label: 'Modelo HaaS' },
      { hash: '#faq', label: 'Perguntas frequentes' },
    ],
  },
  {
    title: 'Soluções',
    links: [
      { hash: '#educacao', label: 'Educação' },
      { hash: '#operacional', label: 'Operacional privado' },
      { hash: '#governo', label: 'Governo' },
      { hash: '#ecossistema', label: 'Ecossistema' },
    ],
  },
];
</script>

<template>
  <footer class="footer">
    <div class="container">
      <div class="footer__top">
        <div class="footer__brand">
          <a href="/#inicio" class="footer__logo" @click.prevent="go('#inicio')">
            <img src="/favicon/logo.png" alt="" width="36" height="36">
            <span>CATALUCCA</span>
          </a>
          <p>
            Infraestrutura científica de borda. Levamos a triagem técnica para onde a decisão
            precisa ser tomada: o campo, a sala de aula e o território.
          </p>
        </div>

        <nav v-for="col in columns" :key="col.title" class="footer__col" :aria-label="col.title">
          <h2 class="footer__heading">{{ col.title }}</h2>
          <ul>
            <li v-for="link in col.links" :key="link.hash">
              <a :href="`/${link.hash}`" @click.prevent="go(link.hash)">{{ link.label }}</a>
            </li>
          </ul>
        </nav>

        <div class="footer__col">
          <h2 class="footer__heading">Contato</h2>
          <ul>
            <li><a :href="`mailto:${EMAIL}`">{{ EMAIL }}</a></li>
            <li><a :href="whatsappLink()" target="_blank" rel="noopener">{{ PHONE_DISPLAY }}</a></li>
          </ul>
          <address class="footer__addresses">
            <p v-for="loc in ADDRESSES" :key="loc.city">
              <span>{{ loc.role }} · {{ loc.city }}</span>
              {{ loc.detail }}
            </p>
          </address>
        </div>
      </div>

      <div class="footer__bottom">
        <p>© {{ currentYear }} CATALUCCA Tecnologias LTDA · CNPJ 61.810.236/0001-88</p>
        <p>Distribuição exclusiva SMO e IIT na América do Sul · Lei nº 9.610/1998 · CUP (Paris)</p>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background: var(--bg);
  color: var(--text);
  font-size: 0.9375rem;
}

.footer__top {
  display: grid;
  grid-template-columns: 1.6fr repeat(3, 1fr);
  gap: clamp(2rem, 5vw, 4rem);
  padding-block: clamp(3rem, 6vw, 4.5rem);
  border-block: 1px solid var(--line);
  border-top-color: var(--ink);
}

.footer__logo {
  display: inline-flex;
  align-items: center;
  gap: 0.65rem;
  margin-bottom: 1.25rem;
  font-weight: 600;
  letter-spacing: 0.16em;
  color: var(--ink);
}

.footer__brand p {
  max-width: 34ch;
}

.footer__heading {
  margin-bottom: 1.1rem;
  font-size: 0.875rem;
  font-weight: 500;
  letter-spacing: 0;
  color: var(--ink);
}

.footer__col ul {
  display: grid;
  gap: 0.6rem;
}

.footer__col a {
  transition: color 0.3s var(--ease);
}

.footer__col a:hover {
  color: var(--muted);
}

.footer__addresses {
  display: grid;
  gap: 0.75rem;
  margin-top: 1.5rem;
  font-style: normal;
  font-size: 0.875rem;
}

.footer__addresses span {
  display: block;
  color: var(--ink);
}

.footer__bottom {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 0.75rem 2rem;
  padding-block: 1.75rem;
  font-size: 0.8125rem;
  color: var(--muted);
}

@media (max-width: 900px) {
  .footer__top {
    grid-template-columns: 1fr 1fr;
  }

  .footer__brand {
    grid-column: 1 / -1;
  }
}

@media (max-width: 520px) {
  .footer__top {
    grid-template-columns: 1fr;
  }
}
</style>
