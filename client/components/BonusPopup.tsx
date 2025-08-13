import { useState, useEffect } from "react";
import { X, CreditCard, Shield, Clock, CreditCard as CardIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import ScratchCard from "./ScratchCard";

interface BonusPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function BonusPopup({ isOpen, onClose }: BonusPopupProps) {
  const [isRevealed, setIsRevealed] = useState(false);
  const [showConnectCard, setShowConnectCard] = useState(false);
  const [showBottomSheet, setShowBottomSheet] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [cardData, setCardData] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    name: ""
  });

  const handleRevealed = () => {
    setIsRevealed(true);
    setTimeout(() => {
      setShowConnectCard(true);
    }, 1000);
  };

  const handleConnectCard = () => {
    setShowBottomSheet(true);
  };

  const handleCloseBottomSheet = () => {
    setShowBottomSheet(false);
    setIsMinimized(false);
    // Keep card data when closing
  };

  const handleMinimizeBottomSheet = () => {
    setIsMinimized(true);
  };

  const handleExpandBottomSheet = () => {
    setIsMinimized(false);
  };

  const handleCardDataChange = (field: string, value: string) => {
    setCardData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleConnect = () => {
    // Here you would typically integrate with a payment processor
    alert("Card connection successful! Your €20 bonus is ready to use.");
    setShowBottomSheet(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Main Bonus Popup */}
      <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="text-center">
            {!showConnectCard ? (
              <>
                <div className="mb-6">
                  <div className="w-20 h-20 bg-gradient-to-r from-brand to-yellow-400 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-3xl">🎁</span>
                  </div>
                  <h2 className="text-2xl font-black mb-2">Welcome Bonus!</h2>
                  <p className="text-gray-600 font-semibold">
                    Scratch and get your bonus
                  </p>
                </div>

                <div className="mb-6">
                  <ScratchCard code="€20" onRevealed={handleRevealed} />
                </div>

                {isRevealed && (
                  <div className="animate-fade-in-up">
                    <div className="bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-bold mb-4">
                      🎉 Bonus Revealed!
                    </div>
                  </div>
                )}
              </>
            ) : (
              <>
                <div className="mb-6">
                  <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-400 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <CreditCard className="w-10 h-10 text-white" />
                  </div>
                  <h2 className="text-2xl font-black mb-2">Connect Your Card</h2>
                  <p className="text-gray-600 font-semibold mb-4">
                    Link your card and claim your €20 bonus
                  </p>
                </div>

                <div className="space-y-4">
                  <Button
                    onClick={handleConnectCard}
                    className="w-full bg-brand hover:bg-brand/90 text-black font-black rounded-2xl py-3"
                  >
                    <CreditCard className="w-5 h-5 mr-2" />
                    Connect Card & Get Bonus
                  </Button>

                  <Button
                    onClick={onClose}
                    variant="outline"
                    className="w-full rounded-2xl font-bold"
                  >
                    Maybe Later
                  </Button>
                </div>

                <div className="mt-4 text-xs text-gray-500">
                  Secure connection • Your data is protected
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Sheet */}
      {showBottomSheet && (
        <div className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm">
          <div
            className={`fixed bottom-0 left-0 right-0 bg-white transition-all duration-500 ease-out ${
              isMinimized ? 'h-24' : 'h-[70vh]'
            } rounded-t-3xl shadow-2xl`}
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
              onClick={handleCloseBottomSheet}
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
                    <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-400 rounded-xl flex items-center justify-center">
                      <CreditCard className="w-6 h-6 text-white" />
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
                  {/* Header */}
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-400 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                      <CreditCard className="w-8 h-8 text-white" />
                    </div>
                    <h2 className="text-2xl font-black mb-2">€20 Bonus</h2>
                    <p className="text-gray-600 font-semibold">
                      Connect your card to claim your bonus
                    </p>
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

                  {/* Card Form */}
                  <div className="space-y-4 mb-6 flex-1">
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

                  {/* Connect Button */}
                  <div className="pt-4 border-t border-gray-200">
                    <Button
                      onClick={handleConnect}
                      className="w-full bg-green-500 hover:bg-green-600 text-black font-black rounded-2xl py-4 text-lg"
                    >
                      <CardIcon className="w-5 h-5 mr-2" />
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
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
