export const downloadObject = (filename: string, object: object) => {
  const blob = new Blob([JSON.stringify(object)], { type: "application/json" })
  const link = document.createElement("a")

  link.download = filename
  link.href = window.URL.createObjectURL(blob)
  link.dataset.downloadurl = ["application/json", link.download, link.href].join(":")

  const evt = new MouseEvent("click", {
    view: window,
    bubbles: true,
    cancelable: true,
  })

  link.dispatchEvent(evt)
  link.remove()
}

export const uploadObject = async (input: HTMLInputElement) =>
  input.files?.length ?? 0 > 0 ? JSON.parse(await input.files!.item(0)!.text()) : undefined
