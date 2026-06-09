/* START: THIS SECTION CODE IS CANNOT BE CHANGED, YOU ONLY READ IT */
export interface FieldSchemaType {
  fieldName?: string;
  type:
    | "string"
    | "number"
    | "boolean"
    | "object"
    | "array"
    | "color"
    | "url"
    | "enum"
    | "datetime"
    | "file"
    | "files";
  required?: boolean;
  label?: string;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
  options?: string[];
  fields?: FieldSchemaType[];
  item?: FieldSchemaType;
}
/* END: THIS SECTION CODE IS CANNOT BE CHANGED, YOU ONLY READ IT */

export type ConfigurableSchemas = {
  formSchema: FieldSchemaType[];
};



export const configurableSchemas: ConfigurableSchemas = {
  formSchema: [
    {
      fieldName: "appName",
      type: "string",
      required: true,
      label: "App Name",
    },
    {
      fieldName: "logoUrl",
      type: "url",
      required: true,
      label: "Logo URL",
    },
    {
      fieldName: "brandColor",
      type: "object",
      required: true,
      label: "Brand Color",
      fields: [
        {
          fieldName: "primary",
          type: "color",
          required: true,
          label: "Primary",
        },
        {
          fieldName: "secondary",
          type: "color",
          required: true,
          label: "Secondary",
        },
        {
          fieldName: "accent",
          type: "color",
          required: true,
          label: "Accent",
        },
      ],
    },
    {
      fieldName: "tagline",
      type: "string",
      required: false,
      label: "Tagline",
      maxLength: 120,
    },
    {
      fieldName: "heroHeading",
      type: "string",
      required: false,
      label: "Hero Heading",
      maxLength: 100,
    },
    {
      fieldName: "heroSubheading",
      type: "string",
      required: false,
      label: "Hero Subheading",
      maxLength: 200,
    },
    {
      fieldName: "uploadSectionHeading",
      type: "string",
      required: false,
      label: "Upload Section Heading",
      maxLength: 80,
    },
    {
      fieldName: "uploadSectionSubheading",
      type: "string",
      required: false,
      label: "Upload Section Subheading",
      maxLength: 160,
    },
    {
      fieldName: "uploadCtaLabel",
      type: "string",
      required: false,
      label: "Upload CTA Button Label",
      maxLength: 50,
    },
    {
      fieldName: "analysisSectionHeading",
      type: "string",
      required: false,
      label: "Analysis Section Heading",
      maxLength: 80,
    },
    {
      fieldName: "interviewContext",
      type: "string",
      required: false,
      label: "Interview Analysis Context",
      maxLength: 500,
    },
    {
      fieldName: "primaryRoleLabel",
      type: "string",
      required: false,
      label: "Primary Speaker Role Label",
      maxLength: 40,
    },
    {
      fieldName: "secondaryRoleLabel",
      type: "string",
      required: false,
      label: "Secondary Speaker Role Label",
      maxLength: 40,
    },
    {
      fieldName: "scoringCategories",
      type: "array",
      required: false,
      label: "Scoring Categories",
      item: {
        type: "object",
        fields: [
          { fieldName: "id", type: "string", required: true, label: "ID" },
          { fieldName: "title", type: "string", required: true, label: "Title" },
          { fieldName: "rule", type: "string", required: true, label: "Scoring Rule" },
        ],
      },
    },
    {
      fieldName: "footerText",
      type: "string",
      required: false,
      label: "Footer Text",
      maxLength: 200,
    },
    {
      fieldName: "showSidebar",
      type: "boolean",
      required: false,
      label: "Show Sidebar Navigation",
    },
  ],
};
