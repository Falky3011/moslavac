import { clubNextConfig } from "../../packages/config/src/next";

export default clubNextConfig({
  llmsTxt: true,
  redirects: [
    // Legacy/expected contact path — the club's contact lives on /klub.
    { source: "/kontakt", destination: "/klub", permanent: true },
  ],
});
