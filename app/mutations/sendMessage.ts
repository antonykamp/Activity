import db from "db"
import { Ctx } from "blitz"

export default async function sendMessage(
  { newMessageContent, circleId }: { newMessageContent: string; circleId: number },
  context: Ctx
) {
  context.session.$authorize()
  await db.notification.create({
    data: { content: newMessageContent, sentToId: circleId },
  })
}
