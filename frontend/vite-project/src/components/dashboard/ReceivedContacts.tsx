import { api } from "../../services/axios";
import { useEffect, useState } from "react";
import { FaRegMessage } from "react-icons/fa6";

interface Contact {
    id: string;
    name: string;
    email: string;
    message: string;
}

const ReceivedContacts = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);

  const getContacts = async () => {
    try {
      const response = await api.get("v1/api/contacts");
      setContacts(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getContacts();
  }, []);

  return (
    <main className="flex flex-col py-10 px-10 w-full">
      <div className="pb-8">
        <h2 className="text-yellow-600 font-semibold text-3xl border-b">
          Contatos recebidos
        </h2>
      </div>
      <div className="flex justify-between text-sm">
        <h5 className="ms-6 w-[32rem]">
          <i>Mensagem:</i>
        </h5>
      </div>

      {contacts.map((contact) => (
        <div
          key={contact.id}
          className="mt-4 items-center flex justify-between border p-6 rounded-lg shadow-md hover:shadow-lg hover:cursor-pointer"
        >
          <div className="flex flex-col items-start gap-4">
            <div className="flex gap-2 text-red-700">
              <p className="">{contact.name}</p> -
              <p className="">{contact.email}</p>
            </div>
            <div className="flex items-center gap-4">
            <FaRegMessage/>
            <p className="w-[100%] items-start">"{contact.message}"</p>
            </div>
          </div>
        </div>
      ))}
    </main>
    )}

export default ReceivedContacts;
