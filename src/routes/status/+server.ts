import { getBranch, getCommit } from "$lib/utils/git.server"

function getRuntime() {
  const engine = "bun" in process.versions ? "bun" : "node"
  const version = process.versions[engine] ?? process.version

  return { engine, version }
}

async function getVersion() {
  const release = process.env.npm_package_version ?? "0.0.0"
  const [branch, commit] = await Promise.all([getBranch(), getCommit()])

  return { release, branch, commit }
}

export async function GET(args) {
  const headers = new Headers()
  headers.set("content-type", "application/json")

  return new Response(
    new Blob(
      [
        JSON.stringify({
          $schema: `${args.url.protocol}//${args.url.host}/status.schema.json`,
          version: await getVersion(),
          runtime: getRuntime(),
        }),
      ],
      { type: "application/json" },
    ),
    {
      headers,
      status: 200,
      statusText: "OK",
    },
  )
}
