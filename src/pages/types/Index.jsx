import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import { Modal, Typography } from "@mui/material";
import api from "../../services/api";
import { Cards } from "../../components/card/card";
import { Box } from "@mui/system";
const SytledModal = styled(Modal)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const Index = () => {
  const [types, setTypes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [type, setType] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try {
      setIsLoading(true);
      api.get("/api/v1/tipo/list").then((response) => {
        console.log(response);
        setTypes(response.data);
      });
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
    }
  }, []);
  //cria a página
  const fields = {
    preco: "Preço",
    descr: "Descrição",
    id: "ID",
  };
  return (
    <Box sx={{ ml: "5px" }} position="center">
      <Typography align="center" variant="h3" component="div">
        Tipos atualmente cadastrados
      </Typography>
      <Cards obj={types} fields={fields} title="Tipo Número: " />
    </Box>
  );
};

export default Index;
