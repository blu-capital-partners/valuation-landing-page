import handler from '../server/quote'
import { toNodeHandler } from '../server/vercel'

export default toNodeHandler(handler)
