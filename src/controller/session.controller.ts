import { Request, Response } from 'express'
import config from 'config'
import { createAccessToken, createSession } from '../service/session.service'
import { validatePassword } from '../service/user.service'
import { sign } from '../utils/jwt.utils'

export async function createUserSessionHandler(req: Request, res: Response) {
	//Validate Email and User
	const user = await validatePassword(req.body)

	if (!user) {
		return res.status(401).send('Invalid username or password')
	}
	//Create Session

	const session = await createSession(user._id, req.get('user-agent') || '')

	//Create AccesToken
	const accessToken = createAccessToken({
		user,
		session,
	})

	//Create RefreshToken
	const refreshToken = sign(session, { expiresIn: config.get('refreshTokenTtl') })

	//Send Refresh Token and Access Token
}
