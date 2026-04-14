import CryptoJS from "crypto-js";

const SECRET_KEY = "12345678";

// CIFRAR
export const cifrar = (texto) => {
  return CryptoJS.AES.encrypt(texto, SECRET_KEY).toString();
};

// DESCIFRAR
export const descifrar = (textoCifrado) => {
  try {
    const bytes = CryptoJS.AES.decrypt(textoCifrado, SECRET_KEY);
    return bytes.toString(CryptoJS.enc.Utf8);
  } catch (error) {
    return "Error al descifrar";
  }
};