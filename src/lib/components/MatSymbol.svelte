<script lang="ts" context="module">
  export enum MaterialSymbolStyle {
    Outlined = "outlined",
    Rounded = "rounded",
    Sharp = "sharp",
  }

  export enum MaterialSymbolGrade {
    Low = -25,
    Medium = 0,
    High = 200,
  }
</script>

<script lang="ts">
  export let style: MaterialSymbolStyle = MaterialSymbolStyle.Rounded
  export let size: number = 24
  export let fill: boolean = false
  export let weight: 100 | 200 | 300 | 400 | 500 | 600 | 700 = 400
  export let grade: MaterialSymbolGrade = MaterialSymbolGrade.Medium
  export let opticalSize: number = size

  $: klass = `material-symbols-${style}`
  $: fontVariationSettings =
    `font-size: ${size}px; font-variation-settings: ` +
    [
      ["FILL", fill ? 1 : 0],
      ["wght", weight],
      ["GRAD", grade],
      ["opsz", Math.min(48, Math.max(20, opticalSize))],
    ]
      .map(([key, value]) => `'${key}' ${value}`)
      .join(", ") +
    ";"
</script>

<span style={fontVariationSettings} class={klass}><slot /></span>
