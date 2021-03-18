import db from "db"

export default async function getLatestMessage(circleId: number) {
  const lastMessage = await db.notification.findMany({
    where: { sentToId: circleId },
    select: { content: true, sentAt: true },
    orderBy: { sentAt: "desc" },
    take: 3,
  })
  return lastMessage
}
