import db from "db"
import { Ctx } from "blitz"

export default async function searchUsers(search_term, context: Ctx) {
  context.session.$authorize()
  const user = await db.user.findFirst({
    where: { username: search_term, id: { not: context.session.userId } },
    select: { displayName: true, username: true, id: true },
  })
  return user
}
