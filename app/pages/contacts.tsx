import {
  Container,
  IconButton,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Input,
} from "@chakra-ui/react"
import { AddIcon } from "@chakra-ui/icons"
import getContactsOfUser from "app/queries/getContactsOfUser"
import searchUsers from "app/queries/searchUsers"
import addContact from "app/mutations/addContact"
import { useQuery, useMutation } from "blitz"
import { useState } from "react"

export default function Contacts() {
  const [inputValue, setInputValue] = useState("")

  function onChangeHandler(e) {
    setInputValue(e.target.value)
  }

  async function addContactHandler() {
    await updateContacts(searchGlobal!.id)
    await searchExtras.refetch()
  }

  let [updateContacts] = useMutation(addContact)

  let [searchResults, searchExtras] = useQuery(getContactsOfUser, null)

  let [searchGlobal] = useQuery(searchUsers, inputValue, { suspense: false })

  return (
    <Container>
      <Heading>My Contacts</Heading>
      <Input onChange={onChangeHandler} value={inputValue} placeholder="Search for Contacts" />
      <Table>
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Username</Th>
          </Tr>
        </Thead>
        <Tbody>
          {searchResults
            .filter((user) => {
              return (
                user.displayName.toLowerCase().startsWith(inputValue.toLowerCase()) ||
                user.username.toLowerCase().startsWith(inputValue.toLowerCase())
              )
            })
            .map((user) => {
              return (
                <Tr>
                  <Td>{user.displayName}</Td>
                  <Td>{user.username}</Td>
                </Tr>
              )
            })}
          {searchGlobal &&
            searchResults.every((user) => {
              return user.id !== searchGlobal?.id
            }) && (
              <Tr>
                <Td>{searchGlobal.displayName}</Td>
                <Td>
                  {searchGlobal.username}{" "}
                  <IconButton
                    aria-label="Search database"
                    onClick={addContactHandler}
                    icon={<AddIcon />}
                  />
                </Td>
              </Tr>
            )}
        </Tbody>
      </Table>
    </Container>
  )
}
