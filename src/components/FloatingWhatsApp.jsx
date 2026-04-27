import { FaWhatsapp } from 'react-icons/fa';

export default function FloatingWhatsApp() {
  const phoneNumber = "+923000000000"; // ← Change this to your actual WhatsApp number
  const message = "Assalamu Alaikum! I would like to know more about..."; // Optional pre-filled message

  const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 active:scale-95"
      aria-label="Chat on WhatsApp"
    >
      <FaWhatsapp size={32} />
      
      {/* Optional small pulse animation */}
      <div className="absolute -inset-1 bg-green-500 rounded-full opacity-30 animate-ping"></div>
    </a>
  );
}