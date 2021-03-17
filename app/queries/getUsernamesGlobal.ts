import db from "db"
import { Ctx } from "blitz"

export default async function getUsernames(search_term, context: Ctx) {
  context.session.$authorize()
  const user = await db.user.findUnique({
    where: { username: search_term },
    select: { displayName: true, username: true, id: true },
  })
  return user
}
