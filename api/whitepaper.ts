import handler from '../server/whitepaper'
import { toNodeHandler } from '../server/vercel'

export default toNodeHandler(handler)
