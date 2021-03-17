import db from "db"
import { Ctx } from "blitz"

export default async function addContact(newContactId, context: Ctx) {
  context.session.$authorize()
  await db.user.update({
    where: { id: context.session.userId },
    data: { contacts: { connect: { id: newContactId } } },
  })
}
