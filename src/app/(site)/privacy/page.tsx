import Link from "next/link";
import type{Metadata}from"next";
export const metadata:Metadata={title:"Политика конфиденциальности",robots:{index:false,follow:false}};
export default function PrivacyPage(){return <main className="legal-page container"><Link className="brand" href="/">PandaTennis</Link><h1>Политика конфиденциальности</h1><p data-placeholder="[[PLACEHOLDER:PRIVACY_POLICY]]">Документ готовится. Это локальная версия сайта: формы сбора данных, аналитика и отправка заявок не подключены.</p><Link className="button" href="/">На главную</Link></main>;}
