import jsPDF from 'jspdf';
import 'jspdf-autotable';

// Export dataset to CSV file
export const exportToCSV = (filename, headers, rows) => {
  const csvContent = [
    headers.join(','),
    ...rows.map(row => 
      row.map(field => {
        const fieldStr = field === null || field === undefined ? '' : String(field);
        // Escape quotes and wrap string in quotes if it contains comma or quotes
        if (fieldStr.includes(',') || fieldStr.includes('"') || fieldStr.includes('\n')) {
          return `"${fieldStr.replace(/"/g, '""')}"`;
        }
        return fieldStr;
      }).join(',')
    )
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `${filename}_${new Date().toISOString().split('T')[0]}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

// Export formatted report to PDF using jsPDF
export const exportToPDF = (title, subtitle, headers, dataRows, filename = 'dairy_farm_report') => {
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
  
  // Header styling
  doc.setFillColor(21, 128, 61); // Green Valley Farm Green (#15803d)
  doc.rect(0, 0, 210, 24, 'F');
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text("GREEN VALLEY DAIRY FARM", 14, 12);
  
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text(`Generated: ${new Date().toLocaleDateString('en-KE')} | ${title}`, 14, 18);
  
  doc.setTextColor(30, 41, 59);
  doc.setFontSize(13);
  doc.setFont('helvetica', 'bold');
  doc.text(title, 14, 32);
  
  if (subtitle) {
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(100, 116, 139);
    doc.text(subtitle, 14, 38);
  }

  const startY = subtitle ? 43 : 36;

  doc.autoTable({
    startY: startY,
    head: [headers],
    body: dataRows,
    theme: 'grid',
    headStyles: {
      fillColor: [21, 128, 61],
      textColor: [255, 255, 255],
      fontStyle: 'bold',
      fontSize: 9
    },
    bodyStyles: {
      fontSize: 8.5,
      textColor: [51, 65, 85]
    },
    alternateRowStyles: {
      fillColor: [248, 250, 252]
    },
    margin: { left: 14, right: 14 },
    didDrawPage: (data) => {
      // Footer page numbering
      const str = `Page ${doc.internal.getNumberOfPages()}`;
      doc.setFontSize(8);
      doc.setTextColor(148, 163, 184);
      doc.text(str, 196 - doc.getTextWidth(str), 285);
    }
  });

  doc.save(`${filename}_${new Date().toISOString().split('T')[0]}.pdf`);
};
