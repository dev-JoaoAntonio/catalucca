const ASAAS_API_URL = process.env.ASAAS_API_URL || 'https://sandbox.asaas.com/api/v3';
const ASAAS_API_KEY = process.env.ASAAS_API_KEY;

async function asaasFetch(path, options = {}) {
  if (!ASAAS_API_KEY) {
    throw new Error('ASAAS_API_KEY não configurada no ambiente.');
  }
  const url = `${ASAAS_API_URL}${path}`;
  const res = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      access_token: ASAAS_API_KEY,
      ...(options.headers || {}),
    },
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const errMsg = data?.errors?.[0]?.description || `Asaas error ${res.status}`;
    throw new Error(errMsg);
  }
  return data;
}

export async function findCustomerByCpfCnpj(cpfCnpj) {
  const clean = String(cpfCnpj).replace(/\D/g, '');
  const data = await asaasFetch(`/customers?cpfCnpj=${encodeURIComponent(clean)}&limit=1`);
  return data?.data?.[0] || null;
}

export async function createCustomer({ name, email, cpfCnpj, mobilePhone }) {
  const existing = await findCustomerByCpfCnpj(cpfCnpj);
  if (existing) return existing;
  return asaasFetch('/customers', {
    method: 'POST',
    body: JSON.stringify({
      name,
      email,
      cpfCnpj: String(cpfCnpj).replace(/\D/g, ''),
      mobilePhone: mobilePhone ? String(mobilePhone).replace(/\D/g, '') : undefined,
      notificationDisabled: false,
    }),
  });
}

export async function createSubscription({
  customerId,
  value,
  cycle = 'MONTHLY',
  nextDueDate,
  description,
  externalReference,
  successUrl,
}) {
  return asaasFetch('/subscriptions', {
    method: 'POST',
    body: JSON.stringify({
      customer: customerId,
      billingType: 'UNDEFINED',
      value,
      cycle,
      nextDueDate,
      description,
      externalReference,
      callback: successUrl ? { successUrl, autoRedirect: true } : undefined,
    }),
  });
}

export async function listSubscriptionPayments(subscriptionId) {
  return asaasFetch(`/subscriptions/${subscriptionId}/payments?limit=1`);
}
