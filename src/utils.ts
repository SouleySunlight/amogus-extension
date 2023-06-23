export const  hash =  async (textToHash: string): Promise<string> => {
    const utf8 = new TextEncoder().encode(textToHash);
    const hashBuffer = await crypto.subtle.digest('SHA-256', utf8);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray
        .map((bytes) => bytes.toString(2).padStart(8, '0'))
        .join('');
    return hashHex;
}

export const getBitGrid = (bits:string): string[] =>{
    const bitGrid = []
    for(let i = 0; i<16; i++){
         bitGrid.push(bits.slice(i*16,(i+1)*16))
    }
    return bitGrid
}