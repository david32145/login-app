import bcrypt from 'bcrypt'

const HASH_SALTS = process.env.HASH_SALTS || 10

class HashService {
  public async make (value: string): Promise<string> {
    const hash = await bcrypt.hash(value, HASH_SALTS)
    return hash
  }

  public async verify (value: string, hash: string): Promise<boolean> {
    const verify = await bcrypt.compare(value, hash)
    return verify
  }
}

export default new HashService()
