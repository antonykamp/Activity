import { Container, Heading, Table, Tr, Td, Avatar } from "@chakra-ui/react"
import getNotificationsOfUser from "app/queries/getNotificationsOfUser"
import { useQuery } from "blitz"

export default function Contacts() {
  let [userNotifications] = useQuery(getNotificationsOfUser, null)

  return (
    <Container>
      <Heading>Blackboard</Heading>
      <Table spacing={3}>
        {userNotifications
          .map((notifiOwnerPair) => {
            return notifiOwnerPair.notifications.map((notifi) => {
              return { notifications: notifi, owner: notifiOwnerPair.owner }
            })
          })
          .flat()
          .sort(
            (pairA, pairB) =>
              pairB.notifications.sentAt.getTime() - pairA.notifications.sentAt.getTime()
          )
          .map((pair) => {
            return (
              <Tr valign="top">
                <Td>
                  <Tr>
                    <Avatar name={pair.owner.displayName} />
                  </Tr>
                  <Tr>
                    {pair.notifications.sentAt.toLocaleTimeString("en-GB", {
                      hour: "numeric",
                      minute: "numeric",
                    })}
                  </Tr>
                  <Tr>
                    {pair.notifications.sentAt.toLocaleDateString("en-GB", {
                      month: "numeric",
                      day: "numeric",
                    })}
                  </Tr>
                </Td>
                <Td> {pair.notifications.content}</Td>
              </Tr>
            )
          })}
      </Table>
    </Container>
  )
}
