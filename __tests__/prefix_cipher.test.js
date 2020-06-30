const FPEPrefixCipher = require("../src").FPEPrefixCipher;

test("should throw error with undefined enc_func", () => {
  expect(() => {
    const cipher = new FPEPrefixCipher.Cipher({
      domain: "1234567890",
    });
  }).toThrow("invalid enc_func");
});

test("should throw error when encrypt with invalid domain", () => {
  const cipher = new FPEPrefixCipher.Cipher({
    domain: "1234567890".split(""),
    enc_func: function (v) {
      return v;
    },
  });

  expect(() => {
    cipher.encrypt("abc123").toThrow("bad_input_or_invalid_domain");
  });
});

test("should encrypt and decrypt", () => {
  const cipher = new FPEPrefixCipher.Cipher({
    domain: "abc123".split(""),
    enc_func: function (v) {
      return v;
    },
  });

  const input = "abc123";
  const encrypted = cipher.encrypt(input);
  const decrypted = cipher.decrypt(encrypted);
  expect(decrypted).toEqual(input);
});

test("should encrypt '9LSLTVUPC8' with password 'tool4tee.com' and decrypt using domain: ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890 and aes-128-ecb as prefix cipher", () => {
  const password = "tool4tee.com";
  const cipher = new FPEPrefixCipher.Cipher({
    domain: "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890".split(""),
    enc_func: function (v) {
      return FPEPrefixCipher.encrypt_aes_128_ecb(password, v);
    },
  });

  const input = "9LSLTVUPC8";
  const encrypted = cipher.encrypt(input);
  expect(encrypted).toEqual("AGDGTHX4JP");
  const decrypted = cipher.decrypt(encrypted);
  expect(decrypted).toEqual(input);
});

test("should encrypt and decrypt using aes-256-ecb as prefix cipher", () => {
  const password = "secret";
  const cipher = new FPEPrefixCipher.Cipher({
    domain: "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890".split(
      ""
    ),
    enc_func: function (v) {
      return FPEPrefixCipher.encrypt_aes_256_ecb(password, v);
    },
  });

  const input = "abc123";
  const encrypted = cipher.encrypt(input);
  const decrypted = cipher.decrypt(encrypted);
  expect(decrypted).toEqual(input);
});

test("should encrypt '9LSLTVUPC8' with password 'tool4tee.com' and decrypt using aes-256-ecb as prefix cipher", () => {
  const password = "tool4tee.com";
  const cipher = new FPEPrefixCipher.Cipher({
    domain: "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890".split(
      ""
    ),
    enc_func: function (v) {
      return FPEPrefixCipher.encrypt_aes_256_ecb(password, v);
    },
  });

  const input = "9LSLTVUPC8";
  const encrypted = cipher.encrypt(input);
  expect(encrypted).toEqual("YFzFfJGmpD");
  const decrypted = cipher.decrypt(encrypted);
  expect(decrypted).toEqual(input);
});
