import { promises as fs } from "fs";
import path from "path";

const contactsPath = path.resolve("db", "contacts.json");

export async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath);
    return JSON.parse(data);
  } catch (e) {
    console.log(e.message);
  }
}

export async function getContactById(contactId) {
  try {
    const data = await fs.readFile(contactsPath);
    const dataNormalized = JSON.parse(data);
    return dataNormalized.filter((item) => item.id === contactId)[0] || null;
  } catch (e) {
    console.log(e.message);
  }
}

export async function removeContact(contactId) {
  try {
    const data = await fs.readFile(contactsPath);
    const dataNormalized = JSON.parse(data);
    return dataNormalized.filter((item) => item.id === contactId)[0] || null;
  } catch (e) {
    console.log(e.message);
  }
}

export async function addContact(name, email, phone) {
  try {
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
  } catch (e) {
    console.log(e.message);
  }
}
