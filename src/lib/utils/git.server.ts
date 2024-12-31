import { exec } from "child_process"

export async function getBranch(): Promise<string> {
  return new Promise<string>((resolve) => {
    exec("git branch --show-current", (error, stdout, stderr) => {
      if (error || stderr) resolve("dev")
      else resolve(stdout.trim())
    })
  })
}

export async function getCommit(): Promise<string> {
  return new Promise((resolve) => {
    exec("git rev-parse HEAD", (error, stdout, stderr) => {
      if (error || stderr) resolve("0".repeat(40))
      else resolve(stdout.trim())
    })
  })
}
