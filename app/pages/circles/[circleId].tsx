import { useParam } from "blitz"
import {
  IconButton,
  InputRightElement,
  InputGroup,
  Divider,
  Input,
  Center,
  Container,
  Heading,
  Table,
  Thead,
  Tr,
  Th,
  Td,
} from "@chakra-ui/react"
import { ArrowRightIcon } from "@chakra-ui/icons"
import getCircleUsers from "app/queries/getCircleUsers"
import { useQuery } from "blitz"
import { Form, FORM_ERROR } from "app/core/components/Form"

export default function Circle() {
  const circleId = useParam("circleId", "number")
  const [circle] = useQuery(getCircleUsers, circleId!)
  return (
    <Container>
      <Container>
        <Center h="100px">
          <Heading>{circle.name}</Heading>
        </Center>
        <Table>
          <Thead>
            <Tr>
              <Th>Username</Th>
            </Tr>
          </Thead>
          {circle.includedUsers.map((user) => {
            return (
              <Tr>
                <Td>{user.username}</Td>
              </Tr>
            )
          })}
        </Table>
      </Container>
      <Center h="200px">
        <Divider orientation="horizontal" />
      </Center>
      <Container>
        <form
          onSubmit={(evt) => {
            evt.preventDefault()
            const target = evt.target as HTMLFormElement
            const data = new FormData(target)
            const message = data.get("message")
            target.reset()
            console.log(message)
          }}
        >
          <InputGroup>
            <Input name="message" placeholder="Write a new Message to this Circle" />
            <InputRightElement>
              <IconButton
                type="submit"
                variant="outline"
                colorScheme="teal"
                aria-label="Send Message"
                icon={<ArrowRightIcon />}
              />
            </InputRightElement>
          </InputGroup>
        </form>
      </Container>
    </Container>
  )
}
