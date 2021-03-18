import { Container, Heading, Table, Tr, Td, Tbody, Avatar, Badge } from "@chakra-ui/react"
import getNotificationsOfUser from "app/queries/getNotificationsOfUser"
import { useQuery } from "blitz"

export default function Contacts() {
  let [userNotifications] = useQuery(getNotificationsOfUser, null)

  return (
    <Container>
      <Heading>Blackboard</Heading>

      {userNotifications.map((notification) => {
        return (
          <Table size="sm">
            <Tr verticalAlign="top">
              <Td>
                <Avatar name={notification.sentTo.owner.displayName} />
              </Td>
              <Td>
                {notification.sentAt.toLocaleDateString("en-GB", {
                  month: "numeric",
                  day: "numeric",
                })}
                {notification.sentAt.toLocaleTimeString("en-GB", {
                  hour: "numeric",
                  minute: "numeric",
                })}
              </Td>
              <Td>
                {notification.sentTo.owner.displayName} - {notification.sentTo.name}
              </Td>
              <Td>{notification.content}</Td>
            </Tr>
          </Table>
        )
      })}
    </Container>
  )
}
