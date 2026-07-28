/**
 * Tailwind v4 služi samo marketinšku route grupu `(frontend)`.
 * Payload admin (`(payload)`) ima vlastiti SCSS i kroz ovaj plugin prolazi netaknut.
 */
const config = {
  plugins: {
    '@tailwindcss/postcss': {},
  },
}

export default config
