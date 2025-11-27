function base64UrlToUint8Array(base64Url: string): Uint8Array {
  let base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  while (base64.length % 4 !== 0) {
    base64 += "=";
  }
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}

export async function generateTOTP(
  secret: string,
  interval: number = 15,
  digits: number = 10,
): Promise<string> {
  const keyBytes = base64UrlToUint8Array(secret);

  const epoch = Math.floor(Date.now() / 1000);
  const counter = Math.floor(epoch / interval);

  const msg = new Uint8Array(8);
  let c = counter;
  for (let i = 7; i >= 0; i--) {
    msg[i] = c & 0xff;
    c = Math.floor(c / 256);
  }

  const cryptoKey = await crypto.subtle.importKey(
    "raw",
    keyBytes as BufferSource,
    { name: "HMAC", hash: "SHA-1" },
    false,
    ["sign"],
  );

  const hmac = new Uint8Array(await crypto.subtle.sign("HMAC", cryptoKey, msg));

  const offset = hmac[19] & 0x0f;
  const binCode =
    ((hmac[offset] & 0x7f) << 24) |
    (hmac[offset + 1] << 16) |
    (hmac[offset + 2] << 8) |
    hmac[offset + 3];

  const mod = 10 ** digits;
  const code = (binCode % mod).toString().padStart(digits, "0");

  return code;
}
