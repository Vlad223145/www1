import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Mail, MapPin, Phone, Send, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import AnimatedSection from "@/components/AnimatedSection";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setIsSubmitted(true);

    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: "", email: "", message: "" });
    }, 3000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
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
              <Link to="/contact" className="text-foreground font-medium">
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
              Свяжитесь
              <br />
              <span className="bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
                с нами
              </span>
            </h1>
          </AnimatedSection>

          <AnimatedSection animation="fade-up" delay={200}>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Есть вопросы? Мы всегда готовы помочь и ответить на любые ваши
              вопросы
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Contact Form and Info */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <AnimatedSection animation="slide-right">
              <div className="bg-card rounded-3xl p-8 shadow-apple">
                <h2 className="text-2xl font-bold mb-6">Напишите нам</h2>

                {isSubmitted ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Mail className="w-8 h-8 text-green-600" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">
                      Сообщение отправлено!
                    </h3>
                    <p className="text-muted-foreground">
                      Мы свяжемся с вами в ближайшее время.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium mb-2"
                      >
                        Имя
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-foreground/20 transition-all duration-200"
                        placeholder="Ваше имя"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium mb-2"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-foreground/20 transition-all duration-200"
                        placeholder="your@email.com"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="message"
                        className="block text-sm font-medium mb-2"
                      >
                        Сообщение
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={5}
                        className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-foreground/20 transition-all duration-200 resize-none"
                        placeholder="Ваше сообщение..."
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-foreground text-background hover:bg-foreground/90 rounded-xl py-3 text-lg font-semibold transition-all duration-200 hover:scale-[0.98]"
                    >
                      {isSubmitting ? (
                        <div className="flex items-center justify-center">
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-background mr-2"></div>
                          Отправляется...
                        </div>
                      ) : (
                        <div className="flex items-center justify-center">
                          <Send className="w-5 h-5 mr-2" />
                          Отправить сообщение
                        </div>
                      )}
                    </Button>
                  </form>
                )}
              </div>
            </AnimatedSection>

            {/* Contact Info */}
            <AnimatedSection animation="slide-left">
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold mb-6">
                    Информация для связи
                  </h2>
                  <div className="space-y-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-muted rounded-xl flex items-center justify-center flex-shrink-0">
                        <Mail className="w-6 h-6 text-foreground" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">Email</h3>
                        <p className="text-muted-foreground">
                          support@deliverydiscount.com
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Ответим в течение 24 часов
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-muted rounded-xl flex items-center justify-center flex-shrink-0">
                        <Phone className="w-6 h-6 text-foreground" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">Телефон</h3>
                        <p className="text-muted-foreground">
                          +1 (555) 123-4567
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Пн-Пт 9:00-18:00 UTC
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-muted rounded-xl flex items-center justify-center flex-shrink-0">
                        <Clock className="w-6 h-6 text-foreground" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">Время работы</h3>
                        <p className="text-muted-foreground">
                          24/7 онлайн-поддержка
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Круглосуточная помощь
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Office Map Placeholder */}
                <div className="bg-card rounded-3xl p-8 shadow-apple">
                  <h3 className="text-xl font-semibold mb-4">Наш офис</h3>
                  <div className="w-full h-48 bg-gradient-to-br from-muted to-muted/50 rounded-2xl flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(120,119,198,0.3),transparent_50%),radial-gradient(circle_at_80%_80%,rgba(255,119,198,0.3),transparent_50%)] animate-pulse"></div>
                    <div className="text-center relative z-10">
                      <MapPin className="w-12 h-12 mx-auto mb-2 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">
                        123 Tech Street
                      </p>
                      <p className="text-sm text-muted-foreground">
                        San Francisco, CA 94105
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* FAQ Quick Links */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/20">
        <div className="max-w-4xl mx-auto">
          <AnimatedSection>
            <h2 className="text-3xl font-bold text-center mb-12">
              Быстрые ответы
            </h2>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                question: "Как получить скидку?",
                answer: "Введите промокод SAVE20 при заказе",
                link: "/faq",
              },
              {
                question: "На какие сервисы действует?",
                answer: "Wolt, Uber Eats, Glovo и другие",
                link: "/faq",
              },
              {
                question: "Безопасно ли это?",
                answer: "Да, мы используем SSL шифрование",
                link: "/trust",
              },
              {
                question: "Где работает акция?",
                answer: "В Европе, США и Канаде",
                link: "/#geography",
              },
            ].map((item, index) => (
              <AnimatedSection
                key={index}
                animation="fade-up"
                delay={index * 100}
              >
                <Link to={item.link} className="block">
                  <div className="bg-card rounded-2xl p-6 hover:shadow-apple-lg transition-all duration-300 hover:scale-105">
                    <h3 className="font-semibold mb-2">{item.question}</h3>
                    <p className="text-muted-foreground text-sm">
                      {item.answer}
                    </p>
                  </div>
                </Link>
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
                Нужна помощь прямо сейчас?
              </h3>
              <p className="text-muted-foreground mb-6">
                Проверьте наши часто задаваемые вопросы или вернитесь на главную
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  asChild
                  className="bg-foreground text-background hover:bg-foreground/90 rounded-3xl"
                >
                  <Link to="/faq">Посмотреть FAQ</Link>
                </Button>
                <Button asChild variant="outline" className="rounded-3xl">
                  <Link to="/">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Вернуться на глав��ую
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
