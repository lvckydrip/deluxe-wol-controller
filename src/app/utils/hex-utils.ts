export function byteArrayToHexString(byteArray: Uint8Array) {
  return Array.prototype.map.call(byteArray, byte => byte.toString(16).padStart(2, '0')).join('');
}

export function hexStringToByteArray(hexString: string) {
  if (hexString.length != 12) {
    throw new Error("MAC Address isn't 12 characters long");
  }
  const byteArray = new Uint8Array(6);
  for (let i = 0; i < hexString.length; i += 2) {
    byteArray[i / 2] = parseInt(hexString.substr(i, 2), 16);
  }
  return byteArray;
}