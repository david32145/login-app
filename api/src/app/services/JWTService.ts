import jwt from 'jsonwebtoken'
import ApiError from '../erros/ApiError'

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || 'potato'

export interface JWTPayload {
  id: string
}

class JWTService {
  public sign (payload: JWTPayload): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      jwt.sign(payload, JWT_SECRET_KEY, {
        algorithm: 'HS256',
        expiresIn: '1d'
      }, (err, token) => {
        if (err) {
          reject(err)
          return
        }
        resolve(token)
      })
    })
  }

  public verify (token: string): Promise<JWTPayload> {
    return new Promise<JWTPayload>((resolve, reject) => {
      jwt.verify(token, JWT_SECRET_KEY, (err, payload) => {
        if (err) {
          if (err.name === 'TokenExpiredError') {
            reject(new ApiError(err.name, 'NOT_INTERNAL', err.message, 401))
          } else if (err.name === 'JsonWebTokenError') {
            reject(new ApiError(err.name, 'INTERNAL', err.message, 401))
          } else if (err.name === 'NotBeforeError') {
            reject(new ApiError(err.name, 'INTERNAL', err.message, 401))
          } else {
            reject(new ApiError('JsonWebTokenErro', 'INTERNAL', 'jwt malformed', 401))
          }
          return
        }
        resolve(payload as JWTPayload)
      })
    })
  }
}

export default new JWTService()
