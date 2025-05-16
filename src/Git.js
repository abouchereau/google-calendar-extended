import { execSync } from "child_process";

export default class Git {

    static getLastCommitHash() {
        return execSync("git rev-parse HEAD").toString().trim();
    }

}