import { Mail, MapPin, Phone } from 'lucide-react';

export default function Contact() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-12 py-24">
        <h1 className="text-5xl md:text-6xl font-light text-black mb-12 tracking-tight">Get in Touch</h1>

        <p className="text-xl text-gray-700 mb-16 font-light">
          Have questions about our products or services? We'd love to hear from you.
        </p>

        <div className="grid md:grid-cols-2 gap-16">
          <div className="space-y-12">
            <div className="flex gap-6">
              <div className="w-12 h-12 bg-gray-50 flex items-center justify-center flex-shrink-0">
                <Mail size={20} strokeWidth={1.5} className="text-black" />
              </div>
              <div>
                <h3 className="font-light text-black mb-2 text-sm uppercase tracking-wider">Email</h3>
                <p className="text-gray-700 font-light">shop@studiomkenya.com</p>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="w-12 h-12 bg-gray-50 flex items-center justify-center flex-shrink-0">
                <Phone size={20} strokeWidth={1.5} className="text-black" />
              </div>
              <div>
                <h3 className="font-light text-black mb-2 text-sm uppercase tracking-wider">Phone</h3>
                <p className="text-gray-700 font-light">+254 712 345 678</p>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="w-12 h-12 bg-gray-50 flex items-center justify-center flex-shrink-0">
                <MapPin size={20} strokeWidth={1.5} className="text-black" />
              </div>
              <div>
                <h3 className="font-light text-black mb-2 text-sm uppercase tracking-wider">Location</h3>
                <p className="text-gray-700 font-light">Nairobi, Kenya</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 p-10">
            <h3 className="text-2xl font-light text-black mb-8 tracking-tight">Send us a message</h3>
            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-[11px] uppercase tracking-wider font-medium text-gray-700 mb-3">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-4 py-3 border border-gray-200 focus:border-black outline-none transition-colors duration-200 font-light"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-[11px] uppercase tracking-wider font-medium text-gray-700 mb-3">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-3 border border-gray-200 focus:border-black outline-none transition-colors duration-200 font-light"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-[11px] uppercase tracking-wider font-medium text-gray-700 mb-3">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={5}
                  className="w-full px-4 py-3 border border-gray-200 focus:border-black outline-none resize-none transition-colors duration-200 font-light"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-black text-white py-4 px-6 text-[11px] uppercase tracking-wider font-medium hover:bg-[#B0D80A] hover:text-black transition-all duration-300"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
