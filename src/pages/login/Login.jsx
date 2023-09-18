import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Typography from "@mui/material/Typography";
import { TextField, Box } from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import { useRef } from "react";
import { Form } from "@unform/web";
import Input from "../../components/form/input";
import { spacing } from "@mui/system";
import cutucarApi from "../../services/api";
import { User } from "../../class/User";
const Login = () => {
  const formRef = useRef(null);

  const doLogin = async () => {
    try {
      const username = formRef.current.getFieldValue("username");
      const password = formRef.current.getFieldValue("password");
      console.log(password);

      const user = new User(0, username, password);

      user.validate(username, password);
      console.log(user);

      const result = await cutucarApi.post("/api/v1/user/authenticate", user);
      if (result.status === 200) {
        localStorage.setItem("token", result.data.token);
        window.location.href = "/";
      }
      console.log(result);
    } catch (err) {
      console.log(err);
      formRef.current.setErrors(err);
    }
  };

  return (
    <>
      <Grid container spacing={2} justifyContent="center" sx={{ flexGrow: 1 }}>
        <Card
          sx={{
            maxHeight: "max-content",
            maxWidth: "100%",
            mx: "auto",
            // to make the demo resizable
            overflow: "auto",
          }}
        >
          <Form ref={formRef}>
            <Grid>
              <CardContent>
                <Typography style={{ color: "black" }} variant="h3">
                  Bem-Vindo ao CutuCar
                </Typography>
                <Typography variant="h6">
                  Pedimos para que faça login para continuar
                </Typography>

                <hr></hr>

                <Grid justifyContent="center" xs={10}>
                  <Input name="username" displayName="Usuário" />

                  <Input name="password" displayName="Senha" type="password" />
                </Grid>
              </CardContent>
              <CardActions>
                <Grid sx={{ ml: "auto" }}>
                  <ButtonGroup
                    size="sm"
                    aria-label="neutral button group"
                    variant="outlined"
                  >
                    <Button color="primary">Esqueci a senha</Button>
                    <Button color="success" onClick={doLogin}>
                      Fazer login
                    </Button>
                  </ButtonGroup>
                </Grid>
              </CardActions>
            </Grid>
          </Form>
        </Card>
      </Grid>
    </>
  );
};

export default Login;
