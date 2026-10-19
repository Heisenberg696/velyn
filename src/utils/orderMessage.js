import { formatPrice } from './currency.js';

export const PAYMENT_LABELS = {
  momo: 'MoMo (I will send the screenshot)',
  delivery: 'Pay on delivery or confirm with vendor',
};

export const generateOrderRef = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let suffix = '';
  for (let i = 0; i < 5; i += 1) {
    suffix += chars[Math.floor(Math.random() * chars.length)];
  }
  return `VLY-${suffix}`;
};

export const lineTotal = (item) =>
  Number(item.salePrice ?? item.price ?? 0) * Number(item.quantity ?? 0);

export const cartOrderTotal = (cart) =>
  cart.reduce((total, item) => total + lineTotal(item), 0);

export const buildOrderMessage = ({
  ref,
  cart,
  name,
  phone,
  address,
  notes,
  paymentMethod,
}) => {
  const total = cartOrderTotal(cart);

  const lines = [
    "Hello Velyn, I'd like to place an order.",
    `Order ref: ${ref}`,
    '',
    'Items:',
    ...cart.map(
      (item) => `* ${item.name} x${item.quantity} = ${formatPrice(lineTotal(item))}`
    ),
    '',
    `Total: ${formatPrice(total)}`,
    '',
    `Name: ${name}`,
    `Phone: ${phone}`,
    `Delivery location: ${address}`,
  ];

  const trimmedNotes = (notes || '').trim();
  if (trimmedNotes) {
    lines.push(`Notes: ${trimmedNotes}`);
  }

  lines.push(`Payment: ${PAYMENT_LABELS[paymentMethod] || PAYMENT_LABELS.delivery}`);
  lines.push('');
  lines.push('Please confirm availability and delivery charges.');

  return lines.join('\n');
};

export const buildWhatsAppUrl = (whatsapp, message) => {
  const number = String(whatsapp || '').replace(/[^\d]/g, '');
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
};
