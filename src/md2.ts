import type { CustomThemeConfig } from "@skeletonlabs/tw-plugin"

export const md2: CustomThemeConfig = {
  name: "md2",
  properties: {
    // =~= Theme Properties =~=
    "--theme-font-family-base": `system-ui`,
    "--theme-font-family-heading": `system-ui`,
    "--theme-font-color-base": "0 0 0",
    "--theme-font-color-dark": "255 255 255",
    "--theme-rounded-base": "9999px",
    "--theme-rounded-container": "8px",
    "--theme-border-base": "0px",
    // =~= Theme On-X Colors =~=
    "--on-primary": "255 255 255",
    "--on-secondary": "0 0 0",
    "--on-tertiary": "255 255 255",
    "--on-success": "0 0 0",
    "--on-warning": "0 0 0",
    "--on-error": "0 0 0",
    "--on-surface": "0 0 0",
    // =~= Theme Colors  =~=
    // primary | #3f51b5
    "--color-primary-50": "226 229 244", // #e2e5f4
    "--color-primary-100": "217 220 240", // #d9dcf0
    "--color-primary-200": "207 212 237", // #cfd4ed
    "--color-primary-300": "178 185 225", // #b2b9e1
    "--color-primary-400": "121 133 203", // #7985cb
    "--color-primary-500": "63 81 181", // #3f51b5
    "--color-primary-600": "57 73 163", // #3949a3
    "--color-primary-700": "47 61 136", // #2f3d88
    "--color-primary-800": "38 49 109", // #26316d
    "--color-primary-900": "31 40 89", // #1f2859
    // secondary | #ffc107
    "--color-secondary-50": "255 246 218", // #fff6da
    "--color-secondary-100": "255 243 205", // #fff3cd
    "--color-secondary-200": "255 240 193", // #fff0c1
    "--color-secondary-300": "255 230 156", // #ffe69c
    "--color-secondary-400": "255 212 81", // #ffd451
    "--color-secondary-500": "255 193 7", // #ffc107
    "--color-secondary-600": "230 174 6", // #e6ae06
    "--color-secondary-700": "191 145 5", // #bf9105
    "--color-secondary-800": "153 116 4", // #997404
    "--color-secondary-900": "125 95 3", // #7d5f03
    // tertiary | #673ab7
    "--color-tertiary-50": "232 225 244", // #e8e1f4
    "--color-tertiary-100": "225 216 241", // #e1d8f1
    "--color-tertiary-200": "217 206 237", // #d9ceed
    "--color-tertiary-300": "194 176 226", // #c2b0e2
    "--color-tertiary-400": "149 117 205", // #9575cd
    "--color-tertiary-500": "103 58 183", // #673ab7
    "--color-tertiary-600": "93 52 165", // #5d34a5
    "--color-tertiary-700": "77 44 137", // #4d2c89
    "--color-tertiary-800": "62 35 110", // #3e236e
    "--color-tertiary-900": "50 28 90", // #321c5a
    // success | #8bc34a
    "--color-success-50": "238 246 228", // #eef6e4
    "--color-success-100": "232 243 219", // #e8f3db
    "--color-success-200": "226 240 210", // #e2f0d2
    "--color-success-300": "209 231 183", // #d1e7b7
    "--color-success-400": "174 213 128", // #aed580
    "--color-success-500": "139 195 74", // #8bc34a
    "--color-success-600": "125 176 67", // #7db043
    "--color-success-700": "104 146 56", // #689238
    "--color-success-800": "83 117 44", // #53752c
    "--color-success-900": "68 96 36", // #446024
    // warning | #ff9800
    "--color-warning-50": "255 240 217", // #fff0d9
    "--color-warning-100": "255 234 204", // #ffeacc
    "--color-warning-200": "255 229 191", // #ffe5bf
    "--color-warning-300": "255 214 153", // #ffd699
    "--color-warning-400": "255 183 77", // #ffb74d
    "--color-warning-500": "255 152 0", // #ff9800
    "--color-warning-600": "230 137 0", // #e68900
    "--color-warning-700": "191 114 0", // #bf7200
    "--color-warning-800": "153 91 0", // #995b00
    "--color-warning-900": "125 74 0", // #7d4a00
    // error | #f44336
    "--color-error-50": "253 227 225", // #fde3e1
    "--color-error-100": "253 217 215", // #fdd9d7
    "--color-error-200": "252 208 205", // #fcd0cd
    "--color-error-300": "251 180 175", // #fbb4af
    "--color-error-400": "247 123 114", // #f77b72
    "--color-error-500": "244 67 54", // #f44336
    "--color-error-600": "220 60 49", // #dc3c31
    "--color-error-700": "183 50 41", // #b73229
    "--color-error-800": "146 40 32", // #922820
    "--color-error-900": "120 33 26", // #78211a
    // surface | #495a8f
    "--color-surface-50": "228 230 238", // #e4e6ee
    "--color-surface-100": "219 222 233", // #dbdee9
    "--color-surface-200": "210 214 227", // #d2d6e3
    "--color-surface-300": "182 189 210", // #b6bdd2
    "--color-surface-400": "128 140 177", // #808cb1
    "--color-surface-500": "73 90 143", // #495a8f
    "--color-surface-600": "66 81 129", // #425181
    "--color-surface-700": "55 68 107", // #37446b
    "--color-surface-800": "44 54 86", // #2c3656
    "--color-surface-900": "36 44 70", // #242c46
  },
}
