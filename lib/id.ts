import { customAlphabet } from "nanoid";

// 추측 불가능한 세션/참가자 ID (URL-safe)
const alphabet =
  "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

export const generateId = customAlphabet(alphabet, 12);
