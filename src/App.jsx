import React, { useState, useEffect, createContext, useContext } from 'react';
import { createClient } from '@supabase/supabase-js';

// ============================================
// SUPABASE CONFIGURATION - UPDATE THESE VALUES
// ============================================
const SUPABASE_URL = 'https://eqcfzrxfidzkkslxcbzl.supabase.co';
const SUPABASE_ANON_KEY = 'sb_secret_1lHQIrBgUUoTAn1y_dbfXg_vsULt-94';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// ============================================
// CONTEXT
// ============================================
const AuthContext = createContext(null);
const useAuth = () => useContext(AuthContext);

// ============================================
// STYLES
// ============================================
const styles = `
@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;600;700&family=Outfit:wght@300;400;500;600;700&display=swap');

:root {
  --bg-primary: #0a0a0f;
  --bg-secondary: #12121a;
  --bg-tertiary: #1a1a25;
  --bg-card: #16161f;
  --border: #2a2a3a;
  --border-hover: #3a3a4a;
  --text-primary: #e8e8ed;
  --text-secondary: #8888a0;
  --text-muted: #5a5a70;
  --accent-green: #00d68f;
  --accent-green-dim: #00d68f22;
  --accent-red: #ff4d6a;
  --accent-red-dim: #ff4d6a22;
  --accent-blue: #4da6ff;
  --accent-blue-dim: #4da6ff22;
  --accent-gold: #ffc857;
  --accent-gold-dim: #ffc85722;
  --accent-purple: #a855f7;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Outfit', sans-serif;
  background: var(--bg-primary);
  color: var(--text-primary);
  min-height: 100vh;
  line-height: 1.6;
}

.app-container {
  min-height: 100vh;
  background: 
    radial-gradient(ellipse at 20% 0%, rgba(0, 214, 143, 0.03) 0%, transparent 50%),
    radial-gradient(ellipse at 80% 100%, rgba(77, 166, 255, 0.03) 0%, transparent 50%),
    var(--bg-primary);
}

/* Typography */
h1, h2, h3, h4 {
  font-weight: 600;
  letter-spacing: -0.02em;
}

.mono {
  font-family: 'JetBrains Mono', monospace;
}

/* Layout */
.dashboard {
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid var(--border);
}

.logo {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.logo-icon {
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, var(--accent-green), var(--accent-blue));
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 1.25rem;
}

.logo-text {
  font-size: 1.5rem;
  font-weight: 700;
  background: linear-gradient(135deg, var(--text-primary), var(--text-secondary));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.user-badge {
  padding: 0.5rem 1rem;
  background: var(--bg-tertiary);
  border-radius: 8px;
  font-size: 0.875rem;
  color: var(--text-secondary);
  border: 1px solid var(--border);
}

.user-badge.admin {
  border-color: var(--accent-green);
  color: var(--accent-green);
}

.user-badge.viewer {
  border-color: var(--accent-blue);
  color: var(--accent-blue);
}

/* Buttons */
.btn {
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  font-family: 'Outfit', sans-serif;
  font-weight: 500;
  font-size: 0.9rem;
  transition: all 0.2s ease;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

.btn-primary {
  background: var(--accent-green);
  color: var(--bg-primary);
}

.btn-primary:hover {
  background: #00f0a0;
  transform: translateY(-1px);
}

.btn-secondary {
  background: var(--bg-tertiary);
  color: var(--text-primary);
  border: 1px solid var(--border);
}

.btn-secondary:hover {
  border-color: var(--border-hover);
  background: var(--bg-card);
}

.btn-danger {
  background: var(--accent-red-dim);
  color: var(--accent-red);
  border: 1px solid var(--accent-red);
}

.btn-danger:hover {
  background: var(--accent-red);
  color: white;
}

.btn-small {
  padding: 0.5rem 1rem;
  font-size: 0.8rem;
}

/* Cards */
.card {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 1rem;
  transition: border-color 0.2s ease;
}

.card:hover {
  border-color: var(--border-hover);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.card-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--text-primary);
}

.card-subtitle {
  font-size: 0.85rem;
  color: var(--text-muted);
  margin-top: 0.25rem;
}

/* Alert Banners */
.alert-banner {
  padding: 1rem 1.5rem;
  border-radius: 10px;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  animation: slideIn 0.3s ease;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.alert-banner.warning {
  background: var(--accent-gold-dim);
  border: 1px solid var(--accent-gold);
  color: var(--accent-gold);
}

.alert-banner.error {
  background: var(--accent-red-dim);
  border: 1px solid var(--accent-red);
  color: var(--accent-red);
}

.alert-banner.success {
  background: var(--accent-green-dim);
  border: 1px solid var(--accent-green);
  color: var(--accent-green);
}

.alert-banner.info {
  background: var(--accent-blue-dim);
  border: 1px solid var(--accent-blue);
  color: var(--accent-blue);
}

/* Forms */
.form-group {
  margin-bottom: 1.25rem;
}

.form-label {
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--text-secondary);
  margin-bottom: 0.5rem;
}

.form-input, .form-textarea, .form-select {
  width: 100%;
  padding: 0.75rem 1rem;
  background: var(--bg-secondary);
  border: 1px solid var(--border);
  border-radius: 8px;
  color: var(--text-primary);
  font-family: 'Outfit', sans-serif;
  font-size: 0.95rem;
  transition: border-color 0.2s ease;
}

.form-input:focus, .form-textarea:focus, .form-select:focus {
  outline: none;
  border-color: var(--accent-blue);
}

.form-textarea {
  min-height: 120px;
  resize: vertical;
}

.form-checkbox-group {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.form-checkbox-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.75rem;
  background: var(--bg-secondary);
  border: 1px solid var(--border);
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.85rem;
  color: var(--text-secondary);
  transition: all 0.2s ease;
}

.form-checkbox-label:has(input:checked) {
  border-color: var(--accent-green);
  color: var(--accent-green);
  background: var(--accent-green-dim);
}

.form-checkbox-label input {
  accent-color: var(--accent-green);
}

/* Grid */
.grid-2 {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}

.grid-3 {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}

.grid-4 {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
}

@media (max-width: 1024px) {
  .grid-4 {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .grid-2, .grid-3, .grid-4 {
    grid-template-columns: 1fr;
  }
  
  .dashboard {
    padding: 1rem;
  }
  
  .header {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }
}

/* Tabs */
.tabs {
  display: flex;
  gap: 0.25rem;
  background: var(--bg-secondary);
  padding: 0.25rem;
  border-radius: 10px;
  margin-bottom: 1.5rem;
  overflow-x: auto;
}

.tab {
  padding: 0.75rem 1.25rem;
  border-radius: 8px;
  border: none;
  background: transparent;
  color: var(--text-secondary);
  cursor: pointer;
  font-family: 'Outfit', sans-serif;
  font-weight: 500;
  font-size: 0.9rem;
  transition: all 0.2s ease;
  white-space: nowrap;
}

.tab:hover {
  color: var(--text-primary);
}

.tab.active {
  background: var(--bg-card);
  color: var(--text-primary);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

.tab.locked {
  opacity: 0.5;
  cursor: not-allowed;
}

.tab.locked::after {
  content: ' 🔒';
  font-size: 0.8em;
}

/* Stats */
.stats-row {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.stat-card {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 1.25rem;
}

.stat-label {
  font-size: 0.8rem;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 0.5rem;
}

.stat-value {
  font-family: 'JetBrains Mono', monospace;
  font-size: 1.5rem;
  font-weight: 600;
}

.stat-value.positive {
  color: var(--accent-green);
}

.stat-value.negative {
  color: var(--accent-red);
}

/* Trade Table */
.trade-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.85rem;
}

.trade-table th {
  text-align: left;
  padding: 0.75rem;
  color: var(--text-muted);
  font-weight: 500;
  text-transform: uppercase;
  font-size: 0.75rem;
  letter-spacing: 0.05em;
  border-bottom: 1px solid var(--border);
}

.trade-table td {
  padding: 0.75rem;
  border-bottom: 1px solid var(--border);
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.8rem;
}

.trade-table tr:hover {
  background: var(--bg-secondary);
}

.trade-table .buy {
  color: var(--accent-green);
}

.trade-table .sell {
  color: var(--accent-red);
}

/* Image Upload */
.image-upload-zone {
  border: 2px dashed var(--border);
  border-radius: 12px;
  padding: 2rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s ease;
  background: var(--bg-secondary);
}

.image-upload-zone:hover {
  border-color: var(--accent-blue);
  background: var(--accent-blue-dim);
}

.image-upload-zone.dragover {
  border-color: var(--accent-green);
  background: var(--accent-green-dim);
}

.image-upload-zone input {
  display: none;
}

.image-upload-icon {
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
}

.image-upload-text {
  color: var(--text-secondary);
  font-size: 0.9rem;
}

.image-preview {
  margin-top: 1rem;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid var(--border);
}

.image-preview img {
  width: 100%;
  height: auto;
  display: block;
}

/* Chart Grid */
.charts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1rem;
}

.chart-card {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 10px;
  overflow: hidden;
}

.chart-card-header {
  padding: 0.75rem 1rem;
  background: var(--bg-tertiary);
  border-bottom: 1px solid var(--border);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.chart-card-title {
  font-weight: 600;
  font-size: 0.9rem;
}

.chart-card-status {
  font-size: 0.75rem;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
}

.chart-card-status.updated {
  background: var(--accent-green-dim);
  color: var(--accent-green);
}

.chart-card-status.outdated {
  background: var(--accent-red-dim);
  color: var(--accent-red);
}

.chart-card-body {
  padding: 1rem;
}

.chart-card-image {
  width: 100%;
  height: 180px;
  object-fit: cover;
  border-radius: 6px;
  background: var(--bg-secondary);
}

/* Timeline */
.timeline {
  position: relative;
  padding-left: 2rem;
}

.timeline::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 2px;
  background: var(--border);
}

.timeline-item {
  position: relative;
  padding-bottom: 1.5rem;
}

.timeline-item::before {
  content: '';
  position: absolute;
  left: -2rem;
  top: 0.5rem;
  width: 10px;
  height: 10px;
  background: var(--accent-blue);
  border-radius: 50%;
  transform: translateX(-4px);
}

.timeline-date {
  font-size: 0.8rem;
  color: var(--text-muted);
  margin-bottom: 0.25rem;
}

.timeline-content {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 1rem;
}

/* Login Page */
.login-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.login-card {
  width: 100%;
  max-width: 420px;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 16px;
  padding: 2.5rem;
}

.login-header {
  text-align: center;
  margin-bottom: 2rem;
}

.login-logo {
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, var(--accent-green), var(--accent-blue));
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 1.75rem;
  margin: 0 auto 1rem;
}

.login-title {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
}

.login-subtitle {
  color: var(--text-secondary);
  font-size: 0.9rem;
}

/* Modal */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  z-index: 1000;
  animation: fadeIn 0.2s ease;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.modal {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 16px;
  width: 100%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
  animation: scaleIn 0.2s ease;
}

@keyframes scaleIn {
  from { 
    opacity: 0;
    transform: scale(0.95);
  }
  to { 
    opacity: 1;
    transform: scale(1);
  }
}

.modal-header {
  padding: 1.5rem;
  border-bottom: 1px solid var(--border);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-title {
  font-size: 1.25rem;
  font-weight: 600;
}

.modal-close {
  background: none;
  border: none;
  color: var(--text-secondary);
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.25rem;
  line-height: 1;
}

.modal-close:hover {
  color: var(--text-primary);
}

.modal-body {
  padding: 1.5rem;
}

.modal-footer {
  padding: 1.5rem;
  border-top: 1px solid var(--border);
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
}

/* Period Selector */
.period-nav {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.period-nav-btn {
  background: var(--bg-tertiary);
  border: 1px solid var(--border);
  color: var(--text-secondary);
  width: 36px;
  height: 36px;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.period-nav-btn:hover {
  border-color: var(--border-hover);
  color: var(--text-primary);
}

.period-nav-btn:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.period-display {
  font-family: 'JetBrains Mono', monospace;
  font-size: 1rem;
  color: var(--text-primary);
  min-width: 200px;
  text-align: center;
}

/* Completion Status */
.completion-indicator {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.75rem;
  border-radius: 6px;
  font-size: 0.8rem;
  font-weight: 500;
}

.completion-indicator.complete {
  background: var(--accent-green-dim);
  color: var(--accent-green);
}

.completion-indicator.incomplete {
  background: var(--accent-red-dim);
  color: var(--accent-red);
}

.completion-indicator.partial {
  background: var(--accent-gold-dim);
  color: var(--accent-gold);
}

/* Scrollbar */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: var(--bg-secondary);
}

::-webkit-scrollbar-thumb {
  background: var(--border);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: var(--border-hover);
}

/* Loading */
.loading-spinner {
  display: inline-block;
  width: 20px;
  height: 20px;
  border: 2px solid var(--border);
  border-top-color: var(--accent-blue);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* Empty State */
.empty-state {
  text-align: center;
  padding: 3rem;
  color: var(--text-muted);
}

.empty-state-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
  opacity: 0.5;
}

.empty-state-title {
  font-size: 1.1rem;
  color: var(--text-secondary);
  margin-bottom: 0.5rem;
}

.empty-state-desc {
  font-size: 0.9rem;
  max-width: 300px;
  margin: 0 auto;
}
`;

