import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  ChevronRight,
  Truck,
  MapPin,
  Shield,
  Star,
  Clock,
  Users,
  Copy,
  Check,
  Search,
  ChevronDown,
  ArrowRight,
  Heart,
  DollarSign,
  Map,
  Globe,
  Phone,
  Smartphone,
  CreditCard,
  Package,
  HelpCircle,
  MessageSquare,
} from "lucide-react";
import { Link } from "react-router-dom";
import AnimatedSection from "@/components/AnimatedSection";
import ScratchCard from "@/components/ScratchCard";
import ScrollRoad from "@/components/ScrollRoad";
import BonusPopup from "@/components/BonusPopup";
import MovingBadges from "@/components/MovingBadges";
import BackgroundEffects from "@/components/BackgroundEffects";
import AnimatedSupport from "@/components/AnimatedSupport";
import WoltPlusCard from "@/components/WoltPlusCard";
import FloatingLogos from "@/components/FloatingLogos";
import SideFoodImages from "@/components/SideFoodImages";
import FlippableCard from "@/components/FlippableCard";

export default function Index() {
  const [copiedCode, setCopiedCode] = useState(false);
  const [selectedStep, setSelectedStep] = useState(0);
  const [showPartnerModal, setShowPartnerModal] = useState<string | null>(null);
  const [showMapModal, setShowMapModal] = useState<string | null>(null);
  const [currentMenuItem, setCurrentMenuItem] = useState(0);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [faqSearch, setFaqSearch] = useState("");
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const [routeProgress, setRouteProgress] = useState(0);
  const [scratchRevealed, setScratchRevealed] = useState(false);
  const [showBonusPopup, setShowBonusPopup] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  const promoCode = "€20";

  // Show bonus popup on page load
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowBonusPopup(true);
    }, 1500); // Show after 1.5 seconds for better UX
    return () => clearTimeout(timer);
  }, []);

  // Animation effect for route drawing
  useEffect(() => {
    const timer = setTimeout(() => {
      setRouteProgress(100);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const copyPromoCode = async () => {
    try {
      await navigator.clipboard.writeText(promoCode);
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const scrollToBonusSection = () => {
    const bonusElement = document.getElementById("bonus-section");
    if (bonusElement) {
      bonusElement.scrollIntoView({ behavior: "smooth" });
    }
  };

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
    },
  ];

  const menuItems = [
    {
      id: 1,
      name: "Big Mac Menu",
      restaurant: "McDonald's",
      originalPrice: 12.9,
      description: "Classic Big Mac with fries and drink",
      calories: "1040 cal",
      backgroundImage:
        "https://cdn.builder.io/o/assets%2F86f4e443f35a4609b52c42bedac1a4c2%2F2dc4e54f8d0748a7b8d6f8dae62f221c?alt=media&token=f245b195-1abd-42da-8c25-e84f656ef23f&apiKey=86f4e443f35a4609b52c42bedac1a4c2",
    },
    {
      id: 2,
      name: "Margherita Pizza",
      restaurant: "Pizza Hut",
      originalPrice: 18.5,
      description: "Traditional pizza with tomatoes and mozzarella",
      calories: "830 cal",
      backgroundImage:
        "https://cdn.builder.io/api/v1/image/assets%2F86f4e443f35a4609b52c42bedac1a4c2%2Fbca1c5775630447e899f5953b86693b2?format=webp",
    },
    {
      id: 3,
      name: "Chicken Burrito",
      restaurant: "Chipotle",
      originalPrice: 15.2,
      description: "Burrito with chicken, rice and vegetables",
      calories: "940 cal",
      backgroundImage:
        "https://cdn.builder.io/api/v1/image/assets%2F86f4e443f35a4609b52c42bedac1a4c2%2F596f4cd04ff2477eb7406b54b1f2863d",
    },
    {
      id: 4,
      name: "Pad Thai",
      restaurant: "Thai Express",
      originalPrice: 14.8,
      description: "Traditional Thai noodles with shrimp",
      calories: "720 cal",
      backgroundImage:
        "https://cdn.builder.io/o/assets%2F86f4e443f35a4609b52c42bedac1a4c2%2Fe6353b2aa129473aaf13734787ba7035?alt=media&token=95c73c31-a591-4215-ab26-a5ad65a79558&apiKey=86f4e443f35a4609b52c42bedac1a4c2",
    },
  ];

  const testimonials = [
    {
      name: "Anna K.",
      city: "Berlin",
      rating: 5,
      comment: "Amazing discount! Saved €67 in a month using Wolt",
      savings: "€67",
      avatar: "A",
    },
    {
      name: "Michael P.",
      city: "Madrid",
      rating: 5,
      comment: "Code works instantly. I order through Glovo every day",
      savings: "€89",
      avatar: "M",
    },
    {
      name: "Elena V.",
      city: "Amsterdam",
      rating: 4,
      comment: "Convenient and simple. Uber Eats became much more affordable",
      savings: "€43",
      avatar: "E",
    },
  ];

  const mapLocations = [
    {
      region: "Western Europe",
      countries: ["Germany", "France", "Netherlands", "Belgium"],
      partners: ["Wolt", "Uber Eats", "Glovo", "Deliveroo"],
      exampleDelivery: "€2.49 → €0",
    },
    {
      region: "Northern Europe",
      countries: ["Sweden", "Norway", "Denmark", "Finland"],
      partners: ["Wolt", "Uber Eats", "Bolt Food"],
      exampleDelivery: "€3.90 → €0",
    },
    {
      region: "USA",
      countries: ["California", "New York", "Texas", "Florida"],
      partners: ["Uber Eats", "DoorDash"],
      exampleDelivery: "$4.99 → $0",
    },
  ];

  const faqs = [
    {
      question: "How to activate the discount?",
      answer:
        "Click 'Get Discount', the code will be copied automatically. Paste the code when paying in the partner app.",
    },
    {
      question: "Which services does it work with?",
      answer:
        "Wolt, Uber Eats, Glovo, DoorDash, Bolt Food and others. Full list in the 'Partners' section.",
    },
    {
      question: "Can I use multiple discounts?",
      answer:
        "No. The promo code cannot be combined with other offers unless otherwise specified.",
    },
    {
      question: "How many times can I use it?",
      answer: "Once per user for new users of delivery services.",
    },
    {
      question: "What if the code doesn't work?",
      answer:
        "Try updating the partner app. If it doesn't help — contact support.",
    },
  ];

  const filteredFAQs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(faqSearch.toLowerCase()) ||
      faq.answer.toLowerCase().includes(faqSearch.toLowerCase()),
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  const calculateSavings = (originalPrice: number) => {
    const discount = Math.min(20, originalPrice);
    return {
      discount: discount,
      newPrice: Math.max(0, originalPrice - discount),
      percentage: Math.round((discount / originalPrice) * 100),
    };
  };

  return (
    <div className="min-h-screen bg-white text-black font-sans overflow-x-hidden relative">
      {/* Full-page background effects */}
      <BackgroundEffects />
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center px-4 py-20 overflow-hidden z-10"
      >
        {/* Floating Delivery Logos Background */}
        <FloatingLogos partners={partners} />

        {/* Moving Background Badges */}
        <MovingBadges />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <AnimatedSection animation="fade-up">
            <h1 className="font-display text-hero-mobile md:text-hero-desktop font-black mb-6 leading-none tracking-tight">
              −€20 on any delivery
              <br />
              <span className="text-gray-600">
                <span className="text-blue-500">Wolt</span>,{" "}
                <span className="text-black">Uber</span>{" "}
                <span className="text-green-700">Eats</span>,{" "}
                <span className="text-yellow-500">Glovo</span> & more
              </span>
            </h1>
          </AnimatedSection>

          <AnimatedSection animation="fade-up" delay={200}>
            <h2 className="text-body-mobile md:text-body-desktop text-gray-600 mb-8 max-w-2xl mx-auto font-semibold">
              Available in Europe and USA. Code copies automatically — paste
              when paying.
            </h2>
          </AnimatedSection>

          <AnimatedSection animation="scale-up" delay={400}>
            <Button
              onClick={scrollToBonusSection}
              size="lg"
              className="bg-brand hover:bg-brand/90 text-black font-black rounded-2xl px-8 py-4 text-lg shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-[0.98] mb-2"
            >
              Get Discount
            </Button>
            <p className="text-sm text-gray-500 mt-2 font-semibold">
              Click to access your bonus code
            </p>
          </AnimatedSection>

          {/* Animated Route */}
          <AnimatedSection animation="fade-up" delay={600}>
            <div className="mt-4 relative max-w-md mx-auto">
              <div className="relative h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-black rounded-full transition-all duration-1400 ease-out"
                  style={{ width: `${routeProgress}%` }}
                />
                <div
                  className="absolute top-0 w-8 h-8 -mt-3 transition-all duration-1600 ease-linear"
                  style={{
                    left: `${Math.min(routeProgress - 8, 92)}%`,
                    transform: routeProgress >= 100 ? "scale(1.1)" : "scale(1)",
                  }}
                >
                  <Truck className="w-8 h-8 text-black" />
                </div>
                <div className="absolute top-0 right-0 w-8 h-8 -mt-3">
                  <MapPin className="w-8 h-8 text-brand" />
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>

        {/* Side Food Images */}
        <SideFoodImages />
      </section>

      {/* Large Scroll Road Animation */}
      <section className="py-8 md:py-12 px-4 bg-gradient-to-b from-white to-gray-50 relative z-10">
        <div className="max-w-7xl mx-auto text-center">
          <AnimatedSection>
            <h2 className="font-display text-xl md:text-2xl font-black mb-6 text-gray-800">
              Track Your Delivery Journey
            </h2>
          </AnimatedSection>
          <ScrollRoad />
        </div>
      </section>

      {/* Support Team & Wolt Plus Section */}
      <section className="py-12 md:py-16 px-4 bg-white relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 items-center">
            {/* Animated Support Team */}
            <AnimatedSection animation="slide-right">
              <AnimatedSupport />
            </AnimatedSection>

            {/* Wolt Plus Card */}
            <AnimatedSection animation="slide-left" delay={200}>
              <WoltPlusCard />
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-12 md:py-16 px-4 bg-white relative z-10">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection>
            <h2 className="font-display text-2xl md:text-3xl font-black text-center mb-8 md:mb-12">
              How It Works
            </h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                icon: <Smartphone className="w-12 h-12" />,
                title: "Choose Service",
                body: "Open the partner app and select restaurant",
                interactive: true,
              },
              {
                icon: <CreditCard className="w-12 h-12" />,
                title: "Apply Code",
                body: "Code copies automatically — just paste when paying",
                interactive: true,
              },
              {
                icon: <Package className="w-12 h-12" />,
                title: "Open Package",
                body: "Enjoy delivery and savings!",
                interactive: true,
              },
            ].map((step, index) => (
              <AnimatedSection
                key={index}
                animation="fade-up"
                delay={index * 200}
              >
                <div
                  className="text-center group cursor-pointer p-6 rounded-3xl hover:bg-gray-50 transition-all duration-300"
                  onClick={() => setSelectedStep(index)}
                >
                  <div className="mb-6 relative">
                    <div
                      className={`w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mx-auto transition-all duration-300 ${
                        selectedStep === index
                          ? "scale-110 bg-brand shadow-lg"
                          : "group-hover:scale-105"
                      }`}
                    >
                      {step.icon}
                    </div>
                  </div>
                  <h3 className="text-xl font-black mb-4">{step.title}</h3>
                  <p className="text-gray-600 font-semibold">{step.body}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>

          {/* Flippable Bonus Display Card */}
          <AnimatedSection delay={600}>
            <div id="bonus-section">
              <FlippableCard
                promoCode={promoCode}
                copiedCode={copiedCode}
                onCopyCode={copyPromoCode}
              />
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-12 md:py-16 px-4 bg-neutral-100 relative z-10">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection>
            <h2 className="font-display text-2xl md:text-3xl font-black text-center mb-8 md:mb-12">
              Partners
            </h2>
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
                    <p>
                      <br />
                    </p>
                  </div>
                  <h3 className="font-black text-lg mb-2">{partner.name}</h3>
                  <p className="text-sm text-gray-600 mb-2 font-semibold">
                    {partner.cities}
                  </p>
                  <div className="text-xs text-brand font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Click for details
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Live Map Section */}
      <section className="py-12 md:py-16 px-4 bg-white relative z-10">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection>
            <h2 className="font-display text-2xl md:text-3xl font-black text-center mb-8 md:mb-12">
              Where It Works
            </h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            <AnimatedSection animation="slide-right">
              <div className="space-y-4">
                {mapLocations.map((location, index) => (
                  <div
                    key={index}
                    className="bg-gray-50 rounded-2xl p-6 cursor-pointer hover:bg-gray-100 transition-colors duration-300"
                    onClick={() => setShowMapModal(location.region)}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-black text-lg mb-2">
                          {location.region}
                        </h3>
                        <p className="text-sm text-gray-600 mb-2 font-semibold">
                          {location.countries.join(", ")}
                        </p>
                        <p className="text-xs text-brand font-bold">
                          Delivery: {location.exampleDelivery}
                        </p>
                      </div>
                      <ArrowRight className="w-5 h-5 text-gray-400" />
                    </div>
                  </div>
                ))}
              </div>
            </AnimatedSection>

            <AnimatedSection animation="slide-left">
              <div className="relative h-64 bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0"></div>
                <div className="text-center relative z-10"></div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Menu Showcase */}
      <section className="py-12 md:py-16 px-4 bg-neutral-100 relative z-10">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection>
            <h2 className="font-display text-2xl md:text-3xl font-black text-center mb-3 md:mb-4">
              Popular Items
            </h2>
            <p className="text-center text-gray-600 mb-8 md:mb-12 font-semibold">
              See how much you'll save
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {menuItems.map((item, index) => {
              const savings = calculateSavings(item.originalPrice);
              return (
                <AnimatedSection
                  key={index}
                  animation="fade-up"
                  delay={index * 100}
                >
                  <div className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group cursor-pointer">
                    <div
                      className="h-32 bg-gray-100 flex items-center justify-center"
                      style={{
                        backgroundImage: `url(${item.backgroundImage})`,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "center",
                        backgroundSize: "cover",
                      }}
                    />
                    <div className="p-6">
                      <h3 className="font-black text-lg mb-1">{item.name}</h3>
                      <p className="text-sm text-gray-600 mb-3 font-semibold">
                        {item.restaurant}
                      </p>
                      <p className="text-xs text-gray-500 mb-4 font-medium">
                        {item.description}
                      </p>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-500 line-through font-semibold">
                            €{item.originalPrice.toFixed(2)}
                          </span>
                          <span className="text-lg font-black text-brand">
                            €{savings.newPrice.toFixed(2)}
                          </span>
                        </div>
                        <div className="bg-green-100 text-green-800 text-center py-1 rounded-lg text-sm font-bold">
                          Save: €{savings.discount.toFixed(2)}
                        </div>
                      </div>
                    </div>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-12 md:py-16 px-4 bg-white relative z-10">
        <div className="max-w-4xl mx-auto">
          <AnimatedSection>
            <h2 className="font-display text-2xl md:text-3xl font-black text-center mb-8 md:mb-12">
              What Users Say
            </h2>
          </AnimatedSection>

          <div className="relative">
            <AnimatedSection animation="scale-up">
              <div className="bg-white rounded-3xl p-8 text-center">
                <div className="w-16 h-16 bg-sky-300 rounded-full mx-auto mb-4 flex items-center justify-center text-2xl font-black">
                  {testimonials[currentTestimonial].avatar}
                </div>
                <h3 className="font-black text-xl mb-2">
                  {testimonials[currentTestimonial].name}
                </h3>
                <p className="text-gray-600 mb-4 font-semibold">
                  {testimonials[currentTestimonial].city}
                </p>

                <div className="flex justify-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < testimonials[currentTestimonial].rating
                          ? "text-brand fill-current"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>

                <blockquote className="text-lg italic mb-6 font-semibold">
                  "{testimonials[currentTestimonial].comment}"
                </blockquote>

                <div className="bg-green-100 text-green-800 inline-block px-4 py-2 rounded-full font-black">
                  Saved: {testimonials[currentTestimonial].savings}
                </div>
              </div>
            </AnimatedSection>

            <div className="flex justify-center mt-6 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-colors duration-200 ${
                    index === currentTestimonial ? "bg-brand" : "bg-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Stats */}
          <AnimatedSection delay={400}>
            <div className="grid grid-cols-3 gap-8 mt-16 text-center">
              <div>
                <div className="text-3xl font-black text-brand mb-2">100k+</div>
                <div className="text-gray-600 font-bold">Happy Customers</div>
              </div>
              <div>
                <div className="text-3xl font-black text-brand mb-2">120+</div>
                <div className="text-gray-600 font-bold">Cities</div>
              </div>
              <div>
                <div className="text-3xl font-black text-brand mb-2">€2M+</div>
                <div className="text-gray-600 font-bold">Total Savings</div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 md:py-16 px-4 bg-neutral-100 relative z-10">
        <div className="max-w-4xl mx-auto">
          <AnimatedSection>
            <h2 className="font-display text-xl md:text-2xl lg:text-3xl font-black text-center mb-6 md:mb-8">
              Frequently Asked Questions
            </h2>
          </AnimatedSection>

          <AnimatedSection delay={200}>
            <div className="relative mb-8">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search questions..."
                value={faqSearch}
                onChange={(e) => setFaqSearch(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand/20 font-semibold"
              />
            </div>
          </AnimatedSection>

          <div className="space-y-4">
            {filteredFAQs.map((faq, index) => (
              <AnimatedSection
                key={index}
                animation="fade-up"
                delay={index * 100}
              >
                <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
                  <button
                    onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                    className="w-full p-6 text-left flex justify-between items-center hover:bg-gray-50 transition-colors duration-200"
                  >
                    <h3 className="font-black text-lg pr-4">{faq.question}</h3>
                    <ChevronDown
                      className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${
                        openFAQ === index ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  <div
                    className={`overflow-hidden transition-all duration-300 ease-out ${
                      openFAQ === index
                        ? "max-h-96 opacity-100"
                        : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="px-6 pb-6 text-gray-600 font-semibold">
                      {faq.answer}
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-12 md:py-16 px-4 bg-black text-white relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <AnimatedSection>
            <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-black mb-6 md:mb-8">
              Ready to Save on Delivery?
            </h2>
            <p className="text-lg md:text-xl text-gray-300 mb-6 md:mb-8 font-bold">
              Join thousands of satisfied users
            </p>
            <Button
              onClick={copyPromoCode}
              size="lg"
              className="bg-brand hover:bg-brand/90 text-black font-black rounded-2xl px-8 py-4 text-lg"
            >
              {copiedCode ? (
                <Check className="w-5 h-5 mr-2" />
              ) : (
                <Copy className="w-5 h-5 mr-2" />
              )}
              {copiedCode ? "Code Copied!" : "Get Discount Now"}
            </Button>
          </AnimatedSection>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white py-12 px-4 border-t border-gray-200 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-black text-lg mb-4">DeliveryDiscount</h3>
              <p className="text-gray-600 text-sm font-semibold">
                Save on delivery with the best services
              </p>
            </div>

            <div className="text-center">
              <h4 className="font-black mb-4">Поддержка</h4>
              <div className="space-y-3">
                <Link
                  to="/faq"
                  className="flex items-center justify-center space-x-2 bg-brand/10 hover:bg-brand/20 px-4 py-3 rounded-2xl transition-colors group"
                >
                  <HelpCircle className="w-5 h-5 text-brand group-hover:scale-110 transition-transform" />
                  <span className="text-black font-black">FAQ</span>
                </Link>
                <Link
                  to="/contact"
                  className="flex items-center justify-center space-x-2 bg-gray-100 hover:bg-gray-200 px-4 py-3 rounded-2xl transition-colors group"
                >
                  <MessageSquare className="w-5 h-5 text-gray-700 group-hover:scale-110 transition-transform" />
                  <span className="text-black font-black">Контакты</span>
                </Link>
              </div>
            </div>

            <div className="text-center md:text-right">
              <h4 className="font-black mb-4">Связь</h4>
              <p className="text-gray-600 text-sm font-semibold mb-2">
                support@deliverydiscount.com
              </p>
              <p className="text-gray-600 text-xs font-medium">
                24/7 поддержка
              </p>
            </div>
          </div>

          <div className="border-t border-gray-200 mt-8 pt-8 text-center text-sm text-gray-500">
            © 2025 DeliveryDiscount — All rights reserved
          </div>
        </div>
      </footer>

      {/* Partner Modal */}
      {showPartnerModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-8 max-w-lg w-full">
            {(() => {
              const partner = partners.find((p) => p.name === showPartnerModal);
              return partner ? (
                <div className="text-center">
                  <div
                    className={`w-20 h-20 ${partner.color} rounded-2xl mx-auto mb-4 flex items-center justify-center text-white text-2xl font-black`}
                  >
                    {partner.logo}
                  </div>
                  <h3 className="text-2xl font-black mb-4">{partner.name}</h3>
                  <p className="text-gray-600 mb-6 font-semibold">
                    {partner.description}
                  </p>
                  <p className="text-sm text-gray-500 mb-6 font-semibold">
                    Available in: {partner.cities}
                  </p>
                  <div className="space-y-3">
                    <Button
                      className="w-full bg-brand hover:bg-brand/90 text-black rounded-2xl font-black"
                      onClick={() => window.open(partner.deepLink, "_blank")}
                    >
                      Open in App
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full rounded-2xl font-bold"
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

      {/* Map Modal */}
      {showMapModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-8 max-w-lg w-full">
            {(() => {
              const location = mapLocations.find(
                (l) => l.region === showMapModal,
              );
              return location ? (
                <div>
                  <h3 className="text-2xl font-black mb-4">
                    {location.region}
                  </h3>
                  <div className="space-y-4 mb-6">
                    <div>
                      <h4 className="font-black mb-2">Countries:</h4>
                      <p className="text-gray-600 font-semibold">
                        {location.countries.join(", ")}
                      </p>
                    </div>
                    <div>
                      <h4 className="font-black mb-2">Available Services:</h4>
                      <p className="text-gray-600 font-semibold">
                        {location.partners.join(", ")}
                      </p>
                    </div>
                    <div>
                      <h4 className="font-black mb-2">Example Savings:</h4>
                      <p className="text-brand font-black">
                        {location.exampleDelivery}
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    className="w-full rounded-2xl font-bold"
                    onClick={() => setShowMapModal(null)}
                  >
                    Close
                  </Button>
                </div>
              ) : null;
            })()}
          </div>
        </div>
      )}

      {/* Bonus Popup */}
      <BonusPopup
        isOpen={showBonusPopup}
        onClose={() => setShowBonusPopup(false)}
      />
    </div>
  );
}
