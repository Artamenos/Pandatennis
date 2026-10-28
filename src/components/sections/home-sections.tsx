import { QuickFaq } from "@/components/interactive/quick-faq";
import{Phone,Quote}from"lucide-react";import Image from"next/image";import type{CSSProperties}from"react";import{Media}from"@/components/ui/media";import{ContentIcon}from"@/components/ui/icon";import{ContactButton}from"@/components/interactive/contact-provider";import{CourtPicker}from"@/components/interactive/court-picker";import{TrainingJourney}from"@/components/interactive/training-journey";import type{SiteContent}from"@/types/content";
export function Hero({content}:{content:SiteContent["hero"]}){return <><section className="hero" id="top" aria-labelledby="hero-title"><Media file="match-action.jpg" alt="Тренер встречает мяч на корте для падела" className="hero-photo" position="center bottom" priority/><div className="hero-shade"/><div className="container hero-content"><div className="hero-copy"><p className="hero-eyebrow">{content.eyebrow}</p><h1 id="hero-title" aria-label={content.title.replace(/\n/g," ")}><span className="hero-title-lines" aria-hidden="true">{content.title.split("\n").map((line,index)=><span className="hero-title-line" key={line} style={{"--hero-optical-offset":index===0?"-.08em":"-.03em"} as CSSProperties}>{line}</span>)}</span></h1><p className="hero-description">{content.description}</p><ContactButton className="button-accent">{content.primaryAction.label}</ContactButton><p className="hero-helper">Для начинающих и продолжающих</p></div></div></section></>;}
export function Achievements({ metrics }: { metrics: SiteContent["metrics"] }) {
  return (
    <section className="achievements" id="coach" aria-labelledby="coach-title">
      <div className="accent-ribbon"><div className="container">ТЕННИС / ПАДЕЛ / ВАШ ХАРАКТЕР</div></div>
      <div className="container achievement-content">
        <div className="section-heading achievement-heading">
          <h2 id="coach-title">Опыт на корте.<br />Внимание к вашей игре.</h2>
          <p>Тренировки по теннису и паделу.<br />От первого удара до уверенной игры.</p>
        </div>
        <div className="metrics">
          {metrics.map(metric => (
            <div className="metric" key={metric.icon} data-placeholder={metric.placeholder}>
              <div className="metric-number"><ContentIcon name={metric.icon} size={36} /><strong>{metric.value}</strong></div>
              <div className="metric-label"><span>{metric.label}</span></div>
            </div>
          ))}
        </div>
        <div className="achievement-photos">
          <Media file="podium.jpg" alt="Участники турнира на награждении" position="center 27%" />
          <Media file="trophies.jpg" alt="Турнирные кубки и награды" position="center 30%" />
        </div>
      </div>
    </section>
  );
}
export function Formats({formats}:{formats:SiteContent["formats"]}){return <section className="formats section-blue" id="formats" aria-labelledby="formats-title"><div className="container"><h2 id="formats-title">Каждому — своя игра.</h2><p className="section-intro">Выберите свой формат занятий.</p><div className="formats-grid">{formats.map(format=><article className="format-card" key={format.id}><Media file={format.image} alt={format.id==="children"?"Тренер помогает ребёнку освоить удар":`Тренировка: ${format.title.toLowerCase()}`} position={format.position}/><div className="format-body"><h3><ContentIcon name={format.icon}/>{format.title}</h3><p>{format.description}</p><div className="format-action"><ContactButton subject={format.title}>Обсудить формат</ContactButton></div></div></article>)}</div></div></section>;}
export function Courts({courts}:{courts:SiteContent["courts"]}){return <section className="courts" id="courts" aria-labelledby="courts-title"><div className="container"><div className="section-heading courts-heading"><h2 id="courts-title">Мои корты.</h2><p>Выберите площадку в списке или на карте.</p></div><CourtPicker courts={courts}/></div></section>;}
export function Journey({steps}:{steps:SiteContent["steps"]}){return <section className="journey section-blue" id="approach" aria-labelledby="journey-title"><div className="container"><h2 id="journey-title">Шаг за шагом — к розыгрышу.</h2><TrainingJourney steps={steps}/></div></section>;}
export function Reviews({reviews}:{reviews:SiteContent["reviews"]}){return <section className="reviews" id="reviews" aria-labelledby="reviews-title"><div className="container"><h2 id="reviews-title">У каждого — свой прогресс.</h2><p className="section-note review-disclaimer" data-placeholder="[[PLACEHOLDER:REAL_REVIEWS]]">Демонстрационные отзывы — тексты и имена для макета.</p><div className="reviews-grid">{reviews.map(review=>{const face=review.portrait;return <article className="review-card" key={review.name}><div className="review-person"><div className="portrait" style={{"--face-width":face.width/face.diameter,"--face-height":face.height/face.diameter,"--face-x":.5-face.x/face.diameter,"--face-y":.5-face.y/face.diameter}as CSSProperties}><Image src={`/media/${face.image}`} alt="" width={face.width} height={face.height}/></div><div><h3>{review.name}</h3><p>{review.format}</p></div></div><Quote aria-hidden="true" size={24}/><blockquote>«{review.quote}»</blockquote></article>;})}</div></div></section>;}
export function Information({ questions }: { questions: SiteContent["questions"] }) {
  return (
    <section className="information" id="contacts" aria-labelledby="information-title">
      <div className="container information-grid">
        <div className="information-introduction">
          <h2 id="information-title">Встретимся на корте.</h2>
          <p className="information-intro">Обсудим ваш уровень, формат занятий и удобное время.</p>
          <div className="information-direct-contact" data-placeholder="[[PLACEHOLDER:COACH_CONTACTS]]">
            <span className="contact-label">Телефон тренера</span>
            <p className="phone-placeholder"><Phone size={22} aria-hidden="true" />+7 (___) ___-__-__</p>
            <ContactButton subject="Связаться с тренером">Написать в Telegram</ContactButton>
          </div>
        </div>
        <QuickFaq questions={questions} />
      </div>
    </section>
  );
}
