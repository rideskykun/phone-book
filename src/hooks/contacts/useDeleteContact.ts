import {gql, useMutation} from "@apollo/client";

interface DeleteContactInput {
    variables: {
        id: number
    }
}

const DELETE_CONTACT = gql`
    mutation MyMutation($id: Int!) {
        delete_contact_by_pk(id: $id) {
            first_name
            last_name
            id
        }
    }
`

export const useDeleteContact = (): ((deleteContactInput: DeleteContactInput) => any) => {
    const [deleteContact] = useMutation(DELETE_CONTACT)
    return deleteContact
}