// ============================================
// UTILITY FUNCTIONS
// ============================================
const PERIODS = ['yearly', 'quarterly', 'monthly', 'weekly', 'daily'];
const MAPS = ['DXY', 'S&P', 'XAU', 'XAG', 'ETHBTC', 'BTCUSD', 'ETHUSD', 'ZECUSD'];

const getCurrentPeriodKey = (period) => {
  const now = new Date();
  const year = now.getFullYear();
  const quarter = Math.ceil((now.getMonth() + 1) / 3);
  const month = now.getMonth() + 1;
  const week = getWeekNumber(now);
  const day = now.toISOString().split('T')[0];
  
  switch (period) {
    case 'yearly': return `${year}`;
    case 'quarterly': return `${year}-Q${quarter}`;
    case 'monthly': return `${year}-${String(month).padStart(2, '0')}`;
    case 'weekly': return `${year}-W${String(week).padStart(2, '0')}`;
    case 'daily': return day;
    default: return day;
  }
};

const getWeekNumber = (date) => {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
};

const formatPeriodDisplay = (period, key) => {
  if (!key) return 'Select Period';
  switch (period) {
    case 'yearly': return key;
    case 'quarterly': return key.replace('-Q', ' Q');
    case 'monthly': {
      const [year, month] = key.split('-');
      const date = new Date(year, parseInt(month) - 1);
      return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
    }
    case 'weekly': return key.replace('-W', ' Week ');
    case 'daily': {
      const date = new Date(key);
      return date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' });
    }
    default: return key;
  }
};

