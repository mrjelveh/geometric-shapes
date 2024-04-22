import { Meta, StoryFn } from '@storybook/vue3';
import { fn } from '@storybook/test';
import Modal from "./Modal.vue";

const meta = {
  title: 'Components/Modal',
  component: Modal,
  tags: ['autodocs'],
  argTypes: {
    showModal: { control: { type: 'boolean' } },
    onClose: { action: 'closed' },
    header: { control: { type: 'text' } },
  },
  args: {
    showModal: false,
    header: 'Modal',
    onClose: fn(),
  },
  parameters: {
    docs: {
        story: {
            inline: false,
            iframeHeight: 400,
        },
    },
    },
} satisfies Meta<typeof Modal>;


export default meta;

const Template: StoryFn<typeof Modal> = (args) => ({
  components: { Modal },
  setup() {
    return { args };
  },
  template: `<Modal v-bind="args">
  dummy content
  </Modal>`,
});

export const Default = Template.bind({});
Default.args = {
  showModal: true,
  header: 'Modal',
}
