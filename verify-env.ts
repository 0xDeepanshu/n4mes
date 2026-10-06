/** TEMP env preload — imported FIRST so modules see env at init. */
import { config as loadEnv } from "dotenv";

loadEnv({ path: ".env.local" });
loadEnv({ path: ".env" });
