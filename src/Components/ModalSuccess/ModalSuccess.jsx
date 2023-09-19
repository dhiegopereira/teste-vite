import "./styles.css";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

const ModalSuccess = () => {
  return (
    <div className="containerSuccess">
      <div className="contentSuccess">
        <CheckCircleOutlineIcon
          className="circleCheckSuccess"
          sx={{
            width: "180px",
            height: "90px",
            color: "#0E8750",
          }}
        />
        <p>Cadastro Alterado com sucesso!</p>
      </div>
    </div>
  );
};

export default ModalSuccess;
