/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

// Định nghĩa cột
interface Column<T> {
  header: string;
  accessor: any; // Xác định cách lấy hoặc hiển thị dữ liệu từ một mục (item) trong danh sách data
}

// Định nghĩa props
interface GenericTableProps<T> {
  data: T[];
  columns: Column<T>[];
  rowKey: keyof T;
  actions?: (item: T) => React.ReactNode;
}

const GenericTable = <T,>({
  data,
  columns,
  rowKey,
  actions,
}: GenericTableProps<T>) => {
  return (
    <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
      <Table>
        <TableHead>
          <TableRow sx={{ bgcolor: "#2e7be7" }}>
            {columns.map((column) => (
              <TableCell
                key={column.header}
                align="center"
                sx={{ color: "white", fontWeight: "bold" }}
              >
                {column.header}
              </TableCell>
            ))}
            {actions && (
              <TableCell
                align="center"
                sx={{ color: "white", fontWeight: "bold" }}
              >
                Hành động
              </TableCell>
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={columns.length + (actions ? 1 : 0)}
                align="center"
              >
                Không có dữ liệu
              </TableCell>
            </TableRow>
          ) : (
            data.map((item) => (
              <TableRow key={String(item[rowKey])}>
                {columns.map((column) => (
                  <TableCell
                    key={column.header}
                    align="center"
                   
                  >
                    {typeof column.accessor === "function"
                      ? column.accessor(item)
                      : String(item[column.accessor as keyof T])}
                  </TableCell>
                ))}
                {actions && (
                  <TableCell align="center">{actions(item)}</TableCell>
                )}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default GenericTable;
