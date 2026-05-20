import { createCustomer, createSubscription, listSubscriptionPayments } from './_lib/asaas.js';

const PLAN_CATALOG = {
  'educacao.frota.m48': { value: 149, label: 'Educação · Frota · 48 meses', term: 48 },
  'educacao.frota.m24': { value: 199, label: 'Educação · Frota · 24 meses', term: 24 },
  'educacao.unit.m48': { value: 189, label: 'Educação · 1 unidade · 48 meses', term: 48 },
  'educacao.unit.m24': { value: 239, label: 'Educação · 1 unidade · 24 meses', term: 24 },
  'operacional-privado.frota.m48': { value: 249, label: 'Operacional Privado · Frota · 48 meses', term: 48 },
  'operacional-privado.frota.m24': { value: 299, label: 'Operacional Privado · Frota · 24 meses', term: 24 },
  'operacional-privado.unit.m48': { value: 289, label: 'Operacional Privado · 1 unidade · 48 meses', term: 48 },
  'operacional-privado.unit.m24': { value: 339, label: 'Operacional Privado · 1 unidade · 24 meses', term: 24 },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { planKey, name, email, cpfCnpj, mobilePhone } = req.body || {};

    if (!planKey || !name || !email || !cpfCnpj) {
      return res.status(400).json({ error: 'Campos obrigatórios faltando: planKey, name, email, cpfCnpj.' });
    }

    const plan = PLAN_CATALOG[planKey];
    if (!plan) {
      return res.status(400).json({ error: 'Plano inválido.' });
    }

    const customer = await createCustomer({ name, email, cpfCnpj, mobilePhone });

    const dueDate = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000);
    const nextDueDate = dueDate.toISOString().split('T')[0];

    const origin = req.headers.origin || `https://${req.headers.host || 'www.catalucca.com.br'}`;
    const successUrl = `${origin}/sucesso?plan=${encodeURIComponent(planKey)}`;

    const sub = await createSubscription({
      customerId: customer.id,
      value: plan.value,
      cycle: 'MONTHLY',
      nextDueDate,
      description: `${plan.label} (compromisso ${plan.term} meses)`,
      externalReference: planKey,
      successUrl,
    });

    const payments = await listSubscriptionPayments(sub.id);
    const firstPayment = payments?.data?.[0];
    const invoiceUrl = firstPayment?.invoiceUrl;

    if (!invoiceUrl) {
      return res.status(502).json({ error: 'Não foi possível gerar URL de pagamento.' });
    }

    return res.status(200).json({
      invoiceUrl,
      subscriptionId: sub.id,
      customerId: customer.id,
    });
  } catch (err) {
    console.error('[checkout]', err);
    return res.status(500).json({ error: err.message || 'Erro interno' });
  }
}
