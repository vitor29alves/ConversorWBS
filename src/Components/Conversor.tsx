import React, { useEffect, useState } from "react";
import { Box, Button, Stack, CircularProgress } from "@mui/material";
import ModalConversor from "./ModalConversor";
import { ConversorService } from "../Service/service";

export default function Conversor() {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [arquivoConvertido, setArquivoConvertido] = useState<any>("");
  const [resultadoConversor, setResultadoConversor] = useState<string>("");

  const [isLoading, setIsLoading] = useState(false);

  function converterBase64(file: any) {
    if (file.target.files.length > 0) {
      var receberArquivo = file.target.files[0];

      var carregarArquivo = receberArquivo;

      var lerArquivo = new FileReader();

      lerArquivo.onload = function (arquivoCarregado: any) {
        let base64: string = arquivoCarregado.target.result;

        base64 = base64.replace("data:text/plain;base64,", "");

        setArquivoConvertido(base64);
      };

      lerArquivo.readAsDataURL(carregarArquivo);
    }
  }

  function conversorApi() {
    setIsLoading(true);

    const body = {
      arquivoTxt: arquivoConvertido,
    };

    ConversorService.converter(body)
      .then((res) => {
        setResultadoConversor(res.data.textoConvertido);
      })
      .catch((error) => {})
      .finally(() => {
        setOpenModal(true);
        setIsLoading(false);
      });
  }

  function resetarInput() {
   
    let fileInput = (document.querySelector("#arquivo-txt") as HTMLInputElement);
    fileInput.value = "";

  }

  return (
    <Box sx={{ margin: "auto" }}>
      <Stack width={"90%"} maxWidth={800}>
        <h1>CS - Conversor WBS</h1>

        <Stack>
          <p>1) Faça o download dos Slides(CS) como Texto</p>
          <p>2) Faça o upload do arquivo gerado</p>
        </Stack>

        <Stack>
          <p style={{ fontWeight: "bold" }}> Arquivo TXT dos Slides </p>

          <Stack
            flexDirection={"row"}
            justifyContent={"flex-start"}
            alignItems={"center"}
          >
            <input id="arquivo-txt" type="file" onChange={converterBase64} />
          </Stack>
        </Stack>

        <Stack
          sx={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            marginTop: 2.5,
          }}
        >
          <Button
            variant="text"
            sx={{ marginRight: 2.5, width: 100 }}
            onClick={resetarInput}
          >
            Voltar
          </Button>
          <Button
            variant="contained"
            onClick={conversorApi}
            sx={{ maxWidth: 250, maxHeight: 40 }}
          >
            Confirmar
            {isLoading ? (
              <CircularProgress sx={{ p: 2 }} color="inherit" size={20} />
            ) : (
              ""
            )}
          </Button>
        </Stack>
      </Stack>

      <ModalConversor
        openModal={openModal}
        setOpenModal={setOpenModal}
        resultadoConversor={resultadoConversor}
      />
    </Box>
  );
}
