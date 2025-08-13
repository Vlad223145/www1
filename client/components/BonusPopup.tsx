import { useState, useEffect } from "react";
import { X, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import ScratchCard from "./ScratchCard";
import ConnectCardBottomSheet from "./ConnectCardBottomSheet";

interface BonusPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function BonusPopup({ isOpen, onClose }: BonusPopupProps) {
  const [isRevealed, setIsRevealed] = useState(false);
  const [showConnectCard, setShowConnectCard] = useState(false);
  const [showBottomSheet, setShowBottomSheet] = useState(false);

  const handleRevealed = () => {
    setIsRevealed(true);
    setTimeout(() => {
      setShowConnectCard(true);
    }, 1000);
  };

  const handleConnectCard = () => {
    setShowBottomSheet(true);
  };

  const handleConnectionSuccess = () => {
    // Close both bottom sheet and popup on successful connection
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

      {/* Connect Card Bottom Sheet */}
      <ConnectCardBottomSheet
        isOpen={showBottomSheet}
        onClose={() => setShowBottomSheet(false)}
        onConnect={handleConnectionSuccess}
      />
    </>
  );
}
