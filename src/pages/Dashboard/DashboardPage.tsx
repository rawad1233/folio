import { useState } from 'react';
import { StatCard } from '../../components/ui/StatCard/StatCard';
import { MonthPicker } from '../../components/ui/MonthPicker/MonthPicker';
import { SpendingByCategory } from '../../components/ui/SpendingByCategory/SpendingByCategory';
import { BudgetUsage } from '../../components/ui/BudgetUsage/BudgetUsage';
import { useAppSelector } from '../../store/hooks';
import { selectDashboardStats } from '../../store/selectors';
import { useAuth } from '../../features/auth/AuthContext';
import './DashboardPage.css';

const monthNames = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

const monthKeyFor = (month: number, year: number) => `${year}-${String(month + 1).padStart(2, '0')}`;

const previousMonthOf = (month: number, year: number) => {
  return month === 0 ? { month: 11, year: year - 1 } : { month: month - 1, year };
};

const greetingForHour = (hour: number) => {
  if (hour < 12) return 'Good morning';
  if (hour < 18) return 'Good afternoon';
  return 'Good evening';
};

const DashboardPage = () => {
  const { user } = useAuth();
  const today = new Date();
  const [month, setMonth] = useState(today.getMonth());
  const [year, setYear] = useState(today.getFullYear());

  const goPrev = () => {
    if (month === 0) {
      setMonth(11);
      setYear(year - 1);
    } else {
      setMonth(month - 1);
    }
  };

  const goNext = () => {
    if (month === 11) {
      setMonth(0);
      setYear(year + 1);
    } else {
      setMonth(month + 1);
    }
  };

  const goToday = () => {
    setMonth(today.getMonth());
    setYear(today.getFullYear());
  };

  const monthLabel = `${monthNames[month]} ${year}`;
  const monthKey = monthKeyFor(month, year);
  const previous = previousMonthOf(month, year);
  const previousMonthKey = monthKeyFor(previous.month, previous.year);

  const stats = useAppSelector((state) => selectDashboardStats(state, monthKey, previousMonthKey));

  const monthChangePercent = stats.previousMonthSpent > 0
    ? Math.round(((stats.monthSpent - stats.previousMonthSpent) / stats.previousMonthSpent) * 100)
    : null;

  const firstName = user?.email ? user.email.split('@')[0] : '';
  const greeting = `${greetingForHour(today.getHours())}${firstName ? `, ${firstName}` : ''}`;

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">{greeting}</h1>
        <p className="page-subtitle">Here's how your money is moving this month.</p>
      </div>

      <MonthPicker
        month={month}
        year={year}
        onPrev={goPrev}
        onNext={goNext}
        onToday={goToday}
      />

      <div className="stats-row">
        <StatCard
          label="Total spent"
          value={`$${stats.totalSpentAllTime.toFixed(2)}`}
          subtitle={`All time · ${stats.totalExpenseCount} expenses`}
        />
        <StatCard
          label="This month"
          value={`$${stats.monthSpent.toFixed(2)}`}
          subtitle={monthChangePercent === null
            ? 'No data for last month'
            : `${monthChangePercent >= 0 ? '+' : ''}${monthChangePercent}% vs last month`}
        />
        <StatCard
          label="Top category"
          value={stats.topCategory ? stats.topCategory.name : 'No spending yet'}
          subtitle={stats.topCategory
            ? `$${stats.topCategory.amount.toFixed(2)} · ${stats.topCategory.percent}% of spending`
            : undefined}
          dotColor={stats.topCategory?.color}
        />
      </div>

      <div className="panels-row">
        <SpendingByCategory title={monthLabel} rows={stats.spendingRows} />
        <BudgetUsage title={monthLabel} rows={stats.budgetRows} />
      </div>
    </div>
  );
};

export { DashboardPage };
