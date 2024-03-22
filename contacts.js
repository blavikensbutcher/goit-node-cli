import { promises as fs} from "fs"
import path from "path";

const contactsPath = path.resolve("db", "contacts.json")

const read = await fs.readFile(pathToFile)
const readNormilized = read.toString()


async function listContacts() {
    // ...твій код. Повертає масив контактів.
}

async function getContactById(contactId) {
    // ...твій код. Повертає об'єкт контакту з таким id. Повертає null, якщо контакт з таким id не знайдений.
}

async function removeContact(contactId) {
    // ...твій код. Повертає об'єкт видаленого контакту. Повертає null, якщо контакт з таким id не знайдений.
}

async function addContact(name, email, phone) {
    // ...твій код. Повертає об'єкт доданого контакту (з id).
}
