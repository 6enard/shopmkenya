import { useState, useEffect } from 'react';
import { X, Smartphone, CheckCircle, Loader2 } from 'lucide-react';

interface MpesaCheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  totalAmount: number;
  onSuccess: () => void;
}

type CheckoutStep = 'phone' | 'processing' | 'success';

export default function MpesaCheckoutModal({
  isOpen,
  onClose,
  totalAmount,
  onSuccess
}: MpesaCheckoutModalProps) {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [step, setStep] = useState<CheckoutStep>('phone');
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isOpen) {
      setPhoneNumber('');
      setStep('phone');
      setError('');
    }
  }, [isOpen]);

  const validatePhoneNumber = (phone: string): boolean => {
    const cleaned = phone.replace(/\s/g, '');
    const kenyanPhoneRegex = /^(?:254|\+254|0)?([17]\d{8})$/;
    return kenyanPhoneRegex.test(cleaned);
  };

  const formatPhoneNumber = (phone: string): string => {
    const cleaned = phone.replace(/\s/g, '').replace(/^\+/, '');
    if (cleaned.startsWith('254')) {
      return cleaned;
    } else if (cleaned.startsWith('0')) {
      return '254' + cleaned.substring(1);
    }
    return '254' + cleaned;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!validatePhoneNumber(phoneNumber)) {
      setError('Please enter a valid Kenyan phone number');
      return;
    }

    setStep('processing');

    setTimeout(() => {
      setStep('success');
      setTimeout(() => {
        onSuccess();
        onClose();
      }, 2500);
    }, 3000);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^\d+\s]/g, '');
    setPhoneNumber(value);
    if (error) setError('');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={step === 'phone' ? onClose : undefined}
      />

      <div className="relative bg-white w-full max-w-md shadow-2xl">
        {step === 'phone' && (
          <button
            onClick={onClose}
            className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={20} strokeWidth={1.5} />
          </button>
        )}

        <div className="p-8">
          {step === 'phone' && (
            <>
              <div className="flex items-center justify-center w-16 h-16 bg-[#B0D80A]/10 mx-auto mb-6">
                <Smartphone size={28} strokeWidth={1.5} className="text-black" />
              </div>

              <h2 className="text-2xl font-light text-black text-center mb-2 tracking-tight">
                M-Pesa Payment
              </h2>
              <p className="text-center text-gray-600 font-light text-sm mb-8">
                Enter your M-Pesa number to complete payment
              </p>

              <div className="bg-gray-50 p-6 mb-8">
                <div className="flex justify-between items-center">
                  <span className="text-sm uppercase tracking-wider text-gray-600 font-medium">
                    Total Amount
                  </span>
                  <span className="text-2xl font-light text-black">
                    KES {totalAmount.toLocaleString('en-KE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </div>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="mb-6">
                  <label
                    htmlFor="phone"
                    className="block text-[11px] uppercase tracking-wider font-medium text-gray-700 mb-3"
                  >
                    M-Pesa Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    value={phoneNumber}
                    onChange={handlePhoneChange}
                    placeholder="07XX XXX XXX or 254..."
                    className={`w-full px-4 py-3.5 border ${
                      error ? 'border-red-500' : 'border-gray-200'
                    } focus:border-[#1498d4] outline-none transition-colors duration-200 font-light text-lg`}
                    autoFocus
                  />
                  {error && (
                    <p className="text-red-500 text-xs mt-2 font-light">{error}</p>
                  )}
                  <p className="text-gray-500 text-xs mt-2 font-light">
                    You will receive a prompt on your phone
                  </p>
                </div>

                <button
                  type="submit"
                  className="w-full bg-black text-white py-4 px-6 text-[11px] uppercase tracking-wider font-medium hover:bg-[#1498d4] transition-all duration-300"
                >
                  Send Payment Request
                </button>
              </form>
            </>
          )}

          {step === 'processing' && (
            <div className="text-center py-8">
              <div className="flex items-center justify-center mb-6">
                <Loader2
                  size={48}
                  strokeWidth={1.5}
                  className="text-[#1498d4] animate-spin"
                />
              </div>
              <h3 className="text-xl font-light text-black mb-3 tracking-tight">
                Processing Payment
              </h3>
              <p className="text-gray-600 font-light text-sm mb-4">
                Check your phone for the M-Pesa prompt
              </p>
              <p className="text-gray-500 font-light text-xs">
                Sent to {formatPhoneNumber(phoneNumber)}
              </p>
            </div>
          )}

          {step === 'success' && (
            <div className="text-center py-8">
              <div className="flex items-center justify-center mb-6">
                <CheckCircle size={56} strokeWidth={1.5} className="text-[#B0D80A]" />
              </div>
              <h3 className="text-2xl font-light text-black mb-3 tracking-tight">
                Payment Successful!
              </h3>
              <p className="text-gray-600 font-light text-sm">
                Your order has been confirmed
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
