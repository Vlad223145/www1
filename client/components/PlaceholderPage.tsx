import { Button } from "@/components/ui/button";
import { ArrowLeft, Construction } from "lucide-react";
import { Link } from "react-router-dom";

interface PlaceholderPageProps {
  title: string;
  description: string;
}

export default function PlaceholderPage({
  title,
  description,
}: PlaceholderPageProps) {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="text-xl font-bold">
              DeliveryDiscount
            </Link>
            <div className="hidden md:flex space-x-8">
              <Link
                to="/"
                className="text-gray-600 hover:text-black transition-colors"
              >
                Главная
              </Link>
              <Link
                to="/faq"
                className="text-gray-600 hover:text-black transition-colors"
              >
                FAQ
              </Link>
              <Link
                to="/trust"
                className="text-gray-600 hover:text-black transition-colors"
              >
                Доверие
              </Link>
              <Link
                to="/about"
                className="text-gray-600 hover:text-black transition-colors"
              >
                О нас
              </Link>
              <Link
                to="/contact"
                className="text-gray-600 hover:text-black transition-colors"
              >
                Контакты
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Content */}
      <div className="min-h-[80vh] flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <div className="mb-8">
            <Construction className="w-16 h-16 mx-auto text-gray-400 mb-4" />
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-6">{title}</h1>
          <p className="text-xl text-gray-600 mb-8">{description}</p>

          <div className="bg-gray-50 rounded-2xl p-8 mb-8">
            <p className="text-gray-500 mb-4">
              Эта страница находится в разработке. Мы работаем над тем, чтобы
              предоставить вам наилучший опыт использования наших услуг.
            </p>
            <p className="text-sm text-gray-400">
              Пожалуйста, вернитесь позже или свяжитесь с нами, если у вас есть
              вопросы.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              className="bg-black text-white hover:bg-gray-900 rounded-3xl"
            >
              <Link to="/">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Вернуться на главную
              </Link>
            </Button>
            <Button variant="outline" className="rounded-3xl">
              Связаться с нами
            </Button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-sm text-gray-500">
            © 2024 DeliveryDiscount. Все права защищены.
          </p>
        </div>
      </footer>
    </div>
  );
}
