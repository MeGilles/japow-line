import {utils} from '../../database'

export default async (req, res) => {
    res.status(200).json(await utils.dumpDbContents());
}