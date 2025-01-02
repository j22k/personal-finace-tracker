import React, { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { MoreHorizontal } from 'lucide-react';

const PiechartExpenses = () => {
  // Sample data matching expense categories
  const [data] = useState([
    { name: 'Food', value: 1500 },
    { name: 'Bills', value: 800 },
    { name: 'Entertainment', value: 400 },
    { name: 'Shopping', value: 600 },
    { name: 'Healthcare', value: 300 },
    { name: 'Other', value: 200 }
  ]);

  // Colors matching the dark theme aesthetic
  const COLORS = ['#60A5FA', '#34D399', '#FBBF24', '#F87171', '#A78BFA', '#6EE7B7'];

  // Custom tooltip component with dark theme
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gray-800 p-2 border border-gray-700 rounded shadow">
          <p className="text-gray-200 font-medium">{`${payload[0].name}`}</p>
          <p className="text-gray-400">{`₹${payload[0].value}`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-gray-900 text-gray-200 p-4 rounded-lg">
      <div className="flex items-center gap-2 text-xl mb-4">
        <span>Expense Distribution</span>
        <MoreHorizontal className="text-gray-400 ml-auto" />
      </div>
      
      <div className="h-96">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              outerRadius={120}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={COLORS[index % COLORS.length]}
                  className="hover:opacity-80 transition-opacity"
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              layout="horizontal" 
              verticalAlign="bottom" 
              align="center"
              wrapperStyle={{ color: '#E5E7EB' }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PiechartExpenses;