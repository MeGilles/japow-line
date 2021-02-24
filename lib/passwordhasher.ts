import crypto from 'crypto';

//inspired from https://blog.logrocket.com/building-a-password-hasher-in-node-js/

export type hashedPassword = {
    salt: string,
    password: string
}

/**
 * Hash a password with a predefined salt
 * @param password 
 * @param salt 
 */
function hashPassword(password : string, salt : string){
    let hash = crypto.createHmac('sha512', salt);
    hash.update(password);
    let value = hash.digest('hex');

    return {
        salt: salt,
        password: value
    };
}

/**
 * Hash a password, salt is auto generated
 * @param password  
 */
export function hashNewPassword(password : string) : hashedPassword {
    let salt = crypto.randomBytes(12).toString('hex');
    return hashPassword(password, salt);
}

/**
 * Compare the provided password against the password in database
 * @param password 
 * @param hashedPassword 
 * @returns true if the provided password matches the hashed password
 */
export function compare (password : string, hashedPassword : hashedPassword) : boolean {
    if (password == null || hashedPassword == null) {
        throw new Error('password and hash is required to compare');
    }
    let passwordData = hashPassword(password, hashedPassword.salt);
    if (passwordData.password === hashedPassword.password) {
        return true;
    }
    return false
}