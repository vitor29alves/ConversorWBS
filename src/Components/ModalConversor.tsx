import { useEffect, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Dialog,
  Snackbar,
  Stack,
  TextField,
} from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

import CloseIcon from "@mui/icons-material/Close";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

export default function ModalConversor(props: any) {
  const [copyFeedback, setCopyFeedback] = useState<boolean>(false);

  const openAlert = () => {
    setCopyFeedback(true);
  };

  const closeAlert = () => {
    setCopyFeedback(false);
  };



  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const closeModal = () => props.setOpenModal(false);

  const resultadoConversor = props.resultadoConversor;

  const copy = (text: string) => {
    if (!navigator.clipboard) {
      return;
    }

    return navigator.clipboard
      .writeText(text)
      .catch((error) => {})
      .finally(() => setCopyFeedback(true));
  };

  return (
    <Stack>
      <Dialog
        open={props.openModal}
        onClose={closeModal}
        fullScreen={fullScreen}
        fullWidth={true}
      >
        <Box sx={{ padding: 2 }}>
          <Stack
            flexDirection={"row"}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <h1>Sucesso!</h1>

            <Button onClick={closeModal}>
              <CloseIcon color="action" />
            </Button>
          </Stack>

          <hr />

          <Stack sx={{ width: "85%" }}>
            <p>Copie o texto abaixo e Cole na sua planilha</p>

            <TextField
              id="outlined-multiline-static"
              multiline
              rows={12}
              fullWidth
              defaultValue={resultadoConversor}
            />
          </Stack>

    
          <Stack
            sx={{
              flexDirection: "row",
              justifyContent: "flex-end",
              alignItems: "center",
              marginTop: 2.5,
            }}
          >
            <Button
              variant="text"
              sx={{ marginRight: 2.5, width: 100 }}
              onClick={closeModal}
            >
              Voltar
            </Button>

            <Button
              variant="contained"
              startIcon={<ContentCopyIcon sx={{ width: 20 }} />}
              onClick={() => {
                copy(props.resultadoConversor);
                openAlert();
              }}
            >
              Copiar
            </Button>
          </Stack>

          <Snackbar
            open={copyFeedback}
            autoHideDuration={6000}
            onClose={closeAlert}
          >
            <Alert
              onClose={closeAlert}
              severity="info"
              sx={{ width: "100%" }}
            >
              Texto copiado!
            </Alert>
          </Snackbar>
          
        </Box>
      </Dialog>
    </Stack>
  );
}
