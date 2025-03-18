import { Button } from "@mui/material";
import React from "react";

import Excel from "exceljs";
import { saveAs } from "file-saver";

export default function Export({ users, columns, name = "" }) {
  const workSheetName = name;
  const workBookName = name;
  const workbook = new Excel.Workbook();
  const downloadExcel = async () => {
    const fileName = workBookName;
    const worksheet = workbook.addWorksheet(workSheetName);
    worksheet.columns = columns;
    worksheet.getRow(1).font = { bold: true };

    worksheet.columns.forEach((column) => {
      column.width = column.header.length + 5;
      //   column.alignment = { horizontal: "center" };
    });

    users.forEach((singleData) => {
      worksheet.addRow(singleData);
    });

    worksheet.eachRow({ includeEmpty: false }, (row) => {
      const currentCell = row._cells;
      currentCell.forEach((singleCell) => {
        const cellAddress = singleCell._address;

        // apply border
        worksheet.getCell(cellAddress).border = {
          top: { style: "thin" },
          left: { style: "thin" },
          bottom: { style: "thin" },
          right: { style: "thin" },
        };
      });
    });

    const buf = await workbook.xlsx.writeBuffer();
    saveAs(new Blob([buf]), `${fileName}.xlsx`);
  };

  return (
    <Button
      sx={{
        backgroundColor: "#029a3f !important",
        color: "white !important",

        px: "1rem !important",
        "&:hover": {
          backgroundColor: "#029a3f !important",
          color: "white !important",
        },
      }}
      onClick={downloadExcel}
    >
      ดาวน์โหลด Excel
    </Button>
  );
}
