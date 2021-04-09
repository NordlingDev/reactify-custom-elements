export const toKebabCase = (value: string) => {
  const chars: string[] = [];

  for(let i = 0; i < value.length; i++) {
    const char = value[i];
    const charLowerCase = char.toLowerCase();

    if(char !== charLowerCase && i > 0) {
      chars.push("-");
    }

    chars.push(charLowerCase);
  }

  return chars.join("");
};
