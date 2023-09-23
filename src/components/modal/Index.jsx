import React, { useState, useRef } from "react";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  DialogActions,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import { Form } from "@unform/web";
import Input from "../form/input";
import { Client } from "../../class/Client";

const DynamicFormModal = ({
  fields,
  isOpen,
  onClose,
  onSubmit,
  title,
  formData,
  classe,
}) => {
  const formRef = useRef(null);

  const handleSubmit = () => {
    const data = formRef.current.getData();
    try {
      if (classe === "Client") {
        const client = new Client();
        client.validate(data.nome, data.cpf, data.telefone);
      }
      onSubmit(data);
    } catch (e) {
      console.log(e);
      formRef.current.setErrors(e);
    }

    // setFormData({});
    // onClose();
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 600,
    pt: 2,
    px: 4,
    pb: 3,
  };

  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box
        sx={{ ...style }}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Card
          sx={{ width: "100%" }}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Form ref={formRef}>
            <CardContent>
              <Typography variant="h4" align="center">
                {title}
              </Typography>
              {fields.map((field) => (
                <Input
                  key={field.access_name}
                  label={field.visual_name}
                  name={field.access_name}
                  id={field.access_name}
                  type={field.type}
                  placeholder={field.visual_name}
                />
              ))}
            </CardContent>
            <CardActions>
              <Button onClick={onClose} color="primary">
                Cancelar
              </Button>
              <Button onClick={handleSubmit} color="primary">
                Enviar
              </Button>
            </CardActions>
          </Form>
        </Card>
      </Box>
    </Modal>
  );
};

export default DynamicFormModal;
