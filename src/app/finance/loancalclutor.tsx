'use client';
import React, { useState } from 'react';
import { PieChart, Pie, Cell, Legend, ResponsiveContainer } from 'recharts';

const LoanCalculator = () => {
  const [loanAmount, setLoanAmount] = useState(100000);
  const [interestRate, setInterestRate] = useState(6.5);
  const [tenure, setTenure] = useState(1);

  const monthlyRate = interestRate / 12 / 100;
  const numPayments = tenure * 12;
  const emi =
    (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, numPayments)) /
    (Math.pow(1 + monthlyRate, numPayments) - 1);
  const totalPayment = emi * numPayments;
  const totalInterest = totalPayment - loanAmount;

  const pieData = [
    { name: 'Principal Amount', value: loanAmount },
    { name: 'Total Interest Payable', value: totalInterest },
  ];

  const COLORS = ['#3498db', '#ff6384'];

  return (
    <div className="max-w-7xl mx-auto bg-white p-4 sm:p-6 lg:p-8 shadow-sm rounded-md border border-gray-200">
      <h2 className="text-xl sm:text-2xl font-semibold mb-6">Car Loan Calculator</h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Summary Section */}
        <div>
          <h3 className="text-3xl sm:text-4xl font-bold text-blue-700 mb-6">
            ₹{emi.toFixed(2)}
          </h3>

          <div className="space-y-2 mb-6 text-sm sm:text-base">
            <div className="flex justify-between border p-3 rounded-md">
              <span>Principal Loan Amount</span>
              <span className="font-medium">₹{loanAmount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between border p-3 rounded-md">
              <span>Total Interest Payable</span>
              <span className="font-medium">₹{totalInterest.toFixed(2)}</span>
            </div>
            <div className="flex justify-between border p-3 rounded-md">
              <span>Total Amount Payable</span>
              <span className="font-medium">₹{totalPayment.toFixed(2)}</span>
            </div>
          </div>

          <p className="text-xs text-gray-500 leading-5">
            Disclaimer: Applicable rate of interest can vary subject to credit profile.
            Loan approval is at the sole discretion of the finance partner.
          </p>
        </div>

        {/* Sliders Section */}
        <div className="space-y-6 text-sm sm:text-base">
          <div>
            <label className="block font-medium mb-1">Loan Amount:</label>
            <input
              type="range"
              min="50000"
              max="2000000"
              step="10000"
              value={loanAmount}
              onChange={(e) => setLoanAmount(Number(e.target.value))}
              className="w-full accent-purple-700"
            />
            <p className="mt-1 text-purple-800 font-semibold">
              ₹{loanAmount.toLocaleString()}
            </p>
          </div>

          <div>
            <label className="block font-medium mb-1">Interest Rate (%):</label>
            <input
              type="range"
              min="1"
              max="15"
              step="0.1"
              value={interestRate}
              onChange={(e) => setInterestRate(Number(e.target.value))}
              className="w-full accent-purple-700"
            />
            <p className="mt-1 text-purple-800 font-semibold">{interestRate}%</p>
          </div>

          <div>
            <label className="block font-medium mb-1">Loan Tenure (Years):</label>
            <input
              type="range"
              min="1"
              max="7"
              step="1"
              value={tenure}
              onChange={(e) => setTenure(Number(e.target.value))}
              className="w-full accent-purple-700"
            />
            <p className="mt-1 text-purple-800 font-semibold">
              {tenure} Year{tenure > 1 ? 's' : ''}
            </p>
          </div>
        </div>

        {/* Chart Section */}
        <div className="w-full h-64 sm:h-72 md:h-80 lg:h-60">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius="80%"
                label
              >
                {pieData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default LoanCalculator;
