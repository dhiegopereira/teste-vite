/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import "../../css/global.css";

import pagas from "../../assets/Home/paga.png";
import vencidas from "../../assets/Home/vencida.png";
import pendentes from "../../assets/Home/pendente.png";
import { Container, Typography, Box, Icon } from "@mui/material";
import arrowDown from "../../assets/Home/arrow-down.png";
import "./style.css";
import React, { useEffect, useState } from "react";

import UserModal from "../UserModal";

import { useNavigate } from "react-router-dom";
import { getItem } from "../../utils/localStorage";
import api from "../../services/api";
import PopOver from "../PopOver/index";

export default function HomeData({ data, data2 }) {
  let [nome, setNome] = useState("");
  const nameLetters = nome[0];

  const [render, setRender] = useState(false);

  useEffect(() => {
    async function getUserData() {
      try {
        const token = getItem("token");
        const res = await api.get("/", {
          headers: { authorization: `Bearer ${token}` },
        });
        setNome(res.data.name);
      } catch (error) {
        return error;
      }
    }
    getUserData();
  }, [render]);

  const [modalEditOpen, setModalEditOpen] = useState(false);
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOpenDialog = (e) => {
    e.preventDefault();
    setModalEditOpen(!modalEditOpen);
    handleClose();
  };
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const handleLogOut = (e) => {
    e.preventDefault;
    localStorage.clear();

    navigate("/");
  };

  return (
    <>
      {/* MAIN */}

      <Container className="navBar">
        <nav>
          <Typography variant="h4" sx={{ color: "rgba(52, 52, 71, 1)" }}>
            Resumo das cobranças
          </Typography>
          <div className="perfilButton ">
            <div className="initials">
              <Typography variant="h5" sx={{ color: "rgba(14, 135, 80, 1)" }}>
                {nameLetters}
              </Typography>
            </div>

            <button className="buttonDropDown " onClick={handleClick}>
              <Typography
                variant="body1"
                sx={{ fontSize: "18px", color: "rgba(14, 135, 80, 1)" }}
              >
                {nome}
              </Typography>
              <img src={arrowDown} alt="" />
            </button>
          </div>
        </nav>

        <PopOver
          anchorEl={anchorEl}
          setAnchorEl={setAnchorEl}
          modalEditOpen={modalEditOpen}
          setModalEditOpen={setModalEditOpen}
        />
      </Container>
      <hr className="divider" />
      <Container className="mainCobrancas" sx={{ mr: "108px" }}>
        <section className="data">
          <div className="header">
            <div className="pagas">
              <Box sx={{ width: "286px", height: "75px" }}>
                <img src={pagas} alt="" />
                <div>
                  <Typography variant="body">Cobranças Pagas</Typography>
                  <Typography variant="h5">R$30.000</Typography>
                </div>
              </Box>
            </div>
            <div className="vencidas">
              <Box sx={{ width: "286px", height: "75px" }}>
                <img src={vencidas} alt="" />
                <div>
                  <Typography variant="body">Cobranças vencidas</Typography>
                  <Typography variant="h5">R$7.000</Typography>
                </div>
              </Box>
            </div>
            <div className="previstas">
              <Box sx={{ width: "286px", height: "75px" }}>
                <img src={pendentes} alt="" />
                <div>
                  <Typography variant="body">Cobranças previstas</Typography>
                  <Typography variant="h5">R$10.000</Typography>
                </div>
              </Box>
            </div>
          </div>

          <div className="cobrancaDetails">
            <div className="cobrancasVencidas">
              <div className="dataHeader">
                <p>Cobranças Vencidas</p>
                <div className="qntVencidas">10</div>
              </div>
              <table>
                <thead>
                  <tr>
                    <th>Cliente</th>
                    <th>Id da cob.</th>
                    <th>valor</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((cliente, key) => {
                    if (key <= 3) {
                      return (
                        <tr key={key}>
                          <th>{cliente.nome}</th>
                          <th>{cliente.cobrancaId}</th>
                          <th>R${cliente.valor}</th>
                        </tr>
                      );
                    }
                  })}
                </tbody>
              </table>
              <div className="seeMore">
                <a href=".">ver todos</a>
              </div>
            </div>
            <div className="cobrancasPrevistas">
              <div className="dataHeader">
                <p>Cobranças Previstas</p>
                <div className="qntPrevistas">10</div>
              </div>
              <table>
                <thead>
                  <tr>
                    <th>Cliente</th>
                    <th>Id da cob.</th>
                    <th>valor</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((cliente, key) => {
                    if (key <= 3) {
                      return (
                        <tr key={key}>
                          <th>{cliente.nome}</th>
                          <th>{cliente.cobrancaId}</th>
                          <th>R${cliente.valor}</th>
                        </tr>
                      );
                    }
                  })}
                </tbody>
              </table>
              <div className="seeMore">
                <a href=".">ver todos</a>
              </div>
            </div>
            <div className="cobrancasPagas">
              <div className="dataHeader">
                <p>Cobranças Pagas</p>
                <div className="qntPagas">10</div>
              </div>
              <table>
                <thead>
                  <tr>
                    <th>Cliente</th>
                    <th>Id da cob.</th>
                    <th>valor</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((cliente, key) => {
                    if (key <= 3) {
                      return (
                        <tr key={key}>
                          <th>{cliente.nome}</th>
                          <th>{cliente.cobrancaId}</th>
                          <th>R${cliente.valor}</th>
                        </tr>
                      );
                    }
                  })}
                </tbody>
              </table>
              <div className="seeMore">
                <a href=".">ver todos</a>
              </div>
            </div>
          </div>

          <div className="clientesDetails">
            <div className="inadiplentes">
              <div className="dataHeader">
                <p>Cobranças Pagas</p>
                <div className="qntVencidas">10</div>
              </div>
              <table>
                <thead>
                  <tr>
                    <th>Cliente</th>
                    <th>Id de clie.</th>
                    <th>cpf</th>
                  </tr>
                </thead>
                <tbody>
                  {data2.map((cliente, key) => {
                    if (key <= 3) {
                      return (
                        <tr key={key}>
                          <th>{cliente.nome}</th>
                          <th>{cliente.id}</th>
                          <th>{cliente.cpf}</th>
                        </tr>
                      );
                    }
                  })}
                </tbody>
              </table>
              <div className="seeMore">
                <a href=".">ver todos</a>
              </div>
            </div>

            <div className="emDia">
              <div className="dataHeader">
                <p>Cobranças Pagas</p>
                <div className="qntPagas">10</div>
              </div>
              <table>
                <thead>
                  <tr>
                    <th>Cliente</th>
                    <th>ID do clie.</th>
                    <th>cpf</th>
                  </tr>
                </thead>
                <tbody>
                  {data2.map((cliente, key) => {
                    if (key <= 3) {
                      return (
                        <tr key={key}>
                          <th>{cliente.nome}</th>
                          <th>{cliente.id}</th>
                          <th>{cliente.cpf}</th>
                        </tr>
                      );
                    }
                  })}
                </tbody>
              </table>
              <div className="seeMore">
                <a href=".">ver todos</a>
              </div>
            </div>
          </div>
        </section>
      </Container>

      {modalEditOpen && (
        <UserModal
          modalEditOpen={modalEditOpen}
          setModalEditOpen={setModalEditOpen}
          render={render}
          setRender={setRender}
        />
      )}
    </>
  );
}
