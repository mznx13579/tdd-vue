import { date } from '../date';

const csv = {
  //! 다운로드 경로 리다이렉트
  //* @action a태그 생성 후 링크 이동
  exportCSV(csv: any, blobType = 'text/csv;charset=utf-8;') {
    if (csv == null) return;

    const blob = new Blob(['\ufeff' + csv], { type: blobType });
    const d = new Date();
    const exportedFilename = 'Hiworks_' + date.getFromFormat(d, 'yyyymmddhhiiss') + '.csv';

    if (navigator.msSaveBlob) {
      // IE10 ~
      navigator.msSaveBlob(blob, exportedFilename);
    } else {
      const link = document.createElement('a');
      if (link.download !== undefined) {
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', exportedFilename);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    }
  },
  //! CSV 파일 가져오기
  getCSV(items: any, headers: any) {
    return this.convertArrayOfObjectsToCSV({
      data: items,
      header: headers,
    });
  },
  //! Object를 csv형태로 변환
  convertArrayOfObjectsToCSV(args: any) {
    let result = '';
    let ctr = 0;
    let data, header;

    data = args.data || null;
    header = args.header || null;
    if (data == null || !data.length) {
      return null;
    }

    let columnDelimiter = args.columnDelimiter || ',';
    let lineDelimiter = args.lineDelimiter || '\n';

    let keys = Object.keys(data[0]);

    result = header ? header.join(columnDelimiter) : keys.join(columnDelimiter);

    result += lineDelimiter;

    data.forEach(function(item: any) {
      keys.forEach(function(key: any) {
        if (ctr > 0) {
          result += columnDelimiter;
        }
        result += `"${item[key] || ''}"`;
        result += '"';
        result += item[key] || '';
        result += '"';
        ctr++;
      });
      result += lineDelimiter;
    });

    return result;
  },
};

export { csv };
