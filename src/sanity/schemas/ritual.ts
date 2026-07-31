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
      name: 'title',
      title: 'Title',
      type: 'string',
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
