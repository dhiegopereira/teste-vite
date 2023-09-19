/* eslint-disable react/prop-types */
import "./styles.css";
import { useState, useEffect } from "react";
import InputPassword from "../InputPassword";
import InputPattern from "../InputPattern";
import close from "../../assets/close.svg";
import { getItem, setItem } from "../../utils/localStorage";
import api from "../../services/api";

import ModalSuccess from "../ModalSuccess/ModalSuccess";

export default function UserModal({ setModalEditOpen, render, setRender }) {
  const [modalName, setModalName] = useState("");
  const [modalEmail, setModalEmail] = useState("");
  const [modalPass, setModalPass] = useState("");
  const [modalCPF, setModalCPF] = useState("");
  const [modalTelephone, setModalTelephone] = useState("");
  const [modalConfirm, setModalConfirm] = useState("");

  const [modalSuccessOpen, setModalSuccessOpen] = useState(false);

  const [userError, setUserError] = useState();
  const [user, setUser] = useState({});
  const [confirmPassword, setConfirmPassword] = useState("");
  const [newUser, setNewUser] = useState({
    name: user.name,
    email: user.email,
    cpf: user.cpf,
    telephone: user.telephone,
    password: user.password,
  });

  useEffect(() => {
    async function getUserData() {
      try {
        const token = getItem("token");
        const res = await api.get("/", {
          headers: { authorization: `Bearer ${token}` },
        });

        setNewUser({
          name: res.data.name,
          email: res.data.email,
          cpf: res.data.cpf,
          telephone: res.data.telephone,
        });
        setItem("nome", res.data.name);
      } catch (error) {
        setUserError(error.response.data.message);
      }
    }
    getUserData();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    e.stopPropagation();

    const nameRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ\s]*$/;
    const emailRegex = /@[^!@#$%^&*(),.?":{}|<>]+/;
    const onlyNumbersRegex = /^[0-9]+$/;

    if (
      !newUser.name &&
      !newUser.email &&
      !newUser.password &&
      !confirmPassword
    ) {
      setModalName("Este campo deve ser preenchido");
      setModalEmail("Este campo deve ser preenchido");
      setModalPass("Este campo deve ser preenchido");
      setModalConfirm("Este campo deve ser preenchido");
      return;
    }

    if (!newUser.name) {
      setModalName("Este campo deve ser preenchido");
    } else {
      setModalName("");
    }

    if (!newUser.email) {
      setModalEmail("Este campo deve ser preenchido");
    } else {
      setModalEmail("");
    }

    if (!newUser.password) {
      setModalPass("Este campo deve ser preenchido");
    } else {
      setModalPass("");
    }

    if (!confirmPassword) {
      setModalConfirm("Este campo deve ser preenchido");
    } else {
      setModalConfirm("");
    }

    if (!nameRegex.test(newUser.name)) {
      setModalName("Insira apenas caracteres alfabéticos");
    } else {
      setModalName("");
    }

    if (!emailRegex.test(newUser.email)) {
      setModalEmail("Insira um endereço de email válido");
    } else {
      setModalEmail("");
    }

    if (newUser.cpf) {
      if (!onlyNumbersRegex.test(newUser.cpf)) {
        setModalCPF("Insira apenas caracteres numéricos");
      } else {
        setModalCPF("");
      }
    }
    if (newUser.telephone) {
      if (!onlyNumbersRegex.test(newUser.telephone)) {
        setModalTelephone("Insira apenas caracteres numéricos");
      } else {
        setModalTelephone("");
      }
    }

    if (newUser.password && confirmPassword) {
      if (newUser.password !== confirmPassword) {
        setModalPass("Os campos senha não conferem");
        setModalConfirm("Os campos senha não conferem");
      } else {
        setModalPass("");
        setModalConfirm("");
      }
    }

    try {
      const token = getItem("token");
      const res = await api.put(
        "/user/update",
        { ...newUser },
        {
          headers: { authorization: `Bearer ${token}` },
        }
      );

      setUser(res.data);
      setRender(!render);

      if (res) {
        setModalSuccessOpen(true);

        const modalUser = document.querySelector(".backgroundModal");

        modalUser.classList.add("hidden");

        setTimeout(() => {
          setModalEditOpen(false);
        }, 2000);
      }

      return;
    } catch (error) {
      setUserError(error.response.data.message);

      return;
    }
  }

  const handleCloseEditModal = (e) => {
    e.preventDefault();

    setModalEditOpen(false);
  };

  function handleChange(e) {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  }

  return (
    <>
      <div className="backgroundModal">
        <div className="userModalContent">
          <div
            className="userModalClose"
            onClick={(e) => {
              handleCloseEditModal(e);
            }}
          >
            <img
              className="pointer"
              src={close}
              alt="Botão para fechamento do modal"
            />
          </div>
          <div className="userModalBox">
            <h1 className="userModalTitle">Edite seu cadastro</h1>
            <form className="userModalForm" onSubmit={handleSubmit}>
              <label htmlFor="nome" className="userModalLabelGap">
                Nome*
              </label>
              <InputPattern
                type="name"
                name="name"
                placeholder="Digite seu nome"
                value={newUser.name}
                onChange={(e) => {
                  handleChange(e);
                }}
                className={modalName ? "errorBorder" : ""}
              />
              <span className="errorMessage">{modalName}</span>
              <label htmlFor="email" className="userModalLabelGap">
                E-mail*
              </label>
              <InputPattern
                type="email"
                name="email"
                placeholder="Digite seu e-mail"
                value={newUser.email}
                onChange={handleChange}
              />
              <span className="errorMessage"> {modalEmail}</span>
              <div className="userModalLabelGap userModalCPFTelephoneBox">
                <div className="inputAlign">
                  <label htmlFor="cpf">CPF</label>
                  <InputPattern
                    type="text"
                    name="cpf"
                    placeholder="Digite seu CPF"
                    value={newUser.cpf}
                    onChange={(e) => {
                      handleChange(e);
                    }}
                  />
                  <span className="errorMessage">{modalCPF}</span>
                </div>
                <div className="inputAlign">
                  <label htmlFor="telefone">Telefone</label>
                  <InputPattern
                    type="text"
                    name="telephone"
                    placeholder="Digite seu Telefone"
                    value={newUser.telephone}
                    onChange={(e) => {
                      handleChange(e);
                    }}
                  />
                  <span className="errorMessage">{modalTelephone}</span>
                </div>
              </div>
              <label htmlFor="nova senha" className="userModalLabelGap">
                Nova Senha*
              </label>
              <InputPassword
                onChange={(e) => {
                  handleChange(e);
                }}
              />
              <span className="errorMessage"> {modalPass}</span>
              <label htmlFor="confirmar senha" className="userModalLabelGap">
                Confirmar Senha*
              </label>
              <InputPassword
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <span className="errorMessage" id="modalConfirmMessage">
                {modalConfirm || userError}
              </span>
              <button
                className="userModalButton signInBtn patternBtn"
                type="submit"
              >
                Aplicar
              </button>
            </form>
          </div>
        </div>
      </div>
      {modalSuccessOpen && <ModalSuccess />}
    </>
  );
}
