export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const token = req.headers['asaas-access-token'];
    if (process.env.ASAAS_WEBHOOK_TOKEN && token !== process.env.ASAAS_WEBHOOK_TOKEN) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const event = req.body || {};
    const eventType = event.event;
    const payment = event.payment || {};

    console.log('[asaas-webhook]', eventType, payment.id, payment.externalReference);

    const interesting = [
      'PAYMENT_CREATED',
      'PAYMENT_CONFIRMED',
      'PAYMENT_RECEIVED',
      'PAYMENT_OVERDUE',
      'PAYMENT_REFUNDED',
      'SUBSCRIPTION_CREATED',
      'SUBSCRIPTION_DELETED',
    ];

    if (interesting.includes(eventType)) {
      await notifyTeam(eventType, payment, event.subscription);
    }

    return res.status(200).json({ received: true });
  } catch (err) {
    console.error('[webhook]', err);
    return res.status(500).json({ error: err.message });
  }
}

async function notifyTeam(eventType, payment, subscription) {
  const RESEND_API_KEY = process.env.RESEND_API_KEY;
  const NOTIFY_EMAIL = process.env.NOTIFY_EMAIL;
  const NOTIFY_FROM = process.env.NOTIFY_FROM || 'no-reply@catalucca.com.br';

  if (!RESEND_API_KEY || !NOTIFY_EMAIL) {
    console.log('[notify] skipping — RESEND_API_KEY ou NOTIFY_EMAIL ausente');
    return;
  }

  const lines = [
    `Evento: ${eventType}`,
    `Payment ID: ${payment?.id || '—'}`,
    `Subscription: ${payment?.subscription || subscription?.id || '—'}`,
    `Cliente: ${payment?.customer || '—'}`,
    `Valor: R$ ${payment?.value ?? '—'}`,
    `Vencimento: ${payment?.dueDate || '—'}`,
    `Pago em: ${payment?.paymentDate || payment?.clientPaymentDate || '—'}`,
    `Referência interna: ${payment?.externalReference || subscription?.externalReference || '—'}`,
    `Descrição: ${payment?.description || subscription?.description || '—'}`,
  ].join('\n');

  try {
    const r = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: NOTIFY_FROM,
        to: NOTIFY_EMAIL,
        subject: `[Catalucca · Asaas] ${eventType} — ${payment?.externalReference || subscription?.externalReference || 'plano HaaS'}`,
        text: lines,
      }),
    });
    if (!r.ok) {
      const body = await r.text();
      console.error('[notify] Resend falhou:', r.status, body);
    }
  } catch (err) {
    console.error('[notify] erro inesperado:', err);
  }
}
