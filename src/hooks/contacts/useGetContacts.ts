import {gql, useQuery} from "@apollo/client";
import {Contact} from "../../common/interfaces/contact.interface";

export const GET_CONTACTS = gql`
    query GetContactList (
        $distinct_on: [contact_select_column!],
        $limit: Int,
        $offset: Int,
        $order_by: [contact_order_by!],
        $where: contact_bool_exp
    ) {
        contact(
            distinct_on: $distinct_on,
            limit: $limit,
            offset: $offset,
            order_by: $order_by,
            where: $where
        ){
            created_at
            first_name
            id
            last_name
            phones {
                number
            }
        }
    }
`

export const useGetContacts = (page: number, favourites: number[]):Contact[] | undefined => {
    const {data} = useQuery(GET_CONTACTS, {
        variables: {
            limit: 10,
            offset: 10 * (page-1),
            order_by:{first_name: 'asc'},
            where: {
                id: {
                    _nin: favourites
                }
            }
        }
    })

    return data?.contact
}