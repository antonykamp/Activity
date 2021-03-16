import db from "db"

export default async function getUsernames() {
  return await db.user.findMany({
    select: { username: true, email: true },
  })
}
