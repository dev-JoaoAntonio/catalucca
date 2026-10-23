import { useRoute, useRouter } from 'vue-router';
import { scrollToTarget } from '@/composables/useLenis';

// Navega até uma seção da landing. Em qualquer URL da landing rola direto
// (mesmo quando o hash já está na URL); fora dela, volta para a home e o
// scrollBehavior assume.
export function useSectionLink() {
  const route = useRoute();
  const router = useRouter();

  return (hash) => {
    if (!route.meta.landing) return router.push({ path: '/', hash });
    if (route.hash === hash) return scrollToTarget(hash);
    return router.replace({ hash });
  };
}
