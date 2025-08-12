import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import AnimatedSection from "@/components/AnimatedSection";

interface FAQItem {
  question: string;
  answer: string;
  details?: string;
}

export default function FAQ() {
  const [openItem, setOpenItem] = useState<number | null>(null);

  const faqs: FAQItem[] = [
    {
      question: "Как получить скидку?",
      answer:
        "Просто введите промокод SAVE20 при оформлении заказа в любом из поддерживаемых приложений доставки.",
      details:
        "Скидка применяется автоматически после ввода кода. Если возникли проблемы, свяжитесь с нашей поддержкой.",
    },
    {
      question: "На какие сервисы она действует?",
      answer:
        "Скидка действует на Wolt, Uber Eats, Glovo, DoorDash, Deliveroo, Bolt Food и другие партнёрские сервисы.",
      details:
        "Полный список доступных сервисов можно посмотреть на главной странице в разделе 'Поддерживаемые сервисы'.",
    },
    {
      question: "Можно ли использовать несколько раз?",
      answer:
        "Да, вы можете использовать скидку на каждый заказ в течение действия акции.",
      details:
        "Акция действует до конца года или до исчерпания лимита использований.",
    },
    {
      question: "Действует ли в моём городе?",
      answer:
        "Скидка доступна в 27 странах Европы, всех штатах США и большинстве провинций Канады.",
      details:
        "Проверьте доступность в разделе 'География акции' на главной странице.",
    },
    {
      question: "Что делать, если промоко�� не работает?",
      answer:
        "Убедитесь, что вы правильно ввели код SAVE20. Если проблема сохраняется, обратитесь в службу поддержки.",
      details:
        "Наша служба поддержки работает 24/7 и готова помочь решить любые вопросы.",
    },
  ];

  const toggleItem = (index: number) => {
    setOpenItem(openItem === index ? null : index);
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
              <Link to="/faq" className="text-foreground font-medium">
                FAQ
              </Link>
              <Link
                to="/trust"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
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
              Часто задаваемые
              <br />
              <span className="bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
                вопросы
              </span>
            </h1>
          </AnimatedSection>

          <AnimatedSection animation="fade-up" delay={200}>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Ответы на самые популярные вопросы о нашем сервисе скидок на
              доставку
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <AnimatedSection
                key={index}
                animation="fade-up"
                delay={index * 100}
              >
                <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-apple hover:shadow-apple-lg transition-shadow duration-300">
                  <button
                    onClick={() => toggleItem(index)}
                    className="w-full p-6 text-left flex justify-between items-center hover:bg-muted/50 transition-colors duration-200"
                  >
                    <h3 className="text-lg font-semibold pr-4">
                      {faq.question}
                    </h3>
                    <ChevronDown
                      className={`w-5 h-5 text-muted-foreground transition-transform duration-300 ${
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
                      <div className="border-t border-border pt-4">
                        <p className="text-muted-foreground mb-4">
                          {faq.answer}
                        </p>
                        {faq.details && (
                          <div className="bg-muted rounded-xl p-4">
                            <p className="text-sm text-muted-foreground">
                              {faq.details}
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

          {/* Contact Section */}
          <AnimatedSection animation="fade-up" delay={600}>
            <div className="mt-16 text-center">
              <div className="bg-card rounded-3xl p-8 shadow-apple">
                <h3 className="text-2xl font-bold mb-4">Не нашли ответ?</h3>
                <p className="text-muted-foreground mb-6">
                  Свяжитесь с нашей службой поддержки, и мы поможем решить любой
                  вопрос
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button className="bg-foreground text-background hover:bg-foreground/90 rounded-3xl">
                    Связаться с поддержкой
                  </Button>
                  <Button asChild variant="outline" className="rounded-3xl">
                    <Link to="/">
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Вернуться на главную
                    </Link>
                  </Button>
                </div>
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
