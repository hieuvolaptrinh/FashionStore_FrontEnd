import { TextField, Button, Box } from "@mui/material";

const VoucherForm = () => {
  return (
    <>
      <Box
        component="form"
        noValidate
        autoComplete="off"
        sx={{
          display: "flex",
          gap: 2,
          mb: 4,
          alignItems: "center",
        }}
      >
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Nhập mã giảm giá"
          sx={{
            bgcolor: "white",
            borderRadius: 1,
            input: { padding: "14px" },
          }}
        />
        <Button
          variant="contained"
          color="primary"
          sx={{
            height: "56px",
            paddingX: 3,
            fontWeight: "bold",
            borderRadius: 1,
            textTransform: "none",
          }}
        >
          Áp dụng
        </Button>
      </Box>
    </>
  );
};

export default VoucherForm;
