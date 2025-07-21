import React, { useState } from "react";

function AccountBook({
  transactions,
}: {
  transactions: { date: string; name: string; amount: number }[];
}) {
  // 各セルのスタイルを定義 (これは画面表示用。印刷時はprint.cssが優先される)
  const cellStyle = {
    border: "1px solid #000",
    padding: "8px",
    textAlign: "left",
  };

  const rightAlignCellStyle = {
    ...cellStyle,
    textAlign: "right",
  };

  const centerAlignCellStyle = {
    ...cellStyle,
    textAlign: "center",
  };

  return (
    // 画面表示用の中央配置ラッパー
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#f0f2f5",
      }}
    >
      {/* 👈 ここにクラス名を追加！ */}
      <div
        className="account-book-container"
        style={{
          border: "1px solid #ccc",
          padding: "20px",
          width: "400px",
          fontFamily: "sans-serif",
          boxShadow: "0 4px 8px rgba[0, 0, 0, 0.1]",
          borderRadius: "8px",
          backgroundColor: "#fff",
        }}
      >
        {transactions.length > 0 ? (
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              marginTop: "10px",
            }}
          >
            <thead>
              <tr style={{ backgroundColor: "#f2f2f2" }}>
                <th style={cellStyle}>日付</th>
                <th style={cellStyle}>摘要</th>
                <th style={rightAlignCellStyle}>金額</th>
                <th style={centerAlignCellStyle}>種類</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction) => (
                <tr
                  key={transaction.date + transaction.name + transaction.amount}
                >
                  <td style={cellStyle}>{transaction.date}</td>
                  <td style={cellStyle}>{transaction.name}</td>
                  <td style={{ color: "green" }}>
                    {transaction.amount.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>まだ取引履歴はありません。</p>
        )}
      </div>
    </div>
  );
}

export default AccountBook;
