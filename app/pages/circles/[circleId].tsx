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
  Select,
  List,
  ListItem,
  HStack,
} from "@chakra-ui/react"
import { ArrowRightIcon, AddIcon } from "@chakra-ui/icons"
import getCircleUsers from "app/queries/getCircleUsers"
import { useQuery, useMutation } from "blitz"
import sendMessageMutation from "app/mutations/sendMessage"
import getLatestMessage from "app/queries/getLatestMessage"
import getContactsOfUser from "app/queries/getContactsOfUser"
import addToCircle from "app/mutations/addToCircle"
import { ChangeEvent } from "react"

export default function Circle() {
  async function addHandler(evt: ChangeEvent<HTMLSelectElement>) {
    await addContact({ newContactId: Number(evt.target.value), circleId: circleId! })
    evt.target.selectedIndex = undefined as any
    circleExtras.refetch()
  }

  const circleId = useParam("circleId", "number")
  const [circle, circleExtras] = useQuery(getCircleUsers, circleId!)
  const [sendMessage] = useMutation(sendMessageMutation)
  const [latestMessage] = useQuery(getLatestMessage, circleId!)
  const [contacts] = useQuery(getContactsOfUser, null)
  const [addContact] = useMutation(addToCircle)

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
            <Td>
              <HStack>
                <Select placeholder="Select Contact" variant="filled" onChange={addHandler}>
                  {contacts
                    .filter((contactA) => {
                      return !circle.includedUsers.find((contactB) => {
                        return contactB.id == contactA.id
                      })
                    })
                    .map((contact) => {
                      return <option value={contact.id}>{contact.username}</option>
                    })}
                </Select>
              </HStack>
            </Td>
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
          <ListItem>
            {/*{latestMessage.sentAt.toLocaleDateString()}, {latestMessage.content}*/}
          </ListItem>
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
