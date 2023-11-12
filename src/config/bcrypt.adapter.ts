

import bcrypt from 'bcryptjs';

export const bcryptAdapter = {
    hash:  (password: string) => {
        const salt =  bcrypt.genSaltSync(12);
        const hash =  bcrypt.hashSync(password, salt);
        return hash;
    },
    compare:  (password: string, hashed: string) => {
        const isValid =  bcrypt.compare(password, hashed);
        return isValid;
    },
}