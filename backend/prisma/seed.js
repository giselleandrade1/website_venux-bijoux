const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcrypt')

async function main() {
    const prisma = new PrismaClient()
    try {
        const adminEmail = process.env.ADMIN_EMAIL || 'admin@local'
        const adminPass = process.env.ADMIN_PASSWORD || 'secret'

        const existing = await prisma.user.findUnique({ where: { email: adminEmail } })
        if (existing) {
            console.log(`Admin user ${adminEmail} already exists`)
            return
        }

        const hash = await bcrypt.hash(adminPass, 10)
        const user = await prisma.user.create({ data: { email: adminEmail, password: hash, name: 'Admin', role: 'admin' } })
        console.log('Created admin user:', user.email)
    } catch (err) {
        console.error('Seed error', err)
    } finally {
        process.exit(0)
    }
}

main()
