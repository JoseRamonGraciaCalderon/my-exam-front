import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';

export function generateCsvReport(data, filename = 'report.csv') {
    const csvContent = [
        ['Name', 'Email'],
        ...data.map(user => [user.name, user.email])
    ].map(e => e.join(",")).join("\n");

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, filename);
}

export function generateExcelReport(data, filename = 'report.xlsx') {
    const formattedData = data.map(user => ({
        Name: user.name,
        Email: user.email
    }));

    const ws = XLSX.utils.json_to_sheet(formattedData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Users');
    const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });

    const blob = new Blob([wbout], { type: 'application/octet-stream' });
    saveAs(blob, filename);
}
