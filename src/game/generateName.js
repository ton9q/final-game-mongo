export default function generateName(dataNames) {
  let surnameIndex = Math.floor(Math.random() * dataNames.surnames.length);
  let nameIndex = Math.floor(Math.random() * dataNames.names.length);
  let patronymicIndex = Math.floor(Math.random() * dataNames.patronymics.length);
  
  return `${dataNames.surnames[surnameIndex]} ${dataNames.names[nameIndex]} ${dataNames.patronymics[patronymicIndex]}`;
}