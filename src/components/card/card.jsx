import {
  Button,
  ButtonGroup,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Grid,
  Typography,
} from "@mui/material";

const Cards = ({ obj, fields, title, type }) => {
  console.log(obj);
  if (obj.length === 0) {
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
    if (type === "parking") {
      return (
        <Grid container spacing={1}>
          {obj.map((row) => (
            <Grid item xs={6} md={4} key={row.id}>
              <Card sx={{ margin: 1 }}>
                <CardHeader title={title + row.id} />
                <CardContent>{row.estado ? "Livre" : "Ocupada"}</CardContent>

                <CardActions disableSpacing>
                  <ButtonGroup
                    variant="outlined"
                    aria-label="outlined button group primary"
                  >
                    <Button size="small" onClick={(e) => {}}>
                      Alterar
                    </Button>
                  </ButtonGroup>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      );
    } else {
      return (
        <Grid container spacing={1}>
          {obj.map((row) => (
            <Grid item xs={6} md={4} key={row.id}>
              <Card sx={{ margin: 1 }}>
                <CardHeader title={title + (row.id || row.ticket_id)} />
                <CardContent>
                  {Object.keys(row).map((campo) => (
                    <Typography
                      key={campo}
                      sx={{ fontSize: 14 }}
                      color="text.secondary"
                      gutterBottom
                    >
                      {fields[campo]}: {row[campo]}
                    </Typography>
                  ))}
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
  }
};

export { Cards };
