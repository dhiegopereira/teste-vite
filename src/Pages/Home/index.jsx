import "./styles.css";
import "../../css/global.css";
import homeIcon from "../../assets/Home/Frame.png";
import clientes from "../../assets/Home/Frame-1.png";
import cobranca from "../../assets/Home/Frame-2.png";
import { Typography } from "@mui/material";
import HomeData from "../../Components/homeData";
import ClientTable from "../../Components/ClientTable";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import homeDefault from "../../assets/Clients/homeDefault.svg";
import clientsRed from "../../assets/Clients/clientsRed.svg";

export default function Home() {
  const navigate = useNavigate();
  const [activeComponent, setActiveComponent] = useState("HomeData");

  const handleSidebarClick = (componentName) => {
    setActiveComponent(componentName);
  };

  const data = [
    {
      nome: "Sara Silva",
      cobrancaId: 223456787,
      valor: 1000.0,
    },
    {
      nome: "Carlos Prado",
      cobrancaId: 223456781,
      valor: 400.0,
    },
    {
      nome: "Lara Brtio",
      cobrancaId: 223487659,
      valor: 900.0,
    },
    {
      nome: "Soraia Neves",
      cobrancaId: 223487456,
      valor: 700.0,
    },
    {
      nome: "Soraia Neves",
      cobrancaId: 223487456,
      valor: 700.0,
    },
  ];

  const data2 = [
    {
      id: 223458768,
      nome: "Sara da Silva",
      cpf: "054 365 255 87",
      email: "sarasilva@cubos.io",
      telefone: "71 9 9462 8654",
      status: "inadimplente",
    },
    {
      id: 223458768,
      nome: "Cameron Williamson",
      cpf: "054 365 255 87",
      email: "cameronw@cubos.io",
      telefone: "71 9 9962 8658",
      status: "inadimplente",
    },
    {
      id: 223458768,
      nome: "Savannah Nguyen",
      cpf: "054 365 255 87",
      email: "snguyen@cubos.io",
      telefone: "71 9 9762 8658",
      status: "inadimplente",
    },
    {
      id: 223458768,
      nome: "Darlene Robertson",
      cpf: "054 365 255 87",
      email: "darlener@cubos.io",
      telefone: "71 9 9562 8653",
      status: "inadimplente",
    },
    {
      id: 223458768,
      nome: "Marvin McKinney",
      cpf: "054 365 255 87",
      email: "marvinm@cubos.io",
      telefone: "71 9 9462 8658",
      status: "inadimplente",
    },
    {
      id: 223458768,
      nome: "Sandra dos Santos",
      cpf: "054 365 255 87",
      email: "sandrasantos@cubos.io",
      telefone: "71 9 9762 8652",
      status: "inadimplente",
    },
    {
      id: 223458768,
      nome: "Cameron Williamson",
      cpf: "054 365 255 87",
      email: "cameronw@cubos.io",
      telefone: "71 9 9962 8653",
      status: "emDia",
    },
    {
      id: 223458768,
      nome: "Savannah Nguyen",
      cpf: "054 365 255 87",
      email: "snguyen@cubos.io",
      telefone: "71 9 9762 8659",
      status: "emDia",
    },
    {
      id: 223458768,
      nome: "Darlene Robertson",
      cpf: "054 365 255 87",
      email: "darlener@cubos.io",
      telefone: "71 9 9862 8655",
      status: "emDia",
    },
    {
      id: 223458768,
      nome: "Marvin McKinney",
      cpf: "054 365 255 87",
      email: "marvinm@cubos.io",
      telefone: "71 9 9362 8652",
      status: "emDia",
    },
  ];

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <div className="home">
      <div className="sideBar">
        <a
          href="#"
          onClick={() => handleSidebarClick("HomeData")}
          className={activeComponent === "HomeData" ? "selected" : ""}
        >
          <img
            src={activeComponent === "HomeData" ? homeIcon : homeDefault}
            alt=""
          />
          <Typography variant="body">Home</Typography>
        </a>
        <a
          href="#"
          onClick={() => handleSidebarClick("ClientTable")}
          className={activeComponent === "ClientTable" ? "selected" : ""}
        >
          <img
            src={activeComponent === "ClientTable" ? clientsRed : clientes}
            alt=""
          />
          <Typography variant="body">Clientes</Typography>
        </a>
        <a
          href="#"
          onClick={() => handleSidebarClick("Cobranca")}
          className={activeComponent === "Cobranca" ? "selected" : ""}
        >
          <img src={cobranca} alt="" />
          <Typography variant="body">Cobrança</Typography>
        </a>
      </div>

      {activeComponent === "HomeData" && <HomeData data={data} data2={data2} />}
      {activeComponent === "ClientTable" && <ClientTable />}
    </div>
  );
}
