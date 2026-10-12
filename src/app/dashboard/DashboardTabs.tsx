"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Users,
  Building2,
  Globe,
  Mail,
  Phone,
  Camera,
  Calendar,
  ExternalLink,
  Search,
  User,
  Video,
  Briefcase,
  UserCircle,
  Copy,
  Check,
  FileText
} from "lucide-react";

export interface Brand {
  _id: string;
  name?: string;
  email?: string;
  phoneNumber?: string;
  brandName?: string;
  websiteLink?: string;
  instagram?: string;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Creator {
  _id: string;
  name: string;
  images?: string[];
  following?: {
    youtube?: number;
    linkedin?: number;
    instagram?: number;
  };
  createdAt: string;
}

interface DashboardTabsProps {
  creators: Creator[];
  brands: Brand[];
}

function formatUrl(url?: string) {
  if (!url) return "";
  const trimmed = url.trim();
  if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
    return trimmed;
  }
  return `https://${trimmed}`;
}

export default function DashboardTabs({ creators, brands }: DashboardTabsProps) {
  const [activeTab, setActiveTab] = useState<"all" | "brands" | "creators">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filteredBrands = brands.filter((brand) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      (brand.brandName && brand.brandName.toLowerCase().includes(q)) ||
      (brand.name && brand.name.toLowerCase().includes(q)) ||
      (brand.email && brand.email.toLowerCase().includes(q)) ||
      (brand.phoneNumber && brand.phoneNumber.toLowerCase().includes(q)) ||
      (brand.websiteLink && brand.websiteLink.toLowerCase().includes(q)) ||
      (brand.description && brand.description.toLowerCase().includes(q))
    );
  });

  const filteredCreators = creators.filter((creator) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return creator.name && creator.name.toLowerCase().includes(q);
  });

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
      {/* Controls Bar: Tabs & Search */}
      <div
        className="glass-panel"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "16px",
          padding: "16px 24px",
          borderRadius: "16px",
        }}
      >
        {/* Navigation Tabs */}
        <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
          <button
            onClick={() => setActiveTab("all")}
            type="button"
            style={{
              padding: "10px 18px",
              borderRadius: "10px",
              border: "1px solid",
              borderColor: activeTab === "all" ? "rgba(59, 130, 246, 0.4)" : "transparent",
              background:
                activeTab === "all"
                  ? "linear-gradient(135deg, rgba(59, 130, 246, 0.25) 0%, rgba(139, 92, 246, 0.25) 100%)"
                  : "rgba(255, 255, 255, 0.04)",
              color: activeTab === "all" ? "#60a5fa" : "#94a3b8",
              fontWeight: activeTab === "all" ? 600 : 500,
              fontSize: "14px",
              cursor: "pointer",
              transition: "all 0.2s ease",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            All Overview
            <span
              style={{
                fontSize: "12px",
                padding: "2px 8px",
                borderRadius: "12px",
                background: "rgba(255, 255, 255, 0.1)",
                color: "#e2e8f0",
              }}
            >
              {creators.length + brands.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab("brands")}
            type="button"
            style={{
              padding: "10px 18px",
              borderRadius: "10px",
              border: "1px solid",
              borderColor: activeTab === "brands" ? "rgba(56, 189, 248, 0.4)" : "transparent",
              background:
                activeTab === "brands"
                  ? "linear-gradient(135deg, rgba(56, 189, 248, 0.25) 0%, rgba(14, 165, 233, 0.25) 100%)"
                  : "rgba(255, 255, 255, 0.04)",
              color: activeTab === "brands" ? "#38bdf8" : "#94a3b8",
              fontWeight: activeTab === "brands" ? 600 : 500,
              fontSize: "14px",
              cursor: "pointer",
              transition: "all 0.2s ease",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <Building2 size={16} />
            Brands
            <span
              style={{
                fontSize: "12px",
                padding: "2px 8px",
                borderRadius: "12px",
                background: activeTab === "brands" ? "rgba(56, 189, 248, 0.2)" : "rgba(255, 255, 255, 0.1)",
                color: activeTab === "brands" ? "#7dd3fc" : "#e2e8f0",
              }}
            >
              {brands.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab("creators")}
            type="button"
            style={{
              padding: "10px 18px",
              borderRadius: "10px",
              border: "1px solid",
              borderColor: activeTab === "creators" ? "rgba(168, 85, 247, 0.4)" : "transparent",
              background:
                activeTab === "creators"
                  ? "linear-gradient(135deg, rgba(168, 85, 247, 0.25) 0%, rgba(217, 70, 239, 0.25) 100%)"
                  : "rgba(255, 255, 255, 0.04)",
              color: activeTab === "creators" ? "#c084fc" : "#94a3b8",
              fontWeight: activeTab === "creators" ? 600 : 500,
              fontSize: "14px",
              cursor: "pointer",
              transition: "all 0.2s ease",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <Users size={16} />
            Creators
            <span
              style={{
                fontSize: "12px",
                padding: "2px 8px",
                borderRadius: "12px",
                background: activeTab === "creators" ? "rgba(168, 85, 247, 0.2)" : "rgba(255, 255, 255, 0.1)",
                color: activeTab === "creators" ? "#e9d5ff" : "#e2e8f0",
              }}
            >
              {creators.length}
            </span>
          </button>
        </div>

        {/* Search Bar */}
        <div style={{ position: "relative", minWidth: "260px", flex: "1", maxWidth: "380px" }}>
          <Search
            size={16}
            style={{
              position: "absolute",
              left: "14px",
              top: "50%",
              transform: "translateY(-50%)",
              color: "#94a3b8",
            }}
          />
          <input
            type="text"
            placeholder="Search brands or creators..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: "100%",
              padding: "10px 14px 10px 40px",
              background: "rgba(15, 23, 42, 0.6)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              borderRadius: "10px",
              color: "#f8fafc",
              fontSize: "14px",
              outline: "none",
              transition: "border-color 0.2s, box-shadow 0.2s",
            }}
            onFocus={(e) => (e.target.style.borderColor = "rgba(59, 130, 246, 0.5)")}
            onBlur={(e) => (e.target.style.borderColor = "rgba(255, 255, 255, 0.1)")}
          />
        </div>
      </div>

      {/* Brands Section */}
      {(activeTab === "all" || activeTab === "brands") && (
        <section className="glass-panel animate-fade-in" style={{ padding: "32px", borderRadius: "16px" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "24px",
              flexWrap: "wrap",
              gap: "12px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div
                style={{
                  display: "inline-flex",
                  padding: "10px",
                  borderRadius: "12px",
                  background: "linear-gradient(135deg, rgba(56, 189, 248, 0.15) 0%, rgba(14, 165, 233, 0.25) 100%)",
                  border: "1px solid rgba(56, 189, 248, 0.2)",
                }}
              >
                <Building2 size={22} color="#38bdf8" />
              </div>
              <div>
                <h2 style={{ margin: 0, fontSize: "20px", fontWeight: "bold", color: "#f8fafc" }}>
                  Registered Brands
                </h2>
                <p style={{ margin: "4px 0 0 0", fontSize: "13px", color: "#94a3b8" }}>
                  Fetched from <code style={{ color: "#38bdf8", background: "rgba(56, 189, 248, 0.1)", padding: "2px 6px", borderRadius: "4px" }}>/api/brands</code>
                </p>
              </div>
            </div>

            <div
              style={{
                fontSize: "13px",
                color: "#94a3b8",
                background: "rgba(255, 255, 255, 0.05)",
                padding: "6px 14px",
                borderRadius: "20px",
                border: "1px solid rgba(255, 255, 255, 0.08)",
              }}
            >
              Showing <strong style={{ color: "#38bdf8" }}>{filteredBrands.length}</strong> of {brands.length} brands
            </div>
          </div>

          {filteredBrands.length === 0 ? (
            <div
              style={{
                textAlign: "center",
                padding: "54px 20px",
                color: "#94a3b8",
                border: "1px dashed rgba(255, 255, 255, 0.15)",
                borderRadius: "14px",
                background: "rgba(255, 255, 255, 0.01)",
              }}
            >
              <Building2 size={40} color="#64748b" style={{ margin: "0 auto 14px", display: "block" }} />
              <p style={{ fontSize: "16px", fontWeight: 500, margin: "0 0 6px 0", color: "#cbd5e1" }}>
                {searchQuery ? "No matching brands found" : "No brands registered yet"}
              </p>
              <p style={{ fontSize: "13px", margin: 0, color: "#64748b" }}>
                {searchQuery ? "Try refining your search terms" : "Brands registered through the portal will appear here"}
              </p>
            </div>
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
                gap: "24px",
              }}
            >
              {filteredBrands.map((brand) => {
                const initials = (brand.brandName || brand.name || "BR")
                  .trim()
                  .slice(0, 2)
                  .toUpperCase();
                const formattedSite = formatUrl(brand.websiteLink);

                return (
                  <div
                    key={brand._id}
                    style={{
                      border: "1px solid rgba(255, 255, 255, 0.08)",
                      borderRadius: "16px",
                      background: "rgba(30, 41, 59, 0.4)",
                      backdropFilter: "blur(12px)",
                      padding: "24px",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      transition: "transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease",
                      position: "relative",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = "rgba(56, 189, 248, 0.35)";
                      e.currentTarget.style.transform = "translateY(-3px)";
                      e.currentTarget.style.boxShadow = "0 8px 24px -4px rgba(14, 165, 233, 0.15)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.08)";
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  >
                    <div>
                      {/* Brand Header */}
                      <div
                        style={{
                          display: "flex",
                          alignItems: "flex-start",
                          justifyContent: "space-between",
                          gap: "12px",
                          marginBottom: "16px",
                        }}
                      >
                        <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                          <div
                            style={{
                              width: "48px",
                              height: "48px",
                              borderRadius: "12px",
                              background: "linear-gradient(135deg, #0ea5e9 0%, #3b82f6 50%, #8b5cf6 100%)",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              color: "#ffffff",
                              fontSize: "18px",
                              fontWeight: "bold",
                              boxShadow: "0 4px 12px rgba(14, 165, 233, 0.3)",
                              flexShrink: 0,
                            }}
                          >
                            {initials}
                          </div>
                          <div>
                            <h3
                              style={{
                                margin: 0,
                                fontSize: "18px",
                                fontWeight: "700",
                                color: "#f8fafc",
                                wordBreak: "break-word",
                              }}
                            >
                              {brand.brandName || "Brand"}
                            </h3>
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "6px",
                                marginTop: "3px",
                                fontSize: "13px",
                                color: "#94a3b8",
                              }}
                            >
                              <User size={13} color="#60a5fa" />
                              <span>{brand.name || "Contact Person"}</span>
                            </div>
                          </div>
                        </div>

                        <span
                          style={{
                            fontSize: "11px",
                            fontWeight: 600,
                            padding: "4px 8px",
                            borderRadius: "6px",
                            background: "rgba(56, 189, 248, 0.12)",
                            color: "#38bdf8",
                            border: "1px solid rgba(56, 189, 248, 0.25)",
                            textTransform: "uppercase",
                            letterSpacing: "0.5px",
                            whiteSpace: "nowrap",
                          }}
                        >
                          Partner
                        </span>
                      </div>

                      {/* Description (if provided) */}
                      {brand.description && (
                        <div
                          style={{
                            padding: "10px 12px",
                            borderRadius: "10px",
                            background: "rgba(15, 23, 42, 0.5)",
                            border: "1px solid rgba(255, 255, 255, 0.05)",
                            fontSize: "13px",
                            color: "#cbd5e1",
                            marginBottom: "16px",
                            lineHeight: "1.5",
                            display: "flex",
                            gap: "8px",
                          }}
                        >
                          <FileText size={15} color="#94a3b8" style={{ flexShrink: 0, marginTop: "2px" }} />
                          <span style={{ wordBreak: "break-word" }}>{brand.description}</span>
                        </div>
                      )}

                      {/* Contact & Info Details */}
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "10px",
                          marginBottom: "16px",
                          fontSize: "13px",
                        }}
                      >
                        {brand.email && (
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between",
                              gap: "8px",
                            }}
                          >
                            <a
                              href={`mailto:${brand.email}`}
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "8px",
                                color: "#cbd5e1",
                                textDecoration: "none",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap",
                              }}
                              className="hover:text-blue-400"
                              title={brand.email}
                            >
                              <Mail size={14} color="#38bdf8" style={{ flexShrink: 0 }} />
                              <span style={{ overflow: "hidden", textOverflow: "ellipsis" }}>{brand.email}</span>
                            </a>
                            <button
                              type="button"
                              onClick={() => copyToClipboard(brand.email!, `email-${brand._id}`)}
                              title="Copy email"
                              style={{
                                background: "none",
                                border: "none",
                                color: copiedId === `email-${brand._id}` ? "#4ade80" : "#64748b",
                                cursor: "pointer",
                                padding: "2px",
                                display: "flex",
                                alignItems: "center",
                              }}
                            >
                              {copiedId === `email-${brand._id}` ? <Check size={14} /> : <Copy size={14} />}
                            </button>
                          </div>
                        )}

                        {brand.phoneNumber && (
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between",
                              gap: "8px",
                            }}
                          >
                            <a
                              href={`tel:${brand.phoneNumber}`}
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "8px",
                                color: "#cbd5e1",
                                textDecoration: "none",
                              }}
                              className="hover:text-blue-400"
                              title={brand.phoneNumber}
                            >
                              <Phone size={14} color="#4ade80" style={{ flexShrink: 0 }} />
                              <span>{brand.phoneNumber}</span>
                            </a>
                            <button
                              type="button"
                              onClick={() => copyToClipboard(brand.phoneNumber!, `phone-${brand._id}`)}
                              title="Copy phone"
                              style={{
                                background: "none",
                                border: "none",
                                color: copiedId === `phone-${brand._id}` ? "#4ade80" : "#64748b",
                                cursor: "pointer",
                                padding: "2px",
                                display: "flex",
                                alignItems: "center",
                              }}
                            >
                              {copiedId === `phone-${brand._id}` ? <Check size={14} /> : <Copy size={14} />}
                            </button>
                          </div>
                        )}

                        {brand.instagram && (
                          <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "#cbd5e1" }}>
                            <Camera size={14} color="#ec4899" style={{ flexShrink: 0 }} />
                            <span>{brand.instagram.startsWith("@") ? brand.instagram : `@${brand.instagram}`}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Card Footer: Website Link & Date */}
                    <div
                      style={{
                        paddingTop: "14px",
                        borderTop: "1px solid rgba(255, 255, 255, 0.07)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        flexWrap: "wrap",
                        gap: "8px",
                      }}
                    >
                      {formattedSite ? (
                        <a
                          href={formattedSite}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "6px",
                            fontSize: "12px",
                            fontWeight: 500,
                            color: "#60a5fa",
                            textDecoration: "none",
                            background: "rgba(59, 130, 246, 0.1)",
                            padding: "6px 12px",
                            borderRadius: "8px",
                            border: "1px solid rgba(59, 130, 246, 0.2)",
                            transition: "all 0.2s ease",
                          }}
                          className="hover:bg-blue-500/20"
                        >
                          <Globe size={13} />
                          <span>Visit Website</span>
                          <ExternalLink size={12} />
                        </a>
                      ) : (
                        <span style={{ fontSize: "12px", color: "#64748b" }}>No website listed</span>
                      )}

                      {brand.createdAt && (
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "5px",
                            fontSize: "11px",
                            color: "#64748b",
                          }}
                        >
                          <Calendar size={12} />
                          <span>{new Date(brand.createdAt).toLocaleDateString()}</span>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      )}

      {/* Creators Section */}
      {(activeTab === "all" || activeTab === "creators") && (
        <section className="glass-panel animate-fade-in" style={{ padding: "32px", borderRadius: "16px" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "24px",
              flexWrap: "wrap",
              gap: "12px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div
                style={{
                  display: "inline-flex",
                  padding: "10px",
                  borderRadius: "12px",
                  background: "linear-gradient(135deg, rgba(168, 85, 247, 0.15) 0%, rgba(217, 70, 239, 0.25) 100%)",
                  border: "1px solid rgba(168, 85, 247, 0.2)",
                }}
              >
                <UserCircle size={22} color="#c084fc" />
              </div>
              <div>
                <h2 style={{ margin: 0, fontSize: "20px", fontWeight: "bold", color: "#f8fafc" }}>
                  Registered Creators
                </h2>
                <p style={{ margin: "4px 0 0 0", fontSize: "13px", color: "#94a3b8" }}>
                  Fetched from <code style={{ color: "#c084fc", background: "rgba(168, 85, 247, 0.1)", padding: "2px 6px", borderRadius: "4px" }}>/api/creators</code>
                </p>
              </div>
            </div>

            <div
              style={{
                fontSize: "13px",
                color: "#94a3b8",
                background: "rgba(255, 255, 255, 0.05)",
                padding: "6px 14px",
                borderRadius: "20px",
                border: "1px solid rgba(255, 255, 255, 0.08)",
              }}
            >
              Showing <strong style={{ color: "#c084fc" }}>{filteredCreators.length}</strong> of {creators.length} creators
            </div>
          </div>

          {filteredCreators.length === 0 ? (
            <div
              style={{
                textAlign: "center",
                padding: "54px 20px",
                color: "#94a3b8",
                border: "1px dashed rgba(255, 255, 255, 0.15)",
                borderRadius: "14px",
                background: "rgba(255, 255, 255, 0.01)",
              }}
            >
              <UserCircle size={40} color="#64748b" style={{ margin: "0 auto 14px", display: "block" }} />
              <p style={{ fontSize: "16px", fontWeight: 500, margin: "0 0 6px 0", color: "#cbd5e1" }}>
                {searchQuery ? "No matching creators found" : "No creators registered yet."}
              </p>
              {!searchQuery && (
                <Link
                  href="/dashboard/add-creator"
                  style={{
                    color: "#60a5fa",
                    textDecoration: "none",
                    fontWeight: 500,
                    marginTop: "8px",
                    display: "inline-block",
                  }}
                >
                  Add your first creator
                </Link>
              )}
            </div>
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
                gap: "24px",
              }}
            >
              {filteredCreators.map((creator) => (
                <div
                  key={creator._id}
                  style={{
                    border: "1px solid rgba(255, 255, 255, 0.08)",
                    borderRadius: "16px",
                    overflow: "hidden",
                    background: "rgba(30, 41, 59, 0.4)",
                    backdropFilter: "blur(12px)",
                    transition: "transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "rgba(168, 85, 247, 0.35)";
                    e.currentTarget.style.transform = "translateY(-3px)";
                    e.currentTarget.style.boxShadow = "0 8px 24px -4px rgba(168, 85, 247, 0.15)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.08)";
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  <div style={{ height: "160px", width: "100%", position: "relative", background: "#1e293b" }}>
                    {creator.images && creator.images.length > 0 ? (
                      <img
                        src={creator.images[0]}
                        alt={creator.name}
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                      />
                    ) : (
                      <div
                        style={{
                          width: "100%",
                          height: "100%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          background: "linear-gradient(135deg, #3b82f620 0%, #8b5cf620 100%)",
                          color: "#8b5cf6",
                          fontSize: "64px",
                          fontWeight: "bold",
                          borderBottom: "1px solid rgba(255,255,255,0.05)",
                        }}
                      >
                        {creator.name ? creator.name.charAt(0).toUpperCase() : <UserCircle size={48} />}
                      </div>
                    )}
                    {creator.images && creator.images.length > 1 && (
                      <div
                        style={{
                          position: "absolute",
                          bottom: "8px",
                          right: "8px",
                          background: "rgba(0,0,0,0.6)",
                          padding: "4px 8px",
                          borderRadius: "4px",
                          fontSize: "12px",
                          fontWeight: "bold",
                        }}
                      >
                        +{creator.images.length - 1} more
                      </div>
                    )}
                  </div>
                  <div style={{ padding: "20px" }}>
                    <h3 style={{ margin: "0 0 16px 0", fontSize: "20px", fontWeight: 600 }}>{creator.name}</h3>

                    <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
                      {creator.following?.youtube ? (
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "6px",
                            fontSize: "13px",
                            color: "#cbd5e1",
                          }}
                        >
                          <Video size={14} color="#ef4444" /> {creator.following.youtube.toLocaleString()}
                        </div>
                      ) : null}

                      {creator.following?.linkedin ? (
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "6px",
                            fontSize: "13px",
                            color: "#cbd5e1",
                          }}
                        >
                          <Briefcase size={14} color="#3b82f6" /> {creator.following.linkedin.toLocaleString()}
                        </div>
                      ) : null}

                      {creator.following?.instagram ? (
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "6px",
                            fontSize: "13px",
                            color: "#cbd5e1",
                          }}
                        >
                          <Camera size={14} color="#ec4899" /> {creator.following.instagram.toLocaleString()}
                        </div>
                      ) : null}
                    </div>
                    <div style={{ marginTop: "16px", fontSize: "12px", color: "#64748b" }}>
                      Added on {new Date(creator.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      )}
    </div>
  );
}
