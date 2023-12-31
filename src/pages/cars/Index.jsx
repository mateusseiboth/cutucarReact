import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import { Modal, Typography } from "@mui/material";
import api from "../../services/api";
import { Cards } from "../../components/card/card";
import { Box } from "@mui/system";
import { Notification } from "../../components/notification/notify";
const SytledModal = styled(Modal)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const Index = () => {
  const [carros, setCarros] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [type, setType] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try {
      setIsLoading(true);
      api.get("/api/v1/car/list").then((response) => {
        console.log(response);
        setCarros(response.data);
      });
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
    }
  }, []);
  //cria a página
  const fields = {
    placa: "Placa",
    cliente_nome: "Cliente",
    id: "ID",
    cliente_id: "ID Cliente",
  };
  return (
    <>
      <Notification
        message={message}
        type={type}
        open={open}
        isLoading={isLoading}
      />

      <Box sx={{ ml: "5px" }} position="center">
        <Typography align="center" variant="h3" component="div">
          Carros atualmente cadastrados
        </Typography>
        <Cards obj={carros} fields={fields} title="Carro Número: " />
      </Box>
    </>
  );
};

export default Index;
