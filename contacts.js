import { promises as fs } from "fs";
import path from "path";

const contactsPath = path.resolve("db", "contacts.json");

export async function listContacts() {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
}

export async function getContactById(contactId) {
  const data = await fs.readFile(contactsPath);
  const dataNormalized = JSON.parse(data);
  return dataNormalized.filter((item) => item.id === contactId);
}

export async function removeContact(contactId) {
  const data = await fs.readFile(contactsPath);
  const dataNormalized = JSON.parse(data);
  const isExist = dataNormalized.some(contact => contact.id === contactId)

  if (isExist) {
    return dataNormalized.filter((item) => item.id === contactId)[0];
  } else {
  return null;
  }
}

export async function addContact(name, email, phone) {
  const data = await fs.readFile(contactsPath);
  const dataArray = JSON.parse(data);
  const newUser = {
    id: String(Date.now()),
    name,
    email,
    phone,
  };
  dataArray.push(newUser);
  await fs.writeFile(contactsPath, JSON.stringify(dataArray));

  return newUser;
}