const getParentPeriodKey = (period, key) => {
  if (!key) return null;
  const date = periodKeyToDate(period, key);
  
  switch (period) {
    case 'quarterly': return `${date.getFullYear()}`;
    case 'monthly': {
      const quarter = Math.ceil((date.getMonth() + 1) / 3);
      return `${date.getFullYear()}-Q${quarter}`;
    }
    case 'weekly': {
      return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    }
    case 'daily': {
      const week = getWeekNumber(date);
      return `${date.getFullYear()}-W${String(week).padStart(2, '0')}`;
    }
    default: return null;
  }
};

const periodKeyToDate = (period, key) => {
  switch (period) {
    case 'yearly': return new Date(parseInt(key), 0, 1);
    case 'quarterly': {
      const [year, q] = key.split('-Q');
      return new Date(parseInt(year), (parseInt(q) - 1) * 3, 1);
    }
    case 'monthly': {
      const [year, month] = key.split('-');
      return new Date(parseInt(year), parseInt(month) - 1, 1);
    }
    case 'weekly': {
      const [year, w] = key.split('-W');
      const date = new Date(parseInt(year), 0, 1);
      date.setDate(date.getDate() + (parseInt(w) - 1) * 7);
      return date;
    }
    case 'daily': return new Date(key);
    default: return new Date();
  }
};

