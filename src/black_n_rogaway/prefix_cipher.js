/**
 * Inspired from node-fpe
 * @param {*} param0
 */
function Cipher({
  domain = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890".split(
    ""
  ),
  enc_func,
}) {
  if (!enc_func) throw new Error(`invalid enc_func`);
  const sorted = domain
    .map((c) => c)
    .sort((c1, c2) => {
      return enc_func(c1).localeCompare(enc_func(c2));
    });
  const encTable = {};
  const decTable = {};

  for (var i in domain) {
    encTable[domain[i]] = sorted[i];
    decTable[sorted[i]] = domain[i];
  }

  function validate(text, result) {
    if (text.length !== result.length) {
      throw new Error("bad_input_or_invalid_domain");
    }
  }

  function encrypt(text) {
    if (typeof text !== "string") {
      throw new Error("input is not a string");
    }
    const encrypted = text
      .split("")
      .map((c) => encTable[c])
      .join("");
    validate(text, encrypted);
    return encrypted;
  }

  function decrypt(text) {
    if (typeof text !== "string") {
      throw new Error("input is not a string");
    }
    const decrypted = text
      .split("")
      .map((c) => decTable[c])
      .join("");
    validate(text, decrypted);
    return decrypted;
  }

  return { encrypt, decrypt };
}

function encrypt_aes_256_ecb(password, text) {
  // PKCS7 padding utility, inspired from pycryptodome
  function pad(input, block_size) {
    if (input.length >= block_size) return input.slice(0, block_size);
    else {
      const padding_len = block_size - (input.length % block_size);
      const temp = [input];
      for (var i = 0; i < padding_len; i++) {
        temp.push(Buffer.from([padding_len]));
      }
      return Buffer.concat(temp);
    }
  }

  password = pad(Buffer.from(password), 32);

  const crypto = require("crypto");

  const cipher = crypto.createCipheriv("aes-256-ecb", password, null);

  var crypted = cipher.update(text, "utf8", "hex");
  crypted += cipher.final("hex");
  return crypted;
}

module.exports = {
  Cipher,
  encrypt_aes_256_ecb,
};
