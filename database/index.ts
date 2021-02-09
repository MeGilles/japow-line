import { PrismaClient } from '@prisma/client'
export var prisma = new PrismaClient();

export * as route from './route' 
export * as utils from './utils'
