import { UUID } from "crypto";

export interface RoomsLatestMsgsResult {
    user: UUID;
    content: string;
}