import {gql, useQuery} from "@apollo/client";
import {Contact} from "../../common/interfaces/contact.interface";

const GET_CONTACT_DETAILS = gql`
    query GetContactDetail($id: Int!){
        contact_by_pk(id: $id) {
            last_name
            id
            first_name
            created_at
            phones {
                number
            }
        }
    }
`

export const useGetContactDetails = (id: number, skip: boolean):Contact | undefined => {
    const {data} = useQuery(GET_CONTACT_DETAILS, {
        variables: {
            id: id
        },
        skip:skip
    })

    return data?.contact_by_pk
}