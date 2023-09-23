import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import { Modal, Typography, Button } from "@mui/material";
import api from "../../services/api";
import { Cards } from "../../components/card/card";
import { Box } from "@mui/system";
import { Notification } from "../../components/notification/notify";
import DynamicFormModal from "../../components/modal/Index";
import { Client } from "../../class/Client";

const SytledModal = styled(Modal)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const Index = () => {
  const [clients, setClients] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [type, setType] = useState("");
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      api.post("/api/v1/client/new", data).then((response) => {
        console.log(response.data.content);
        setMessage(response.data.content);
        setType(response.data.tipo);
        setOpen(true);
      });
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);

      console.log(err);
    }
  };

  const onClose = () => {
    setOpenModal(false);
  };

  useEffect(() => {
    try {
      setIsLoading(true);
      api.get("/api/v1/client/list").then((response) => {
        console.log(response);
        setClients(response.data);
      });
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
    }
  }, []);
  //cria a página
  const fields = {
    nome: "Nome",
    cpf: "CPF",
    telefone: "telefone",
    id: "ID",
  };

  const modalFields = [
    {
      visual_name: "Nome",
      access_name: "nome",
      type: "text",
    },
    {
      visual_name: "CPF",
      access_name: "cpf",
      type: "text",
    },
    {
      visual_name: "Telefone",
      access_name: "telefone",
      type: "text",
    },
  ];
  return (
    <>
      <Notification
        message={message}
        type={type}
        open={open}
        isLoading={isLoading}
      />
      <Box
        anchorOrigin={{
          vertical: "botton",
          horizontal: "left",
        }}
      >
        <Button
          onClick={() => {
            setOpenModal(true);
          }}
        >
          +
        </Button>
      </Box>
      <Box sx={{ ml: "5px" }} position="center">
        <Typography align="center" variant="h3" component="div">
          Clientes atualmente cadastrados
        </Typography>
        <Cards obj={clients} fields={fields} title="Cliente Número: " />
      </Box>
      <DynamicFormModal
        fields={modalFields}
        isOpen={openModal}
        onSubmit={onSubmit}
        onClose={onClose}
        title="Cadastrar Cliente"
        classe="Client"
      />
    </>
  );
};

export default Index;
