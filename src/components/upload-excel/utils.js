import * as xlsx from "xlsx";

export const getHeaderRow = (sheet) => {
  const headers = [];
  const range = xlsx.utils.decode_range(sheet["!ref"]);
  let C;
  const R = range.s.r;
  /* start in the first row */
  for (C = range.s.c; C <= range.e.c; ++C) {
    /* walk every column in the range */
    const cell = sheet[xlsx.utils.encode_cell({ c: C, r: R })];
    /* find the cell in the first row */
    let hdr = "UNKNOWN " + C; // <-- replace with your desired default
    if (cell && cell.t) hdr = xlsx.utils.format_cell(cell);
    headers.push(hdr);
  }
  return headers;
};

export const isExcel = (file) => {
  return /\.(xlsx|xls|csv)$/.test(file.name);
};