const navigatePeriod = (period, key, direction) => {
  const date = periodKeyToDate(period, key);
  
  switch (period) {
    case 'yearly':
      date.setFullYear(date.getFullYear() + direction);
      return `${date.getFullYear()}`;
    case 'quarterly': {
      const currentQ = Math.ceil((date.getMonth() + 1) / 3);
      let newQ = currentQ + direction;
      let year = date.getFullYear();
      if (newQ > 4) { newQ = 1; year++; }
      if (newQ < 1) { newQ = 4; year--; }
      return `${year}-Q${newQ}`;
    }
    case 'monthly':
      date.setMonth(date.getMonth() + direction);
      return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    case 'weekly':
      date.setDate(date.getDate() + direction * 7);
      return `${date.getFullYear()}-W${String(getWeekNumber(date)).padStart(2, '0')}`;
    case 'daily':
      date.setDate(date.getDate() + direction);
      return date.toISOString().split('T')[0];
    default:
      return key;
  }
};

// ============================================
// COMPONENTS
// ============================================

// Login Component
const LoginPage = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (isSignUp) {
        const { data, error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
        if (data.user) {
          // Create user profile
          await supabase.from('profiles').insert({
            id: data.user.id,
            email: email,
            role: 'trader', // First user is trader, can invite wife as viewer
            created_at: new Date().toISOString()
          });
        }
        setError('Check your email to confirm your account!');
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <div className="login-logo">TJ</div>
          <h1 className="login-title">Trading Journal</h1>
          <p className="login-subtitle">
            {isSignUp ? 'Create your account' : 'Welcome back, trader'}
          </p>
        </div>

        {error && (
          <div className={`alert-banner ${error.includes('Check your email') ? 'success' : 'error'}`}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              minLength={6}
            />
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '0.5rem' }} disabled={loading}>
            {loading ? <span className="loading-spinner" /> : (isSignUp ? 'Create Account' : 'Sign In')}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
          <button
            onClick={() => setIsSignUp(!isSignUp)}
            style={{ background: 'none', border: 'none', color: 'var(--accent-blue)', cursor: 'pointer', fontSize: '0.9rem' }}
          >
            {isSignUp ? 'Already have an account? Sign in' : "Don't have an account? Sign up"}
          </button>
        </div>
      </div>
    </div>
  );
};

// Reminder Banners
const ReminderBanners = ({ templates }) => {
  const [dismissed, setDismissed] = useState([]);
  const reminders = [];

  PERIODS.forEach(period => {
    const currentKey = getCurrentPeriodKey(period);
    const template = templates[period]?.[currentKey];
    
    if (!template || !template.completed) {
      reminders.push({
        period,
        key: currentKey,
        message: `Your ${period} plan for ${formatPeriodDisplay(period, currentKey)} needs attention!`
      });
    }
  });

  const visibleReminders = reminders.filter(r => !dismissed.includes(`${r.period}-${r.key}`));

  if (visibleReminders.length === 0) return null;

  return (
    <div>
      {visibleReminders.slice(0, 2).map((reminder, idx) => (
        <div key={idx} className="alert-banner warning">
          <span>⚠️</span>
          <span style={{ flex: 1 }}>{reminder.message}</span>
          <button
            className="btn btn-small btn-secondary"
            onClick={() => setDismissed([...dismissed, `${reminder.period}-${reminder.key}`])}
          >
            Dismiss
          </button>
        </div>
      ))}
    </div>
  );
};

// Stats Overview
const StatsOverview = ({ trades, period, periodKey }) => {
  const periodTrades = trades.filter(t => {
    const tradeDate = new Date(t.date);
    const periodDate = periodKeyToDate(period, periodKey);
    
    switch (period) {
      case 'daily':
        return t.date === periodKey;
      case 'weekly': {
        const tradeWeek = getWeekNumber(tradeDate);
        const periodWeek = getWeekNumber(periodDate);
        return tradeDate.getFullYear() === periodDate.getFullYear() && tradeWeek === periodWeek;
      }
      case 'monthly':
        return tradeDate.getFullYear() === periodDate.getFullYear() && 
               tradeDate.getMonth() === periodDate.getMonth();
      case 'quarterly': {
        const tradeQ = Math.ceil((tradeDate.getMonth() + 1) / 3);
        const periodQ = Math.ceil((periodDate.getMonth() + 1) / 3);
        return tradeDate.getFullYear() === periodDate.getFullYear() && tradeQ === periodQ;
      }
      case 'yearly':
        return tradeDate.getFullYear() === periodDate.getFullYear();
      default:
        return false;
    }
  });

  const totalPnL = periodTrades.reduce((sum, t) => sum + (t.pnl || 0), 0);
  const winningTrades = periodTrades.filter(t => t.pnl > 0);
  const losingTrades = periodTrades.filter(t => t.pnl < 0);
  const winRate = periodTrades.length > 0 ? (winningTrades.length / periodTrades.length * 100).toFixed(1) : 0;
  const avgWin = winningTrades.length > 0 ? winningTrades.reduce((sum, t) => sum + t.pnl, 0) / winningTrades.length : 0;
  const avgLoss = losingTrades.length > 0 ? Math.abs(losingTrades.reduce((sum, t) => sum + t.pnl, 0) / losingTrades.length) : 0;

  return (
    <div className="stats-row">
      <div className="stat-card">
        <div className="stat-label">Total P&L</div>
        <div className={`stat-value ${totalPnL >= 0 ? 'positive' : 'negative'}`}>
          {totalPnL >= 0 ? '+' : ''}{totalPnL.toFixed(2)}
        </div>
      </div>
      <div className="stat-card">
        <div className="stat-label">Trades</div>
        <div className="stat-value">{periodTrades.length}</div>
      </div>
      <div className="stat-card">
        <div className="stat-label">Win Rate</div>
        <div className={`stat-value ${parseFloat(winRate) >= 50 ? 'positive' : 'negative'}`}>
          {winRate}%
        </div>
      </div>
      <div className="stat-card">
        <div className="stat-label">Avg Win</div>
        <div className="stat-value positive">+{avgWin.toFixed(2)}</div>
      </div>
      <div className="stat-card">
        <div className="stat-label">Avg Loss</div>
        <div className="stat-value negative">-{avgLoss.toFixed(2)}</div>
      </div>
    </div>
  );
};

