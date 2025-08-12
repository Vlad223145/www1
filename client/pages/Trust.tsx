import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Shield,
  CheckCircle,
  Award,
  Star,
  ChevronLeft,
  ChevronRight,
  Lock,
  Users,
  Zap,
} from "lucide-react";
import { Link } from "react-router-dom";
import AnimatedSection from "@/components/AnimatedSection";

interface Review {
  name: string;
  rating: number;
  comment: string;
  service: string;
  savings: string;
}

export default function Trust() {
  const [currentReview, setCurrentReview] = useState(0);

  const reviews: Review[] = [
    {
      name: "Анна К.",
      rating: 5,
      comment:
        "Отличная скидка! Уже несколько раз заказывала через Wolt, всё работает как часы.",
      service: "Wolt",
      savings: "47€",
    },
    {
      name: "Михаил П.",
      rating: 5,
      comment:
        "Супер удобно, промокод применяется мгновенно. Сэкономил уже больше 60 евро!",
      service: "Uber Eats",
      savings: "63€",
    },
    {
      name: "Елена В.",
      rating: 4,
      comment:
        "Хорошая акция, пользуюсь уже месяц. Единственное - не во всех городах работает.",
      service: "Glovo",
      savings: "34€",
    },
    {
      name: "Дмитрий Л.",
      rating: 5,
      comment:
        "Просто и понятно. Ввёл код и сразу получил скидку 20€. Рекомендую!",
      service: "DoorDash",
      savings: "20€",
    },
  ];

  const partners = [
    { name: "Wolt", color: "bg-blue-500" },
    { name: "Uber Eats", color: "bg-green-500" },
    { name: "Glovo", color: "bg-yellow-500" },
    { name: "DoorDash", color: "bg-red-500" },
    { name: "Deliveroo", color: "bg-teal-500" },
    { name: "Bolt Food", color: "bg-orange-500" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentReview((prev) => (prev + 1) % reviews.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [reviews.length]);

  const nextReview = () => {
    setCurrentReview((prev) => (prev + 1) % reviews.length);
  };

  const prevReview = () => {
    setCurrentReview((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="text-xl font-bold">
              DeliveryDiscount
            </Link>
            <div className="hidden md:flex space-x-8">
              <Link
                to="/"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Главная
              </Link>
              <Link
                to="/faq"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                FAQ
              </Link>
              <Link to="/trust" className="text-foreground font-medium">
                Доверие
              </Link>
              <Link
                to="/about"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                О нас
              </Link>
              <Link
                to="/contact"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Контакты
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background to-muted/20">
        <div className="max-w-4xl mx-auto text-center">
          <AnimatedSection animation="fade-up">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Доверие и
              <br />
              <span className="bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
                безопасность
              </span>
            </h1>
          </AnimatedSection>

          <AnimatedSection animation="fade-up" delay={200}>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Узнайте, как мы защищаем ваши данные и обеспечиваем безопасность
              платежей
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Trust Features */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
              Почему нам можно доверять
            </h2>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Users className="w-12 h-12" />,
                title: "Работаем с крупнейшими сервисами доставки",
                description:
                  "Официальное партнёрство с ведущими платформами доставки",
                delay: 0,
              },
              {
                icon: <CheckCircle className="w-12 h-12" />,
                title: "Скидки действуют официально",
                description:
                  "Все промокоды предоставлены напрямую от партнёров",
                delay: 200,
              },
              {
                icon: <Lock className="w-12 h-12" />,
                title: "Данные пользователей защищены",
                description: "Шифрование по стандарту SSL, соответствие GDPR",
                delay: 400,
              },
            ].map((feature, index) => (
              <AnimatedSection
                key={index}
                animation="fade-up"
                delay={feature.delay}
              >
                <div className="text-center group">
                  <div className="mb-6 flex justify-center">
                    <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center group-hover:bg-foreground group-hover:text-background transition-all duration-300 hover:scale-110">
                      {feature.icon}
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/20">
        <div className="max-w-4xl mx-auto">
          <AnimatedSection>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
              Отзывы пользователей
            </h2>
          </AnimatedSection>

          <div className="relative">
            <AnimatedSection animation="scale-up">
              <div className="bg-card rounded-3xl p-8 shadow-apple">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                      {reviews[currentReview].name[0]}
                    </div>
                    <div>
                      <h4 className="font-semibold">
                        {reviews[currentReview].name}
                      </h4>
                      <div className="flex items-center space-x-2">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < reviews[currentReview].rating
                                  ? "text-yellow-400 fill-current"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {reviews[currentReview].service}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-green-600">
                      -{reviews[currentReview].savings}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      сэкономлено
                    </div>
                  </div>
                </div>

                <blockquote className="text-lg text-muted-foreground italic">
                  "{reviews[currentReview].comment}"
                </blockquote>
              </div>
            </AnimatedSection>

            <div className="flex justify-center mt-8 space-x-4">
              <Button
                variant="outline"
                size="icon"
                onClick={prevReview}
                className="rounded-full"
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={nextReview}
                className="rounded-full"
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>

            <div className="flex justify-center mt-4 space-x-2">
              {reviews.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentReview(index)}
                  className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                    index === currentReview
                      ? "bg-foreground"
                      : "bg-muted-foreground/30"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
              Наши партнёры
            </h2>
          </AnimatedSection>

          <div className="flex flex-wrap justify-center items-center gap-8">
            {partners.map((partner, index) => (
              <AnimatedSection
                key={index}
                animation="scale-up"
                delay={index * 100}
              >
                <div className="flex items-center space-x-3 bg-card rounded-2xl p-4 shadow-apple hover:shadow-apple-lg transition-all duration-300 hover:scale-105">
                  <div
                    className={`w-10 h-10 ${partner.color} rounded-full flex items-center justify-center text-white font-bold`}
                  >
                    {partner.name[0]}
                  </div>
                  <span className="font-semibold">{partner.name}</span>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Security Features */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-foreground text-background">
        <div className="max-w-7xl mx-auto text-center">
          <AnimatedSection>
            <h2 className="text-3xl md:text-4xl font-bold mb-16">
              Безопасность на первом месте
            </h2>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: <Shield className="w-8 h-8" />, text: "SSL шифрование" },
              {
                icon: <Award className="w-8 h-8" />,
                text: "GDPR соответствие",
              },
              { icon: <Zap className="w-8 h-8" />, text: "Быстрые транзакции" },
            ].map((feature, index) => (
              <AnimatedSection
                key={index}
                animation="fade-up"
                delay={index * 200}
              >
                <div className="flex flex-col items-center">
                  <div className="mb-4">{feature.icon}</div>
                  <p className="text-background/70">{feature.text}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <AnimatedSection animation="scale-up">
            <div className="bg-card rounded-3xl p-8 shadow-apple">
              <h3 className="text-2xl font-bold mb-4">
                Готовы начать экономить?
              </h3>
              <p className="text-muted-foreground mb-6">
                Присоединяйтесь к тысячам довольных пользователей
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  asChild
                  className="bg-foreground text-background hover:bg-foreground/90 rounded-3xl"
                >
                  <Link to="/">Получить скидку</Link>
                </Button>
                <Button asChild variant="outline" className="rounded-3xl">
                  <Link to="/">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Вернуться на главную
                  </Link>
                </Button>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted/20 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-sm text-muted-foreground">
            © 2024 DeliveryDiscount. Все права защищены.
          </p>
        </div>
      </footer>
    </div>
  );
}
