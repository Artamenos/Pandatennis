import Link from "next/link";
import { MapPin, MessageCircle, Phone } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="site-footer section-blue">
      <div className="container">
        <div className="footer-grid">
          <div>
            <a className="brand" href="#top">PandaTennis</a>
            <p>Теннис и падел с личным тренером.</p>
          </div>
          <nav aria-label="Навигация в подвале">
            <a href="#formats">Занятия</a>
            <a href="#courts">Корты</a>
            <a href="#reviews">Отзывы</a>
            <a href="#contacts">Контакты</a>
          </nav>
          <div className="footer-contacts">
            <p><Phone aria-hidden="true" /><span>+7 (___) ___-__-__</span></p>
            <p><MessageCircle aria-hidden="true" /><span>@ник_тренера</span></p>
            <p><MapPin aria-hidden="true" /><span>Город и районы уточняются</span></p>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© PandaTennis</span>
          <Link href="/privacy/">Политика конфиденциальности</Link>
        </div>
      </div>
    </footer>
  );
}
