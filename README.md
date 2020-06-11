# fpe

Format-preserving encryption (FPE).

Current implementations:

- FPE constructions of Black and Rogaway from a prefix cipher (https://en.wikipedia.org/wiki/Format-preserving_encryption#FPE_from_a_prefix_cipher)
  - Implement Cipher class, require `enc_func` argument as a prefix cipher
  - Provide a common (prefix) cipher: `encrypt_aes_256_ecb`

## Installing

```
npm install @nghiaht/fpe
```

## Example

Use `aes-256-ecb` as prefix cipher:

```
const FPEPrefixCipher = require("@nghiaht/fpe").FPEPrefixCipher;
const cipher = new FPEPrefixCipher.Cipher({
    domain: "abc123".split(""),
    enc_func: function (v) {
      return FPEPrefixCipher.encrypt_aes_256_ecb("password", v);
    },
});

const input = "abc123";
const encrypted = cipher.encrypt(input);
const decrypted = cipher.decrypt(encrypted);
```

Please provide your custom prefix cipher (block cipher, etc..) as an agument `enc_func` in the Cipher constructor:

```
function my_enc_func(v) {
    return my_encrypt_aes("password", v);
}

const cipher = new FPEPrefixCipher.Cipher({
    domain: "abc123".split(""),
    enc_func: my_enc_func
});
```

Raise error when your input is not in the input domain:

```
const cipher = new FPEPrefixCipher.Cipher({
    domain: "1234567890".split(""),
    enc_func: function (v) {
      return v;
    },
});

cipher.encrypted("abc123")  // throw Error("bad_input_or_invalid_domain"), "abc" not in domain: "1234567890"

```

# Testing

```
npm run test
```

# Potential Actions

- Implement more FPE constructions.
- Prefix cipher: implement more or generalize into a base encoder function supporting various block cipher algorithms.
