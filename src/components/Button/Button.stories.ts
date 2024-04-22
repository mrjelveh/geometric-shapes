
import { Meta, StoryFn } from '@storybook/vue3';
import { fn } from '@storybook/test';
import Button from './Button.vue';
import { ButtonType } from './types';

const meta = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    class: { control: { type: 'select', options: ["primary"] as ButtonType[] } },
    disabled: { control: { type: 'boolean' } },
    onClick: { action: 'clicked' },
  },
  args: {
    class: 'primary',
    disabled: false,
    onClick: fn(),
  }
} satisfies Meta<typeof Button>;

export default meta;

const Template: StoryFn<typeof Button> = (args) => ({
  components: { Button },
  setup() {
    return { args };
  },
  template: '<Button v-bind="args">Button</Button>',
});

export const Primary = Template.bind({});
Primary.args = {
  class: 'primary'
}

export const Secondary = Template.bind({});
Secondary.args = {
  class: 'secondary'
}

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true
}