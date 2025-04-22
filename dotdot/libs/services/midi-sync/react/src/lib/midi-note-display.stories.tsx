import type { Meta, StoryObj } from '@storybook/react'
import { MidiNoteDisplay } from './midi-note-display'
import { within } from '@storybook/testing-library'
import { expect } from '@storybook/jest'

const meta: Meta<typeof MidiNoteDisplay> = {
  component: MidiNoteDisplay,
  title: 'MidiNoteDisplay',
}
export default meta;
type Story = StoryObj<typeof MidiNoteDisplay>;

export const Primary = {
  args: {
    note: '',
    countdownValue: 0,
    holdValue: 0,
  },
}

export const Heading: Story = {
  args: {
    note: {
      noteId: 72,
      duration: 'short',
      velocity: 100,
    },
    countdownValue: 0,
    holdValue: 0,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to MidiNoteDisplay!/gi)).toBeTruthy();
  },
}
