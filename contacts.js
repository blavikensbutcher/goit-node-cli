import { promises as fs } from "fs";
import path from "path";

const contactsPath = path.resolve("db", "contacts.json");

export async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath);
    const response = JSON.parse(data)
    console.table(response)
    return response;
  } catch (e) {
    console.error("Can't get contact list error")
    throw e
  }
}

export async function getContactById(contactId) {
  try {
    const data = await fs.readFile(contactsPath);
    const dataNormalized = JSON.parse(data);
    return dataNormalized.filter((item) => item.id === contactId)[0] || null;
  } catch (e) {
    console.error("Search contact by id error")
    throw e
  }
}

export async function removeContact(contactId) {
  try {
    const data = await fs.readFile(contactsPath);
    const dataNormalized = JSON.parse(data);
    const response = dataNormalized.filter((item) => item.id === contactId)[0] || null;

    //Found all users except contactId
    const bd = dataNormalized.filter(item => item.id !== contactId) || null

    //IF we don't have such users do not touch bd
    if (bd) {
      await fs.writeFile(contactsPath, JSON.stringify(bd))
    }

    console.log(response)
    return response;
  } catch (e) {
    console.error("Delete error");
    throw e;
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
   console.error("Add contact error")
    throw e
  }
}
