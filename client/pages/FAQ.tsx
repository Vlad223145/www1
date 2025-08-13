import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ChevronDown, Search, Smartphone, Download, CreditCard, MapPin, Shield, Clock, Users, Star, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";
import AnimatedSection from "@/components/AnimatedSection";

interface FAQItem {
  question: string;
  answer: string;
  details?: string;
  category: "general" | "delivery" | "partnership" | "technical" | "security";
}

export default function FAQ() {
  const [openItem, setOpenItem] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [showPartnerModal, setShowPartnerModal] = useState<string | null>(null);

  const partners = [
    {
      name: "Wolt",
      logo: "W",
      color: "bg-blue-500",
      description: "Fast delivery from restaurants and stores",
      deepLink: "wolt://",
      cities: "120+ cities",
      backgroundImage:
        "https://cdn.builder.io/api/v1/image/assets%2F86f4e443f35a4609b52c42bedac1a4c2%2F4aca5f0b3f754855b4a72b742760a2e8",
      steps: [
        "Open the Wolt app on your device",
        "Select a restaurant or store for your order",
        "Add items to cart and proceed to checkout",
        "In the 'Promo code' section, enter the code €20",
        "The discount will be automatically applied to your order"
      ]
    },
    {
      name: "Uber Eats",
      logo: "U", 
      color: "bg-green-500",
      description: "Food and groceries delivered in 30 minutes",
      deepLink: "ubereats://",
      cities: "200+ cities",
      backgroundImage:
        "https://cdn.builder.io/api/v1/image/assets%2F86f4e443f35a4609b52c42bedac1a4c2%2F5e17a940563d4c86b82e76b9c183b7f0",
      steps: [
        "Launch the Uber Eats app",
        "Find the restaurant you want in your area",
        "Build your order and tap 'Cart'",
        "On the payment page find the 'Promo code' field",
        "Enter €20 and tap 'Apply'"
      ]
    },
    {
      name: "Glovo",
      logo: "G",
      color: "bg-yellow-500", 
      description: "Everything you need delivered fast",
      deepLink: "glovo://",
      cities: "80+ cities",
      backgroundImage:
        "https://cdn.builder.io/api/v1/image/assets%2F86f4e443f35a4609b52c42bedac1a4c2%2F74053196d15442159b741e04cd76a1d8",
      steps: [
        "Open Glovo and log into your account",
        "Choose category: food, groceries or pharmacy",
        "Complete your order and proceed to payment", 
        "In the 'Promo codes' section enter €20",
        "Confirm the discount application"
      ]
    },
    {
      name: "Deliveroo",
      logo: "D",
      color: "bg-teal-500",
      description: "Premium restaurants delivered to your door",
      deepLink: "deliveroo://",
      cities: "50+ cities",
      backgroundImage:
        "https://cdn.builder.io/api/v1/image/assets%2F86f4e443f35a4609b52c42bedac1a4c2%2F5444e3f7cc844ab695773a4a22f1aca8",
      steps: [
        "Open the Deliveroo app",
        "Select a restaurant and add dishes to cart",
        "Proceed to order checkout",
        "Find the 'Voucher code' field on payment page",
        "Enter €20 and activate the discount"
      ]
    },
    {
      name: "Bolt Food",
      logo: "B",
      color: "bg-orange-500",
      description: "Affordable delivery every day",
      deepLink: "boltfood://",
      cities: "60+ cities", 
      backgroundImage:
        "https://cdn.builder.io/api/v1/image/assets%2F86f4e443f35a4609b52c42bedac1a4c2%2Feb4a328e67d249678bc89a0890c2ad92",
      steps: [
        "Launch Bolt Food on your phone",
        "Select a restaurant in your city",
        "Add food to cart and proceed to order",
        "On payment screen tap 'Add promo code'",
        "Paste code €20 and apply the discount"
      ]
    },
    {
      name: "DoorDash",
      logo: "DD",
      color: "bg-red-500",
      description: "#1 food delivery in the US",
      deepLink: "doordash://",
      cities: "300+ cities",
      backgroundImage:
        "https://cdn.builder.io/api/v1/image/assets%2F86f4e443f35a4609b52c42bedac1a4c2%2F31a035b6431845a4b82bdbdfa8bc4098?format=webp",
      steps: [
        "Open DoorDash and select a restaurant",
        "Build your order and go to cart", 
        "On the Checkout page find 'Promo Code'",
        "Enter €20 in the promo code field",
        "Tap Apply to activate the discount"
      ]
    },
  ];

  const faqs: FAQItem[] = [
    {
      question: "How do I get the €20 delivery discount?",
      answer: "Copy the ��20 promo code from our website and paste it when placing an order in any partner delivery app.",
      details: "The promo code is automatically copied when you click the 'Get Discount' button. Simply paste it in the promo code field during checkout.",
      category: "general"
    },
    {
      question: "Which delivery services does the discount work with?",
      answer: "The discount works with Wolt, Uber Eats, Glovo, DoorDash, Deliveroo, Bolt Food and other partner services.",
      details: "The full list of partners is constantly expanding. Check the current information in the 'Partners' section on the homepage.",
      category: "partnership"
    },
    {
      question: "Can I use the promo code multiple times?",
      answer: "The promo code is intended for one-time use by new users of partner services.",
      details: "Each promo code works once per user. For additional discounts, follow new promotions on our website.",
      category: "general"
    },
    {
      question: "Which countries and cities does the promotion work in?",
      answer: "The promotion is available in 27 European countries, all US states and most Canadian provinces - over 300 cities.",
      details: "The geography is constantly expanding. The current list of cities is available in the 'Geography' section on the homepage.",
      category: "delivery"
    },
    {
      question: "What should I do if the promo code doesn't work?",
      answer: "Make sure you entered the code €20 correctly. If the problem persists, check the promotion terms or contact support.",
      details: "Common reasons: code already used, order below minimum amount, service not participating in promotion. Try updating the app.",
      category: "technical"
    },
    {
      question: "Is there a minimum order amount to use the discount?",
      answer: "The minimum order amount is €25. The €20 discount is applied automatically when this amount is reached.",
      details: "The minimum amount may vary depending on the region and partner service. Check the conditions in the delivery app.",
      category: "general"
    },
    {
      question: "Can I combine the discount with other promotions?",
      answer: "Generally, the promo code cannot be combined with other discounts, unless specifically stated in the promotion terms.",
      details: "Each delivery service has its own rules for combining promo codes. Check details in the app when placing an order.",
      category: "general"
    },
    {
      question: "How soon will my order arrive after applying the discount?",
      answer: "Delivery time depends on the chosen service and usually takes 25-45 minutes. The discount doesn't affect delivery speed.",
      details: "In major cities, delivery is usually faster. Exact time is shown in the delivery app when selecting a restaurant.",
      category: "delivery"
    },
    {
      question: "Is it safe to use our service?",
      answer: "Yes, we use SSL encryption and don't collect personal data. Promo codes are provided by official partners.",
      details: "We don't request bank card details or personal information. All payments go through secure partner service systems.",
      category: "security"
    },
    {
      question: "How often do new promotions and promo codes appear?",
      answer: "New promotions appear weekly. Subscribe to notifications to be first to know about discounts.",
      details: "Follow updates on the homepage or enable push notifications for current promotion information.",
      category: "general"
    },
    {
      question: "What should I do if the delivery app doesn't accept the promo code?",
      answer: "Try updating the app, restarting it, or checking if you entered the code correctly. Contact the app's support service.",
      details: "Some apps require updates to support new promo codes. Also make sure your account meets the promotion conditions.",
      category: "technical"
    },
    {
      question: "Does the discount work for items from stores and pharmacies?",
      answer: "Yes, the discount works not only for restaurants, but also for orders from supermarkets, pharmacies and other stores through partner apps.",
      details: "Availability depends on the specific delivery service. In Wolt and Glovo the discount works on all product categories.",
      category: "delivery"
    },
    {
      question: "Can I use the discount for corporate orders?",
      answer: "The promo code is intended for personal use. There are separate discount programs for corporate clients.",
      details: "Contact us for information about corporate discounts and special conditions for business clients.",
      category: "general"
    },
    {
      question: "Does the discount work on weekends and holidays?",
      answer: "Yes, the discount is active 24/7 on all days of the week, including weekends and holidays.",
      details: "Some restaurants may have limited menus on holidays, but the discount remains active when the minimum order amount is met.",
      category: "general"
    },
    {
      question: "What should I do if money was charged but the discount wasn't applied?",
      answer: "Contact the delivery service's support with your order number. They will refund the difference or credit bonuses for your next order.",
      details: "Save screenshots with the promo code and order receipt. This will help resolve the refund issue faster.",
      category: "technical"
    },
    {
      question: "Can I give the promo code to someone else?",
      answer: "Each promo code is tied to first use. If you haven't used it, you can share it with friends.",
      details: "We recommend each user get the promo code independently from our website for guaranteed functionality.",
      category: "general"
    },
    {
      question: "Does weather affect the ability to use the discount?",
      answer: "The discount is available in any weather. However, some restaurants may suspend delivery in extreme weather conditions.",
      details: "In bad weather, delivery time may increase, but the discount remains active for all operating establishments.",
      category: "delivery"
    },
    {
      question: "Is there a mobile app for getting discounts?",
      answer: "We have a mobile-optimized website version. A mobile app is currently in development.",
      details: "Add our website to your phone's home screen for quick access to current promo codes and promotions.",
      category: "technical"
    },
    {
      question: "How do I know when the promo code expires?",
      answer: "The promo code expiration date is indicated on the website. Usually our codes are valid for 30 days from receipt.",
      details: "Use the promo code as soon as possible after receiving it. Expired codes are not restored.",
      category: "general"
    },
    {
      question: "What should I do if there are no partner services in my city?",
      answer: "The list of partners is constantly expanding. Leave a request and we'll notify you when services appear in your region.",
      details: "We are actively working on expanding geography and adding new partners. Follow updates on the website.",
      category: "partnership"
    }
  ];

  const categories = [
    { value: "all", label: "All Questions", icon: <AlertCircle className="w-4 h-4" /> },
    { value: "general", label: "General", icon: <Users className="w-4 h-4" /> },
    { value: "delivery", label: "Delivery", icon: <MapPin className="w-4 h-4" /> },
    { value: "partnership", label: "Partners", icon: <Star className="w-4 h-4" /> },
    { value: "technical", label: "Technical", icon: <Smartphone className="w-4 h-4" /> },
    { value: "security", label: "Security", icon: <Shield className="w-4 h-4" /> },
  ];

  const filteredFAQs = faqs.filter((faq) => {
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleItem = (index: number) => {
    setOpenItem(openItem === index ? null : index);
  };

  const handleBackClick = () => {
    // Navigate back without triggering bonus popup
    window.history.back();
  };

  return (
    <div className="min-h-screen bg-white text-black font-sans overflow-x-hidden">
      {/* Navigation */}
      <nav className="border-b border-gray-200 bg-white/80 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="text-xl font-black">
              DeliveryDiscount
            </Link>
            <div className="hidden md:flex space-x-8">
              <Link
                to="/"
                className="text-gray-600 hover:text-black transition-colors font-semibold"
              >
                Home
              </Link>
              <Link to="/faq" className="text-black font-black">
                FAQ
              </Link>
              <Link
                to="/trust"
                className="text-gray-600 hover:text-black transition-colors font-semibold"
              >
                Trust
              </Link>
              <Link
                to="/about"
                className="text-gray-600 hover:text-black transition-colors font-semibold"
              >
                About
              </Link>
              <Link
                to="/contact"
                className="text-gray-600 hover:text-black transition-colors font-semibold"
              >
                Contact
              </Link>
            </div>
            <Button
              onClick={handleBackClick}
              variant="outline"
              size="sm"
              className="rounded-xl border-gray-300 hover:bg-gray-50"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <AnimatedSection animation="fade-up">
            <h1 className="font-display text-4xl md:text-6xl font-black mb-6 leading-tight">
              Frequently Asked
              <br />
              <span className="text-brand">Questions</span>
            </h1>
          </AnimatedSection>

          <AnimatedSection animation="fade-up" delay={200}>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto font-semibold">
              Detailed answers to all questions about our delivery discount service. 
              Step-by-step instructions for each partner app.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 bg-gray-50 border-y border-gray-200">
        <div className="max-w-4xl mx-auto">
          <AnimatedSection>
            <div className="relative mb-6">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search questions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand font-semibold"
              />
            </div>
          </AnimatedSection>

          <AnimatedSection delay={200}>
            <div className="flex flex-wrap gap-3">
              {categories.map((category) => (
                <button
                  key={category.value}
                  onClick={() => setSelectedCategory(category.value)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-xl font-semibold transition-all duration-200 ${
                    selectedCategory === category.value
                      ? "bg-brand text-black"
                      : "bg-white text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  {category.icon}
                  <span>{category.label}</span>
                </button>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-12 md:py-16 px-4 bg-gray-50 relative z-10">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection>
            <h2 className="font-display text-2xl md:text-3xl font-black text-center mb-4">
              Partner Instructions
            </h2>
            <p className="text-center text-gray-600 mb-8 md:mb-12 font-semibold">
              Step-by-step instructions for each delivery app
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {partners.map((partner, index) => (
              <AnimatedSection
                key={index}
                animation="scale-up"
                delay={index * 100}
              >
                <div
                  className="bg-white rounded-3xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer group"
                  onClick={() => setShowPartnerModal(partner.name)}
                >
                  <div
                    className={`w-16 h-16 ${partner.color} rounded-2xl mx-auto mb-4 flex items-center justify-center text-white text-xl font-black group-hover:scale-110 transition-transform duration-300`}
                    style={{
                      backgroundImage: `url(${partner.backgroundImage})`,
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "center",
                      backgroundSize: "cover",
                    }}
                  >
                    <p><br /></p>
                  </div>
                  <h3 className="font-black text-lg mb-2">{partner.name}</h3>
                  <p className="text-sm text-gray-600 mb-2 font-semibold">
                    {partner.cities}
                  </p>
                  <div className="text-xs text-brand font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    View Instructions
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-16 md:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {filteredFAQs.length === 0 ? (
            <div className="text-center py-12">
              <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-black mb-2">Nothing Found</h3>
              <p className="text-gray-600 font-semibold">
                Try changing your search query or select a different category
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredFAQs.map((faq, index) => (
                <AnimatedSection
                  key={index}
                  animation="fade-up"
                  delay={index * 50}
                >
                  <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-apple hover:shadow-apple-lg transition-shadow duration-300">
                    <button
                      onClick={() => toggleItem(index)}
                      className="w-full p-6 text-left flex justify-between items-center hover:bg-gray-50 transition-colors duration-200"
                    >
                      <h3 className="text-lg font-black pr-4">
                        {faq.question}
                      </h3>
                      <ChevronDown
                        className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${
                          openItem === index ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    <div
                      className={`overflow-hidden transition-all duration-300 ease-out ${
                        openItem === index
                          ? "max-h-96 opacity-100"
                          : "max-h-0 opacity-0"
                      }`}
                    >
                      <div className="px-6 pb-6">
                        <div className="border-t border-gray-200 pt-4">
                          <p className="text-gray-600 mb-4 font-semibold">
                            {faq.answer}
                          </p>
                          {faq.details && (
                            <div className="bg-gray-50 rounded-xl p-4">
                              <p className="text-sm text-gray-600 font-medium">
                                <strong>Additional info:</strong> {faq.details}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          )}

          {/* Contact Section */}
          <AnimatedSection animation="fade-up" delay={600}>
            <div className="mt-16 text-center">
              <div className="bg-white rounded-3xl p-8 shadow-apple border border-gray-100">
                <h3 className="text-2xl font-black mb-4">Didn't Find an Answer?</h3>
                <p className="text-gray-600 mb-6 font-semibold">
                  Contact our support team, and we'll help solve any question within 24 hours
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    asChild
                    className="bg-brand hover:bg-brand/90 text-black rounded-2xl font-black"
                  >
                    <Link to="/contact">Contact Support</Link>
                  </Button>
                  <Button 
                    asChild 
                    variant="outline" 
                    className="rounded-2xl font-bold border-gray-300"
                  >
                    <Link to="/">
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Back to Homepage
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Partner Modal */}
      {showPartnerModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-8 max-w-lg w-full max-h-[90vh] overflow-y-auto">
            {(() => {
              const partner = partners.find((p) => p.name === showPartnerModal);
              return partner ? (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center">
                      <div
                        className={`w-16 h-16 ${partner.color} rounded-2xl mr-4 flex items-center justify-center text-white text-xl font-black`}
                        style={{
                          backgroundImage: `url(${partner.backgroundImage})`,
                          backgroundRepeat: "no-repeat",
                          backgroundPosition: "center",
                          backgroundSize: "cover",
                        }}
                      >
                        <p><br /></p>
                      </div>
                      <div>
                        <h3 className="text-2xl font-black">{partner.name}</h3>
                        <p className="text-gray-600 font-semibold">{partner.cities}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setShowPartnerModal(null)}
                      className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                    >
                      ×
                    </button>
                  </div>

                  <div className="mb-6">
                    <h4 className="font-black mb-3 flex items-center">
                      <Download className="w-5 h-5 mr-2 text-brand" />
                      Step-by-step Instructions:
                    </h4>
                    <div className="space-y-3">
                      {partner.steps.map((step, index) => (
                        <div key={index} className="flex items-start">
                          <div className="w-6 h-6 bg-brand rounded-full flex items-center justify-center text-black text-sm font-black mr-3 mt-0.5 flex-shrink-0">
                            {index + 1}
                          </div>
                          <p className="text-gray-700 font-semibold">{step}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-brand/10 rounded-2xl p-4 mb-6">
                    <h4 className="font-black mb-2 flex items-center">
                      <CreditCard className="w-5 h-5 mr-2 text-brand" />
                      Promo Code:
                    </h4>
                    <div className="bg-white rounded-xl p-3 text-center">
                      <span className="text-2xl font-black text-brand">€20</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Button
                      className="w-full bg-brand hover:bg-brand/90 text-black rounded-2xl font-black"
                      onClick={() => window.open(partner.deepLink, "_blank")}
                    >
                      <Smartphone className="w-5 h-5 mr-2" />
                      Open App
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full rounded-2xl font-bold border-gray-300"
                      onClick={() => setShowPartnerModal(null)}
                    >
                      Close
                    </Button>
                  </div>
                </div>
              ) : null;
            })()}
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-neutral-900 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-sm text-gray-400 font-semibold">
            © 2025 DeliveryDiscount — All rights reserved
          </p>
        </div>
      </footer>
    </div>
  );
}
