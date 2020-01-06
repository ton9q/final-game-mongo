export default function generateName(dataNames) {
  const surnameIndex = Math.floor(Math.random() * dataNames.surnames.length);
  const nameIndex = Math.floor(Math.random() * dataNames.names.length);
  const patronymicIndex = Math.floor(Math.random() * dataNames.patronymics.length);

  return `${dataNames.surnames[surnameIndex]} ${dataNames.names[nameIndex]} ${dataNames.patronymics[patronymicIndex]}`;
}
