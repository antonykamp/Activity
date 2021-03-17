import db from "db"
import { Ctx } from "blitz"

export default async function getUsernames(_ = null, context: Ctx) {
  context.session.$authorize()
  const contacts = await db.user.findUnique({
    where: { id: context.session.userId },
    select: { contacts: true },
  })
  return contacts!.contacts
}
