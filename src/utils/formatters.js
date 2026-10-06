// Currency, Date and Number Formatting Utilities for Dairy Farm Management System

export const formatCurrency = (amount) => {
  const numericAmount = Number(amount) || 0;
  return new Intl.NumberFormat('en-KE', {
    style: 'currency',
    currency: 'KES',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(numericAmount);
};

export const formatNumber = (val, decimals = 1) => {
  const num = Number(val) || 0;
  return num.toLocaleString('en-KE', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
};

export const formatDate = (dateString) => {
  if (!dateString) return 'N/A';
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return dateString;
  return new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(date);
};

export const formatShortDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return dateString;
  return new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'short',
  }).format(date);
};

export const calculateAge = (dob) => {
  if (!dob) return 'N/A';
  const birth = new Date(dob);
  const now = new Date();
  if (isNaN(birth.getTime())) return 'N/A';
  
  let years = now.getFullYear() - birth.getFullYear();
  let months = now.getMonth() - birth.getMonth();
  
  if (months < 0 || (months === 0 && now.getDate() < birth.getDate())) {
    years--;
    months += 12;
  }
  
  if (years === 0) {
    return `${months} mos`;
  }
  return `${years} yrs ${months} mos`;
};

export const calculateExpectedCalvingDate = (inseminationDate) => {
  if (!inseminationDate) return null;
  const date = new Date(inseminationDate);
  if (isNaN(date.getTime())) return null;
  // Average gestation period for cows is ~283 days
  date.setDate(date.getDate() + 283);
  return date.toISOString().split('T')[0];
};

export const getDaysRemaining = (targetDate) => {
  if (!targetDate) return null;
  const target = new Date(targetDate);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  target.setHours(0, 0, 0, 0);
  const diffTime = target - today;
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};
