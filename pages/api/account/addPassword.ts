import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/client';
import { user } from '../../../lib/database'
import { hashNewPassword } from '../../../lib/passwordhasher';

/**
 * Change the password of a connected user.
 * This api can add a password if there was none.
 * The request must contain a password field that is a string
 * Response:
 *  200 : Password was added/replaced
 *  400 : The add password is usable with POST only/malformed json
 *  401 : The user needs to be connected
 *  406 : The password does not match minimal security
 *  500 : The password was not changed, could not add password (contact administrator)
 */
export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== 'POST') {
        res.status(400).json({ response: 'Use POST' });
        return;
    }

    const session = await getSession({ req });
    if (!session) {
        res.status(401).json({ response: 'You need to be connected' });
        return;
    }

    if (typeof req.body.password !== 'string') {
        res.status(400).json({ response: 'please provide a password' });
    }
    
    const userPassword: string = req.body.password;

    if (userPassword.length < 8 /*&& symbols<1 && uppercase<1*/) { //TODO
        res.status(406).json({ response: 'The password does not match minimal security' });
        return;
    }

    const hashedPassword = hashNewPassword(req.body.password);
    const success: boolean = await user.changePassword(session.user.email, hashedPassword.password, hashedPassword.salt);

    if (success) {
        res.status(200).json({ response: 'OK' });
    } else {
        res.status(500).json({ response: 'Could not change password, contact administrator' });
    }
}

