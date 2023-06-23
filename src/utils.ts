export const  hash =  async (textToHash: string): Promise<string> => {
    const utf8 = new TextEncoder().encode(textToHash);
    const hashBuffer = await crypto.subtle.digest('SHA-256', utf8);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray
        .map((bytes) => bytes.toString(2).padStart(8, '0'))
        .join('');
    return hashHex;
}