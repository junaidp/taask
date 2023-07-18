import React from "react";
import { createTheme } from "@mui/material";

const initialTheme = createTheme();

export const mainTheme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 576,
      md: 768,
      lg: 992,
      xl: 1200,
    },
  },

  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          ".MuiOutlinedInput-root": {
            background: "#FFFFFF",
            border: "1px solid #3A606E",
            boxShadow: "4px 2px 15px rgba(58, 96, 110, 0.06)",
            borderRadius: "8px",
            padding: "14px 16px",
            color: "#3A606E",
            fontSize: "14px",
            fontWeight: "400",
            fontStyle: "normal",
          },
          ".MuiOutlinedInput-input": {
            padding: "0",
            height: "unset",
            border: "unset",
          },
          input: {
            "::placeholder": {
              color: "#3A606E",
              fontSize: "14px",
              fontWeight: "400",
              fontStyle: "normal",
              opacity: "100%",
            },
          },
          ".MuiOutlinedInput-notchedOutline": {
            padding: "0",
            height: "unset",
            border: "unset",
          },
        },
      },
    },
    MuiList: {
      styleOverrides: {
        root: {
          ".MuiButtonBase-root": {
            padding: "14px 16px",
            borderRadius: "12px",
          },
          ".MuiTypography-root": {
            fontSize: "14px",
            fontWeight: "400",
            fontStyle: "normal",
            letterSpacing: "0.01em",
            color: "#214B5A",
          },
        },
      },
    },
    MuiTable: {
      styleOverrides: {
        root: {
          ".MuiTableHead-root .MuiTableCell-root": {
            fontWeight: "600 !important",
            fontStyle: "normal",
            letterSpacing: "0.01em",
            color: "#152428",
            fontSize: "14px",
            padding: "16px 0",
            borderBottom: "1px solid #3A606E",
          },

          ".MuiTableCell-root": {
            fontSize: "14px",
            fontWeight: "400",
            fontStyle: "normal",
            letterSpacing: "0.01em",
            color: "#152428",
            padding: "16px 0",
            borderBottom: "1px solid #EFF1F1",
          },
        },
      },
    },
    MuiDataGrid: {
      styleOverrides: {
        root: {
          border: "unset",
          "& .MuiDataGrid-cell:focus": {
            outline: "none",
          },
          
          "& .MuiDataGrid-columnHeaderTitleContainerContent": {
            fontWeight: "600 !important",
            fontStyle: "normal",
            letterSpacing: "0.01em",
            color: "#152428",
            fontSize: "14px",
            padding: "16px 0",
          },
          "& .MuiDataGrid-cell": {
            fontSize: "14px",
            fontWeight: "400",
            fontStyle: "normal",
            letterSpacing: "0.01em",
            color: "#152428",
            padding: "16px 10px",
            borderBottom: "1px solid #EBEBEB",
            height: "64px !important",
            minHeight: "64px !important",
          },
          ".MuiDataGrid-columnHeaders": {
            borderBottom: "1px solid #373F41 !important",
          },
          ".MuiDataGrid-row": {
            height: "64px !important",
            minHeight: "64px !important",
          },
          ".MuiDataGrid-row:hover": {
            background: "#f4fffb !important",
          },
          ".MuiDataGrid-row.Mui-selected": {
            background: "#f4fffb !important",
          },
          '& .MuiDataGrid-filterForm': {
            padding: '8px', // Adjust the padding value as needed
          },
        },
      },
    },
    MuiMenu: {
      styleOverrides: {
        root: {
            ".MuiPaper-root": {
            background: "#FFFFFF",
            borderRadius: "16px",
            padding: "0 24px",
            boxShadow: " 0px 4px 15px rgba(58, 96, 110, 0.15)",
            maxHeight: "400px"
          },
          ".MuiMenu-list": {
            padding: "0",
          },
          ".MuiMenu-list .MuiMenuItem-root": {
            padding: "16px  0",
            borderBottom: "1px solid #EBEBEB",
            background: "#FFFFFF",
            borderRadius: "0",
            fontSize: "14px",
            fontWeight: "400",
            fontStyle: "normal",
            color: "#152428",
          },
          ".MuiMenu-list .MuiMenuItem-root:hover": {
            borderBottom: "1px solid #3A606E !important",
          },
        },
      },
    },
    MuiPagination: {
      styleOverrides: {
        root: {
          ".MuiPagination-ul": {
            justifyContent: "space-between",
          },
          ".MuiPaginationItem-root": {
            width: "24px",
            minWidth: "24px",
            height: "24px",
            borderRadius: "5px",
            padding: 0,
            background: "#FFFFFF",
            border: " 1px solid #3A606E",
            fontStyle: "normal",
            fontWeight: 400,
            fontSize: 14,
            color: "#3A606E",
            margin: '0 5px !important'
          },
          ".MuiButtonBase-root.Mui-selected": {
            backgroundColor: "#A0ECD0 !important",
            border: " 1px solid transparent",
          },
          ".MuiPaginationItem-icon": {
            width: "35px !important",
            height: "35px !important",
          },
        },
      },
    },
  },
  typography: {
    fontFamily: ["Nunito", "sans-serif"].join(","),
    h1: {
      fontStyle: "normal",
      fontWeight: 700,
      fontSize: 32,
      color: "#152428",
      letterSpacing: "0.01em",
    },
    h2: {
      fontStyle: "normal",
      fontWeight: 600,
      fontSize: 18,
      color: "#1C3035",
      marginBottom: "8px !important",
    },
    
    h3: {
      fontStyle: "normal",
      fontWeight: 700,
      fontSize: 18,
      color: "#373F41",
      textTransform: 'capitalize'
    },
    h4: {
      fontStyle: "normal",
      fontWeight: 500,
      fontSize: 16,
      color: "#152428",
    },
    h5: {
      fontStyle: "normal",
      fontWeight: "600 !important",
      fontSize: "14px !important",
      color: "#214B5A !important",
      letterSpacing: "0.01em !important",
    },
    h6: {
      fontStyle: "normal",
      fontWeight: 600,
      fontSize: 18,
      color: "#1C3035",
    },
  },
  palette: {},
});
