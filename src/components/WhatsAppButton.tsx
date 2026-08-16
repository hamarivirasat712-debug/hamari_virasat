export default function WhatsAppButton() {
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '919238820685';
  return (
    <a
      href={`https://wa.me/${whatsappNumber}?text=Hi%2C%20I%27d%20like%20to%20know%20more%20about%20Hamari%20Virasat%20ritual%20documentation.`}
      target="_blank"
      rel="noopener noreferrer"
      id="whatsapp-float"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-50 group"
    >
      {/* Pulse ring */}
      <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-25" />

      {/* Button */}
      <div className="relative w-14 h-14 bg-[#25D366] hover:bg-[#1ebe5d] rounded-full flex items-center justify-center shadow-xl shadow-[#25D366]/40 transition-all duration-200 hover:scale-110 active:scale-95">
        <svg width="26" height="26" viewBox="0 0 26 26" fill="white">
          <path d="M13 2C7.477 2 3 6.477 3 12c0 1.85.504 3.585 1.385 5.075L3 22l5.07-1.37A9.953 9.953 0 0013 22c5.523 0 10-4.477 10-10S18.523 2 13 2zm5.25 14.08c-.26.73-1.53 1.4-2.1 1.49-.54.08-1.23.11-1.98-.13-1.29-.42-2.84-1.37-4.3-2.84-1.46-1.46-2.42-3.01-2.84-4.3-.24-.75-.2-1.44-.13-1.98.09-.57.76-1.84 1.49-2.1.31-.11.59-.1.82.01l.33.15.42.91.21.45c.08.17.1.35.02.5l-.25.47c-.09.18-.19.38-.08.56.16.28.7 1.1 1.5 1.82.97.87 1.83 1.4 2.13 1.56.18.09.38.07.53-.03l.43-.3c.16-.12.34-.15.52-.08l.47.17.96.35.44.16c.23.09.38.32.38.56v.58c0 .4-.15.92-.38 1.2z"/>
        </svg>
      </div>

      {/* Tooltip */}
      <span className="absolute right-16 top-1/2 -translate-y-1/2 bg-[#2A1208] text-white text-xs font-medium px-3 py-1.5 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-200 shadow-lg pointer-events-none">
        Chat with us
      </span>
    </a>
  );
}

