import * as React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Notification = ({ message, type, open, isLoading }) => {
  const [show, setShow] = React.useState(false);
  const loadingMessage = "Processando requisição...";
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const handleClick = () => {
    setShow(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setShow(false);
  };

  React.useEffect(() => {
    console.log("useEffect");
    console.log(isLoading);
    if (isLoading === true) {
      setShow(true);
    } else {
      setShow(open);
    }
  }, [open, isLoading]);

  return (
    <Snackbar
      open={show}
      autoHideDuration={4000}
      onClose={handleClose}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
    >
      <Alert
        onClose={handleClose}
        severity={isLoading === true ? "info" : type}
        sx={{ width: "100%" }}
      >
        {isLoading === true ? loadingMessage : message}
      </Alert>
    </Snackbar>
  );
};

export { Notification };
