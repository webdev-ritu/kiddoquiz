import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import './animations.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);


export default function ProgressChart({ progressData }) {
  const categories = [...new Set(progressData.map(item => item.category))];

  const data = {
    labels: categories,
    datasets: [
      {
        label: 'Average Score',
        data: categories.map(cat => {
          const catItems = progressData.filter(item => item.category === cat);
          const avg = catItems.reduce((sum, item) => sum + (item.score / item.total), 0) / catItems.length;
          return Math.round(avg * 100);
        }),
        backgroundColor: 'rgba(255, 179, 0, 0.7)', // warm golden yellow
        borderColor: 'rgba(255, 179, 0, 1)',
        borderWidth: 2,
        borderRadius: 8,           // rounded bars
        hoverBackgroundColor: 'rgba(255, 213, 79, 0.9)', // lighter on hover
        hoverBorderColor: 'rgba(255, 213, 79, 1)',
      },
    ],
  };

  const options = {
    responsive: true,
    animation: {
      duration: 1000,
      easing: 'easeOutBounce', // playful bounce animation on load
    },
    plugins: {
      legend: {
        position: 'top',
        labels: {
          font: {
            family: "'Comic Sans MS', cursive",
            size: 14,
            weight: 'bold',
          },
          color: '#ffb300',
        },
      },
      title: {
        display: true,
        text: 'Child Progress by Category',
        font: {
          family: "'Comic Sans MS', cursive",
          size: 22,
          weight: 'bold',
        },
        color: '#ffb300',
        padding: {
          top: 10,
          bottom: 30,
        },
      },
      tooltip: {
        enabled: true,
        backgroundColor: 'rgba(255, 179, 0, 0.9)',
        titleFont: {
          family: "'Comic Sans MS', cursive",
          weight: 'bold',
        },
        bodyFont: {
          family: "'Comic Sans MS', cursive",
        },
        cornerRadius: 6,
      },
    },
    scales: {
      x: {
        ticks: {
          font: {
            family: "'Comic Sans MS', cursive",
            size: 14,
            weight: 'bold',
          },
          color: '#ffb300',
        },
        grid: {
          display: false,
        },
      },
      y: {
        beginAtZero: true,
        max: 100,
        ticks: {
          stepSize: 20,
          font: {
            family: "'Comic Sans MS', cursive",
            size: 14,
            weight: 'bold',
          },
          color: '#ffb300',
        },
        grid: {
          color: 'rgba(255, 179, 0, 0.2)',
          borderDash: [5, 5],
        },
        title: {
          display: true,
          text: 'Percentage Score',
          font: {
            family: "'Comic Sans MS', cursive",
            size: 16,
            weight: 'bold',
          },
          color: '#ffb300',
        },
      },
    },
  };

  return <Bar data={data} options={options} />;
}
