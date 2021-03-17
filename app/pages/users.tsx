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
import getUsernames from "app/queries/getUsernames"
import getUsernamesGlobal from "app/queries/getUsernamesGlobal"
import addContact from "app/mutations/addContact"
import { useQuery, useMutation } from "blitz"
import { useState } from "react"
export default function Users() {
  const [inputValue, setInputValue] = useState("")

  function onChangeHandler(e) {
    setInputValue(e.target.value)
  }

  function addContactHandler() {
    updateContacts(searchGlobal!.id)
  }

  let [updateContacts] = useMutation(addContact)

  let [searchResults] = useQuery(getUsernames, null)

  let [searchGlobal] = useQuery(getUsernamesGlobal, inputValue)

  return (
    <Container>
      <Heading>My Contacts</Heading>
      <Input onChange={onChangeHandler} value={inputValue} placeholder="Search for Contacts" />
      <Table>
        <Thead>
          <Tr>
            <Th>Username</Th>
            <Th>Email</Th>
          </Tr>
        </Thead>
        <Tbody>
          {searchResults
            .filter((user) => {
              return user.displayName.toLowerCase().startsWith(inputValue.toLowerCase())
            })
            .map((user) => {
              return (
                <Tr>
                  <Td>{user.displayName}</Td>
                  <Td>{user.email}</Td>
                </Tr>
              )
            })}
          {searchGlobal && (
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
