export default {
  name: 'ritual',
  title: 'Ritual',
  type: 'document',
  fields: [
    {
      name: 'number',
      title: 'Number (e.g. 01, 02)',
      type: 'string',
    },
    {
      name: 'slug',
      title: 'Slug (machine key)',
      type: 'string',
      description: 'A unique machine-readable key, e.g. "namkaran", "wedding-haldi". Used to identify rituals across payment and intake flows. Do not change after customers have purchased this ritual.',
      validation: (Rule: any) => Rule.required().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, { name: 'slug', invert: false }).error('Slug must be lowercase letters, numbers, and hyphens only (e.g. "wedding-haldi")'),
    },
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'sublabel',
      title: 'Sublabel / Subtitle',
      type: 'string',
      description: 'Short subtitle shown in the intake form, e.g. "Naming Ceremony", "Sacred Thread Ceremony"',
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Pre-birth', value: 'Pre-birth' },
          { title: 'Post-birth', value: 'Post-birth' },
          { title: 'Initiation', value: 'Initiation' },
          { title: 'Puberty', value: 'Puberty' },
          { title: 'Festival', value: 'Festival' },
          { title: 'Custom · DIY', value: 'Custom · DIY' },
        ],
      },
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
    },
    {
      name: 'subSections',
      title: 'Sub-Sections',
      type: 'array',
      of: [{ type: 'string' }],
    },
    {
      name: 'color',
      title: 'Theme Color (Hex)',
      type: 'string',
      description: 'e.g., #BD5319 or #C9A84C',
    },
    {
      name: 'imageIcon',
      title: 'Image Icon URL',
      type: 'string',
      description: 'Path to the icon, e.g., /icons/icon_godbharai.png',
    },
    {
      name: 'isDIY',
      title: 'Is this a DIY ritual?',
      type: 'boolean',
      initialValue: false,
    }
  ],
}
