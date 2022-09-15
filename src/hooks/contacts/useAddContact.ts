import {gql, useMutation} from "@apollo/client";

interface AddContactInput {
    variables: {
        first_name: string;
        last_name: string;
        phones: {number: string;}[];
    }
}

const ADD_CONTACT = gql`
    mutation AddContactWithPhones(
        $first_name: String!,
        $last_name: String!,
        $phones: [phone_insert_input!]!
    ) {
        insert_contact(
            objects: {
                first_name: $first_name,
                last_name: $last_name,
                phones: {
                    data: $phones
                }
            }
        ) {
            returning {
                first_name
                last_name
                id
                phones {
                    number
                }
            }
        }
    }
`

export const useAddContact = (): ((addContactInput: AddContactInput) => any) => {
    const [addContact] = useMutation(ADD_CONTACT)
    return addContact
}