import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Mail, MapPin, Phone, Send, Clock, Check, MessageSquare } from "lucide-react";
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
  const [errors, setErrors] = useState({
    email: "",
    message: "",
  });

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = () => {
    const newErrors = { email: "", message: "" };
    let isValid = true;

    if (!formData.email || !validateEmail(formData.email)) {
      newErrors.email = "Пожалуйста, введите корректный email адрес";
      isValid = false;
    }

    if (!formData.message || formData.message.trim().length < 10) {
      newErrors.message = "Сообщение должно содержать минимум 10 символов";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setIsSubmitted(true);

    // Reset form after showing success message
    setTimeout(() => {
      setFormData({ name: "", email: "", message: "" });
      setErrors({ email: "", message: "" });
    }, 500);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear errors as user types
    if (errors.email && name === "email" && validateEmail(value)) {
      setErrors({ ...errors, email: "" });
    }
    if (errors.message && name === "message" && value.trim().length >= 10) {
      setErrors({ ...errors, message: "" });
    }
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
                Главная
              </Link>
              <Link
                to="/faq"
                className="text-gray-600 hover:text-black transition-colors font-semibold"
              >
                FAQ
              </Link>
              <Link
                to="/trust"
                className="text-gray-600 hover:text-black transition-colors font-semibold"
              >
                Доверие
              </Link>
              <Link
                to="/about"
                className="text-gray-600 hover:text-black transition-colors font-semibold"
              >
                О нас
              </Link>
              <Link to="/contact" className="text-black font-black">
                Контакты
              </Link>
            </div>
            <Button
              onClick={handleBackClick}
              variant="outline"
              size="sm"
              className="rounded-xl border-gray-300 hover:bg-gray-50"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Назад
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <AnimatedSection animation="fade-up">
            <h1 className="font-display text-4xl md:text-6xl font-black mb-6 leading-tight">
              Свяжитесь
              <br />
              <span className="text-brand">с нами</span>
            </h1>
          </AnimatedSection>

          <AnimatedSection animation="fade-up" delay={200}>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto font-semibold">
              Есть вопросы о скидках на доставку? Мы всегда готовы помочь и 
              ответить на любые ваши вопросы в течение 24 часов
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Contact Form and Info */}
      <section className="py-16 md:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Contact Form */}
            <AnimatedSection animation="slide-right">
              <div className="bg-white rounded-3xl p-8 shadow-apple border border-gray-100">
                <h2 className="text-2xl font-black mb-6">Напишите нам</h2>

                {isSubmitted ? (
                  <div className="text-center py-12">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Check className="w-10 h-10 text-green-600" />
                    </div>
                    <h3 className="text-xl font-black mb-3">
                      Сообщение отправлено!
                    </h3>
                    <p className="text-gray-600 font-semibold mb-6">
                      Спасибо за ваше сообщение! Мы обязательно свяжемся с вами 
                      в течение 24 часов.
                    </p>
                    <Button
                      onClick={() => setIsSubmitted(false)}
                      variant="outline"
                      className="rounded-2xl font-bold"
                    >
                      Написать еще одно сообщение
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-black mb-2"
                      >
                        Имя
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand transition-all duration-200 font-semibold"
                        placeholder="Ваше имя"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-black mb-2"
                      >
                        Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className={`w-full px-4 py-3 bg-gray-50 border rounded-2xl focus:outline-none focus:ring-2 transition-all duration-200 font-semibold ${
                          errors.email 
                            ? "border-red-300 focus:ring-red-200 focus:border-red-400" 
                            : "border-gray-200 focus:ring-brand/20 focus:border-brand"
                        }`}
                        placeholder="your@email.com"
                      />
                      {errors.email && (
                        <p className="text-red-500 text-sm mt-2 font-semibold">
                          {errors.email}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="message"
                        className="block text-sm font-black mb-2"
                      >
                        Сообщен��е *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={5}
                        className={`w-full px-4 py-3 bg-gray-50 border rounded-2xl focus:outline-none focus:ring-2 transition-all duration-200 resize-none font-semibold ${
                          errors.message 
                            ? "border-red-300 focus:ring-red-200 focus:border-red-400" 
                            : "border-gray-200 focus:ring-brand/20 focus:border-brand"
                        }`}
                        placeholder="Расскажите подробнее о вашем вопросе..."
                      />
                      {errors.message && (
                        <p className="text-red-500 text-sm mt-2 font-semibold">
                          {errors.message}
                        </p>
                      )}
                      <p className="text-gray-500 text-xs mt-2 font-medium">
                        Минимум 10 символов
                      </p>
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-brand hover:bg-brand/90 text-black rounded-2xl py-4 text-lg font-black transition-all duration-200 hover:scale-[0.98]"
                    >
                      {isSubmitting ? (
                        <div className="flex items-center justify-center">
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-black mr-3"></div>
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
                  <h2 className="text-2xl font-black mb-6">
                    Информация для связи
                  </h2>
                  <div className="space-y-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-14 h-14 bg-brand/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                        <Mail className="w-7 h-7 text-brand" />
                      </div>
                      <div>
                        <h3 className="font-black mb-1">Email</h3>
                        <p className="text-gray-600 font-semibold">
                          support@deliverydiscount.com
                        </p>
                        <p className="text-sm text-gray-500 font-medium">
                          Ответим в течение 24 часов
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="w-14 h-14 bg-brand/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                        <MessageSquare className="w-7 h-7 text-brand" />
                      </div>
                      <div>
                        <h3 className="font-black mb-1">Telegram</h3>
                        <p className="text-gray-600 font-semibold">
                          @deliverydiscount_support
                        </p>
                        <p className="text-sm text-gray-500 font-medium">
                          Быстрая поддержка в мессенджере
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="w-14 h-14 bg-brand/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                        <Clock className="w-7 h-7 text-brand" />
                      </div>
                      <div>
                        <h3 className="font-black mb-1">Время работы</h3>
                        <p className="text-gray-600 font-semibold">
                          24/7 онлайн-поддержка
                        </p>
                        <p className="text-sm text-gray-500 font-medium">
                          Круглосуточная помощь по всем вопросам
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Office Info */}
                <div className="bg-white rounded-3xl p-8 shadow-apple border border-gray-100">
                  <h3 className="text-xl font-black mb-4">Наша команда</h3>
                  <div className="w-full h-48 bg-gradient-to-br from-brand/20 to-brand/5 rounded-2xl flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(255,180,0,0.3),transparent_50%),radial-gradient(circle_at_80%_80%,rgba(255,180,0,0.2),transparent_50%)] animate-pulse"></div>
                    <div className="text-center relative z-10">
                      <div className="flex justify-center mb-4">
                        <div className="w-12 h-12 bg-brand rounded-full flex items-center justify-center text-black font-black text-lg mr-2">
                          D
                        </div>
                        <div className="w-12 h-12 bg-gray-600 rounded-full flex items-center justify-center text-white font-black text-lg">
                          D
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 font-bold">
                        Команда DeliveryDiscount
                      </p>
                      <p className="text-xs text-gray-500 font-medium">
                        Работаем для ваших скидок
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
      <section className="py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <AnimatedSection>
            <h2 className="text-3xl font-black text-center mb-12">
              Быстрые ответы
            </h2>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                question: "Как получить скидку €20?",
                answer: "Скопируйте промокод и вставьте при заказе в приложении",
                link: "/faq",
              },
              {
                question: "На какие сервисы действует?",
                answer: "Wolt, Uber Eats, Glovo, DoorDash и другие",
                link: "/faq",
              },
              {
                question: "Безопасно ли это?",
                answer: "Да, мы используем SSL шифрование и не сохраняем личные данные",
                link: "/trust",
              },
              {
                question: "В каких странах работает?",
                answer: "27 стран Европы, США и Кан��да",
                link: "/#geography",
              },
            ].map((item, index) => (
              <AnimatedSection
                key={index}
                animation="fade-up"
                delay={index * 100}
              >
                <Link to={item.link} className="block">
                  <div className="bg-white rounded-2xl p-6 hover:shadow-apple-lg transition-all duration-300 hover:scale-105 border border-gray-100">
                    <h3 className="font-black mb-2">{item.question}</h3>
                    <p className="text-gray-600 text-sm font-semibold">
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
      <section className="py-16 md:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <AnimatedSection animation="scale-up">
            <div className="bg-white rounded-3xl p-8 shadow-apple border border-gray-100">
              <h3 className="text-2xl font-black mb-4">
                Нужна помощь прямо сейчас?
              </h3>
              <p className="text-gray-600 mb-6 font-semibold">
                Проверьте наши часто задаваемые вопросы или вернитесь на главную
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  asChild
                  className="bg-brand hover:bg-brand/90 text-black rounded-2xl font-black"
                >
                  <Link to="/faq">Посмотреть FAQ</Link>
                </Button>
                <Button 
                  asChild 
                  variant="outline" 
                  className="rounded-2xl font-bold border-gray-300"
                  onClick={handleBackClick}
                >
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
      <footer className="bg-neutral-900 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-sm text-gray-400 font-semibold">
            © 2025 DeliveryDiscount — Все права защищены
          </p>
        </div>
      </footer>
    </div>
  );
}
