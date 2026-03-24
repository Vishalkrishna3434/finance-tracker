import React, { useContext } from 'react';
import { Doughnut, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
} from 'chart.js';
import { TransactionContext } from '../../context/TransactionContext';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler
);

const FinanceCharts = () => {
  const { transactions } = useContext(TransactionContext);

  if (!transactions.length) {
    return (
      <div style={styles.card}>
        <p style={styles.empty}>Add transactions to see charts</p>
      </div>
    );
  }

  const totalIncome = transactions
    .filter((t) => t.type === 'income')
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const totalExpense = transactions
    .filter((t) => t.type === 'expense')
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const sorted = [...transactions].sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  let balance = 0;
  const lineValues = sorted.map((t) => {
    balance += t.type === 'income' ? Number(t.amount) : -Number(t.amount);
    return balance;
  });

  const doughnutData = {
    labels: ['Income', 'Expense'],
    datasets: [
      {
        data: [totalIncome, totalExpense],
        backgroundColor: ['#2ecc71', '#c0392b'],
        borderColor: ['#ffffff', '#ffffff'],
        borderWidth: 2,
      },
    ],
  };

  const lineData = {
    labels: sorted.map((t) =>
      new Date(t.date).toLocaleDateString('en-IN', {
        month: 'short',
        day: 'numeric',
      })
    ),
    datasets: [
      {
        label: 'Balance',
        data: lineValues,
        borderColor: '#9c88ff',
        backgroundColor: 'rgba(156, 136, 255, 0.18)',
        fill: true,
        tension: 0.35,
        pointBackgroundColor: '#9c88ff',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointRadius: 4,
      },
    ],
  };

  const commonOptions = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: '#444',
          font: { size: 12 },
        },
      },
      tooltip: {
        backgroundColor: '#fff',
        titleColor: '#333',
        bodyColor: '#555',
        borderColor: '#ddd',
        borderWidth: 1,
      },
    },
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.card}>
        <h3 style={styles.title}>Overview</h3>
        <div style={styles.chartBox}>
          <Doughnut
            data={doughnutData}
            options={{
              ...commonOptions,
              cutout: '65%',
            }}
          />
        </div>
      </div>

      <div style={styles.card}>
        <h3 style={styles.title}>Balance Trend</h3>
        <div style={styles.lineBox}>
          <Line
            data={lineData}
            options={{
              ...commonOptions,
              plugins: {
                ...commonOptions.plugins,
                legend: { display: false },
              },
              scales: {
                x: {
                  ticks: { color: '#666' },
                  grid: { color: '#f1edff' },
                },
                y: {
                  ticks: { color: '#666' },
                  grid: { color: '#f1edff' },
                },
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};

const styles = {
  wrapper: {
    display: 'grid',
    gap: '20px',
    margin: '20px 0',
  },
  card: {
    background: '#fff',
    borderRadius: '8px',
    padding: '20px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.12)',
    border: '1px solid #eee',
  },
  title: {
    marginBottom: '15px',
    color: '#9c88ff',
    fontSize: '18px',
  },
  chartBox: {
    width: '240px',
    margin: '0 auto',
  },
  lineBox: {
    width: '100%',
    maxWidth: '520px',
  },
  empty: {
    textAlign: 'center',
    color: '#777',
  },
};

export default FinanceCharts;
