import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import arrows from "../../assets/Clients/arrows.png";
import clientIcon from "../../assets/Clients/clientIcon.png";
import closeBtn from "../../assets/Clients/close.png";
import criarCobranca from "../../assets/Clients/criarCobranca.png";
import emDia from "../../assets/Clients/emDia.png";
import inadimplente from "../../assets/Clients/inadimplente.png";
import arrowDown from "../../assets/Home/arrow-down.png";
import filter from "../../assets/Clients/filter.png";
import lupa from "../../assets/Clients/lupa.png";
import Backdrop from "@mui/material/Backdrop";
import circleCheck from "../../assets/Clients/circleCheck.svg";
import "./styles.css";
import { Container } from "@mui/material";

import React, { useEffect, useState } from "react";
import PopOver from "../PopOver/index";
import UserModal from "../UserModal";
import { getItem } from "../../utils/localStorage";
import api from "../../services/api";

export default function ClientTable() {
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

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const clientes = [
    {
      nome: "Sara da Silva",
      cpf: "054 365 255 87",
      email: "sarasilva@cubos.io",
      telefone: "71 9 9462 8654",
      status: inadimplente,
    },
    {
      nome: "Cameron Williamson",
      cpf: "054 365 255 87",
      email: "cameronw@cubos.io",
      telefone: "71 9 9962 8658",
      status: inadimplente,
    },
    {
      nome: "Savannah Nguyen",
      cpf: "054 365 255 87",
      email: "snguyen@cubos.io",
      telefone: "71 9 9762 8658",
      status: inadimplente,
    },
    {
      nome: "Darlene Robertson",
      cpf: "054 365 255 87",
      email: "darlener@cubos.io",
      telefone: "71 9 9562 8653",
      status: inadimplente,
    },
    {
      nome: "Marvin McKinney",
      cpf: "054 365 255 87",
      email: "marvinm@cubos.io",
      telefone: "71 9 9462 8658",
      status: inadimplente,
    },
    {
      nome: "Sandra dos Santos",
      cpf: "054 365 255 87",
      email: "sandrasantos@cubos.io",
      telefone: "71 9 9762 8652",
      status: inadimplente,
    },
    {
      nome: "Cameron Williamson",
      cpf: "054 365 255 87",
      email: "cameronw@cubos.io",
      telefone: "71 9 9962 8653",
      status: emDia,
    },
    {
      nome: "Savannah Nguyen",
      cpf: "054 365 255 87",
      email: "snguyen@cubos.io",
      telefone: "71 9 9762 8659",
      status: emDia,
    },
    {
      nome: "Darlene Robertson",
      cpf: "054 365 255 87",
      email: "darlener@cubos.io",
      telefone: "71 9 9862 8655",
      status: emDia,
    },
    {
      nome: "Marvin McKinney",
      cpf: "054 365 255 87",
      email: "marvinm@cubos.io",
      telefone: "71 9 9362 8652",
      status: emDia,
    },
  ];

  async function fetchAddressFromViaCEP(cep, setForm) {
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await response.json();
      if (!data.erro) {
        setForm((prevForm) => ({
          ...prevForm,
          address: data.logradouro || prevForm.address,
          complement: data.complemento || prevForm.complement,
          neighborhood: data.bairro || prevForm.neighborhood,
          city: data.localidade || prevForm.city,
          uf: data.uf || prevForm.uf,
        }));
      } else {
        toast.error("CEP inválido.");
      }
    } catch (error) {
      console.error("Erro ao buscar endereço:", error);
    }
  }

  const [search, setSearch] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    cpf: "",
    phone: "",
    cep: "",
    address: "",
    complement: "",
    neighborhood: "",
    city: "",
    uf: "",
  });
  const [modalVisible, setModalVisible] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  function openModal() {
    setModalVisible(true);
  }

  function closeModal() {
    setModalVisible(false);
    setForm({
      name: "",
      email: "",
      cpf: "",
      phone: "",
      cep: "",
      address: "",
      complement: "",
      neighborhood: "",
      city: "",
      uf: "",
    });
  }

  const successToastStyle = {
    borderRadius: "10px",
    background: "#C3D4FE",
    boxShadow: "0px 4px 42px 0px rgba(0, 0, 0, 0.20)",
    color: "black",
  };

  const successToastIcon = (
    <div style={{ color: "black" }}>
      <img className="circleCheck" src={circleCheck}></img>
    </div>
  );

  const handleSuccessToast = () => {
    toast.success("Cadastro realizado com sucesso.", {
      style: successToastStyle,
      icon: successToastIcon,
    });
  };

  async function handleSubmit(e) {
    e.preventDefault();

    // Verificação de campos obrigatórios
    if (!form.name || !form.email || !form.cpf || !form.phone) {
      toast.error("Os campos nome, email, CPF e telefone são obrigatórios.");
      return;
    }

    // Verificação de formato de email
    if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      toast.error("E-mail inválido.");
      return;
    }

    try {
      if (form.cep) {
        await fetchAddressFromViaCEP(form.cep, setForm);
      }

      // adicionar a lógica para enviar os dados do formulário para o backend

      closeModal();

      // Se o cadastro for bem-sucedido, exibir mensagem de confirmação
      handleSuccessToast();
    } catch (error) {
      // Tratar erros, como email ou CPF já cadastrados
      if (error.response && error.response.status === 409) {
        if (error.response.data.message === "Email already exists") {
          toast.error("E-mail informado já existe cadastrado.");
        } else if (error.response.data.message === "CPF already exists") {
          toast.error("CPF já cadastrado.");
        }
      } else {
        // Outros erros
        toast.error("Erro ao cadastrar cliente.");
      }
    }
  }

  return (
    <Container className="mainContainer">
      <nav>
        <h4>Clientes</h4>
        <div className="clientsTabPerfilButton">
          <div className="clientsTabInitials">
            <h5>{nameLetters}</h5>
          </div>
          <button className="clientsTabButtonDropDown" onClick={handleClick}>
            <div>{nome}</div>
            <img src={arrowDown} alt="" />
          </button>
          <PopOver
            anchorEl={anchorEl}
            setAnchorEl={setAnchorEl}
            modalEditOpen={modalEditOpen}
            setModalEditOpen={setModalEditOpen}
          />
        </div>
      </nav>
      <Container className="clientsMenu">
        <div className="clientsMenuLeft">
          <img className="clientsIcon" src={clientIcon} alt="icone" />
          <h1>Clientes</h1>
        </div>
        <div className="clientsMenuRight">
          <button
            className="newClientBtn patternBtn"
            onClick={() => openModal()}
          >
            + Adicionar cliente
          </button>
          <img className="filterBtn" src={filter} alt="filter" />
          <div className="searchContainer">
            <input
              className="searchInput"
              type="text"
              name="filter"
              value={search}
              placeholder="Pesquisa"
              onChange={(e) => setSearch(e.target.value)}
            ></input>
            <img className="searchIcon" src={lupa} alt="pesquisa" />
          </div>
        </div>
      </Container>
      <Container className="tableContainer">
        <table className="clientTable" border="1">
          <thead>
            <tr>
              <th>
                <img src={arrows} alt="ordenar" className="arrows" />
                Cliente
              </th>
              <th>CPF</th>
              <th>E-mail</th>
              <th>Telefone</th>
              <th>Status</th>
              <th>Criar Cobrança</th>
            </tr>
          </thead>
          <tbody>
            {clientes.map((cliente, index) => (
              <tr key={index}>
                <td>{cliente.nome}</td>
                <td>{cliente.cpf}</td>
                <td>{cliente.email}</td>
                <td>{cliente.telefone}</td>
                <td>
                  <img src={cliente.status} alt="status" />
                </td>
                <td>
                  <img
                    src={criarCobranca}
                    alt="criar cobrança"
                    className="billingImg"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Container>
      {modalVisible && (
        <div>
          <Backdrop className="customBackdrop" open={modalVisible}></Backdrop>
          <section className="clientModal">
            <div className="modalHeader">
              <img className="modalIcon" src={clientIcon} alt="cliente" />
              <h1>Cadastro do Cliente</h1>
              <img
                className="closeBtn pointer"
                src={closeBtn}
                alt="fechar"
                onClick={() => closeModal()}
              />
            </div>
            <form onSubmit={(e) => handleSubmit(e)}>
              <div className="inputContainer">
                <label htmlFor="name">Nome*</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  placeholder="Digite o nome"
                  onChange={(e) => handleChange(e)}
                ></input>
              </div>
              <div className="inputContainer">
                <label htmlFor="email">E-mail*</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  placeholder="Digite o e-mail"
                  onChange={(e) => handleChange(e)}
                ></input>
              </div>
              <div className="doubleInputContainer">
                <div className="inputContainer">
                  <label htmlFor="cpf">CPF*</label>
                  <input
                    type="number"
                    name="cpf"
                    value={form.cpf}
                    placeholder="Digite o CPF"
                    onChange={(e) => handleChange(e)}
                  ></input>
                </div>
                <div className="inputContainer">
                  <label htmlFor="phone">Telefone*</label>
                  <input
                    type="number"
                    name="phone"
                    value={form.phone}
                    placeholder="Digite o telefone"
                    onChange={(e) => handleChange(e)}
                  ></input>
                </div>
              </div>
              <div className="inputContainer">
                <label htmlFor="address">Endereço</label>
                <input
                  type="text"
                  name="address"
                  value={form.address}
                  placeholder="Digite o endereço"
                  onChange={(e) => handleChange(e)}
                ></input>
              </div>
              <div className="inputContainer">
                <label htmlFor="complement">Complemento</label>
                <input
                  type="text"
                  name="complement"
                  value={form.complement}
                  placeholder="Digite o complemento"
                  onChange={(e) => handleChange(e)}
                ></input>
              </div>
              <div className="doubleInputContainer">
                <div className="inputContainer">
                  <label htmlFor="cep">CEP</label>
                  <input
                    type="number"
                    name="cep"
                    value={form.cep}
                    placeholder="Digite o CEP"
                    onChange={(e) => handleChange(e)}
                    onBlur={(e) =>
                      fetchAddressFromViaCEP(e.target.value, setForm)
                    }
                  ></input>
                </div>
                <div className="inputContainer">
                  <label htmlFor="neighborhood">Bairro</label>
                  <input
                    type="text"
                    name="neighborhood"
                    value={form.neighborhood}
                    placeholder="Digite o bairro"
                    onChange={(e) => handleChange(e)}
                  ></input>
                </div>
              </div>
              <div className="doubleInputContainer">
                <div className="inputContainer">
                  <label htmlFor="city">Cidade</label>
                  <input
                    className="cityInput"
                    type="text"
                    name="city"
                    value={form.city}
                    placeholder="Digite a cidade"
                    onChange={(e) => handleChange(e)}
                  ></input>
                </div>
                <div className="inputContainer">
                  <label htmlFor="uf">UF</label>
                  <input
                    className="ufInput"
                    type="text"
                    name="uf"
                    value={form.uf}
                    placeholder="Digite a UF"
                    onChange={(e) => handleChange(e)}
                  ></input>
                </div>
              </div>
              <div className="btnsContainer">
                <button
                  type="button"
                  className="cancel patternBtn"
                  onClick={() => closeModal()}
                >
                  Cancelar
                </button>
                <button className="apply patternBtn" type="submit">
                  Aplicar
                </button>
              </div>
            </form>
          </section>
        </div>
      )}
      <ToastContainer
        position="bottom-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      {modalEditOpen && (
        <UserModal
          modalEditOpen={modalEditOpen}
          setModalEditOpen={setModalEditOpen}
          render={render}
          setRender={setRender}
        />
      )}
    </Container>
  );
}
