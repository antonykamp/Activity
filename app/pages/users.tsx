import { Container, Heading, Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react"
import getUsernames from "app/queries/getUsernames"
import { useQuery } from "blitz"
// const nameList = ["Janis", "Konstantin", "Simon", "Ennio", "Antony"]

export default function Users() {
  const [users] = useQuery(getUsernames, undefined)
  return (
    <Container>
      <Heading>Users</Heading>
      <Table>
        <Thead>
          <Tr>
            <Th>Username</Th>
            <Th>Email</Th>
          </Tr>
        </Thead>
        <Tbody>
          {users.map((user) => {
            return (
              <Tr>
                <Td>{user.username}</Td>
                <Td>{user.email}</Td>
              </Tr>
            )
          })}
        </Tbody>
      </Table>
    </Container>
  )
}
