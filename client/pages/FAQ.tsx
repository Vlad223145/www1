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
        "Откройте приложение Wolt на вашем устройстве",
        "Выберите ресторан или магазин для заказа",
        "Добавьте товары в корзину и перейдите к оплате",
        "В ��азделе 'Промокод' введите код €20",
        "Скидка автоматически применится к заказу"
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
        "Запустите приложение Uber Eats",
        "Найдите нужный ресторан в вашем районе",
        "Соберите заказ и нажмите 'Корзина'",
        "На странице оплаты найдите поле 'Promo code'",
        "Введите €20 и нажмите 'Применить'"
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
        "Откройте Glovo и войдите в аккаунт",
        "Выберите категорию: еда, продукты или аптека",
        "Оформите заказ и перейдите к оплате", 
        "В разделе 'Промокоды' введите €20",
        "Подтвердите применение скидки"
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
        "Откройте приложение Deliveroo",
        "Выберите ресторан и добавьте блюда в корзину",
        "Перейдите к оформлению заказа",
        "Найдите поле 'Voucher code' на странице оплаты",
        "Введите €20 и активируйте скидку"
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
        "Запустите Bolt Food на телефоне",
        "Выберите ресторан в вашем городе",
        "Добавьте еду в корзину и перейдите к заказу",
        "На экране оплаты нажмите 'Add promo code'",
        "Вставьте код €20 и примените скидку"
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
        "Откройте DoorDash и выберите ресторан",
        "Соберите заказ и перейдите в корзину", 
        "На странице Checkout найдите 'Promo Code'",
        "Введите €20 в поле промокода",
        "Нажмите Apply ��ля активации скидки"
      ]
    },
  ];

  const faqs: FAQItem[] = [
    {
      question: "Как получить скидку €20 на доставку?",
      answer: "Скопируйте промокод €20 с нашего сайта и вставьте его при оформлении заказа в любом партнёрском приложении доставки.",
      details: "Промокод автоматически копируется при нажатии на кнопку 'Получить скидку'. Просто вставьте его в поле промокода при оплате заказа.",
      category: "general"
    },
    {
      question: "На какие сервисы доставки действует скидка?",
      answer: "Скидка работает с Wolt, Uber Eats, Glovo, DoorDash, Deliveroo, Bolt Food и другими партнёрскими сервисами.",
      details: "Полный список партнёров постоянно расширяется. Проверяйте актуальную информацию в разделе 'Партнёры' на главной странице.",
      category: "partnership"
    },
    {
      question: "Можно ли исполь��овать промокод несколько раз?",
      answer: "Промокод предназначен для одноразового использования новыми пользователями партнёрских сервисов.",
      details: "Каждый промокод действует один раз на пользователя. Для получения дополнительных скидок следите за новыми акциями на нашем сайте.",
      category: "general"
    },
    {
      question: "В каких странах и городах работает акция?",
      answer: "Акция доступна в 27 странах Европы, всех штатах США и большинстве провинций Канады - более 300 городов.",
      details: "География постоянно расширяется. Актуальный список городов доступен в разделе 'География' на главной странице.",
      category: "delivery"
    },
    {
      question: "Что делать, если промокод не работает?",
      answer: "Убедитесь, что правильно ввели код €20. Если проблема сохраняется, проверьте условия акции или обратитесь в поддержку.",
      details: "Частые причины: код уже использован, заказ меньше минимальной суммы, сервис не участвует в акции. Попробуйте обновить приложение.",
      category: "technical"
    },
    {
      question: "Есть ли минимальная сумма заказа для использования скидки?",
      answer: "Минимальная сумма заказа составляет €25. Скидка €20 применяется автоматически при достижении этой суммы.",
      details: "Минимальная сумма может отличаться в зависимости от региона и партнёрского сервиса. Проверяйте условия в приложении доставки.",
      category: "general"
    },
    {
      question: "Можно ли комбинировать скидку с другими акциями?",
      answer: "Как правило, промокод нельзя комбинировать с другими скидками, если это не указ��но отдельно в условиях акции.",
      details: "Каждый сервис доставки имеет свои правила комбинирования промокодов. Подробности смотрите в приложении при оформлении заказа.",
      category: "general"
    },
    {
      question: "Как скоро придёт заказ после применения скидки?",
      answer: "Время доставки зависит от выбранного сервиса и обычно составляет 25-45 минут. Скидка не влияет на скорость доставки.",
      details: "В крупных городах доставка обычно быстрее. Точное время показывается в приложении доставки при выборе ресторана.",
      category: "delivery"
    },
    {
      question: "Безопасно ли использовать наш сервис?",
      answer: "Да, мы используем SSL-шифрование и не собираем персональные данные. Промокоды предоставляются официальными партнёрами.",
      details: "Мы не запраши��аем данные банковских карт или личную информацию. Все платежи проходят через защищённые системы партнёрских сервисов.",
      category: "security"
    },
    {
      question: "Как часто появляются новые акции и промокоды?",
      answer: "Новые акции появляются еженедельно. Подпишитесь на уведомления, чтобы первыми узнавать о скидках.",
      details: "Следите за обновлениями на главной странице или подключите push-уведомления для получения актуальной информации об акциях.",
      category: "general"
    },
    {
      question: "Что делать, если приложение доставки не принимает промокод?",
      answer: "Попробуйте обновить приложение, перезапустить его или проверить правильность ввода кода. Обратитесь в службу поддержки приложения.",
      details: "Некоторые приложения требуют обновления для поддержки новых промокодов. Также убедитесь, что ваш аккаунт подходит под условия акции.",
      category: "technical"
    },
    {
      question: "Действует ли скидка на товары из магазинов и аптек?",
      answer: "Да, скидка действует не только на рестораны, но и на заказы из супермаркетов, аптек и других магазинов через партнёрские приложения.",
      details: "Доступность зависит от конкретного сервиса доставки. В Wolt и Glovo скидка работает на все категории товаров.",
      category: "delivery"
    },
    {
      question: "Можно ли использовать скидку для корпоративных заказов?",
      answer: "Промокод предназначен для личного использования. Для корпоративных клиентов есть отдельные программы скидок.",
      details: "Обратитесь к нам для получения информации о корпоративных ск��дках и специальных условиях для бизнес-клиентов.",
      category: "general"
    },
    {
      question: "Работает ли скидка в выходные и праздничные дни?",
      answer: "Да, скидка действует круглосуточно во все дни недели, включая выходные и праздники.",
      details: "Некоторые рестораны могут иметь ограниченное меню в праздники, но скидка остаётся активной при соблюдении минимальной суммы заказа.",
      category: "general"
    },
    {
      question: "Что делать, если деньги списались, но скидка не применилась?",
      answer: "Обратитесь в службу поддержки сервиса доставки с номером заказа. Они вернут разницу или зачислят бонусы на следующий заказ.",
      details: "Сохраняйте скриншоты с промокодом и чек заказа. Это поможет быстрее решить вопрос с возвратом средств.",
      category: "technical"
    },
    {
      question: "Можно ли передать промокод другому человеку?",
      answer: "Каждый промокод привязан к первому использованию. Если вы его не использовали, можете поделиться с друзьями.",
      details: "Рекомендуем каждому пользователю получать промокод самостоятельно с нашего сайта для гарантированной работы.",
      category: "general"
    },
    {
      question: "Влияет ли погода на возможность использования скидки?",
      answer: "Скидка доступна в любую погоду. Однако некоторые рестораны могут приостановить доставку при экстремальных погодных условиях.",
      details: "В случае плохой погоды время доставки может увеличиться, но скидка остаётся активной для всех работающих заведений.",
      category: "delivery"
    },
    {
      question: "Есть ли мобильное приложение для получения скидок?",
      answer: "У нас есть веб-версия сайта, оптимизированная для мобильных устройств. Мобильное приложение находится в разработке.",
      details: "Добавьте наш сайт на главный экран телефона для быстрого доступа к актуальным промокодам и акциям.",
      category: "technical"
    },
    {
      question: "Как узнать об истечении срока действия промокода?",
      answer: "Срок действия промокода указан на сайте. Обычно наши коды действуют 30 дней с момента получения.",
      details: "Используйте промокод как можно скорее после получения. Просроченные коды не восстанавливаются.",
      category: "general"
    },
    {
      question: "Что делать, если в моём городе нет партнёрских сервисов?",
      answer: "Список партнёров постоянно расширяется. Оставьте заявку, и мы уведомим вас о появлении сервисов в вашем регионе.",
      details: "Мы активно работаем над расширением географии и добавлением новых партнёров. Следите за обновлениями на сайте.",
      category: "partnership"
    }
  ];

  const categories = [
    { value: "all", label: "Все вопросы", icon: <AlertCircle className="w-4 h-4" /> },
    { value: "general", label: "Общие", icon: <Users className="w-4 h-4" /> },
    { value: "delivery", label: "Доставка", icon: <MapPin className="w-4 h-4" /> },
    { value: "partnership", label: "Партнёры", icon: <Star className="w-4 h-4" /> },
    { value: "technical", label: "Технические", icon: <Smartphone className="w-4 h-4" /> },
    { value: "security", label: "Безопасность", icon: <Shield className="w-4 h-4" /> },
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
                Главная
              </Link>
              <Link to="/faq" className="text-black font-black">
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
              <Link
                to="/contact"
                className="text-gray-600 hover:text-black transition-colors font-semibold"
              >
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
              Часто задаваемые
              <br />
              <span className="text-brand">вопросы</span>
            </h1>
          </AnimatedSection>

          <AnimatedSection animation="fade-up" delay={200}>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto font-semibold">
              Подробные ответы на в��е вопросы о сервисе скидок на доставку. 
              Пошаговые инструкции для каждого партнёрского приложения.
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
                placeholder="Поиск по вопросам..."
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
              Инструкции по партнёрам
            </h2>
            <p className="text-center text-gray-600 mb-8 md:mb-12 font-semibold">
              Пошаговые инструкции для каждого приложения доставки
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
                    Смотреть инструкцию
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
              <h3 className="text-xl font-black mb-2">Ничего не найдено</h3>
              <p className="text-gray-600 font-semibold">
                Попробуйте изменить поисковый запрос или выбрать другую категорию
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
                                <strong>Дополнительно:</strong> {faq.details}
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
                <h3 className="text-2xl font-black mb-4">Не нашли ответ?</h3>
                <p className="text-gray-600 mb-6 font-semibold">
                  Свяжитесь с нашей службой поддержки, и мы поможем решить любой вопрос в течение 24 часов
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    asChild
                    className="bg-brand hover:bg-brand/90 text-black rounded-2xl font-black"
                  >
                    <Link to="/contact">Связаться с поддержкой</Link>
                  </Button>
                  <Button 
                    asChild 
                    variant="outline" 
                    className="rounded-2xl font-bold border-gray-300"
                  >
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
                      Пошаговая инструкция:
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
                      Промокод:
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
                      Открыть приложение
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full rounded-2xl font-bold border-gray-300"
                      onClick={() => setShowPartnerModal(null)}
                    >
                      Закрыть
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
            © 2025 DeliveryDiscount — Все права защищены
          </p>
        </div>
      </footer>
    </div>
  );
}
