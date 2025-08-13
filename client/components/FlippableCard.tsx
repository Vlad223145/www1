import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Check, CreditCard } from "lucide-react";
import ConnectCardBottomSheet from "./ConnectCardBottomSheet";

interface FlippableCardProps {
  promoCode: string;
  copiedCode: boolean;
  onCopyCode: () => void;
}

export default function FlippableCard({
  promoCode,
  copiedCode,
  onCopyCode,
}: FlippableCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [showBottomSheet, setShowBottomSheet] = useState(false);
  const [isConnected, setIsConnected] = useState(false);

  const handleCardClick = (e: React.MouseEvent) => {
    // Don't flip if clicking on the button
    if ((e.target as HTMLElement).closest("button")) {
      return;
    }
    setIsFlipped(!isFlipped);
  };

  const handleConnectCard = () => {
    if (isConnected) {
      // If already connected, just copy the code
      onCopyCode();
    } else {
      // Show bottom sheet for connection
      setShowBottomSheet(true);
    }
  };

  const handleConnectionSuccess = () => {
    setIsConnected(true);
    onCopyCode(); // Also copy the code when connected
  };

  return (
    <>
      <div className="mt-12 max-w-md mx-auto perspective-1000">
        <div
          className={`relative w-full h-80 transition-transform duration-700 preserve-3d cursor-pointer ${
            isFlipped ? "rotate-y-180" : ""
          }`}
          onClick={handleCardClick}
        >
          {/* Front Side */}
          <div className="absolute inset-0 w-full h-full backface-hidden">
            <div className="bg-gradient-to-r from-brand to-yellow-400 p-6 rounded-3xl text-center shadow-lg h-full flex flex-col justify-between">
              <h3 className="font-black text-lg mb-4 text-black">Your Bonus</h3>
              <div className="bg-white rounded-xl p-6 mb-4 flex-grow flex flex-col justify-center">
                <div className="text-5xl font-black text-brand mb-2">
                  {promoCode}
                </div>
                <div className="text-sm font-bold text-green-600">
                  DELIVERY BONUS
                </div>
                <div className="text-xs text-gray-500 mt-2">
                  Click card to see details
                </div>
              </div>
              <div className="mt-4">
                <Button
                  onClick={handleConnectCard}
                  className="w-full bg-black hover:bg-gray-900 text-white border-0 font-bold"
                >
                  {isConnected ? (
                    <>
                      <Check className="w-4 h-4 mr-2" />
                      Connected!
                    </>
                  ) : copiedCode ? (
                    <>
                      <Check className="w-4 h-4 mr-2" />
                      Code Copied!
                    </>
                  ) : (
                    <>
                      <CreditCard className="w-4 h-4 mr-2" />
                      Connect Card
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>

          {/* Back Side */}
          <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180">
            <div className="bg-gradient-to-r from-gray-800 to-gray-700 p-6 rounded-3xl text-center shadow-lg h-full flex flex-col justify-between text-white">
              <h3 className="font-black text-lg mb-4">Code Information</h3>
              <div className="bg-white/10 rounded-xl p-6 mb-4 flex-grow flex flex-col justify-center backdrop-blur-sm">
                <div className="text-2xl font-black text-brand mb-4">
                  {promoCode} OFF
                </div>
                <div className="text-sm font-semibold text-gray-200 leading-relaxed">
                  This promo code works for any orders with all our partner
                  delivery services. Simply paste the code at checkout to receive
                  your discount. Valid for new users only.
                </div>
                <div className="text-xs text-gray-300 mt-4">
                  Click to flip back
                </div>
              </div>
              <div className="mt-4">
                <Button
                  onClick={handleConnectCard}
                  className="w-full bg-brand hover:bg-brand/90 text-black border-0 font-bold"
                >
                  {isConnected ? (
                    <>
                      <Check className="w-4 h-4 mr-2" />
                      Connected!
                    </>
                  ) : copiedCode ? (
                    <>
                      <Check className="w-4 h-4 mr-2" />
                      Code Copied!
                    </>
                  ) : (
                    <>
                      <CreditCard className="w-4 h-4 mr-2" />
                      Connect Card
                    </>
                  )}
                </Button>
              </div>
            </div>
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
