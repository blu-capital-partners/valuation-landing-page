import handler from '../server/talkFirst'
import { toNodeHandler } from '../server/vercel'

export default toNodeHandler(handler)
