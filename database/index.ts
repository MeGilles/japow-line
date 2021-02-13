import { PrismaClient } from '@prisma/client'
export const prisma = new PrismaClient();

export * as route from './route' 
export * as utils from './utils'
