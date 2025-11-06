'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaExchangeAlt } from 'react-icons/fa';

// Current exchange rate (in production, this would come from an API)
const EXCHANGE_RATE = 60; // 1 GBP = 60 EGP (approximate)

export const CurrencyConverter: React.FC = () => {
  const [amount, setAmount] = useState<string>('100000');
  const [fromCurrency, setFromCurrency] = useState<'GBP' | 'EGP'>('GBP');

  const convertedAmount = fromCurrency === 'GBP'
    ? parseFloat(amount || '0') * EXCHANGE_RATE
    : parseFloat(amount || '0') / EXCHANGE_RATE;

  const handleSwap = () => {
    setFromCurrency(fromCurrency === 'GBP' ? 'EGP' : 'GBP');
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-GB', {
      maximumFractionDigits: 2,
    }).format(num);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-lg font-bold text-navy-900 mb-4 font-heading">
        Currency Converter
      </h3>

      <div className="space-y-4">
        {/* From Currency */}
        <div>
          <label className="block text-sm font-medium text-charcoal-900 mb-2">
            From
          </label>
          <div className="flex gap-2">
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="flex-1 px-4 py-3 border border-sand-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500"
              placeholder="Enter amount"
            />
            <div className="w-20 px-4 py-3 bg-sand-100 rounded-lg flex items-center justify-center font-medium text-navy-900">
              {fromCurrency}
            </div>
          </div>
        </div>

        {/* Swap Button */}
        <div className="flex justify-center">
          <motion.button
            onClick={handleSwap}
            whileHover={{ scale: 1.1, rotate: 180 }}
            whileTap={{ scale: 0.9 }}
            className="w-12 h-12 bg-gold-500 text-white rounded-full flex items-center justify-center shadow-md hover:bg-gold-600 transition-colors"
          >
            <FaExchangeAlt className="text-xl" />
          </motion.button>
        </div>

        {/* To Currency */}
        <div>
          <label className="block text-sm font-medium text-charcoal-900 mb-2">
            To
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={formatNumber(convertedAmount)}
              readOnly
              className="flex-1 px-4 py-3 bg-sand-50 border border-sand-200 rounded-lg text-charcoal-900 font-medium"
            />
            <div className="w-20 px-4 py-3 bg-sand-100 rounded-lg flex items-center justify-center font-medium text-navy-900">
              {fromCurrency === 'GBP' ? 'EGP' : 'GBP'}
            </div>
          </div>
        </div>

        {/* Exchange Rate Info */}
        <p className="text-xs text-charcoal-800 text-center">
          1 GBP = {EXCHANGE_RATE} EGP (Approximate rate)
        </p>
      </div>
    </div>
  );
};
