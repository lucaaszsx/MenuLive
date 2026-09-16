import type { JwtTokenPayload } from "#/modules/auth/types/jwt-payload.type.js";

declare global {
    namespace Express {
        interface User extends JwtTokenPayload {}
    }
}