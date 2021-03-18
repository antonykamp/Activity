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
  List,
  ListItem,
} from "@chakra-ui/react"
import { AddIcon } from "@chakra-ui/icons"
import { ArrowRightIcon } from "@chakra-ui/icons"
import getCircleUsers from "app/queries/getCircleUsers"
import { useQuery, useMutation } from "blitz"
import sendMessageMutation from "app/mutations/sendMessage"
import getLatestMessage from "app/queries/getLatestMessage"
import getContactsOfUser from "app/queries/getContactsOfUser"
import addContact from "app/mutations/addContact"

export default function Circle() {
  const circleId = useParam("circleId", "number")
  const [circle] = useQuery(getCircleUsers, circleId!)
  const [sendMessage] = useMutation(sendMessageMutation)
  const [latestMessages] = useQuery(getLatestMessage, circleId!)

  // async function addContactHandler() {
  //   await updateContacts(userContacts!.id)
  // }

  let [updateContacts] = useMutation(addContact)

  let [userContacts] = useQuery(getContactsOfUser, null)

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
          <Tr>
            {/* <Td>
              Add Contact
              <IconButton
                aria-label="Search database"
                onClick={addContactHandler}
                icon={<AddIcon />}
              />
            </Td> */}
          </Tr>
        </Table>
      </Container>

      <Center h="100px">
        <Divider orientation="horizontal" />
      </Center>
      <Container>
        <Center h="50px">
          <Heading size="sm">Latest Updates ...</Heading>
        </Center>
        <Divider orientation="horizontal" />
        <List>
          {latestMessages.map((message) => {
            return (
              <ListItem>
                {message.sentAt.toLocaleDateString()}, {message.content}
              </ListItem>
            )
          })}
        </List>

        <form
          onSubmit={(evt) => {
            evt.preventDefault()
            const target = evt.target as HTMLFormElement
            const data = new FormData(target)
            const message = data.get("message")
            target.reset()
            sendMessage({ newMessageContent: message as string, circleId: circleId! })
          }}
        >
          <InputGroup>
            <Input
              name="message"
              maxLength={140}
              placeholder="Write a new Message to this Circle"
            />
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
