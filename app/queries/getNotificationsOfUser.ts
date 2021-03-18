import db from "db"
import { Ctx } from "blitz"

export default async function getNotificationsOfUser(_ = null, context: Ctx) {
  context.session.$authorize()
  const notifications = await db.notification.findMany({
    where: { sentTo: { includedUsers: { some: { id: context.session.userId } } } },
    include: { sentTo: { include: { owner: true } } },
    orderBy: { sentAt: "desc" },
    take: 100,
  })
  return notifications
}
