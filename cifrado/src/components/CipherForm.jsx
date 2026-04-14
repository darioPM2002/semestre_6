import { useState } from "react";
import { cifrar, descifrar } from "../utils/crypto";

const s = {
  page: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "2rem",
    background: "#f7f6ff",
  },
  card: {
    background: "#fff",
    borderRadius: 20,
    border: "1px solid #e8e4fe",
    padding: "2rem 2.25rem",
    width: "100%",
    maxWidth: 460,
  },
  badge: {
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    background: "#EEEDFE",
    color: "#534AB7",
    fontSize: 11,
    fontWeight: 500,
    padding: "4px 12px",
    borderRadius: 100,
    marginBottom: "1.25rem",
  },
  badgeDot: { width: 6, height: 6, borderRadius: "50%", background: "#7F77DD" },
  h2: { fontSize: 20, fontWeight: 500, color: "#1a1a1a", marginBottom: 4 },
  sub: { fontSize: 13, color: "#888", marginBottom: "1.75rem" },
  label: {
    fontSize: 11,
    fontWeight: 500,
    letterSpacing: ".07em",
    textTransform: "uppercase",
    color: "#aaa",
    marginBottom: 7,
  },
  inp: (variant) => ({
    width: "100%",
    padding: "10px 14px",
    borderRadius: 10,
    fontSize: variant === "filled" ? 13 : 14,
    fontFamily: variant === "filled" ? "monospace" : "inherit",
    outline: "none",
    marginBottom: 10,
    border: "1px solid",
    ...(variant === "filled"
      ? { background: "#EEEDFE", borderColor: "#AFA9EC", color: "#3C3489" }
      : variant === "result"
      ? { background: "#E1F5EE", borderColor: "#9FE1CB", color: "#085041" }
      : { background: "#fafafa", borderColor: "#e4e4e4", color: "#1a1a1a" }),
  }),
  row: { display: "flex", alignItems: "center", gap: 8, marginBottom: "1.5rem" },
  btnPurple: {
    padding: "8px 20px", borderRadius: 100, fontSize: 13, fontWeight: 500,
    cursor: "pointer", border: "none", background: "#7F77DD", color: "#fff",
  },
  btnTeal: {
    padding: "8px 20px", borderRadius: 100, fontSize: 13, fontWeight: 500,
    cursor: "pointer", border: "none", background: "#1D9E75", color: "#fff",
  },
  arrow: { textAlign: "center", color: "#ccc", fontSize: 18, margin: "0.5rem 0 0.75rem" },
};

const Pill = ({ done, color, label }) => (
  <span style={{
    display: "inline-flex", alignItems: "center", gap: 5,
    fontSize: 11, fontWeight: 500, padding: "3px 10px", borderRadius: 100,
    background: done ? (color === "purple" ? "#EEEDFE" : "#E1F5EE") : "#f4f4f4",
    color: done ? (color === "purple" ? "#534AB7" : "#0F6E56") : "#aaa",
  }}>
    <span style={{ width: 5, height: 5, borderRadius: "50%", background: "currentColor" }} />
    {label}
  </span>
);

const CipherForm = () => {
  const [texto, setTexto] = useState("");
  const [textoCifrado, setTextoCifrado] = useState("");
  const [textoDescifrado, setTextoDescifrado] = useState("");
  const [cipherDone, setCipherDone] = useState(false);
  const [decipherDone, setDecipherDone] = useState(false);

  const handleCifrar = () => {
    if (!texto.trim()) return;
    setTextoCifrado(cifrar(texto));
    setCipherDone(true);
    setTextoDescifrado("");
    setDecipherDone(false);
  };

  const handleDescifrar = () => {
    if (!textoCifrado) return;
    setTextoDescifrado(descifrar(textoCifrado));
    setDecipherDone(true);
  };

  const handleInput = (e) => {
    setTexto(e.target.value);
    setTextoCifrado("");
    setTextoDescifrado("");
    setCipherDone(false);
    setDecipherDone(false);
  };

  return (
    <div style={s.page}>
      <div style={s.card}>
        <div style={s.badge}><span style={s.badgeDot} />cipher tool</div>
        <h2 style={s.h2}>Encripta tu texto</h2>
        <p style={s.sub}>Cifra y descifra mensajes fácilmente</p>

        <p style={s.label}>Texto original</p>
        <input style={s.inp("default")} type="text" placeholder="Escribe algo aquí…" value={texto} onChange={handleInput} />
        <div style={s.row}>
          <button style={s.btnPurple} onClick={handleCifrar}>Cifrar →</button>
          <Pill done={cipherDone} color="purple" label={cipherDone ? "cifrado" : "esperando"} />
        </div>

        <div style={s.arrow}>↓</div>

        <p style={s.label}>Texto cifrado</p>
        <input style={s.inp(cipherDone ? "filled" : "default")} type="text" readOnly value={textoCifrado} placeholder="—" />
        <div style={s.row}>
          <button style={s.btnTeal} onClick={handleDescifrar}>Descifrar →</button>
          <Pill done={decipherDone} color="teal" label={decipherDone ? "descifrado" : "esperando"} />
        </div>

        <div style={s.arrow}>↓</div>

        <p style={s.label}>Texto recuperado</p>
        <input style={s.inp(decipherDone ? "result" : "default")} type="text" readOnly value={textoDescifrado} placeholder="—" />
      </div>
    </div>
  );
};

export default CipherForm;