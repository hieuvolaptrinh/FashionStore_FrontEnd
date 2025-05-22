import React, { useState } from "react";
import { Button, Snackbar, Alert } from "@mui/material";

interface SubmitReturnButtonProps {
  onSubmit: () => void;
}

const SubmitReturnButton: React.FC<SubmitReturnButtonProps> = ({
  onSubmit,
}) => {
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleSubmit = () => {
    onSubmit();
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={handleSubmit}
        sx={{ mt: 3, mb: 2 }}
      >
        Gửi yêu cầu
      </Button>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleCloseSnackbar} severity="success">
          Yêu cầu đổi/trả đã được gửi thành công
        </Alert>
      </Snackbar>
    </>
  );
};

export default SubmitReturnButton;
