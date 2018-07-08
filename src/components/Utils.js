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
    jsonToExcel(fileName, sheetName, jsonData, cols, title, hejiheader) {
        var workbook = new Excel.Workbook();
        workbook = this.setDefaultWorkBookProperties(workbook);
        var worksheet = this.createReportReportWorkSheet(workbook, sheetName);
        var columns = this.setColumns(cols, hejiheader);
        worksheet = this.GeneralReportFormat(worksheet, title, columns, jsonData)
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
                if(hejiheader && hejiheader!=null){
                    columns.push({
                        header: hejiheader,
                        key: col.field,
                        width: 20,
                        outlineLevel: 1,
                        style: {bold: true}
                    });
                }else{
                    columns.push({
                        header: col.headerName,
                        key: col.field,
                        width: 20,
                        outlineLevel: 1,
                        style: {bold: true}
                    });
                }
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
    },
    createReportReportWorkSheet(workbook, name) {
        var worksheet = workbook.addWorksheet(name, {
            properties: {
                showGridLines: false,
                defaultRowHeight: 25,
                outlineLevelCol: 5
            },
            pageSetup: {
                fitToPage: true,
                fitToHeight: 5,
                fitToWidth: 7,
                orientation: 'portrait',      //'landscape'
                fitToWidth: 1,
                fitToHeight: 1,
                paperSize: 9,  //A4
                horizontalCentered: true,
                verticalCentered: false
            },
            views: [{state: 'frozen', xSplit: 2, ySplit: 4}],
        });

        return worksheet;
    },
    GeneralReportFormat(worksheet, title, columns, data) {
        let _dictionary = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
            'AA', 'AB', 'AC', 'AD', 'AE', 'AF', 'AG', 'AH', 'AI', 'AJ', 'AK', 'AL', 'AM', 'AN', 'AO', 'AP', 'AQ', 'AR', 'AS', 'AT', 'AU', 'AV', 'AW', 'AX', 'AY', 'AZ',
            'BA', 'BB', 'BC', 'BD', 'BE', 'BF', 'BG', 'BH', 'BI', 'BJ', 'BK', 'BL', 'BM', 'BN', 'BO', 'BP', 'BQ', 'BR', 'BS', 'BT', 'BU', 'BV', 'BW', 'BX', 'BY', 'BZ'];

        /**
         * Row1 is a blank row
         */
        worksheet.addRow([]);
        let row1 = worksheet.getRow(1);
        row1.height = 5;


        /**
         * Row2 is the Title row
         */
        let mergeRange = 'A2:';
        if (columns.length > 25) {
            mergeRange = 'A2:Z2';
        } else {
            mergeRange += _dictionary[columns.length - 1] + "2"
        }

        worksheet.addRow([title]);
        let row2 = worksheet.getRow(2);
        worksheet.mergeCells(mergeRange);
        row2.font = {size: 18, underline: 'double', bold: true};
        row2.alignment = {vertical: 'center', horizontal: 'center'};

        /**
         * Row3 is a blank row
         */
        worksheet.addRow([]);
        let row3 = worksheet.getRow(3);
        row3.height = 5;


        /**
         * Row4 is the table header row
         */
        let tableHeader = [];
        let tableKeys = [];
        columns.forEach(function (element) {
            tableHeader.push(element.header);
            tableKeys.push(element.key);
        });
        worksheet.addRow(tableHeader);
        let row4 = worksheet.getRow(4);
        let tableHeaderRowNum = 4;

        for (let i = 0; i < columns.length; i++) {
            worksheet.getColumn(i + 1).width = columns[i].width ? columns[i].width : 15;
            let index = _dictionary[i % 78];
            worksheet.getCell(index + tableHeaderRowNum).font = {size: 12, bold: true};
            worksheet.getCell(index + tableHeaderRowNum).alignment = {vertical: 'center', horizontal: 'center'};
            worksheet.getCell(index + tableHeaderRowNum).fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: {argb: 'FFFFFF00'},
                bgColor: {argb: 'FF0000FF'}
            };
            worksheet.getCell(index + tableHeaderRowNum).border = {
                top: {style: 'thin'},
                left: {style: 'thin'},
                bottom: {style: 'thin'},
                right: {style: 'thin'}
            };
        }


        /**
         * Start from row 5, is the table data row
         */

        let rownum = 5;
        data.forEach(function (dataObj) {
            let datarow = [];
            tableKeys.forEach(function (key) {
                datarow.push(dataObj[key] ? dataObj[key] : '');
            });
            worksheet.addRow(datarow)
            for (let i = 0; i < columns.length; i++) {
                let index = _dictionary[i % 78];
                worksheet.getCell(index + rownum).border = {
                    top: {style: 'thin'},
                    left: {style: 'thin'},
                    bottom: {style: 'thin'},
                    right: {style: 'thin'}
                };
            }
            rownum++;
        });

        return worksheet;
    }
}