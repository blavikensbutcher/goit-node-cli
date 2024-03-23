import { promises as fs } from "fs";
import path from "path";

const contactsPath = path.resolve("db", "contacts.json");

export async function listContacts() {
  try {
    //Get all data from bd
    const data = await fs.readFile(contactsPath);
    const response = JSON.parse(data)

    //return data with table view
    console.table(response)
    return response;
  } catch (e) {
    console.error("Can't get contact list error")
    throw e
  }
}

export async function getContactById(contactId) {
  try {
    //Get data from db
    const data = await fs.readFile(contactsPath);
    const dataNormalized = JSON.parse(data);


    console.log(dataNormalized.filter((item) => item.id === contactId)[0])
    //Get contact with current id or return null
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

    //Return deleted user
    const response = dataNormalized.filter((item) => item.id === contactId)[0] || null;

    //Found all users except contactId
    const updatedData = dataNormalized.filter(item => item.id !== contactId) || null

    //IF we don't have such users do not touch db
    if (updatedData && updatedData.length > 0) {
      await fs.writeFile(contactsPath, JSON.stringify(updatedData))
    }

    if (response !== null) {
      console.log(`Contact ${response} removed`)
    }

    return response

  } catch (e) {
    console.error("Delete error");
    throw e;
  }
}

export async function addContact(name, email, phone) {
  try {

    //Get data from db
    const data = await fs.readFile(contactsPath);
    const dataArray = JSON.parse(data);

    //Add new data to merge with original data
    const newUser = {
      id: String(Date.now()),
      name,
      email,
      phone,
    };

    dataArray.push(newUser);

    //Write data to db

    await fs.writeFile(contactsPath, JSON.stringify(dataArray));

    console.log(`Added new contact: ${newUser} `)

    return newUser;
  } catch (e) {
   console.error("Add contact error")
    throw e
  }
}
