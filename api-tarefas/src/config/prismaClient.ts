import 'dotenv/config'
import { PrismaMariaDb } from '@prisma/adapter-mariadb'
import { PrismaClient } from '../generated/prisma/client/index.js'

// Passe as opções de conexão diretamente no construtor do adaptador
const adapter = new PrismaMariaDb({
  host: process.env.DATABASE_HOST || 'localhost',
  port: Number(process.env.DATABASE_PORT) || 3306,
  user: process.env.DATABASE_USER || 'root',
  password: process.env.MYSQL_ROOT_PASSWORD,
  database: process.env.MYSQL_DATABASE,
})

export const prisma = new PrismaClient({ adapter })