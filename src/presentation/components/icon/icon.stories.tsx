import { Meta, StoryObj } from '@storybook/react'
import { Icon, IconName } from '.'

type Props = {
  iconName: IconName
  className?: string
}

export default {
  title: 'Components/Icon',
  component: Icon,
  argTypes: {
    className: {
      control: { type: null },
      description: 'Assign external styles',
      defaultValue: ''

    },
    iconName: {
      control: { type: null },
      description: 'Define the icon type',
      table: {
        type: { summary: 'enum' },
        defaultValue: { summary: 'IconName.thumbDown' }
      }
    }
  }
} as Meta

export const Default: StoryObj<Props> = {
  args: {
    iconName: IconName.thumbDown
  }
}

export const ThumbUp: StoryObj<Props> = {
  args: {
    iconName: IconName.thumbUp
  }
}

export const ThumbDown: StoryObj<Props> = {
  args: {
    iconName: IconName.thumbDown
  }
}
