import React, { useState } from 'react';
import { ChevronDown, ChevronRight, Plus, MoreHorizontal, Trash2 } from 'lucide-react';

const Expenses = () => {
  const [months, setMonths] = useState({
    January: {
      isOpen: true,
      entries: [
        { source: 'Groceries', amount: 1500.00, tag: 'Food' },
        { source: 'Utility Bill', amount: 300.00, tag: 'Bills' },
        { source: 'Internet', amount: 500.00, tag: 'Bills' }
      ]
    },
    February: { isOpen: false, entries: [] },
    March: { isOpen: false, entries: [] },
    April: { isOpen: false, entries: [] },
    May: { isOpen: false, entries: [] },
    June: { isOpen: false, entries: [] },
    July: { isOpen: false, entries: [] },
    August: { isOpen: false, entries: [] },
    September: { isOpen: false, entries: [] },
    October: { isOpen: false, entries: [] },
    November: { isOpen: false, entries: [] },
    December: { isOpen: false, entries: [] }
  });

  const [editingCell, setEditingCell] = useState(null);
  const tags = ['Food', 'Bills', 'Entertainment', 'Shopping', 'Healthcare', 'Other'];

  const toggleMonth = (month) => {
    setMonths(prev => ({
      ...prev,
      [month]: {
        ...prev[month],
        isOpen: !prev[month].isOpen
      }
    }));
  };

  const handleEdit = (month, index, field) => {
    setEditingCell({ month, index, field });
  };

  const handleSave = (month, index, field, value) => {
    setMonths(prev => ({
      ...prev,
      [month]: {
        ...prev[month],
        entries: prev[month].entries.map((entry, i) =>
          i === index ? { ...entry, [field]: value } : entry
        )
      }
    }));
    setEditingCell(null);
  };

  const addNewEntry = (month) => {
    setMonths(prev => ({
      ...prev,
      [month]: {
        ...prev[month],
        entries: [...prev[month].entries, { source: '', amount: 0, tag: 'Food' }]
      }
    }));
  };

  const deleteEntry = (month, index) => {
    setMonths(prev => ({
      ...prev,
      [month]: {
        ...prev[month],
        entries: prev[month].entries.filter((_, i) => i !== index)
      }
    }));
  };

  return (
    <div className="bg-gray-900 text-gray-200 p-4 min-h-screen overflow-auto">
      <div className="flex items-center gap-2 text-xl mb-4">
        <Plus className="text-gray-400" />
        <span>Expenses</span>
        <MoreHorizontal className="text-gray-400 ml-auto" />
      </div>

      {Object.entries(months).map(([month, data]) => (
        <div key={month} className="mb-4">
          <div
            className="flex items-center gap-2 cursor-pointer hover:bg-gray-800 p-2 rounded"
            onClick={() => toggleMonth(month)}
          >
            {data.isOpen ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
            <span className="text-blue-400">{month}</span>
            <span className="text-gray-500 ml-2">{data.entries.length}</span>
          </div>

          {data.isOpen && (
            <div className="mt-2 ml-6">
              <div className="grid grid-cols-12 gap-4 mb-2 text-gray-500">
                <div className="col-span-5">Source</div>
                <div className="col-span-3">Amount</div>
                <div className="col-span-3">Tags</div>
                <div className="col-span-1">Actions</div>
              </div>

              {data.entries.map((entry, index) => (
                <div key={index} className="grid grid-cols-12 gap-4 mb-2">
                  <div className="col-span-5">
                    {editingCell?.month === month &&
                    editingCell?.index === index &&
                    editingCell?.field === 'source' ? (
                      <input
                        className="bg-gray-800 p-1 rounded w-full"
                        value={entry.source}
                        onChange={(e) => handleSave(month, index, 'source', e.target.value)}
                        onBlur={() => setEditingCell(null)}
                        autoFocus
                      />
                    ) : (
                      <div
                        className="cursor-pointer hover:bg-gray-800 p-1 rounded"
                        onClick={() => handleEdit(month, index, 'source')}
                      >
                        {entry.source || 'Click to edit'}
                      </div>
                    )}
                  </div>
                  <div className="col-span-3">
                    {editingCell?.month === month &&
                    editingCell?.index === index &&
                    editingCell?.field === 'amount' ? (
                      <input
                        type="number"
                        className="bg-gray-800 p-1 rounded w-full"
                        value={entry.amount}
                        onChange={(e) => handleSave(month, index, 'amount', Number(e.target.value))}
                        onBlur={() => setEditingCell(null)}
                        autoFocus
                      />
                    ) : (
                      <div
                        className="cursor-pointer hover:bg-gray-800 p-1 rounded"
                        onClick={() => handleEdit(month, index, 'amount')}
                      >
                        ₹{entry.amount.toFixed(2)}
                      </div>
                    )}
                  </div>
                  <div className="col-span-3">
                    <select
                      className="bg-gray-800 text-green-500 p-1 rounded cursor-pointer"
                      value={entry.tag}
                      onChange={(e) => handleSave(month, index, 'tag', e.target.value)}
                    >
                      {tags.map((tag) => (
                        <option key={tag} value={tag}>
                          {tag}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-span-1 flex justify-center items-center">
                    <button
                      onClick={() => deleteEntry(month, index)}
                      className="text-red-400 hover:text-red-300 p-1"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}

              <div
                className="text-gray-500 cursor-pointer hover:bg-gray-800 p-2 rounded mt-2"
                onClick={() => addNewEntry(month)}
              >
                + Add Entry
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Expenses;
