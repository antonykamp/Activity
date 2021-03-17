import { resolver, SecurePassword } from "blitz"
import db from "db"
import { Signup } from "app/auth/validations"
import { Role } from "types"

export default resolver.pipe(
  resolver.zod(Signup),
  async ({ email, password, username, displayName }, ctx) => {
    const hashedPassword = await SecurePassword.hash(password)
    const user = await db.user.create({
      data: {
        email: email.toLowerCase(),
        hashedPassword,
        role: "USER",
        username,
        displayName,
      },
      select: { id: true, username: true, email: true, role: true },
    })

    await ctx.session.$create({ userId: user.id, role: user.role as Role })
    return user
  }
)
