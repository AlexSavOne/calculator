import React from 'react';

const History = ({ history, onSelectResult, onClearHistory }) => {
  return (
    <div className="history">
      <div className="history-header">
        <h3>История вычислений</h3>
        {history.length > 0 && (
          <button 
            className="clear-history-btn"
            onClick={onClearHistory}
            title="Очистить историю"
          >
            ✕
          </button>
        )}
      </div>
      {history.length === 0 ? (
        <div className="history-empty">
          История пуста
        </div>
      ) : (
        <div className="history-list">
          {history.map((item, index) => (
            <div 
              key={index} 
              className="history-item"
              onClick={() => onSelectResult(item.result)}
              title="Нажмите, чтобы использовать результат"
            >
              <div className="history-expression">{item.expression}</div>
              <div className="history-result">= {item.result}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default History; 
