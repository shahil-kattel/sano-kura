import React from "react";
import Link from "next/link";
import { NextPageContext } from "next";

interface ErrorProps {
  statusCode?: number;
}

function Error({ statusCode }: ErrorProps) {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "system-ui, -apple-system, sans-serif",
        backgroundColor: "#FAFAFA",
        color: "#111827",
        padding: "24px",
        textAlign: "center",
      }}
    >
      <div
        style={{
          maxWidth: "480px",
          width: "100%",
          backgroundColor: "#FFFFFF",
          border: "1px solid #E5E7EB",
          borderRadius: "16px",
          padding: "36px 24px",
          boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
        }}
      >
        <span
          style={{
            fontSize: "48px",
            fontWeight: "bold",
            color: "#B91C1C",
            display: "block",
            marginBottom: "12px",
          }}
        >
          {statusCode || "!"}
        </span>
        <h1 style={{ fontSize: "20px", fontWeight: "600", marginBottom: "8px" }}>
          {statusCode ? `Error ${statusCode} Occurred` : "Application Error"}
        </h1>
        <p style={{ fontSize: "13px", color: "#6B7280", marginBottom: "24px", lineHeight: "1.6" }}>
          An unexpected error occurred while loading this page. Click below to return to Sanokuraa Home.
        </p>
        <Link
          href="/"
          style={{
            display: "inline-block",
            backgroundColor: "#111827",
            color: "#FFFFFF",
            padding: "10px 20px",
            borderRadius: "8px",
            fontSize: "12px",
            fontWeight: "500",
            textDecoration: "none",
          }}
        >
          Return to Home
        </Link>
      </div>
    </div>
  );
}

Error.getInitialProps = ({ res, err }: NextPageContext) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
