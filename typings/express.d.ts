import type { JwtTokenPayload } from "#/modules/auth/types/jwt-payload.type.ts";

declare global {
    namespace Express {
        interface User extends JwtTokenPayload {}
    }
}