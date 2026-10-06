import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./schemas";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "0rfaony3";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

export default defineConfig({
  name: "n4mes",
  title: "N4MES Studio",
  projectId,
  dataset,
  plugins: [
    structureTool({
      name: "structure",
      structure: (S) =>
        S.list()
          .title("Content")
          .items([
            S.listItem()
              .title("Website Settings")
              .child(
                S.document()
                  .schemaType("siteSettings")
                  .documentId("siteSettings"),
              ),
            S.listItem()
              .title("Home Page")
              .child(
                S.document().schemaType("homePage").documentId("homePage"),
              ),
            S.divider(),
            S.listItem()
              .title("Projects")
              .child(S.documentTypeList("project").title("Projects")),
            S.listItem()
              .title("Journal")
              .child(S.documentTypeList("journalPost").title("Journal")),
            S.listItem()
              .title("Clients")
              .child(S.documentTypeList("client").title("Clients")),
          ]),
    }),
  ],
  schema: {
    types: schemaTypes,
  },
});
