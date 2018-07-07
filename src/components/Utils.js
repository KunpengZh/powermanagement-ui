import Excel from 'exceljs/dist/es5/exceljs.browser';

var FileSaver = require('file-saver');

export default {
    dateToStr(date) {
        let Year = date.getFullYear();
        let month = date.getMonth() + 1;
        month = month < 10 ? "0" + month : month;
        let day = date.getDate();
        day = day < 10 ? "0" + day : day;
        return Year + "-" + month + "-" + day;
    },
    jsonToExcel(fileName, sheetName, jsonData, cols, hejiheader) {
        var workbook = new Excel.Workbook();
        workbook = this.setDefaultWorkBookProperties(workbook);
        var worksheet = workbook.addWorksheet(sheetName, {views: [{state: 'frozen', xSplit: 0, ySplit: 1}]});
        worksheet.columns = this.setColumns(cols, hejiheader);
        console.log(jsonData);
        worksheet.addRows(jsonData);
        this.saveFileToDisk(workbook, fileName);
    },
    setDefaultWorkBookProperties(workbook) {
        workbook.creator = 'Kunpeng Zhang';
        workbook.lastModifiedBy = 'Kunpeng Zhang';
        workbook.created = new Date();
        workbook.modified = new Date();
        return workbook;
    },
    setColumns(cols, hejiheader) {
        let columns = [];
        cols.forEach(function (col) {
            if (col.headerName === '补贴合计') {
                columns.push({
                    header: hejiheader,
                    key: col.field,
                    width: 20,
                    outlineLevel: 1,
                    style: {bold: true}
                });
            } else {
                columns.push({
                    header: col.headerName,
                    key: col.field,
                    width: 20,
                    outlineLevel: 1,
                    style: {bold: true}
                });
            }

        });
        return columns;
    },
    saveFileToDisk(workbook, fileName) {
        workbook.xlsx.writeBuffer()
            .then(function (buffer) {
                FileSaver.saveAs(new Blob([buffer], {type: "application/octet-stream"}), fileName);
            });
    }
}