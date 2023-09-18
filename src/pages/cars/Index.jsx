import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Grid,
  Box,
  Button,
  ButtonGroup,
  FormControl,
  Modal,
  Typography,
  TextField,
  Alert,
  CircularProgress,
} from "@mui/material";
import api from "../../services/api";

const SytledModal = styled(Modal)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const Table = ({ carros }) => {
  console.log(carros);
  if (carros.length === 0) {
    return (
      <>
        <Grid item xs={6} md={4}>
          <Typography align="center" variant="h5" component="div">
            Nenhum carro cadastrado
          </Typography>
        </Grid>
      </>
    );
  } else {
    return (
      <Grid container spacing={1}>
        {carros.map((row) => (
          <Grid item xs={6} md={4}>
            <Card sx={{ margin: 1 }}>
              <CardHeader title={row.username} />
              <CardContent>
                <Typography
                  sx={{ fontSize: 14 }}
                  color="text.secondary"
                  gutterBottom
                >
                  Placa: {row.placa}
                </Typography>
                <Typography
                  key={row.id}
                  sx={{ fontSize: 14 }}
                  color="text.secondary"
                  gutterBottom
                >
                  ID: {row.id}
                </Typography>
                <Typography
                  key={row.cliente_id}
                  sx={{ fontSize: 14 }}
                  color="text.secondary"
                  gutterBottom
                >
                  Nome do Cliente: {row.cliente_nome}
                </Typography>
              </CardContent>

              <CardActions disableSpacing>
                <ButtonGroup
                  variant="outlined"
                  aria-label="outlined button group primary"
                >
                  <Button size="small" onClick={(e) => setModal(row, true)}>
                    Editar
                  </Button>
                </ButtonGroup>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    );
  }
};

const Index = () => {
  const [carros, setCarros] = useState([]);

  useEffect(() => {
    try {
      api.get("/api/v1/car/list").then((response) => {
        setCarros(response.data);
      });
    } catch (err) {}
  }, []);
  //cria a página
  return (
    <Box sx={{ ml: "5px" }} position="center">
      <Typography align="center" variant="h3" component="div">
        Carros atualmente cadastrados
      </Typography>
      <Table carros={carros} />
    </Box>
  );
};

export default Index;
