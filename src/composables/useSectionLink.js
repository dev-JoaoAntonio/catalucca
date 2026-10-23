import { useRoute, useRouter } from 'vue-router';
import { scrollToTarget } from '@/composables/useLenis';

// Avisa as seções que reagem a âncoras próprias (ex.: abas de Soluções).
export const SECTION_EVENT = 'catalucca:section';

// Navega até uma seção da landing. Em qualquer URL da landing rola direto
// (mesmo quando o hash já está na URL); fora dela, volta para a home e o
// scrollBehavior assume.
export function useSectionLink() {
  const route = useRoute();
  const router = useRouter();

  return (hash) => {
    if (!route.meta.landing) return router.push({ path: '/', hash });
    window.dispatchEvent(new CustomEvent(SECTION_EVENT, { detail: hash }));
    if (route.hash === hash) return scrollToTarget(hash);
    return router.replace({ hash });
  };
}
