import { PrismaClient } from '@prisma/client'
export const prisma = new PrismaClient();

export * as route from './src/route' 
export * as utils from './src/utils'