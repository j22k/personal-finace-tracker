import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ChevronUp, TrendingUp, Wallet, Target, MoreHorizontal } from 'lucide-react';

const SavingsGraph = () => {
  const [data] = useState([
    { month: 'Jan', savings: 5000, target: 4000, expenses: 3500 },
    { month: 'Feb', savings: 5500, target: 4000, expenses: 3200 },
    { month: 'Mar', savings: 4800, target: 4000, expenses: 3800 },
    { month: 'Apr', savings: 6000, target: 4000, expenses: 3100 },
    { month: 'May', savings: 5800, target: 4000, expenses: 3400 },
    { month: 'Jun', savings: 6500, target: 4000, expenses: 3000 }
  ]);

  // Calculate metrics
  const currentSavings = data[data.length - 1].savings;
  const previousSavings = data[data.length - 2].savings;
  const savingsGrowth = ((currentSavings - previousSavings) / previousSavings * 100).toFixed(1);
  const averageSavings = (data.reduce((acc, curr) => acc + curr.savings, 0) / data.length).toFixed(0);
  const totalSaved = data.reduce((acc, curr) => acc + curr.savings, 0).toFixed(0);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gray-800 p-3 border border-gray-700 rounded shadow">
          <p className="text-gray-200 font-medium mb-2">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: ₹{entry.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-gray-900 text-gray-200 p-6 rounded-lg">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Savings Analysis</h2>
        <MoreHorizontal className="text-gray-400" />
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-gray-800 p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Wallet className="text-blue-400" size={20} />
              <span className="text-gray-400">Current Savings</span>
            </div>
            <ChevronUp className="text-green-400" size={20} />
          </div>
          <div className="mt-2">
            <span className="text-2xl font-bold">₹{currentSavings}</span>
            <span className="text-green-400 text-sm ml-2">+{savingsGrowth}%</span>
          </div>
        </div>

        <div className="bg-gray-800 p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Target className="text-purple-400" size={20} />
            <span className="text-gray-400">Target Savings</span>
          </div>
          <span className="text-2xl font-bold">₹4,000</span>
        </div>

        <div className="bg-gray-800 p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="text-green-400" size={20} />
            <span className="text-gray-400">Average Savings</span>
          </div>
          <span className="text-2xl font-bold">₹{averageSavings}</span>
        </div>

        <div className="bg-gray-800 p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Wallet className="text-yellow-400" size={20} />
            <span className="text-gray-400">Total Saved</span>
          </div>
          <span className="text-2xl font-bold">₹{totalSaved}</span>
        </div>
      </div>

      {/* Graph */}
      <div className="h-80 mt-6">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis 
              dataKey="month" 
              stroke="#9CA3AF"
              tick={{ fill: '#9CA3AF' }}
            />
            <YAxis 
              stroke="#9CA3AF"
              tick={{ fill: '#9CA3AF' }}
              tickFormatter={(value) => `₹${value}`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line 
              type="monotone" 
              dataKey="savings" 
              stroke="#60A5FA" 
              strokeWidth={2}
              name="Savings"
            />
            <Line 
              type="monotone" 
              dataKey="target" 
              stroke="#A78BFA" 
              strokeWidth={2}
              strokeDasharray="5 5"
              name="Target"
            />
            <Line 
              type="monotone" 
              dataKey="expenses" 
              stroke="#F87171" 
              strokeWidth={2}
              name="Expenses"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SavingsGraph;