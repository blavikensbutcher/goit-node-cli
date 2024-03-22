import { program } from "commander";
import { addContact, listContacts, removeContact, getContactById} from "./contacts.js";

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse();

const options = program.opts();

// TODO: рефакторити
async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      // ...
        await listContacts().then(item => console.log(item))
      break;

    case "get":
      // ... id
        await getContactById(id).then(item => console.log(item))
      break;

    case "add":
      // ... name email phone
       await addContact(name, email, phone).then(item => console.log(item))
      break;

    case "remove":
      // ... id
        await removeContact(id).then(item => console.log(item))
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(options);
