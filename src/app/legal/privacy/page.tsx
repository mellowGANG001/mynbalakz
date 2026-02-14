import Link from "next/link";

export default function PrivacyPage() {
  return (
    <main className="min-h-screen page-bg-juicy section-shell">
      <div className="max-w-4xl mx-auto px-4">
        <article className="surface-card p-8 md:p-12 space-y-6">
          <Link href="/" className="chip w-fit">MYNBALA</Link>
          <h1 className="section-title text-3xl md:text-4xl">Политика конфиденциальности</h1>
          <div className="prose prose-sm max-w-none text-gray-700 space-y-4">
            <p>Настоящая Политика конфиденциальности описывает порядок сбора, использования и защиты персональных данных пользователей сервиса MYNBALA.</p>
            <h2 className="text-lg font-bold text-[var(--ink)]">1. Какие данные мы собираем</h2>
            <p>Номер телефона для авторизации, имя, данные о покупках билетов и бронированиях, IP-адрес и тип устройства.</p>
            <h2 className="text-lg font-bold text-[var(--ink)]">2. Как мы используем данные</h2>
            <p>Для обработки заказов, отправки уведомлений о бронированиях, начисления бонусных баллов и улучшения качества сервиса.</p>
            <h2 className="text-lg font-bold text-[var(--ink)]">3. Защита данных</h2>
            <p>Данные хранятся на защищенных серверах Supabase с шифрованием и RLS-политиками доступа. Мы не передаем данные третьим лицам без вашего согласия.</p>
            <h2 className="text-lg font-bold text-[var(--ink)]">4. Ваши права</h2>
            <p>Вы можете запросить удаление своих данных, связавшись с нами через раздел «Поддержка» или по адресу info@mynbala.kz.</p>
            <h2 className="text-lg font-bold text-[var(--ink)]">5. Контакты</h2>
            <p>ТОО «MYNBALA», Республика Казахстан. Email: info@mynbala.kz, телефон: +7 (7262) 50-50-50.</p>
          </div>
          <Link href="/" className="btn-dark btn-sm btn-auto">На главную</Link>
        </article>
      </div>
    </main>
  );
}
