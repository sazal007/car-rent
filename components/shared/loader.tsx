"use client";

import React from "react";

export const Loader: React.FC = () => {
  return (
    <>
      <style>{`
        .loader-spinner {
          width: 48px;
          height: 48px;
          border: 5px solid #fff;
          border-bottom-color: var(--carent-yellow);
          border-radius: 50%;
          display: inline-block;
          box-sizing: border-box;
          animation: loader-rotation 1s linear infinite;
        }

        @keyframes loader-rotation {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
      <div className="loader-spinner" />
    </>
  );
};
