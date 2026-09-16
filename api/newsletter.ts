import handler from '../server/newsletter'
import { toNodeHandler } from '../server/vercel'

export default toNodeHandler(handler)
