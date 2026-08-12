import type { StatCardProps } from './StatCard.types';
import './StatCard.css';

const StatCard = ({ label, value, subtitle, dotColor }: StatCardProps) => {
  return (
    <div className="stat-card">
      <p className="stat-card-label">{label}</p>
      <p className="stat-card-value">
        {dotColor && (
          <span
            className="stat-card-dot"
            style={{ backgroundColor: dotColor }}
          />
        )}
        {value}
      </p>
      {subtitle && <p className="stat-card-subtitle">{subtitle}</p>}
    </div>
  );
};

export { StatCard };
