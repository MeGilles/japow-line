import { prisma, types } from '..';
import {hashedPassword} from '../../passwordhasher'

/**
 * Change the password of an user. The password provided must be hashed beforehand
 * @param email the user email
 * @param hashedPassword the new password, hashed
 */
export async function changePassword(email: string, hashedPassword: string, salt : string) : Promise<boolean>{
    try{
        await prisma.user.update({
            where: {
                email: email
            },
            data : {
                hashedPassword : hashedPassword,
                hashedPasswordSalt : salt
            }
        });
        return true;
    } catch {
        return false;
    }
}

/**
 * get the password data from an user
 * @param email 
 * @return the hashed password and the salt used in the hash algorithm
 */
export async function getPassword(email: string) : Promise<hashedPassword> {
    let data = await prisma.user.findUnique({
        where: {
            email: email
        },
        select : {
            hashedPassword : true,
            hashedPasswordSalt : true
        }
    });
    return {
        password : data.hashedPassword,
        salt : data.hashedPasswordSalt
    }
}