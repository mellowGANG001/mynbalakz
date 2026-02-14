import Link from "next/link";

export default function TermsPage() {
  return (
    <main className="min-h-screen page-bg-juicy section-shell">
      <div className="max-w-4xl mx-auto px-4">
        <article className="surface-card p-8 md:p-12 space-y-6">
          <Link href="/" className="chip w-fit">MYNBALA</Link>
          <h1 className="section-title text-3xl md:text-4xl">Условия использования</h1>
          <div className="prose prose-sm max-w-none text-gray-700 space-y-4">
            <p>Используя сервис MYNBALA, вы соглашаетесь с нижеперечисленными условиями.</p>
            <h2 className="text-lg font-bold text-[var(--ink)]">1. Общие положения</h2>
            <p>Сервис MYNBALA предоставляет онлайн-покупку билетов, бронирование столиков и кабинок, а также бонусную программу для пользователей детских парков MYNBALA.</p>
            <h2 className="text-lg font-bold text-[var(--ink)]">2. Билеты</h2>
            <p>Электронный билет действителен в указанную дату. QR-код предъявляется на входе в парк. Возврат производится в соответствии с законодательством РК.</p>
            <h2 className="text-lg font-bold text-[var(--ink)]">3. Бронирование</h2>
            <p>Бронирование столиков и кабинок подтверждается администратором. Отмена возможна не позднее чем за 2 часа до визита.</p>
            <h2 className="text-lg font-bold text-[var(--ink)]">4. Бонусная программа</h2>
            <p>Баллы начисляются за покупки и активности. Баллы можно потратить на товары и услуги. Баллы не подлежат обмену на деньги.</p>
            <h2 className="text-lg font-bold text-[var(--ink)]">5. Ответственность</h2>
            <p>MYNBALA обеспечивает безопасность аттракционов в соответствии с нормативами РК. Родители несут ответственность за поведение детей.</p>
          </div>
          <Link href="/" className="btn-dark btn-sm btn-auto">На главную</Link>
        </article>
      </div>
    </main>
  );
}
