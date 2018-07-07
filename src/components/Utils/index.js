import Excel from 'exceljs/dist/es5/exceljs.browser';
import FileSaver from 'file-saver';

export default {
    jsonToExcel(fileName, sheetName, jsonData) {
        var workbook = new Excel.Workbook();
        workbook = this.setDefaultWorkBookProperties(workbook);
        var worksheet = workbook.addWorksheet(sheetName, {views: [{state: 'frozen', xSplit: 0, ySplit: 1}]});
        worksheet.columns = this.setColumns(sheetName);
        jsonData = [
            {
                empId: '107433',
                name: 'kpzhang',
                workerCategory: 'adsfasdf',
                department: 'adsfasdf',
                jobRole: 'adsfasdf',
                entryTime: 'adsfasdf',
                gender: 'adsfasdf',
                comment: 'adsfasdf'
            },
            {
                empId: '107434',
                name: 'kpzhang',
                workerCategory: 'adsfasdf',
                department: 'adsfasdf',
                jobRole: 'adsfasdf',
                entryTime: 'adsfasdf',
                gender: 'adsfasdf',
                comment: 'adsfasdf'
            },
            {
                empId: '107435',
                name: 'kpzhang',
                workerCategory: 'adsfasdf',
                department: 'adsfasdf',
                jobRole: 'adsfasdf',
                entryTime: 'adsfasdf',
                gender: 'adsfasdf',
                comment: 'adsfasdf'
            },
            {
                empId: '107436',
                name: 'kpzhang',
                workerCategory: 'adsfasdf',
                department: 'adsfasdf',
                jobRole: 'adsfasdf',
                entryTime: 'adsfasdf',
                gender: 'adsfasdf',
                comment: 'adsfasdf'
            }

        ];
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
    setColumns(sheetName) {
        var columns = [
            {header: '', key: 'empId', width: 10, style: {bold: true}},
            {header: '姓名', key: 'name', width: 15, style: {bold: true}},
            {header: '工作类别', key: 'workerCategory', width: 15, outlineLevel: 1, style: {bold: true}},
            {header: '工作部门', key: 'department', width: 15, outlineLevel: 1, style: {bold: true}},
            {header: '工作岗位', key: 'jobRole', width: 10, outlineLevel: 1, style: {bold: true}},
            {header: '入职日期', key: 'entryTime', width: 15, outlineLevel: 1, style: {bold: true}},
            {header: '性别', key: 'gender', width: 10, outlineLevel: 1, style: {bold: true}},
            {header: '备注', key: 'comment', width: 10, outlineLevel: 1, style: {bold: true}},
        ];
        return columns;
    },
    saveFileToDisk(workbook, fileName) {
        workbook.xlsx.writeBuffer()
            .then(function (buffer) {
                FileSaver.saveAs(new Blob([buffer], {type: "application/octet-stream"}), fileName);
            });
    }
}