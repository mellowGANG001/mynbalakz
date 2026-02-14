import Link from "next/link";

export default function OfertaPage() {
  return (
    <main className="min-h-screen page-bg-juicy section-shell">
      <div className="max-w-4xl mx-auto px-4">
        <article className="surface-card p-8 md:p-12 space-y-6">
          <Link href="/" className="chip w-fit">MYNBALA</Link>
          <h1 className="section-title text-3xl md:text-4xl">Публичная оферта</h1>
          <div className="prose prose-sm max-w-none text-gray-700 space-y-4">
            <p>Настоящий документ является публичной офертой ТОО «MYNBALA» на оказание услуг по организации детского досуга.</p>
            <h2 className="text-lg font-bold text-[var(--ink)]">1. Предмет оферты</h2>
            <p>Исполнитель оказывает услуги по предоставлению доступа к аттракционам, организации праздников, бронированию столиков и продаже товаров через сервис mynbala.kz.</p>
            <h2 className="text-lg font-bold text-[var(--ink)]">2. Акцепт оферты</h2>
            <p>Оплата билета или бронирование через сайт является полным акцептом настоящей оферты.</p>
            <h2 className="text-lg font-bold text-[var(--ink)]">3. Стоимость услуг</h2>
            <p>Актуальные цены указаны на сайте в разделе «Билеты». Стоимость может отличаться для разных филиалов и дней недели.</p>
            <h2 className="text-lg font-bold text-[var(--ink)]">4. Порядок оплаты</h2>
            <p>Оплата производится онлайн банковскими картами или через мобильные платежные системы. Билет формируется после успешной оплаты.</p>
            <h2 className="text-lg font-bold text-[var(--ink)]">5. Реквизиты</h2>
            <p>ТОО «MYNBALA», БИН: 000000000000, Республика Казахстан. Email: info@mynbala.kz.</p>
          </div>
          <Link href="/" className="btn-dark btn-sm btn-auto">На главную</Link>
        </article>
      </div>
    </main>
  );
}
