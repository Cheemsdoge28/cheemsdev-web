import PlaceholderStringInput from '@/components/inputs/PlaceholderString'
import { defineType } from 'sanity'

export const placeholderStringType = defineType({
  name: 'placeholderString',
  title: 'Title',
  type: 'string',
  components: {
    input: PlaceholderStringInput,
  },
}
)