import {gql, useMutation} from "@apollo/client";

interface EditContactInput {
    variables: {
        id: number;
        _set: {
            first_name: string;
            last_name: string;
            phones: {number: string;}[];
        }
    }
}

const EDIT_CONTACT = gql`
    mutation EditContactById($id: Int!, $_set: contact_set_input) {
        update_contact_by_pk(pk_columns: {id: $id}, _set: $_set) {
            id
            first_name
            last_name
            phones {
                number
            }
        }
    }

`

export const useEditContact = (): ((editContactInput: EditContactInput) => any) => {
    const [editContact] = useMutation(EDIT_CONTACT)
    return editContact
}