// Image Upload Component
const ImageUpload = ({ value, onChange, label, placeholder }) => {
  const [dragOver, setDragOver] = useState(false);
  const inputRef = React.useRef();

  const handleFile = async (file) => {
    if (!file) return;
    
    // Convert to base64 for storage (in production, upload to Supabase Storage)
    const reader = new FileReader();
    reader.onload = (e) => {
      onChange(e.target.result);
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    handleFile(e.dataTransfer.files[0]);
  };

  return (
    <div className="form-group">
      {label && <label className="form-label">{label}</label>}
      <div
        className={`image-upload-zone ${dragOver ? 'dragover' : ''}`}
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          onChange={(e) => handleFile(e.target.files[0])}
        />
        <div className="image-upload-icon">📷</div>
        <div className="image-upload-text">
          {placeholder || 'Click or drag image to upload'}
        </div>
      </div>
      {value && (
        <div className="image-preview">
          <img src={value} alt="Preview" />
          <button
            className="btn btn-danger btn-small"
            style={{ margin: '0.5rem' }}
            onClick={(e) => { e.stopPropagation(); onChange(null); }}
          >
            Remove
          </button>
        </div>
      )}
    </div>
  );
};

// Maps Section
const MapsSection = ({ maps, onUpdate, readOnly }) => {
  return (
    <div className="card">
      <div className="card-header">
        <div>
          <h3 className="card-title">📊 Market Maps</h3>
          <p className="card-subtitle">Upload your chart screenshots</p>
        </div>
      </div>
      <div className="charts-grid">
        {MAPS.map(mapName => (
          <div key={mapName} className="chart-card">
            <div className="chart-card-header">
              <span className="chart-card-title">{mapName}</span>
              <span className={`chart-card-status ${maps[mapName] ? 'updated' : 'outdated'}`}>
                {maps[mapName] ? '✓ Updated' : '○ Needed'}
              </span>
            </div>
            <div className="chart-card-body">
              {readOnly ? (
                maps[mapName] ? (
                  <img src={maps[mapName]} alt={mapName} className="chart-card-image" />
                ) : (
                  <div className="empty-state" style={{ padding: '2rem' }}>
                    <div style={{ fontSize: '1.5rem', opacity: 0.3 }}>📈</div>
                    <div style={{ fontSize: '0.8rem' }}>No chart uploaded</div>
                  </div>
                )
              ) : (
                <ImageUpload
                  value={maps[mapName]}
                  onChange={(val) => onUpdate(mapName, val)}
                  placeholder={`Upload ${mapName} chart`}
                />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Trade Log Component
const TradeLog = ({ trades, onAddTrades, readOnly }) => {
  const [showUpload, setShowUpload] = useState(false);
  const [screenshot, setScreenshot] = useState(null);
  const [noTrading, setNoTrading] = useState(false);
  const [parsedTrades, setParsedTrades] = useState([]);

  // Simple mock parser - in production you'd use OCR
  const parseScreenshot = async (imageData) => {
    // For demo: generate sample trades from screenshot
    // In production: Use Tesseract.js or cloud OCR
    const mockTrades = [
      { id: Date.now(), symbol: 'ETHUSD', side: 'Buy', type: 'Opening', size: 50, price: 3241.73, pnl: -511.34, date: new Date().toISOString().split('T')[0] },
      { id: Date.now() + 1, symbol: 'ETHUSD', side: 'Sell', type: 'Closing', size: 50, price: 3233.77, pnl: 0, date: new Date().toISOString().split('T')[0] },
    ];
    setParsedTrades(mockTrades);
  };

  const handleConfirmTrades = () => {
    if (noTrading) {
      onAddTrades([], true);
    } else {
      onAddTrades(parsedTrades, false);
    }
    setShowUpload(false);
    setScreenshot(null);
    setParsedTrades([]);
  };

  return (
    <div className="card">
      <div className="card-header">
        <div>
          <h3 className="card-title">📈 Trade Log</h3>
          <p className="card-subtitle">{trades.length} trades recorded</p>
        </div>
        {!readOnly && (
          <button className="btn btn-primary btn-small" onClick={() => setShowUpload(true)}>
            + Add Trades
          </button>
        )}
      </div>

      {trades.length > 0 ? (
        <div style={{ overflowX: 'auto' }}>
          <table className="trade-table">
            <thead>
              <tr>
                <th>Time</th>
                <th>Symbol</th>
                <th>Side</th>
                <th>Type</th>
                <th>Size</th>
                <th>Price</th>
                <th>P&L</th>
              </tr>
            </thead>
            <tbody>
              {trades.map((trade, idx) => (
                <tr key={idx}>
                  <td>{trade.date}</td>
                  <td>{trade.symbol}</td>
                  <td className={trade.side?.toLowerCase()}>{trade.side}</td>
                  <td>{trade.type}</td>
                  <td>{trade.size}</td>
                  <td>{trade.price?.toFixed(2)}</td>
                  <td className={trade.pnl >= 0 ? 'buy' : 'sell'}>
                    {trade.pnl >= 0 ? '+' : ''}{trade.pnl?.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="empty-state">
          <div className="empty-state-icon">📊</div>
          <div className="empty-state-title">No trades yet</div>
          <div className="empty-state-desc">
            {readOnly ? 'No trades have been logged for this period' : 'Upload a screenshot of your trades to get started'}
          </div>
        </div>
      )}

      {showUpload && (
        <div className="modal-overlay" onClick={() => setShowUpload(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">Add Daily Trades</h3>
              <button className="modal-close" onClick={() => setShowUpload(false)}>×</button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label className="form-checkbox-label" style={{ display: 'inline-flex', marginBottom: '1rem' }}>
                  <input
                    type="checkbox"
                    checked={noTrading}
                    onChange={(e) => setNoTrading(e.target.checked)}
                  />
                  No trading today
                </label>
              </div>

              {!noTrading && (
                <>
                  <ImageUpload
                    value={screenshot}
                    onChange={(val) => {
                      setScreenshot(val);
                      if (val) parseScreenshot(val);
                    }}
                    label="Upload P&L Screenshot"
                    placeholder="Upload your broker's trade history screenshot"
                  />

                  {parsedTrades.length > 0 && (
                    <div style={{ marginTop: '1rem' }}>
                      <h4 style={{ fontSize: '0.9rem', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>
                        Parsed Trades (Review & Edit)
                      </h4>
                      <div style={{ overflowX: 'auto' }}>
                        <table className="trade-table">
                          <thead>
                            <tr>
                              <th>Symbol</th>
                              <th>Side</th>
                              <th>Size</th>
                              <th>Price</th>
                              <th>P&L</th>
                            </tr>
                          </thead>
                          <tbody>
                            {parsedTrades.map((trade, idx) => (
                              <tr key={idx}>
                                <td>{trade.symbol}</td>
                                <td className={trade.side?.toLowerCase()}>{trade.side}</td>
                                <td>{trade.size}</td>
                                <td>{trade.price?.toFixed(2)}</td>
                                <td className={trade.pnl >= 0 ? 'buy' : 'sell'}>
                                  {trade.pnl >= 0 ? '+' : ''}{trade.pnl?.toFixed(2)}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setShowUpload(false)}>Cancel</button>
              <button 
                className="btn btn-primary" 
                onClick={handleConfirmTrades}
                disabled={!noTrading && parsedTrades.length === 0}
              >
                {noTrading ? 'Confirm No Trading' : 'Save Trades'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Template Form Component
const TemplateForm = ({ period, data, onSave, readOnly, parentComplete }) => {
  const [formData, setFormData] = useState(data || {
    feeling: '',
    hasPlanFromBefore: false,
    planFromBefore: '',
    triptych: '(1D) 12h/6h/30mn (1mn exec)',
    mapsUpdated: {},
    planForPeriod: '',
    endOfPeriodReport: '',
    nextPeriodPlan: '',
    completed: false
  });

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleMapToggle = (map) => {
    setFormData(prev => ({
      ...prev,
      mapsUpdated: { ...prev.mapsUpdated, [map]: !prev.mapsUpdated[map] }
    }));
  };

  const handleSubmit = () => {
    onSave({ ...formData, completed: true });
  };

  const isBlocked = period !== 'yearly' && !parentComplete;

  if (isBlocked) {
    return (
      <div className="card">
        <div className="empty-state">
          <div className="empty-state-icon">🔒</div>
          <div className="empty-state-title">Complete Higher Timeframe First</div>
          <div className="empty-state-desc">
            You need to complete your {PERIODS[PERIODS.indexOf(period) - 1]} plan before you can fill out this {period} template.
          </div>
        </div>
      </div>
    );
  }

  const periodLabels = {
    yearly: { plan: 'Plan for the Year', report: 'End of Year Report', next: "Next Year's Goals" },
    quarterly: { plan: 'Plan for the Quarter', report: 'End of Quarter Report', next: "Next Quarter's Focus" },
    monthly: { plan: 'Plan for the Month', report: 'End of Month Report', next: "Next Month's Plan" },
    weekly: { plan: 'Plan for the Week', report: 'End of Week Report', next: "Next Week's Plan" },
    daily: { plan: 'Plan for the Day', report: 'End of Day Report', next: "Tomorrow's Plan / Notes" }
  };

  return (
    <div className="card">
      <div className="card-header">
        <div>
          <h3 className="card-title">📝 {period.charAt(0).toUpperCase() + period.slice(1)} Template</h3>
          <p className="card-subtitle">
            {formData.completed ? '✓ Completed' : 'Fill out your trading plan'}
          </p>
        </div>
        {formData.completed && (
          <span className="completion-indicator complete">✓ Complete</span>
        )}
      </div>

      <div className="form-group">
        <label className="form-label">Feeling</label>
        <textarea
          className="form-textarea"
          value={formData.feeling}
          onChange={(e) => handleChange('feeling', e.target.value)}
          placeholder="How are you feeling about the markets? Your mindset?"
          disabled={readOnly}
          rows={3}
        />
      </div>

      <div className="form-group">
        <label className="form-label">Is there a plan from before?</label>
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '0.5rem' }}>
          <label className="form-checkbox-label">
            <input
              type="radio"
              name={`plan-${period}`}
              checked={formData.hasPlanFromBefore === true}
              onChange={() => handleChange('hasPlanFromBefore', true)}
              disabled={readOnly}
            />
            Yes
          </label>
          <label className="form-checkbox-label">
            <input
              type="radio"
              name={`plan-${period}`}
              checked={formData.hasPlanFromBefore === false}
              onChange={() => handleChange('hasPlanFromBefore', false)}
              disabled={readOnly}
            />
            No
          </label>
        </div>
        {formData.hasPlanFromBefore && (
          <input
            className="form-input"
            value={formData.planFromBefore}
            onChange={(e) => handleChange('planFromBefore', e.target.value)}
            placeholder="From when / What is it?"
            disabled={readOnly}
          />
        )}
      </div>

      <div className="form-group">
        <label className="form-label">Which triptych to use (relative to plan)</label>
        <input
          className="form-input"
          value={formData.triptych}
          onChange={(e) => handleChange('triptych', e.target.value)}
          disabled={readOnly}
        />
      </div>

      <div className="form-group">
        <label className="form-label">Maps up to date?</label>
        <div className="form-checkbox-group">
          {MAPS.map(map => (
            <label key={map} className="form-checkbox-label">
              <input
                type="checkbox"
                checked={formData.mapsUpdated?.[map] || false}
                onChange={() => handleMapToggle(map)}
                disabled={readOnly}
              />
              {map}
            </label>
          ))}
        </div>
      </div>

      <div className="form-group">
        <label className="form-label">{periodLabels[period].plan}</label>
        <textarea
          className="form-textarea"
          value={formData.planForPeriod}
          onChange={(e) => handleChange('planForPeriod', e.target.value)}
          placeholder="What's your trading plan?"
          disabled={readOnly}
          rows={5}
        />
      </div>

      <div className="form-group">
        <label className="form-label">{periodLabels[period].report}</label>
        <textarea
          className="form-textarea"
          value={formData.endOfPeriodReport}
          onChange={(e) => handleChange('endOfPeriodReport', e.target.value)}
          placeholder="How did it go? What did you learn?"
          disabled={readOnly}
          rows={5}
        />
      </div>

      <div className="form-group">
        <label className="form-label">{periodLabels[period].next}</label>
        <textarea
          className="form-textarea"
          value={formData.nextPeriodPlan}
          onChange={(e) => handleChange('nextPeriodPlan', e.target.value)}
          placeholder="What's next?"
          disabled={readOnly}
          rows={3}
        />
      </div>

      {!readOnly && (
        <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.5rem' }}>
          <button className="btn btn-secondary" onClick={() => onSave(formData)}>
            Save Draft
          </button>
          <button className="btn btn-primary" onClick={handleSubmit}>
            Mark Complete
          </button>
        </div>
      )}
    </div>
  );
};

// Main Dashboard Component
const Dashboard = ({ user, profile }) => {
  const [activeTab, setActiveTab] = useState('daily');
  const [periodKeys, setPeriodKeys] = useState({
    yearly: getCurrentPeriodKey('yearly'),
    quarterly: getCurrentPeriodKey('quarterly'),
    monthly: getCurrentPeriodKey('monthly'),
    weekly: getCurrentPeriodKey('weekly'),
    daily: getCurrentPeriodKey('daily')
  });
  const [templates, setTemplates] = useState({
    yearly: {},
    quarterly: {},
    monthly: {},
    weekly: {},
    daily: {}
  });
  const [trades, setTrades] = useState([]);
  const [maps, setMaps] = useState({});
  const [loading, setLoading] = useState(true);

  const isViewer = profile?.role === 'viewer';

  // Load data from Supabase
  useEffect(() => {
    const loadData = async () => {
      try {
        // Load templates
        const { data: templateData } = await supabase
          .from('templates')
          .select('*')
          .eq('user_id', isViewer ? profile.trader_id : user.id);

        if (templateData) {
          const organized = { yearly: {}, quarterly: {}, monthly: {}, weekly: {}, daily: {} };
          templateData.forEach(t => {
            if (organized[t.period]) {
              organized[t.period][t.period_key] = t.data;
            }
          });
          setTemplates(organized);
        }

        // Load trades
        const { data: tradeData } = await supabase
          .from('trades')
          .select('*')
          .eq('user_id', isViewer ? profile.trader_id : user.id)
          .order('date', { ascending: false });

        if (tradeData) {
          setTrades(tradeData);
        }

        // Load maps
        const { data: mapData } = await supabase
          .from('maps')
          .select('*')
          .eq('user_id', isViewer ? profile.trader_id : user.id)
          .single();

        if (mapData) {
          setMaps(mapData.data || {});
        }
      } catch (err) {
        console.error('Error loading data:', err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [user, profile, isViewer]);

  // Save template
  const saveTemplate = async (period, periodKey, data) => {
    const newTemplates = {
      ...templates,
      [period]: {
        ...templates[period],
        [periodKey]: data
      }
    };
    setTemplates(newTemplates);

    try {
      await supabase
        .from('templates')
        .upsert({
          user_id: user.id,
          period,
          period_key: periodKey,
          data,
          updated_at: new Date().toISOString()
        }, { onConflict: 'user_id,period,period_key' });
    } catch (err) {
      console.error('Error saving template:', err);
    }
  };

  // Save trades
  const saveTrades = async (newTrades, noTrading) => {
    if (noTrading) {
      // Just mark the day as reviewed
      return;
    }

    const tradesToInsert = newTrades.map(t => ({
      ...t,
      user_id: user.id,
      created_at: new Date().toISOString()
    }));

    setTrades(prev => [...tradesToInsert, ...prev]);

    try {
      await supabase.from('trades').insert(tradesToInsert);
    } catch (err) {
      console.error('Error saving trades:', err);
    }
  };

  // Save map
  const saveMap = async (mapName, imageData) => {
    const newMaps = { ...maps, [mapName]: imageData };
    setMaps(newMaps);

    try {
      await supabase
        .from('maps')
        .upsert({
          user_id: user.id,
          data: newMaps,
          updated_at: new Date().toISOString()
        }, { onConflict: 'user_id' });
    } catch (err) {
      console.error('Error saving map:', err);
    }
  };

  const navigatePeriodKey = (direction) => {
    const newKey = navigatePeriod(activeTab, periodKeys[activeTab], direction);
    setPeriodKeys(prev => ({ ...prev, [activeTab]: newKey }));
  };

  const isParentComplete = (period) => {
    if (period === 'yearly') return true;
    const parentPeriod = PERIODS[PERIODS.indexOf(period) - 1];
    const parentKey = getParentPeriodKey(period, periodKeys[period]);
    return templates[parentPeriod]?.[parentKey]?.completed || false;
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  if (loading) {
    return (
      <div className="app-container">
        <div className="dashboard" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
          <div className="loading-spinner" style={{ width: 40, height: 40 }} />
        </div>
      </div>
    );
  }

  return (
    <div className="app-container">
      <div className="dashboard">
        <header className="header">
          <div className="logo">
            <div className="logo-icon">TJ</div>
            <span className="logo-text">Trading Journal</span>
          </div>
          <div className="user-info">
            <span className={`user-badge ${isViewer ? 'viewer' : 'admin'}`}>
              {isViewer ? '👁️ Viewer' : '📊 Trader'}
            </span>
            <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
              {user.email}
            </span>
            <button className="btn btn-secondary btn-small" onClick={handleSignOut}>
              Sign Out
            </button>
          </div>
        </header>

        <ReminderBanners templates={templates} />

        <div className="tabs">
          {PERIODS.map(period => {
            const currentKey = getCurrentPeriodKey(period);
            const isComplete = templates[period]?.[currentKey]?.completed;
            const isLocked = period !== 'yearly' && !isParentComplete(period);
            
            return (
              <button
                key={period}
                className={`tab ${activeTab === period ? 'active' : ''} ${isLocked ? 'locked' : ''}`}
                onClick={() => !isLocked && setActiveTab(period)}
                disabled={isLocked}
              >
                {period.charAt(0).toUpperCase() + period.slice(1)}
                {isComplete && ' ✓'}
              </button>
            );
          })}
        </div>

        <div className="period-nav">
          <button
            className="period-nav-btn"
            onClick={() => navigatePeriodKey(-1)}
          >
            ←
          </button>
          <div className="period-display">
            {formatPeriodDisplay(activeTab, periodKeys[activeTab])}
          </div>
          <button
            className="period-nav-btn"
            onClick={() => navigatePeriodKey(1)}
            disabled={periodKeys[activeTab] === getCurrentPeriodKey(activeTab)}
          >
            →
          </button>
        </div>

        <StatsOverview trades={trades} period={activeTab} periodKey={periodKeys[activeTab]} />

        <div className="grid-2" style={{ gridTemplateColumns: '1fr 1fr', alignItems: 'start' }}>
          <div>
            <TemplateForm
              period={activeTab}
              data={templates[activeTab]?.[periodKeys[activeTab]]}
              onSave={(data) => saveTemplate(activeTab, periodKeys[activeTab], data)}
              readOnly={isViewer}
              parentComplete={isParentComplete(activeTab)}
            />
          </div>
          <div>
            {activeTab === 'daily' && (
              <TradeLog
                trades={trades.filter(t => t.date === periodKeys.daily)}
                onAddTrades={saveTrades}
                readOnly={isViewer}
              />
            )}
            <MapsSection
              maps={maps}
              onUpdate={saveMap}
              readOnly={isViewer}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// Invite Viewer Component (for trader to invite wife)
const InviteViewer = ({ user }) => {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  const handleInvite = async () => {
    try {
      // In production, this would send an email invitation
      // For now, create a pending viewer record
      await supabase.from('invitations').insert({
        trader_id: user.id,
        email,
        created_at: new Date().toISOString()
      });
      setSent(true);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">👥 Invite Viewer</h3>
      </div>
      {sent ? (
        <div className="alert-banner success">
          Invitation sent to {email}!
        </div>
      ) : (
        <>
          {error && <div className="alert-banner error">{error}</div>}
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input
              type="email"
              className="form-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="wife@example.com"
            />
          </div>
          <button className="btn btn-primary" onClick={handleInvite}>
            Send Invitation
          </button>
        </>
      )}
    </div>
  );
};

// ============================================
// MAIN APP
// ============================================
const App = () => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Inject styles
    const styleSheet = document.createElement('style');
    styleSheet.textContent = styles;
    document.head.appendChild(styleSheet);

    // Check auth state
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        loadProfile(session.user.id);
      } else {
        setLoading(false);
      }
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        loadProfile(session.user.id);
      } else {
        setProfile(null);
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const loadProfile = async (userId) => {
    try {
      const { data } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();
      setProfile(data);
    } catch (err) {
      console.error('Error loading profile:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="app-container">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
          <div className="loading-spinner" style={{ width: 40, height: 40 }} />
        </div>
      </div>
    );
  }

  if (!user) {
    return <LoginPage />;
  }

  return (
    <AuthContext.Provider value={{ user, profile }}>
      <Dashboard user={user} profile={profile} />
    </AuthContext.Provider>
  );
};

export default App;
