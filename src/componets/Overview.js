import React from 'react';
import SavingsGraph from './SavingsGraph';
import PiechartExpenses from './PiechartExpenses';

const Overview = () => {
  return (
    <div className="w-full space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-200">Overview</h1>
      </div>

      {/* Grid Layout for Charts */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Savings Section */}
        <div className="flex flex-col gap-4">
          <SavingsGraph />
        </div>

        {/* Expenses Section */}
        <div className="flex flex-col gap-4">
          <PiechartExpenses />
        </div>
      </div>
    </div>
  );
};

export default Overview;