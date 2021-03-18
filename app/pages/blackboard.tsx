import { Container, Heading, Table, Tr, Td, Avatar } from "@chakra-ui/react"
import getNotificationsOfUser from "app/queries/getNotificationsOfUser"
import { useQuery } from "blitz"

export default function Contacts() {
  let [userNotifications] = useQuery(getNotificationsOfUser, null)

  return (
    <Container>
      <Heading>Blackboard</Heading>
      <Table spacing={3}>
        {userNotifications.map((notification) => {
          return (
            <Tr valign="top">
              <Td>
                <Tr>
                  <Avatar name={notification.sentTo.owner.displayName} />
                </Tr>
                <Tr>
                  {notification.sentAt.toLocaleTimeString("en-GB", {
                    hour: "numeric",
                    minute: "numeric",
                  })}
                </Tr>
                <Tr>
                  {notification.sentAt.toLocaleDateString("en-GB", {
                    month: "numeric",
                    day: "numeric",
                  })}
                </Tr>
              </Td>
              <Td> {notification.content}</Td>
            </Tr>
          )
        })}
      </Table>
    </Container>
  )
}
