import db from "db"

export default async function getLatestMessage(circleId: number) {
  const lastMessage = await db.notification.findFirst({
    where: { sentToId: circleId },
    select: { content: true, sentAt: true },
    orderBy: { sentAt: "desc" },
  })
  return lastMessage
}
